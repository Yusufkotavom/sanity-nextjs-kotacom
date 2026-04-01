import { NextRequest, NextResponse } from "next/server";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";
import { runSeoAudit } from "@/lib/seo-ops/audit";

export async function GET(request: NextRequest) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  const limit = Number(request.nextUrl.searchParams.get("limit") || 80);
  const timeoutMs = Number(request.nextUrl.searchParams.get("timeoutMs") || 8000);
  const report = await runSeoAudit({ limit, timeoutMs });

  if (!report.ok) {
    return NextResponse.json(report, { status: 400 });
  }

  return NextResponse.json(report);
}
