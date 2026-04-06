import { NextRequest, NextResponse } from "next/server";
import { db, isDatabaseConfigured } from "@/lib/db-safe";
import { schema } from "@repo/db";
import { eq } from "drizzle-orm";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { ok: false, message: "Database not configured" },
      { status: 500 }
    );
  }

  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { ok: false, message: "Job ID is required" },
        { status: 400 }
      );
    }

    const database = db();

    // Check if job exists
    const [job] = await database
      .select()
      .from(schema.jobRuns)
      .where(eq(schema.jobRuns.id, id))
      .limit(1);

    if (!job) {
      return NextResponse.json(
        { ok: false, message: "Job not found" },
        { status: 404 }
      );
    }

    // Delete the job
    await database
      .delete(schema.jobRuns)
      .where(eq(schema.jobRuns.id, id));

    return NextResponse.json(
      {
        ok: true,
        message: "Job deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete job error:", error);
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Failed to delete job",
      },
      { status: 500 }
    );
  }
}
