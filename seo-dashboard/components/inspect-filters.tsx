"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function InspectFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const verdict = searchParams.get("inspect_verdict") || "all";
  const indexingState = searchParams.get("inspect_state") || "all";
  const [query, setQuery] = useState(searchParams.get("inspect_q") || "");

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all" || !value) params.delete(key);
    else params.set(key, value);
    router.push(`/dashboard/search?${params.toString()}`);
  }

  function applyQuery() {
    const params = new URLSearchParams(searchParams.toString());
    if (!query.trim()) params.delete("inspect_q");
    else params.set("inspect_q", query.trim());
    router.push(`/dashboard/search?${params.toString()}`);
  }

  function clearFilters() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("inspect_verdict");
    params.delete("inspect_state");
    params.delete("inspect_q");
    router.push(`/dashboard/search?${params.toString()}`);
  }

  const hasFilters =
    verdict !== "all" ||
    indexingState !== "all" ||
    Boolean(searchParams.get("inspect_q"));

  return (
    <div className="flex flex-wrap gap-3 items-end">
      <div className="min-w-[160px]">
        <label className="text-sm font-medium mb-1.5 block">Verdict</label>
        <Select value={verdict} onValueChange={(value) => updateFilter("inspect_verdict", value)}>
          <SelectTrigger>
            <SelectValue placeholder="All Verdicts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Verdicts</SelectItem>
            <SelectItem value="PASS">PASS</SelectItem>
            <SelectItem value="FAIL">FAIL</SelectItem>
            <SelectItem value="NEUTRAL">NEUTRAL</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="min-w-[180px]">
        <label className="text-sm font-medium mb-1.5 block">Indexing State</label>
        <Select value={indexingState} onValueChange={(value) => updateFilter("inspect_state", value)}>
          <SelectTrigger>
            <SelectValue placeholder="All States" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All States</SelectItem>
            <SelectItem value="INDEXING_ALLOWED">INDEXING_ALLOWED</SelectItem>
            <SelectItem value="BLOCKED_BY_NOINDEX">BLOCKED_BY_NOINDEX</SelectItem>
            <SelectItem value="BLOCKED_BY_ROBOTS_TXT">BLOCKED_BY_ROBOTS_TXT</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="min-w-[240px]">
        <label className="text-sm font-medium mb-1.5 block">URL contains</label>
        <div className="flex gap-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="kotacom.id/page"
          />
          <Button variant="outline" size="sm" onClick={applyQuery}>
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
