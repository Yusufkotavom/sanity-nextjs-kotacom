"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Copy, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface AiPreviewDialogProps {
  generationId: string;
  content: any;
  validationStatus: string;
}

export function AiPreviewDialog({ generationId, content, validationStatus }: AiPreviewDialogProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(JSON.stringify(content, null, 2));
      setCopied(true);
      toast.success("Content copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy content");
    }
  }

  // Parse content if it's a string
  let parsedContent = content;
  if (typeof content === "string") {
    try {
      parsedContent = JSON.parse(content);
    } catch {
      parsedContent = { raw: content };
    }
  }

  // Extract common fields
  const title = parsedContent?.title || parsedContent?.name || "Untitled";
  const description = parsedContent?.description || parsedContent?.excerpt || "";
  const body = parsedContent?.body || parsedContent?.content || "";
  const metadata = parsedContent?.metadata || {};

  // Word count
  const wordCount = body ? body.split(/\s+/).length : 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye className="size-4 mr-2" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Content Preview
            <Badge variant={validationStatus === "valid" ? "default" : "destructive"}>
              {validationStatus}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Review AI-generated content before publishing to Sanity
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="formatted" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="formatted">Formatted</TabsTrigger>
            <TabsTrigger value="raw">Raw JSON</TabsTrigger>
          </TabsList>

          <TabsContent value="formatted" className="space-y-4">
            {/* Title */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Title</h3>
              <p className="text-lg font-semibold">{title}</p>
            </div>

            {/* Description */}
            {description && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Description</h3>
                <p className="text-sm">{description}</p>
              </div>
            )}

            {/* Stats */}
            <div className="flex gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Word Count:</span>{" "}
                <span className="font-medium">{wordCount}</span>
              </div>
              {metadata.readingTime && (
                <div>
                  <span className="text-muted-foreground">Reading Time:</span>{" "}
                  <span className="font-medium">{metadata.readingTime}</span>
                </div>
              )}
            </div>

            {/* Body */}
            {body && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Content</h3>
                <div className="prose prose-sm max-w-none bg-muted p-4 rounded-md max-h-[400px] overflow-y-auto">
                  <div className="whitespace-pre-wrap">{body}</div>
                </div>
              </div>
            )}

            {/* Metadata */}
            {Object.keys(metadata).length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Metadata</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {Object.entries(metadata).map(([key, value]) => (
                    <div key={key} className="flex gap-2">
                      <span className="text-muted-foreground">{key}:</span>
                      <span className="font-medium">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="raw">
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                className="absolute top-2 right-2"
                onClick={copyToClipboard}
              >
                {copied ? (
                  <>
                    <CheckCircle className="size-4 mr-2" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="size-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
              <pre className="bg-muted p-4 rounded-md text-xs overflow-auto max-h-[500px] mt-2">
                {JSON.stringify(parsedContent, null, 2)}
              </pre>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
