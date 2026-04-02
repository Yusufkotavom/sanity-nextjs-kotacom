import { NextRequest, NextResponse } from "next/server";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";
import { canEncryptSeoSettings, encryptSeoSecret } from "@/lib/seo-ops/crypto";
import { canWriteAiWriterSettings, upsertAiWriterSettings } from "@/lib/ai-writer/sanity-write";
import { fetchSanityAiWriterSettingsPrivate } from "@/sanity/lib/fetch";

type SaveBody = {
  enabled?: boolean;
  mode?: "gateway" | "direct-gemini" | "direct-groq";
  defaultModel?: string;
  fallbackModels?: string[];
  gatewayProviderOrder?: string[];
  temperature?: number;
  maxOutputTokens?: number;
  gatewayApiKey?: string;
  geminiApiKeys?: string;
  groqApiKeys?: string;
  prompts?: {
    globalSystem?: string;
    postRewrite?: string;
    serviceRewrite?: string;
    projectRewrite?: string;
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

export async function POST(request: NextRequest) {
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

  if (!canEncryptSeoSettings()) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Encryption secret is missing. Set SEO_SETTINGS_ENCRYPTION_KEY or SEO_SESSION_SECRET.",
      },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => ({}))) as SaveBody;
  const existing = await fetchSanityAiWriterSettingsPrivate();

  const gatewayApiKey = normalizeString(body.gatewayApiKey);
  const geminiApiKeys = normalizeString(body.geminiApiKeys);
  const groqApiKeys = normalizeString(body.groqApiKeys);

  const modeInput = normalizeString(body.mode);
  const mode =
    modeInput === "direct-gemini" || modeInput === "direct-groq" ? modeInput : "gateway";

  const prompts = body.prompts || {};
  const defaultModel = normalizeString(body.defaultModel);
  if (mode === "gateway" && defaultModel && !isGatewayModel(defaultModel)) {
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

  const mutation = {
    enabled: normalizeBool(body.enabled, false),
    mode,
    defaultModel,
    fallbackModels,
    gatewayProviderOrder: normalizeList(body.gatewayProviderOrder),
    temperature: normalizeNumber(body.temperature, 0.4, 0, 2),
    maxOutputTokens: Math.round(normalizeNumber(body.maxOutputTokens, 1400, 128, 8192)),
    gatewayApiKeyEncrypted: gatewayApiKey
      ? encryptSeoSecret(gatewayApiKey)
      : existing?.gatewayApiKeyEncrypted || "",
    geminiApiKeysEncrypted: geminiApiKeys
      ? encryptSeoSecret(geminiApiKeys)
      : existing?.geminiApiKeysEncrypted || "",
    groqApiKeysEncrypted: groqApiKeys
      ? encryptSeoSecret(groqApiKeys)
      : existing?.groqApiKeysEncrypted || "",
    prompts: {
      globalSystem: normalizeString(prompts.globalSystem),
      postRewrite: normalizeString(prompts.postRewrite),
      serviceRewrite: normalizeString(prompts.serviceRewrite),
      projectRewrite: normalizeString(prompts.projectRewrite),
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
