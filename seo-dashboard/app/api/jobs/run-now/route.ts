import { NextRequest, NextResponse } from "next/server";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";
import { createJobRun } from "@/lib/jobs";
import { enqueue, QUEUES } from "@/lib/queue";

const QUEUE_MAP: Record<string, string> = {
  ai_generate: QUEUES.ai,
  seo_audit: QUEUES.seo,
  search_submit: QUEUES.search,
};

export async function POST(request: NextRequest) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  const body = (await request.json().catch(() => ({}))) as {
    task_id?: string;
    job_type?: string;
    payload?: unknown;
  };

  const jobType = (body.job_type || "").trim();
  if (!jobType) {
    return NextResponse.json({ ok: false, message: "job_type is required" }, { status: 400 });
  }

  const job = await createJobRun({
    taskId: body.task_id || null,
    jobType,
    payload: body.payload,
  });

  const queue = QUEUE_MAP[jobType] || QUEUES.search;
  await enqueue(queue, { jobRunId: job.id, jobType, payload: body.payload });

  return NextResponse.json({ ok: true, job });
}
