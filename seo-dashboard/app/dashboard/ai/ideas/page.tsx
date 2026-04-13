"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Lightbulb, FileText, Sparkles, ArrowRight, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface ContentIdea {
  id: string;
  topic: string;
  contentType: string;
  idea: string;
  outline?: string;
  generationId?: string;
  status: "idea" | "outline" | "generated";
  audience?: string;
  keyword?: string;
  wordCount?: string;
  location?: string;
  ogImageAssetId?: string | null;
  createdAt: string;
}

interface ProcessingJob {
  id: string;
  type: "outline" | "content";
  status: "processing" | "completed" | "failed";
}

export default function ContentIdeasPage() {
  const [ideas, setIdeas] = useState<ContentIdea[]>([]);
  const [filteredIdeas, setFilteredIdeas] = useState<ContentIdea[]>([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  
  // Form state
  const [topic, setTopic] = useState("");
  const [contentType, setContentType] = useState<"post" | "service" | "product">("post");
  const [ideaCount, setIdeaCount] = useState(5);
  const [audience, setAudience] = useState("");
  const [keyword, setKeyword] = useState("");
  const [wordCount, setWordCount] = useState("1500");
  const [location, setLocation] = useState("");

  // Templates
  const [templates, setTemplates] = useState<any[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");

  // Filters
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterContentType, setFilterContentType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Bulk actions
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkProcessing, setBulkProcessing] = useState(false);

  // Background processing
  const [processingJobs, setProcessingJobs] = useState<Map<string, ProcessingJob>>(new Map());

  // Debounced update
  const [updateTimeouts, setUpdateTimeouts] = useState<Map<string, NodeJS.Timeout>>(new Map());

  const handleUpdateField = (ideaId: string, field: string, value: string) => {
    // Update local state immediately
    setIdeas(prev => prev.map(idea => 
      idea.id === ideaId ? { ...idea, [field]: value } : idea
    ));

    // Clear existing timeout for this idea
    const existingTimeout = updateTimeouts.get(ideaId);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
    }

    // Set new timeout to save after 1 second of no typing
    const newTimeout = setTimeout(async () => {
      try {
        const response = await fetch(`/api/ai/ideas/${ideaId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            audience: ideas.find(i => i.id === ideaId)?.audience,
            keyword: ideas.find(i => i.id === ideaId)?.keyword,
            wordCount: ideas.find(i => i.id === ideaId)?.wordCount,
            location: ideas.find(i => i.id === ideaId)?.location,
          }),
        });

        if (!response.ok) {
          toast.error("Failed to save changes");
        }
      } catch (error) {
        console.error("Failed to update idea:", error);
        toast.error("Failed to save changes");
      }
    }, 1000);

    setUpdateTimeouts(prev => new Map(prev).set(ideaId, newTimeout));
  };

  useEffect(() => {
    loadIdeas();
    loadTemplates();
    
    // Poll for updates every 5 seconds when there are processing jobs
    const interval = setInterval(() => {
      if (processingJobs.size > 0) {
        loadIdeas();
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [processingJobs.size]);

  useEffect(() => {
    applyFilters();
  }, [ideas, filterStatus, filterContentType, searchQuery]);

  const applyFilters = () => {
    let filtered = [...ideas];

    // Filter by status
    if (filterStatus !== "all") {
      filtered = filtered.filter(idea => idea.status === filterStatus);
    }

    // Filter by content type
    if (filterContentType !== "all") {
      filtered = filtered.filter(idea => idea.contentType === filterContentType);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(idea => 
        idea.idea.toLowerCase().includes(query) ||
        idea.topic.toLowerCase().includes(query)
      );
    }

    setFilteredIdeas(filtered);
  };

  const loadIdeas = async () => {
    try {
      const response = await fetch("/api/ai/ideas/list");
      if (response.ok) {
        const data = await response.json();
        setIdeas(data.ideas || []);
      }
    } catch (error) {
      console.error("Failed to load ideas:", error);
    }
  };

  const loadTemplates = async () => {
    try {
      const response = await fetch("/api/ai/templates/list");
      if (response.ok) {
        const data = await response.json();
        setTemplates(data.data || data.templates || []);
        console.log("Loaded templates:", data.data || data.templates);
      } else {
        console.error("Failed to load templates:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Failed to load templates:", error);
    }
  };

  const handleGenerateIdeas = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic");
      return;
    }

    setGenerating(true);
    try {
      const response = await fetch("/api/ai/ideas/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          contentType,
          count: ideaCount,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate ideas");
      }

      const data = await response.json();
      toast.success(`Generated ${data.ideas.length} content ideas`);
      
      setIdeas([...data.ideas, ...ideas]);
      setTopic("");
    } catch (error) {
      console.error("Failed to generate ideas:", error);
      toast.error("Failed to generate ideas");
    } finally {
      setGenerating(false);
    }
  };

  const handleGenerateOutline = async (ideaId: string) => {
    // Add to processing jobs
    const newJob: ProcessingJob = { id: ideaId, type: "outline", status: "processing" };
    setProcessingJobs(prev => new Map(prev).set(ideaId, newJob));
    
    toast.info("Generating outline in background...", { duration: 2000 });

    try {
      const response = await fetch("/api/ai/ideas/generate-outline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ideaId }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate outline");
      }

      // Update job status
      setProcessingJobs(prev => {
        const updated = new Map(prev);
        const job = updated.get(ideaId);
        if (job) job.status = "completed";
        return updated;
      });

      toast.success("Outline generated successfully!");
      await loadIdeas();
      
      // Remove from processing after 2 seconds
      setTimeout(() => {
        setProcessingJobs(prev => {
          const updated = new Map(prev);
          updated.delete(ideaId);
          return updated;
        });
      }, 2000);
    } catch (error) {
      console.error("Failed to generate outline:", error);
      
      setProcessingJobs(prev => {
        const updated = new Map(prev);
        const job = updated.get(ideaId);
        if (job) job.status = "failed";
        return updated;
      });
      
      toast.error("Failed to generate outline");
      
      setTimeout(() => {
        setProcessingJobs(prev => {
          const updated = new Map(prev);
          updated.delete(ideaId);
          return updated;
        });
      }, 2000);
    }
  };

  const handleGenerateContent = async (ideaId: string) => {
    if (!selectedTemplate) {
      toast.error("Please select a template");
      return;
    }

    // Add to processing jobs
    const newJob: ProcessingJob = { id: ideaId, type: "content", status: "processing" };
    setProcessingJobs(prev => new Map(prev).set(ideaId, newJob));
    
    toast.info("Generating content in background...", { duration: 2000 });

    try {
      const response = await fetch("/api/ai/ideas/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ideaId,
          templateId: selectedTemplate,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate content");
      }

      const data = await response.json();
      
      setProcessingJobs(prev => {
        const updated = new Map(prev);
        const job = updated.get(ideaId);
        if (job) job.status = "completed";
        return updated;
      });

      toast.success("Content generated successfully!");
      await loadIdeas();
      
      setTimeout(() => {
        setProcessingJobs(prev => {
          const updated = new Map(prev);
          updated.delete(ideaId);
          return updated;
        });
      }, 2000);
    } catch (error) {
      console.error("Failed to generate content:", error);
      
      setProcessingJobs(prev => {
        const updated = new Map(prev);
        const job = updated.get(ideaId);
        if (job) job.status = "failed";
        return updated;
      });
      
      toast.error("Failed to generate content");
      
      setTimeout(() => {
        setProcessingJobs(prev => {
          const updated = new Map(prev);
          updated.delete(ideaId);
          return updated;
        });
      }, 2000);
    }
  };

  // Bulk actions
  const toggleSelectAll = () => {
    if (selectedIds.size === filteredIdeas.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredIdeas.map(idea => idea.id)));
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
    
    if (!confirm(`Delete ${selectedIds.size} selected ideas?`)) return;

    setBulkProcessing(true);
    try {
      const response = await fetch("/api/ai/ideas/bulk-delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: Array.from(selectedIds) }),
      });

      if (!response.ok) throw new Error("Failed to delete");

      toast.success(`Deleted ${selectedIds.size} ideas`);
      setSelectedIds(new Set());
      await loadIdeas();
    } catch (error) {
      toast.error("Failed to delete ideas");
    } finally {
      setBulkProcessing(false);
    }
  };

  const handleBulkGenerateOutline = async () => {
    if (selectedIds.size === 0) return;
    
    const ideaItems = ideas.filter(i => selectedIds.has(i.id) && i.status === "idea");
    if (ideaItems.length === 0) {
      toast.error("No ideas without outlines selected");
      return;
    }

    toast.info(`Generating ${ideaItems.length} outlines in background...`);
    
    // Process in background
    ideaItems.forEach(idea => handleGenerateOutline(idea.id));
    setSelectedIds(new Set());
  };

  const handleBulkGenerateContent = async () => {
    if (selectedIds.size === 0) return;
    if (!selectedTemplate) {
      toast.error("Please select a template first");
      return;
    }
    
    const ideaItems = ideas.filter(i => selectedIds.has(i.id) && i.status !== "generated");
    if (ideaItems.length === 0) {
      toast.error("No ideas available for content generation");
      return;
    }

    toast.info(`Generating ${ideaItems.length} contents in background...`);
    
    // Process in background
    ideaItems.forEach(idea => handleGenerateContent(idea.id));
    setSelectedIds(new Set());
  };

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Content Ideas Pipeline</CardTitle>
          <CardDescription>
            Generate content ideas, create outlines, and produce full content using AI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Generate Ideas Form */}
          <div className="border rounded-lg p-4 space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <Lightbulb className="size-4" />
              Step 1: Generate Content Ideas
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="topic">Topic or Keywords</Label>
                <Input
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., digital marketing strategies"
                />
              </div>
              
              <div>
                <Label htmlFor="contentType">Content Type</Label>
                <select
                  id="contentType"
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value as any)}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background"
                >
                  <option value="post">Blog Post</option>
                  <option value="service">Service Page</option>
                  <option value="product">Product Page</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Label htmlFor="ideaCount">Number of Ideas</Label>
                <Input
                  id="ideaCount"
                  type="number"
                  min="1"
                  max="10"
                  value={ideaCount}
                  onChange={(e) => setIdeaCount(parseInt(e.target.value) || 5)}
                />
              </div>
              
              <Button 
                onClick={handleGenerateIdeas} 
                disabled={generating}
                className="mt-6"
              >
                <Sparkles className="size-4 mr-2" />
                {generating ? "Generating..." : "Generate Ideas"}
              </Button>
            </div>
          </div>

          {/* Template Selection */}
          <div className="border rounded-lg p-4">
            <Label htmlFor="template">Template for Full Content Generation</Label>
            <select
              id="template"
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="w-full h-10 px-3 rounded-md border border-input bg-background mt-2"
            >
              <option value="">Select a template...</option>
              {templates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name} ({template.contentType})
                </option>
              ))}
            </select>
          </div>

          {/* Filters */}
          <div className="border rounded-lg p-4 space-y-4">
            <h3 className="font-medium">Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="filterStatus">Status</Label>
                <select
                  id="filterStatus"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background"
                >
                  <option value="all">All Status</option>
                  <option value="idea">💡 Idea Only</option>
                  <option value="outline">📝 Has Outline</option>
                  <option value="generated">✓ Generated</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="filterContentType">Content Type</Label>
                <select
                  id="filterContentType"
                  value={filterContentType}
                  onChange={(e) => setFilterContentType(e.target.value)}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background"
                >
                  <option value="all">All Types</option>
                  <option value="post">Blog Post</option>
                  <option value="service">Service Page</option>
                  <option value="product">Product Page</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="searchQuery">Search</Label>
                <Input
                  id="searchQuery"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search ideas..."
                />
              </div>
            </div>
          </div>

          {/* Bulk Actions */}
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
                    onClick={handleBulkGenerateOutline}
                    disabled={bulkProcessing}
                  >
                    <FileText className="size-4 mr-2" />
                    Generate Outlines
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleBulkGenerateContent}
                    disabled={bulkProcessing || !selectedTemplate}
                  >
                    <Sparkles className="size-4 mr-2" />
                    Generate Contents
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

          {/* Ideas List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h3 className="font-medium">Your Content Ideas</h3>
                {filteredIdeas.length > 0 && (
                  <Button variant="outline" size="sm" onClick={toggleSelectAll}>
                    {selectedIds.size === filteredIdeas.length ? "Deselect All" : "Select All"}
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-2">
                {processingJobs.size > 0 && (
                  <Badge variant="secondary" className="animate-pulse">
                    <Loader2 className="size-3 mr-1 animate-spin" />
                    {processingJobs.size} processing
                  </Badge>
                )}
                <Button variant="outline" size="sm" onClick={loadIdeas}>
                  Refresh
                </Button>
              </div>
            </div>
            
            {filteredIdeas.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground border rounded-lg">
                <Lightbulb className="size-12 mx-auto mb-4 opacity-50" />
                <p className="font-medium">
                  {ideas.length === 0 ? "No content ideas yet" : "No ideas match your filters"}
                </p>
                <p className="text-sm mt-1">
                  {ideas.length === 0 ? "Generate some ideas to get started" : "Try adjusting your filters"}
                </p>
              </div>
            ) : (
              <Accordion type="multiple" className="space-y-3">
                {filteredIdeas.map((idea) => {
                  const isProcessing = processingJobs.has(idea.id);
                  const job = processingJobs.get(idea.id);
                  
                  return (
                    <AccordionItem 
                      key={idea.id} 
                      value={idea.id}
                      className={`border rounded-lg ${isProcessing ? 'border-primary' : ''}`}
                    >
                      <Card className="border-0">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            {/* Checkbox */}
                            <div className="pt-2">
                              <Checkbox
                                checked={selectedIds.has(idea.id)}
                                onCheckedChange={() => toggleSelect(idea.id)}
                                disabled={isProcessing}
                              />
                            </div>

                            {/* Compact header */}
                            <div className="flex-1">
                              <AccordionTrigger className="hover:no-underline py-0">
                                <div className="flex items-start gap-3 flex-1 text-left">
                                  <div className="flex-1 space-y-2">
                                    {/* Badges */}
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <Badge variant="outline" className="capitalize text-xs">
                                        {idea.contentType}
                                      </Badge>
                                      <Badge variant={
                                        idea.status === "generated" ? "default" :
                                        idea.status === "outline" ? "secondary" : "outline"
                                      } className="text-xs">
                                        {idea.status === "generated" ? "✓ Generated" :
                                         idea.status === "outline" ? "📝 Has Outline" : "💡 Idea"}
                                      </Badge>
                                      {isProcessing && (
                                        <Badge variant="secondary" className="animate-pulse text-xs">
                                          <Loader2 className="size-3 mr-1 animate-spin" />
                                          {job?.type === "outline" ? "Generating..." : "Generating..."}
                                        </Badge>
                                      )}
                                      <span className="text-xs text-muted-foreground">
                                        {new Date(idea.createdAt).toLocaleDateString()}
                                      </span>
                                    </div>
                                    
                                    {/* Idea preview */}
                                    <p className="font-medium text-sm line-clamp-2">{idea.idea}</p>
                                  </div>
                                </div>
                              </AccordionTrigger>

                              <AccordionContent className="pt-4 space-y-3">
                                {/* Topic */}
                                <div>
                                  <p className="text-xs text-muted-foreground">Topic:</p>
                                  <p className="text-sm font-medium text-muted-foreground">{idea.topic}</p>
                                </div>
                                
                                {/* Full Idea */}
                                <div>
                                  <p className="text-xs text-muted-foreground">Full Idea:</p>
                                  <p className="font-medium text-sm">{idea.idea}</p>
                                </div>
                                
                                {/* Metadata fields - editable */}
                                <div className="grid grid-cols-2 gap-3 p-3 bg-muted/50 rounded-md">
                                  <div>
                                    <Label htmlFor={`audience-${idea.id}`} className="text-xs">Audience</Label>
                                    <Input
                                      id={`audience-${idea.id}`}
                                      value={idea.audience || ""}
                                      onChange={(e) => handleUpdateField(idea.id, "audience", e.target.value)}
                                      placeholder="e.g., small business owners"
                                      className="h-8 text-sm"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor={`keyword-${idea.id}`} className="text-xs">Keyword</Label>
                                    <Input
                                      id={`keyword-${idea.id}`}
                                      value={idea.keyword || ""}
                                      onChange={(e) => handleUpdateField(idea.id, "keyword", e.target.value)}
                                      placeholder="e.g., digital marketing"
                                      className="h-8 text-sm"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor={`wordCount-${idea.id}`} className="text-xs">Word Count</Label>
                                    <Input
                                      id={`wordCount-${idea.id}`}
                                      value={idea.wordCount || ""}
                                      onChange={(e) => handleUpdateField(idea.id, "wordCount", e.target.value)}
                                      placeholder="e.g., 1500"
                                      className="h-8 text-sm"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor={`location-${idea.id}`} className="text-xs">Location</Label>
                                    <Input
                                      id={`location-${idea.id}`}
                                      value={idea.location || ""}
                                      onChange={(e) => handleUpdateField(idea.id, "location", e.target.value)}
                                      placeholder="e.g., general"
                                      className="h-8 text-sm"
                                    />
                                  </div>
                                </div>
                                
                                {/* Outline */}
                                {idea.outline && (
                                  <div className="p-3 bg-muted rounded-md">
                                    <p className="text-xs font-medium mb-2 text-muted-foreground">Outline:</p>
                                    <pre className="text-xs whitespace-pre-wrap font-mono">{idea.outline}</pre>
                                  </div>
                                )}
                                
                                {/* OG Image Preview */}
                                {idea.status === "generated" && idea.generationId && idea.ogImageAssetId && (
                                  <div className="p-3 bg-muted rounded-md">
                                    <p className="text-xs font-medium mb-2 text-muted-foreground">OG Image Preview:</p>
                                    <Link href={`/dashboard/ai/${idea.generationId}`} className="block">
                                      <div className="relative w-full max-w-md aspect-[1200/630] bg-gradient-to-br from-gray-100 to-gray-200 rounded border flex items-center justify-center">
                                        <p className="text-sm text-muted-foreground">Click to view full content & OG image</p>
                                      </div>
                                    </Link>
                                  </div>
                                )}
                                
                                {/* Generated content link */}
                                {idea.status === "generated" && idea.generationId && (
                                  <div className="flex items-center gap-2 text-sm">
                                    <Badge variant="default" className="text-xs">Content Generated</Badge>
                                    <Link 
                                      href={`/dashboard/ai/${idea.generationId}`}
                                      className="text-primary hover:underline text-xs"
                                    >
                                      View Generated Content →
                                    </Link>
                                  </div>
                                )}

                                {/* Action buttons */}
                                <div className="flex items-center gap-2 pt-2">
                                  {idea.status === "idea" && !isProcessing && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleGenerateOutline(idea.id)}
                                    >
                                      <FileText className="size-4 mr-2" />
                                      Generate Outline
                                    </Button>
                                  )}
                                  
                                  {idea.status !== "generated" && !isProcessing && (
                                    <Button
                                      size="sm"
                                      onClick={() => handleGenerateContent(idea.id)}
                                      disabled={!selectedTemplate}
                                    >
                                      <ArrowRight className="size-4 mr-2" />
                                      Generate Content
                                    </Button>
                                  )}
                                  
                                  {idea.status === "generated" && idea.generationId && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      asChild
                                    >
                                      <Link href={`/dashboard/ai/${idea.generationId}`}>
                                        <ArrowRight className="size-4 mr-2" />
                                        View Content
                                      </Link>
                                    </Button>
                                  )}
                                </div>
                              </AccordionContent>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
