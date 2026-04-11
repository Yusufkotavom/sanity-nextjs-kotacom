import { NextRequest, NextResponse } from "next/server";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";
import { importGa4Rows } from "@/lib/seo-ops/migration-data";
import { db } from "@/lib/db";
import { schema } from "@repo/db";
import { inArray } from "drizzle-orm";

type Ga4ImportBody = {
  date?: string;
  rows?: Array<{
    page?: string;
    sessions?: number;
    engagedSessions?: number;
    conversions?: number;
    revenue?: number;
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

  const date = body.date || new Date().toISOString().slice(0, 10);
  const rows = body.rows.filter((row) => Boolean(row.page));
  const pages = Array.from(
    new Set(rows.map((row) => String(row.page || "").trim()).filter(Boolean)),
  );

  const contentItems = pages.length
    ? await db()
        .select({ id: schema.contentItems.id, url: schema.contentItems.url })
        .from(schema.contentItems)
        .where(inArray(schema.contentItems.url, pages))
    : [];
  const contentIdByUrl = new Map(contentItems.map((item) => [item.url, item.id]));

  for (const row of rows) {
    const pageUrl = String(row.page || "").trim();
    if (!pageUrl) continue;
    const contentItemId = contentIdByUrl.get(pageUrl) || null;

    await db()
      .insert(schema.analyticsGa4Daily)
      .values({
        contentItemId,
        pageUrl,
        date,
        sessions: Number(row.sessions || 0),
        engagedSessions: Number(row.engagedSessions || 0),
        conversions: row.conversions != null ? String(row.conversions) : null,
        revenue: row.revenue != null ? String(row.revenue) : null,
      })
      .onConflictDoUpdate({
        target: [schema.analyticsGa4Daily.pageUrl, schema.analyticsGa4Daily.date],
        set: {
          contentItemId,
          sessions: Number(row.sessions || 0),
          engagedSessions: Number(row.engagedSessions || 0),
          conversions: row.conversions != null ? String(row.conversions) : null,
          revenue: row.revenue != null ? String(row.revenue) : null,
        },
      });
  }

  // Keep legacy in-memory aggregator for migration-priority route compatibility.
  const count = importGa4Rows(body.rows);

  return NextResponse.json({
    ok: true,
    importedRows: count,
    persistedRows: rows.length,
    date,
    message: "GA4 rows imported and persisted.",
  });
}
