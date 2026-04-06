import { isDatabaseConfigured, db } from "@/lib/db-safe";
import { DatabaseNotConfigured, DatabaseError } from "@/components/database-error";
import { schema } from "@repo/db";
import { desc, and, eq, like, sql } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { JobDetailsRow } from "@/components/job-details-row";
import { JobsFilters } from "@/components/jobs-filters";
import { BulkRetryButton } from "@/components/bulk-retry-button";
import { ExportJobsButton } from "@/components/export-jobs-button";
import { SortableHeader } from "@/components/sortable-header";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; type?: string; search?: string; sort?: string; order?: string }>;
}) {
  if (!isDatabaseConfigured()) {
    return <DatabaseNotConfigured title="Job Runs" />;
  }

  const params = await searchParams;
  let jobs: any[] = [];
  let failedCount = 0;
  
  try {
    const conditions = [];
    
    if (params.status && params.status !== "all") {
      conditions.push(eq(schema.jobRuns.status, params.status));
    }
    
    if (params.type && params.type !== "all") {
      conditions.push(eq(schema.jobRuns.jobType, params.type));
    }
    
    if (params.search) {
      conditions.push(like(schema.jobRuns.id, `%${params.search}%`));
    }

    // Build order by clause
    let orderByClause;
    const sortColumn = params.sort || "createdAt";
    const sortOrder = params.order || "desc";
    
    switch (sortColumn) {
      case "status":
        orderByClause = sortOrder === "asc"
          ? schema.jobRuns.status
          : desc(schema.jobRuns.status);
        break;
      case "jobType":
        orderByClause = sortOrder === "asc"
          ? schema.jobRuns.jobType
          : desc(schema.jobRuns.jobType);
        break;
      case "attempt":
        orderByClause = sortOrder === "asc"
          ? schema.jobRuns.attempt
          : desc(schema.jobRuns.attempt);
        break;
      default:
        orderByClause = sortOrder === "asc"
          ? schema.jobRuns.createdAt
          : desc(schema.jobRuns.createdAt);
    }

    const query = db()
      .select()
      .from(schema.jobRuns)
      .orderBy(orderByClause)
      .limit(50);

    jobs = conditions.length > 0 
      ? await query.where(and(...conditions))
      : await query;

    // Get failed count for bulk retry button
    const [{ value: failed }] = await db()
      .select({ value: sql<number>`count(*)` })
      .from(schema.jobRuns)
      .where(eq(schema.jobRuns.status, "failed"));
    failedCount = failed;
  } catch (error) {
    return <DatabaseError title="Job Runs" error={error} />;
  }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Job Queue</CardTitle>
              <CardDescription>Monitor and manage background jobs</CardDescription>
            </div>
            <div className="flex gap-2">
              <ExportJobsButton jobs={jobs} />
              <BulkRetryButton failedCount={failedCount} />
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/jobs">
                  <RefreshCw className="size-4 mr-2" />
                  Refresh
                </Link>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <JobsFilters />
          
          {jobs.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg font-medium">No jobs found</p>
              <p className="text-sm mt-1">Try adjusting your filters or check back later</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px]"></TableHead>
                    <TableHead>Job ID</TableHead>
                    <TableHead>
                      <SortableHeader column="jobType" label="Type" />
                    </TableHead>
                    <TableHead>
                      <SortableHeader column="status" label="Status" />
                    </TableHead>
                    <TableHead>
                      <SortableHeader column="attempt" label="Attempt" />
                    </TableHead>
                    <TableHead>
                      <SortableHeader column="createdAt" label="Created" />
                    </TableHead>
                    <TableHead className="w-[60px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.map((job) => (
                    <JobDetailsRow key={job.id} job={job} />
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
