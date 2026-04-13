import { isDatabaseConfigured, db } from "@/lib/db-safe";
import { DatabaseNotConfigured, DatabaseError } from "@/components/database-error";
import { schema } from "@repo/db";
import { desc, and, eq, inArray, gte, lte, sql } from "drizzle-orm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AiFilters } from "@/components/ai-filters";
import { AiHistoryTable } from "@/components/ai-history-table";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function AiPage({
  searchParams,
}: {
  searchParams: Promise<{
    provider?: string;
    validation?: string;
    sanity?: string;
    source?: string;
    contentType?: string;
    from?: string;
    to?: string;
  }>;
}) {
  if (!isDatabaseConfigured()) {
    return <DatabaseNotConfigured title="AI Generations" />;
  }

  const params = await searchParams;
  let generations: any[] = [];
  let stats = {
    total: 0,
    successRate: 0,
    avgDurationSeconds: 0,
    breakdown: { post: 0, service: 0, product: 0 } as Record<string, number>,
  };
  
  try {
    const conditions = [];
    const now = new Date();
    const defaultFrom = new Date(now);
    defaultFrom.setUTCDate(defaultFrom.getUTCDate() - 7);
    const fromDate = params.from ? new Date(params.from) : defaultFrom;
    const toDate = params.to ? new Date(params.to) : now;
    if (!Number.isNaN(fromDate.getTime()) && !Number.isNaN(toDate.getTime())) {
      conditions.push(gte(schema.aiGenerations.createdAt, fromDate));
      conditions.push(lte(schema.aiGenerations.createdAt, toDate));
    }
    
    if (params.provider && params.provider !== "all") {
      conditions.push(eq(schema.aiGenerations.provider, params.provider));
    }
    
    if (params.validation && params.validation !== "all") {
      conditions.push(eq(schema.aiGenerations.validationStatus, params.validation));
    }
    
    if (params.sanity && params.sanity !== "all") {
      conditions.push(eq(schema.aiGenerations.sanityWriteStatus, params.sanity));
    }

    const query = db()
      .select()
      .from(schema.aiGenerations)
      .orderBy(desc(schema.aiGenerations.createdAt))
      .limit(200);

    generations = conditions.length > 0
      ? await query.where(and(...conditions))
      : await query;

    if (params.source && params.source !== "all") {
      generations = generations.filter((item) => item.sourceType === params.source);
    }

    if (params.contentType && params.contentType !== "all") {
      generations = generations.filter((item) => {
        const inputJson = item.inputJson as Record<string, unknown> | null;
        return inputJson?.contentType === params.contentType;
      });
    }

    const templateIds = Array.from(
      new Set(generations.map((item) => item.templateId).filter((id): id is string => Boolean(id))),
    );
    const templatesById = new Map<string, string>();
    if (templateIds.length > 0) {
      const templates = await db()
        .select({ id: schema.promptTemplates.id, name: schema.promptTemplates.name })
        .from(schema.promptTemplates)
        .where(inArray(schema.promptTemplates.id, templateIds));
      for (const template of templates) {
        templatesById.set(template.id, template.name);
      }
    }

    generations = generations.slice(0, 50).map((item) => {
      const inputJson = item.inputJson as Record<string, unknown> | null;
      const parsedOutput = item.parsedOutput as Record<string, unknown> | null;
      
      let title = "Untitled";
      if (parsedOutput?.title) {
        title = String(parsedOutput.title);
      } else if (inputJson?.metadata && (inputJson.metadata as any).keyword) {
        title = `Keyword: ${String((inputJson.metadata as any).keyword)}`;
      } else if (inputJson?.prompt) {
        const promptStr = String(inputJson.prompt);
        title = promptStr.length > 60 ? promptStr.substring(0, 60) + "..." : promptStr;
      }
      
      return {
        ...item,
        title,
        contentType: (inputJson?.contentType as string) || "post",
        templateName: item.templateId ? templatesById.get(item.templateId) || null : null,
      };
    });

    stats.total = generations.length;
    const successCount = generations.filter((item) => item.sanityWriteStatus === "success").length;
    stats.successRate = stats.total > 0 ? (successCount / stats.total) * 100 : 0;
    for (const row of generations) {
      const type = row.contentType || "post";
      if (stats.breakdown[type] === undefined) stats.breakdown[type] = 0;
      stats.breakdown[type] += 1;
    }

    const generationIds = generations.map((item) => item.id);
    if (generationIds.length > 0) {
      const relatedRuns = await db()
        .select({
          startedAt: schema.jobRuns.startedAt,
          finishedAt: schema.jobRuns.finishedAt,
        })
        .from(schema.jobRuns)
        .innerJoin(schema.aiGenerations, eq(schema.aiGenerations.jobRunId, schema.jobRuns.id))
        .where(inArray(schema.aiGenerations.id, generationIds));

      const durations = relatedRuns
        .map((run) => {
          if (!run.startedAt || !run.finishedAt) return null;
          return (run.finishedAt.getTime() - run.startedAt.getTime()) / 1000;
        })
        .filter((value): value is number => value !== null && Number.isFinite(value) && value >= 0);

      stats.avgDurationSeconds =
        durations.length > 0
          ? durations.reduce((acc, value) => acc + value, 0) / durations.length
          : 0;
    }
  } catch (error) {
    return <DatabaseError title="AI Generations" error={error} />;
  }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>AI Generations</CardTitle>
              <CardDescription>Monitor AI content generation and validation</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild className="w-full sm:w-auto">
              <Link href="/dashboard/ai">
                <RefreshCw className="size-4 mr-2" />
                Refresh
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Generations</CardDescription>
                <CardTitle className="text-2xl">{stats.total}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Publish Success Rate</CardDescription>
                <CardTitle className="text-2xl">{stats.successRate.toFixed(1)}%</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Avg Generation Duration</CardDescription>
                <CardTitle className="text-2xl">{stats.avgDurationSeconds.toFixed(1)}s</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Content Type Breakdown</CardDescription>
                <CardTitle className="text-sm font-medium">
                  Post {stats.breakdown.post || 0} · Service {stats.breakdown.service || 0} · Product{" "}
                  {stats.breakdown.product || 0}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          <form method="GET" className="grid grid-cols-1 gap-3 rounded-md border p-3 sm:grid-cols-3 sm:items-end">
            <div>
              <label className="mb-1 block text-sm font-medium">From</label>
              <input
                type="date"
                name="from"
                defaultValue={params.from}
                className="h-9 rounded-md border px-2 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">To</label>
              <input
                type="date"
                name="to"
                defaultValue={params.to}
                className="h-9 rounded-md border px-2 text-sm"
              />
            </div>
            <Button type="submit" size="sm" variant="outline" className="w-full sm:w-auto">
              Apply Date Range
            </Button>
          </form>

          <AiFilters />
          
          {generations.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg font-medium">No AI generations found</p>
              <p className="text-sm mt-1">Try adjusting your filters or generate new content</p>
            </div>
          ) : (
            <AiHistoryTable generations={generations} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
