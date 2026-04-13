import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contentIdeas } from "@repo/db/schema";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";
import { checkSimpleRateLimit } from "@/lib/rate-limit";
import { sanitizeText } from "@/lib/sanitize";
import { assertSupportedContentType } from "@/lib/ai-writer/content-type";

export const dynamic = "force-dynamic";

type ManualIdeaInput = {
  idea: string;
  topic?: string;
  audience?: string;
  keyword?: string;
  wordCount?: string;
  location?: string;
};

export async function POST(request: NextRequest) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const rate = checkSimpleRateLimit({ key: `ideas-create:${ip}`, limit: 40, windowMs: 60_000 });
  if (!rate.ok) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });

  try {
    const body = await request.json();
    const contentType = assertSupportedContentType(body.contentType);
    const defaultTopic = sanitizeText(body.topic, 200) || "manual input";
    const defaultAudience = sanitizeText(body.audience, 200) || "general audience";
    const defaultKeyword = sanitizeText(body.keyword, 200) || defaultTopic;
    const defaultWordCount = sanitizeText(body.wordCount, 32) || "1500";
    const defaultLocation = sanitizeText(body.location, 120) || "general";

    const ideasFromText = sanitizeText(body.bulkIdeas, 20000)
      .split("\n")
      .map((line) => sanitizeText(line, 300))
      .filter(Boolean)
      .map((idea): ManualIdeaInput => ({ idea }));

    const arrayIdeas: ManualIdeaInput[] = Array.isArray(body.ideas)
      ? body.ideas
          .map((entry: any) => ({
            idea: sanitizeText(entry?.idea, 300),
            topic: sanitizeText(entry?.topic, 200),
            audience: sanitizeText(entry?.audience, 200),
            keyword: sanitizeText(entry?.keyword, 200),
            wordCount: sanitizeText(entry?.wordCount, 32),
            location: sanitizeText(entry?.location, 120),
          }))
          .filter((entry: ManualIdeaInput) => Boolean(entry.idea))
      : [];

    const singleIdea = sanitizeText(body.idea, 300);
    const combinedIdeas: ManualIdeaInput[] = [
      ...(singleIdea ? [{ idea: singleIdea }] : []),
      ...ideasFromText,
      ...arrayIdeas,
    ].slice(0, 200);

    if (combinedIdeas.length === 0) {
      return NextResponse.json(
        { error: "Provide one idea, bulkIdeas text, or ideas[] payload" },
        { status: 400 },
      );
    }

    const rows = combinedIdeas.map((entry) => ({
      topic: entry.topic || defaultTopic,
      contentType,
      idea: entry.idea,
      audience: entry.audience || defaultAudience,
      keyword: entry.keyword || defaultKeyword,
      wordCount: entry.wordCount || defaultWordCount,
      location: entry.location || defaultLocation,
      status: "idea" as const,
    }));

    const created = await db().insert(contentIdeas).values(rows).returning();

    return NextResponse.json({
      success: true,
      createdCount: created.length,
      ideas: created,
    });
  } catch (error) {
    console.error("Failed to create manual ideas:", error);
    return NextResponse.json({ error: "Failed to create manual ideas" }, { status: 500 });
  }
}

