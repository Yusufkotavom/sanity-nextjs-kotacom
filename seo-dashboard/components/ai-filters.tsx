"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function AiFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const provider = searchParams.get("provider") || "all";
  const validation = searchParams.get("validation") || "all";
  const sanityStatus = searchParams.get("sanity") || "all";
  const sourceType = searchParams.get("source") || "all";
  const contentType = searchParams.get("contentType") || "all";

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all" || !value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/dashboard/ai?${params.toString()}`);
  }

  function clearFilters() {
    router.push("/dashboard/ai");
  }

  const hasFilters =
    provider !== "all" ||
    validation !== "all" ||
    sanityStatus !== "all" ||
    sourceType !== "all" ||
    contentType !== "all";

  return (
    <div className="flex flex-wrap gap-3 items-end">
      <div className="min-w-[150px]">
        <label className="text-sm font-medium mb-1.5 block">Provider</label>
        <Select value={provider} onValueChange={(value) => updateFilter("provider", value)}>
          <SelectTrigger>
            <SelectValue placeholder="All Providers" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Providers</SelectItem>
            <SelectItem value="gateway">AI Gateway</SelectItem>
            <SelectItem value="groq">Groq</SelectItem>
            <SelectItem value="gemini">Gemini</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="min-w-[150px]">
        <label className="text-sm font-medium mb-1.5 block">Validation</label>
        <Select value={validation} onValueChange={(value) => updateFilter("validation", value)}>
          <SelectTrigger>
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="valid">Valid</SelectItem>
            <SelectItem value="invalid">Invalid</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="min-w-[150px]">
        <label className="text-sm font-medium mb-1.5 block">Sanity Status</label>
        <Select value={sanityStatus} onValueChange={(value) => updateFilter("sanity", value)}>
          <SelectTrigger>
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="success">Success</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="min-w-[150px]">
        <label className="text-sm font-medium mb-1.5 block">Source Type</label>
        <Select value={sourceType} onValueChange={(value) => updateFilter("source", value)}>
          <SelectTrigger>
            <SelectValue placeholder="All Sources" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            <SelectItem value="manual">Manual</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="batch">Batch</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="min-w-[150px]">
        <label className="text-sm font-medium mb-1.5 block">Content Type</label>
        <Select value={contentType} onValueChange={(value) => updateFilter("contentType", value)}>
          <SelectTrigger>
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="post">Post</SelectItem>
            <SelectItem value="service">Service</SelectItem>
            <SelectItem value="product">Product</SelectItem>
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
