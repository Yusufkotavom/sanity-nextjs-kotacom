"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type RuntimeProvider = "gateway" | "gemini" | "groq";
type Mode = "gateway" | "direct-gemini" | "direct-groq";
type QualityMode = "economy" | "standard" | "high";

type FormState = {
  enabled: boolean;
  mode: Mode;
  defaultModel: string;
  customModelGateway: string;
  defaultModelGemini: string;
  customModelGemini: string;
  defaultModelGroq: string;
  customModelGroq: string;
  fallbackModelsText: string;
  temperature: string;
  maxOutputTokens: string;
  profiles: Record<
    QualityMode,
    {
      provider: "inherit" | RuntimeProvider;
      model: string;
    }
  >;
  prompts: {
    globalSystem: string;
    postRewrite: string;
    serviceRewrite: string;
    projectRewrite: string;
    postBodyExtend: string;
    serviceBodyExtend: string;
    projectBodyExtend: string;
  };
  notes: string;
};

const DEFAULT_FORM: FormState = {
  enabled: false,
  mode: "gateway",
  defaultModel: "google/gemini-2.5-flash",
  customModelGateway: "",
  defaultModelGemini: "gemini-2.5-flash",
  customModelGemini: "",
  defaultModelGroq: "meta-llama/llama-4-scout-17b-16e-instruct",
  customModelGroq: "",
  fallbackModelsText: "",
  temperature: "0.4",
  maxOutputTokens: "1400",
  profiles: {
    economy: { provider: "inherit", model: "" },
    standard: { provider: "inherit", model: "" },
    high: { provider: "inherit", model: "" },
  },
  prompts: {
    globalSystem: "",
    postRewrite: "",
    serviceRewrite: "",
    projectRewrite: "",
    postBodyExtend: "",
    serviceBodyExtend: "",
    projectBodyExtend: "",
  },
  notes: "",
};

function toProviderValue(value: unknown): "inherit" | RuntimeProvider {
  if (value === "gateway" || value === "gemini" || value === "groq") return value;
  return "inherit";
}

function asString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

export default function AiSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [canWriteSettings, setCanWriteSettings] = useState(false);
  const [sourceSummary, setSourceSummary] = useState<{
    gatewayApiKey: string;
    oidcToken: string;
    geminiKeyCount: number;
    groqKeyCount: number;
  } | null>(null);
  const [form, setForm] = useState<FormState>(DEFAULT_FORM);

  useEffect(() => {
    void loadStatus();
  }, []);

  async function loadStatus() {
    setLoading(true);
    try {
      const response = await fetch("/api/ai/config/status", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok || !data?.ok) {
        throw new Error(data?.message || "Failed to load AI settings");
      }

      const studio = data?.studioSettings || {};
      const runtime = data?.runtime || {};
      const runtimeProfiles = runtime?.modelProfiles || {};
      const studioProfiles = studio?.modelProfiles || {};
      const studioPrompts = studio?.prompts || {};
      const runtimePrompts = runtime?.prompts || {};

      setCanWriteSettings(Boolean(data?.capabilities?.canWriteSettings));
      setSourceSummary({
        gatewayApiKey: asString(data?.sources?.gatewayApiKey, "none"),
        oidcToken: asString(data?.sources?.oidcToken, "missing"),
        geminiKeyCount: Number(data?.sources?.geminiKeyCount || 0),
        groqKeyCount: Number(data?.sources?.groqKeyCount || 0),
      });

      setForm({
        enabled: Boolean(studio?.enabled ?? runtime?.enabled),
        mode: (studio?.mode || runtime?.mode || "gateway") as Mode,
        defaultModel: asString(studio?.defaultModel, asString(runtime?.defaultModels?.gateway, DEFAULT_FORM.defaultModel)),
        customModelGateway: asString(studio?.customModelGateway),
        defaultModelGemini: asString(
          studio?.defaultModelGemini,
          asString(runtime?.defaultModels?.gemini, DEFAULT_FORM.defaultModelGemini),
        ),
        customModelGemini: asString(studio?.customModelGemini),
        defaultModelGroq: asString(
          studio?.defaultModelGroq,
          asString(runtime?.defaultModels?.groq, DEFAULT_FORM.defaultModelGroq),
        ),
        customModelGroq: asString(studio?.customModelGroq),
        fallbackModelsText: Array.isArray(studio?.fallbackModels)
          ? studio.fallbackModels.filter(Boolean).join("\n")
          : Array.isArray(runtime?.fallbackModels)
            ? runtime.fallbackModels.filter(Boolean).join("\n")
            : "",
        temperature: String(studio?.temperature ?? runtime?.temperature ?? 0.4),
        maxOutputTokens: String(studio?.maxOutputTokens ?? runtime?.maxOutputTokens ?? 1400),
        profiles: {
          economy: {
            provider: toProviderValue(studioProfiles?.economy?.provider),
            model: asString(studioProfiles?.economy?.model, asString(runtimeProfiles?.economy?.model)),
          },
          standard: {
            provider: toProviderValue(studioProfiles?.standard?.provider),
            model: asString(studioProfiles?.standard?.model, asString(runtimeProfiles?.standard?.model)),
          },
          high: {
            provider: toProviderValue(studioProfiles?.high?.provider),
            model: asString(studioProfiles?.high?.model, asString(runtimeProfiles?.high?.model)),
          },
        },
        prompts: {
          globalSystem: asString(studioPrompts?.globalSystem, asString(runtimePrompts?.globalSystem)),
          postRewrite: asString(studioPrompts?.postRewrite, asString(runtimePrompts?.postRewrite)),
          serviceRewrite: asString(studioPrompts?.serviceRewrite, asString(runtimePrompts?.serviceRewrite)),
          projectRewrite: asString(studioPrompts?.projectRewrite, asString(runtimePrompts?.projectRewrite)),
          postBodyExtend: asString(studioPrompts?.postBodyExtend, asString(runtimePrompts?.postBodyExtend)),
          serviceBodyExtend: asString(
            studioPrompts?.serviceBodyExtend,
            asString(runtimePrompts?.serviceBodyExtend),
          ),
          projectBodyExtend: asString(
            studioPrompts?.projectBodyExtend,
            asString(runtimePrompts?.projectBodyExtend),
          ),
        },
        notes: asString(studio?.notes),
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to load AI settings");
    } finally {
      setLoading(false);
    }
  }

  const parsedFallbackModels = useMemo(() => {
    return form.fallbackModelsText
      .split(/[\n,]/)
      .map((item) => item.trim())
      .filter(Boolean);
  }, [form.fallbackModelsText]);

  async function handleSave() {
    setSaving(true);
    try {
      const payload = {
        enabled: form.enabled,
        mode: form.mode,
        defaultModel: form.defaultModel.trim(),
        customModelGateway: form.customModelGateway.trim(),
        defaultModelGemini: form.defaultModelGemini.trim(),
        customModelGemini: form.customModelGemini.trim(),
        defaultModelGroq: form.defaultModelGroq.trim(),
        customModelGroq: form.customModelGroq.trim(),
        fallbackModels: parsedFallbackModels,
        modelProfiles: {
          economy: {
            provider: form.profiles.economy.provider === "inherit" ? undefined : form.profiles.economy.provider,
            model: form.profiles.economy.model.trim(),
          },
          standard: {
            provider:
              form.profiles.standard.provider === "inherit" ? undefined : form.profiles.standard.provider,
            model: form.profiles.standard.model.trim(),
          },
          high: {
            provider: form.profiles.high.provider === "inherit" ? undefined : form.profiles.high.provider,
            model: form.profiles.high.model.trim(),
          },
        },
        temperature: Number(form.temperature),
        maxOutputTokens: Number(form.maxOutputTokens),
        prompts: {
          globalSystem: form.prompts.globalSystem,
          postRewrite: form.prompts.postRewrite,
          serviceRewrite: form.prompts.serviceRewrite,
          projectRewrite: form.prompts.projectRewrite,
          postBodyExtend: form.prompts.postBodyExtend,
          serviceBodyExtend: form.prompts.serviceBodyExtend,
          projectBodyExtend: form.prompts.projectBodyExtend,
        },
        notes: form.notes,
      };

      const response = await fetch("/api/ai/config/save", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data?.ok) {
        throw new Error(data?.message || "Failed to save AI settings");
      }

      toast.success("AI settings saved");
      await loadStatus();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save AI settings");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">AI Settings</h1>
        <p className="mt-1 text-muted-foreground">
          Model routing, quality profile, dan prompt global untuk AI writer.
        </p>
      </div>

      <Card className="space-y-6 p-6">
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Runtime</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center justify-between rounded-md border p-3">
              <div>
                <Label>Enable AI Writer</Label>
                <p className="text-xs text-muted-foreground">Aktif/nonaktif semua fitur AI writer.</p>
              </div>
              <Switch
                checked={form.enabled}
                onCheckedChange={(checked) => setForm((prev) => ({ ...prev, enabled: Boolean(checked) }))}
              />
            </div>
            <div className="rounded-md border p-3 text-sm">
              <p className="font-medium">Sources</p>
              <p className="text-muted-foreground">Gateway key: {sourceSummary?.gatewayApiKey || "-"}</p>
              <p className="text-muted-foreground">OIDC token: {sourceSummary?.oidcToken || "-"}</p>
              <p className="text-muted-foreground">
                Gemini keys: {sourceSummary?.geminiKeyCount ?? 0} | Groq keys: {sourceSummary?.groqKeyCount ?? 0}
              </p>
            </div>
          </div>
          {!canWriteSettings && (
            <p className="text-sm text-amber-600">
              Sanity write token belum tersedia. Set `SANITY_AUTH_TOKEN` agar perubahan bisa disimpan.
            </p>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Mode</Label>
            <Select
              value={form.mode}
              onValueChange={(value) => setForm((prev) => ({ ...prev, mode: value as Mode }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gateway">Gateway</SelectItem>
                <SelectItem value="direct-gemini">Direct Gemini</SelectItem>
                <SelectItem value="direct-groq">Direct Groq</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Fallback Models (Gateway only)</Label>
            <Textarea
              value={form.fallbackModelsText}
              onChange={(e) => setForm((prev) => ({ ...prev, fallbackModelsText: e.target.value }))}
              rows={4}
              placeholder="openai/gpt-4o-mini&#10;google/gemini-2.5-flash"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label>Default Gateway Model</Label>
            <Input
              value={form.defaultModel}
              onChange={(e) => setForm((prev) => ({ ...prev, defaultModel: e.target.value }))}
              placeholder="google/gemini-2.5-flash"
            />
            <Label>Gateway Custom Override</Label>
            <Input
              value={form.customModelGateway}
              onChange={(e) => setForm((prev) => ({ ...prev, customModelGateway: e.target.value }))}
              placeholder="optional override"
            />
          </div>
          <div className="space-y-2">
            <Label>Default Gemini Model</Label>
            <Input
              value={form.defaultModelGemini}
              onChange={(e) => setForm((prev) => ({ ...prev, defaultModelGemini: e.target.value }))}
              placeholder="gemini-2.5-flash"
            />
            <Label>Gemini Custom Override</Label>
            <Input
              value={form.customModelGemini}
              onChange={(e) => setForm((prev) => ({ ...prev, customModelGemini: e.target.value }))}
              placeholder="optional override"
            />
          </div>
          <div className="space-y-2">
            <Label>Default Groq Model</Label>
            <Input
              value={form.defaultModelGroq}
              onChange={(e) => setForm((prev) => ({ ...prev, defaultModelGroq: e.target.value }))}
              placeholder="meta-llama/llama-4-scout-17b-16e-instruct"
            />
            <Label>Groq Custom Override</Label>
            <Input
              value={form.customModelGroq}
              onChange={(e) => setForm((prev) => ({ ...prev, customModelGroq: e.target.value }))}
              placeholder="optional override"
            />
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Quality Profiles</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {(["economy", "standard", "high"] as QualityMode[]).map((key) => (
              <div key={key} className="space-y-2 rounded-md border p-3">
                <p className="text-sm font-medium capitalize">{key}</p>
                <Label>Provider</Label>
                <Select
                  value={form.profiles[key].provider}
                  onValueChange={(value) =>
                    setForm((prev) => ({
                      ...prev,
                      profiles: {
                        ...prev.profiles,
                        [key]: {
                          ...prev.profiles[key],
                          provider: value as "inherit" | RuntimeProvider,
                        },
                      },
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inherit">Inherit (runtime default)</SelectItem>
                    <SelectItem value="gateway">Gateway</SelectItem>
                    <SelectItem value="gemini">Gemini</SelectItem>
                    <SelectItem value="groq">Groq</SelectItem>
                  </SelectContent>
                </Select>
                <Label>Model</Label>
                <Input
                  value={form.profiles[key].model}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      profiles: {
                        ...prev.profiles,
                        [key]: { ...prev.profiles[key], model: e.target.value },
                      },
                    }))
                  }
                  placeholder={
                    form.profiles[key].provider === "gateway"
                      ? "provider/model"
                      : "model id"
                  }
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Temperature</Label>
            <Input
              type="number"
              min={0}
              max={2}
              step="0.1"
              value={form.temperature}
              onChange={(e) => setForm((prev) => ({ ...prev, temperature: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label>Max Output Tokens</Label>
            <Input
              type="number"
              min={128}
              value={form.maxOutputTokens}
              onChange={(e) => setForm((prev) => ({ ...prev, maxOutputTokens: e.target.value }))}
            />
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Prompts</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Global System</Label>
              <Textarea
                value={form.prompts.globalSystem}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    prompts: { ...prev.prompts, globalSystem: e.target.value },
                  }))
                }
                rows={8}
              />
            </div>
            <div className="space-y-2">
              <Label>Post Rewrite</Label>
              <Textarea
                value={form.prompts.postRewrite}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    prompts: { ...prev.prompts, postRewrite: e.target.value },
                  }))
                }
                rows={8}
              />
            </div>
            <div className="space-y-2">
              <Label>Service Rewrite</Label>
              <Textarea
                value={form.prompts.serviceRewrite}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    prompts: { ...prev.prompts, serviceRewrite: e.target.value },
                  }))
                }
                rows={8}
              />
            </div>
            <div className="space-y-2">
              <Label>Project Rewrite</Label>
              <Textarea
                value={form.prompts.projectRewrite}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    prompts: { ...prev.prompts, projectRewrite: e.target.value },
                  }))
                }
                rows={8}
              />
            </div>
            <div className="space-y-2">
              <Label>Post Body Extend</Label>
              <Textarea
                value={form.prompts.postBodyExtend}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    prompts: { ...prev.prompts, postBodyExtend: e.target.value },
                  }))
                }
                rows={6}
              />
            </div>
            <div className="space-y-2">
              <Label>Service Body Extend</Label>
              <Textarea
                value={form.prompts.serviceBodyExtend}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    prompts: { ...prev.prompts, serviceBodyExtend: e.target.value },
                  }))
                }
                rows={6}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Project Body Extend</Label>
              <Textarea
                value={form.prompts.projectBodyExtend}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    prompts: { ...prev.prompts, projectBodyExtend: e.target.value },
                  }))
                }
                rows={6}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Internal Notes</Label>
          <Textarea
            value={form.notes}
            onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
            rows={4}
          />
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2">
          <Button variant="outline" onClick={() => void loadStatus()} disabled={loading || saving}>
            Refresh
          </Button>
          <Button onClick={() => void handleSave()} disabled={loading || saving || !canWriteSettings}>
            {saving ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
