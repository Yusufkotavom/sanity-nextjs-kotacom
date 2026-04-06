"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const provider = searchParams.get("provider") || "all";
  const type = searchParams.get("type") || "all";
  const status = searchParams.get("status") || "all";

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all" || !value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/dashboard/search?${params.toString()}`);
  }

  function clearFilters() {
    router.push("/dashboard/search");
  }

  const hasFilters = provider !== "all" || type !== "all" || status !== "all";

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
            <SelectItem value="google">Google</SelectItem>
            <SelectItem value="bing">Bing</SelectItem>
            <SelectItem value="yandex">Yandex</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="min-w-[150px]">
        <label className="text-sm font-medium mb-1.5 block">Type</label>
        <Select value={type} onValueChange={(value) => updateFilter("type", value)}>
          <SelectTrigger>
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="indexnow">IndexNow</SelectItem>
            <SelectItem value="sitemap">Sitemap</SelectItem>
            <SelectItem value="url">Single URL</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="min-w-[150px]">
        <label className="text-sm font-medium mb-1.5 block">Status</label>
        <Select value={status} onValueChange={(value) => updateFilter("status", value)}>
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

      {hasFilters && (
        <Button variant="outline" size="sm" onClick={clearFilters}>
          <X className="size-4 mr-1" />
          Clear
        </Button>
      )}
    </div>
  );
}
