import { NextRequest, NextResponse } from "next/server";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";

export async function POST(request: NextRequest) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  const body = (await request.json().catch(() => ({}))) as {
    template_id?: string;
    variables?: Record<string, unknown>;
  };

  if (!body.template_id) {
    return NextResponse.json(
      { ok: false, message: "template_id is required" },
      { status: 400 },
    );
  }

  return NextResponse.json({
    ok: true,
    templateId: body.template_id,
    preview: body.variables || {},
  });
}
