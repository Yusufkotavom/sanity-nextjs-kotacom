import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const [{ ensureSeoApiAccess }, { db }, { schema }, { publishContentSafe }] =
    await Promise.all([
      import("@/lib/seo-ops/api-auth"),
      import("@/lib/db"),
      import("@repo/db"),
      import("@/lib/ai-writer/sanity-publisher"),
    ]);

  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  const body = (await request.json().catch(() => ({}))) as {
    ai_generation_id?: string;
    generation_id?: string;
  };

  const generationId = body.ai_generation_id || body.generation_id;
  if (!generationId) {
    return NextResponse.json(
      { ok: false, message: "ai_generation_id (or generation_id) is required" },
      { status: 400 },
    );
  }

  const database = db();
  const [record] = await database
    .select()
    .from(schema.aiGenerations)
    .where(eq(schema.aiGenerations.id, generationId))
    .limit(1);

  if (!record) {
    return NextResponse.json({ ok: false, message: "AI generation not found" }, { status: 404 });
  }

  const parsed = record.parsedOutput as Record<string, unknown> | null;
  if (!parsed || typeof parsed !== "object") {
    await database
      .update(schema.aiGenerations)
      .set({ sanityWriteStatus: "failed" })
      .where(eq(schema.aiGenerations.id, record.id));

    return NextResponse.json(
      { ok: false, message: "parsed_output is required before pushing to Sanity" },
      { status: 400 },
    );
  }

  const input = record.inputJson as Record<string, unknown>;
  const inputContentType = (input?.contentType as string | undefined) || "post";
  const contentType: "post" | "service" | "project" =
    inputContentType === "service"
      ? "service"
      : inputContentType === "product"
        ? "project"
        : "post";

  if (record.sanityWriteStatus === "success") {
    return NextResponse.json(
      {
        ok: false,
        message: "Generation already published",
        sanityId: record.sanityDocumentId,
      },
      { status: 400 },
    );
  }

  try {
    const result = await publishContentSafe({
      contentType,
      title: String(parsed.title || ""),
      excerpt: String(parsed.excerpt || ""),
      body: String(parsed.body || ""),
      ogImageAssetId: record.ogImageAssetId || undefined,
    });

    if (!result.success) {
      throw new Error(result.error || "Sanity write failed");
    }

    await database.transaction(async (tx) => {
      await tx
        .update(schema.aiGenerations)
        .set({
          sanityWriteStatus: "success",
          sanityDocumentId: result.result.documentId,
        })
        .where(eq(schema.aiGenerations.id, record.id));
    });

    return NextResponse.json({
      ok: true,
      id: record.id,
      sanityId: result.result.documentId,
      retried: true,
    });
  } catch (error) {
    await database.transaction(async (tx) => {
      await tx
        .update(schema.aiGenerations)
        .set({
          sanityWriteStatus: "failed",
        })
        .where(eq(schema.aiGenerations.id, record.id));
    });

    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : "Sanity write failed" },
      { status: 500 },
    );
  }
}
