import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { aiGenerations } from "@repo/db/schema";
import { eq } from "drizzle-orm";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";

export const dynamic = "force-dynamic";

/**
 * GET /api/ai/generations/[id]
 * Fetch a single generation by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  try {
    const { id } = await params;
    const database = db();

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

    // Parse the stored data
    const inputJson = generation.inputJson as any;
    const parsedOutput = generation.parsedOutput as any;

    return NextResponse.json({
      id: generation.id,
      title: parsedOutput?.title || "",
      excerpt: parsedOutput?.excerpt || "",
      body: parsedOutput?.body || "",
      contentType: inputJson?.contentType || "post",
      provider: generation.provider,
      model: generation.model,
      validationStatus: generation.validationStatus,
      validationErrors: generation.validationErrors as string[] | undefined,
      sanityWriteStatus: generation.sanityWriteStatus,
      sanityDocumentId: generation.sanityDocumentId,
      ogImageAssetId: generation.ogImageAssetId,
      readyToPublish: generation.readyToPublish || false,
      createdAt: generation.createdAt,
    });
  } catch (error) {
    console.error("Failed to fetch generation:", error);
    return NextResponse.json(
      { error: "Failed to fetch generation" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/ai/generations/[id]
 * Update generation content
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  try {
    const { id } = await params;
    const body = await request.json();
    const { title, excerpt, bodyContent } = body;

    // Validate inputs
    if (!title || title.length === 0) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    if (title.length > 200) {
      return NextResponse.json(
        { error: "Title must be 200 characters or less" },
        { status: 400 }
      );
    }

    if (!excerpt || excerpt.length === 0) {
      return NextResponse.json(
        { error: "Excerpt is required" },
        { status: 400 }
      );
    }

    if (excerpt.length > 300) {
      return NextResponse.json(
        { error: "Excerpt must be 300 characters or less" },
        { status: 400 }
      );
    }

    if (!bodyContent || bodyContent.length === 0) {
      return NextResponse.json(
        { error: "Body content is required" },
        { status: 400 }
      );
    }

    const database = db();

    // Get existing generation
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

    // Update parsed output
    const updatedParsedOutput = {
      title,
      excerpt,
      body: bodyContent,
    };

    await database
      .update(aiGenerations)
      .set({
        parsedOutput: updatedParsedOutput as any,
        validationStatus: "valid", // Mark as valid after manual edit
      })
      .where(eq(aiGenerations.id, id));

    return NextResponse.json({
      success: true,
      message: "Generation updated successfully",
    });
  } catch (error) {
    console.error("Failed to update generation:", error);
    return NextResponse.json(
      { error: "Failed to update generation" },
      { status: 500 }
    );
  }
}
