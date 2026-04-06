import { NextRequest, NextResponse } from "next/server";
import { db, isDatabaseConfigured } from "@/lib/db-safe";
import { schema } from "@repo/db";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { ok: false, message: "Database not configured" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { ok: false, message: "Status is required" },
        { status: 400 }
      );
    }

    const database = db();

    // Get all jobs with the specified status
    const jobs = await database
      .select()
      .from(schema.jobRuns)
      .where(eq(schema.jobRuns.status, status))
      .limit(100); // Safety limit

    if (jobs.length === 0) {
      return NextResponse.json(
        { ok: true, count: 0, message: "No jobs to retry" },
        { status: 200 }
      );
    }

    // Update all jobs to pending status and reset attempt
    const updatePromises = jobs.map((job) =>
      database
        .update(schema.jobRuns)
        .set({
          status: "pending",
          attempt: 0,
          errorMessage: null,
        })
        .where(eq(schema.jobRuns.id, job.id))
    );

    await Promise.all(updatePromises);

    return NextResponse.json(
      {
        ok: true,
        count: jobs.length,
        message: `${jobs.length} jobs queued for retry`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Bulk retry error:", error);
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Failed to retry jobs",
      },
      { status: 500 }
    );
  }
}
