"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function SeoFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const status = searchParams.get("status") || "all";
  const scoreRange = searchParams.get("score") || "all";

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all" || !value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/dashboard/seo?${params.toString()}`);
  }

  function clearFilters() {
    router.push("/dashboard/seo");
  }

  const hasFilters = status !== "all" || scoreRange !== "all";

  return (
    <div className="flex flex-wrap gap-3 items-end">
      <div className="min-w-[150px]">
        <label className="text-sm font-medium mb-1.5 block">Status</label>
        <Select value={status} onValueChange={(value) => updateFilter("status", value)}>
          <SelectTrigger>
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pass">Pass</SelectItem>
            <SelectItem value="fail">Fail</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="min-w-[180px]">
        <label className="text-sm font-medium mb-1.5 block">Score Range</label>
        <Select value={scoreRange} onValueChange={(value) => updateFilter("score", value)}>
          <SelectTrigger>
            <SelectValue placeholder="All Scores" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Scores</SelectItem>
            <SelectItem value="90-100">90-100 (Excellent)</SelectItem>
            <SelectItem value="70-89">70-89 (Good)</SelectItem>
            <SelectItem value="50-69">50-69 (Needs Work)</SelectItem>
            <SelectItem value="0-49">0-49 (Poor)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {hasFilters && (
        <Button variant="outline" size="sm" onClick={clearFilters}>
          <X className="size-4 mr-1" />
          Clear
        </Button>
      )}
    </div>
  );
}
