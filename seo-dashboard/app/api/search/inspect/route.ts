import { NextRequest, NextResponse } from "next/server";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";
import {
  extractUrlsFromSitemap,
  inspectAndPersistUrls,
} from "@/lib/seo-ops/inspection";

export async function POST(request: NextRequest) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  const body = (await request.json().catch(() => ({}))) as {
    urls?: string[];
    sitemap_url?: string;
    max_urls?: number;
  };
  const urls = Array.isArray(body.urls) ? body.urls : [];
  const sitemapUrl = (body.sitemap_url || "").trim();
  const maxUrls = Math.max(
    1,
    Math.min(Number(body.max_urls || 100), 500),
  );

  if (urls.length === 0 && !sitemapUrl) {
    return NextResponse.json(
      { ok: false, message: "urls[] or sitemap_url is required" },
      { status: 400 },
    );
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

  let targetUrls = urls;
  if (sitemapUrl) {
    try {
      targetUrls = await extractUrlsFromSitemap(sitemapUrl, maxUrls);
    } catch (error) {
      return NextResponse.json(
        {
          ok: false,
          message: error instanceof Error ? error.message : "Failed to read sitemap",
        },
        { status: 400 },
      );
    }
  }
  if (targetUrls.length === 0) {
    return NextResponse.json(
      { ok: false, message: "No URLs found to inspect" },
      { status: 400 },
    );
  }

  const results = await inspectAndPersistUrls({
    urls: targetUrls,
    clientEmail,
    privateKey,
    siteUrl,
  });

  const failed = results.filter((item) => !item.ok).length;
  return NextResponse.json({
    ok: failed === 0,
    inspected: results.length,
    failed,
    results,
  });
}
