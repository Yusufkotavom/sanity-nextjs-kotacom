"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export function TemplatesPanel() {
  const [templateId, setTemplateId] = useState("");
  const [previewVariables, setPreviewVariables] = useState("{\n  \"city\": \"Bandung\"\n}");
  const [bulkRows, setBulkRows] = useState("[\n  { \"city\": \"Bandung\" },\n  { \"city\": \"Jakarta\" }\n]");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handlePreview() {
    setLoading(true);
    try {
      const variables = JSON.parse(previewVariables || "{}");
      const response = await fetch("/api/templates/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ template_id: templateId, variables }),
      });
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
      
      if (response.ok) {
        toast.success("Template preview generated");
      } else {
        toast.error(data?.message || "Preview failed");
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Preview failed";
      setResult(JSON.stringify({ ok: false, message: errorMsg }, null, 2));
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  }

  async function handleBulkGenerate() {
    setLoading(true);
    try {
      const rows = JSON.parse(bulkRows || "[]");
      const response = await fetch("/api/templates/bulk-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ template_id: templateId, rows }),
      });
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
      
      if (response.ok) {
        toast.success(`${rows.length} jobs queued successfully`);
      } else {
        toast.error(data?.message || "Bulk generation failed");
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Bulk failed";
      setResult(JSON.stringify({ ok: false, message: errorMsg }, null, 2));
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Template Preview</CardTitle>
            <CardDescription>Generate intermediate JSON before AI run.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="template-id">Template ID</Label>
              <Input
                id="template-id"
                value={templateId}
                onChange={(event) => setTemplateId(event.target.value)}
                placeholder="contentTemplateId"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="preview-variables">Variables (JSON)</Label>
              <Textarea
                id="preview-variables"
                value={previewVariables}
                onChange={(event) => setPreviewVariables(event.target.value)}
                rows={6}
              />
            </div>
            <Button type="button" onClick={handlePreview} disabled={loading || !templateId}>
              {loading ? "Working..." : "Preview"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bulk Generate</CardTitle>
            <CardDescription>Queue multiple rows for AI generation.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="bulk-rows">Rows (JSON array)</Label>
              <Textarea
                id="bulk-rows"
                value={bulkRows}
                onChange={(event) => setBulkRows(event.target.value)}
                rows={7}
              />
            </div>
            <Button type="button" onClick={handleBulkGenerate} disabled={loading || !templateId}>
              {loading ? "Working..." : "Queue Bulk Jobs"}
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Result</CardTitle>
          <CardDescription>Latest API response.</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="max-h-[420px] overflow-auto rounded-md bg-muted p-3 text-xs">
            {result || "No response yet."}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
