import { NextRequest, NextResponse } from "next/server";

function requireInternalSecret(request: NextRequest) {
  const expected = process.env.INTERNAL_API_SECRET || "";
  const provided =
    request.headers.get("x-internal-secret") ||
    request.nextUrl.searchParams.get("secret") ||
    "";
  return Boolean(expected && provided && expected === provided);
}

export async function POST(request: NextRequest) {
  if (!requireInternalSecret(request)) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as { urls?: string[] };
  const urls = Array.isArray(body.urls) ? body.urls : [];

  const revalidateUrl = process.env.FRONTEND_REVALIDATE_URL || "";
  const revalidateSecret = process.env.REVALIDATE_SECRET || "";

  if (!revalidateUrl || !revalidateSecret) {
    return NextResponse.json(
      { ok: false, message: "Missing revalidate URL or secret" },
      { status: 500 },
    );
  }

  const results: Array<{ url: string; ok: boolean; status: number }> = [];
  for (const url of urls) {
    try {
      const path = url.startsWith("http")
        ? new URL(url).pathname || "/"
        : url.startsWith("/")
          ? url
          : `/${url}`;
      const response = await fetch(revalidateUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-revalidate-secret": revalidateSecret,
        },
        body: JSON.stringify({ path }),
      });
      results.push({ url, ok: response.ok, status: response.status });
    } catch {
      results.push({ url, ok: false, status: 0 });
    }
  }

  return NextResponse.json({ ok: true, results });
}
