import { NextRequest, NextResponse } from "next/server";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";
import { db } from "@/lib/db";
import { schema } from "@repo/db";
import { and, gte, lte, eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  const { searchParams } = request.nextUrl;
  const status = searchParams.get("status");
  const minScore = searchParams.get("min_score");
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const filters = [];
  if (status) filters.push(eq(schema.seoAudits.status, status));
  if (minScore) filters.push(gte(schema.seoAudits.score, Number(minScore)));
  if (from) filters.push(gte(schema.seoAudits.checkedAt, new Date(from)));
  if (to) filters.push(lte(schema.seoAudits.checkedAt, new Date(to)));

  const baseQuery = db().select().from(schema.seoAudits);
  const audits = await (filters.length
    ? baseQuery.where(and(...filters))
    : baseQuery
  )
    .orderBy(schema.seoAudits.checkedAt)
    .limit(50);

  return NextResponse.json({ ok: true, audits });
}
