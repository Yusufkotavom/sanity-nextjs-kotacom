import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contentIdeas } from "@repo/db/schema";
import { eq } from "drizzle-orm";
import { generateAiText } from "@/lib/ai-writer/generate";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";
import { checkSimpleRateLimit } from "@/lib/rate-limit";
import { sanitizeText } from "@/lib/sanitize";

export const dynamic = "force-dynamic";

/**
 * POST /api/ai/ideas/generate-outline
 * Generate outline from content idea
 */
export async function POST(request: NextRequest) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const rate = checkSimpleRateLimit({ key: `ideas-outline:${ip}`, limit: 30, windowMs: 60_000 });
  if (!rate.ok) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });

  try {
    const body = await request.json();
    const { ideaId } = body;
    const customPrompt = sanitizeText(body.customPrompt, 20000);

    if (!ideaId) {
      return NextResponse.json(
        { error: "Idea ID is required" },
        { status: 400 }
      );
    }

    const database = db();

    // Get the idea
    const [idea] = await database
      .select()
      .from(contentIdeas)
      .where(eq(contentIdeas.id, ideaId));

    if (!idea) {
      return NextResponse.json(
        { error: "Idea not found" },
        { status: 404 }
      );
    }

    const defaultPrompt = `Create a detailed content outline for this ${idea.contentType}:

"${idea.idea}"

Return a structured outline with:
- Main sections/headings
- Key points for each section
- Suggested word count per section
- SEO keywords to target

Format as a clear, hierarchical outline.`;

    const prompt = customPrompt
      ? customPrompt
          .replace(/\{\{\s*idea\s*\}\}/gi, idea.idea)
          .replace(/\{\{\s*topic\s*\}\}/gi, idea.topic)
          .replace(/\{\{\s*contentType\s*\}\}/gi, idea.contentType)
          .replace(/\{\{\s*audience\s*\}\}/gi, idea.audience || "general audience")
          .replace(/\{\{\s*keyword\s*\}\}/gi, idea.keyword || idea.topic)
          .replace(/\{\{\s*wordCount\s*\}\}/gi, idea.wordCount || "1500")
          .replace(/\{\{\s*location\s*\}\}/gi, idea.location || "general")
      : defaultPrompt;

    const result = await generateAiText({
      prompt,
      system: "You are a content strategist expert. Create detailed, SEO-optimized content outlines.",
    });

    // Update idea with outline
    await database
      .update(contentIdeas)
      .set({
        outline: result.text,
        status: "outline",
        updatedAt: new Date(),
      })
      .where(eq(contentIdeas.id, ideaId));

    return NextResponse.json({
      success: true,
      outline: result.text,
    });
  } catch (error) {
    console.error("Failed to generate outline:", error);
    return NextResponse.json(
      { error: "Failed to generate outline" },
      { status: 500 }
    );
  }
}
