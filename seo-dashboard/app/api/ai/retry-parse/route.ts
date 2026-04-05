import { NextRequest, NextResponse } from "next/server";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";
import { db } from "@/lib/db";
import { schema } from "@repo/db";
import { eq } from "drizzle-orm";
import { generateAiText } from "@/lib/ai-writer/generate";

export async function POST(request: NextRequest) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  const body = (await request.json().catch(() => ({}))) as {
    ai_generation_id?: string;
    prompt_version?: string;
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

  const input = record.inputJson as { prompt?: string; system?: string; provider?: string; model?: string };
  if (!input?.prompt) {
    return NextResponse.json(
      { ok: false, message: "AI generation is missing prompt input" },
      { status: 400 },
    );
  }

  const result = await generateAiText({
    prompt: input.prompt,
    system: input.system,
    provider: input.provider,
    model: input.model,
    userId: "retry-parse",
    tags: ["retry"],
  });

  await database
    .update(schema.aiGenerations)
    .set({
      rawOutput: result.text,
      parsedOutput: null,
      validationStatus: "valid",
      validationErrors: null,
      sanityWriteStatus: "pending",
      promptVersion: body.prompt_version || record.promptVersion,
    })
    .where(eq(schema.aiGenerations.id, record.id));

  return NextResponse.json({
    ok: true,
    id: record.id,
    provider: result.providerMode,
    model: result.model,
  });
}
