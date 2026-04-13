import { NextRequest, NextResponse } from "next/server";
import { getSchedule, updateSchedule, deleteSchedule } from "@/lib/ai-writer/schedule-manager";
import { db } from "@/lib/db";
import { jobRuns } from "@repo/db/schema";
import { eq, desc } from "drizzle-orm";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";
import { sanitizeText } from "@/lib/sanitize";
import { assertSupportedContentType } from "@/lib/ai-writer/content-type";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

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
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  try {
    const { id } = await params;
    const body = await request.json();

    const updateParams: any = {};
    if (body.name) updateParams.name = sanitizeText(body.name, 120);
    if (body.cronExpr) updateParams.cronExpr = sanitizeText(body.cronExpr, 120);
    if (body.timezone) updateParams.timezone = sanitizeText(body.timezone, 80);
    if (body.enabled !== undefined) updateParams.enabled = body.enabled;
    if (body.payload) {
      const payload = body.payload as any;
      if (payload.contentType) {
        payload.contentType = assertSupportedContentType(payload.contentType);
      }
      if (payload.publishingQueueConfig?.contentType) {
        payload.publishingQueueConfig.contentType = assertSupportedContentType(
          payload.publishingQueueConfig.contentType,
        );
      }
      if (payload.batchSize && Number(payload.batchSize) > 50) {
        return NextResponse.json({ error: "Batch size must be <= 50" }, { status: 400 });
      }
      if (
        payload.publishingQueueConfig?.batchSize &&
        Number(payload.publishingQueueConfig.batchSize) > 50
      ) {
        return NextResponse.json({ error: "Publishing queue batch size must be <= 50" }, { status: 400 });
      }
      updateParams.payload = payload;
    }

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
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

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
