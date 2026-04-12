import { NextRequest, NextResponse } from "next/server";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";
import { inspectAndPersistUrls } from "@/lib/seo-ops/inspection";

export async function POST(request: NextRequest) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  const body = (await request.json().catch(() => ({}))) as { url?: string };
  const url = (body.url || "").trim();
  if (!url) {
    return NextResponse.json(
      { ok: false, message: "url is required" },
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

  const results = await inspectAndPersistUrls({
    urls: [url],
    clientEmail,
    privateKey,
    siteUrl,
  });
  const result = results[0];

  return NextResponse.json({
    ok: Boolean(result?.ok),
    result,
  });
}
