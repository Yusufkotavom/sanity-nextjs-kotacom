import { NextRequest, NextResponse } from "next/server";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";
import { getMergedPriorityRows } from "@/lib/seo-ops/migration-data";

export async function GET(request: NextRequest) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  const rows = await getMergedPriorityRows();

  return NextResponse.json({
    ok: true,
    total: rows.length,
    migrateNow: rows.filter((row) => row.finalAction === "migrate_now").length,
    improveThenMigrate: rows.filter((row) => row.finalAction === "improve_then_migrate")
      .length,
    keepArchiveRedirect: rows.filter((row) => row.finalAction === "keep_archive_redirect")
      .length,
    rows,
  });
}
