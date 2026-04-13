import { createClient } from "@sanity/client";

export interface PublishParams {
  contentType: "post" | "service" | "project";
  title: string;
  slug?: string;
  excerpt: string;
  body: string | any[];
  ogImageAssetId?: string;
  publishedAt?: Date;
  metadata?: Record<string, any>;
}

export interface PublishResult {
  documentId: string;
  status: "draft" | "published";
  url: string;
}

/**
 * Generates a URL-safe slug from title
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 200);
}

/**
 * Checks if a slug exists in Sanity
 */
async function slugExists(
  client: ReturnType<typeof createClient>,
  contentType: string,
  slug: string
): Promise<boolean> {
  const query = `*[_type == $contentType && slug.current == $slug][0]._id`;
  const result = await client.fetch(query, { contentType, slug });
  return Boolean(result);
}

/**
 * Generates a unique slug by appending numeric suffix if needed
 */
async function generateUniqueSlug(
  client: ReturnType<typeof createClient>,
  contentType: string,
  baseSlug: string
): Promise<string> {
  let slug = baseSlug;
  let counter = 1;

  while (await slugExists(client, contentType, slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}

/**
 * Converts plain text to Sanity portable text format
 */
function convertToPortableText(body: string | any[]): any[] {
  // If already an array (portable text), return as-is
  if (Array.isArray(body)) {
    return body;
  }

  // Convert plain text to portable text blocks
  const paragraphs = body.split(/\n\n+/);
  
  return paragraphs.map((paragraph) => ({
    _type: "block",
    _key: `block-${Math.random().toString(36).substring(2, 11)}`,
    style: "normal",
    children: [
      {
        _type: "span",
        _key: `span-${Math.random().toString(36).substring(2, 11)}`,
        text: paragraph.trim(),
        marks: [],
      },
    ],
    markDefs: [],
  }));
}

/**
 * Gets Sanity client configuration
 */
function getSanityClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const token = process.env.SANITY_AUTH_TOKEN || process.env.SANITY_DEV;
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

  if (!projectId) {
    throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID environment variable is required");
  }

  if (!token) {
    throw new Error("SANITY_AUTH_TOKEN or SANITY_DEV environment variable is required");
  }

  return createClient({
    projectId,
    dataset,
    token,
    apiVersion,
    useCdn: false,
  });
}

/**
 * Publishes content to Sanity CMS
 */
export async function publishContent(params: PublishParams): Promise<PublishResult> {
  const client = getSanityClient();

  // Generate slug if not provided
  const baseSlug = params.slug || generateSlug(params.title);
  const uniqueSlug = await generateUniqueSlug(client, params.contentType, baseSlug);

  // Convert body to portable text
  const portableTextBody = convertToPortableText(params.body);

  // Determine status
  const status = params.publishedAt ? "published" : "draft";

  // Build document
  const document: any = {
    _type: params.contentType,
    title: params.title,
    slug: {
      _type: "slug",
      current: uniqueSlug,
    },
    excerpt: params.excerpt,
    body: portableTextBody,
    ...(params.metadata || {}),
  };

  // Add OG image if provided
  if (params.ogImageAssetId) {
    document.ogImage = {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: params.ogImageAssetId,
      },
    };
  }

  // Add published date if provided
  if (params.publishedAt) {
    document.publishedAt = params.publishedAt.toISOString();
  }

  // Create document in Sanity
  const createdDocument = await client.create(document);

  // Construct URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kotacom.com";
  const url = `${baseUrl}/${params.contentType}/${uniqueSlug}`;

  return {
    documentId: createdDocument._id,
    status,
    url,
  };
}

/**
 * Updates an existing Sanity document
 */
export async function updateContent(
  documentId: string,
  params: Partial<PublishParams>
): Promise<PublishResult> {
  const client = getSanityClient();

  const updateData: any = {};

  if (params.title) updateData.title = params.title;
  if (params.excerpt) updateData.excerpt = params.excerpt;
  if (params.body) updateData.body = convertToPortableText(params.body);
  if (params.publishedAt) updateData.publishedAt = params.publishedAt.toISOString();
  if (params.metadata) Object.assign(updateData, params.metadata);

  // Update slug if title changed
  if (params.title && params.slug) {
    const document = await client.getDocument(documentId);
    const contentType = document?._type;
    if (contentType) {
      const baseSlug = params.slug || generateSlug(params.title);
      const uniqueSlug = await generateUniqueSlug(client, contentType, baseSlug);
      updateData.slug = {
        _type: "slug",
        current: uniqueSlug,
      };
    }
  }

  const updatedDocument = await client.patch(documentId).set(updateData).commit();

  const status = params.publishedAt ? "published" : "draft";
  const contentType = updatedDocument._type;
  const slug = updatedDocument.slug?.current || "";
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kotacom.com";
  const url = `${baseUrl}/${contentType}/${slug}`;

  return {
    documentId: updatedDocument._id,
    status,
    url,
  };
}

/**
 * Attaches an OG image to an existing document
 */
export async function attachOGImage(documentId: string, assetId: string): Promise<void> {
  const client = getSanityClient();

  await client
    .patch(documentId)
    .set({
      ogImage: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: assetId,
        },
      },
    })
    .commit();
}

/**
 * Sets the publish status of a document
 */
export async function setPublishStatus(
  documentId: string,
  status: "draft" | "published"
): Promise<void> {
  const client = getSanityClient();

  const updateData: any = {};

  if (status === "published") {
    updateData.publishedAt = new Date().toISOString();
  } else {
    updateData.publishedAt = null;
  }

  await client.patch(documentId).set(updateData).commit();
}

/**
 * Publishes content with error handling
 * Returns error details if publish fails
 */
export async function publishContentSafe(
  params: PublishParams
): Promise<{ success: true; result: PublishResult } | { success: false; error: string }> {
  try {
    const result = await publishContent(params);
    return { success: true, result };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Sanity publish failed:", errorMessage);
    return { success: false, error: errorMessage };
  }
}
