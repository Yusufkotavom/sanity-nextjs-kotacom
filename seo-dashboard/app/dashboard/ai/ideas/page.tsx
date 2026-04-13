"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Lightbulb, FileText, Sparkles, ArrowRight, Trash2, Loader2, Settings, Filter } from "lucide-react";
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
  const [manualIdea, setManualIdea] = useState("");
  const [bulkIdeasText, setBulkIdeasText] = useState("");

  const [ideaPrompt, setIdeaPrompt] = useState(
    `Generate {{count}} unique content ideas for {{contentType}} about: {{topic}}

For each idea, provide:
- idea: The content idea/title
- audience: Target audience for this content
- keyword: Primary SEO keyword
- wordCount: Suggested word count (e.g., "1500", "2000")
- location: If relevant, otherwise "general"

Return ONLY a JSON array.`,
  );

  const [outlinePrompt, setOutlinePrompt] = useState(
    `Create a detailed content outline for this {{contentType}}:

"{{idea}}"

Return a structured outline with:
- Main sections/headings
- Key points for each section
- Suggested word count per section
- SEO keywords to target`,
  );

  // Templates
  const [templates, setTemplates] = useState<any[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [qualityMode, setQualityMode] = useState<"economy" | "standard" | "high">("standard");
  const [providerOverride, setProviderOverride] = useState<"auto" | "gateway" | "groq" | "gemini">("auto");
  const [modelOverride, setModelOverride] = useState("");

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
          customPrompt: ideaPrompt,
          qualityMode,
          provider: providerOverride === "auto" ? undefined : providerOverride,
          model: modelOverride || undefined,
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

  const handleManualCreateIdeas = async () => {
    if (!manualIdea.trim() && !bulkIdeasText.trim()) {
      toast.error("Isi minimal satu ide manual atau bulk ideas");
      return;
    }

    setGenerating(true);
    try {
      const response = await fetch("/api/ai/ideas/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentType,
          topic,
          idea: manualIdea,
          bulkIdeas: bulkIdeasText,
          audience,
          keyword,
          wordCount,
          location,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create manual ideas");
      }

      const data = await response.json();
      toast.success(`Added ${data.createdCount} manual idea(s)`);
      setIdeas([...data.ideas, ...ideas]);
      setManualIdea("");
      setBulkIdeasText("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add manual ideas");
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
        body: JSON.stringify({
          ideaId,
          customPrompt: outlinePrompt,
          qualityMode,
          provider: providerOverride === "auto" ? undefined : providerOverride,
          model: modelOverride || undefined,
        }),
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
          qualityMode,
          provider: providerOverride === "auto" ? undefined : providerOverride,
          model: modelOverride || undefined,
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
    
    const ideaItems = ideas.filter(i => selectedIds.has(i.id) && i.status === "idea");
    if (ideaItems.length === 0) {
      toast.error("No ideas with status 'idea' selected");
      return;
    }

    setBulkProcessing(true);
    try {
      const response = await fetch("/api/ai/ideas/generate-content-bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ideaIds: ideaItems.map((item) => item.id),
          templateId: selectedTemplate,
          qualityMode,
          provider: providerOverride === "auto" ? undefined : providerOverride,
          model: modelOverride || undefined,
        }),
      });
      if (!response.ok) {
        throw new Error("Bulk generation failed");
      }
      const data = await response.json();
      toast.success(
        `Bulk generate done: ${data.summary.succeeded} success, ${data.summary.failed} failed`,
      );
      setSelectedIds(new Set());
      await loadIdeas();
    } catch (error) {
      console.error(error);
      toast.error("Bulk generate content failed");
    } finally {
      setBulkProcessing(false);
    }
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
          <Accordion type="multiple" defaultValue={["generate-ideas"]} className="space-y-4 mb-4">
            {/* Generate Ideas Section */}
            <AccordionItem value="generate-ideas" className="border rounded-lg bg-card overflow-hidden">
              <AccordionTrigger className="px-4 py-3 hover:no-underline font-medium hover:bg-muted/50 transition-colors border-b-0 data-[state=open]:border-b">
                <div className="flex items-center gap-2">
                  <Lightbulb className="size-4 text-primary" />
                  Step 1: AI Idea Generator
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 pt-4 space-y-4">
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
                    <Select
                      value={contentType}
                      onValueChange={(value) => setContentType(value as "post" | "service" | "product")}
                    >
                      <SelectTrigger id="contentType">
                        <SelectValue placeholder="Select content type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="post">Blog Post</SelectItem>
                        <SelectItem value="service">Service Page</SelectItem>
                        <SelectItem value="product">Product Page</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-end gap-4 mt-2">
                  <div className="flex-1 w-full">
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
                    className="w-full sm:w-auto"
                  >
                    <Sparkles className="size-4 mr-2" />
                    {generating ? "Generating..." : "Generate Ideas"}
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Manual Input Section */}
            <AccordionItem value="manual-input" className="border rounded-lg bg-card overflow-hidden">
              <AccordionTrigger className="px-4 py-3 hover:no-underline font-medium hover:bg-muted/50 transition-colors border-b-0 data-[state=open]:border-b">
                <div className="flex items-center gap-2">
                  <FileText className="size-4 text-primary" />
                  Manual Idea Input (Single / Bulk)
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 pt-4 space-y-4">
                <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
                  <div>
                    <Label htmlFor="manualIdea">Single Idea</Label>
                    <Input
                      id="manualIdea"
                      value={manualIdea}
                      onChange={(e) => setManualIdea(e.target.value)}
                      placeholder="Tulis 1 ide manual..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="manualTopic">Topic (optional, default for manual ideas)</Label>
                    <Input
                      id="manualTopic"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="contoh: digital marketing"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bulkIdeas">Bulk Ideas (1 line = 1 idea)</Label>
                  <Textarea
                    id="bulkIdeas"
                    value={bulkIdeasText}
                    onChange={(e) => setBulkIdeasText(e.target.value)}
                    rows={6}
                    placeholder={"Idea A\nIdea B\nIdea C"}
                  />
                </div>
                <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                  <div>
                    <Label htmlFor="manualAudience">Audience</Label>
                    <Input
                      id="manualAudience"
                      value={audience}
                      onChange={(e) => setAudience(e.target.value)}
                      placeholder="general audience"
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="manualKeyword">Keyword</Label>
                    <Input
                      id="manualKeyword"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      placeholder="keyword utama"
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="manualWordCount">Word Count</Label>
                    <Input
                      id="manualWordCount"
                      value={wordCount}
                      onChange={(e) => setWordCount(e.target.value)}
                      placeholder="1500"
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="manualLocation">Location</Label>
                    <Input
                      id="manualLocation"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="general"
                      className="text-sm"
                    />
                  </div>
                </div>
                <Button onClick={handleManualCreateIdeas} disabled={generating} className="w-full sm:w-auto">
                  {generating ? "Saving..." : "Add Manual Ideas"}
                </Button>
              </AccordionContent>
            </AccordionItem>

            {/* Template & Settings Section */}
            <AccordionItem value="settings" className="border rounded-lg bg-card overflow-hidden">
              <AccordionTrigger className="px-4 py-3 hover:no-underline font-medium hover:bg-muted/50 transition-colors border-b-0 data-[state=open]:border-b">
                <div className="flex items-center gap-2">
                  <Settings className="size-4 text-primary" />
                  Templates & Prompts Settings
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 pt-4 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="template" className="font-semibold text-base">Content Master Template</Label>
                  <p className="text-sm text-muted-foreground mb-4">Pilih template panduan struktur untuk saat men-generate konten secara utuh.</p>
                  <div className="max-w-md">
                    <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                      <SelectTrigger id="template" className="text-left w-full">
                        <SelectValue placeholder="Select a template..." />
                      </SelectTrigger>
                      <SelectContent>
                        {templates.map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name} ({template.contentType})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-3 grid-cols-1 md:grid-cols-3 pt-2">
                  <div>
                    <Label htmlFor="idea-quality-mode">Quality Mode</Label>
                    <Select
                      value={qualityMode}
                      onValueChange={(value) => setQualityMode(value as "economy" | "standard" | "high")}
                    >
                      <SelectTrigger id="idea-quality-mode">
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
                    <Label htmlFor="idea-provider-override">Provider Override</Label>
                    <Select
                      value={providerOverride}
                      onValueChange={(value) => setProviderOverride(value as "auto" | "gateway" | "groq" | "gemini")}
                    >
                      <SelectTrigger id="idea-provider-override">
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
                    <Label htmlFor="idea-model-override">Model Override (Optional)</Label>
                    <Input
                      id="idea-model-override"
                      value={modelOverride}
                      onChange={(e) => setModelOverride(e.target.value)}
                      placeholder="e.g. gpt-5.4 / gemini-2.5-pro"
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <div className="space-y-1">
                    <Label className="font-semibold text-base">Prompt Editor</Label>
                    <p className="text-xs text-muted-foreground">
                      Editable prompt for AI Idea generation and Outline generation.
                      You can use placeholders: <code>{"{{topic}}"}</code>, <code>{"{{contentType}}"}</code>,{" "}
                      <code>{"{{count}}"}</code>, <code>{"{{idea}}"}</code>.
                    </p>
                  </div>
                  <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                    <div className="flex flex-col">
                      <Label htmlFor="ideaPrompt" className="mb-2 text-sm">Generate Ideas Prompt</Label>
                      <Textarea
                        id="ideaPrompt"
                        value={ideaPrompt}
                        onChange={(e) => setIdeaPrompt(e.target.value)}
                        rows={8}
                        className="resize-y font-mono text-xs"
                      />
                    </div>
                    <div className="flex flex-col">
                      <Label htmlFor="outlinePrompt" className="mb-2 text-sm">Generate Outline Prompt</Label>
                      <Textarea
                        id="outlinePrompt"
                        value={outlinePrompt}
                        onChange={(e) => setOutlinePrompt(e.target.value)}
                        rows={8}
                        className="resize-y font-mono text-xs"
                      />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Filters Section */}
            <AccordionItem value="filters" className="border rounded-lg bg-card overflow-hidden">
              <AccordionTrigger className="px-4 py-3 hover:no-underline font-medium hover:bg-muted/50 transition-colors border-b-0 data-[state=open]:border-b">
                <div className="flex items-center gap-2">
                  <Filter className="size-4 text-primary" />
                  Search & Filters
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="filterStatus" className="block mb-2 text-sm">Status</Label>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger id="filterStatus" className="w-full">
                        <SelectValue placeholder="All Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="idea">💡 Idea Only</SelectItem>
                        <SelectItem value="outline">📝 Has Outline</SelectItem>
                        <SelectItem value="generated">✓ Generated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="filterContentType" className="block mb-2 text-sm">Content Type</Label>
                    <Select value={filterContentType} onValueChange={setFilterContentType}>
                      <SelectTrigger id="filterContentType" className="w-full">
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="post">Blog Post</SelectItem>
                        <SelectItem value="service">Service Page</SelectItem>
                        <SelectItem value="product">Product Page</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="sm:col-span-2 lg:col-span-1">
                    <Label htmlFor="searchQuery" className="block mb-2 text-sm">Search</Label>
                    <Input
                      id="searchQuery"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search ideas..."
                      className="w-full"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Bulk Actions */}
          {selectedIds.size > 0 && (
            <div className="border rounded-lg p-4 bg-muted/50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="text-sm font-medium">
                  {selectedIds.size} item(s) selected
                </p>
                <div className="flex flex-wrap items-center gap-2">
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
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                <h3 className="font-medium">Your Content Ideas</h3>
                {filteredIdeas.length > 0 && (
                  <Button variant="outline" size="sm" onClick={toggleSelectAll}>
                    {selectedIds.size === filteredIdeas.length ? "Deselect All" : "Select All"}
                  </Button>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {processingJobs.size > 0 && (
                  <Badge variant="secondary" className="animate-pulse">
                    <Loader2 className="size-3 mr-1 animate-spin" />
                    {processingJobs.size} processing
                  </Badge>
                )}
                <Button variant="outline" size="sm" onClick={loadIdeas} className="w-full sm:w-auto">
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
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-3 bg-muted/50 rounded-md">
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
                                <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:items-center">
                                  {idea.status === "idea" && !isProcessing && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleGenerateOutline(idea.id)}
                                      className="w-full sm:w-auto"
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
                                      className="w-full sm:w-auto"
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
                                      className="w-full sm:w-auto"
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
