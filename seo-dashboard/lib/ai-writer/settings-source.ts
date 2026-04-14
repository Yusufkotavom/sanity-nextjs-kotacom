export type AiWriterMode = "gateway" | "direct-gemini" | "direct-groq" | "direct-vertex";
export type AiRuntimeProvider = "gateway" | "gemini" | "groq" | "vertex";
export type AiQualityMode = "economy" | "standard" | "high";

function normalizeRuntimeProvider(value: string): AiRuntimeProvider | undefined {
  if (value === "gateway" || value === "gemini" || value === "groq" || value === "vertex") return value;
  return undefined;
}

function resolveProfile(
  studioProfile: { provider?: string; model?: string } | undefined,
  envProvider: AiRuntimeProvider | undefined,
  envModel: string,
  fallbackProvider: AiRuntimeProvider,
  fallbackModel: string,
) {
  const studioProvider = normalizeRuntimeProvider((studioProfile?.provider || "").trim());
  const studioModel = (studioProfile?.model || "").trim();
  const provider = envProvider || studioProvider || fallbackProvider;
  const model = envModel || studioModel || fallbackModel;
  return { provider, model };
}

export async function getAiWriterResolvedSettings() {
  let studio: Awaited<
    ReturnType<
      (typeof import("@/sanity/lib/fetch"))["fetchSanityAiWriterSettingsPrivate"]
    >
  > = null;
  try {
    const { fetchSanityAiWriterSettingsPrivate } = await import("@/sanity/lib/fetch");
    studio = await fetchSanityAiWriterSettingsPrivate();
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    const isMissingPublicSanityEnv = message.includes("Missing environment variable: NEXT_PUBLIC_SANITY_");
    if (!isMissingPublicSanityEnv) throw error;
  }

  const mode = (studio?.mode || "gateway") as AiWriterMode;
  const enabled = Boolean(studio?.enabled);

  // Resolve default models per provider (custom override wins)
  const defaultGatewayModel =
    (studio?.customModelGateway || "").trim() ||
    (studio?.defaultModel || "gpt-5.4").trim();
  const defaultGeminiModel =
    (studio?.customModelGemini || "").trim() ||
    (studio?.defaultModelGemini || "gemini-2.5-flash").trim();
  const defaultVertexModel =
    (studio?.customModelVertex || "").trim() ||
    (studio?.defaultModelVertex || "gemini-2.5-flash").trim();
  const defaultGroqModel =
    (studio?.customModelGroq || "").trim() ||
    (studio?.defaultModelGroq || "meta-llama/llama-4-scout-17b-16e-instruct").trim();

  const defaultRuntimeProvider: AiRuntimeProvider =
    mode === "direct-gemini" ? "gemini" : mode === "direct-groq" ? "groq" : mode === "direct-vertex" ? "vertex" : "gateway";
  const defaultRuntimeModel =
    defaultRuntimeProvider === "gemini"
      ? defaultGeminiModel
      : defaultRuntimeProvider === "vertex"
      ? defaultVertexModel
      : defaultRuntimeProvider === "groq"
        ? defaultGroqModel
        : defaultGatewayModel;

  const envStandardProvider = normalizeRuntimeProvider((process.env.AI_MODEL_PROFILE_STANDARD_PROVIDER || "").trim());
  const envStandardModel = (process.env.AI_MODEL_PROFILE_STANDARD_MODEL || "").trim();
  const envHighProvider = normalizeRuntimeProvider((process.env.AI_MODEL_PROFILE_HIGH_PROVIDER || "").trim());
  const envHighModel = (process.env.AI_MODEL_PROFILE_HIGH_MODEL || "").trim();
  const envEconomyProvider = normalizeRuntimeProvider((process.env.AI_MODEL_PROFILE_ECONOMY_PROVIDER || "").trim());
  const envEconomyModel = (process.env.AI_MODEL_PROFILE_ECONOMY_MODEL || "").trim();

  const standardProfile = resolveProfile(
    studio?.modelProfiles?.standard,
    envStandardProvider,
    envStandardModel,
    defaultRuntimeProvider,
    defaultRuntimeModel,
  );
  const highProfile = resolveProfile(
    studio?.modelProfiles?.high,
    envHighProvider,
    envHighModel,
    standardProfile.provider,
    standardProfile.model,
  );
  const economyProfile = resolveProfile(
    studio?.modelProfiles?.economy,
    envEconomyProvider,
    envEconomyModel,
    "gemini",
    defaultGeminiModel,
  );

  // API keys are always sourced from Vercel environment variables only
  const gatewayApiKey = process.env.AI_GATEWAY_API_KEY || "";
  const geminiKeys = (process.env.AI_WRITER_GEMINI_KEYS || "")
    .split(/\r?\n|,/g)
    .map((k) => k.trim())
    .filter(Boolean);
  const vertexKeys = (process.env.AI_WRITER_VERTEX_KEYS || process.env.VERTEX_API_KEYS || "")
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
      vertex: defaultVertexModel,
    },
    modelProfiles: {
      standard: {
        provider: standardProfile.provider,
        model: standardProfile.model,
      },
      high: {
        provider: highProfile.provider,
        model: highProfile.model,
      },
      economy: {
        provider: economyProfile.provider,
        model: economyProfile.model,
      },
    } as Record<AiQualityMode, { provider: AiRuntimeProvider; model: string }>,
    providerOrder: ["gateway", "groq", "vertex", "gemini"] as AiWriterMode[],
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
      postBodyExtend: studio?.prompts?.postBodyExtend || "",
      serviceBodyExtend: studio?.prompts?.serviceBodyExtend || "",
      projectBodyExtend: studio?.prompts?.projectBodyExtend || "",
    },
    secrets: {
      gatewayApiKey,
      hasOidcToken: Boolean(process.env.VERCEL_OIDC_TOKEN),
      geminiKeys,
      vertexKeys,
      groqKeys,
    },
  };
}
