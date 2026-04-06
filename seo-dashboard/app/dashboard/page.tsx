import { isDatabaseConfigured, db } from "@/lib/db-safe";
import { DatabaseNotConfigured, DatabaseError } from "@/components/database-error";
import { schema } from "@repo/db";
import { desc, sql } from "drizzle-orm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

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
  let aiTotal = 0;
  let submissionsTotal = 0;
  let recentJobs: any[] = [];

  try {
    const database = db();
    const [{ value: jobs }] = await database
      .select({ value: sql<number>`count(*)` })
      .from(schema.jobRuns);
    jobsTotal = jobs;
    
    const [{ value: ai }] = await database
      .select({ value: sql<number>`count(*)` })
      .from(schema.aiGenerations);
    aiTotal = ai;
    
    const [{ value: submissions }] = await database
      .select({ value: sql<number>`count(*)` })
      .from(schema.searchSubmissions);
    submissionsTotal = submissions;

    recentJobs = await database
      .select()
      .from(schema.jobRuns)
      .orderBy(desc(schema.jobRuns.createdAt))
      .limit(6);
  } catch (error) {
    return <DatabaseError title="Dashboard" error={error} />;
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Jobs</CardTitle>
            <CardDescription>All queued + processed runs</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{jobsTotal}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>AI Generations</CardTitle>
            <CardDescription>Stored outputs and retries</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{aiTotal}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Search Submits</CardTitle>
            <CardDescription>IndexNow + sitemap actions</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{submissionsTotal}</CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Recent Jobs</CardTitle>
          <CardDescription>Latest activity across queues</CardDescription>
        </CardHeader>
        <CardContent>
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
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.jobType}</TableCell>
                  <TableCell>
                    <Badge variant={job.status === "failed" ? "destructive" : "secondary"}>
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{job.attempt}</TableCell>
                  <TableCell>{formatDate(job.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
