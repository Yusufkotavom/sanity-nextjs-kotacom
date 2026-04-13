import { NextRequest, NextResponse } from "next/server";
import { listSchedules } from "@/lib/ai-writer/schedule-manager";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Parse query parameters
    const enabled = searchParams.get("enabled");
    const taskType = searchParams.get("taskType");
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

    return NextResponse.json({
      success: true,
      schedules,
      count: schedules.length,
    });
  } catch (error) {
    console.error("Error listing schedules:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to list schedules" },
      { status: 500 }
    );
  }
}
