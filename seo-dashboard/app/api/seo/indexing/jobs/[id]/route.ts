import { NextRequest, NextResponse } from "next/server";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";
import { getIndexingJob } from "@/lib/seo-ops/jobs";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  const { id } = await context.params;
  const job = getIndexingJob(id);

  if (!job) {
    return NextResponse.json({ ok: false, message: "Job not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true, job });
}
