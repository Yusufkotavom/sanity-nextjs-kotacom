import { NextResponse, type NextRequest } from "next/server";
import { isGonePath } from "@/lib/seo/gone-paths";

// 410 Gone — for retired URLs that should be dropped from the index (not
// redirected). Sources: static list in lib/seo/gone-paths.ts + Sanity `redirect`
// docs with statusCode=="410" injected at build as SANITY_GONE_PATHS.
const SANITY_GONE = new Set<string>(
  (() => {
    try {
      return JSON.parse(process.env.SANITY_GONE_PATHS || "[]");
    } catch {
      return [];
    }
  })(),
);

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname.replace(/\/+$/, "") || "/";
  if (isGonePath(pathname) || SANITY_GONE.has(pathname)) {
    return new NextResponse("410 Gone", { status: 410 });
  }
  return NextResponse.next();
}

export const config = {
  // Skip Next internals, API routes and files with extensions.
  matcher: ["/((?!_next/|api/|favicon|.*\\..*).*)"],
};
