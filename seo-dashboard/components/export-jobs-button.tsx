"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";

interface ExportJobsButtonProps {
  jobs: Array<{
    id: string;
    jobType: string;
    status: string;
    attempt: number;
    createdAt: Date | string;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    errorMessage?: string | null;
  }>;
}

export function ExportJobsButton({ jobs }: ExportJobsButtonProps) {
  const [loading, setLoading] = useState(false);

  const formatDate = (date: Date | string | null | undefined) => {
    if (!date) return "";
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toISOString();
  };

  const handleExport = () => {
    setLoading(true);
    try {
      // Prepare CSV data
      const headers = [
        "Job ID",
        "Type",
        "Status",
        "Attempt",
        "Created At",
        "Started At",
        "Completed At",
        "Duration (s)",
        "Error Message",
      ];

      const rows = jobs.map((job) => {
        const duration =
          job.startedAt && job.completedAt
            ? Math.round(
                (new Date(job.completedAt).getTime() -
                  new Date(job.startedAt).getTime()) /
                  1000
              )
            : "";

        return [
          job.id,
          job.jobType,
          job.status,
          job.attempt,
          formatDate(job.createdAt),
          formatDate(job.startedAt),
          formatDate(job.completedAt),
          duration,
          job.errorMessage || "",
        ];
      });

      // Convert to CSV
      const csvContent = [
        headers.join(","),
        ...rows.map((row) =>
          row
            .map((cell) => {
              const cellStr = String(cell);
              // Escape quotes and wrap in quotes if contains comma, quote, or newline
              if (cellStr.includes(",") || cellStr.includes('"') || cellStr.includes("\n")) {
                return `"${cellStr.replace(/"/g, '""')}"`;
              }
              return cellStr;
            })
            .join(",")
        ),
      ].join("\n");

      // Create blob and download
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      
      link.setAttribute("href", url);
      link.setAttribute("download", `jobs-${new Date().toISOString().split("T")[0]}.csv`);
      link.style.visibility = "hidden";
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success(`Exported ${jobs.length} jobs to CSV`);
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export jobs");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleExport}
      disabled={loading || jobs.length === 0}
    >
      <Download className="size-4 mr-2" />
      {loading ? "Exporting..." : "Export CSV"}
    </Button>
  );
}
