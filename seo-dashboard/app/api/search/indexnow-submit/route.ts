import { NextRequest, NextResponse } from "next/server";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";
import { submitIndexNow } from "@repo/search";
import { db } from "@/lib/db";
import { schema } from "@repo/db";

export async function POST(request: NextRequest) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  const body = (await request.json().catch(() => ({}))) as {
    urls?: string[];
    type?: string;
  };

  const urls = Array.isArray(body.urls) ? body.urls : [];
  if (urls.length === 0) {
    return NextResponse.json({ ok: false, message: "urls[] is required" }, { status: 400 });
  }

  const host =
    process.env.INDEXNOW_HOST ||
    (urls[0]?.startsWith("http") ? new URL(urls[0]).host : "");
  if (!host) {
    return NextResponse.json(
      { ok: false, message: "Host is required for IndexNow" },
      { status: 400 },
    );
  }
  const key = process.env.INDEXNOW_KEY || "";
  const keyLocation = process.env.INDEXNOW_KEY_LOCATION || "";
  if (!key || !keyLocation) {
    return NextResponse.json(
      { ok: false, message: "Missing INDEXNOW_KEY or INDEXNOW_KEY_LOCATION" },
      { status: 500 },
    );
  }
  const endpoint = process.env.INDEXNOW_ENDPOINT || "https://api.indexnow.org/indexnow";

  const result = await submitIndexNow(endpoint, {
    host,
    key,
    keyLocation,
    urlList: urls,
  });

  await db().insert(schema.searchSubmissions).values({
    provider: "indexnow",
    submissionType: body.type || "update",
    requestPayload: { urls },
    responsePayload: { body: result.body },
    httpStatus: result.status,
    status: result.ok ? "success" : "failed",
    submittedAt: new Date(),
  });

  return NextResponse.json({ ok: result.ok, status: result.status });
}
