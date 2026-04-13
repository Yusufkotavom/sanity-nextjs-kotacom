import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { aiGenerations } from "@repo/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

/**
 * PATCH /api/ai/generations/[id]/ready
 * Toggle ready to publish status
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { readyToPublish } = body;

    if (typeof readyToPublish !== "boolean") {
      return NextResponse.json(
        { error: "readyToPublish must be a boolean" },
        { status: 400 }
      );
    }

    const database = db();

    // Check if generation exists
    const [existing] = await database
      .select()
      .from(aiGenerations)
      .where(eq(aiGenerations.id, id));

    if (!existing) {
      return NextResponse.json(
        { error: "Generation not found" },
        { status: 404 }
      );
    }

    // Update ready status
    await database
      .update(aiGenerations)
      .set({ readyToPublish })
      .where(eq(aiGenerations.id, id));

    return NextResponse.json({
      success: true,
      readyToPublish,
    });
  } catch (error) {
    console.error("Failed to update ready status:", error);
    return NextResponse.json(
      { error: "Failed to update ready status" },
      { status: 500 }
    );
  }
}
