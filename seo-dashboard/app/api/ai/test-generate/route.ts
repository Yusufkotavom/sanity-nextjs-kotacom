import { NextRequest, NextResponse } from "next/server";
import { generateContent, resolvePrompt } from "@/lib/ai-writer/content-generator";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";
import { checkSimpleRateLimit } from "@/lib/rate-limit";
import { assertSupportedContentType } from "@/lib/ai-writer/content-type";

/**
 * Test endpoint for AI content generation
 * 
 * POST /api/ai/test-generate
 * 
 * Body:
 * {
 *   "contentType": "post" | "service" | "product",
 *   "prompt": "string" (optional if using template),
 *   "templateId": "string" (optional),
 *   "variables": { "key": "value" } (optional, for template),
 *   "generateOgImage": boolean (optional, default: false),
 *   "autoPublish": boolean (optional, default: false)
 * }
 */
export async function POST(request: NextRequest) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const rate = checkSimpleRateLimit({ key: `test-generate:${ip}`, limit: 15, windowMs: 60_000 });
  if (!rate.ok) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });

  try {
    const body = await request.json();

    const {
      contentType,
      prompt: customPrompt,
      templateId,
      variables,
      generateOgImage = false,
      autoPublish = false,
    } = body;

    // Validate content type
    const validatedContentType = assertSupportedContentType(contentType);

    // Resolve prompt
    const resolved = await resolvePrompt({
      customPrompt,
      templateId,
      contentType: validatedContentType,
      variables,
    });

    console.log("Generating content with prompt:", resolved.prompt.substring(0, 100) + "...");

    // Generate content
    const result = await generateContent({
      contentType: validatedContentType,
      prompt: resolved.prompt,
      system: resolved.system,
      templateId,
      generateOgImage,
      autoPublish,
      metadata: {
        source: "test-api",
        timestamp: new Date().toISOString(),
      },
    });

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Content generation error:", error);
    
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Content generation failed",
      },
      { status: 500 }
    );
  }
}
