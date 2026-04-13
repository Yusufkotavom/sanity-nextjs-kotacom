import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contentIdeas } from "@repo/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

/**
 * PATCH /api/ai/ideas/[id]
 * Update content idea fields
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { audience, keyword, wordCount, location } = body;

    const database = db();

    const [updated] = await database
      .update(contentIdeas)
      .set({
        audience,
        keyword,
        wordCount,
        location,
        updatedAt: new Date(),
      })
      .where(eq(contentIdeas.id, id))
      .returning();

    if (!updated) {
      return NextResponse.json(
        { error: "Idea not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      idea: updated,
    });
  } catch (error) {
    console.error("Failed to update idea:", error);
    return NextResponse.json(
      { error: "Failed to update idea" },
      { status: 500 }
    );
  }
}
