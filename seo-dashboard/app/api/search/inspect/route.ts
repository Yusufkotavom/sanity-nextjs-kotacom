import { NextRequest, NextResponse } from "next/server";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";
import { inspectUrl } from "@repo/search";
import { db } from "@/lib/db";
import { schema } from "@repo/db";
import { inArray } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  const body = (await request.json().catch(() => ({}))) as { urls?: string[] };
  const urls = Array.isArray(body.urls) ? body.urls : [];

  if (urls.length === 0) {
    return NextResponse.json({ ok: false, message: "urls[] is required" }, { status: 400 });
  }

  const clientEmail = process.env.GSC_CLIENT_EMAIL || "";
  const privateKey = (process.env.GSC_PRIVATE_KEY || "").replace(/\\n/g, "\n");
  const siteUrl = process.env.GSC_SITE_URL || "";

  if (!clientEmail || !privateKey || !siteUrl) {
    return NextResponse.json(
      { ok: false, message: "Missing GSC credentials or site URL" },
      { status: 500 },
    );
  }

  const contentItems = await db()
    .select({ id: schema.contentItems.id, url: schema.contentItems.url })
    .from(schema.contentItems)
    .where(inArray(schema.contentItems.url, urls));
  const idByUrl = new Map(contentItems.map((item) => [item.url, item.id]));

  const results = [];
  for (const url of urls) {
    const data = await inspectUrl({ clientEmail, privateKey, siteUrl, url });
    const inspectionResult = data.inspectionResult;

    await db().insert(schema.indexStatusChecks).values({
      contentItemId: idByUrl.get(url) || null,
      provider: "google",
      verdict: inspectionResult?.indexStatusResult?.verdict || null,
      coverageState: inspectionResult?.indexStatusResult?.coverageState || null,
      indexingState: inspectionResult?.indexStatusResult?.indexingState || null,
      pageFetchState: inspectionResult?.indexStatusResult?.pageFetchState || null,
      robotsState: inspectionResult?.indexStatusResult?.robotsTxtState || null,
      lastCrawlTime: inspectionResult?.indexStatusResult?.lastCrawlTime
        ? new Date(inspectionResult.indexStatusResult.lastCrawlTime)
        : null,
      googleCanonical: inspectionResult?.indexStatusResult?.googleCanonical || null,
      userCanonical: inspectionResult?.indexStatusResult?.userCanonical || null,
      rawResponse: data as unknown as Record<string, unknown>,
      checkedAt: new Date(),
    });

    results.push({ url, verdict: inspectionResult?.indexStatusResult?.verdict || null });
  }

  return NextResponse.json({ ok: true, results });
}
