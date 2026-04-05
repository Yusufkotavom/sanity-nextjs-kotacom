import { NextRequest, NextResponse } from "next/server";
import { SEO_SESSION_COOKIE, verifySessionToken } from "@/lib/seo-ops/session";

const LOGIN_PATH = "/dashboard/seo/login";

function isPublicSeoApi(pathname: string) {
  return pathname === "/api/seo/auth/login" || pathname === "/api/seo/auth/logout";
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isDashboard = pathname.startsWith("/dashboard/seo");
  const isSeoApi = pathname.startsWith("/api/seo");
  const isAiApi = pathname.startsWith("/api/ai");

  if (!isDashboard && !isSeoApi && !isAiApi) {
    return NextResponse.next();
  }

  if (isSeoApi && isPublicSeoApi(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SEO_SESSION_COOKIE)?.value;
  const valid = verifySessionToken(token);

  if (valid) {
    if (pathname === LOGIN_PATH) {
      return NextResponse.redirect(new URL("/dashboard/seo", request.url));
    }
    return NextResponse.next();
  }

  if (isSeoApi || isAiApi) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  if (pathname === LOGIN_PATH) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
