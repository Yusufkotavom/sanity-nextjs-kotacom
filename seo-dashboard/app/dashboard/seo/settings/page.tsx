"use client";

import { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type StatusPayload = {
  ok: boolean;
  config?: {
    google: { enabled: boolean; aggressive: boolean; hasCredentials: boolean };
    indexNow: { enabled: boolean; host: string; endpoint: string; hasKey: boolean };
    webhook: { autoSubmitEnabled: boolean };
    defaults: { maxBatchSize: number; retryAttempts: number };
  };
  studioSettings?: {
    notes?: string;
    indexNowKeyLocation?: string;
  };
  capabilities?: {
    canWriteSettings: boolean;
    canEncrypt: boolean;
  };
  sources?: {
    googleCredentials?: string;
    indexNowKey?: string;
    dashboardPassword?: string;
  };
};

export default function SeoSettingsPage() {
  const [status, setStatus] = useState<StatusPayload | null>(null);
  const [statusError, setStatusError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const [googleEnabled, setGoogleEnabled] = useState(false);
  const [googleAggressiveMode, setGoogleAggressiveMode] = useState(false);
  const [googleServiceAccountJson, setGoogleServiceAccountJson] = useState("");
  const [indexNowEnabled, setIndexNowEnabled] = useState(false);
  const [indexNowHost, setIndexNowHost] = useState("");
  const [indexNowEndpoint, setIndexNowEndpoint] = useState("https://api.indexnow.org/indexnow");
  const [indexNowKey, setIndexNowKey] = useState("");
  const [indexNowKeyLocation, setIndexNowKeyLocation] = useState("");
  const [autoSubmitOnRevalidate, setAutoSubmitOnRevalidate] = useState(true);
  const [maxBatchSize, setMaxBatchSize] = useState(100);
  const [retryAttempts, setRetryAttempts] = useState(2);
  const [dashboardPassword, setDashboardPassword] = useState("");
  const [notes, setNotes] = useState("");

  const [ga4Json, setGa4Json] = useState(
    '[{"page":"https://www.kotacom.id/","sessions":1200,"conversions":24}]',
  );
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/seo/config/status")
      .then(async (response) => {
        const json = (await response.json()) as StatusPayload & { message?: string };
        if (!response.ok) throw new Error(json.message || "Failed to load settings");
        setStatus(json);

        setGoogleEnabled(Boolean(json.config?.google.enabled));
        setGoogleAggressiveMode(Boolean(json.config?.google.aggressive));
        setIndexNowEnabled(Boolean(json.config?.indexNow.enabled));
        setIndexNowHost(json.config?.indexNow.host || "");
        setIndexNowEndpoint(json.config?.indexNow.endpoint || "https://api.indexnow.org/indexnow");
        setIndexNowKeyLocation(json.studioSettings?.indexNowKeyLocation || "");
        setAutoSubmitOnRevalidate(Boolean(json.config?.webhook.autoSubmitEnabled));
        setMaxBatchSize(json.config?.defaults.maxBatchSize || 100);
        setRetryAttempts(json.config?.defaults.retryAttempts || 2);
        setNotes(json.studioSettings?.notes || "");
      })
      .catch((error: Error) => setStatusError(error.message));
  }, []);

  async function saveSettings(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setSaveMessage("");

    const response = await fetch("/api/seo/config/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        googleEnabled,
        googleAggressiveMode,
        googleServiceAccountJson,
        indexNowEnabled,
        indexNowHost,
        indexNowEndpoint,
        indexNowKey,
        indexNowKeyLocation,
        autoSubmitOnRevalidate,
        maxBatchSize,
        retryAttempts,
        dashboardPassword,
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

    setGoogleServiceAccountJson("");
    setIndexNowKey("");
    setDashboardPassword("");
    setSaveMessage(data?.message || "Saved");
  }

  async function importGa4(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const rows = JSON.parse(ga4Json);
      const response = await fetch("/api/seo/data/import/ga4", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rows }),
      });
      const data = await response.json();
      setMessage(data?.message || "Import complete");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Invalid JSON");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-lg font-semibold">Runtime Settings</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Kelola konfigurasi SEO dashboard langsung dari sini. Secret disimpan terenkripsi di
          Sanity.
        </p>
      </section>

      {statusError ? <p className="text-sm text-destructive">{statusError}</p> : null}

      <section className="rounded-md border p-4">
        <h3 className="font-medium">Configuration Source</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Google creds: {status?.sources?.googleCredentials || "n/a"} | IndexNow key:{" "}
          {status?.sources?.indexNowKey || "n/a"} | Password source:{" "}
          {status?.sources?.dashboardPassword || "n/a"}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Save enabled: {status?.capabilities?.canWriteSettings ? "yes" : "no"} | Encryption
          enabled: {status?.capabilities?.canEncrypt ? "yes" : "no"}
        </p>
      </section>

      <section className="rounded-md border p-4">
        <h3 className="font-medium">SEO Ops Configuration</h3>
        <form onSubmit={saveSettings} className="mt-3 space-y-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={googleEnabled}
              onChange={(event) => setGoogleEnabled(event.target.checked)}
            />
            Google Indexing enabled
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={googleAggressiveMode}
              onChange={(event) => setGoogleAggressiveMode(event.target.checked)}
            />
            Google aggressive mode
          </label>
          <textarea
            value={googleServiceAccountJson}
            onChange={(event) => setGoogleServiceAccountJson(event.target.value)}
            className="w-full min-h-28 rounded-md border p-3 text-sm"
            placeholder="Paste Google service account JSON (optional, leave blank to keep current)"
          />

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={indexNowEnabled}
              onChange={(event) => setIndexNowEnabled(event.target.checked)}
            />
            IndexNow enabled
          </label>
          <Input
            value={indexNowHost}
            onChange={(event) => setIndexNowHost(event.target.value)}
            placeholder="IndexNow host, ex: www.kotacom.id"
          />
          <Input
            value={indexNowEndpoint}
            onChange={(event) => setIndexNowEndpoint(event.target.value)}
            placeholder="IndexNow endpoint"
          />
          <Input
            value={indexNowKeyLocation}
            onChange={(event) => setIndexNowKeyLocation(event.target.value)}
            placeholder="IndexNow key location (optional)"
          />
          <textarea
            value={indexNowKey}
            onChange={(event) => setIndexNowKey(event.target.value)}
            className="w-full min-h-24 rounded-md border p-3 text-sm"
            placeholder="IndexNow key (optional, leave blank to keep current)"
          />

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={autoSubmitOnRevalidate}
              onChange={(event) => setAutoSubmitOnRevalidate(event.target.checked)}
            />
            Auto submit on revalidate
          </label>

          <div className="grid gap-3 md:grid-cols-2">
            <Input
              type="number"
              min={1}
              max={1000}
              value={maxBatchSize}
              onChange={(event) => setMaxBatchSize(Number(event.target.value || 100))}
              placeholder="Max batch size"
            />
            <Input
              type="number"
              min={0}
              max={10}
              value={retryAttempts}
              onChange={(event) => setRetryAttempts(Number(event.target.value || 2))}
              placeholder="Retry attempts"
            />
          </div>

          <Input
            type="password"
            value={dashboardPassword}
            onChange={(event) => setDashboardPassword(event.target.value)}
            placeholder="New dashboard password (optional)"
          />
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            className="w-full min-h-24 rounded-md border p-3 text-sm"
            placeholder="Operational notes"
          />
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save SEO Ops Settings"}
          </Button>
        </form>
        {saveMessage ? <p className="text-sm mt-3 text-muted-foreground">{saveMessage}</p> : null}
      </section>

      <section className="rounded-md border p-4">
        <h3 className="font-medium">Import GA4 Rows</h3>
        <p className="text-xs text-muted-foreground mt-1">
          JSON array input to enrich migration scoring (in-memory store).
        </p>

        <form onSubmit={importGa4} className="mt-3 space-y-3">
          <textarea
            value={ga4Json}
            onChange={(event) => setGa4Json(event.target.value)}
            className="w-full min-h-40 rounded-md border p-3 text-sm"
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Importing..." : "Import GA4 JSON"}
          </Button>
        </form>

        {message ? <p className="text-sm mt-3 text-muted-foreground">{message}</p> : null}
      </section>
    </div>
  );
}
