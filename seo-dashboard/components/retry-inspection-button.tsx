"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

export function RetryInspectionButton({
  url,
}: {
  url: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleRetry() {
    setLoading(true);
    try {
      const response = await fetch("/api/search/retry-inspection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload?.ok) {
        toast.error(payload?.message || "Failed to retry inspection");
        return;
      }
      toast.success("Inspection retried");
      router.refresh();
    } catch {
      toast.error("Network error while retrying inspection");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={handleRetry}
      disabled={loading || !url}
    >
      <RotateCcw className="size-3.5 mr-1" />
      {loading ? "Retrying..." : "Retry"}
    </Button>
  );
}
