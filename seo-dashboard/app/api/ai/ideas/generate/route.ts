import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contentIdeas } from "@repo/db/schema";
import { generateAiText } from "@/lib/ai-writer/generate";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";
import { checkSimpleRateLimit } from "@/lib/rate-limit";
import { sanitizeText } from "@/lib/sanitize";
import { assertSupportedContentType } from "@/lib/ai-writer/content-type";
import { normalizeQualityMode, normalizeRuntimeProvider, resolveModelSelection } from "@/lib/ai-writer/model-selection";

export const dynamic = "force-dynamic";

/**
 * POST /api/ai/ideas/generate
 * Generate content ideas using AI
 */
export async function POST(request: NextRequest) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const rate = checkSimpleRateLimit({ key: `ideas-generate:${ip}`, limit: 20, windowMs: 60_000 });
  if (!rate.ok) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });

  try {
    const body = await request.json();
    const topic = sanitizeText(body.topic, 200);
    const contentType = assertSupportedContentType(body.contentType);
    const count = Math.min(Number(body.count || 5), 50);
    const customPrompt = sanitizeText(body.customPrompt, 20000);
    const qualityMode = normalizeQualityMode(body.qualityMode);
    const provider = normalizeRuntimeProvider(body.provider);
    const model = sanitizeText(body.model, 200);
    const selection = await resolveModelSelection({
      qualityMode,
      provider,
      model: model || undefined,
    });

    if (!topic || !contentType) {
      return NextResponse.json(
        { error: "Topic and content type are required" },
        { status: 400 }
      );
    }

    const defaultPrompt = `Generate ${count} unique content ideas for ${contentType} about: ${topic}

For each idea, provide:
- idea: The content idea/title
- audience: Target audience for this content
- keyword: Primary SEO keyword
- wordCount: Suggested word count (e.g., "1500", "2000")
- location: If relevant, otherwise "general"

Return ONLY a JSON array. Format:
[
  {
    "idea": "Content idea here",
    "audience": "target audience",
    "keyword": "main keyword",
    "wordCount": "1500",
    "location": "general"
  }
]

Make each idea:
- Specific and actionable
- SEO-friendly
- Relevant to the topic
- Unique from each other`;

    const prompt = customPrompt
      ? customPrompt
          .replace(/\{\{\s*topic\s*\}\}/gi, topic)
          .replace(/\{\{\s*contentType\s*\}\}/gi, contentType)
          .replace(/\{\{\s*count\s*\}\}/gi, String(count))
      : defaultPrompt;

    const result = await generateAiText({
      prompt,
      system: "You are a content strategist expert. Generate creative, SEO-optimized content ideas with metadata.",
      provider: selection.provider,
      model: selection.model,
    });

    // Parse AI response
    let ideas: Array<{
      idea: string;
      audience?: string;
      keyword?: string;
      wordCount?: string;
      location?: string;
    }> = [];
    
    try {
      const cleaned = result.text
        .replace(/^```(?:json)?\s*\n/gm, "")
        .replace(/\n```\s*$/gm, "")
        .trim();
      ideas = JSON.parse(cleaned);
    } catch {
      // Fallback: treat as simple string array
      const simpleIdeas = result.text
        .split("\n")
        .filter((line) => line.trim())
        .map((line) => line.replace(/^[-*]\s*/, "").trim())
        .slice(0, count);
      
      ideas = simpleIdeas.map(idea => ({
        idea,
        audience: "general audience",
        keyword: topic,
        wordCount: "1500",
        location: "general",
      }));
    }

    // Store ideas in database
    const database = db();
    const createdIdeas = [];

    for (const ideaData of ideas) {
      const [created] = await database
        .insert(contentIdeas)
        .values({
          topic,
          contentType,
          idea: ideaData.idea,
          audience: ideaData.audience || "general audience",
          keyword: ideaData.keyword || topic,
          wordCount: ideaData.wordCount || "1500",
          location: ideaData.location || "general",
          status: "idea",
        })
        .returning();
      
      createdIdeas.push(created);
    }

    return NextResponse.json({
      success: true,
      ideas: createdIdeas,
    });
  } catch (error) {
    console.error("Failed to generate ideas:", error);
    return NextResponse.json(
      { error: "Failed to generate ideas" },
      { status: 500 }
    );
  }
}
