"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function JobRetryButton({ jobRunId }: { jobRunId: string }) {
  const [loading, setLoading] = useState(false);

  async function handleRetry() {
    setLoading(true);
    try {
      const response = await fetch("/api/jobs/retry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job_run_id: jobRunId }),
      });
      
      if (response.ok) {
        toast.success("Job retry queued successfully");
        setTimeout(() => window.location.reload(), 1000);
      } else {
        const data = await response.json().catch(() => ({}));
        toast.error(data?.message || "Failed to retry job");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleRetry} disabled={loading}>
      {loading ? "Retrying..." : "Retry"}
    </Button>
  );
}
