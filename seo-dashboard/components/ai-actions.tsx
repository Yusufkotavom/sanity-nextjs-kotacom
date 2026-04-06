"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AiPreviewDialog } from "@/components/ai-preview-dialog";

export function AiActions({ 
  generationId, 
  content,
  validationStatus 
}: { 
  generationId: string;
  content?: any;
  validationStatus?: string;
}) {
  const [loading, setLoading] = useState<"retry" | "push" | null>(null);

  async function handleRetry() {
    setLoading("retry");
    try {
      const response = await fetch("/api/ai/retry-parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ai_generation_id: generationId }),
      });
      
      if (response.ok) {
        toast.success("AI generation retry started");
        setTimeout(() => window.location.reload(), 1000);
      } else {
        const data = await response.json().catch(() => ({}));
        toast.error(data?.message || "Failed to retry generation");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(null);
    }
  }

  async function handlePush() {
    setLoading("push");
    try {
      const response = await fetch("/api/ai/push-to-sanity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ai_generation_id: generationId }),
      });
      
      if (response.ok) {
        toast.success("Content pushed to Sanity successfully");
        setTimeout(() => window.location.reload(), 1000);
      } else {
        const data = await response.json().catch(() => ({}));
        toast.error(data?.message || "Failed to push to Sanity");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {content && (
        <AiPreviewDialog 
          generationId={generationId}
          content={content} 
          validationStatus={validationStatus || "unknown"}
        />
      )}
      <Button variant="outline" size="sm" onClick={handleRetry} disabled={loading !== null}>
        {loading === "retry" ? "Retrying..." : "Retry"}
      </Button>
      <Button size="sm" onClick={handlePush} disabled={loading !== null}>
        {loading === "push" ? "Pushing..." : "Push"}
      </Button>
    </div>
  );
}
