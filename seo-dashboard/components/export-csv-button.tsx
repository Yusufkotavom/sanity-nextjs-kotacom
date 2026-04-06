"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";

interface ExportCsvButtonProps {
  data: any[];
  filename: string;
  columns: { key: string; label: string }[];
}

export function ExportCsvButton({ data, filename, columns }: ExportCsvButtonProps) {
  function exportToCsv() {
    if (data.length === 0) {
      toast.error("No data to export");
      return;
    }

    try {
      // Create CSV header
      const header = columns.map(col => col.label).join(",");
      
      // Create CSV rows
      const rows = data.map(row => {
        return columns.map(col => {
          const value = row[col.key];
          // Handle null/undefined
          if (value === null || value === undefined) return "";
          // Handle dates
          if (value instanceof Date) {
            return value.toISOString();
          }
          // Handle strings with commas or quotes
          const stringValue = String(value);
          if (stringValue.includes(",") || stringValue.includes('"') || stringValue.includes("\n")) {
            return `"${stringValue.replace(/"/g, '""')}"`;
          }
          return stringValue;
        }).join(",");
      });

      // Combine header and rows
      const csv = [header, ...rows].join("\n");

      // Create blob and download
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      
      link.setAttribute("href", url);
      link.setAttribute("download", `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = "hidden";
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success(`Exported ${data.length} rows to CSV`);
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export CSV");
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={exportToCsv} disabled={data.length === 0}>
      <Download className="size-4 mr-2" />
      Export CSV
    </Button>
  );
}
