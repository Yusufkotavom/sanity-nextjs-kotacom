import { createClient } from "@sanity/client";

export interface OGImageParams {
  title: string;
  excerpt?: string;
  contentType: "post" | "service" | "product";
  template?: "default" | "minimal" | "branded";
  dimensions?: { width: number; height: number };
}

export interface OGImageResult {
  imageUrl: string;
  assetId: string;
  width: number;
  height: number;
  format: string;
}

export interface SanityAsset {
  _id: string;
  url: string;
  metadata: {
    dimensions: { width: number; height: number };
    lqip: string;
  };
}

const DEFAULT_DIMENSIONS = { width: 1200, height: 630 };
const MAX_CONCURRENT_GENERATIONS = 5;
const GENERATION_TIMEOUT = 30000; // 30 seconds

let currentGenerations = 0;
let skipSanityUploadDueToPermissions = false;

/**
 * Truncates text to specified length
 */
function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + "...";
}

function resolveOgBaseUrl(): string {
  const explicitBase =
    process.env.OG_BASE_URL ||
    process.env.VERCEL_OG_BASE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL;
  if (explicitBase) return explicitBase.replace(/\/$/, "");

  // In local dev, prefer current process port to avoid hardcoded 3000 mismatch.
  if (process.env.NODE_ENV === "development") {
    const port = process.env.PORT || "3002";
    return `http://127.0.0.1:${port}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`.replace(/\/$/, "");
  }

  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
  }

  return "http://127.0.0.1:3000";
}

/**
 * Generates OG image using Vercel OG or alternative service
 */
async function generateImageUrl(params: OGImageParams): Promise<string> {
  const templateByType: Record<OGImageParams["contentType"], "default" | "minimal" | "branded"> = {
    post: "default",
    service: "branded",
    product: "minimal",
  };
  const { title, excerpt, dimensions = DEFAULT_DIMENSIONS } = params;
  const template = params.template || templateByType[params.contentType];

  // Truncate text for image generation
  const truncatedTitle = truncate(title, 60);
  const truncatedExcerpt = excerpt ? truncate(excerpt, 120) : "";

  // Use Vercel OG endpoint or alternative
  const ogEndpoint = process.env.VERCEL_OG_ENDPOINT || "/api/og";
  
  const searchParams = new URLSearchParams({
    title: truncatedTitle,
    description: truncatedExcerpt,
    template,
    width: dimensions.width.toString(),
    height: dimensions.height.toString(),
  });

  // If ogEndpoint is relative, construct absolute URL
  let imageUrl: string;
  if (ogEndpoint.startsWith("http")) {
    imageUrl = `${ogEndpoint}?${searchParams.toString()}`;
  } else {
    const baseUrl = resolveOgBaseUrl();
    imageUrl = `${baseUrl}${ogEndpoint}?${searchParams.toString()}`;
  }
  
  console.log(`[OG Image Generator] Resolved URL: ${imageUrl}`);
  return imageUrl;
}

/**
 * Uploads image to Sanity asset storage
 */
async function uploadImageToSanity(
  imageUrl: string,
  metadata: {
    title: string;
    contentType: string;
    source: string;
  }
): Promise<SanityAsset> {
  if (skipSanityUploadDueToPermissions) {
    throw new Error("Sanity upload skipped: token lacks create permission");
  }

  // AGENTS rule: prefer SANITY_DEV token first for agent-driven Sanity operations.
  const sanityAuthToken = process.env.SANITY_DEV || process.env.SANITY_AUTH_TOKEN;
  
  if (!sanityAuthToken) {
    throw new Error("SANITY_AUTH_TOKEN or SANITY_DEV environment variable is required");
  }

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

  if (!projectId) {
    throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID environment variable is required");
  }

  const client = createClient({
    projectId,
    dataset,
    token: sanityAuthToken,
    apiVersion: "2024-01-01",
    useCdn: false,
  });

  // Fetch the image
  console.log(`[OG Image Generator] Fetching generated image...`);
  const response = await fetch(imageUrl);
  if (!response.ok) {
    console.error(`[OG Image Generator] Failed to fetch image. Status: ${response.status} ${response.statusText}`);
    try {
      const errorText = await response.text();
      console.error(`[OG Image Generator] Error details:`, errorText);
    } catch (e) {
      // Ignore
    }
    throw new Error(`Failed to fetch image: ${response.statusText}`);
  }

  const imageBuffer = await response.arrayBuffer();
  console.log(`[OG Image Generator] Image fetched successfully. Size: ${imageBuffer.byteLength} bytes`);
  const buffer = Buffer.from(imageBuffer);

  try {
    const asset = await client.assets.upload("image", buffer, {
      filename: `og-${metadata.contentType}-${Date.now()}.png`,
      title: metadata.title,
      description: `AI-generated OG image for ${metadata.contentType}`,
      source: {
        name: metadata.source,
        id: `ai-generated-${Date.now()}`,
      },
    });

    console.log(`[OG Image Generator] Successfully uploaded image to Sanity: ${asset._id}`);
    return {
      _id: asset._id,
      url: asset.url,
      metadata: {
        dimensions: {
          width: asset.metadata.dimensions?.width || DEFAULT_DIMENSIONS.width,
          height: asset.metadata.dimensions?.height || DEFAULT_DIMENSIONS.height,
        },
        lqip: asset.metadata.lqip || "",
      },
    };
  } catch (sanityError) {
    const statusCode =
      typeof sanityError === "object" &&
      sanityError !== null &&
      "statusCode" in sanityError
        ? Number((sanityError as { statusCode?: unknown }).statusCode)
        : undefined;
    const message =
      sanityError instanceof Error ? sanityError.message : String(sanityError || "");

    if (statusCode === 403 || /Insufficient permissions/i.test(message)) {
      skipSanityUploadDueToPermissions = true;
      console.error(
        "[OG Image Generator] Sanity upload disabled: token lacks create permission for assets."
      );
      throw new Error("Sanity token missing create permission for assets");
    }

    console.error(`[OG Image Generator] Failed to upload to Sanity:`, sanityError);
    throw sanityError;
  }
}

/**
 * Generates OG image with concurrency control and timeout
 */
export async function generateImage(params: OGImageParams): Promise<OGImageResult> {
  // Wait if we've hit concurrency limit
  while (currentGenerations >= MAX_CONCURRENT_GENERATIONS) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  currentGenerations++;

  try {
    // Create timeout promise
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error("OG image generation timeout")), GENERATION_TIMEOUT);
    });

    // Generate image with timeout
    const generationPromise = (async () => {
      const dimensions = params.dimensions || DEFAULT_DIMENSIONS;
      
      // Generate image URL
      const imageUrl = await generateImageUrl(params);

      // Upload to Sanity
      const sanityAsset = await uploadImageToSanity(imageUrl, {
        title: params.title,
        contentType: params.contentType,
        source: "ai-generated-og",
      });

      return {
        imageUrl: sanityAsset.url,
        assetId: sanityAsset._id,
        width: dimensions.width,
        height: dimensions.height,
        format: "png",
      };
    })();

    return await Promise.race([generationPromise, timeoutPromise]);
  } finally {
    currentGenerations--;
  }
}

/**
 * Uploads an existing image URL to Sanity
 */
export async function uploadToSanity(
  imageUrl: string,
  metadata: {
    title: string;
    contentType: string;
    source: string;
  }
): Promise<SanityAsset> {
  return uploadImageToSanity(imageUrl, metadata);
}

/**
 * Generates OG image with graceful error handling
 * Returns null if generation fails, allowing content generation to continue
 */
export async function generateImageSafe(params: OGImageParams): Promise<OGImageResult | null> {
  try {
    return await generateImage(params);
  } catch (error) {
    console.error("OG image generation failed:", error);
    console.error("Continuing without OG image for:", params.title);
    return null;
  }
}
