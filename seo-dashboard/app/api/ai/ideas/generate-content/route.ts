import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contentIdeas } from "@repo/db/schema";
import { eq } from "drizzle-orm";
import { generateContent } from "@/lib/ai-writer/content-generator";
import { renderTemplate } from "@/lib/ai-writer/prompt-templates";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";
import { checkSimpleRateLimit } from "@/lib/rate-limit";
import { assertSupportedContentType } from "@/lib/ai-writer/content-type";

export const dynamic = "force-dynamic";

/**
 * POST /api/ai/ideas/generate-content
 * Generate full content from idea using template
 */
export async function POST(request: NextRequest) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const rate = checkSimpleRateLimit({ key: `ideas-generate-content:${ip}`, limit: 20, windowMs: 60_000 });
  if (!rate.ok) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });

  try {
    const body = await request.json();
    const { ideaId, templateId, generateOgImage = true } = body; // Default true

    if (!ideaId || !templateId) {
      return NextResponse.json(
        { error: "Idea ID and template ID are required" },
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

    // Prepare variables for template
    const resolvedAudience = idea.audience || "general audience";
    const resolvedKeyword = idea.keyword || idea.topic;
    const resolvedWordCount = idea.wordCount || "1500";
    const resolvedLocation = idea.location || "general";

    const variables: Record<string, string> = {
      topic: idea.topic,
      idea: idea.idea,
      audience: resolvedAudience,
      target_audience: resolvedAudience,
      keyword: resolvedKeyword,
      keywords: resolvedKeyword,
      target_keyword: resolvedKeyword,
      word_count: resolvedWordCount,
      wordCount: resolvedWordCount,
      length: resolvedWordCount,
      location: resolvedLocation,
      target_location: resolvedLocation,
      problem: idea.idea,
      solution: idea.outline || idea.idea,
      product_name: idea.topic,
      service_name: idea.topic,
      competitor: "alternatives",
    };

    if (idea.outline) {
      variables.outline = idea.outline;
    }

    // Render template with variables
    const prompt = await renderTemplate(templateId, variables);

    // Generate content
    const result = await generateContent({
      contentType: assertSupportedContentType(idea.contentType),
      prompt,
      templateId,
      generateOgImage,
      metadata: {
        ideaId: idea.id,
        source: "content-ideas",
      },
    });

    // Update idea status
    await database
      .update(contentIdeas)
      .set({
        generationId: result.id,
        status: "generated",
        updatedAt: new Date(),
      })
      .where(eq(contentIdeas.id, ideaId));

    return NextResponse.json({
      success: true,
      generationId: result.id,
      content: {
        title: result.title,
        excerpt: result.excerpt,
      },
    });
  } catch (error) {
    console.error("Failed to generate content:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}
