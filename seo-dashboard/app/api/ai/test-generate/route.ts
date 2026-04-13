import { NextRequest, NextResponse } from "next/server";
import { generateContent, resolvePrompt } from "@/lib/ai-writer/content-generator";

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
    if (!contentType || !["post", "service", "product"].includes(contentType)) {
      return NextResponse.json(
        { error: "Invalid content type. Must be 'post', 'service', or 'product'" },
        { status: 400 }
      );
    }

    // Resolve prompt
    const resolved = await resolvePrompt({
      customPrompt,
      templateId,
      contentType,
      variables,
    });

    console.log("Generating content with prompt:", resolved.prompt.substring(0, 100) + "...");

    // Generate content
    const result = await generateContent({
      contentType,
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
