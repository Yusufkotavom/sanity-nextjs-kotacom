"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Edit, Trash2, Play, Pause, Sparkles, Clock } from "lucide-react";
import { toast } from "sonner";

interface Schedule {
  id: string;
  name: string;
  taskType: string;
  scheduleType: "ai_generation" | "publishing_queue";
  cronExpr: string;
  timezone: string;
  enabled: boolean;
  payload: {
    contentType?: string;
    batchSize?: number;
    autoPublish?: boolean;
    generateOgImage?: boolean;
    promptTemplateId?: string;
    customPrompt?: string;
    ideationInput?: string;
    ideationKeywords?: string[];
    publishingQueueConfig?: {
      contentType?: string;
      batchSize: number;
    };
  };
  lastRunAt: string | null;
  nextRunAt: string | null;
  createdAt: string;
}

interface JobRun {
  id: string;
  status: string;
  startedAt: string | null;
  finishedAt: string | null;
  result: any;
  errorMessage: string | null;
  createdAt: string;
}

export default function ScheduleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [jobRuns, setJobRuns] = useState<JobRun[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    cronExpr: "",
    timezone: "UTC",
    contentType: "post",
    batchSize: 1,
    autoPublish: false,
    generateOgImage: true,
    customPrompt: "",
    ideationInput: "",
    ideationKeywords: "",
    publishingQueueContentType: "all",
    publishingQueueBatchSize: 1,
  });

  useEffect(() => {
    if (params.id) {
      fetchSchedule();
    }
  }, [params.id]);

  async function fetchSchedule() {
    try {
      const response = await fetch(`/api/ai/schedule/${params.id}`);
      const data = await response.json();
      
      if (data.success) {
        setSchedule(data.schedule);
        setJobRuns(data.recentRuns || []);
        const payload = data.schedule.payload || {};
        setEditForm({
          name: data.schedule.name || "",
          cronExpr: data.schedule.cronExpr || "",
          timezone: data.schedule.timezone || "UTC",
          contentType: payload.contentType || "post",
          batchSize: payload.batchSize || 1,
          autoPublish: Boolean(payload.autoPublish),
          generateOgImage: payload.generateOgImage !== false,
          customPrompt: payload.customPrompt || "",
          ideationInput: payload.ideationInput || "",
          ideationKeywords: Array.isArray(payload.ideationKeywords)
            ? payload.ideationKeywords.join(", ")
            : "",
          publishingQueueContentType: payload.publishingQueueConfig?.contentType || "all",
          publishingQueueBatchSize: payload.publishingQueueConfig?.batchSize || 1,
        });
      } else {
        toast.error("Schedule not found");
        router.push("/dashboard/schedules");
      }
    } catch (error) {
      console.error("Error fetching schedule:", error);
      toast.error("Failed to load schedule");
    } finally {
      setLoading(false);
    }
  }

  async function saveScheduleChanges() {
    if (!schedule) return;
    try {
      const payload =
        schedule.scheduleType === "publishing_queue"
          ? {
              publishingQueueConfig: {
                contentType:
                  editForm.publishingQueueContentType === "all"
                    ? undefined
                    : editForm.publishingQueueContentType,
                batchSize: editForm.publishingQueueBatchSize,
              },
            }
          : {
              contentType: editForm.contentType,
              batchSize: editForm.batchSize,
              autoPublish: editForm.autoPublish,
              generateOgImage: editForm.generateOgImage,
              customPrompt: editForm.customPrompt || undefined,
              ideationInput: editForm.ideationInput || undefined,
              ideationKeywords: editForm.ideationKeywords
                ? editForm.ideationKeywords
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean)
                : undefined,
            };

      const response = await fetch(`/api/ai/schedule/${schedule.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editForm.name,
          cronExpr: editForm.cronExpr,
          timezone: editForm.timezone,
          payload,
        }),
      });
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to update schedule");
      }
      toast.success("Schedule updated");
      setEditing(false);
      await fetchSchedule();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update schedule");
    }
  }

  async function toggleSchedule() {
    if (!schedule) return;

    try {
      const response = await fetch(`/api/ai/schedule/${schedule.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: !schedule.enabled }),
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success(`Schedule ${!schedule.enabled ? "enabled" : "disabled"}`);
        fetchSchedule();
      } else {
        toast.error(data.error || "Failed to update schedule");
      }
    } catch (error) {
      console.error("Error toggling schedule:", error);
      toast.error("Failed to update schedule");
    }
  }

  async function deleteSchedule() {
    if (!schedule) return;
    
    if (!confirm(`Are you sure you want to delete "${schedule.name}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/ai/schedule/${schedule.id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success("Schedule deleted");
        router.push("/dashboard/schedules");
      } else {
        toast.error(data.error || "Failed to delete schedule");
      }
    } catch (error) {
      console.error("Error deleting schedule:", error);
      toast.error("Failed to delete schedule");
    }
  }

  function formatDate(dateString: string | null) {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    });
  }

  function formatDuration(startedAt: string | null, finishedAt: string | null) {
    if (!startedAt || !finishedAt) return "N/A";
    const start = new Date(startedAt).getTime();
    const finish = new Date(finishedAt).getTime();
    const duration = (finish - start) / 1000;
    return `${duration.toFixed(1)}s`;
  }

  function renderScheduleTypeBadge(scheduleType: "ai_generation" | "publishing_queue") {
    if (scheduleType === "ai_generation") {
      return (
        <Badge className="bg-blue-500 hover:bg-blue-600 text-white">
          <Sparkles className="w-3 h-3 mr-1" />
          AI Generation + Auto-Publish
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-purple-500 hover:bg-purple-600 text-white">
          <Clock className="w-3 h-3 mr-1" />
          Publishing Queue
        </Badge>
      );
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <Card className="p-6">
          <p className="text-muted-foreground">Loading schedule...</p>
        </Card>
      </div>
    );
  }

  if (!schedule) {
    return (
      <div className="p-6">
        <Card className="p-6">
          <p className="text-muted-foreground">Schedule not found</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <Button
          variant="ghost"
          onClick={() => router.push("/dashboard/schedules")}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Schedules
        </Button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{schedule.name}</h1>
            <p className="text-muted-foreground mt-1">
              Schedule details and execution history
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setEditing((prev) => !prev)}>
              <Edit className="w-4 h-4 mr-2" />
              {editing ? "Cancel Edit" : "Edit"}
            </Button>
            <Button variant="outline" onClick={toggleSchedule}>
              {schedule.enabled ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Disable
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Enable
                </>
              )}
            </Button>
            <Button variant="destructive" onClick={deleteSchedule}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </div>

      {/* Schedule Configuration */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Configuration</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted-foreground">Schedule Type</p>
            <div className="mt-1">
              {renderScheduleTypeBadge(schedule.scheduleType)}
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <div className="mt-1">
              {schedule.enabled ? (
                <Badge className="bg-green-500">Enabled</Badge>
              ) : (
                <Badge variant="secondary">Disabled</Badge>
              )}
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Content Type</p>
            <p className="mt-1 font-medium">
              {schedule.scheduleType === "publishing_queue"
                ? schedule.payload.publishingQueueConfig?.contentType || "all"
                : schedule.payload.contentType}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Cron Expression</p>
            <p className="mt-1 font-mono text-sm">{schedule.cronExpr}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Timezone</p>
            <p className="mt-1">{schedule.timezone}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Batch Size</p>
            <p className="mt-1">
              {schedule.scheduleType === "publishing_queue"
                ? schedule.payload.publishingQueueConfig?.batchSize
                : schedule.payload.batchSize}{" "}
              items per run
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Options</p>
            <div className="mt-1 flex gap-2">
              {schedule.payload.autoPublish && (
                <Badge variant="outline">Auto-publish</Badge>
              )}
              {schedule.payload.generateOgImage && (
                <Badge variant="outline">OG Images</Badge>
              )}
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Last Run</p>
            <p className="mt-1">{formatDate(schedule.lastRunAt)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Next Run</p>
            <p className="mt-1">{formatDate(schedule.nextRunAt)}</p>
          </div>
        </div>

        {editing && (
          <div className="mt-6 border-t pt-6 space-y-4">
            <h3 className="text-base font-semibold">Edit Schedule</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={editForm.name}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="edit-timezone">Timezone</Label>
                <Input
                  id="edit-timezone"
                  value={editForm.timezone}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, timezone: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="edit-cron">Cron Expression</Label>
                <Input
                  id="edit-cron"
                  value={editForm.cronExpr}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, cronExpr: e.target.value }))}
                />
              </div>

              {schedule.scheduleType === "publishing_queue" ? (
                <>
                  <div>
                    <Label>Publishing Queue Content Type</Label>
                    <Select
                      value={editForm.publishingQueueContentType}
                      onValueChange={(value) =>
                        setEditForm((prev) => ({ ...prev, publishingQueueContentType: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All content types</SelectItem>
                        <SelectItem value="post">Blog Post</SelectItem>
                        <SelectItem value="service">Service Page</SelectItem>
                        <SelectItem value="product">Product Page</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="edit-pq-batch">Publishing Queue Batch Size</Label>
                    <Input
                      id="edit-pq-batch"
                      type="number"
                      min={1}
                      max={50}
                      value={editForm.publishingQueueBatchSize}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          publishingQueueBatchSize: Number(e.target.value) || 1,
                        }))
                      }
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Label>Content Type</Label>
                    <Select
                      value={editForm.contentType}
                      onValueChange={(value) =>
                        setEditForm((prev) => ({ ...prev, contentType: value }))
                      }
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
                    <Label htmlFor="edit-batch">Batch Size</Label>
                    <Input
                      id="edit-batch"
                      type="number"
                      min={1}
                      max={50}
                      value={editForm.batchSize}
                      onChange={(e) =>
                        setEditForm((prev) => ({ ...prev, batchSize: Number(e.target.value) || 1 }))
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="edit-custom-prompt">Custom Prompt</Label>
                    <Textarea
                      id="edit-custom-prompt"
                      rows={3}
                      value={editForm.customPrompt}
                      onChange={(e) =>
                        setEditForm((prev) => ({ ...prev, customPrompt: e.target.value }))
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="edit-ideation-input">Ideation Input</Label>
                    <Textarea
                      id="edit-ideation-input"
                      rows={2}
                      value={editForm.ideationInput}
                      onChange={(e) =>
                        setEditForm((prev) => ({ ...prev, ideationInput: e.target.value }))
                      }
                      placeholder="Context/angle for generation"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="edit-ideation-keywords">Ideation Keywords</Label>
                    <Input
                      id="edit-ideation-keywords"
                      value={editForm.ideationKeywords}
                      onChange={(e) =>
                        setEditForm((prev) => ({ ...prev, ideationKeywords: e.target.value }))
                      }
                      placeholder="keyword1, keyword2, keyword3"
                    />
                  </div>
                </>
              )}
            </div>
            <div className="flex justify-end">
              <Button onClick={saveScheduleChanges}>Save Changes</Button>
            </div>
          </div>
        )}
      </Card>

      {/* Recent Job Runs */}
      <Card>
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Recent Executions</h2>
        </div>
        {jobRuns.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">
            No executions yet
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Started</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Generated</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Error</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobRuns.map((run) => (
                <TableRow key={run.id}>
                  <TableCell>
                    {run.status === "success" ? (
                      <Badge className="bg-green-500">Success</Badge>
                    ) : run.status === "failed" ? (
                      <Badge variant="destructive">Failed</Badge>
                    ) : (
                      <Badge variant="secondary">{run.status}</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-sm">
                    {formatDate(run.startedAt)}
                  </TableCell>
                  <TableCell className="text-sm">
                    {formatDuration(run.startedAt, run.finishedAt)}
                  </TableCell>
                  <TableCell>
                    {run.result?.generated || 0}
                  </TableCell>
                  <TableCell>
                    {run.result?.published || 0}
                  </TableCell>
                  <TableCell className="text-sm text-red-500">
                    {run.errorMessage || "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}
