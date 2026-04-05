import { NextRequest, NextResponse } from "next/server";
import {
  createSessionToken,
  getSessionCookieConfig,
  isSeoAuthConfigured,
  verifySeoDashboardPassword,
} from "@/lib/seo-ops/session";

export async function POST(request: NextRequest) {
  if (!(await isSeoAuthConfigured())) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "SEO auth is not configured. Set dashboard password hash in Studio or fallback env, and provide SEO_SESSION_SECRET.",
      },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => ({}))) as { password?: string };
  const password = body.password || "";

  if (!password || !(await verifySeoDashboardPassword(password))) {
    return NextResponse.json({ ok: false, message: "Invalid password" }, { status: 401 });
  }

  const token = createSessionToken();
  const cookie = getSessionCookieConfig();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(cookie.name, token, cookie.options);
  return response;
}
