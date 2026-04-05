import { NextRequest, NextResponse } from "next/server";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";
import { getJob } from "@/lib/jobs";

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  const params = await props.params;
  const job = await getJob(params.id);
  if (!job) {
    return NextResponse.json({ ok: false, message: "Job not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true, job });
}
