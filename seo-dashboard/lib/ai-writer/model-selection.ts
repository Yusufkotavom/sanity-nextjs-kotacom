import type { AiQualityMode, AiRuntimeProvider } from "./settings-source";
import { getAiWriterResolvedSettings } from "./settings-source";

export interface ResolveModelSelectionInput {
  qualityMode?: AiQualityMode;
  provider?: AiRuntimeProvider;
  model?: string;
}

export interface ResolveModelSelectionResult {
  qualityMode: AiQualityMode;
  provider?: AiRuntimeProvider;
  model?: string;
}

export function normalizeQualityMode(value: unknown): AiQualityMode {
  if (value === "economy" || value === "high" || value === "standard") return value;
  return "standard";
}

export function normalizeRuntimeProvider(value: unknown): AiRuntimeProvider | undefined {
  if (value === "gateway" || value === "groq" || value === "gemini" || value === "vertex") return value;
  return undefined;
}

export async function resolveModelSelection(
  input: ResolveModelSelectionInput,
): Promise<ResolveModelSelectionResult> {
  const qualityMode = normalizeQualityMode(input.qualityMode);
  const provider = normalizeRuntimeProvider(input.provider);
  const model = typeof input.model === "string" ? input.model.trim() : "";

  if (provider || model) {
    return {
      qualityMode,
      provider,
      model: model || undefined,
    };
  }

  const settings = await getAiWriterResolvedSettings();
  const profile = settings.modelProfiles?.[qualityMode];
  if (!profile) {
    return { qualityMode };
  }

  return {
    qualityMode,
    provider: profile.provider,
    model: profile.model,
  };
}
