import { NextRequest, NextResponse } from "next/server";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";
import { importGa4Rows } from "@/lib/seo-ops/migration-data";

type Ga4ImportBody = {
  rows?: Array<{
    page?: string;
    sessions?: number;
    conversions?: number;
  }>;
};

export async function POST(request: NextRequest) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  const body = (await request.json().catch(() => ({}))) as Ga4ImportBody;

  if (!body.rows?.length) {
    return NextResponse.json(
      { ok: false, message: "rows is required and must be a non-empty array" },
      { status: 400 },
    );
  }

  const count = importGa4Rows(body.rows);

  return NextResponse.json({
    ok: true,
    importedRows: count,
    message: "GA4 rows imported into in-memory store.",
  });
}
