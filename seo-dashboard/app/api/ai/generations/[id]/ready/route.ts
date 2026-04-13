import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { aiGenerations } from "@repo/db/schema";
import { eq } from "drizzle-orm";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";

export const dynamic = "force-dynamic";

/**
 * PATCH /api/ai/generations/[id]/ready
 * Toggle ready to publish status
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

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

    // Validate that content is not already published
    if (existing.sanityWriteStatus === "success") {
      return NextResponse.json(
        { error: "Cannot update ready status for already published content" },
        { status: 400 }
      );
    }

    // Update ready status
    await database
      .update(aiGenerations)
      .set({ readyToPublish })
      .where(eq(aiGenerations.id, id));

    // Fetch and return updated generation record
    const [updated] = await database
      .select()
      .from(aiGenerations)
      .where(eq(aiGenerations.id, id));

    const inputJson = updated.inputJson as any;
    const parsedOutput = updated.parsedOutput as any;

    return NextResponse.json({
      id: updated.id,
      title: parsedOutput?.title || "",
      excerpt: parsedOutput?.excerpt || "",
      body: parsedOutput?.body || "",
      contentType: inputJson?.contentType || "post",
      provider: updated.provider,
      model: updated.model,
      validationStatus: updated.validationStatus,
      validationErrors: updated.validationErrors as string[] | undefined,
      sanityWriteStatus: updated.sanityWriteStatus,
      sanityDocumentId: updated.sanityDocumentId,
      ogImageAssetId: updated.ogImageAssetId,
      readyToPublish: updated.readyToPublish,
      createdAt: updated.createdAt,
    });
  } catch (error) {
    console.error("Failed to update ready status:", error);
    return NextResponse.json(
      { error: "Failed to update ready status" },
      { status: 500 }
    );
  }
}
