import { db } from "@/lib/db";
import { aiGenerations } from "@repo/db/schema";
import { eq } from "drizzle-orm";
import { generateAiText } from "./generate";
import { getTemplate, renderTemplate } from "./prompt-templates";
import { getAiWriterResolvedSettings } from "./settings-source";
import { generateImageSafe } from "./og-image-generator";
import { publishContentSafe } from "./sanity-publisher";
import { assertSupportedContentType, toSanityPublishType } from "./content-type";
import {
  resolveModelSelection,
  type ResolveModelSelectionInput,
  type ResolveModelSelectionResult,
} from "./model-selection";

export interface GenerateContentParams {
  contentType: "post" | "service" | "product";
  prompt?: string;
  system?: string;
  model?: string;
  provider?: "gateway" | "groq" | "gemini" | "vertex";
  qualityMode?: "economy" | "standard" | "high";
  metadata?: Record<string, any>;
  templateId?: string;
  promptTemplateId?: string;
  customPrompt?: string;
  jobRunId?: string;
  generateOgImage?: boolean;
  autoPublish?: boolean;
}

export interface GeneratedContent {
  id: string;
  contentType: string;
  title: string;
  excerpt: string;
  body: string;
  provider: string;
  model: string;
  rawOutput: string;
  validationStatus: "valid" | "invalid" | "pending";
  validationErrors?: string[];
  sanityDocumentId?: string;
  sanityWriteStatus: "pending" | "success" | "failed";
  ogImageAssetId?: string;
}

export interface BatchGenerateParams {
  contentType: "post" | "service" | "product";
  prompt: string;
  system?: string;
  batchSize: number;
  concurrency?: number;
  generateOgImage?: boolean;
  autoPublish?: boolean;
  templateId?: string;
  jobRunId?: string;
  metadata?: Record<string, any>;
}

const MAX_BATCH_SIZE = 50;
const DEFAULT_CONCURRENCY = 3;
const MAX_PROMPT_LENGTH = 20000;
const AI_RETRY_ATTEMPTS = 3;
const AI_RETRY_BASE_DELAY_MS = 500;

// Cache for AI Writer Settings
let settingsCache: {
  data: Awaited<ReturnType<typeof getAiWriterResolvedSettings>> | null;
  timestamp: number;
} = {
  data: null,
  timestamp: 0,
};

const SETTINGS_CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Gets AI Writer Settings with caching
 */
async function getCachedSettings() {
  const now = Date.now();
  
  if (settingsCache.data && now - settingsCache.timestamp < SETTINGS_CACHE_TTL) {
    return settingsCache.data;
  }

  const settings = await getAiWriterResolvedSettings();
  settingsCache = {
    data: settings,
    timestamp: now,
  };

  return settings;
}

/**
 * Resolves prompt from custom prompt, template, or default settings
 */
export async function resolvePrompt(params: {
  customPrompt?: string;
  templateId?: string;
  contentType: "post" | "service" | "product";
  variables?: Record<string, string>;
}): Promise<{ prompt: string; system?: string }> {
  // Priority 1: Custom prompt
  if (params.customPrompt) {
    return { prompt: params.customPrompt };
  }

  // Priority 2: Template
  if (params.templateId) {
    const template = await getTemplate(params.templateId);
    
    if (!template) {
      throw new Error(`Template ${params.templateId} not found`);
    }

    const renderedPrompt = await renderTemplate(params.templateId, params.variables || {});
    
    return {
      prompt: renderedPrompt,
      system: template.systemPrompt,
    };
  }

  // Priority 3: Default prompts from AI Writer Settings
  const settings = await getCachedSettings();

  let defaultPrompt = "";
  
  if (params.contentType === "post") {
    defaultPrompt = settings.prompts.postRewrite;
  } else if (params.contentType === "service") {
    defaultPrompt = settings.prompts.serviceRewrite;
  } else if (params.contentType === "product") {
    defaultPrompt = settings.prompts.projectRewrite;
  }

  if (!defaultPrompt) {
    throw new Error(`No default prompt available for content type: ${params.contentType}`);
  }

  return {
    prompt: defaultPrompt,
    system: settings.prompts.globalSystem,
  };
}

/**
 * Strips markdown code blocks from text
 */
function stripMarkdownCodeBlocks(text: string): string {
  // Remove markdown code blocks (```json ... ``` or ``` ... ```)
  return text
    .replace(/^```(?:json|javascript|typescript)?\s*\n/gm, "")
    .replace(/\n```\s*$/gm, "")
    .replace(/^```\s*\n/gm, "")
    .trim();
}

/**
 * Attempts to parse the first JSON object found in text
 */
function parseEmbeddedJsonObject(text: string): Record<string, any> | null {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;

  const candidate = text.slice(start, end + 1).trim();
  const candidates = [
    candidate,
    candidate.replace(/,\s*([}\]])/g, "$1"), // remove trailing commas
  ];

  for (const item of candidates) {
    try {
      const parsed = JSON.parse(item);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        return parsed as Record<string, any>;
      }
    } catch {
      // try next candidate
    }
  }

  return null;
}

function extractJsonField(text: string, fieldName: "title" | "excerpt" | "body" | "content"): string {
  const searchKey = `"${fieldName}"`;
  const openIdx = text.indexOf(searchKey);
  if (openIdx === -1) return "";
  
  const colonIdx = text.indexOf(":", openIdx + searchKey.length);
  if (colonIdx === -1) return "";
  
  const firstQuoteIdx = text.indexOf('"', colonIdx);
  if (firstQuoteIdx === -1) return "";
  
  const startIdx = firstQuoteIdx + 1;
  const endRegex = /"(?=\s*,|\s*\})/g;
  endRegex.lastIndex = startIdx;
  
  let match;
  while ((match = endRegex.exec(text)) !== null) {
      let backslashCount = 0;
      let i = match.index - 1;
      while (i >= 0 && text[i] === '\\') {
          backslashCount++;
          i--;
      }
      
      if (backslashCount % 2 === 0) {
          let result = text.substring(startIdx, match.index);
          try {
              const jsonSafe = result.replace(/\n/g, "\\n").replace(/\r/g, "");
              return JSON.parse(`"${jsonSafe}"`);
          } catch {
              return result
                .replace(/\\n/g, "\n")
                .replace(/\\"/g, '"')
                .replace(/\\\\/g, "\\")
                .trim();
          }
      }
  }
  
  const nextKeyMatch = text.substring(startIdx).match(/\n\s*"[^"]+"\s*:/);
  if (nextKeyMatch && nextKeyMatch.index !== undefined) {
      let result = text.substring(startIdx, startIdx + nextKeyMatch.index);
      result = result.replace(/"\s*,?\s*$/, ""); 
      return result
        .replace(/\\n/g, "\n")
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, "\\")
        .trim();
  }
  
  let rest = text.substring(startIdx);
  const lastBraceIdx = rest.lastIndexOf("}");
  if (lastBraceIdx > -1) {
      rest = rest.substring(0, lastBraceIdx);
  }
  rest = rest.replace(/"\s*,?\s*$/, "");
  return rest
    .replace(/\\n/g, "\n")
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, "\\")
    .trim();
}

/**
 * Parses AI output into structured content fields
 */
function parseContent(rawOutput: string, contentType: string): {
  title: string;
  excerpt: string;
  body: string;
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  let title = "";
  let excerpt = "";
  let body = "";

  // Strip markdown code blocks first
  const cleanedOutput = stripMarkdownCodeBlocks(rawOutput);

  console.log("=== PARSING CONTENT ===");
  console.log("Raw output length:", rawOutput.length);
  console.log("Cleaned output preview:", cleanedOutput.substring(0, 200));

  const parsedObject = parseEmbeddedJsonObject(cleanedOutput);

  if (parsedObject) {
    console.log("Parsed as JSON object:", {
      hasTitle: !!parsedObject.title,
      hasExcerpt: !!parsedObject.excerpt,
      hasBody: !!(parsedObject.body || parsedObject.content),
    });
    title = String(parsedObject.title || "").trim();
    excerpt = String(parsedObject.excerpt || "").trim();
    body = String(parsedObject.body || parsedObject.content || "").trim();
  } else {
    console.log("JSON parse failed, trying markdown extraction");

    // Try extracting quoted JSON fields from non-parseable payload
    title = extractJsonField(cleanedOutput, "title");
    excerpt = extractJsonField(cleanedOutput, "excerpt");
    body = extractJsonField(cleanedOutput, "body") || extractJsonField(cleanedOutput, "content");
    
    // If still missing, fallback to markdown style extraction
    if (!title || !body) {
      const isJsonLookalike = cleanedOutput.trim().startsWith('{');
      const lines = cleanedOutput.split("\n");
      let currentSection = "";

      for (const line of lines) {
        const trimmed = line.trim();

        if (trimmed.toLowerCase().startsWith("title:")) {
          title = title || trimmed.substring(6).trim();
        } else if (trimmed.toLowerCase().startsWith("excerpt:")) {
          excerpt = excerpt || trimmed.substring(8).trim();
        } else if (
          trimmed.toLowerCase().startsWith("body:") ||
          trimmed.toLowerCase().startsWith("content:")
        ) {
          currentSection = "body";
        } else if (currentSection === "body" && trimmed) {
          body += (body ? "\n\n" : "") + trimmed;
        }
      }

      if (!isJsonLookalike) {
        // If still no title, use first line
        if (!title && lines.length > 0) {
          title = lines[0].replace(/^#+\s*/, "").trim();
        }

        // If still no body, use everything after title
        if (!body) {
          body = lines.slice(1).join("\n").trim();
        }
      }
    }
    
    console.log("Markdown extraction result:", { 
      titleLength: title.length, 
      excerptLength: excerpt.length, 
      bodyLength: body.length 
    });
  }

  // Validate required fields - more lenient, always save
  if (!title || title.trim().length === 0) {
    errors.push("Title is missing or empty");
    // Use placeholder if completely empty
    title = title || "Untitled Content";
  } else if (title.length > 200) {
    // Just warn, don't fail
    console.warn("Title exceeds 200 characters, will be truncated");
    title = title.substring(0, 200);
  }

  if (!excerpt || excerpt.trim().length === 0) {
    // Auto-generate excerpt from body if missing
    if (body && body.length > 0) {
      excerpt = body.substring(0, 150).trim() + "...";
      console.log("Auto-generated excerpt from body");
    } else {
      errors.push("Excerpt is missing or empty");
      excerpt = excerpt || "No excerpt available";
    }
  } else if (excerpt.length > 300) {
    // Just truncate, don't fail
    console.warn("Excerpt exceeds 300 characters, will be truncated");
    excerpt = excerpt.substring(0, 300);
  }

  if (!body || body.trim().length === 0) {
    errors.push("Body is missing or empty");
    body = body || "No content generated";
  }

  if (contentType === "service" && !/layanan|service|jasa/i.test(`${title} ${excerpt} ${body}`)) {
    errors.push("Service content should clearly mention service context");
  }
  if (contentType === "product" && !/produk|product|fitur|spesifikasi/i.test(`${title} ${excerpt} ${body}`)) {
    errors.push("Product content should mention product context");
  }

  // Always valid now, but keep errors for warning
  const valid = true; // Changed: always save, show warnings instead

  console.log("=== PARSE RESULT ===");
  console.log("Valid:", valid);
  console.log("Warnings:", errors.length > 0 ? errors : "None");
  console.log("Title:", title.substring(0, 50));
  console.log("Excerpt:", excerpt.substring(0, 50));
  console.log("Body length:", body.length);

  return { title, excerpt, body, valid, errors };
}

async function generateAiTextWithBackoff(params: {
  prompt: string;
  system?: string;
  provider?: "gateway" | "groq" | "gemini" | "vertex";
  model?: string;
}) {
  let lastError: unknown;
  for (let attempt = 1; attempt <= AI_RETRY_ATTEMPTS; attempt++) {
    try {
      return await generateAiText(params);
    } catch (error) {
      lastError = error;
      if (attempt === AI_RETRY_ATTEMPTS) break;
      const delayMs = AI_RETRY_BASE_DELAY_MS * 2 ** (attempt - 1);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
  throw lastError instanceof Error ? lastError : new Error("AI generation failed after retries");
}

/**
 * Generates content using AI providers with fallback
 */
export async function generateContent(params: GenerateContentParams): Promise<GeneratedContent> {
  const database = db();
  const normalizedContentType = assertSupportedContentType(params.contentType);

  const resolvedSelection = await resolveModelSelection({
    qualityMode: params.qualityMode,
    provider: params.provider,
    model: params.model,
  } as ResolveModelSelectionInput);

  // Resolve prompt if not provided
  let prompt = params.prompt || params.customPrompt || "";
  let system = params.system;
  
  if (!prompt) {
    const resolved = await resolvePrompt({
      customPrompt: params.customPrompt,
      templateId: params.promptTemplateId || params.templateId,
      contentType: normalizedContentType,
      variables: params.metadata as Record<string, string>,
    });
    prompt = resolved.prompt;
    system = resolved.system || system;
  }

  // Truncate prompt if too long
  if (prompt.length > MAX_PROMPT_LENGTH) {
    console.warn(`Prompt exceeds ${MAX_PROMPT_LENGTH} characters, truncating`);
    prompt = prompt.substring(0, MAX_PROMPT_LENGTH);
  }

  // Generate content using AI
  let rawOutput = "";
  let provider = "";
  let model = "";

  try {
    const result = await generateAiTextWithBackoff({
      prompt,
      system,
      provider: resolvedSelection.provider,
      model: resolvedSelection.model,
    });

    rawOutput = result.text;
    provider = result.providerMode;
    model = result.model;
  } catch (error) {
    // All providers failed
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("All AI providers failed:", errorMessage);

    // Store failed generation
    const [generation] = await database
      .insert(aiGenerations)
      .values({
        sourceType: params.jobRunId ? "scheduled" : "manual",
        templateId: params.templateId,
        jobRunId: params.jobRunId,
        inputJson: {
          prompt: params.prompt,
          system: params.system || "",
          contentType: normalizedContentType,
          model: resolvedSelection.model,
          provider: resolvedSelection.provider,
          qualityMode: resolvedSelection.qualityMode,
          metadata: params.metadata,
        } as any,
        provider: "unknown",
        model: "unknown",
        rawOutput: "",
        validationStatus: "invalid",
        validationErrors: [errorMessage] as any,
        sanityWriteStatus: "pending",
      })
      .returning();

    throw new Error(`Content generation failed: ${errorMessage}`);
  }

  // Parse content
  const parsed = parseContent(rawOutput, normalizedContentType);

  // Store generation in database
  const [generation] = await database
    .insert(aiGenerations)
    .values({
      sourceType: params.jobRunId ? "scheduled" : "manual",
      templateId: params.templateId,
      jobRunId: params.jobRunId,
      inputJson: {
        prompt: params.prompt,
        system: params.system || "",
        contentType: normalizedContentType,
        model: resolvedSelection.model,
        provider: resolvedSelection.provider,
        qualityMode: resolvedSelection.qualityMode,
        metadata: params.metadata,
      } as any,
      provider,
      model,
      rawOutput,
      parsedOutput: parsed.valid
        ? {
            title: parsed.title,
            excerpt: parsed.excerpt,
            body: parsed.body,
          }
        : null,
      validationStatus: parsed.valid ? "valid" : "invalid",
      validationErrors: parsed.errors.length > 0 ? (parsed.errors as any) : null,
      sanityWriteStatus: "pending",
    })
    .returning();

  let ogImageAssetId: string | undefined;
  let sanityDocumentId: string | undefined;
  let sanityWriteStatus: "pending" | "success" | "failed" = "pending";

  // Generate OG image if enabled and content is valid
  if (params.generateOgImage && parsed.valid) {
    const ogImage = await generateImageSafe({
      title: parsed.title,
      excerpt: parsed.excerpt,
      contentType: normalizedContentType,
    });

    if (ogImage) {
      ogImageAssetId = ogImage.assetId;
      
      // Update generation with OG image
      await database
        .update(aiGenerations)
        .set({ ogImageAssetId })
        .where(eq(aiGenerations.id, generation.id));
    }
  }

  // Publish to Sanity if auto-publish enabled and content is valid
  if (params.autoPublish && parsed.valid) {
    const publishResult = await publishContentSafe({
      contentType: toSanityPublishType(normalizedContentType),
      title: parsed.title,
      excerpt: parsed.excerpt,
      body: parsed.body,
      ogImageAssetId,
    });

    if (publishResult.success) {
      sanityDocumentId = publishResult.result.documentId;
      sanityWriteStatus = "success";
    } else {
      sanityWriteStatus = "failed";
    }

    // Update generation with Sanity info
    await database
      .update(aiGenerations)
      .set({
        sanityDocumentId,
        sanityWriteStatus,
      })
      .where(eq(aiGenerations.id, generation.id));
  }

  return {
    id: generation.id,
    contentType: normalizedContentType,
    title: parsed.title,
    excerpt: parsed.excerpt,
    body: parsed.body,
    provider,
    model,
    rawOutput,
    validationStatus: parsed.valid ? "valid" : "invalid",
    validationErrors: parsed.errors.length > 0 ? parsed.errors : undefined,
    sanityDocumentId,
    sanityWriteStatus,
    ogImageAssetId,
  };
}

/**
 * Generates multiple content items in batch with concurrency control
 */
export async function generateBatch(params: BatchGenerateParams): Promise<GeneratedContent[]> {
  const batchSize = Math.min(params.batchSize, MAX_BATCH_SIZE);
  const concurrency = params.concurrency || DEFAULT_CONCURRENCY;
  const normalizedContentType = assertSupportedContentType(params.contentType);

  const results: GeneratedContent[] = [];
  const errors: Array<{ index: number; error: string }> = [];

  // Process in batches with concurrency limit
  for (let i = 0; i < batchSize; i += concurrency) {
    const batch = [];
    
    for (let j = 0; j < concurrency && i + j < batchSize; j++) {
      const index = i + j;
      
      batch.push(
        generateContent({
          contentType: normalizedContentType,
          prompt: params.prompt,
          system: params.system,
          templateId: params.templateId,
          jobRunId: params.jobRunId,
          generateOgImage: params.generateOgImage,
          autoPublish: params.autoPublish,
          metadata: { ...params.metadata, batchIndex: index },
        })
          .then((result) => ({ index, result }))
          .catch((error) => ({
            index,
            error: error instanceof Error ? error.message : "Unknown error",
          }))
      );
    }

    const batchResults = await Promise.all(batch);

    for (const item of batchResults) {
      if ("result" in item) {
        results.push(item.result);
      } else if ("error" in item) {
        errors.push({ index: item.index, error: item.error });
        console.error(`Batch item ${item.index} failed:`, item.error);
      }
    }
  }

  console.log(`Batch generation complete: ${results.length} succeeded, ${errors.length} failed`);

  return results;
}

/**
 * Retries a failed generation with same parameters
 */
export async function retryGeneration(generationId: string): Promise<GeneratedContent> {
  const database = db();

  // Get original generation
  const [original] = await database
    .select()
    .from(aiGenerations)
    .where(eq(aiGenerations.id, generationId));

  if (!original) {
    throw new Error(`Generation ${generationId} not found`);
  }

  const inputJson = original.inputJson as any;

  // Retry with original parameters
  return generateContent({
    contentType: assertSupportedContentType(inputJson.contentType),
    prompt: inputJson.prompt,
    system: inputJson.system,
    metadata: {
      ...(inputJson.metadata || {}),
      retryOf: generationId,
      retryAttempt: ((inputJson.metadata?.retryAttempt as number) || 0) + 1,
    },
    templateId: original.templateId || undefined,
    jobRunId: original.jobRunId || undefined,
  });
}
