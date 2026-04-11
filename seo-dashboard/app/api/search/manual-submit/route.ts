import { NextRequest, NextResponse } from "next/server";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";
import { enqueueIndexingJob } from "@/lib/seo-ops/jobs";
import type { IndexEngine } from "@/lib/seo-ops/types";

const PROVIDER_TO_ENGINES: Record<string, IndexEngine[]> = {
  google: ["google"],
  bing: ["bing"],
  yandex: ["indexnow"],
};

export async function POST(request: NextRequest) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  try {
    const body = await request.json();
    const { urls, provider } = body;

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        { ok: false, message: "URLs array is required" },
        { status: 400 }
      );
    }

    if (!provider) {
      return NextResponse.json(
        { ok: false, message: "Provider is required" },
        { status: 400 }
      );
    }

    const engines = PROVIDER_TO_ENGINES[String(provider)] || [];
    if (engines.length === 0) {
      return NextResponse.json(
        { ok: false, message: "Unsupported provider" },
        { status: 400 },
      );
    }

    const result = await enqueueIndexingJob({
      urls,
      reason: `manual submit via ${provider}`,
      source: "manual",
      engines,
    });

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, message: result.message },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        ok: true,
        job_id: result.job.id,
        queued_urls: result.job.urls.length,
        engines: result.job.engines,
        message: `${result.job.urls.length} URL(s) queued for ${provider}`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Manual submit error:", error);
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Failed to submit URLs",
      },
      { status: 500 }
    );
  }
}
