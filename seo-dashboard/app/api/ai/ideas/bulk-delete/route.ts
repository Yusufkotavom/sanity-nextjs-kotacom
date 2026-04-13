import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contentIdeas } from "@repo/db/schema";
import { inArray } from "drizzle-orm";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";

export const dynamic = "force-dynamic";

/**
 * POST /api/ai/ideas/bulk-delete
 * Delete multiple content ideas
 */
export async function POST(request: NextRequest) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  try {
    const body = await request.json();
    const { ids } = body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: "IDs array is required" },
        { status: 400 }
      );
    }

    const database = db();

    await database
      .delete(contentIdeas)
      .where(inArray(contentIdeas.id, ids));

    return NextResponse.json({
      success: true,
      deleted: ids.length,
    });
  } catch (error) {
    console.error("Failed to bulk delete ideas:", error);
    return NextResponse.json(
      { error: "Failed to delete ideas" },
      { status: 500 }
    );
  }
}
