import { NextRequest, NextResponse } from "next/server";
const LOGIN_PATH = "/dashboard/seo/login";
const SEO_SESSION_COOKIE = "seo_dash_session";

function isPublicSeoApi(pathname: string) {
  return (
    pathname === "/api/seo/auth/login" ||
    pathname === "/api/seo/auth/logout" ||
    pathname === "/api/seo/indexing/webhook"
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isDashboard = pathname.startsWith("/dashboard");
  const isSeoApi = pathname.startsWith("/api/seo");
  const isAiApi = pathname.startsWith("/api/ai");
  const isJobsApi = pathname.startsWith("/api/jobs");
  const isTemplatesApi = pathname.startsWith("/api/templates");
  const isSearchApi = pathname.startsWith("/api/search");
  const isInternalApi = pathname.startsWith("/api/internal");

  if (!isDashboard && !isSeoApi && !isAiApi && !isJobsApi && !isTemplatesApi && !isSearchApi) {
    return NextResponse.next();
  }

  if (isInternalApi) {
    return NextResponse.next();
  }

  if (isSeoApi && isPublicSeoApi(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SEO_SESSION_COOKIE)?.value;
  const valid = Boolean(token);

  if (valid) {
    if (pathname === LOGIN_PATH) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (isSeoApi || isAiApi || isJobsApi || isTemplatesApi || isSearchApi) {
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
