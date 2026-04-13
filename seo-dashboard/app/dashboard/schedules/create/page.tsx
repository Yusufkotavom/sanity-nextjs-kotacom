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
    cronExpr: "0 9 * * *",
    timezone: "Asia/Jakarta",
    enabled: true,
    contentType: "post",
    batchSize: 5,
    autoPublish: false,
    generateOgImage: true,
    useTemplate: false,
    templateId: "",
    customPrompt: "",
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
      const payload: any = {
        contentType: formData.contentType,
        batchSize: formData.batchSize,
        autoPublish: formData.autoPublish,
        generateOgImage: formData.generateOgImage,
      };

      if (formData.useTemplate && formData.templateId) {
        payload.promptTemplateId = formData.templateId;
      } else if (formData.customPrompt) {
        payload.customPrompt = formData.customPrompt;
      }

      const response = await fetch("/api/ai/schedule/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
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
            <h2 className="text-lg font-semibold">Content Settings</h2>
            
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
                <Label htmlFor="batchSize">Batch Size</Label>
                <Input
                  id="batchSize"
                  type="number"
                  min="1"
                  max="50"
                  value={formData.batchSize}
                  onChange={(e) => setFormData({ ...formData, batchSize: parseInt(e.target.value) })}
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Number of items to generate per run (1-50)
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
          </div>

          {/* Prompt Settings */}
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
