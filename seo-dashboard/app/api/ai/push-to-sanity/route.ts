import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

export async function POST(request: NextRequest) {
  const [{ ensureSeoApiAccess }, { db }, { schema }, { getSanityClient }] =
    await Promise.all([
      import("@/lib/seo-ops/api-auth"),
      import("@/lib/db"),
      import("@repo/db"),
      import("@repo/sanity"),
    ]);

  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  const body = (await request.json().catch(() => ({}))) as {
    ai_generation_id?: string;
  };

  if (!body.ai_generation_id) {
    return NextResponse.json(
      { ok: false, message: "ai_generation_id is required" },
      { status: 400 },
    );
  }

  const database = db();
  const [record] = await database
    .select()
    .from(schema.aiGenerations)
    .where(eq(schema.aiGenerations.id, body.ai_generation_id))
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
  const type =
    (parsed._type as string | undefined) ||
    (input?.documentType as string | undefined) ||
    "post";
  const sanityId =
    (parsed._id as string | undefined) || `drafts.${randomUUID()}`;

  const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN || "";
  if (!token) {
    return NextResponse.json(
      { ok: false, message: "Sanity write token is not configured" },
      { status: 500 },
    );
  }

  const client = getSanityClient({
    projectId: process.env.SANITY_PROJECT_ID || "",
    dataset: process.env.SANITY_DATASET || "production",
    apiVersion: process.env.SANITY_API_VERSION || "2026-04-06",
    token,
  });

  const document = {
    _id: sanityId,
    _type: type,
    ...parsed,
  };

  try {
    const result = await client.createOrReplace(document);
    await database
      .update(schema.aiGenerations)
      .set({
        sanityWriteStatus: "success",
        sanityDocumentId: result._id,
      })
      .where(eq(schema.aiGenerations.id, record.id));

    return NextResponse.json({ ok: true, id: record.id, sanityId: result._id });
  } catch (error) {
    await database
      .update(schema.aiGenerations)
      .set({
        sanityWriteStatus: "failed",
      })
      .where(eq(schema.aiGenerations.id, record.id));

    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : "Sanity write failed" },
      { status: 500 },
    );
  }
}
