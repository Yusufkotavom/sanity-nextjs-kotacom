"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Clock, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeleteJobButton } from "@/components/delete-job-button";
import Link from "next/link";

interface JobDetailsRowProps {
  job: {
    id: string;
    jobType: string;
    status: string;
    attempt: number;
    createdAt: Date | string;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    errorMessage?: string | null;
    payload?: any;
  };
}

export function JobDetailsRow({ job }: JobDetailsRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const duration = job.startedAt && job.completedAt
    ? Math.round((new Date(job.completedAt).getTime() - new Date(job.startedAt).getTime()) / 1000)
    : null;

  return (
    <>
      <tr className="hover:bg-muted/50">
        <td className="px-4 py-3">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 w-6 p-0"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
          </Button>
        </td>
        <td className="px-4 py-3 font-mono text-xs">{job.id.slice(0, 8)}...</td>
        <td className="px-4 py-3 font-medium">{job.jobType}</td>
        <td className="px-4 py-3">
          <Badge variant={job.status === "failed" ? "destructive" : "secondary"}>
            {job.status}
          </Badge>
        </td>
        <td className="px-4 py-3">{job.attempt}</td>
        <td className="px-4 py-3 text-sm">
          {new Intl.DateTimeFormat("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
            timeZone: "UTC",
          }).format(new Date(job.createdAt))}
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/dashboard/jobs/${job.id}`}>View</Link>
            </Button>
            <DeleteJobButton jobId={job.id} jobType={job.jobType} />
          </div>
        </td>
      </tr>
      {isExpanded && (
        <tr>
          <td colSpan={7} className="px-4 py-4 bg-muted/30">
            <div className="space-y-4">
              {/* Timeline */}
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="size-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Created:</span>
                  <span className="font-medium">
                    {new Intl.DateTimeFormat("en-US", {
                      dateStyle: "short",
                      timeStyle: "medium",
                    }).format(new Date(job.createdAt))}
                  </span>
                </div>
                {job.startedAt && (
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Started:</span>
                    <span className="font-medium">
                      {new Intl.DateTimeFormat("en-US", {
                        dateStyle: "short",
                        timeStyle: "medium",
                      }).format(new Date(job.startedAt))}
                    </span>
                  </div>
                )}
                {job.completedAt && (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="size-4 text-green-500" />
                    <span className="text-muted-foreground">Completed:</span>
                    <span className="font-medium">
                      {new Intl.DateTimeFormat("en-US", {
                        dateStyle: "short",
                        timeStyle: "medium",
                      }).format(new Date(job.completedAt))}
                    </span>
                  </div>
                )}
                {duration !== null && (
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">{duration}s</span>
                  </div>
                )}
              </div>

              {/* Error Message */}
              {job.errorMessage && (
                <div className="rounded-md bg-destructive/10 border border-destructive/20 p-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="size-4 text-destructive mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-destructive">Error Message</p>
                      <p className="text-sm text-destructive/90 mt-1">{job.errorMessage}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Payload */}
              {job.payload && (
                <div>
                  <p className="text-sm font-medium mb-2">Job Payload</p>
                  <pre className="text-xs bg-muted p-3 rounded-md overflow-auto max-h-[200px]">
                    {JSON.stringify(job.payload, null, 2)}
                  </pre>
                </div>
              )}

              {/* Full Job ID */}
              <div className="text-xs text-muted-foreground">
                <span className="font-medium">Full ID:</span> {job.id}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
