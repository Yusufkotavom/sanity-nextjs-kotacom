"use client";

import { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type StatusPayload = {
  ok: boolean;
  studioSettings?: {
    enabled?: boolean;
    mode?: "gateway" | "direct-gemini" | "direct-groq";
    defaultModel?: string;
    fallbackModels?: string[];
    gatewayProviderOrder?: string[];
    temperature?: number;
    maxOutputTokens?: number;
    prompts?: {
      globalSystem?: string;
      postRewrite?: string;
      serviceRewrite?: string;
      projectRewrite?: string;
    };
    notes?: string;
  };
  capabilities?: {
    canWriteSettings: boolean;
    canEncrypt: boolean;
  };
  sources?: {
    gatewayApiKey?: string;
    oidcToken?: string;
    geminiKeyCount?: number;
    groqKeyCount?: number;
  };
};

export default function AiWriterSettingsPage() {
  const [status, setStatus] = useState<StatusPayload | null>(null);
  const [statusError, setStatusError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [testing, setTesting] = useState(false);
  const [testMessage, setTestMessage] = useState("");
  const [testOutput, setTestOutput] = useState("");

  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<"gateway" | "direct-gemini" | "direct-groq">("gateway");
  const [defaultModel, setDefaultModel] = useState("google/gemini-2.5-flash");
  const [customModelGateway, setCustomModelGateway] = useState("");
  const [defaultModelGemini, setDefaultModelGemini] = useState("gemini-2.5-flash");
  const [customModelGemini, setCustomModelGemini] = useState("");
  const [defaultModelGroq, setDefaultModelGroq] = useState("meta-llama/llama-4-scout-17b-16e-instruct");
  const [customModelGroq, setCustomModelGroq] = useState("");
  const [fallbackModelsText, setFallbackModelsText] = useState("");
  const [providerOrderText, setProviderOrderText] = useState("");
  const [temperature, setTemperature] = useState(0.4);
  const [maxOutputTokens, setMaxOutputTokens] = useState(1400);
  const [gatewayApiKey, setGatewayApiKey] = useState("");
  const [geminiApiKeys, setGeminiApiKeys] = useState("");
  const [groqApiKeys, setGroqApiKeys] = useState("");
  const [globalSystem, setGlobalSystem] = useState("");
  const [postRewrite, setPostRewrite] = useState("");
  const [serviceRewrite, setServiceRewrite] = useState("");
  const [projectRewrite, setProjectRewrite] = useState("");
  const [notes, setNotes] = useState("");

  const [testDocType, setTestDocType] = useState<"post" | "service" | "project">("post");
  const [testPrompt, setTestPrompt] = useState(
    "Rewrite this paragraph in better Indonesian for SEO and readability: Kami menyediakan layanan digital untuk bisnis Anda.",
  );

  useEffect(() => {
    fetch("/api/ai/config/status")
      .then(async (response) => {
        const json = (await response.json()) as any;
        if (!response.ok) throw new Error(json.message || "Failed to load AI settings");
        setStatus(json);

        const config = json.studioSettings || {};
        setEnabled(Boolean(config.enabled));
        setMode(config.mode || "gateway");
        setDefaultModel(config.defaultModel || "google/gemini-2.5-flash");
        setCustomModelGateway(config.customModelGateway || "");
        setDefaultModelGemini(config.defaultModelGemini || "gemini-2.5-flash");
        setCustomModelGemini(config.customModelGemini || "");
        setDefaultModelGroq(config.defaultModelGroq || "meta-llama/llama-4-scout-17b-16e-instruct");
        setCustomModelGroq(config.customModelGroq || "");
        setFallbackModelsText((config.fallbackModels || []).join("\n"));
        setProviderOrderText((config.gatewayProviderOrder || []).join("\n"));
        setTemperature(
          typeof config.temperature === "number" && Number.isFinite(config.temperature)
            ? config.temperature
            : 0.4,
        );
        setMaxOutputTokens(
          typeof config.maxOutputTokens === "number" && Number.isFinite(config.maxOutputTokens)
            ? config.maxOutputTokens
            : 1400,
        );
        setGlobalSystem(config.prompts?.globalSystem || "");
        setPostRewrite(config.prompts?.postRewrite || "");
        setServiceRewrite(config.prompts?.serviceRewrite || "");
        setProjectRewrite(config.prompts?.projectRewrite || "");
        setNotes(config.notes || "");
      })
      .catch((error: Error) => setStatusError(error.message));
  }, []);

  async function saveSettings(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setSaveMessage("");

    const response = await fetch("/api/ai/config/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        enabled,
        mode,
        defaultModel,
        customModelGateway,
        defaultModelGemini,
        customModelGemini,
        defaultModelGroq,
        customModelGroq,
        fallbackModels: fallbackModelsText
          .split(/\r?\n|,/g)
          .map((item) => item.trim())
          .filter(Boolean),
        gatewayProviderOrder: providerOrderText
          .split(/\r?\n|,/g)
          .map((item) => item.trim())
          .filter(Boolean),
        temperature,
        maxOutputTokens,
        gatewayApiKey,
        geminiApiKeys,
        groqApiKeys,
        prompts: {
          globalSystem,
          postRewrite,
          serviceRewrite,
          projectRewrite,
        },
        notes,
      }),
    });

    const data = (await response.json().catch(() => ({}))) as {
      ok?: boolean;
      message?: string;
    };

    setSaving(false);
    if (!response.ok) {
      setSaveMessage(data?.message || "Failed to save settings");
      return;
    }

    setGatewayApiKey("");
    setGeminiApiKeys("");
    setGroqApiKeys("");
    setSaveMessage(data?.message || "Saved");
  }

  async function testGenerate(event: FormEvent) {
    event.preventDefault();
    setTesting(true);
    setTestMessage("");
    setTestOutput("");

    const response = await fetch("/api/ai/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        docType: testDocType,
        prompt: testPrompt,
      }),
    });

    const data = (await response.json().catch(() => ({}))) as {
      ok?: boolean;
      message?: string;
      providerMode?: string;
      model?: string;
      text?: string;
    };

    setTesting(false);
    if (!response.ok || !data.ok) {
      setTestMessage(data?.message || "Generation failed");
      return;
    }

    setTestMessage(`Success (${data.providerMode} / ${data.model})`);
    setTestOutput(data.text || "");
  }

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-lg font-semibold">AI Writer Settings</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Konfigurasi provider, model routing, prompt template, dan test generation untuk rewrite
          konten.
        </p>
      </section>

      {statusError ? <p className="text-sm text-destructive">{statusError}</p> : null}

      <section className="rounded-md border p-4">
        <h3 className="font-medium">Runtime Source</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Gateway key: {status?.sources?.gatewayApiKey || "n/a"} | OIDC token:{" "}
          {status?.sources?.oidcToken || "n/a"} | Gemini keys:{" "}
          {status?.sources?.geminiKeyCount ?? 0} | Groq keys:{" "}
          {status?.sources?.groqKeyCount ?? 0}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Save enabled: {status?.capabilities?.canWriteSettings ? "yes" : "no"} | Encryption
          enabled: {status?.capabilities?.canEncrypt ? "yes" : "no"}
        </p>
      </section>

      <section className="rounded-md border p-4">
        <h3 className="font-medium">Provider & Prompt Configuration</h3>
        <form onSubmit={saveSettings} className="mt-3 space-y-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={enabled}
              onChange={(event) => setEnabled(event.target.checked)}
            />
            Enable AI Writer
          </label>

          <div className="grid gap-2 md:grid-cols-3">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                checked={mode === "gateway"}
                onChange={() => setMode("gateway")}
              />
              Gateway
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                checked={mode === "direct-gemini"}
                onChange={() => setMode("direct-gemini")}
              />
              Direct Gemini
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                checked={mode === "direct-groq"}
                onChange={() => setMode("direct-groq")}
              />
              Direct Groq
            </label>
          </div>

          <div className="space-y-3">
            {mode === "gateway" && (
              <>
                <Input
                  value={defaultModel}
                  onChange={(event) => setDefaultModel(event.target.value)}
                  placeholder="Gateway Default model (e.g. google/gemini-2.5-flash)"
                />
                {defaultModel === "custom" && (
                  <Input
                    value={customModelGateway}
                    onChange={(event) => setCustomModelGateway(event.target.value)}
                    placeholder="Custom Gateway Model ID"
                  />
                )}
              </>
            )}
            {mode === "direct-gemini" && (
              <>
                <Input
                  value={defaultModelGemini}
                  onChange={(event) => setDefaultModelGemini(event.target.value)}
                  placeholder="Gemini Default model (e.g. gemini-2.5-flash)"
                />
                {defaultModelGemini === "custom" && (
                  <Input
                    value={customModelGemini}
                    onChange={(event) => setCustomModelGemini(event.target.value)}
                    placeholder="Custom Gemini Model ID"
                  />
                )}
              </>
            )}
            {mode === "direct-groq" && (
              <>
                <Input
                  value={defaultModelGroq}
                  onChange={(event) => setDefaultModelGroq(event.target.value)}
                  placeholder="Groq Default model"
                />
                {defaultModelGroq === "custom" && (
                  <Input
                    value={customModelGroq}
                    onChange={(event) => setCustomModelGroq(event.target.value)}
                    placeholder="Custom Groq Model ID"
                  />
                )}
              </>
            )}
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <textarea
              value={fallbackModelsText}
              onChange={(event) => setFallbackModelsText(event.target.value)}
              className="w-full min-h-24 rounded-md border p-3 text-sm"
              placeholder="Fallback models (one per line)"
            />
            <textarea
              value={providerOrderText}
              onChange={(event) => setProviderOrderText(event.target.value)}
              className="w-full min-h-24 rounded-md border p-3 text-sm"
              placeholder="Gateway provider order (one per line)"
            />
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <Input
              type="number"
              min={0}
              max={2}
              step="0.1"
              value={temperature}
              onChange={(event) => setTemperature(Number(event.target.value || 0.4))}
              placeholder="Temperature"
            />
            <Input
              type="number"
              min={128}
              max={8192}
              value={maxOutputTokens}
              onChange={(event) => setMaxOutputTokens(Number(event.target.value || 1400))}
              placeholder="Max output tokens"
            />
          </div>

          <Input
            type="password"
            value={gatewayApiKey}
            onChange={(event) => setGatewayApiKey(event.target.value)}
            placeholder="Gateway API key (optional, leave blank to keep current)"
          />
          <textarea
            value={geminiApiKeys}
            onChange={(event) => setGeminiApiKeys(event.target.value)}
            className="w-full min-h-20 rounded-md border p-3 text-sm"
            placeholder="Gemini API keys (optional, one per line)"
          />
          <textarea
            value={groqApiKeys}
            onChange={(event) => setGroqApiKeys(event.target.value)}
            className="w-full min-h-20 rounded-md border p-3 text-sm"
            placeholder="Groq API keys (optional, one per line)"
          />

          <textarea
            value={globalSystem}
            onChange={(event) => setGlobalSystem(event.target.value)}
            className="w-full min-h-24 rounded-md border p-3 text-sm"
            placeholder="Global system prompt"
          />
          <textarea
            value={postRewrite}
            onChange={(event) => setPostRewrite(event.target.value)}
            className="w-full min-h-24 rounded-md border p-3 text-sm"
            placeholder="Post rewrite prompt"
          />
          <textarea
            value={serviceRewrite}
            onChange={(event) => setServiceRewrite(event.target.value)}
            className="w-full min-h-24 rounded-md border p-3 text-sm"
            placeholder="Service rewrite prompt"
          />
          <textarea
            value={projectRewrite}
            onChange={(event) => setProjectRewrite(event.target.value)}
            className="w-full min-h-24 rounded-md border p-3 text-sm"
            placeholder="Project rewrite prompt"
          />

          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            className="w-full min-h-20 rounded-md border p-3 text-sm"
            placeholder="Operational notes"
          />

          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save AI Writer Settings"}
          </Button>
        </form>
        {saveMessage ? <p className="text-sm mt-3 text-muted-foreground">{saveMessage}</p> : null}
      </section>

      <section className="rounded-md border p-4">
        <h3 className="font-medium">Generation Test</h3>
        <form onSubmit={testGenerate} className="mt-3 space-y-3">
          <div className="grid gap-2 md:grid-cols-3">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                checked={testDocType === "post"}
                onChange={() => setTestDocType("post")}
              />
              Post
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                checked={testDocType === "service"}
                onChange={() => setTestDocType("service")}
              />
              Service
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                checked={testDocType === "project"}
                onChange={() => setTestDocType("project")}
              />
              Project
            </label>
          </div>
          <textarea
            value={testPrompt}
            onChange={(event) => setTestPrompt(event.target.value)}
            className="w-full min-h-28 rounded-md border p-3 text-sm"
            placeholder="Prompt for generation test"
          />
          <Button type="submit" disabled={testing}>
            {testing ? "Generating..." : "Test Generate"}
          </Button>
        </form>

        {testMessage ? <p className="text-sm mt-3 text-muted-foreground">{testMessage}</p> : null}
        {testOutput ? (
          <pre className="mt-3 whitespace-pre-wrap rounded-md border bg-muted/30 p-3 text-xs">
            {testOutput}
          </pre>
        ) : null}
      </section>
    </div>
  );
}
