import crypto from "node:crypto";
import { google } from "googleapis";
import { getEnabledEngines, getSeoOpsRuntimeConfig } from "@/lib/seo-ops/config";
import { getSeoOpsResolvedSettings } from "@/lib/seo-ops/settings-source";
import { IndexEngine, SeoIndexingJob, SeoJobTask } from "@/lib/seo-ops/types";
import { db, isDatabaseConfigured } from "@/lib/db-safe";
import { schema } from "@repo/db";
import { eq } from "drizzle-orm";

const jobs = new Map<string, SeoIndexingJob>();

function nowIso() {
  return new Date().toISOString();
}

function id(prefix: string) {
  return `${prefix}_${crypto.randomBytes(6).toString("hex")}`;
}

function normalizeUrl(url: string) {
  try {
    const parsed = new URL(url);
    parsed.hash = "";
    return parsed.toString();
  } catch {
    return "";
  }
}

function uniqueUrls(urls: string[]) {
  return Array.from(new Set(urls.map(normalizeUrl).filter(Boolean)));
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function submitGoogle(url: string) {
  const cfg = await getSeoOpsRuntimeConfig();
  const resolved = await getSeoOpsResolvedSettings();
  if (!cfg.google.enabled || !cfg.google.hasCredentials) {
    return { ok: false, message: "Google indexing disabled or credentials missing" };
  }

  try {
    const auth = new google.auth.GoogleAuth({
      scopes: ["https://www.googleapis.com/auth/indexing"],
      credentials: resolved.google.serviceAccountJson
        ? JSON.parse(resolved.google.serviceAccountJson)
        : undefined,
    });

    const indexing = google.indexing({ version: "v3", auth });
    await indexing.urlNotifications.publish({
      requestBody: {
        url,
        type: "URL_UPDATED",
      },
    });

    return { ok: true, message: "Submitted to Google Indexing API" };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Google submit failed",
    };
  }
}

async function submitIndexNow(url: string) {
  const cfg = await getSeoOpsRuntimeConfig();
  const resolved = await getSeoOpsResolvedSettings();
  if (!cfg.indexNow.enabled || !cfg.indexNow.hasKey) {
    return { ok: false, message: "IndexNow disabled or key missing" };
  }

  const key = resolved.indexNow.key;
  const host = resolved.indexNow.host;
  const endpoint = cfg.indexNow.endpoint;
  const keyLocation = resolved.indexNow.keyLocation || `https://${host}/${key}.txt`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        host,
        key,
        keyLocation,
        urlList: [url],
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      return { ok: false, message: `IndexNow ${response.status}: ${text.slice(0, 200)}` };
    }

    return { ok: true, message: "Submitted to IndexNow" };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "IndexNow submit failed",
    };
  }
}

async function submitTask(task: SeoJobTask) {
  if (task.engine === "google") return submitGoogle(task.url);
  if (task.engine === "indexnow" || task.engine === "bing") return submitIndexNow(task.url);
  return { ok: false, message: `Unsupported engine: ${task.engine}` };
}

function recomputeJobStatus(job: SeoIndexingJob) {
  const done = job.tasks.filter((task) => task.status === "success").length;
  const failed = job.tasks.filter((task) => task.status === "failed").length;
  const processing = job.tasks.some(
    (task) => task.status === "queued" || task.status === "processing",
  );

  if (processing) {
    job.status = "processing";
  } else if (done > 0 && failed === 0) {
    job.status = "done";
  } else if (done > 0 && failed > 0) {
    job.status = "partial";
  } else {
    job.status = "failed";
  }

  job.updatedAt = nowIso();
}

async function processJob(jobId: string) {
  const job = jobs.get(jobId);
  if (!job) return;

  job.status = "processing";
  job.updatedAt = nowIso();

  const retryAttempts = (await getSeoOpsRuntimeConfig()).defaults.retryAttempts;
  const taskDelayMs = Math.max(0, Number(process.env.SEO_INDEXING_TASK_DELAY_MS || 200));
  const contentIdByUrl = new Map<string, string | null>();

  for (const task of job.tasks) {
    if (task.status !== "queued") continue;

    task.status = "processing";
    task.updatedAt = nowIso();

    let lastMessage = "";
    let success = false;

    for (let attempt = 1; attempt <= retryAttempts + 1; attempt += 1) {
      task.attempts = attempt;
      const result = await submitTask(task);
      lastMessage = result.message;
      if (result.ok) {
        success = true;
        break;
      }
      if (attempt <= retryAttempts) {
        await sleep(250 * attempt);
      }
    }

    task.status = success ? "success" : "failed";
    task.message = lastMessage;
    task.updatedAt = nowIso();

    if (isDatabaseConfigured()) {
      try {
        const contentItemId = await resolveContentItemId(task.url, contentIdByUrl);
        await db().insert(schema.searchSubmissions).values({
          contentItemId,
          provider: task.engine,
          submissionType: `indexing_${job.source}`,
          requestPayload: {
            urls: [task.url],
            jobId: job.id,
            taskId: task.id,
            source: job.source,
            reason: job.reason,
          },
          responsePayload: {
            message: lastMessage,
            attempts: task.attempts,
            status: task.status,
          },
          status: task.status === "success" ? "success" : "failed",
          submittedAt: new Date(),
        });
      } catch {
        // Keep indexing flow running even when DB logging is temporarily unavailable.
      }
    }

    if (taskDelayMs > 0) {
      await sleep(taskDelayMs);
    }
  }

  recomputeJobStatus(job);
}

async function resolveContentItemId(url: string, cache: Map<string, string | null>) {
  if (cache.has(url)) {
    return cache.get(url) || null;
  }

  const row = await db()
    .select({ id: schema.contentItems.id })
    .from(schema.contentItems)
    .where(eq(schema.contentItems.url, url))
    .limit(1);

  const id = row[0]?.id || null;
  cache.set(url, id);
  return id;
}

export async function enqueueIndexingJob({
  urls,
  reason,
  source,
  engines,
  waitForCompletion = false,
}: {
  urls: string[];
  reason?: string;
  source: SeoIndexingJob["source"];
  engines?: IndexEngine[];
  waitForCompletion?: boolean;
}) {
  const cleanUrls = uniqueUrls(urls);
  const maxBatchSize = (await getSeoOpsRuntimeConfig()).defaults.maxBatchSize;
  const selectedEngines = (engines?.length ? engines : await getEnabledEngines()) as IndexEngine[];

  if (!cleanUrls.length) {
    return { ok: false as const, message: "No valid URLs" };
  }

  if (!selectedEngines.length) {
    return { ok: false as const, message: "No indexing engine enabled" };
  }

  const sliced = cleanUrls.slice(0, maxBatchSize);
  const jobId = id("job");

  const tasks: SeoJobTask[] = sliced.flatMap((url) =>
    selectedEngines.map((engine) => ({
      id: id("task"),
      url,
      engine,
      status: "queued",
      attempts: 0,
      updatedAt: nowIso(),
    })),
  );

  const job: SeoIndexingJob = {
    id: jobId,
    reason: reason || "manual submit",
    source,
    urls: sliced,
    engines: selectedEngines,
    createdAt: nowIso(),
    updatedAt: nowIso(),
    status: "queued",
    tasks,
  };

  jobs.set(jobId, job);

  if (waitForCompletion) {
    await processJob(jobId);
  } else {
    void processJob(jobId);
  }

  return { ok: true as const, job };
}

export function listIndexingJobs() {
  return Array.from(jobs.values()).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getIndexingJob(id: string) {
  return jobs.get(id) || null;
}

export async function retryIndexingJob(jobId: string) {
  const job = jobs.get(jobId);
  if (!job) return { ok: false as const, message: "Job not found" };

  for (const task of job.tasks) {
    if (task.status === "failed") {
      task.status = "queued";
      task.message = "retry queued";
      task.updatedAt = nowIso();
    }
  }

  recomputeJobStatus(job);
  void processJob(jobId);
  return { ok: true as const, job };
}

export function summarizeIndexingJobs() {
  const all = listIndexingJobs();
  const totalTasks = all.reduce((acc, job) => acc + job.tasks.length, 0);
  const successTasks = all.reduce(
    (acc, job) => acc + job.tasks.filter((task) => task.status === "success").length,
    0,
  );
  const failedTasks = all.reduce(
    (acc, job) => acc + job.tasks.filter((task) => task.status === "failed").length,
    0,
  );

  return {
    jobs: all.length,
    totalTasks,
    successTasks,
    failedTasks,
  };
}
