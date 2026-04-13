"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

interface Template {
  id: string;
  name: string;
  contentType: string;
}

export default function CreateSchedulePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [templates, setTemplates] = useState<Template[]>([]);
  
  const [formData, setFormData] = useState({
    name: "",
    scheduleType: "ai_generation" as "ai_generation" | "publishing_queue" | "keyword_pipeline",
    cronExpr: "0 9 * * *",
    timezone: "Asia/Jakarta",
    enabled: true,
    contentType: "post",
    batchSize: 5,
    keywordsPerRun: 5,
    articlesPerKeyword: 1,
    keywordList: "",
    qualityMode: "standard" as "economy" | "standard" | "high",
    providerOverride: "auto" as "auto" | "gateway" | "groq" | "gemini",
    modelOverride: "",
    outlineQualityMode: "standard" as "economy" | "standard" | "high",
    fullQualityMode: "standard" as "economy" | "standard" | "high",
    autoPublish: false,
    generateOgImage: true,
    useTemplate: false,
    templateId: "",
    customPrompt: "",
    publishingQueueContentType: "all",
    publishingQueueBatchSize: 5,
    ideationInput: "",
    ideationKeywords: "",
  });

  useEffect(() => {
    fetchTemplates();
  }, []);

  async function fetchTemplates() {
    try {
      const response = await fetch("/api/ai/templates/list");
      const data = await response.json();
      
      if (data.success) {
        setTemplates(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      let payload: any;

      if (formData.scheduleType === "publishing_queue") {
        payload = {
          publishingQueueConfig: {
            contentType:
              formData.publishingQueueContentType === "all"
                ? undefined
                : formData.publishingQueueContentType,
            batchSize: formData.publishingQueueBatchSize,
          },
        };
      } else {
        const parsedKeywords = formData.keywordList
          ? formData.keywordList
              .split(/[\n,]/)
              .map((item) => item.trim())
              .filter(Boolean)
          : [];

        payload = {
          contentType: formData.contentType,
          batchSize:
            formData.scheduleType === "keyword_pipeline"
              ? formData.keywordsPerRun * formData.articlesPerKeyword
              : formData.batchSize,
          qualityMode: formData.qualityMode,
          provider: formData.providerOverride === "auto" ? undefined : formData.providerOverride,
          model: formData.modelOverride || undefined,
          autoPublish: formData.autoPublish,
          generateOgImage: formData.generateOgImage,
          ideationInput: formData.ideationInput || undefined,
          ideationKeywords: formData.ideationKeywords
            ? formData.ideationKeywords
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean)
            : undefined,
        };

        if (formData.scheduleType === "keyword_pipeline") {
          payload.keywords = parsedKeywords;
          payload.keywordsPerRun = formData.keywordsPerRun;
          payload.articlesPerKeyword = formData.articlesPerKeyword;
          payload.outlineQualityMode = formData.outlineQualityMode;
          payload.fullQualityMode = formData.fullQualityMode;
        }

        if (formData.useTemplate && formData.templateId) {
          payload.promptTemplateId = formData.templateId;
        } else if (formData.customPrompt) {
          payload.customPrompt = formData.customPrompt;
        }
      }

      const response = await fetch("/api/ai/schedule/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          scheduleType: formData.scheduleType,
          cronExpr: formData.cronExpr,
          timezone: formData.timezone,
          enabled: formData.enabled,
          payload,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Schedule created successfully");
        router.push("/dashboard/schedules");
      } else {
        toast.error(data.error || "Failed to create schedule");
      }
    } catch (error) {
      console.error("Error creating schedule:", error);
      toast.error("Failed to create schedule");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.push("/dashboard/schedules")}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Schedules
        </Button>
        <h1 className="text-2xl font-bold">Create Content Schedule</h1>
        <p className="text-muted-foreground mt-1">
          Set up automated content generation
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Basic Information</h2>
            
            <div>
              <Label htmlFor="name">Schedule Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Daily Blog Posts"
                required
              />
            </div>

            <div>
              <Label>Schedule Type *</Label>
              <RadioGroup
                value={formData.scheduleType}
                onValueChange={(value) => setFormData({ ...formData, scheduleType: value as "ai_generation" | "publishing_queue" | "keyword_pipeline" })}
                className="mt-2"
              >
                <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                  <RadioGroupItem value="ai_generation" id="ai_generation" />
                  <div className="space-y-1 leading-none">
                    <Label htmlFor="ai_generation" className="cursor-pointer font-medium">
                      AI Generation + Auto-Publish
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically generate new content using AI and optionally publish to Sanity
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                  <RadioGroupItem value="publishing_queue" id="publishing_queue" />
                  <div className="space-y-1 leading-none">
                    <Label htmlFor="publishing_queue" className="cursor-pointer font-medium">
                      Publishing Queue
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Publish manually-created content that's marked as "Ready to Publish"
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                  <RadioGroupItem value="keyword_pipeline" id="keyword_pipeline" />
                  <div className="space-y-1 leading-none">
                    <Label htmlFor="keyword_pipeline" className="cursor-pointer font-medium">
                      Keyword Pipeline (Outline -&gt; Full Content)
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Process keyword list in sequence. Each keyword is expanded into outline and full article.
                    </p>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cronExpr">Cron Expression</Label>
                <Input
                  id="cronExpr"
                  value={formData.cronExpr}
                  onChange={(e) => setFormData({ ...formData, cronExpr: e.target.value })}
                  placeholder="0 9 * * *"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Example: "0 9 * * *" = Every day at 9 AM
                </p>
              </div>

              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <Select
                  value={formData.timezone}
                  onValueChange={(value) => setFormData({ ...formData, timezone: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asia/Jakarta">Asia/Jakarta</SelectItem>
                    <SelectItem value="America/New_York">America/New_York</SelectItem>
                    <SelectItem value="Europe/London">Europe/London</SelectItem>
                    <SelectItem value="Asia/Tokyo">Asia/Tokyo</SelectItem>
                    <SelectItem value="Australia/Sydney">Australia/Sydney</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Content Settings */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              {formData.scheduleType === "publishing_queue"
                ? "Publishing Queue Configuration"
                : formData.scheduleType === "keyword_pipeline"
                  ? "Keyword Pipeline Configuration"
                  : "Content Settings"}
            </h2>
            
            {formData.scheduleType === "publishing_queue" ? (
              // Publishing Queue Configuration
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="publishingQueueContentType">Content Type Filter (Optional)</Label>
                    <Select
                      value={formData.publishingQueueContentType}
                      onValueChange={(value) => setFormData({ ...formData, publishingQueueContentType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All content types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All content types</SelectItem>
                        <SelectItem value="post">Blog Post</SelectItem>
                        <SelectItem value="service">Service Page</SelectItem>
                        <SelectItem value="product">Product Page</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">
                      Leave empty to publish all content types
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="publishingQueueBatchSize">Batch Size</Label>
                    <Input
                      id="publishingQueueBatchSize"
                      type="number"
                      min="1"
                      max="50"
                      value={formData.publishingQueueBatchSize}
                      onChange={(e) => setFormData({ ...formData, publishingQueueBatchSize: parseInt(e.target.value) })}
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Number of items to publish per run (1-50)
                    </p>
                  </div>
                </div>

                <div className="rounded-md bg-muted p-4">
                  <p className="text-sm text-muted-foreground">
                    This schedule will publish content marked as "Ready to Publish" in FIFO order (oldest first).
                    Only unpublished content will be selected.
                  </p>
                </div>
              </>
            ) : (
              // AI Generation Configuration
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contentType">Content Type</Label>
                    <Select
                      value={formData.contentType}
                      onValueChange={(value) => setFormData({ ...formData, contentType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="post">Blog Post</SelectItem>
                        <SelectItem value="service">Service Page</SelectItem>
                        <SelectItem value="product">Product Page</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="batchSize">
                      {formData.scheduleType === "keyword_pipeline" ? "Keywords Per Run" : "Batch Size"}
                    </Label>
                    <Input
                      id="batchSize"
                      type="number"
                      min="1"
                      max="50"
                      value={formData.scheduleType === "keyword_pipeline" ? formData.keywordsPerRun : formData.batchSize}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          ...(formData.scheduleType === "keyword_pipeline"
                            ? { keywordsPerRun: parseInt(e.target.value) || 1 }
                            : { batchSize: parseInt(e.target.value) || 1 }),
                        })
                      }
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {formData.scheduleType === "keyword_pipeline"
                        ? "How many keywords to process per run (1-20)"
                        : "Number of items to generate per run (1-50)"}
                    </p>
                  </div>
                </div>

                {formData.scheduleType === "keyword_pipeline" && (
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor="keywordList">Keyword List</Label>
                      <Textarea
                        id="keywordList"
                        value={formData.keywordList}
                        onChange={(e) => setFormData({ ...formData, keywordList: e.target.value })}
                        placeholder="jasa cetak buku, cetak kalender murah, cetak kalender 2027"
                        rows={4}
                        required
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Pisahkan dengan koma atau baris baru.
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="articlesPerKeyword">Articles Per Keyword</Label>
                      <Input
                        id="articlesPerKeyword"
                        type="number"
                        min="1"
                        max="10"
                        value={formData.articlesPerKeyword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            articlesPerKeyword: parseInt(e.target.value) || 1,
                          })
                        }
                        required
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Default 1. Bisa dinaikkan jadi 2+ untuk variasi per keyword.
                      </p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="qualityMode">Quality Mode</Label>
                    <Select
                      value={formData.qualityMode}
                      onValueChange={(value) =>
                        setFormData({ ...formData, qualityMode: value as "economy" | "standard" | "high" })
                      }
                    >
                      <SelectTrigger id="qualityMode">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="economy">Economy</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="high">High Quality</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="providerOverride">Provider Override</Label>
                    <Select
                      value={formData.providerOverride}
                      onValueChange={(value) =>
                        setFormData({ ...formData, providerOverride: value as "auto" | "gateway" | "groq" | "gemini" })
                      }
                    >
                      <SelectTrigger id="providerOverride">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Auto (from settings)</SelectItem>
                        <SelectItem value="gateway">Gateway</SelectItem>
                        <SelectItem value="groq">Groq</SelectItem>
                        <SelectItem value="gemini">Gemini</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="modelOverride">Model Override (Optional)</Label>
                    <Input
                      id="modelOverride"
                      value={formData.modelOverride}
                      onChange={(e) => setFormData({ ...formData, modelOverride: e.target.value })}
                      placeholder="e.g. gpt-5.4 / gemini-2.5-pro"
                    />
                  </div>
                </div>

                {formData.scheduleType === "keyword_pipeline" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="outlineQualityMode">Outline Quality Mode</Label>
                      <Select
                        value={formData.outlineQualityMode}
                        onValueChange={(value) =>
                          setFormData({
                            ...formData,
                            outlineQualityMode: value as "economy" | "standard" | "high",
                          })
                        }
                      >
                        <SelectTrigger id="outlineQualityMode">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="economy">Economy</SelectItem>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="high">High Quality</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="fullQualityMode">Full Content Quality Mode</Label>
                      <Select
                        value={formData.fullQualityMode}
                        onValueChange={(value) =>
                          setFormData({
                            ...formData,
                            fullQualityMode: value as "economy" | "standard" | "high",
                          })
                        }
                      >
                        <SelectTrigger id="fullQualityMode">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="economy">Economy</SelectItem>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="high">High Quality</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="ideationInput">Ideation Input (Optional)</Label>
                    <Textarea
                      id="ideationInput"
                      value={formData.ideationInput}
                      onChange={(e) => setFormData({ ...formData, ideationInput: e.target.value })}
                      placeholder="Context, angle, or target intent for generated content..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="ideationKeywords">Ideation Keywords (Optional)</Label>
                    <Input
                      id="ideationKeywords"
                      value={formData.ideationKeywords}
                      onChange={(e) => setFormData({ ...formData, ideationKeywords: e.target.value })}
                      placeholder="seo dashboard, technical seo, index coverage"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Separate multiple keywords with commas.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="autoPublish"
                      checked={formData.autoPublish}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, autoPublish: checked as boolean })
                      }
                    />
                    <Label htmlFor="autoPublish" className="cursor-pointer">
                      Auto-publish to Sanity
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="generateOgImage"
                      checked={formData.generateOgImage}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, generateOgImage: checked as boolean })
                      }
                    />
                    <Label htmlFor="generateOgImage" className="cursor-pointer">
                      Generate OG images
                    </Label>
                  </div>
                </div>
              </>
            )}

            <div className="flex items-center space-x-2">
              <Checkbox
                id="enabled"
                checked={formData.enabled}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, enabled: checked as boolean })
                }
              />
              <Label htmlFor="enabled" className="cursor-pointer">
                Enable schedule immediately
              </Label>
            </div>
          </div>

          {/* Prompt Settings - Only for AI Generation */}
          {(formData.scheduleType === "ai_generation" || formData.scheduleType === "keyword_pipeline") && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Prompt Settings</h2>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="useTemplate"
                  checked={formData.useTemplate}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, useTemplate: checked as boolean })
                  }
                />
                <Label htmlFor="useTemplate" className="cursor-pointer">
                  Use prompt template
                </Label>
              </div>

              {formData.useTemplate ? (
                <div>
                  <Label htmlFor="templateId">Select Template</Label>
                  <Select
                    value={formData.templateId}
                    onValueChange={(value) => setFormData({ ...formData, templateId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a template" />
                    </SelectTrigger>
                    <SelectContent>
                      {templates
                        .filter(t => t.contentType === formData.contentType || t.contentType === "all")
                        .map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <div>
                  <Label htmlFor="customPrompt">Custom Prompt (Optional)</Label>
                  <Textarea
                    id="customPrompt"
                    value={formData.customPrompt}
                    onChange={(e) => setFormData({ ...formData, customPrompt: e.target.value })}
                    placeholder="Leave empty to use default prompts from AI Writer Settings"
                    rows={4}
                  />
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard/schedules")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Schedule"}
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}
