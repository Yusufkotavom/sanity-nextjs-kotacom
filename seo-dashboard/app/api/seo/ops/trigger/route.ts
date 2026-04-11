import { NextRequest, NextResponse } from "next/server";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";

const ALLOWED_TYPES = new Set([
  "pull-ga4",
  "pull-analytics",
  "submit-sitemap",
  "inspect-index",
  "run-seo-audits",
  "drain-queues",
  "run-scheduled",
]);

export async function POST(request: NextRequest) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  const body = (await request.json().catch(() => ({}))) as { type?: string };
  const type = (body.type || "").trim();

  if (!type || !ALLOWED_TYPES.has(type)) {
    return NextResponse.json(
      { ok: false, message: "Invalid type for manual trigger" },
      { status: 400 },
    );
  }

  const cronSecret = process.env.CRON_SECRET || "";
  if (!cronSecret) {
    return NextResponse.json(
      { ok: false, message: "Missing CRON_SECRET for internal trigger bridge" },
      { status: 500 },
    );
  }

  const targetUrl = new URL("/api/internal/cron-run", request.nextUrl.origin);

  try {
    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-cron-secret": cronSecret,
      },
      body: JSON.stringify({ type }),
      cache: "no-store",
    });

    const payload = await response.json().catch(() => ({}));
    return NextResponse.json(
      {
        ok: response.ok,
        type,
        upstream: payload,
      },
      { status: response.status },
    );
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Failed to trigger task",
      },
      { status: 500 },
    );
  }
}

