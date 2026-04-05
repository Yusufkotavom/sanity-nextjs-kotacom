"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type PriorityRow = {
  page: string;
  clicks: number;
  impressions: number;
  position: number;
  mergedScore: number;
  finalAction: string;
  ga4Sessions: number;
  ga4Conversions: number;
};

export default function SeoMigrationPriorityPage() {
  const [rows, setRows] = useState<PriorityRow[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [message, setMessage] = useState("");

  async function load() {
    const response = await fetch("/api/seo/migration-priority");
    const data = await response.json();
    if (!response.ok) {
      setMessage(data?.message || "Failed to load migration data");
      return;
    }

    setSummary(data);
    setRows(data.rows || []);
  }

  async function importGsc() {
    const response = await fetch("/api/seo/data/import/gsc", { method: "POST" });
    const data = await response.json();
    setMessage(data?.message || "Import completed.");
    void load();
  }

  useEffect(() => {
    void load();
  }, []);

  return (
    <div className="space-y-6">
      <section className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Migration Priority</h2>
          <p className="text-sm text-muted-foreground">
            Curate pages by SEO impact from GSC + GA4 merged score.
          </p>
        </div>
        <Button variant="outline" onClick={importGsc}>
          Reload GSC CSV
        </Button>
      </section>

      {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}

      <div className="grid gap-3 md:grid-cols-4">
        <Metric title="Total URLs" value={String(summary?.total || 0)} />
        <Metric title="Migrate Now" value={String(summary?.migrateNow || 0)} />
        <Metric title="Improve Then Migrate" value={String(summary?.improveThenMigrate || 0)} />
        <Metric title="Keep/Archive/Redirect" value={String(summary?.keepArchiveRedirect || 0)} />
      </div>

      <div className="overflow-x-auto rounded-md border">
        <table className="w-full text-sm">
          <thead className="bg-muted/40">
            <tr>
              <th className="text-left p-2">Page</th>
              <th className="text-left p-2">Score</th>
              <th className="text-left p-2">Action</th>
              <th className="text-left p-2">Clicks</th>
              <th className="text-left p-2">Impr.</th>
              <th className="text-left p-2">Pos.</th>
              <th className="text-left p-2">GA4 Sessions</th>
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, 200).map((row) => (
              <tr key={row.page} className="border-t">
                <td className="p-2 break-all">{row.page}</td>
                <td className="p-2">{row.mergedScore}</td>
                <td className="p-2">{row.finalAction}</td>
                <td className="p-2">{row.clicks}</td>
                <td className="p-2">{row.impressions}</td>
                <td className="p-2">{row.position.toFixed(2)}</td>
                <td className="p-2">{row.ga4Sessions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Metric({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-md border p-3">
      <p className="text-xs text-muted-foreground">{title}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}
