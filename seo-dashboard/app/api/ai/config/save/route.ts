import { NextRequest, NextResponse } from "next/server";

type SaveBody = {
  enabled?: boolean;
  mode?: "gateway" | "direct-gemini" | "direct-groq";
  defaultModel?: string;
  customModelGateway?: string;
  defaultModelGemini?: string;
  customModelGemini?: string;
  defaultModelVertex?: string;
  customModelVertex?: string;
  defaultModelGroq?: string;
  customModelGroq?: string;
  fallbackModels?: string[];
  modelProfiles?: {
    economy?: {
      provider?: "gateway" | "groq" | "gemini";
      model?: string;
    };
    standard?: {
      provider?: "gateway" | "groq" | "gemini";
      model?: string;
    };
    high?: {
      provider?: "gateway" | "groq" | "gemini";
      model?: string;
    };
  };
  temperature?: number;
  maxOutputTokens?: number;
  prompts?: {
    globalSystem?: string;
    postRewrite?: string;
    serviceRewrite?: string;
    projectRewrite?: string;
    postBodyExtend?: string;
    serviceBodyExtend?: string;
    projectBodyExtend?: string;
  };
  notes?: string;
};

function normalizeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeList(value: unknown) {
  if (!Array.isArray(value)) return [] as string[];
  return value.map((item) => normalizeString(item)).filter(Boolean);
}

function isGatewayModel(value: string) {
  return /^[a-z0-9-]+\/[a-z0-9][a-z0-9._-]*$/i.test(value);
}

function normalizeBool(value: unknown, fallback: boolean) {
  return typeof value === "boolean" ? value : fallback;
}

function normalizeNumber(value: unknown, fallback: number, min: number, max: number) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(min, Math.min(max, parsed));
}

function normalizeProvider(value: unknown) {
  const v = normalizeString(value);
  if (v === "gateway" || v === "groq" || v === "gemini") return v;
  return undefined;
}

export async function POST(request: NextRequest) {
  const [{ ensureSeoApiAccess }, { canWriteAiWriterSettings, upsertAiWriterSettings }] =
    await Promise.all([
      import("@/lib/seo-ops/api-auth"),
      import("@/lib/ai-writer/sanity-write"),
    ]);

  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  if (!canWriteAiWriterSettings()) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Sanity write token is not configured. Set SANITY_AUTH_TOKEN to save AI settings.",
      },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => ({}))) as SaveBody;

  const modeInput = normalizeString(body.mode);
  const mode =
    modeInput === "direct-gemini" || modeInput === "direct-groq" ? modeInput : "gateway";

  const prompts = body.prompts || {};
  const defaultModel = normalizeString(body.defaultModel);
  if (mode === "gateway" && defaultModel && defaultModel !== "custom" && !isGatewayModel(defaultModel)) {
    return NextResponse.json(
      {
        ok: false,
        message: "Gateway mode requires model in provider/model format.",
      },
      { status: 400 },
    );
  }

  const fallbackModels = normalizeList(body.fallbackModels);
  if (mode === "gateway" && fallbackModels.some((item) => !isGatewayModel(item))) {
    return NextResponse.json(
      {
        ok: false,
        message: "All fallback models must use provider/model format in gateway mode.",
      },
      { status: 400 },
    );
  }

  for (const [profileName, profile] of Object.entries(body.modelProfiles || {})) {
    const provider = normalizeProvider((profile as any)?.provider);
    const model = normalizeString((profile as any)?.model);
    if (!provider || !model) continue;
    if (provider === "gateway" && !isGatewayModel(model)) {
      return NextResponse.json(
        {
          ok: false,
          message: `Profile ${profileName} with gateway provider requires provider/model format.`,
        },
        { status: 400 },
      );
    }
  }

  const mutation = {
    enabled: normalizeBool(body.enabled, false),
    mode,
    defaultModel,
    customModelGateway: normalizeString(body.customModelGateway),
    defaultModelGemini: normalizeString(body.defaultModelGemini),
    customModelGemini: normalizeString(body.customModelGemini),
    defaultModelVertex: normalizeString(body.defaultModelVertex),
    customModelVertex: normalizeString(body.customModelVertex),
    defaultModelGroq: normalizeString(body.defaultModelGroq),
    customModelGroq: normalizeString(body.customModelGroq),
    fallbackModels,
    modelProfiles: {
      economy: {
        provider: normalizeProvider(body.modelProfiles?.economy?.provider),
        model: normalizeString(body.modelProfiles?.economy?.model),
      },
      standard: {
        provider: normalizeProvider(body.modelProfiles?.standard?.provider),
        model: normalizeString(body.modelProfiles?.standard?.model),
      },
      high: {
        provider: normalizeProvider(body.modelProfiles?.high?.provider),
        model: normalizeString(body.modelProfiles?.high?.model),
      },
    },
    temperature: normalizeNumber(body.temperature, 0.4, 0, 2),
    maxOutputTokens: Math.round(normalizeNumber(body.maxOutputTokens, 1400, 128, 8192)),
    prompts: {
      globalSystem: normalizeString(prompts.globalSystem),
      postRewrite: normalizeString(prompts.postRewrite),
      serviceRewrite: normalizeString(prompts.serviceRewrite),
      projectRewrite: normalizeString(prompts.projectRewrite),
      postBodyExtend: normalizeString(prompts.postBodyExtend),
      serviceBodyExtend: normalizeString(prompts.serviceBodyExtend),
      projectBodyExtend: normalizeString(prompts.projectBodyExtend),
    },
    notes: normalizeString(body.notes),
  };

  const result = await upsertAiWriterSettings(mutation);
  if (!result.ok) {
    return NextResponse.json({ ok: false, message: result.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    message: "AI writer settings saved to Sanity.",
  });
}
