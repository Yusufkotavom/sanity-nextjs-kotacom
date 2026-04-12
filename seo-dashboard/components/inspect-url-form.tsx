"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function InspectUrlForm() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!url.trim()) {
      toast.error("Please enter a URL");
      return;
    }

    try {
      new URL(url);
    } catch {
      toast.error("Invalid URL");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/search/inspect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls: [url.trim()] }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload?.ok) {
        toast.error(payload?.message || "Failed to inspect URL");
        return;
      }

      const verdict = payload?.results?.[0]?.verdict;
      toast.success(verdict ? `Inspection saved: ${verdict}` : "Inspection saved");
      router.refresh();
    } catch {
      toast.error("Network error while inspecting URL");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inspect URL</CardTitle>
        <CardDescription>Run Google URL Inspection and save the result to Index Inspections.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="inspect-url">URL to inspect</Label>
            <Input
              id="inspect-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.kotacom.id/"
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            <Search className="size-4 mr-2" />
            {loading ? "Inspecting..." : "Inspect URL"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
