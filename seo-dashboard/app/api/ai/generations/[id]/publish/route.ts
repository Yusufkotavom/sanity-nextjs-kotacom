import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { aiGenerations } from "@repo/db/schema";
import { eq } from "drizzle-orm";
import { publishContentSafe } from "@/lib/ai-writer/sanity-publisher";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";

export const dynamic = "force-dynamic";

/**
 * POST /api/ai/generations/[id]/publish
 * Publish edited content to Sanity
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  try {
    const { id } = await params;
    const database = db();

    // Get generation
    const [generation] = await database
      .select()
      .from(aiGenerations)
      .where(eq(aiGenerations.id, id));

    if (!generation) {
      return NextResponse.json(
        { error: "Generation not found" },
        { status: 404 }
      );
    }

    const parsedOutput = generation.parsedOutput as any;
    const inputJson = generation.inputJson as any;

    if (!parsedOutput || !parsedOutput.title || !parsedOutput.body) {
      return NextResponse.json(
        { error: "Generation content is invalid or incomplete" },
        { status: 400 }
      );
    }

    // Determine content type
    let contentType = inputJson?.contentType || "post";
    if (contentType === "product") {
      contentType = "project"; // Map to Sanity schema type
    }

    // Publish to Sanity
    const publishResult = await publishContentSafe({
      contentType,
      title: parsedOutput.title,
      excerpt: parsedOutput.excerpt || "",
      body: parsedOutput.body,
      ogImageAssetId: generation.ogImageAssetId || undefined,
    });

    if (!publishResult.success) {
      // Update status to failed
      await database.transaction(async (tx) => {
        await tx
          .update(aiGenerations)
          .set({
            sanityWriteStatus: "failed",
          })
          .where(eq(aiGenerations.id, id));
      });

      return NextResponse.json(
        { error: publishResult.error || "Failed to publish to Sanity" },
        { status: 500 }
      );
    }

    // Update generation with Sanity document ID
    await database.transaction(async (tx) => {
      await tx
        .update(aiGenerations)
        .set({
          sanityDocumentId: publishResult.result.documentId,
          sanityWriteStatus: "success",
        })
        .where(eq(aiGenerations.id, id));
    });

    return NextResponse.json({
      success: true,
      documentId: publishResult.result.documentId,
      message: "Content published to Sanity successfully",
    });
  } catch (error) {
    console.error("Failed to publish generation:", error);
    return NextResponse.json(
      { error: "Failed to publish to Sanity" },
      { status: 500 }
    );
  }
}
