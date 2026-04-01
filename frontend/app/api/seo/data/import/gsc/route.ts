import { NextRequest, NextResponse } from "next/server";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";
import { readPriorityRows } from "@/lib/seo-ops/migration-data";

export async function POST(request: NextRequest) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  const rows = await readPriorityRows();

  return NextResponse.json({
    ok: true,
    importedRows: rows.length,
    message:
      rows.length > 0
        ? "Loaded GSC priority CSV successfully."
        : "No rows loaded. Check SEO_GSC_PRIORITY_CSV_PATH or run gsc:export first.",
  });
}
