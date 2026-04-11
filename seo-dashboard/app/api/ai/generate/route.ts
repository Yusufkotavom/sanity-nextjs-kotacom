import { NextRequest, NextResponse } from "next/server";

type Body = {
  prompt?: string;
  system?: string;
  model?: string;
  provider?: "gateway" | "groq" | "gemini";
  docType?: "post" | "service" | "project";
};

export async function POST(request: NextRequest) {
  const [
    { ensureSeoApiAccess },
    { generateAiText },
    { getAiWriterResolvedSettings },
    { db },
    { createJobRun, updateJobRun },
    { schema },
  ] = await Promise.all([
    import("@/lib/seo-ops/api-auth"),
    import("@/lib/ai-writer/generate"),
    import("@/lib/ai-writer/settings-source"),
    import("@/lib/db"),
    import("@/lib/jobs"),
    import("@repo/db"),
  ]);

  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  const body = (await request.json().catch(() => ({}))) as Body;
  const prompt = (body.prompt || "").trim();
  if (!prompt) {
    return NextResponse.json({ ok: false, message: "Prompt is required." }, { status: 400 });
  }
  if (prompt.length > 20000) {
    return NextResponse.json(
      { ok: false, message: "Prompt too long (max 20000 chars)." },
      { status: 400 },
    );
  }

  const settings = await getAiWriterResolvedSettings();
  const promptTemplate =
    body.docType === "service"
      ? settings.prompts.serviceRewrite
      : body.docType === "project"
        ? settings.prompts.projectRewrite
        : settings.prompts.postRewrite;

  const system = [settings.prompts.globalSystem, promptTemplate, body.system || ""]
    .map((item) => item.trim())
    .filter(Boolean)
    .join("\n\n");

  const job = await createJobRun({
    jobType: "ai_generate",
    payload: { docType: body.docType || "generic" },
  });

  await updateJobRun(job.id, { status: "processing", startedAt: new Date() });

  try {
    const result = await generateAiText({
      prompt,
      system,
      model: body.model,
      provider: body.provider,
      userId: "studio-dashboard",
      tags: ["route:api-ai-generate", `docType:${body.docType || "generic"}`],
    });

    await db()
      .insert(schema.aiGenerations)
      .values({
        sourceType: "manual",
        inputJson: { prompt, system, docType: body.docType || "generic" },
        provider: result.providerMode === "gateway" ? "gateway" : result.providerMode === "direct-groq" ? "groq" : "gemini",
        model: result.model,
        rawOutput: result.text,
        validationStatus: "valid",
        sanityWriteStatus: "pending",
      })
      .returning();

    await updateJobRun(job.id, {
      status: "success",
      result: { provider: result.providerMode, model: result.model },
      finishedAt: new Date(),
    });

    return NextResponse.json({
      ok: true,
      providerMode: result.providerMode,
      model: result.model,
      text: result.text,
    });
  } catch (error) {
    await updateJobRun(job.id, {
      status: "failed",
      errorMessage: error instanceof Error ? error.message : "AI generation failed",
      finishedAt: new Date(),
    });
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "AI generation failed",
      },
      { status: 500 },
    );
  }
}
