"use client";

import { useEffect, useState } from "react";

type StatusPayload = {
  ok: boolean;
  config?: {
    authConfigured: boolean;
    google: { enabled: boolean; aggressive: boolean; hasCredentials: boolean };
    indexNow: { enabled: boolean; hasKey: boolean; endpoint: string; host: string };
    webhook: { autoSubmitEnabled: boolean };
    defaults: { maxBatchSize: number; retryAttempts: number };
  };
  queue?: {
    jobs: number;
    totalTasks: number;
    successTasks: number;
    failedTasks: number;
  };
};

export default function SeoDashboardOverviewPage() {
  const [data, setData] = useState<StatusPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/seo/config/status")
      .then(async (response) => {
        const json = (await response.json()) as StatusPayload;
        if (!response.ok) throw new Error((json as any)?.message || "Failed to load");
        setData(json);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-sm text-muted-foreground">Loading dashboard...</p>;
  if (error) return <p className="text-sm text-destructive">{error}</p>;

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-lg font-semibold">Engine Status</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Google API"
            value={data?.config?.google.enabled ? "Enabled" : "Disabled"}
            sub={`Credentials: ${data?.config?.google.hasCredentials ? "Ready" : "Missing"}`}
          />
          <MetricCard
            title="Google Mode"
            value={data?.config?.google.aggressive ? "Aggressive" : "Official"}
            sub="Indexing behavior mode"
          />
          <MetricCard
            title="IndexNow"
            value={data?.config?.indexNow.enabled ? "Enabled" : "Disabled"}
            sub={`Key: ${data?.config?.indexNow.hasKey ? "Ready" : "Missing"}`}
          />
          <MetricCard
            title="Auto Submit"
            value={data?.config?.webhook.autoSubmitEnabled ? "On" : "Off"}
            sub="Triggered by revalidate webhook"
          />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Queue Summary</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard title="Jobs" value={String(data?.queue?.jobs || 0)} />
          <MetricCard title="Tasks" value={String(data?.queue?.totalTasks || 0)} />
          <MetricCard title="Success" value={String(data?.queue?.successTasks || 0)} />
          <MetricCard title="Failed" value={String(data?.queue?.failedTasks || 0)} />
        </div>
      </section>
    </div>
  );
}

function MetricCard({
  title,
  value,
  sub,
}: {
  title: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-lg border p-4">
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="mt-1 text-xl font-semibold">{value}</p>
      {sub ? <p className="mt-1 text-xs text-muted-foreground">{sub}</p> : null}
    </div>
  );
}
