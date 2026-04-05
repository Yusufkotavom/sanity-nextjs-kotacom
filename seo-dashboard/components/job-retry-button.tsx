"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function JobRetryButton({ jobRunId }: { jobRunId: string }) {
  const [loading, setLoading] = useState(false);

  async function handleRetry() {
    setLoading(true);
    try {
      await fetch("/api/jobs/retry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job_run_id: jobRunId }),
      });
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
