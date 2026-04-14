import { createGateway } from "@ai-sdk/gateway";
import { generateText } from "ai";

export type AiProvider = "gateway" | "groq" | "gemini" | "vertex";

export type AiRoutingConfig = {
  enabled: boolean;
  providerOrder: AiProvider[];
  defaultModels: {
    gateway: string;
    groq: string;
    gemini: string;
    vertex: string;
  };
  temperature: number;
  maxOutputTokens: number;
  gatewayApiKey?: string;
  gatewayProviderOrder?: string[];
  gatewayFallbackModels?: string[];
  groqKeys: string[];
  geminiKeys: string[];
  vertexKeys: string[];
};

export type AiGenerateInput = {
  prompt: string;
  system?: string;
  provider?: AiProvider;
  model?: string;
  userId?: string;
  tags?: string[];
  minOutputTokens?: number;
};

export type AiGenerateResult = {
  provider: AiProvider;
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

function normalizeVertexModel(model: string) {
  const value = model.trim();
  if (!value) return "gemini-2.5-flash";
  return value.startsWith("google/") ? value.replace(/^google\//, "") : value;
}

function normalizeGroqModel(model: string) {
  const value = model.trim();
  if (!value) return "meta-llama/llama-4-scout-17b-16e-instruct";
  return value.startsWith("groq/") ? value.replace(/^groq\//, "") : value;
}

async function generateViaGateway(config: AiRoutingConfig, input: AiGenerateInput) {
  const model = normalizeModel(input.model || config.defaultModels.gateway, config.defaultModels.gateway);
  const gateway = createGateway(config.gatewayApiKey ? { apiKey: config.gatewayApiKey } : undefined);

  const result = await generateText({
    model: gateway(model),
    prompt: input.prompt,
    system: input.system,
    temperature: config.temperature,
    maxOutputTokens: Math.max(config.maxOutputTokens, input.minOutputTokens ?? 0),
    providerOptions: {
      gateway: {
        order: config.gatewayProviderOrder?.length ? config.gatewayProviderOrder : undefined,
        models: config.gatewayFallbackModels?.length ? config.gatewayFallbackModels : undefined,
        user: input.userId || "ops-user",
        tags: ["feature:ai-writer", ...(input.tags || [])],
      },
    },
  });

  return { provider: "gateway" as const, model, text: result.text };
}

async function generateViaGroq(config: AiRoutingConfig, input: AiGenerateInput) {
  const model = normalizeGroqModel(
    normalizeModel(input.model || config.defaultModels.groq, config.defaultModels.groq),
  );
  if (config.groqKeys.length === 0) {
    throw new Error("No Groq API keys configured.");
  }

  let lastError = "Unknown error";
  for (const key of config.groqKeys) {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model,
        temperature: config.temperature,
        max_tokens: Math.max(config.maxOutputTokens, input.minOutputTokens ?? 0),
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

    return { provider: "groq" as const, model, text };
  }

  throw new Error(`Groq rotation failed: ${lastError}`);
}

async function generateViaGemini(config: AiRoutingConfig, input: AiGenerateInput) {
  const model = normalizeGeminiModel(
    normalizeModel(input.model || config.defaultModels.gemini, config.defaultModels.gemini),
  );
  if (config.geminiKeys.length === 0) {
    throw new Error("No Gemini API keys configured.");
  }

  let lastError = "Unknown error";
  for (const key of config.geminiKeys) {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
        model,
      )}:generateContent?key=${encodeURIComponent(key)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          generationConfig: {
            temperature: config.temperature,
            maxOutputTokens: Math.max(config.maxOutputTokens, input.minOutputTokens ?? 0),
          },
          systemInstruction: input.system ? { parts: [{ text: input.system }] } : undefined,
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

    return { provider: "gemini" as const, model, text };
  }

  throw new Error(`Gemini rotation failed: ${lastError}`);
}

async function generateViaVertex(config: AiRoutingConfig, input: AiGenerateInput) {
  const model = normalizeVertexModel(
    normalizeModel(input.model || config.defaultModels.vertex, config.defaultModels.vertex),
  );
  if (config.vertexKeys.length === 0) {
    throw new Error("No Vertex API keys configured.");
  }

  let lastError = "Unknown error";
  for (const key of config.vertexKeys) {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
        model,
      )}:generateContent?key=${encodeURIComponent(key)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          generationConfig: {
            temperature: config.temperature,
            maxOutputTokens: Math.max(config.maxOutputTokens, input.minOutputTokens ?? 0),
          },
          systemInstruction: input.system ? { parts: [{ text: input.system }] } : undefined,
          contents: [{ role: "user", parts: [{ text: input.prompt }] }],
        }),
      },
    );

    const json = (await response.json().catch(() => ({}))) as any;
    if (!response.ok) {
      lastError = json?.error?.message || `Vertex request failed (${response.status})`;
      continue;
    }

    const text =
      json?.candidates?.[0]?.content?.parts?.map((p: any) => p?.text || "").join("") || "";
    if (!text) {
      lastError = "Vertex returned an empty response.";
      continue;
    }

    return { provider: "vertex" as const, model, text };
  }

  throw new Error(`Vertex rotation failed: ${lastError}`);
}

export async function generateWithFallback(
  config: AiRoutingConfig,
  input: AiGenerateInput,
): Promise<AiGenerateResult> {
  if (!config.enabled) {
    throw new Error("AI generation is disabled.");
  }

  const providers = input.provider
    ? [input.provider, ...config.providerOrder.filter((p) => p !== input.provider)]
    : config.providerOrder;

  let lastError = "Unknown error";
  for (const provider of providers) {
    try {
      if (provider === "gateway") return await generateViaGateway(config, input);
      if (provider === "groq") return await generateViaGroq(config, input);
      if (provider === "gemini") return await generateViaGemini(config, input);
      if (provider === "vertex") return await generateViaVertex(config, input);
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
  }

  throw new Error(`AI generation failed: ${lastError}`);
}
