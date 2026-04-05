"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function AiActions({ generationId }: { generationId: string }) {
  const [loading, setLoading] = useState<"retry" | "push" | null>(null);

  async function handleRetry() {
    setLoading("retry");
    try {
      await fetch("/api/ai/retry-parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ai_generation_id: generationId }),
      });
    } finally {
      setLoading(null);
    }
  }

  async function handlePush() {
    setLoading("push");
    try {
      await fetch("/api/ai/push-to-sanity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ai_generation_id: generationId }),
      });
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" size="sm" onClick={handleRetry} disabled={loading !== null}>
        {loading === "retry" ? "Retrying..." : "Retry"}
      </Button>
      <Button size="sm" onClick={handlePush} disabled={loading !== null}>
        {loading === "push" ? "Pushing..." : "Push"}
      </Button>
    </div>
  );
}
