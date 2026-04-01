import { NextRequest, NextResponse } from "next/server";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";
import { enqueueIndexingJob } from "@/lib/seo-ops/jobs";
import { IndexEngine } from "@/lib/seo-ops/types";

type SubmitBody = {
  urls?: string[];
  url?: string;
  reason?: string;
  engines?: IndexEngine[];
};

export async function POST(request: NextRequest) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  const body = (await request.json().catch(() => ({}))) as SubmitBody;
  const urls = body.urls?.length ? body.urls : body.url ? [body.url] : [];

  const result = await enqueueIndexingJob({
    urls,
    reason: body.reason || "manual dashboard submit",
    source: "manual",
    engines: body.engines,
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, message: result.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, job: result.job });
}
