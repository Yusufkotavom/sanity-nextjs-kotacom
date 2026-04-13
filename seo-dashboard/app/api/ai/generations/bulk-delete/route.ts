import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { aiGenerations } from "@repo/db/schema";
import { inArray } from "drizzle-orm";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  try {
    const { ids } = await request.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: "Invalid ids array" },
        { status: 400 }
      );
    }

    const database = db();

    // Delete the generations
    await database
      .delete(aiGenerations)
      .where(inArray(aiGenerations.id, ids));

    return NextResponse.json({
      success: true,
      deletedCount: ids.length,
    });
  } catch (error) {
    console.error("Bulk delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete generations" },
      { status: 500 }
    );
  }
}
