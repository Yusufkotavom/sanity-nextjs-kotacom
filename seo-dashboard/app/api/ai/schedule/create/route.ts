import { NextRequest, NextResponse } from "next/server";
import { createSchedule, type CreateScheduleParams } from "@/lib/ai-writer/schedule-manager";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";
import { sanitizeText } from "@/lib/sanitize";
import { assertSupportedContentType } from "@/lib/ai-writer/content-type";

export async function POST(request: NextRequest) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  try {
    const body = await request.json();
    const name = sanitizeText(body.name, 120);
    const cronExpr = sanitizeText(body.cronExpr, 128);
    const timezone = sanitizeText(body.timezone, 80);

    // Validate required fields
    if (!name || !cronExpr || !timezone) {
      return NextResponse.json(
        { error: "Missing required fields: name, cronExpr, timezone" },
        { status: 400 }
      );
    }

    // Default scheduleType to "ai_generation" for backward compatibility
    const scheduleType = body.scheduleType || "ai_generation";

    // Validate scheduleType
    const validScheduleTypes = ["ai_generation", "publishing_queue"];
    if (!validScheduleTypes.includes(scheduleType)) {
      return NextResponse.json(
        { error: `scheduleType must be one of: ${validScheduleTypes.join(", ")}` },
        { status: 400 }
      );
    }

    // Validate payload structure based on schedule type
    if (scheduleType === "publishing_queue") {
      if (!body.payload || !body.payload.publishingQueueConfig) {
        return NextResponse.json(
          { error: "Publishing queue schedules require payload.publishingQueueConfig" },
          { status: 400 }
        );
      }
      if (!body.payload.publishingQueueConfig.batchSize) {
        return NextResponse.json(
          { error: "publishingQueueConfig.batchSize is required" },
          { status: 400 }
        );
      }
      if (Number(body.payload.publishingQueueConfig.batchSize) > 50) {
        return NextResponse.json({ error: "Batch size must be <= 50" }, { status: 400 });
      }
    } else if (scheduleType === "ai_generation") {
      if (!body.payload) {
        return NextResponse.json(
          { error: "AI generation schedules require payload" },
          { status: 400 }
        );
      }
      if (!body.payload.contentType || !body.payload.batchSize) {
        return NextResponse.json(
          { error: "Missing required payload fields: contentType, batchSize" },
          { status: 400 }
        );
      }
      try {
        assertSupportedContentType(body.payload.contentType);
      } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid content type" }, { status: 400 });
      }
      if (Number(body.payload.batchSize) > 50) {
        return NextResponse.json({ error: "Batch size must be <= 50" }, { status: 400 });
      }
    }

    // Create schedule with appropriate payload structure
    let params: CreateScheduleParams;
    
    if (body.scheduleType === "publishing_queue") {
      params = {
        name,
        taskType: "ai_content_generation",
        scheduleType: "publishing_queue",
        cronExpr,
        timezone,
        enabled: body.enabled !== undefined ? body.enabled : true,
        payload: {
          publishingQueueConfig: {
            contentType: body.payload.publishingQueueConfig.contentType,
            batchSize: body.payload.publishingQueueConfig.batchSize,
          },
        },
      };
    } else {
      params = {
        name,
        taskType: "ai_content_generation",
        scheduleType: "ai_generation",
        cronExpr,
        timezone,
        enabled: body.enabled !== undefined ? body.enabled : true,
        payload: {
          contentType: assertSupportedContentType(body.payload.contentType),
          promptTemplateId: body.payload.promptTemplateId,
          customPrompt: body.payload.customPrompt,
          batchSize: body.payload.batchSize,
          autoPublish: body.payload.autoPublish !== undefined ? body.payload.autoPublish : false,
          generateOgImage: body.payload.generateOgImage !== undefined ? body.payload.generateOgImage : true,
          tags: body.payload.tags,
        },
      };
    }

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
