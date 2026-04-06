import { isDatabaseConfigured, db } from "@/lib/db-safe";
import { DatabaseNotConfigured, DatabaseError } from "@/components/database-error";
import { schema } from "@repo/db";
import { desc } from "drizzle-orm";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { JobRetryButton } from "@/components/job-retry-button";

export const dynamic = 'force-dynamic';

function formatDate(value: Date | string | null) {
  if (!value) return "-";
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default async function JobsPage() {
  if (!isDatabaseConfigured()) {
    return <DatabaseNotConfigured title="Job Runs" />;
  }

  let jobs: any[] = [];
  
  try {
    jobs = await db()
      .select()
      .from(schema.jobRuns)
      .orderBy(desc(schema.jobRuns.createdAt))
      .limit(30);
  } catch (error) {
    return <DatabaseError title="Job Runs" error={error} />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Runs</CardTitle>
        <CardDescription>Queue activity, retries, and status history.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Attempt</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-medium">{job.jobType}</TableCell>
                <TableCell>
                  <Badge variant={job.status === "failed" ? "destructive" : "secondary"}>
                    {job.status}
                  </Badge>
                </TableCell>
                <TableCell>{job.attempt}</TableCell>
                <TableCell>{formatDate(job.createdAt)}</TableCell>
                <TableCell>
                  <JobRetryButton jobRunId={job.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
