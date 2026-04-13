"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AiActions } from "@/components/ai-actions";
import { ReadyCheckbox } from "@/components/ready-checkbox";
import { Trash2, Send, CheckCircle } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { OGImagePreview } from "@/components/og-image-preview";

interface Generation {
  id: string;
  sourceType: string;
  contentType?: string;
  templateName?: string | null;
  provider: string;
  model: string;
  validationStatus: string;
  validationErrors?: string[] | null;
  sanityWriteStatus: string;
  ogImageAssetId: string | null;
  readyToPublish: boolean;
  createdAt: Date | string;
  generatedContent: string;
}

interface AiHistoryTableProps {
  generations: Generation[];
}

function formatDate(value: Date | string | null) {
  if (!value) return "-";
  const date = typeof value === "string" ? new Date(value) : value;
  
  // Use UTC to avoid hydration mismatch between server and client timezones
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes} UTC`;
}

export function AiHistoryTable({ generations }: AiHistoryTableProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkProcessing, setBulkProcessing] = useState(false);

  const toggleSelectAll = () => {
    if (selectedIds.size === generations.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(generations.map(g => g.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    
    if (!confirm(`Delete ${selectedIds.size} selected generations?`)) return;

    setBulkProcessing(true);
    try {
      const response = await fetch("/api/ai/generations/bulk-delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: Array.from(selectedIds) }),
      });

      if (!response.ok) throw new Error("Failed to delete");

      toast.success(`Deleted ${selectedIds.size} generations`);
      setSelectedIds(new Set());
      window.location.reload();
    } catch (error) {
      toast.error("Failed to delete generations");
    } finally {
      setBulkProcessing(false);
    }
  };

  const handleBulkPublish = async () => {
    if (selectedIds.size === 0) return;
    
    const validItems = generations.filter(g => 
      selectedIds.has(g.id) && 
      g.validationStatus === "valid" && 
      g.sanityWriteStatus !== "success"
    );
    
    if (validItems.length === 0) {
      toast.error("No valid unpublished items selected");
      return;
    }

    setBulkProcessing(true);
    toast.info(`Publishing ${validItems.length} items...`);

    let successCount = 0;
    let failCount = 0;

    for (const item of validItems) {
      try {
        const response = await fetch(`/api/ai/generations/${item.id}/publish`, {
          method: "POST",
        });

        if (response.ok) {
          successCount++;
        } else {
          failCount++;
        }
      } catch (error) {
        failCount++;
      }
    }

    setBulkProcessing(false);
    
    if (successCount > 0) {
      toast.success(`Published ${successCount} items`);
    }
    if (failCount > 0) {
      toast.error(`Failed to publish ${failCount} items`);
    }
    
    setSelectedIds(new Set());
    window.location.reload();
  };

  const handleBulkMarkReady = async () => {
    if (selectedIds.size === 0) return;

    setBulkProcessing(true);
    
    try {
      for (const id of selectedIds) {
        await fetch(`/api/ai/generations/${id}/ready`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ readyToPublish: true }),
        });
      }

      toast.success(`Marked ${selectedIds.size} items as ready`);
      setSelectedIds(new Set());
      window.location.reload();
    } catch (error) {
      toast.error("Failed to mark items as ready");
    } finally {
      setBulkProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Bulk Actions Bar */}
      {selectedIds.size > 0 && (
        <div className="border rounded-lg p-4 bg-muted/50">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">
              {selectedIds.size} item(s) selected
            </p>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleBulkMarkReady}
                disabled={bulkProcessing}
              >
                <CheckCircle className="size-4 mr-2" />
                Mark Ready
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleBulkPublish}
                disabled={bulkProcessing}
              >
                <Send className="size-4 mr-2" />
                Publish to Sanity
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={handleBulkDelete}
                disabled={bulkProcessing}
              >
                <Trash2 className="size-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedIds.size === generations.length && generations.length > 0}
                onCheckedChange={toggleSelectAll}
              />
            </TableHead>
            <TableHead>Provider</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>Template</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Validation</TableHead>
            <TableHead>Sanity</TableHead>
            <TableHead>OG Image</TableHead>
            <TableHead>Ready</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {generations.map((item) => (
            <TableRow key={item.id} className="hover:bg-muted/50">
              <TableCell>
                <Checkbox
                  checked={selectedIds.has(item.id)}
                  onCheckedChange={() => toggleSelect(item.id)}
                />
              </TableCell>
              <TableCell className="font-medium">{item.provider}</TableCell>
              <TableCell className="text-sm capitalize">{item.sourceType || "-"}</TableCell>
              <TableCell className="text-sm capitalize">{item.contentType || "-"}</TableCell>
              <TableCell className="text-sm">{item.templateName || "-"}</TableCell>
              <TableCell className="text-sm">{item.model}</TableCell>
              <TableCell>
                <div className="space-y-1">
                  <Badge variant={item.validationStatus === "invalid" ? "destructive" : "secondary"}>
                    {item.validationStatus}
                  </Badge>
                  {item.validationStatus === "invalid" &&
                    Array.isArray(item.validationErrors) &&
                    item.validationErrors.length > 0 && (
                      <p className="max-w-[240px] text-xs text-destructive line-clamp-2">
                        {item.validationErrors.join(", ")}
                      </p>
                    )}
                </div>
              </TableCell>
              <TableCell>
                <Badge 
                  variant={
                    item.sanityWriteStatus === "failed" 
                      ? "destructive" 
                      : item.sanityWriteStatus === "success"
                      ? "default"
                      : "secondary"
                  }
                >
                  {item.sanityWriteStatus}
                </Badge>
              </TableCell>
              <TableCell>
                {item.ogImageAssetId ? (
                  <div className="w-16 overflow-hidden rounded border">
                    <OGImagePreview assetId={item.ogImageAssetId} className="h-10 w-16 object-cover" />
                  </div>
                ) : (
                  <span className="text-muted-foreground text-sm">-</span>
                )}
              </TableCell>
              <TableCell>
                {item.sanityWriteStatus !== "success" ? (
                  <ReadyCheckbox 
                    generationId={item.id} 
                    initialChecked={item.readyToPublish || false} 
                  />
                ) : (
                  <span className="text-muted-foreground text-sm">-</span>
                )}
              </TableCell>
              <TableCell className="text-sm">{formatDate(item.createdAt)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {item.validationStatus === "invalid" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={async () => {
                        try {
                          const response = await fetch(`/api/ai/generations/${item.id}/retry`, {
                            method: "POST",
                          });
                          if (!response.ok) {
                            throw new Error("Retry generation failed");
                          }
                          toast.success("Generation retried");
                          window.location.reload();
                        } catch {
                          toast.error("Retry generation failed");
                        }
                      }}
                    >
                      Retry Gen
                    </Button>
                  )}
                  {item.sanityWriteStatus === "failed" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={async () => {
                        try {
                          const response = await fetch(`/api/ai/generations/${item.id}/publish`, {
                            method: "POST",
                          });
                          if (!response.ok) {
                            throw new Error("Retry publish failed");
                          }
                          toast.success("Retry publish started");
                          window.location.reload();
                        } catch {
                          toast.error("Retry publish failed");
                        }
                      }}
                    >
                      Retry Publish
                    </Button>
                  )}
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/ai/${item.id}`}>
                      Edit
                    </Link>
                  </Button>
                  <AiActions 
                    generationId={item.id} 
                    content={item.generatedContent}
                    validationStatus={item.validationStatus}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
