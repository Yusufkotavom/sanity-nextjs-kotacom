"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { RotateCcw } from "lucide-react";

interface BulkRetryButtonProps {
  failedCount: number;
}

export function BulkRetryButton({ failedCount }: BulkRetryButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleBulkRetry() {
    setLoading(true);
    try {
      const response = await fetch("/api/jobs/bulk-retry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "failed" }),
      });
      
      if (response.ok) {
        const data = await response.json();
        toast.success(`${data.count || failedCount} failed jobs queued for retry`);
        setTimeout(() => window.location.reload(), 1500);
      } else {
        const data = await response.json().catch(() => ({}));
        toast.error(data?.message || "Failed to retry jobs");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (failedCount === 0) return null;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" disabled={loading}>
          <RotateCcw className="size-4 mr-2" />
          Retry All Failed ({failedCount})
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Retry All Failed Jobs?</AlertDialogTitle>
          <AlertDialogDescription>
            This will queue {failedCount} failed job{failedCount > 1 ? 's' : ''} for retry. 
            They will be processed by the worker in order.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleBulkRetry} disabled={loading}>
            {loading ? "Retrying..." : "Retry All"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
