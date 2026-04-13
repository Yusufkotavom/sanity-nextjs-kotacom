import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { schema } from "@repo/db";
import { and, lte, eq, gte } from "drizzle-orm";
import { drain, QUEUES } from "@/lib/queue";
import { updateJobRun, createJobRun } from "@/lib/jobs";
import { auditHtml } from "@repo/seo";
import { submitIndexNow, submitSitemap, fetchSearchAnalytics, inspectUrl } from "@repo/search";
import { desc, inArray } from "drizzle-orm";
import { createHash } from "node:crypto";

const AI_SCHEDULE_CONCURRENCY_LIMIT = Number(process.env.AI_SCHEDULE_CONCURRENCY || 3);
const AI_SCHEDULE_TIMEOUT_MS = Number(process.env.AI_SCHEDULE_TIMEOUT_MS || 5 * 60 * 1000);

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
        result: {
          errorStack: error instanceof Error ? error.stack : null,
        },
        finishedAt: new Date(),
      });
    }
  }
}

async function selectContentForPublishing(publishingQueueConfig: any) {
  const database = db();

  // Build query: WHERE readyToPublish = true AND sanityWriteStatus = 'pending'
  const baseQuery = database
    .select()
    .from(schema.aiGenerations)
    .where(
      and(
        eq(schema.aiGenerations.readyToPublish, true),
        eq(schema.aiGenerations.sanityWriteStatus, "pending"),
      )
    );

  // Note: contentType currently lives in inputJson, so this filter remains in-memory.
  // Limit by batch size
  const batchSize = publishingQueueConfig?.batchSize || 10;
  const items = await baseQuery
    .orderBy(schema.aiGenerations.createdAt)
    .limit(batchSize);

  // Apply content type filter if specified (filter in memory)
  if (publishingQueueConfig?.contentType) {
    return items.filter((item) => {
      const inputJson = item.inputJson as any;
      return inputJson?.contentType === publishingQueueConfig.contentType;
    });
  }

  return items;
}

async function executePublishingQueue(jobId: string, taskId: string, publishingQueueConfig: any) {
  const { publishContentSafe } = await import("@/lib/ai-writer/sanity-publisher");
  const { updateScheduleRunTimes } = await import("@/lib/ai-writer/schedule-manager");
  const database = db();
  
  await updateJobRun(jobId, { status: "processing", startedAt: new Date() });
  
  const published: string[] = [];
  const failed: string[] = [];
  const startedAt = Date.now();
  
  try {
    // Select content for publishing
    const contentItems = await selectContentForPublishing(publishingQueueConfig);
    
    console.log(`Publishing queue: Found ${contentItems.length} items ready to publish`);
    
    // Publish each selected content item
    for (const item of contentItems) {
      try {
        const parsedOutput = item.parsedOutput as any;
        
        if (!parsedOutput) {
          console.error(`Item ${item.id} has no parsed output, skipping`);
          failed.push(item.id);
          continue;
        }
        
        const inputJson = item.inputJson as any;
        const contentType = inputJson?.contentType || "post";
        
        // Map "product" to "project" for Sanity
        const sanityContentType = contentType === "product" ? "project" : contentType;
        
        // Call existing Sanity publishing logic
        const publishResult = await publishContentSafe({
          contentType: sanityContentType,
          title: parsedOutput.title,
          excerpt: parsedOutput.excerpt,
          body: parsedOutput.body,
          ogImageAssetId: item.ogImageAssetId || undefined,
        });
        
        if (publishResult.success) {
          // Update sanityWriteStatus to 'success' and set sanityDocumentId
          await database
            .update(schema.aiGenerations)
            .set({
              sanityWriteStatus: "success",
              sanityDocumentId: publishResult.result.documentId,
            })
            .where(eq(schema.aiGenerations.id, item.id));
          
          published.push(item.id);
          console.log(`Successfully published item ${item.id} to Sanity: ${publishResult.result.documentId}`);
        } else {
          // Log error but continue with remaining items
          console.error(`Failed to publish item ${item.id}:`, publishResult.error);
          failed.push(item.id);
          
          // Update status to failed
          await database
            .update(schema.aiGenerations)
            .set({
              sanityWriteStatus: "failed",
            })
            .where(eq(schema.aiGenerations.id, item.id));
        }
      } catch (error) {
        // Log error but continue with remaining items
        console.error(`Failed to publish item ${item.id}:`, error);
        failed.push(item.id);
        
        // Update status to failed
        await database
          .update(schema.aiGenerations)
          .set({
            sanityWriteStatus: "failed",
          })
          .where(eq(schema.aiGenerations.id, item.id));
      }
    }
    
    // Update job run with results
    await updateJobRun(jobId, {
      status: published.length > 0 ? "success" : failed.length > 0 ? "failed" : "success",
      result: {
        selected: contentItems.length,
        published: published.length,
        failed: failed.length,
        publishedIds: published,
        durationMs: Date.now() - startedAt,
      },
      errorMessage: failed.length > 0 ? `${failed.length} items failed to publish` : null,
      finishedAt: new Date(),
    });
    
    // Update schedule run times
    await updateScheduleRunTimes(taskId);
    
  } catch (error) {
    await updateJobRun(jobId, {
      status: "failed",
      errorMessage: error instanceof Error ? error.message : "Publishing queue execution failed",
      result: {
        errorStack: error instanceof Error ? error.stack : null,
        durationMs: Date.now() - startedAt,
      },
      finishedAt: new Date(),
    });
  }
}

async function processAiContentGeneration(jobId: string, taskId: string, payload: any, scheduleType: string) {
  // Route execution based on scheduleType
  if (scheduleType === "publishing_queue") {
    // Execute publishing queue flow
    const publishingQueueConfig = payload.publishingQueueConfig || {};
    await executePublishingQueue(jobId, taskId, publishingQueueConfig);
    return;
  }
  
  // Execute existing AI generation + auto-publish flow
  const { generateContent } = await import("@/lib/ai-writer/content-generator");
  const { updateScheduleRunTimes } = await import("@/lib/ai-writer/schedule-manager");
  
  await updateJobRun(jobId, { status: "processing", startedAt: new Date() });
  
  const batchSize = payload.batchSize || 1;
  const generated: string[] = [];
  const published: string[] = [];
  const failed: string[] = [];
  const providerCounts: Record<string, number> = {};
  const modelCounts: Record<string, number> = {};
  const startedAt = Date.now();

  const ideationKeywords = Array.isArray(payload.ideationKeywords)
    ? payload.ideationKeywords.filter((item: unknown) => typeof item === "string" && item.trim().length > 0)
    : [];
  const ideationInput =
    typeof payload.ideationInput === "string" && payload.ideationInput.trim().length > 0
      ? payload.ideationInput.trim()
      : "";

  const ideationContext =
    ideationInput || ideationKeywords.length > 0
      ? [
          ideationInput ? `Ideation context: ${ideationInput}` : null,
          ideationKeywords.length > 0
            ? `Focus keywords: ${ideationKeywords.join(", ")}`
            : null,
        ]
          .filter(Boolean)
          .join("\n")
      : "";
  
  try {
    // Generate content items in batch
    for (let i = 0; i < batchSize; i++) {
      try {
        const result = await generateContent({
          contentType: payload.contentType,
          promptTemplateId: payload.promptTemplateId,
          customPrompt:
            payload.customPrompt && ideationContext
              ? `${payload.customPrompt}\n\n${ideationContext}`
              : payload.customPrompt,
          generateOgImage: payload.generateOgImage !== false,
          autoPublish: payload.autoPublish === true,
          metadata: {
            sourceType: "scheduled",
            jobRunId: jobId,
            tags: payload.tags || [],
            ideationInput: ideationInput || undefined,
            ideationKeywords: ideationKeywords.length > 0 ? ideationKeywords : undefined,
            contentContext: ideationContext || undefined,
          },
        });
        
        generated.push(result.id);
        providerCounts[result.provider] = (providerCounts[result.provider] || 0) + 1;
        modelCounts[result.model] = (modelCounts[result.model] || 0) + 1;
        
        if (result.sanityDocumentId) {
          published.push(result.sanityDocumentId);
        }
      } catch (error) {
        console.error(`Failed to generate item ${i + 1}/${batchSize}:`, error);
        failed.push(`item-${i + 1}`);
      }
    }
    
    // Update job run with results
    await updateJobRun(jobId, {
      status: failed.length === batchSize ? "failed" : "success",
      result: {
        generated: generated.length,
        published: published.length,
        failed: failed.length,
        generationIds: generated,
        providerCounts,
        modelCounts,
        durationMs: Date.now() - startedAt,
      },
      errorMessage: failed.length > 0 ? `${failed.length} items failed` : null,
      finishedAt: new Date(),
    });
    
    // Update schedule run times
    await updateScheduleRunTimes(taskId);
    
  } catch (error) {
    await updateJobRun(jobId, {
      status: "failed",
      errorMessage: error instanceof Error ? error.message : "Content generation failed",
      result: {
        errorStack: error instanceof Error ? error.stack : null,
        durationMs: Date.now() - startedAt,
      },
      finishedAt: new Date(),
    });
  }
}

async function processAiTaskWithTimeout(task: typeof schema.scheduledTasks.$inferSelect) {
  const job = await createJobRun({
    taskId: task.id,
    jobType: task.taskType,
    payload: task.payload,
  });

  const scheduleType = task.scheduleType || "ai_generation";

  let timeoutHandle: NodeJS.Timeout | undefined;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutHandle = setTimeout(() => reject(new Error("AI schedule execution timed out after 5 minutes")), AI_SCHEDULE_TIMEOUT_MS);
  });

  try {
    await Promise.race([
      processAiContentGeneration(job.id, task.id, task.payload, scheduleType),
      timeoutPromise,
    ]);
  } catch (error) {
    await updateJobRun(job.id, {
      status: "failed",
      errorMessage: error instanceof Error ? error.message : "AI schedule execution failed",
      finishedAt: new Date(),
    });
  } finally {
    if (timeoutHandle) clearTimeout(timeoutHandle);
  }
}

async function runScheduledTasks() {
  const database = db();
  const now = new Date();
  const tasks = await database
    .select()
    .from(schema.scheduledTasks)
    .where(and(eq(schema.scheduledTasks.enabled, true), lte(schema.scheduledTasks.nextRunAt, now)));

  const aiTasks = tasks.filter((task) => task.taskType === "ai_content_generation");
  const otherTasks = tasks.filter((task) => task.taskType !== "ai_content_generation");

  for (let index = 0; index < aiTasks.length; index += AI_SCHEDULE_CONCURRENCY_LIMIT) {
    const batch = aiTasks.slice(index, index + AI_SCHEDULE_CONCURRENCY_LIMIT);
    await Promise.all(
      batch.map(async (task) => {
        try {
          await processAiTaskWithTimeout(task);
        } catch (error) {
          console.error(`Failed to process AI content generation for task ${task.id}:`, error);
        }
      }),
    );
  }

  for (const task of otherTasks) {
    const job = await createJobRun({
      taskId: task.id,
      jobType: task.taskType,
      payload: task.payload,
    });

    // Handle other task types via queue
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

function formatGa4Date(dateValue: string) {
  if (!/^\d{8}$/.test(dateValue)) return null;
  return `${dateValue.slice(0, 4)}-${dateValue.slice(4, 6)}-${dateValue.slice(6, 8)}`;
}

function toAbsoluteUrl(pathOrUrl: string, siteUrl: string) {
  const value = (pathOrUrl || "").trim();
  if (!value) return null;
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  if (!siteUrl) return null;
  const origin = siteUrl.replace(/\/+$/, "");
  const pathname = value.startsWith("/") ? value : `/${value}`;
  return `${origin}${pathname}`;
}

async function resolveContentIdsByUrl(urls: string[]) {
  if (!urls.length) return new Map<string, string>();

  const idByUrl = new Map<string, string>();
  const chunkSize = 500;

  for (let index = 0; index < urls.length; index += chunkSize) {
    const chunk = urls.slice(index, index + chunkSize);
    const rows = await db()
      .select({ id: schema.contentItems.id, url: schema.contentItems.url })
      .from(schema.contentItems)
      .where(inArray(schema.contentItems.url, chunk));

    for (const row of rows) {
      idByUrl.set(row.url, row.id);
    }
  }

  return idByUrl;
}

function buildSyntheticSlugFromUrl(url: string) {
  try {
    const parsed = new URL(url);
    const parts = parsed.pathname
      .split("/")
      .filter(Boolean)
      .map((part) => part.replace(/[^a-zA-Z0-9-]/g, "-"));
    const joined = parts.join("-").replace(/-+/g, "-").toLowerCase();
    if (joined) return joined.slice(0, 180);
  } catch {
    // no-op, fallback below
  }
  const digest = createHash("sha1").update(url).digest("hex").slice(0, 24);
  return `url-${digest}`;
}

function buildSyntheticSanityId(url: string) {
  const digest = createHash("sha1").update(url).digest("hex");
  return `external-url-${digest}`;
}

async function ensureContentItemsForUrls(urls: string[]) {
  if (!urls.length) return new Map<string, string>();

  const idByUrl = await resolveContentIdsByUrl(urls);
  const missingUrls = urls.filter((url) => !idByUrl.has(url));

  if (missingUrls.length) {
    for (const url of missingUrls) {
      const slug = buildSyntheticSlugFromUrl(url);
      const sanityId = buildSyntheticSanityId(url);

      await db()
        .insert(schema.contentItems)
        .values({
          sanityId,
          documentType: "external_url",
          slug,
          url,
          title: slug.replace(/-/g, " "),
          updatedAt: new Date(),
          lastSeenInSitemapAt: new Date(),
        })
        .onConflictDoNothing({
          target: schema.contentItems.sanityId,
        });
    }
  }

  return resolveContentIdsByUrl(urls);
}

async function pullGa4Daily(options?: { startDate?: string; endDate?: string }) {
  const propertyIdRaw = process.env.GA4_PROPERTY_ID || "";
  const propertyId = propertyIdRaw.replace(/^properties\//, "");
  const clientEmail = process.env.GA4_CLIENT_EMAIL || process.env.GSC_CLIENT_EMAIL || "";
  const privateKey = (
    process.env.GA4_PRIVATE_KEY ||
    process.env.GSC_PRIVATE_KEY ||
    ""
  ).replace(/\\n/g, "\n");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.GSC_SITE_URL || "";

  if (!propertyId || !clientEmail || !privateKey || !siteUrl) {
    return {
      ok: false as const,
      message:
        "Missing GA4 env. Required: GA4_PROPERTY_ID, GA4_CLIENT_EMAIL, GA4_PRIVATE_KEY, NEXT_PUBLIC_SITE_URL.",
    };
  }

  const { google } = await import("googleapis");
  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
  });
  const analyticsData = google.analyticsdata({ version: "v1beta", auth });

  const end = new Date();
  end.setUTCDate(end.getUTCDate() - 1);
  const defaultDate = end.toISOString().slice(0, 10);
  const startDate = options?.startDate || defaultDate;
  const endDate = options?.endDate || defaultDate;

  const limit = 25000;
  let offset = 0;
  const aggregated = new Map<
    string,
    {
      pageUrl: string;
      date: string;
      sessions: number;
      engagedSessions: number;
      conversions: number;
      revenue: number;
    }
  >();

  try {
    while (true) {
      const response = await analyticsData.properties.runReport({
        property: `properties/${propertyId}`,
        requestBody: {
          dateRanges: [{ startDate, endDate }],
          dimensions: [{ name: "date" }, { name: "pagePath" }],
          metrics: [
            { name: "sessions" },
            { name: "engagedSessions" },
            { name: "conversions" },
            { name: "totalRevenue" },
          ],
          limit: String(limit),
          offset: String(offset),
        },
      });

      const rows = response.data.rows || [];
      for (const row of rows) {
        const gaDate = row.dimensionValues?.[0]?.value || "";
        const pagePath = row.dimensionValues?.[1]?.value || "";
        const date = formatGa4Date(gaDate);
        const pageUrl = toAbsoluteUrl(pagePath, siteUrl);
        if (!date || !pageUrl) continue;

        const sessions = Number(row.metricValues?.[0]?.value || 0);
        const engagedSessions = Number(row.metricValues?.[1]?.value || 0);
        const conversions = Number(row.metricValues?.[2]?.value || 0);
        const revenue = Number(row.metricValues?.[3]?.value || 0);
        const key = `${date}:${pageUrl}`;
        const current =
          aggregated.get(key) || {
            pageUrl,
            date,
            sessions: 0,
            engagedSessions: 0,
            conversions: 0,
            revenue: 0,
          };

        current.sessions += Number.isFinite(sessions) ? sessions : 0;
        current.engagedSessions += Number.isFinite(engagedSessions) ? engagedSessions : 0;
        current.conversions += Number.isFinite(conversions) ? conversions : 0;
        current.revenue += Number.isFinite(revenue) ? revenue : 0;
        aggregated.set(key, current);
      }

      if (rows.length < limit) break;
      offset += limit;
    }
  } catch (error) {
    return {
      ok: false as const,
      message: error instanceof Error ? error.message : "GA4 runReport failed.",
    };
  }

  const records = Array.from(aggregated.values());
  const uniqueUrls = Array.from(new Set(records.map((item) => item.pageUrl)));
  const idByUrl = await resolveContentIdsByUrl(uniqueUrls);

  for (const record of records) {
    const contentItemId = idByUrl.get(record.pageUrl) || null;

    await db()
      .insert(schema.analyticsGa4Daily)
      .values({
        contentItemId,
        pageUrl: record.pageUrl,
        date: record.date,
        sessions: Math.round(record.sessions),
        engagedSessions: Math.round(record.engagedSessions),
        conversions: String(record.conversions),
        revenue: String(record.revenue),
      })
      .onConflictDoUpdate({
        target: [schema.analyticsGa4Daily.pageUrl, schema.analyticsGa4Daily.date],
        set: {
          contentItemId,
          sessions: Math.round(record.sessions),
          engagedSessions: Math.round(record.engagedSessions),
          conversions: String(record.conversions),
          revenue: String(record.revenue),
        },
      });
  }

  return {
    ok: true as const,
    rows: records.length,
    date: endDate,
  };
}

async function cleanupOldJobRuns() {
  const cutoff = new Date();
  cutoff.setUTCDate(cutoff.getUTCDate() - 30);

  const oldRuns = await db()
    .select({ id: schema.jobRuns.id })
    .from(schema.jobRuns)
    .where(lte(schema.jobRuns.createdAt, cutoff))
    .limit(5000);

  if (!oldRuns.length) {
    return { deleted: 0, cutoff: cutoff.toISOString() };
  }

  const ids = oldRuns.map((row) => row.id);
  await db().delete(schema.jobRuns).where(inArray(schema.jobRuns.id, ids));
  return { deleted: ids.length, cutoff: cutoff.toISOString() };
}

export async function POST(request: NextRequest) {
  if (!requireCronSecret(request)) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as { type?: string; startDate?: string; endDate?: string };
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
      const endTimestamp = new Date(today);
      endTimestamp.setUTCDate(endTimestamp.getUTCDate() - 1);
      const defaultDateStr = endTimestamp.toISOString().slice(0, 10);

      const startDate = body.startDate || defaultDateStr;
      const endDate = body.endDate || defaultDateStr;

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
        const idByUrl = await ensureContentItemsForUrls(urls);
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
          const contentItemId = idByUrl.get(url) || null;

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

  if (type === "pull-ga4") {
    const result = await pullGa4Daily({ startDate: body.startDate, endDate: body.endDate });
    return NextResponse.json(
      {
        type,
        ...result,
      },
      { status: result.ok ? 200 : 400 },
    );
  }

  if (type === "cleanup-jobs") {
    const cleanup = await cleanupOldJobRuns();
    return NextResponse.json({
      type,
      ok: true,
      ...cleanup,
    });
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
