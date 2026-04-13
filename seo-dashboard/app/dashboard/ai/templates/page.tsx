"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { TemplateDialog } from "@/components/template-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Template {
  id: string;
  name: string;
  contentType: string;
  systemPrompt: string;
  userPromptTemplate: string;
  variables: Array<{
    name: string;
    description: string;
    required: boolean;
    defaultValue?: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [contentTypeFilter, setContentTypeFilter] = useState("all");

  const loadTemplates = async (contentType?: string) => {
    try {
      const query =
        contentType && contentType !== "all"
          ? `?contentType=${encodeURIComponent(contentType)}`
          : "";
      const response = await fetch(`/api/ai/templates/list${query}`);
      const data = await response.json();
      if (data.success) {
        setTemplates(data.data);
      }
    } catch (error) {
      console.error("Failed to load templates:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTemplates(contentTypeFilter);
  }, [contentTypeFilter]);

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Delete this template? Existing schedules that reference it will fall back to default prompts.",
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`/api/ai/templates/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        loadTemplates(contentTypeFilter);
      }
    } catch (error) {
      console.error("Failed to delete template:", error);
    }
  };

  const handleEdit = (template: Template) => {
    setEditingTemplate(template);
    setDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingTemplate(null);
    setDialogOpen(true);
  };

  const handleDialogClose = (refresh?: boolean) => {
    setDialogOpen(false);
    setEditingTemplate(null);
    if (refresh) {
      loadTemplates(contentTypeFilter);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <CardTitle>Prompt Templates</CardTitle>
              <CardDescription>
                Create reusable prompt templates with variables for consistent content generation
              </CardDescription>
            </div>
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
              <div className="w-full sm:w-[180px]">
                <Select value={contentTypeFilter} onValueChange={setContentTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter content type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All content types</SelectItem>
                    <SelectItem value="post">Post</SelectItem>
                    <SelectItem value="service">Service</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleCreate} className="w-full sm:w-auto">
                <Plus className="size-4 mr-2" />
                New Template
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Loading templates...</div>
          ) : templates.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg font-medium">No templates found</p>
              <p className="text-sm mt-1">Create your first template to get started</p>
            </div>
          ) : (
            <>
            <div className="space-y-3 md:hidden">
              {templates.map((template) => (
                <div key={template.id} className="rounded-lg border p-3 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-sm">{template.name}</p>
                    <Badge variant="secondary">{template.contentType}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {template.variables.length > 0
                      ? template.variables.map((v) => v.name).join(", ")
                      : "No variables"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Created {new Date(template.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(template)} className="flex-1">
                      <Pencil className="size-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(template.id)} className="flex-1">
                      <Trash2 className="size-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Content Type</TableHead>
                  <TableHead>Variables</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {templates.map((template) => (
                  <TableRow key={template.id}>
                    <TableCell className="font-medium">{template.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{template.contentType}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {template.variables.length > 0
                        ? template.variables.map((v) => v.name).join(", ")
                        : "None"}
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(template.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(template)}
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(template.id)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </div>
            </>
          )}
        </CardContent>
      </Card>

      <TemplateDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        template={editingTemplate}
      />
    </div>
  );
}
