import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contentIdeas } from "@repo/db/schema";
import { and, eq, inArray } from "drizzle-orm";
import { renderTemplate } from "@/lib/ai-writer/prompt-templates";
import { generateContent } from "@/lib/ai-writer/content-generator";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";
import { checkSimpleRateLimit } from "@/lib/rate-limit";
import { assertSupportedContentType } from "@/lib/ai-writer/content-type";

export const dynamic = "force-dynamic";

const BULK_CONCURRENCY = 3;

async function processSingleIdea(idea: any, templateId: string, generateOgImage: boolean) {
  const variables: Record<string, string> = {
    topic: idea.topic,
    idea: idea.idea,
    audience: idea.audience || "general audience",
    keyword: idea.keyword || idea.topic,
    word_count: idea.wordCount || "1500",
    location: idea.location || "general",
    problem: idea.idea,
    solution: idea.outline || idea.idea,
    product_name: idea.topic,
    service_name: idea.topic,
    competitor: "alternatives",
  };

  if (idea.outline) {
    variables.outline = idea.outline;
  }

  const prompt = await renderTemplate(templateId, variables);
  const generation = await generateContent({
    contentType: assertSupportedContentType(idea.contentType),
    prompt,
    templateId,
    generateOgImage,
    metadata: {
      ideaId: idea.id,
      source: "content-ideas-bulk",
    },
  });

  await db()
    .update(contentIdeas)
    .set({
      generationId: generation.id,
      status: "generated",
      updatedAt: new Date(),
    })
    .where(eq(contentIdeas.id, idea.id));

  return generation;
}

export async function POST(request: NextRequest) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const rate = checkSimpleRateLimit({ key: `ideas-generate-content-bulk:${ip}`, limit: 10, windowMs: 60_000 });
  if (!rate.ok) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });

  try {
    const body = await request.json();
    const ideaIds: string[] = Array.isArray(body.ideaIds) ? body.ideaIds : [];
    const templateId: string = body.templateId;
    const generateOgImage: boolean = body.generateOgImage !== false;

    if (!templateId || ideaIds.length === 0) {
      return NextResponse.json({ error: "ideaIds and templateId are required" }, { status: 400 });
    }

    const ideas = await db()
      .select()
      .from(contentIdeas)
      .where(and(inArray(contentIdeas.id, ideaIds), eq(contentIdeas.status, "idea")));

    if (ideas.length === 0) {
      return NextResponse.json(
        { error: "No eligible ideas found (only status='idea' can be bulk generated)" },
        { status: 400 },
      );
    }

    const success: Array<{ ideaId: string; generationId: string }> = [];
    const failed: Array<{ ideaId: string; error: string }> = [];

    for (let i = 0; i < ideas.length; i += BULK_CONCURRENCY) {
      const chunk = ideas.slice(i, i + BULK_CONCURRENCY);
      const results = await Promise.all(
        chunk.map(async (idea) => {
          try {
            const generation = await processSingleIdea(idea, templateId, generateOgImage);
            return { ok: true as const, ideaId: idea.id, generationId: generation.id };
          } catch (error) {
            return {
              ok: false as const,
              ideaId: idea.id,
              error: error instanceof Error ? error.message : "Failed",
            };
          }
        }),
      );

      for (const result of results) {
        if (result.ok) {
          success.push({ ideaId: result.ideaId, generationId: result.generationId });
        } else {
          failed.push({ ideaId: result.ideaId, error: result.error });
        }
      }
    }

    return NextResponse.json({
      success: true,
      summary: {
        requested: ideaIds.length,
        processed: ideas.length,
        succeeded: success.length,
        failed: failed.length,
      },
      successItems: success,
      failedItems: failed,
    });
  } catch (error) {
    console.error("Bulk generate content failed:", error);
    return NextResponse.json({ error: "Bulk generate content failed" }, { status: 500 });
  }
}

