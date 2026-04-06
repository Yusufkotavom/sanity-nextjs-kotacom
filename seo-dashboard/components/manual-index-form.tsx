"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Send, Plus, X } from "lucide-react";

export function ManualIndexForm() {
  const [urls, setUrls] = useState<string[]>([""]);
  const [provider, setProvider] = useState<string>("google");
  const [loading, setLoading] = useState(false);

  function addUrlField() {
    setUrls([...urls, ""]);
  }

  function removeUrlField(index: number) {
    setUrls(urls.filter((_, i) => i !== index));
  }

  function updateUrl(index: number, value: string) {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    const validUrls = urls.filter(url => url.trim() !== "");
    
    if (validUrls.length === 0) {
      toast.error("Please enter at least one URL");
      return;
    }

    // Validate URLs
    const invalidUrls = validUrls.filter(url => {
      try {
        new URL(url);
        return false;
      } catch {
        return true;
      }
    });

    if (invalidUrls.length > 0) {
      toast.error(`Invalid URLs: ${invalidUrls.join(", ")}`);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/search/manual-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls: validUrls, provider }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(`${validUrls.length} URL(s) submitted to ${provider}`);
        setUrls([""]);
      } else {
        const data = await response.json().catch(() => ({}));
        toast.error(data?.message || "Failed to submit URLs");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleBulkPaste(e: React.ClipboardEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    const pastedUrls = pastedText.split("\n").filter(url => url.trim() !== "");
    
    if (pastedUrls.length > 0) {
      setUrls(pastedUrls);
      toast.success(`${pastedUrls.length} URLs pasted`);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manual Index Submission</CardTitle>
        <CardDescription>Submit URLs directly to search engines for indexing</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Search Engine</Label>
            <Select value={provider} onValueChange={setProvider}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="google">Google (IndexNow)</SelectItem>
                <SelectItem value="bing">Bing (IndexNow)</SelectItem>
                <SelectItem value="yandex">Yandex (IndexNow)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>URLs to Submit</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addUrlField}
              >
                <Plus className="size-4 mr-1" />
                Add URL
              </Button>
            </div>
            
            <div className="space-y-2">
              {urls.map((url, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={url}
                    onChange={(e) => updateUrl(index, e.target.value)}
                    placeholder="https://example.com/page"
                    className="flex-1"
                  />
                  {urls.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeUrlField(index)}
                    >
                      <X className="size-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="text-xs text-muted-foreground">
              Or paste multiple URLs (one per line):
            </div>
            <Textarea
              placeholder="https://example.com/page1&#10;https://example.com/page2&#10;https://example.com/page3"
              rows={4}
              onPaste={handleBulkPaste}
              className="font-mono text-xs"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            <Send className="size-4 mr-2" />
            {loading ? "Submitting..." : `Submit ${urls.filter(u => u.trim()).length} URL(s)`}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
