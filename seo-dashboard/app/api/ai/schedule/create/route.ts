import { NextRequest, NextResponse } from "next/server";
import { createSchedule, type CreateScheduleParams } from "@/lib/ai-writer/schedule-manager";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.cronExpr || !body.timezone || !body.payload) {
      return NextResponse.json(
        { error: "Missing required fields: name, cronExpr, timezone, payload" },
        { status: 400 }
      );
    }

    // Validate payload fields
    if (!body.payload.contentType || !body.payload.batchSize) {
      return NextResponse.json(
        { error: "Missing required payload fields: contentType, batchSize" },
        { status: 400 }
      );
    }

    // Create schedule
    const params: CreateScheduleParams = {
      name: body.name,
      taskType: "ai_content_generation",
      cronExpr: body.cronExpr,
      timezone: body.timezone,
      enabled: body.enabled !== undefined ? body.enabled : true,
      payload: {
        contentType: body.payload.contentType,
        promptTemplateId: body.payload.promptTemplateId,
        customPrompt: body.payload.customPrompt,
        batchSize: body.payload.batchSize,
        autoPublish: body.payload.autoPublish !== undefined ? body.payload.autoPublish : false,
        generateOgImage: body.payload.generateOgImage !== undefined ? body.payload.generateOgImage : true,
        tags: body.payload.tags,
      },
    };

    const schedule = await createSchedule(params);

    return NextResponse.json({
      success: true,
      schedule,
    });
  } catch (error) {
    console.error("Error creating schedule:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create schedule" },
      { status: 500 }
    );
  }
}
