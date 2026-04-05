import { NextRequest, NextResponse } from "next/server";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";
import { submitSitemap } from "@repo/search";
import { db } from "@/lib/db";
import { schema } from "@repo/db";

export async function POST(request: NextRequest) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  const body = (await request.json().catch(() => ({}))) as { sitemap_url?: string };
  const siteUrl = process.env.GSC_SITE_URL || "";
  const sitemapUrl = body.sitemap_url || process.env.GSC_SITEMAP_URL || "";

  if (!siteUrl || !sitemapUrl) {
    return NextResponse.json(
      { ok: false, message: "Missing GSC_SITE_URL or sitemap_url" },
      { status: 400 },
    );
  }

  const clientEmail = process.env.GSC_CLIENT_EMAIL || "";
  const privateKey = (process.env.GSC_PRIVATE_KEY || "").replace(/\\n/g, "\n");
  if (!clientEmail || !privateKey) {
    return NextResponse.json(
      { ok: false, message: "Missing GSC credentials" },
      { status: 500 },
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
    requestPayload: { siteUrl, sitemapUrl },
    responsePayload: result as unknown as Record<string, unknown>,
    status: "success",
    submittedAt: new Date(),
  });

  return NextResponse.json({ ok: true, result });
}
