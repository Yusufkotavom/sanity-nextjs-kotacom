"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, Send, ExternalLink, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { OGImagePreview } from "@/components/og-image-preview";

interface Generation {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  contentType: string;
  validationStatus: string;
  validationErrors?: string[];
  sanityWriteStatus: string;
  sanityDocumentId?: string;
  ogImageAssetId?: string;
  readyToPublish: boolean;
  provider: string;
  model: string;
  createdAt: string;
}

export default function GenerationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [generation, setGeneration] = useState<Generation | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  
  // Editable fields
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  const [readyToPublish, setReadyToPublish] = useState(false);

  useEffect(() => {
    loadGeneration();
  }, [params.id]);

  const loadGeneration = async () => {
    try {
      const response = await fetch(`/api/ai/generations/${params.id}`);
      
      if (!response.ok) {
        throw new Error("Failed to load generation");
      }

      const data = await response.json();
      setGeneration(data);
      setTitle(data.title);
      setExcerpt(data.excerpt);
      setBody(data.body);
      setReadyToPublish(data.readyToPublish || false);
    } catch (error) {
      console.error("Failed to load generation:", error);
      toast.error("Failed to load generation");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/ai/generations/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          excerpt,
          bodyContent: body,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to save");
      }

      // Also update ready status if changed
      if (readyToPublish !== generation?.readyToPublish) {
        await fetch(`/api/ai/generations/${params.id}/ready`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ readyToPublish }),
        });
      }

      toast.success("Changes saved successfully");

      // Reload to get updated data
      await loadGeneration();
    } catch (error) {
      console.error("Failed to save:", error);
      toast.error(error instanceof Error ? error.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    setPublishing(true);
    try {
      const response = await fetch(`/api/ai/generations/${params.id}/publish`, {
        method: "POST",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to publish");
      }

      const result = await response.json();

      toast.success("Content published to Sanity successfully");

      // Reload to get updated Sanity status
      await loadGeneration();
    } catch (error) {
      console.error("Failed to publish:", error);
      toast.error(error instanceof Error ? error.message : "Failed to publish");
    } finally {
      setPublishing(false);
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!generation) {
    return (
      <div className="p-8">
        <p className="text-muted-foreground">Generation not found</p>
        <Button variant="outline" className="mt-4" asChild>
          <Link href="/dashboard/ai">
            <ArrowLeft className="size-4 mr-2" />
            Back to History
          </Link>
        </Button>
      </div>
    );
  }

  const sanityStudioUrl = process.env.NEXT_PUBLIC_STUDIO_URL || "http://localhost:3333";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/ai">
            <ArrowLeft className="size-4 mr-2" />
            Back to History
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Edit Generated Content</CardTitle>
              <CardDescription>
                Review and edit before publishing to Sanity
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {generation.sanityWriteStatus === "success" && (
                <Badge variant="default">Published</Badge>
              )}
              {readyToPublish && (
                <Badge variant="secondary">Ready to Publish</Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Validation Warnings */}
          {generation.validationErrors && generation.validationErrors.length > 0 && (
            <div className="border border-yellow-500/50 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <svg className="size-5 text-yellow-600 dark:text-yellow-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                    Content Quality Warnings
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                    <p className="mb-1">The AI-generated content has some issues that were auto-fixed:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {generation.validationErrors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                      ))}
                    </ul>
                    <p className="mt-2 text-xs">
                      Please review and edit the content below before publishing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* OG Image Preview */}
          {generation.ogImageAssetId && (
            <div>
              <Label className="flex items-center gap-2">
                <ImageIcon className="size-4" />
                OG Image Preview
              </Label>
              <div className="mt-2 border rounded-lg overflow-hidden bg-muted/50 p-4">
                <div className="relative w-full max-w-2xl mx-auto">
                  <OGImagePreview assetId={generation.ogImageAssetId} alt="OG Image Preview" />
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  1200 × 630 px - Optimized for social media sharing
                </p>
              </div>
            </div>
          )}

          {/* Title */}
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Content title"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {title.length}/200 characters
            </p>
          </div>

          {/* Excerpt */}
          <div>
            <Label htmlFor="excerpt">Excerpt / Meta Description</Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief description"
              rows={3}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {excerpt.length}/300 characters
            </p>
          </div>

          {/* Body */}
          <div>
            <Label htmlFor="body">Body Content</Label>
            <Textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Full content"
              rows={15}
              className="font-mono text-sm"
            />
          </div>

          {/* Ready to Publish */}
          <div className="flex items-center gap-2 border-t pt-4">
            <input
              type="checkbox"
              id="readyToPublish"
              checked={readyToPublish}
              onChange={(e) => setReadyToPublish(e.target.checked)}
              className="cursor-pointer"
            />
            <Label htmlFor="readyToPublish" className="cursor-pointer">
              Mark as ready to publish
            </Label>
          </div>

          {/* Metadata */}
          <div className="border-t pt-4">
            <h3 className="text-sm font-medium mb-2">Generation Info</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Provider:</span>
                <span className="ml-2">{generation.provider}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Model:</span>
                <span className="ml-2">{generation.model}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Content Type:</span>
                <span className="ml-2 capitalize">{generation.contentType}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Status:</span>
                <Badge variant="secondary" className="ml-2">
                  {generation.validationStatus}
                </Badge>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 pt-4 border-t">
            <Button onClick={handleSave} disabled={saving} variant="outline">
              <Save className="size-4 mr-2" />
              {saving ? "Saving..." : "Save Changes"}
            </Button>
            
            <Button 
              onClick={handlePublish} 
              disabled={publishing || generation.validationStatus !== "valid"}
            >
              <Send className="size-4 mr-2" />
              {publishing ? "Publishing..." : generation.sanityWriteStatus === "success" ? "Republish to Sanity" : "Publish to Sanity"}
            </Button>

            {generation.sanityDocumentId && (
              <Button variant="outline" asChild>
                <a
                  href={`${sanityStudioUrl}/structure/${generation.contentType};${generation.sanityDocumentId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="size-4 mr-2" />
                  View in Sanity
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
