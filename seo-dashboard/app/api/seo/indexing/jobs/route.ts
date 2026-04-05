import { NextRequest, NextResponse } from "next/server";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";
import { listIndexingJobs, summarizeIndexingJobs } from "@/lib/seo-ops/jobs";

export async function GET(request: NextRequest) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  return NextResponse.json({
    ok: true,
    summary: summarizeIndexingJobs(),
    jobs: listIndexingJobs(),
  });
}
