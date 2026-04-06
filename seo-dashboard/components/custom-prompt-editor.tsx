"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Save, RotateCcw, Sparkles } from "lucide-react";

interface CustomPromptEditorProps {
  templateId?: string;
  initialPrompt?: string;
  initialVariables?: Record<string, string>;
}

export function CustomPromptEditor({ 
  templateId, 
  initialPrompt = "", 
  initialVariables = {} 
}: CustomPromptEditorProps) {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [variables, setVariables] = useState(initialVariables);
  const [temperature, setTemperature] = useState("0.7");
  const [maxTokens, setMaxTokens] = useState("2000");
  const [loading, setLoading] = useState(false);

  const availableVariables = [
    "{city}", "{service}", "{category}", "{title}", "{description}",
    "{keywords}", "{target_audience}", "{tone}", "{length}"
  ];

  function insertVariable(variable: string) {
    const textarea = document.getElementById("prompt-textarea") as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newPrompt = prompt.substring(0, start) + variable + prompt.substring(end);
      setPrompt(newPrompt);
      
      // Set cursor position after inserted variable
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + variable.length, start + variable.length);
      }, 0);
    }
  }

  async function handleSave() {
    if (!prompt.trim()) {
      toast.error("Prompt cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/ai/save-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          template_id: templateId,
          prompt,
          variables,
          temperature: parseFloat(temperature),
          max_tokens: parseInt(maxTokens),
        }),
      });

      if (response.ok) {
        toast.success("Prompt saved successfully");
      } else {
        const data = await response.json().catch(() => ({}));
        toast.error(data?.message || "Failed to save prompt");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setPrompt(initialPrompt);
    setVariables(initialVariables);
    setTemperature("0.7");
    setMaxTokens("2000");
    toast.success("Prompt reset to default");
  }

  async function handleTest() {
    if (!prompt.trim()) {
      toast.error("Prompt cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/ai/test-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          variables,
          temperature: parseFloat(temperature),
          max_tokens: parseInt(maxTokens),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Test generation completed");
        // Could show result in a modal
      } else {
        const data = await response.json().catch(() => ({}));
        toast.error(data?.message || "Test failed");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const promptLength = prompt.length;
  const estimatedTokens = Math.ceil(promptLength / 4); // Rough estimate

  return (
    <Card>
      <CardHeader>
        <CardTitle>Custom AI Prompt</CardTitle>
        <CardDescription>
          Customize the AI prompt template for content generation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Variable Buttons */}
        <div>
          <Label className="mb-2 block">Insert Variables</Label>
          <div className="flex flex-wrap gap-2">
            {availableVariables.map((variable) => (
              <Button
                key={variable}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => insertVariable(variable)}
              >
                {variable}
              </Button>
            ))}
          </div>
        </div>

        {/* Prompt Editor */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label htmlFor="prompt-textarea">Prompt Template</Label>
            <div className="flex gap-2 text-xs text-muted-foreground">
              <span>{promptLength} chars</span>
              <span>•</span>
              <span>~{estimatedTokens} tokens</span>
            </div>
          </div>
          <Textarea
            id="prompt-textarea"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Write a comprehensive SEO-optimized article about {service} in {city}..."
            rows={12}
            className="font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Use variables like {"{city}"} and {"{service}"} that will be replaced with actual values
          </p>
        </div>

        {/* Settings */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="temperature">Temperature</Label>
            <Select value={temperature} onValueChange={setTemperature}>
              <SelectTrigger id="temperature">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.3">0.3 (Focused)</SelectItem>
                <SelectItem value="0.5">0.5 (Balanced)</SelectItem>
                <SelectItem value="0.7">0.7 (Creative)</SelectItem>
                <SelectItem value="0.9">0.9 (Very Creative)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="max-tokens">Max Tokens</Label>
            <Select value={maxTokens} onValueChange={setMaxTokens}>
              <SelectTrigger id="max-tokens">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1000">1,000 (~750 words)</SelectItem>
                <SelectItem value="2000">2,000 (~1,500 words)</SelectItem>
                <SelectItem value="3000">3,000 (~2,250 words)</SelectItem>
                <SelectItem value="4000">4,000 (~3,000 words)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button onClick={handleSave} disabled={loading} className="flex-1">
            <Save className="size-4 mr-2" />
            {loading ? "Saving..." : "Save Prompt"}
          </Button>
          <Button onClick={handleTest} disabled={loading} variant="outline">
            <Sparkles className="size-4 mr-2" />
            Test
          </Button>
          <Button onClick={handleReset} variant="outline">
            <RotateCcw className="size-4 mr-2" />
            Reset
          </Button>
        </div>

        {/* Info */}
        <div className="bg-muted p-3 rounded-md text-sm space-y-1">
          <p className="font-medium">Tips for better prompts:</p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Be specific about the desired output format and structure</li>
            <li>Include SEO requirements (keywords, meta descriptions, etc.)</li>
            <li>Specify tone and style (professional, casual, technical)</li>
            <li>Use variables for dynamic content personalization</li>
            <li>Test with different temperature values for optimal results</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
