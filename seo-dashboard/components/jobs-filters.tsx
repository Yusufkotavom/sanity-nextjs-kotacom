"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function JobsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const status = searchParams.get("status") || "all";
  const jobType = searchParams.get("type") || "all";
  const search = searchParams.get("search") || "";

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all" || !value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/dashboard/jobs?${params.toString()}`);
  }

  function clearFilters() {
    router.push("/dashboard/jobs");
  }

  const hasFilters = status !== "all" || jobType !== "all" || search;

  return (
    <div className="flex flex-wrap gap-3 items-end">
      <div className="flex-1 min-w-[200px]">
        <label className="text-sm font-medium mb-1.5 block">Search Job ID</label>
        <Input
          placeholder="Search by job ID..."
          value={search}
          onChange={(e) => updateFilter("search", e.target.value)}
          className="max-w-sm"
        />
      </div>
      
      <div className="min-w-[150px]">
        <label className="text-sm font-medium mb-1.5 block">Status</label>
        <Select value={status} onValueChange={(value) => updateFilter("status", value)}>
          <SelectTrigger>
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="running">Running</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="min-w-[180px]">
        <label className="text-sm font-medium mb-1.5 block">Job Type</label>
        <Select value={jobType} onValueChange={(value) => updateFilter("type", value)}>
          <SelectTrigger>
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="ai-generate">AI Generate</SelectItem>
            <SelectItem value="seo-audit">SEO Audit</SelectItem>
            <SelectItem value="sitemap-submit">Sitemap Submit</SelectItem>
            <SelectItem value="analytics-pull">Analytics Pull</SelectItem>
            <SelectItem value="index-check">Index Check</SelectItem>
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
