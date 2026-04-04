"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type AuditItem = {
  url: string;
  statusCode: number;
  indexability: string;
  internalLinks: number;
  externalLinks: number;
  issues: string[];
};

export default function SeoAuditPage() {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<any>(null);
  const [items, setItems] = useState<AuditItem[]>([]);
  const [message, setMessage] = useState("");

  async function runAudit() {
    setLoading(true);
    setMessage("");
    const response = await fetch("/api/seo/audit/report?limit=80");
    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setMessage(data?.message || "Audit failed");
      return;
    }

    setSummary(data.summary);
    setItems(data.items || []);
  }

  return (
    <div className="space-y-6">
      <section className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Technical SEO Audit</h2>
          <p className="text-sm text-muted-foreground">
            Crawl sitemap URLs and detect core indexability and metadata issues.
          </p>
        </div>
        <Button onClick={runAudit} disabled={loading}>
          {loading ? "Running..." : "Run Audit"}
        </Button>
      </section>

      {message ? <p className="text-sm text-destructive">{message}</p> : null}

      {summary ? (
        <div className="grid gap-3 md:grid-cols-4">
          <Metric title="Total" value={String(summary.total)} />
          <Metric title="Healthy" value={String(summary.healthy)} />
          <Metric title="With Issues" value={String(summary.withIssues)} />
          <Metric title="Noindex" value={String(summary.noindex)} />
        </div>
      ) : null}

      <div className="overflow-x-auto rounded-md border">
        <table className="w-full text-sm">
          <thead className="bg-muted/40">
            <tr>
              <th className="text-left p-2">URL</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Indexability</th>
              <th className="text-left p-2">Int. Links</th>
              <th className="text-left p-2">Ext. Links</th>
              <th className="text-left p-2">Issues</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.url} className="border-t">
                <td className="p-2 break-all">{item.url}</td>
                <td className="p-2">{item.statusCode || "-"}</td>
                <td className="p-2">{item.indexability}</td>
                <td className="p-2">{item.internalLinks ?? "-"}</td>
                <td className="p-2">{item.externalLinks ?? "-"}</td>
                <td className="p-2">{item.issues.join(", ") || "-"}</td>
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
