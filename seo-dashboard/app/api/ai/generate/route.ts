import { NextRequest, NextResponse } from "next/server";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";
import { generateAiText } from "@/lib/ai-writer/generate";
import { getAiWriterResolvedSettings } from "@/lib/ai-writer/settings-source";

type Body = {
  prompt?: string;
  system?: string;
  model?: string;
  docType?: "post" | "service" | "project";
};

export async function POST(request: NextRequest) {
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

  try {
    const result = await generateAiText({
      prompt,
      system,
      model: body.model,
      userId: "studio-dashboard",
      tags: ["route:api-ai-generate", `docType:${body.docType || "generic"}`],
    });

    return NextResponse.json({
      ok: true,
      providerMode: result.providerMode,
      model: result.model,
      text: result.text,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "AI generation failed",
      },
      { status: 500 },
    );
  }
}
