import { NextRequest, NextResponse } from "next/server";
import { generateContent, resolvePrompt } from "@/lib/ai-writer/content-generator";

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

    // Generate content
    const result = await generateContent({
      contentType,
      prompt: resolved.prompt,
      system: resolved.system,
      templateId,
      generateOgImage,
      autoPublish,
      metadata: {
        source: "dashboard-ui",
        variables,
      },
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Content generation error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Content generation failed" },
      { status: 500 }
    );
  }
}
