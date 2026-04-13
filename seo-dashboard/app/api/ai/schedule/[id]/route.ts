import { NextRequest, NextResponse } from "next/server";
import { getSchedule, updateSchedule, deleteSchedule } from "@/lib/ai-writer/schedule-manager";
import { db } from "@/lib/db";
import { jobRuns } from "@repo/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const schedule = await getSchedule(id);

    if (!schedule) {
      return NextResponse.json(
        { error: "Schedule not found" },
        { status: 404 }
      );
    }

    // Get recent job runs for this schedule
    const recentRuns = await db()
      .select()
      .from(jobRuns)
      .where(eq(jobRuns.taskId, id))
      .orderBy(desc(jobRuns.createdAt))
      .limit(10);

    return NextResponse.json({
      success: true,
      schedule,
      recentRuns,
    });
  } catch (error) {
    console.error("Error getting schedule:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to get schedule" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updateParams: any = {};
    if (body.name) updateParams.name = body.name;
    if (body.cronExpr) updateParams.cronExpr = body.cronExpr;
    if (body.timezone) updateParams.timezone = body.timezone;
    if (body.enabled !== undefined) updateParams.enabled = body.enabled;
    if (body.payload) updateParams.payload = body.payload;

    const updated = await updateSchedule(id, updateParams);

    return NextResponse.json({
      success: true,
      schedule: updated,
    });
  } catch (error) {
    console.error("Error updating schedule:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update schedule" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    await deleteSchedule(id);

    return NextResponse.json({
      success: true,
      message: "Schedule deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting schedule:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete schedule" },
      { status: 500 }
    );
  }
}
