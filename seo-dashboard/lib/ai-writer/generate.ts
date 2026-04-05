import { generateWithFallback, type AiGenerateInput, type AiProvider } from "@repo/ai";
import { getAiWriterResolvedSettings } from "@/lib/ai-writer/settings-source";

export type AiGenerateResult = {
  providerMode: "gateway" | "direct-gemini" | "direct-groq";
  model: string;
  text: string;
};

export async function generateAiText(
  input: AiGenerateInput & { provider?: AiProvider },
): Promise<AiGenerateResult> {
  const settings = await getAiWriterResolvedSettings();
  if (!settings.enabled) {
    throw new Error("AI Writer is disabled in Sanity settings.");
  }

  const result = await generateWithFallback(
    {
      enabled: settings.enabled,
      providerOrder: settings.providerOrder as AiProvider[],
      defaultModels: settings.defaultModels,
      temperature: settings.temperature,
      maxOutputTokens: settings.maxOutputTokens,
      gatewayApiKey: settings.secrets.gatewayApiKey || undefined,
      gatewayProviderOrder: settings.gatewayProviderOrder,
      gatewayFallbackModels: settings.fallbackModels,
      groqKeys: settings.secrets.groqKeys,
      geminiKeys: settings.secrets.geminiKeys,
    },
    input,
  );

  return {
    providerMode:
      result.provider === "gateway"
        ? "gateway"
        : result.provider === "groq"
          ? "direct-groq"
          : "direct-gemini",
    model: result.model,
    text: result.text,
  };
}
