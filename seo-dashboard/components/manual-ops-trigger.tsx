"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TASK_OPTIONS = [
  { value: "pull-ga4", label: "Sync GA4 Daily (pull-ga4)" },
  { value: "pull-analytics", label: "Sync GSC Analytics (pull-analytics)" },
  { value: "run-seo-audits", label: "Run SEO Audits Batch" },
  { value: "submit-sitemap", label: "Submit Sitemap to GSC" },
  { value: "inspect-index", label: "Inspect Index Status" },
  { value: "drain-queues", label: "Drain Worker Queues" },
  { value: "run-scheduled", label: "Run Scheduled Tasks" },
];

export default function ManualOpsTrigger() {
  const router = useRouter();
  const [type, setType] = useState("pull-ga4");
  const [loading, setLoading] = useState(false);

  async function handleRun() {
    setLoading(true);
    try {
      const response = await fetch("/api/seo/ops/trigger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok || !payload?.ok) {
        const message =
          payload?.upstream?.message ||
          payload?.message ||
          "Failed to trigger manual task.";
        toast.error(message);
        return;
      }

      const summary =
        payload?.upstream?.rows != null
          ? `${payload.upstream.rows} rows`
          : "Triggered successfully";
      toast.success(`${type}: ${summary}`);
      router.refresh();
    } catch {
      toast.error("Network error while triggering task.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3 rounded-lg border p-3">
      <div className="space-y-1">
        <Label>Manual Worker Trigger</Label>
        <p className="text-xs text-muted-foreground">
          Trigger task manual dari dashboard tanpa menunggu scheduler cron.
        </p>
      </div>
      <div className="flex gap-2">
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="flex-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TASK_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleRun} disabled={loading}>
          <Play className="size-4 mr-2" />
          {loading ? "Running..." : "Run"}
        </Button>
      </div>
    </div>
  );
}

