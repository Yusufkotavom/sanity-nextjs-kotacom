import { NextRequest, NextResponse } from "next/server";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";
import { db } from "@/lib/db";
import { schema } from "@repo/db";
import { desc } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  const submissions = await db()
    .select()
    .from(schema.searchSubmissions)
    .orderBy(desc(schema.searchSubmissions.submittedAt))
    .limit(10);

  const inspections = await db()
    .select()
    .from(schema.indexStatusChecks)
    .orderBy(desc(schema.indexStatusChecks.checkedAt))
    .limit(10);

  return NextResponse.json({ ok: true, submissions, inspections });
}
