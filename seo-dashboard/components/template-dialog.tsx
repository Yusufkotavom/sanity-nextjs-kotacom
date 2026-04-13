"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Plus, X } from "lucide-react";

interface Variable {
  name: string;
  description: string;
  required: boolean;
  defaultValue?: string;
}

interface Template {
  id: string;
  name: string;
  contentType: string;
  systemPrompt: string;
  userPromptTemplate: string;
  variables: Variable[];
}

interface TemplateDialogProps {
  open: boolean;
  onClose: (refresh?: boolean) => void;
  template?: Template | null;
}

export function TemplateDialog({ open, onClose, template }: TemplateDialogProps) {
  const [name, setName] = useState("");
  const [contentType, setContentType] = useState("post");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [userPromptTemplate, setUserPromptTemplate] = useState("");
  const [variables, setVariables] = useState<Variable[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (template) {
      setName(template.name);
      setContentType(template.contentType);
      setSystemPrompt(template.systemPrompt);
      setUserPromptTemplate(template.userPromptTemplate);
      setVariables(template.variables);
    } else {
      setName("");
      setContentType("post");
      setSystemPrompt("");
      setUserPromptTemplate("");
      setVariables([]);
    }
  }, [template, open]);

  const handleAddVariable = () => {
    setVariables([
      ...variables,
      { name: "", description: "", required: false, defaultValue: "" },
    ]);
  };

  const handleRemoveVariable = (index: number) => {
    setVariables(variables.filter((_, i) => i !== index));
  };

  const handleVariableChange = (index: number, field: keyof Variable, value: any) => {
    const updated = [...variables];
    updated[index] = { ...updated[index], [field]: value };
    setVariables(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/ai/templates/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          contentType,
          systemPrompt,
          userPromptTemplate,
          variables: variables.filter((v) => v.name.trim() !== ""),
        }),
      });

      if (response.ok) {
        onClose(true);
      } else {
        const error = await response.json();
        alert(`Failed to save template: ${error.error}`);
      }
    } catch (error) {
      alert("Failed to save template");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{template ? "Edit Template" : "Create Template"}</DialogTitle>
          <DialogDescription>
            Create a reusable prompt template with variables like {`{{topic}}`} or {`{{audience}}`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Template Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="SEO Blog Template"
            />
          </div>

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
            <Label htmlFor="systemPrompt">System Prompt</Label>
            <Textarea
              id="systemPrompt"
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              placeholder="You are an expert content writer..."
              rows={3}
            />
            <p className="text-xs text-muted-foreground mt-1">Max 5000 characters</p>
          </div>

          <div>
            <Label htmlFor="userPromptTemplate">User Prompt Template</Label>
            <Textarea
              id="userPromptTemplate"
              value={userPromptTemplate}
              onChange={(e) => setUserPromptTemplate(e.target.value)}
              placeholder="Write a blog post about {{topic}} for {{audience}}..."
              rows={5}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Use {`{{variableName}}`} for variables. Max 10000 characters
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Variables</Label>
              <Button type="button" variant="outline" size="sm" onClick={handleAddVariable}>
                <Plus className="size-4 mr-1" />
                Add Variable
              </Button>
            </div>

            {variables.length === 0 ? (
              <p className="text-sm text-muted-foreground">No variables defined</p>
            ) : (
              <div className="space-y-3">
                {variables.map((variable, index) => (
                  <div key={index} className="border rounded-lg p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Variable name (e.g., topic)"
                        value={variable.name}
                        onChange={(e) => handleVariableChange(index, "name", e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveVariable(index)}
                      >
                        <X className="size-4" />
                      </Button>
                    </div>
                    <Input
                      placeholder="Description"
                      value={variable.description}
                      onChange={(e) => handleVariableChange(index, "description", e.target.value)}
                    />
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={variable.required}
                          onChange={(e) =>
                            handleVariableChange(index, "required", e.target.checked)
                          }
                        />
                        Required
                      </label>
                      <Input
                        placeholder="Default value (optional)"
                        value={variable.defaultValue || ""}
                        onChange={(e) =>
                          handleVariableChange(index, "defaultValue", e.target.value)
                        }
                        className="flex-1"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onClose()}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving || !name || !systemPrompt || !userPromptTemplate}>
            {saving ? "Saving..." : "Save Template"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
