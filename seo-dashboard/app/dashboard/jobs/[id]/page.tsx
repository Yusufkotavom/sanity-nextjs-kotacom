import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { schema } from "@repo/db";
import { eq, desc } from "drizzle-orm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

function formatDate(value: Date | string | null | undefined) {
  if (!value) return "-";
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "medium",
    timeZone: "UTC",
  }).format(date);
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [job] = await db().select().from(schema.jobRuns).where(eq(schema.jobRuns.id, id)).limit(1);
  if (!job) notFound();

  const generations = await db()
    .select({
      id: schema.aiGenerations.id,
      validationStatus: schema.aiGenerations.validationStatus,
      sanityWriteStatus: schema.aiGenerations.sanityWriteStatus,
      createdAt: schema.aiGenerations.createdAt,
    })
    .from(schema.aiGenerations)
    .where(eq(schema.aiGenerations.jobRunId, id))
    .orderBy(desc(schema.aiGenerations.createdAt))
    .limit(50);

  const durationMs =
    job.startedAt && job.finishedAt ? job.finishedAt.getTime() - job.startedAt.getTime() : null;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Job Run Detail</CardTitle>
          <CardDescription>Execution timeline, errors, and related generations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant={job.status === "failed" ? "destructive" : "secondary"}>{job.status}</Badge>
            <span className="text-sm text-muted-foreground">Type: {job.jobType}</span>
            <span className="text-sm text-muted-foreground">Attempt: {job.attempt}</span>
            {durationMs !== null && (
              <span className="text-sm text-muted-foreground">
                Duration: {(durationMs / 1000).toFixed(1)}s
              </span>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-md border p-3">
              <p className="text-xs text-muted-foreground">Created (UTC)</p>
              <p className="text-sm font-medium">{formatDate(job.createdAt)}</p>
            </div>
            <div className="rounded-md border p-3">
              <p className="text-xs text-muted-foreground">Started (UTC)</p>
              <p className="text-sm font-medium">{formatDate(job.startedAt)}</p>
            </div>
            <div className="rounded-md border p-3">
              <p className="text-xs text-muted-foreground">Finished (UTC)</p>
              <p className="text-sm font-medium">{formatDate(job.finishedAt)}</p>
            </div>
          </div>

          {job.errorMessage && (
            <div className="rounded-md border border-destructive/30 bg-destructive/5 p-3">
              <p className="text-sm font-medium text-destructive">Error</p>
              <p className="mt-1 text-sm text-destructive/90">{job.errorMessage}</p>
            </div>
          )}

          <div>
            <p className="mb-2 text-sm font-medium">Result</p>
            <pre className="max-h-[280px] overflow-auto rounded-md border p-3 text-xs">
              {JSON.stringify(job.result || {}, null, 2)}
            </pre>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium">Related AI Generations</p>
            {generations.length === 0 ? (
              <p className="text-sm text-muted-foreground">No related AI generations.</p>
            ) : (
              <div className="space-y-2">
                {generations.map((generation) => (
                  <div
                    key={generation.id}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-md border p-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs">{generation.id.slice(0, 8)}...</span>
                      <Badge variant="secondary">{generation.validationStatus}</Badge>
                      <Badge
                        variant={
                          generation.sanityWriteStatus === "failed"
                            ? "destructive"
                            : generation.sanityWriteStatus === "success"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {generation.sanityWriteStatus}
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/ai/${generation.id}`}>Open</Link>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button asChild variant="outline">
            <Link href="/dashboard/jobs">Back to Jobs</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

