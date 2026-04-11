import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { schema } from "@repo/db";
import { and, lte, eq, gte } from "drizzle-orm";
import { drain, QUEUES } from "@/lib/queue";
import { updateJobRun, createJobRun } from "@/lib/jobs";
import { auditHtml } from "@repo/seo";
import { submitIndexNow, submitSitemap, fetchSearchAnalytics, inspectUrl } from "@repo/search";
import { desc, inArray } from "drizzle-orm";

function requireCronSecret(request: NextRequest) {
  const expected = process.env.CRON_SECRET || "";
  const provided = request.headers.get("x-cron-secret") || "";
  return Boolean(expected && provided && expected === provided);
}

async function processAiJob(jobId: string, payload: any) {
  const { generateAiText } = await import("@/lib/ai-writer/generate");
  await updateJobRun(jobId, { status: "processing", startedAt: new Date() });
  const result = await generateAiText({
    prompt: payload.prompt,
    system: payload.system,
    model: payload.model,
    provider: payload.provider,
    userId: payload.userId || "cron-worker",
    tags: payload.tags || [],
  });

  await db().insert(schema.aiGenerations).values({
    sourceType: payload.sourceType || "scheduled",
    inputJson: payload,
    provider: result.providerMode === "gateway" ? "gateway" : result.providerMode === "direct-groq" ? "groq" : "gemini",
    model: result.model,
    rawOutput: result.text,
    validationStatus: "valid",
    sanityWriteStatus: "pending",
  });

  await updateJobRun(jobId, {
    status: "success",
    result: { provider: result.providerMode, model: result.model },
    finishedAt: new Date(),
  });
}

async function processSeoJob(jobId: string, payload: any) {
  await updateJobRun(jobId, { status: "processing", startedAt: new Date() });
  const response = await fetch(payload.url, { method: "GET" });
  const html = await response.text();
  const audit = auditHtml(html);

  await db().insert(schema.seoAudits).values({
    contentItemId: payload.contentItemId || null,
    score: audit.score,
    status: audit.status,
    issues: audit.issues,
    checkedAt: new Date(),
  });

  await updateJobRun(jobId, { status: "success", finishedAt: new Date() });
}

async function processSearchJob(jobId: string, payload: any) {
  await updateJobRun(jobId, { status: "processing", startedAt: new Date() });

  const endpoint = process.env.INDEXNOW_ENDPOINT || "https://api.indexnow.org/indexnow";
  const result = await submitIndexNow(endpoint, {
    host: payload.host,
    key: payload.key,
    keyLocation: payload.keyLocation,
    urlList: payload.urls || [],
  });

  await db().insert(schema.searchSubmissions).values({
    contentItemId: payload.contentItemId || null,
    provider: "indexnow",
    submissionType: payload.submissionType || "update",
    requestPayload: payload,
    responsePayload: { body: result.body },
    httpStatus: result.status,
    status: result.ok ? "success" : "failed",
    submittedAt: new Date(),
  });

  await updateJobRun(jobId, { status: result.ok ? "success" : "failed", finishedAt: new Date() });
}

async function processQueue(queue: string) {
  const items = await drain(queue, 10);
  for (const item of items) {
    if (!item || typeof item !== "object") continue;
    const payload = item as any;
    const jobId = payload.jobRunId;
    const jobType = payload.jobType;
    if (!jobId || !jobType) continue;

    try {
      if (jobType === "ai_generate") await processAiJob(jobId, payload.payload || {});
      else if (jobType === "seo_audit") await processSeoJob(jobId, payload.payload || {});
      else await processSearchJob(jobId, payload.payload || {});
    } catch (error) {
      await updateJobRun(jobId, {
        status: "failed",
        errorMessage: error instanceof Error ? error.message : "job failed",
        finishedAt: new Date(),
      });
    }
  }
}

async function runScheduledTasks() {
  const database = db();
  const now = new Date();
  const tasks = await database
    .select()
    .from(schema.scheduledTasks)
    .where(and(eq(schema.scheduledTasks.enabled, true), lte(schema.scheduledTasks.nextRunAt, now)));

  for (const task of tasks) {
    const job = await createJobRun({
      taskId: task.id,
      jobType: task.taskType,
      payload: task.payload,
    });

    const queue = task.taskType === "ai_generate" ? QUEUES.ai : task.taskType === "seo_audit" ? QUEUES.seo : QUEUES.search;
    await enqueueJob(queue, job.id, task.taskType, task.payload);

    await database
      .update(schema.scheduledTasks)
      .set({ lastRunAt: now })
      .where(eq(schema.scheduledTasks.id, task.id));
  }
}

async function enqueueJob(queue: string, jobRunId: string, jobType: string, payload: any) {
  const { enqueue } = await import("@/lib/queue");
  await enqueue(queue, { jobRunId, jobType, payload });
}

export async function POST(request: NextRequest) {
  if (!requireCronSecret(request)) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as { type?: string };
  const type = body.type || "drain-queues";

  if (type === "run-scheduled") {
    await runScheduledTasks();
  }

  if (type === "drain-queues") {
    await processQueue(QUEUES.ai);
    await processQueue(QUEUES.seo);
    await processQueue(QUEUES.search);
  }

  if (type === "run-seo-audits") {
    const since = new Date();
    since.setUTCDate(since.getUTCDate() - 1);
    const items = await db()
      .select({ id: schema.contentItems.id, url: schema.contentItems.url })
      .from(schema.contentItems)
      .where(gte(schema.contentItems.updatedAt, since))
      .limit(50);

    for (const item of items) {
      const job = await createJobRun({
        jobType: "seo_audit",
        payload: { url: item.url, contentItemId: item.id },
      });
      await enqueueJob(QUEUES.seo, job.id, "seo_audit", {
        url: item.url,
        contentItemId: item.id,
      });
    }
  }

  if (type === "submit-sitemap") {
    const clientEmail = process.env.GSC_CLIENT_EMAIL || "";
    const privateKey = (process.env.GSC_PRIVATE_KEY || "").replace(/\\n/g, "\n");
    const siteUrl = process.env.GSC_SITE_URL || "";
    const sitemapUrl = process.env.GSC_SITEMAP_URL || "";

    if (clientEmail && privateKey && siteUrl && sitemapUrl) {
      const result = await submitSitemap({
        clientEmail,
        privateKey,
        siteUrl,
        sitemapUrl,
      });

      await db().insert(schema.searchSubmissions).values({
        provider: "google_sitemap",
        submissionType: "sitemap_submit",
        requestPayload: { siteUrl, sitemapUrl },
        responsePayload: result as unknown as Record<string, unknown>,
        status: "success",
        submittedAt: new Date(),
      });
    }
  }

  if (type === "pull-analytics") {
    const clientEmail = process.env.GSC_CLIENT_EMAIL || "";
    const privateKey = (process.env.GSC_PRIVATE_KEY || "").replace(/\\n/g, "\n");
    const siteUrl = process.env.GSC_SITE_URL || "";
    if (clientEmail && privateKey && siteUrl) {
      const today = new Date();
      const end = new Date(today);
      end.setUTCDate(end.getUTCDate() - 1);
      const start = new Date(end);

      const startDate = start.toISOString().slice(0, 10);
      const endDate = end.toISOString().slice(0, 10);

      const dimensions = ["page", "query", "country", "device"];
      const rowLimit = 25000;
      let startRow = 0;
      const allRows: NonNullable<Awaited<ReturnType<typeof fetchSearchAnalytics>>["rows"]> = [];

      while (true) {
        const analytics = await fetchSearchAnalytics({
          clientEmail,
          privateKey,
          siteUrl,
          startDate,
          endDate,
          dimensions,
          rowLimit,
          startRow,
        });
        const rows = analytics.rows || [];
        allRows.push(...rows);

        if (rows.length < rowLimit) break;
        startRow += rowLimit;
      }

      const urls = allRows.map((row) => row.keys?.[0]).filter((url): url is string => Boolean(url));
      if (urls.length) {
        const contentItems = await db()
          .select({ id: schema.contentItems.id, url: schema.contentItems.url })
          .from(schema.contentItems)
          .where(inArray(schema.contentItems.url, urls));

        const idByUrl = new Map(contentItems.map((item) => [item.url, item.id]));
        const aggregateByUrl = new Map<
          string,
          {
            clicks: number;
            impressions: number;
            weightedPosition: number;
            query: Map<string, number>;
            country: Map<string, number>;
            device: Map<string, number>;
          }
        >();

        for (const row of allRows) {
          const url = row.keys?.[0];
          if (!url) continue;
          const query = row.keys?.[1] || "unknown";
          const country = row.keys?.[2] || "unknown";
          const device = row.keys?.[3] || "unknown";
          const clicks = row.clicks ?? 0;
          const impressions = row.impressions ?? 0;
          const position = row.position ?? 0;

          const current =
            aggregateByUrl.get(url) ||
            {
              clicks: 0,
              impressions: 0,
              weightedPosition: 0,
              query: new Map<string, number>(),
              country: new Map<string, number>(),
              device: new Map<string, number>(),
            };

          current.clicks += clicks;
          current.impressions += impressions;
          current.weightedPosition += position * impressions;
          current.query.set(query, (current.query.get(query) || 0) + clicks);
          current.country.set(country, (current.country.get(country) || 0) + impressions);
          current.device.set(device, (current.device.get(device) || 0) + impressions);
          aggregateByUrl.set(url, current);
        }

        for (const [url, aggregate] of aggregateByUrl.entries()) {
          const contentItemId = idByUrl.get(url);
          if (!contentItemId) continue;

          const ctr = aggregate.impressions > 0 ? aggregate.clicks / aggregate.impressions : null;
          const position =
            aggregate.impressions > 0
              ? aggregate.weightedPosition / aggregate.impressions
              : null;

          const topQueries = Array.from(aggregate.query.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([query, clicks]) => ({ query, clicks }));
          const topCountries = Array.from(aggregate.country.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([country, impressions]) => ({ country, impressions }));
          const topDevices = Array.from(aggregate.device.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([device, impressions]) => ({ device, impressions }));

          await db()
            .insert(schema.analyticsDaily)
            .values({
              date: endDate,
              contentItemId,
              clicks: aggregate.clicks,
              impressions: aggregate.impressions,
              ctr: ctr != null ? String(ctr) : null,
              position: position != null ? String(position) : null,
              topQueries,
              topCountries,
              topDevices,
            })
            .onConflictDoUpdate({
              target: [schema.analyticsDaily.contentItemId, schema.analyticsDaily.date],
              set: {
                clicks: aggregate.clicks,
                impressions: aggregate.impressions,
                ctr: ctr != null ? String(ctr) : null,
                position: position != null ? String(position) : null,
                topQueries,
                topCountries,
                topDevices,
              },
            });
        }
      }
    }
  }

  if (type === "inspect-index") {
    const clientEmail = process.env.GSC_CLIENT_EMAIL || "";
    const privateKey = (process.env.GSC_PRIVATE_KEY || "").replace(/\\n/g, "\n");
    const siteUrl = process.env.GSC_SITE_URL || "";
    if (clientEmail && privateKey && siteUrl) {
      const recentSubmissions = await db()
        .select()
        .from(schema.searchSubmissions)
        .orderBy(desc(schema.searchSubmissions.submittedAt))
        .limit(10);

      const urls = recentSubmissions
        .flatMap((submission) => {
          const payload = submission.requestPayload as { urls?: string[] } | null;
          return payload?.urls || [];
        })
        .filter((url, idx, arr) => arr.indexOf(url) === idx);

      const contentItems = urls.length
        ? await db()
            .select({ id: schema.contentItems.id, url: schema.contentItems.url })
            .from(schema.contentItems)
            .where(inArray(schema.contentItems.url, urls))
        : [];
      const idByUrl = new Map(contentItems.map((item) => [item.url, item.id]));

      for (const url of urls) {
        const data = await inspectUrl({ clientEmail, privateKey, siteUrl, url });
        const inspectionResult = data.inspectionResult;

        await db().insert(schema.indexStatusChecks).values({
          contentItemId: idByUrl.get(url) || null,
          provider: "google",
          verdict: inspectionResult?.indexStatusResult?.verdict || null,
          coverageState: inspectionResult?.indexStatusResult?.coverageState || null,
          indexingState: inspectionResult?.indexStatusResult?.indexingState || null,
          pageFetchState: inspectionResult?.indexStatusResult?.pageFetchState || null,
          robotsState: inspectionResult?.indexStatusResult?.robotsTxtState || null,
          lastCrawlTime: inspectionResult?.indexStatusResult?.lastCrawlTime
            ? new Date(inspectionResult.indexStatusResult.lastCrawlTime)
            : null,
          googleCanonical: inspectionResult?.indexStatusResult?.googleCanonical || null,
          userCanonical: inspectionResult?.indexStatusResult?.userCanonical || null,
          rawResponse: data as unknown as Record<string, unknown>,
          checkedAt: new Date(),
        });
      }
    }
  }

  return NextResponse.json({ ok: true, type });
}
