import { NextRequest, NextResponse } from "next/server";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";
import { db } from "@/lib/db";
import { schema } from "@repo/db";
import { createJobRun } from "@/lib/jobs";
import { enqueue, QUEUES } from "@/lib/queue";
import { inArray } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  const body = (await request.json().catch(() => ({}))) as {
    urls?: string[];
    content_item_ids?: string[];
  };

  const urls = Array.isArray(body.urls) ? body.urls : [];
  let contentItems: Array<{ id: string; url: string }> = [];

  if (Array.isArray(body.content_item_ids) && body.content_item_ids.length > 0) {
    contentItems = await db()
      .select({ id: schema.contentItems.id, url: schema.contentItems.url })
      .from(schema.contentItems)
      .where(inArray(schema.contentItems.id, body.content_item_ids));
  }

  const targets = [
    ...contentItems.map((item) => ({ url: item.url, contentItemId: item.id })),
    ...urls.map((url) => ({ url, contentItemId: null })),
  ];

  if (targets.length === 0) {
    return NextResponse.json(
      { ok: false, message: "Provide urls[] or content_item_ids[]" },
      { status: 400 },
    );
  }

  const jobRunIds: string[] = [];
  for (const target of targets) {
    const job = await createJobRun({
      jobType: "seo_audit",
      payload: { url: target.url, contentItemId: target.contentItemId },
    });
    jobRunIds.push(job.id);
    await enqueue(QUEUES.seo, {
      jobRunId: job.id,
      jobType: "seo_audit",
      payload: { url: target.url, contentItemId: target.contentItemId },
    });
  }

  return NextResponse.json({ ok: true, jobRunIds });
}
