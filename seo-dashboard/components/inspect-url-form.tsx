"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function InspectUrlForm() {
  const router = useRouter();
  const [mode, setMode] = useState<"url" | "sitemap">("url");
  const [url, setUrl] = useState("");
  const [sitemapUrl, setSitemapUrl] = useState("https://www.kotacom.id/sitemap.xml");
  const [maxUrls, setMaxUrls] = useState("100");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (mode === "url") {
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
    } else {
      if (!sitemapUrl.trim()) {
        toast.error("Please enter a sitemap URL");
        return;
      }
      try {
        new URL(sitemapUrl);
      } catch {
        toast.error("Invalid sitemap URL");
        return;
      }
    }

    setLoading(true);
    try {
      const body =
        mode === "url"
          ? { urls: [url.trim()] }
          : {
              sitemap_url: sitemapUrl.trim(),
              max_urls: Math.max(1, Math.min(Number(maxUrls || "100"), 500)),
            };

      const response = await fetch("/api/search/inspect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload?.ok) {
        toast.error(payload?.message || "Failed to inspect URL");
        return;
      }

      if (mode === "url") {
        const verdict = payload?.results?.[0]?.verdict;
        toast.success(verdict ? `Inspection saved: ${verdict}` : "Inspection saved");
      } else {
        toast.success(`Inspected ${payload?.inspected || 0} URL(s) from sitemap`);
      }
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
        <CardDescription>Run Google URL Inspection for a single URL or an entire sitemap.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Source</Label>
            <Select
              value={mode}
              onValueChange={(value) => setMode(value as "url" | "sitemap")}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="url">Single URL</SelectItem>
                <SelectItem value="sitemap">Sitemap</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            {mode === "url" ? (
              <>
                <Label htmlFor="inspect-url">URL to inspect</Label>
                <Input
                  id="inspect-url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.kotacom.id/"
                />
              </>
            ) : (
              <>
                <Label htmlFor="inspect-sitemap">Sitemap URL</Label>
                <Input
                  id="inspect-sitemap"
                  value={sitemapUrl}
                  onChange={(e) => setSitemapUrl(e.target.value)}
                  placeholder="https://www.kotacom.id/sitemap.xml"
                />
                <div className="space-y-1">
                  <Label htmlFor="inspect-max-urls">Max URLs (1-500)</Label>
                  <Input
                    id="inspect-max-urls"
                    type="number"
                    min={1}
                    max={500}
                    value={maxUrls}
                    onChange={(e) => setMaxUrls(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            <Search className="size-4 mr-2" />
            {loading
              ? "Inspecting..."
              : mode === "url"
                ? "Inspect URL"
                : "Inspect Sitemap"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
