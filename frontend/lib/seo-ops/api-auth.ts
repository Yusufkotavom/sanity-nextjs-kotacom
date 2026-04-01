import { NextRequest, NextResponse } from "next/server";
import {
  getSessionTokenFromRequest,
  isSeoAuthConfigured,
  verifySessionToken,
} from "@/lib/seo-ops/session";

export async function ensureSeoApiAccess(request: NextRequest) {
  if (!(await isSeoAuthConfigured())) {
    return {
      ok: false,
      response: NextResponse.json(
        {
          ok: false,
          message:
            "SEO dashboard auth is not configured. Configure password hash in Studio (or env fallback) and SEO_SESSION_SECRET.",
        },
        { status: 503 },
      ),
    };
  }

  const token = getSessionTokenFromRequest(request);
  if (!verifySessionToken(token)) {
    return {
      ok: false,
      response: NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 }),
    };
  }

  return { ok: true } as const;
}
