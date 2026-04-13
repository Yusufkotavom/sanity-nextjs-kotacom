import { NextRequest, NextResponse } from "next/server";
import { listSchedules } from "@/lib/ai-writer/schedule-manager";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";

export async function GET(request: NextRequest) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Parse query parameters
    const enabled = searchParams.get("enabled");
    const taskType = searchParams.get("taskType");
    const contentType = searchParams.get("contentType");
    const limit = searchParams.get("limit");
    const offset = searchParams.get("offset");

    // Build filters
    const filters: any = {};
    if (enabled !== null) {
      filters.enabled = enabled === "true";
    }
    if (taskType) {
      filters.taskType = taskType;
    }
    if (limit) {
      filters.limit = parseInt(limit, 10);
    }
    if (offset) {
      filters.offset = parseInt(offset, 10);
    }

    const schedules = await listSchedules(filters);
    const filtered = contentType
      ? schedules.filter((schedule) => {
          const payload = schedule.payload as any;
          const scheduleContentType =
            payload?.contentType || payload?.publishingQueueConfig?.contentType || "all";
          return scheduleContentType === contentType;
        })
      : schedules;

    return NextResponse.json({
      success: true,
      schedules: filtered,
      count: filtered.length,
    });
  } catch (error) {
    console.error("Error listing schedules:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to list schedules" },
      { status: 500 }
    );
  }
}
