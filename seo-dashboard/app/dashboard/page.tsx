import { isDatabaseConfigured, db } from "@/lib/db-safe";
import { DatabaseNotConfigured, DatabaseError } from "@/components/database-error";
import { schema } from "@repo/db";
import { desc, sql, eq, and, gte } from "drizzle-orm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, Briefcase, Sparkles, Search, TrendingUp } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

function formatDate(value: Date | string | null) {
  if (!value) return "-";
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default async function Page() {
  if (!isDatabaseConfigured()) {
    return <DatabaseNotConfigured title="Dashboard" />;
  }

  let jobsTotal = 0;
  let jobsToday = 0;
  let jobsFailed = 0;
  let aiTotal = 0;
  let aiToday = 0;
  let aiValid = 0;
  let submissionsTotal = 0;
  let submissionsToday = 0;
  let recentJobs: any[] = [];

  try {
    const database = db();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Jobs metrics
    const [{ value: jobs }] = await database
      .select({ value: sql<number>`count(*)` })
      .from(schema.jobRuns);
    jobsTotal = jobs;

    const [{ value: jobsTodayCount }] = await database
      .select({ value: sql<number>`count(*)` })
      .from(schema.jobRuns)
      .where(gte(schema.jobRuns.createdAt, today));
    jobsToday = jobsTodayCount;

    const [{ value: jobsFailedCount }] = await database
      .select({ value: sql<number>`count(*)` })
      .from(schema.jobRuns)
      .where(eq(schema.jobRuns.status, "failed"));
    jobsFailed = jobsFailedCount;
    
    // AI metrics
    const [{ value: ai }] = await database
      .select({ value: sql<number>`count(*)` })
      .from(schema.aiGenerations);
    aiTotal = ai;

    const [{ value: aiTodayCount }] = await database
      .select({ value: sql<number>`count(*)` })
      .from(schema.aiGenerations)
      .where(gte(schema.aiGenerations.createdAt, today));
    aiToday = aiTodayCount;

    const [{ value: aiValidCount }] = await database
      .select({ value: sql<number>`count(*)` })
      .from(schema.aiGenerations)
      .where(eq(schema.aiGenerations.validationStatus, "valid"));
    aiValid = aiValidCount;
    
    // Submissions metrics
    const [{ value: submissions }] = await database
      .select({ value: sql<number>`count(*)` })
      .from(schema.searchSubmissions);
    submissionsTotal = submissions;

    const [{ value: submissionsTodayCount }] = await database
      .select({ value: sql<number>`count(*)` })
      .from(schema.searchSubmissions)
      .where(gte(schema.searchSubmissions.submittedAt, today));
    submissionsToday = submissionsTodayCount;

    // Recent jobs
    recentJobs = await database
      .select()
      .from(schema.jobRuns)
      .orderBy(desc(schema.jobRuns.createdAt))
      .limit(8);
  } catch (error) {
    return <DatabaseError title="Dashboard" error={error} />;
  }

  const jobsSuccessRate = jobsTotal > 0 ? Math.round(((jobsTotal - jobsFailed) / jobsTotal) * 100) : 0;
  const aiValidRate = aiTotal > 0 ? Math.round((aiValid / aiTotal) * 100) : 0;

  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* Quick Actions */}
      <div className="flex gap-3">
        <Button asChild>
          <Link href="/dashboard/templates">
            <Sparkles className="size-4 mr-2" />
            Generate Content
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/dashboard/jobs">
            <Briefcase className="size-4 mr-2" />
            View Jobs
          </Link>
        </Button>
      </div>

      {/* Metrics Cards */}
      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Job Queue</CardTitle>
            <Briefcase className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{jobsTotal}</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
              <span className="flex items-center gap-1">
                {jobsToday > 0 ? (
                  <ArrowUpRight className="size-3 text-green-500" />
                ) : (
                  <ArrowDownRight className="size-3 text-gray-400" />
                )}
                {jobsToday} today
              </span>
              <span>•</span>
              <span>{jobsSuccessRate}% success</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Generations</CardTitle>
            <Sparkles className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{aiTotal}</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
              <span className="flex items-center gap-1">
                {aiToday > 0 ? (
                  <ArrowUpRight className="size-3 text-green-500" />
                ) : (
                  <ArrowDownRight className="size-3 text-gray-400" />
                )}
                {aiToday} today
              </span>
              <span>•</span>
              <span>{aiValidRate}% valid</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Search Submissions</CardTitle>
            <Search className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{submissionsTotal}</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
              <span className="flex items-center gap-1">
                {submissionsToday > 0 ? (
                  <ArrowUpRight className="size-3 text-green-500" />
                ) : (
                  <ArrowDownRight className="size-3 text-gray-400" />
                )}
                {submissionsToday} today
              </span>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest jobs across all queues</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/jobs">
                View All
                <ArrowUpRight className="size-4 ml-1" />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {recentJobs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No recent activity</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Attempt</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentJobs.map((job) => (
                  <TableRow key={job.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{job.jobType}</TableCell>
                    <TableCell>
                      <Badge variant={job.status === "failed" ? "destructive" : "secondary"}>
                        {job.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{job.attempt}</TableCell>
                    <TableCell className="text-sm">{formatDate(job.createdAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
