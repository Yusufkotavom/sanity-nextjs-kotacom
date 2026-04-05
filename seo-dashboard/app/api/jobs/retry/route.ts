import { NextRequest, NextResponse } from "next/server";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";
import { getJob, updateJobRun } from "@/lib/jobs";
import { enqueue, QUEUES } from "@/lib/queue";

const QUEUE_MAP: Record<string, string> = {
  ai_generate: QUEUES.ai,
  seo_audit: QUEUES.seo,
  search_submit: QUEUES.search,
};

export async function POST(request: NextRequest) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  const body = (await request.json().catch(() => ({}))) as { job_run_id?: string };
  if (!body.job_run_id) {
    return NextResponse.json({ ok: false, message: "job_run_id is required" }, { status: 400 });
  }

  const job = await getJob(body.job_run_id);
  if (!job) {
    return NextResponse.json({ ok: false, message: "Job not found" }, { status: 404 });
  }

  await updateJobRun(job.id, { status: "queued", errorMessage: null });
  const queue = QUEUE_MAP[job.jobType] || QUEUES.search;
  await enqueue(queue, {
    jobRunId: job.id,
    jobType: job.jobType,
    payload: job.payload,
    retry: true,
  });

  return NextResponse.json({ ok: true, jobId: job.id });
}
