import { NextRequest, NextResponse } from "next/server";
import { generateContent, resolvePrompt } from "@/lib/ai-writer/content-generator";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";
import { checkSimpleRateLimit } from "@/lib/rate-limit";
import { assertSupportedContentType } from "@/lib/ai-writer/content-type";

export async function POST(request: NextRequest) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const rate = checkSimpleRateLimit({
    key: `ai-generate-with-template:${ip}`,
    limit: 30,
    windowMs: 60_000,
  });
  if (!rate.ok) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

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

    const validatedContentType = assertSupportedContentType(contentType);

    // Resolve prompt
    const resolved = await resolvePrompt({
      customPrompt,
      templateId,
      contentType: validatedContentType,
      variables,
    });

    // Generate content
    const result = await generateContent({
      contentType: validatedContentType,
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
