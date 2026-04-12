"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const provider = searchParams.get("provider") || "all";
  const type = searchParams.get("type") || "all";
  const status = searchParams.get("status") || "all";
  const [urlQuery, setUrlQuery] = useState(searchParams.get("sub_q") || "");

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

  function applyUrlFilter() {
    const params = new URLSearchParams(searchParams.toString());
    if (!urlQuery.trim()) params.delete("sub_q");
    else params.set("sub_q", urlQuery.trim());
    router.push(`/dashboard/search?${params.toString()}`);
  }

  const hasFilters =
    provider !== "all" ||
    type !== "all" ||
    status !== "all" ||
    Boolean(searchParams.get("sub_q"));

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
            <SelectItem value="indexnow">IndexNow</SelectItem>
            <SelectItem value="google_sitemap">Google Sitemap</SelectItem>
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
            <SelectItem value="indexing_manual">Manual Indexing</SelectItem>
            <SelectItem value="update">Update</SelectItem>
            <SelectItem value="sitemap_submit">Sitemap Submit</SelectItem>
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

      <div className="min-w-[240px]">
        <label className="text-sm font-medium mb-1.5 block">URL contains</label>
        <div className="flex gap-2">
          <Input
            value={urlQuery}
            onChange={(e) => setUrlQuery(e.target.value)}
            placeholder="kotacom.id/page"
          />
          <Button variant="outline" size="sm" onClick={applyUrlFilter}>
            Apply
          </Button>
        </div>
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
