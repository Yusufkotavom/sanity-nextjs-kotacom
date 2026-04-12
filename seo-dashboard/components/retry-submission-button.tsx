"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

export function RetrySubmissionButton({
  id,
}: {
  id: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleRetry() {
    setLoading(true);
    try {
      const response = await fetch("/api/search/retry-submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload?.ok) {
        toast.error(payload?.message || "Failed to retry submission");
        return;
      }
      toast.success("Submission retried");
      router.refresh();
    } catch {
      toast.error("Network error while retrying submission");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={handleRetry}
      disabled={loading}
    >
      <RotateCcw className="size-3.5 mr-1" />
      {loading ? "Retrying..." : "Retry"}
    </Button>
  );
}
