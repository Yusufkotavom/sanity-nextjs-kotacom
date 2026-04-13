import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contentIdeas, aiGenerations } from "@repo/db/schema";
import { desc, eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

/**
 * GET /api/ai/ideas/list
 * List all content ideas with generation info
 */
export async function GET(request: NextRequest) {
  try {
    const database = db();

    const ideas = await database
      .select({
        id: contentIdeas.id,
        topic: contentIdeas.topic,
        contentType: contentIdeas.contentType,
        idea: contentIdeas.idea,
        outline: contentIdeas.outline,
        generationId: contentIdeas.generationId,
        status: contentIdeas.status,
        audience: contentIdeas.audience,
        keyword: contentIdeas.keyword,
        wordCount: contentIdeas.wordCount,
        location: contentIdeas.location,
        createdAt: contentIdeas.createdAt,
        updatedAt: contentIdeas.updatedAt,
        ogImageAssetId: aiGenerations.ogImageAssetId,
      })
      .from(contentIdeas)
      .leftJoin(aiGenerations, eq(contentIdeas.generationId, aiGenerations.id))
      .orderBy(desc(contentIdeas.createdAt))
      .limit(50);

    return NextResponse.json({
      success: true,
      ideas,
    });
  } catch (error) {
    console.error("Failed to list ideas:", error);
    return NextResponse.json(
      { error: "Failed to list ideas" },
      { status: 500 }
    );
  }
}
