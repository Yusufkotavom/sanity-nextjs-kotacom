import { NextRequest, NextResponse } from "next/server";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";
import { retryIndexingJob } from "@/lib/seo-ops/jobs";

export async function POST(request: NextRequest) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  const body = (await request.json().catch(() => ({}))) as { jobId?: string };

  if (!body.jobId) {
    return NextResponse.json({ ok: false, message: "Missing jobId" }, { status: 400 });
  }

  const result = await retryIndexingJob(body.jobId);
  if (!result.ok) {
    return NextResponse.json({ ok: false, message: result.message }, { status: 404 });
  }

  return NextResponse.json({ ok: true, job: result.job });
}
