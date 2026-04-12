import { NextRequest, NextResponse } from "next/server";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";
import { db } from "@/lib/db";
import { schema } from "@repo/db";
import { eq } from "drizzle-orm";
import { enqueueIndexingJob } from "@/lib/seo-ops/jobs";
import { submitSitemap } from "@repo/search";

function pickUrlsFromPayload(payload: unknown) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return [];
  const urls = "urls" in payload ? payload.urls : null;
  if (!Array.isArray(urls)) return [];
  return urls.filter((url): url is string => typeof url === "string" && url.trim().length > 0);
}

export async function POST(request: NextRequest) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  const body = (await request.json().catch(() => ({}))) as { id?: string };
  const id = (body.id || "").trim();
  if (!id) {
    return NextResponse.json({ ok: false, message: "id is required" }, { status: 400 });
  }

  const rows = await db()
    .select()
    .from(schema.searchSubmissions)
    .where(eq(schema.searchSubmissions.id, id))
    .limit(1);
  const row = rows[0];
  if (!row) {
    return NextResponse.json({ ok: false, message: "Submission not found" }, { status: 404 });
  }

  if (row.provider === "google_sitemap") {
    const payload = (row.requestPayload || {}) as Record<string, unknown>;
    const siteUrl = (payload.siteUrl as string) || process.env.GSC_SITE_URL || "";
    const sitemapUrl =
      (payload.sitemapUrl as string) ||
      process.env.GSC_SITEMAP_URL ||
      "";
    const clientEmail = process.env.GSC_CLIENT_EMAIL || "";
    const privateKey = (process.env.GSC_PRIVATE_KEY || "").replace(/\\n/g, "\n");

    if (!siteUrl || !sitemapUrl || !clientEmail || !privateKey) {
      return NextResponse.json(
        { ok: false, message: "Missing sitemap or GSC credentials" },
        { status: 400 },
      );
    }

    const result = await submitSitemap({
      clientEmail,
      privateKey,
      siteUrl,
      sitemapUrl,
    });

    await db().insert(schema.searchSubmissions).values({
      provider: "google_sitemap",
      submissionType: "sitemap_submit",
      requestPayload: { siteUrl, sitemapUrl, retryFromId: row.id },
      responsePayload: result as unknown as Record<string, unknown>,
      status: "success",
      submittedAt: new Date(),
    });

    return NextResponse.json({ ok: true, retriedProvider: row.provider });
  }

  let urls = pickUrlsFromPayload(row.requestPayload);
  if (urls.length === 0 && row.contentItemId) {
    const content = await db()
      .select({ url: schema.contentItems.url })
      .from(schema.contentItems)
      .where(eq(schema.contentItems.id, row.contentItemId))
      .limit(1);
    if (content[0]?.url) urls = [content[0].url];
  }

  if (!urls.length) {
    return NextResponse.json(
      { ok: false, message: "No URL payload to retry" },
      { status: 400 },
    );
  }

  const engine =
    row.provider === "google"
      ? "google"
      : row.provider === "bing"
        ? "bing"
        : "indexnow";

  const retry = await enqueueIndexingJob({
    urls,
    reason: `retry submission ${row.id}`,
    source: "manual",
    engines: [engine],
    waitForCompletion: true,
  });

  if (!retry.ok) {
    return NextResponse.json({ ok: false, message: retry.message }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    retriedProvider: row.provider,
    jobId: retry.job.id,
    status: retry.job.status,
  });
}
