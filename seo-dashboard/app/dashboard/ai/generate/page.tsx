"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, ExternalLink } from "lucide-react";

interface Template {
  id: string;
  name: string;
  contentType: string;
  variables: Array<{ name: string; description: string; required: boolean }>;
}

interface GeneratedContent {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  validationStatus: string;
  sanityDocumentId?: string;
  provider: string;
  model: string;
}

export default function GeneratePage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [contentType, setContentType] = useState<string>("post");
  const [customPrompt, setCustomPrompt] = useState<string>("");
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [generateOgImage, setGenerateOgImage] = useState(false);
  const [autoPublish, setAutoPublish] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<GeneratedContent | null>(null);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const response = await fetch("/api/ai/templates/list");
      const data = await response.json();
      if (data.success) {
        setTemplates(data.data);
      }
    } catch (error) {
      console.error("Failed to load templates:", error);
    }
  };

  const selectedTemplateData = templates.find((t) => t.id === selectedTemplate);

  const handleGenerate = async () => {
    setGenerating(true);
    setResult(null);

    try {
      const response = await fetch("/api/ai/generate-with-template", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentType,
          prompt: customPrompt || undefined,
          templateId: selectedTemplate || undefined,
          variables,
          generateOgImage,
          autoPublish,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.data);
      } else {
        alert(`Generation failed: ${data.error}`);
      }
    } catch (error) {
      alert("Generation failed");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Generate Content</CardTitle>
          <CardDescription>
            Generate AI content using templates or custom prompts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="contentType">Content Type</Label>
            <select
              id="contentType"
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="post">Post</option>
              <option value="service">Service</option>
              <option value="product">Product</option>
            </select>
          </div>

          <div>
            <Label htmlFor="template">Template (Optional)</Label>
            <select
              id="template"
              value={selectedTemplate}
              onChange={(e) => {
                setSelectedTemplate(e.target.value);
                setVariables({});
              }}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Use custom prompt</option>
              {templates
                .filter((t) => t.contentType === contentType || t.contentType === "all")
                .map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
            </select>
          </div>

          {selectedTemplateData && selectedTemplateData.variables.length > 0 && (
            <div className="space-y-3 border rounded-lg p-4 bg-muted/50">
              <Label>Template Variables</Label>
              {selectedTemplateData.variables.map((variable) => (
                <div key={variable.name}>
                  <Label htmlFor={variable.name}>
                    {variable.name}
                    {variable.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                  <Input
                    id={variable.name}
                    placeholder={variable.description}
                    value={variables[variable.name] || ""}
                    onChange={(e) =>
                      setVariables({ ...variables, [variable.name]: e.target.value })
                    }
                  />
                </div>
              ))}
            </div>
          )}

          {!selectedTemplate && (
            <div>
              <Label htmlFor="customPrompt">Custom Prompt</Label>
              <Textarea
                id="customPrompt"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Write a blog post about..."
                rows={5}
              />
            </div>
          )}

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={generateOgImage}
                onChange={(e) => setGenerateOgImage(e.target.checked)}
              />
              Generate OG Image
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={autoPublish}
                onChange={(e) => setAutoPublish(e.target.checked)}
              />
              Auto-publish to Sanity
            </label>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={generating || (!selectedTemplate && !customPrompt)}
            className="w-full"
          >
            {generating ? (
              <>
                <Loader2 className="size-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="size-4 mr-2" />
                Generate Content
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Generated Content</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant={result.validationStatus === "valid" ? "default" : "destructive"}>
                  {result.validationStatus}
                </Badge>
                {result.sanityDocumentId && (
                  <Badge variant="secondary">Published</Badge>
                )}
              </div>
            </div>
            <CardDescription>
              Generated by {result.provider} using {result.model}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Title</Label>
              <p className="text-lg font-semibold">{result.title}</p>
            </div>

            <div>
              <Label>Excerpt</Label>
              <p className="text-sm text-muted-foreground">{result.excerpt}</p>
            </div>

            <div>
              <Label>Body</Label>
              <div className="prose prose-sm max-w-none border rounded-lg p-4 bg-muted/50">
                {result.body.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            {result.sanityDocumentId && (
              <Button variant="outline" asChild>
                <a
                  href={`${process.env.NEXT_PUBLIC_STUDIO_URL}/structure/post;${result.sanityDocumentId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="size-4 mr-2" />
                  View in Sanity Studio
                </a>
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
