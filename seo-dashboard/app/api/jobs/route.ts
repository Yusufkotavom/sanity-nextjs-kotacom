import { NextRequest, NextResponse } from "next/server";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";
import { listJobs } from "@/lib/jobs";

export async function GET(request: NextRequest) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  const limit = Number(request.nextUrl.searchParams.get("limit") || 50);
  const jobs = await listJobs(Number.isFinite(limit) ? limit : 50);
  return NextResponse.json({ ok: true, jobs });
}
