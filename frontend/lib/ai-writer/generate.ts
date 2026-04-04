import { createGateway } from "@ai-sdk/gateway";
import { generateText } from "ai";
import { getAiWriterResolvedSettings } from "@/lib/ai-writer/settings-source";

export type AiGenerateInput = {
  prompt: string;
  system?: string;
  model?: string;
  userId?: string;
  tags?: string[];
  /** Override floor for output tokens (caller can demand more than the global setting) */
  minOutputTokens?: number;
};

type AiGenerateResult = {
  providerMode: "gateway" | "direct-gemini" | "direct-groq";
  model: string;
  text: string;
};

function normalizeModel(model: string, fallback: string) {
  const value = (model || "").trim();
  return value || fallback;
}

function normalizeGeminiModel(model: string) {
  const value = model.trim();
  if (!value) return "gemini-2.5-flash";
  return value.startsWith("google/") ? value.replace(/^google\//, "") : value;
}

function normalizeGroqModel(model: string) {
  const value = model.trim();
  if (!value) return "openai/gpt-oss-120b";
  return value.startsWith("groq/") ? value.replace(/^groq\//, "") : value;
}

async function generateViaGateway(input: AiGenerateInput): Promise<AiGenerateResult> {
  const settings = await getAiWriterResolvedSettings();
  const model = normalizeModel(input.model || settings.defaultModel, "openai/gpt-5.4");

  const gateway = createGateway(
    settings.secrets.gatewayApiKey
      ? { apiKey: settings.secrets.gatewayApiKey }
      : undefined,
  );

  const result = await generateText({
    model: gateway(model),
    prompt: input.prompt,
    system: input.system,
    temperature: settings.temperature,
    maxOutputTokens: Math.max(settings.maxOutputTokens, input.minOutputTokens ?? 0),
    providerOptions: {
      gateway: {
        order:
          settings.gatewayProviderOrder.length > 0
            ? settings.gatewayProviderOrder
            : undefined,
        models: settings.fallbackModels.length > 0 ? settings.fallbackModels : undefined,
        user: input.userId || "studio-user",
        tags: ["feature:ai-writer", ...(input.tags || [])],
      },
    },
  });

  return {
    providerMode: "gateway",
    model,
    text: result.text,
  };
}

async function generateViaGemini(input: AiGenerateInput): Promise<AiGenerateResult> {
  const settings = await getAiWriterResolvedSettings();
  const model = normalizeGeminiModel(
    normalizeModel(input.model || settings.defaultModel, "gemini-2.5-flash"),
  );
  const keys = settings.secrets.geminiKeys;
  if (keys.length === 0) {
    throw new Error("No Gemini API keys configured in AI Writer settings.");
  }

  let lastError = "Unknown error";
  for (const key of keys) {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
        model,
      )}:generateContent?key=${encodeURIComponent(key)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          generationConfig: {
            temperature: settings.temperature,
            maxOutputTokens: Math.max(settings.maxOutputTokens, input.minOutputTokens ?? 0),
          },
          systemInstruction: input.system
            ? { parts: [{ text: input.system }] }
            : undefined,
          contents: [{ role: "user", parts: [{ text: input.prompt }] }],
        }),
      },
    );

    const json = (await response.json().catch(() => ({}))) as any;
    if (!response.ok) {
      lastError = json?.error?.message || `Gemini request failed (${response.status})`;
      continue;
    }

    const text =
      json?.candidates?.[0]?.content?.parts?.map((p: any) => p?.text || "").join("") || "";
    if (!text) {
      lastError = "Gemini returned an empty response.";
      continue;
    }

    return {
      providerMode: "direct-gemini",
      model,
      text,
    };
  }

  throw new Error(`Gemini rotation failed: ${lastError}`);
}

async function generateViaGroq(input: AiGenerateInput): Promise<AiGenerateResult> {
  const settings = await getAiWriterResolvedSettings();
  const model = normalizeGroqModel(
    normalizeModel(input.model || settings.defaultModel, "openai/gpt-oss-120b"),
  );
  const keys = settings.secrets.groqKeys;
  if (keys.length === 0) {
    throw new Error("No Groq API keys configured in AI Writer settings.");
  }

  let lastError = "Unknown error";
  for (const key of keys) {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model,
        temperature: settings.temperature,
        max_tokens: Math.max(settings.maxOutputTokens, input.minOutputTokens ?? 0),
        messages: [
          ...(input.system ? [{ role: "system", content: input.system }] : []),
          { role: "user", content: input.prompt },
        ],
      }),
    });

    const json = (await response.json().catch(() => ({}))) as any;
    if (!response.ok) {
      lastError = json?.error?.message || `Groq request failed (${response.status})`;
      continue;
    }

    const text = json?.choices?.[0]?.message?.content || "";
    if (!text) {
      lastError = "Groq returned an empty response.";
      continue;
    }

    return {
      providerMode: "direct-groq",
      model,
      text,
    };
  }

  throw new Error(`Groq rotation failed: ${lastError}`);
}

export async function generateAiText(input: AiGenerateInput): Promise<AiGenerateResult> {
  const settings = await getAiWriterResolvedSettings();
  if (!settings.enabled) {
    throw new Error("AI Writer is disabled in Sanity settings.");
  }

  if (settings.mode === "direct-gemini") return generateViaGemini(input);
  if (settings.mode === "direct-groq") return generateViaGroq(input);
  return generateViaGateway(input);
}
