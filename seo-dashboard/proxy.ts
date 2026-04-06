import { NextRequest, NextResponse } from "next/server";

const LOGIN_PATH = "/login";
const OLD_LOGIN_PATH = "/dashboard/seo/login";
const SEO_SESSION_COOKIE = "seo_dash_session";
const NEW_AUTH_COOKIE = "seo-dashboard-auth";

function isPublicSeoApi(pathname: string) {
  return (
    pathname === "/api/seo/auth/login" ||
    pathname === "/api/seo/auth/logout" ||
    pathname === "/api/seo/indexing/webhook"
  );
}

export default function proxy(request: NextRequest) {
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

  // Check both old and new auth cookies
  const oldToken = request.cookies.get(SEO_SESSION_COOKIE)?.value;
  const newToken = request.cookies.get(NEW_AUTH_COOKIE)?.value;
  const valid = Boolean(oldToken || newToken);

  if (valid) {
    // Redirect old login to new login
    if (pathname === OLD_LOGIN_PATH) {
      return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
    }
    // Redirect to dashboard if already logged in
    if (pathname === LOGIN_PATH) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (isSeoApi || isAiApi || isJobsApi || isTemplatesApi || isSearchApi) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  // Allow access to both login pages
  if (pathname === LOGIN_PATH || pathname === OLD_LOGIN_PATH) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
