import { fetchSanityAiWriterSettingsPrivate } from "@/sanity/lib/fetch";

export type AiWriterMode = "gateway" | "direct-gemini" | "direct-groq";

export async function getAiWriterResolvedSettings() {
  const studio = await fetchSanityAiWriterSettingsPrivate();

  const mode = (studio?.mode || "gateway") as AiWriterMode;
  const enabled = Boolean(studio?.enabled);

  // Resolve default models per provider (custom override wins)
  const defaultGatewayModel =
    (studio?.customModelGateway || "").trim() ||
    (studio?.defaultModel || "gpt-5.4").trim();
  const defaultGeminiModel =
    (studio?.customModelGemini || "").trim() ||
    (studio?.defaultModelGemini || "gemini-2.5-flash").trim();
  const defaultGroqModel =
    (studio?.customModelGroq || "").trim() ||
    (studio?.defaultModelGroq || "meta-llama/llama-4-scout-17b-16e-instruct").trim();

  // API keys are always sourced from Vercel environment variables only
  const gatewayApiKey = process.env.AI_GATEWAY_API_KEY || "";
  const geminiKeys = (process.env.AI_WRITER_GEMINI_KEYS || "")
    .split(/\r?\n|,/g)
    .map((k) => k.trim())
    .filter(Boolean);
  const groqKeys = (process.env.AI_WRITER_GROQ_KEYS || "")
    .split(/\r?\n|,/g)
    .map((k) => k.trim())
    .filter(Boolean);

  return {
    enabled,
    mode,
    defaultModel: defaultGatewayModel,
    defaultModels: {
      gateway: defaultGatewayModel,
      groq: defaultGroqModel,
      gemini: defaultGeminiModel,
    },
    providerOrder: ["gateway", "groq", "gemini"] as AiWriterMode[],
    fallbackModels: (studio?.fallbackModels || []).filter(Boolean),
    gatewayProviderOrder: [] as string[],
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
