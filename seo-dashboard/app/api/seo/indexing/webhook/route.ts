import { NextRequest, NextResponse } from "next/server";
import { enqueueIndexingJob } from "@/lib/seo-ops/jobs";

function getWebhookSecret(request: NextRequest) {
  return (
    request.headers.get("x-seo-dashboard-secret") ||
    request.nextUrl.searchParams.get("secret") ||
    ""
  );
}

export async function POST(request: NextRequest) {
  const expected = process.env.SEO_DASHBOARD_WEBHOOK_SECRET || "";
  if (!expected) {
    return NextResponse.json(
      { ok: false, message: "Missing SEO_DASHBOARD_WEBHOOK_SECRET" },
      { status: 500 },
    );
  }

  const provided = getWebhookSecret(request);
  if (!provided || provided !== expected) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as {
    urls?: string[];
    reason?: string;
  };

  const urls = Array.isArray(body.urls) ? body.urls : [];
  const reason = body.reason || "revalidate webhook";

  const result = await enqueueIndexingJob({
    urls,
    reason,
    source: "webhook",
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, message: result.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, job: result.job });
}
