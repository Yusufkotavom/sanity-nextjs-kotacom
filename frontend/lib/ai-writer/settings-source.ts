import { decryptSeoSecret } from "@/lib/seo-ops/crypto";
import { fetchSanityAiWriterSettingsPrivate } from "@/sanity/lib/fetch";

export type AiWriterMode = "gateway" | "direct-gemini" | "direct-groq";

function parseList(value?: string | null) {
  if (!value) return [] as string[];
  return value
    .split(/\r?\n|,/g)
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function getAiWriterResolvedSettings() {
  const studio = await fetchSanityAiWriterSettingsPrivate();

  const gatewayApiKey = decryptSeoSecret(studio?.gatewayApiKeyEncrypted || "");
  const geminiStudio = parseList(decryptSeoSecret(studio?.geminiApiKeysEncrypted || ""));
  const groqStudio = parseList(decryptSeoSecret(studio?.groqApiKeysEncrypted || ""));
  const geminiKeys =
    geminiStudio.length > 0 ? geminiStudio : parseList(process.env.AI_WRITER_GEMINI_KEYS || "");
  const groqKeys =
    groqStudio.length > 0 ? groqStudio : parseList(process.env.AI_WRITER_GROQ_KEYS || "");

  const mode = (studio?.mode || "gateway") as AiWriterMode;
  const enabled = Boolean(studio?.enabled);
  const defaultModel = (studio?.defaultModel || "").trim();

  return {
    enabled,
    mode,
    defaultModel,
    fallbackModels: (studio?.fallbackModels || []).filter(Boolean),
    gatewayProviderOrder: (studio?.gatewayProviderOrder || []).filter(Boolean),
    temperature:
      typeof studio?.temperature === "number" && Number.isFinite(studio.temperature)
        ? studio.temperature
        : 0.4,
    maxOutputTokens:
      typeof studio?.maxOutputTokens === "number" && Number.isFinite(studio.maxOutputTokens)
        ? Math.max(128, Math.min(8192, Math.round(studio.maxOutputTokens)))
        : 1400,
    prompts: {
      globalSystem: studio?.prompts?.globalSystem || "",
      postRewrite: studio?.prompts?.postRewrite || "",
      serviceRewrite: studio?.prompts?.serviceRewrite || "",
      projectRewrite: studio?.prompts?.projectRewrite || "",
    },
    secrets: {
      gatewayApiKey,
      hasOidcToken: Boolean(process.env.VERCEL_OIDC_TOKEN),
      geminiKeys,
      groqKeys,
    },
  };
}
