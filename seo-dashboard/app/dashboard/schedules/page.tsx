"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Play, Pause, Sparkles, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Schedule {
  id: string;
  name: string;
  taskType: string;
  scheduleType: "ai_generation" | "publishing_queue" | "keyword_pipeline";
  cronExpr: string;
  timezone: string;
  enabled: boolean;
  payload: {
    contentType?: string;
    batchSize?: number;
    keywordsPerRun?: number;
    articlesPerKeyword?: number;
    autoPublish?: boolean;
    generateOgImage?: boolean;
    publishingQueueConfig?: {
      contentType?: string;
      batchSize?: number;
    };
  };
  lastRunAt: string | null;
  nextRunAt: string | null;
  createdAt: string;
}

export default function SchedulesPage() {
  const router = useRouter();
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [contentTypeFilter, setContentTypeFilter] = useState<string>("all");

  useEffect(() => {
    fetchSchedules(contentTypeFilter);
  }, [contentTypeFilter]);

  async function fetchSchedules(contentType?: string) {
    try {
      const query =
        contentType && contentType !== "all"
          ? `?contentType=${encodeURIComponent(contentType)}`
          : "";
      const response = await fetch(`/api/ai/schedule/list${query}`);
      const data = await response.json();
      
      if (data.success) {
        setSchedules(data.schedules);
      }
    } catch (error) {
      console.error("Error fetching schedules:", error);
      toast.error("Failed to load schedules");
    } finally {
      setLoading(false);
    }
  }

  async function toggleSchedule(id: string, enabled: boolean) {
    try {
      const response = await fetch(`/api/ai/schedule/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: !enabled }),
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success(`Schedule ${!enabled ? "enabled" : "disabled"}`);
        fetchSchedules(contentTypeFilter);
      } else {
        toast.error(data.error || "Failed to update schedule");
      }
    } catch (error) {
      console.error("Error toggling schedule:", error);
      toast.error("Failed to update schedule");
    }
  }

  async function deleteSchedule(id: string, name: string) {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/ai/schedule/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success("Schedule deleted");
        fetchSchedules(contentTypeFilter);
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

  function renderScheduleTypeBadge(scheduleType: "ai_generation" | "publishing_queue" | "keyword_pipeline") {
    if (scheduleType === "ai_generation") {
      return (
        <Badge className="bg-blue-500 hover:bg-blue-600 text-white">
          <Sparkles className="w-3 h-3 mr-1" />
          AI Generation + Auto-Publish
        </Badge>
      );
    } else if (scheduleType === "publishing_queue") {
      return (
        <Badge className="bg-purple-500 hover:bg-purple-600 text-white">
          <Clock className="w-3 h-3 mr-1" />
          Publishing Queue
        </Badge>
      );
    }
    return (
      <Badge className="bg-indigo-500 hover:bg-indigo-600 text-white">
        <Sparkles className="w-3 h-3 mr-1" />
        Keyword Pipeline
      </Badge>
    );
  }

  function resolveScheduleContentType(schedule: Schedule) {
    if (schedule.scheduleType === "publishing_queue") {
      return schedule.payload?.publishingQueueConfig?.contentType || "all";
    }
    return schedule.payload?.contentType || "all";
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Content Schedules</h1>
        </div>
        <Card className="p-6">
          <p className="text-muted-foreground">Loading schedules...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Content Schedules</h1>
          <p className="text-muted-foreground mt-1">
            Manage automated content generation schedules
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-[180px]">
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
          <Button onClick={() => router.push("/dashboard/schedules/create")}>
            <Plus className="w-4 h-4 mr-2" />
            Create Schedule
          </Button>
        </div>
      </div>

      {schedules.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground mb-4">No schedules created yet</p>
          <Button onClick={() => router.push("/dashboard/schedules/create")}>
            <Plus className="w-4 h-4 mr-2" />
            Create Your First Schedule
          </Button>
        </Card>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Schedule Type</TableHead>
                <TableHead>Content Type</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Run</TableHead>
                <TableHead>Next Run</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedules.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell className="font-medium">{schedule.name}</TableCell>
                  <TableCell>
                    {renderScheduleTypeBadge(schedule.scheduleType)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {resolveScheduleContentType(schedule)}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {schedule.cronExpr}
                  </TableCell>
                  <TableCell>
                    {schedule.enabled ? (
                      <Badge className="bg-green-500">Enabled</Badge>
                    ) : (
                      <Badge variant="secondary">Disabled</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-sm">
                    {formatDate(schedule.lastRunAt)}
                  </TableCell>
                  <TableCell className="text-sm">
                    {formatDate(schedule.nextRunAt)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleSchedule(schedule.id, schedule.enabled)}
                        title={schedule.enabled ? "Disable" : "Enable"}
                      >
                        {schedule.enabled ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => router.push(`/dashboard/schedules/${schedule.id}`)}
                        title="View Details"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteSchedule(schedule.id, schedule.name)}
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
