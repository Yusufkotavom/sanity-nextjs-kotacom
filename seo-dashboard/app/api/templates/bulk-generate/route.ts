import { NextRequest, NextResponse } from "next/server";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";
import { createJobRun } from "@/lib/jobs";
import { enqueue, QUEUES } from "@/lib/queue";

export async function POST(request: NextRequest) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  const body = (await request.json().catch(() => ({}))) as {
    template_id?: string;
    rows?: Array<Record<string, unknown>>;
    provider?: string;
    model?: string;
  };

  if (!body.template_id || !Array.isArray(body.rows) || body.rows.length === 0) {
    return NextResponse.json(
      { ok: false, message: "template_id and rows[] are required" },
      { status: 400 },
    );
  }

  const jobRunIds: string[] = [];
  for (const row of body.rows) {
    const job = await createJobRun({
      jobType: "ai_generate",
      payload: {
        sourceType: "template",
        templateId: body.template_id,
        inputJson: row,
        provider: body.provider,
        model: body.model,
        prompt: row?.prompt,
      },
    });
    jobRunIds.push(job.id);
    await enqueue(QUEUES.ai, {
      jobRunId: job.id,
      jobType: "ai_generate",
      payload: {
        sourceType: "template",
        templateId: body.template_id,
        inputJson: row,
        provider: body.provider,
        model: body.model,
        prompt: row?.prompt,
      },
    });
  }

  return NextResponse.json({ ok: true, jobRunIds });
}
