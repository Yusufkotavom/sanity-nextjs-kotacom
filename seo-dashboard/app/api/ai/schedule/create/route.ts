import { NextRequest, NextResponse } from "next/server";
import { createSchedule, type CreateScheduleParams } from "@/lib/ai-writer/schedule-manager";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";
import { sanitizeText } from "@/lib/sanitize";
import { assertSupportedContentType } from "@/lib/ai-writer/content-type";

const VALID_AI_PROVIDERS = ["gateway", "groq", "gemini", "vertex"];
const VALID_QUALITY_MODES = ["economy", "standard", "high"];

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
    const validScheduleTypes = ["ai_generation", "publishing_queue", "keyword_pipeline"];
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
      if (body.payload.provider && !VALID_AI_PROVIDERS.includes(body.payload.provider)) {
        return NextResponse.json({ error: "Invalid provider" }, { status: 400 });
      }
      if (body.payload.qualityMode && !VALID_QUALITY_MODES.includes(body.payload.qualityMode)) {
        return NextResponse.json({ error: "Invalid qualityMode" }, { status: 400 });
      }
    } else if (scheduleType === "keyword_pipeline") {
      if (!body.payload) {
        return NextResponse.json(
          { error: "Keyword pipeline schedules require payload" },
          { status: 400 }
        );
      }

      const parsedKeywords = Array.isArray(body.payload.keywords)
        ? body.payload.keywords
        : typeof body.payload.keywords === "string"
          ? body.payload.keywords
              .split(/[\n,]/)
              .map((item: string) => item.trim())
              .filter(Boolean)
          : [];

      if (!parsedKeywords.length) {
        return NextResponse.json(
          { error: "Keyword pipeline requires at least 1 keyword" },
          { status: 400 }
        );
      }
      if (parsedKeywords.length > 200) {
        return NextResponse.json(
          { error: "Keyword pipeline supports up to 200 keywords" },
          { status: 400 }
        );
      }

      const keywordsPerRun = Number(body.payload.keywordsPerRun || 1);
      const articlesPerKeyword = Number(body.payload.articlesPerKeyword || 1);

      if (!Number.isFinite(keywordsPerRun) || keywordsPerRun < 1 || keywordsPerRun > 20) {
        return NextResponse.json(
          { error: "keywordsPerRun must be between 1 and 20" },
          { status: 400 }
        );
      }
      if (!Number.isFinite(articlesPerKeyword) || articlesPerKeyword < 1 || articlesPerKeyword > 10) {
        return NextResponse.json(
          { error: "articlesPerKeyword must be between 1 and 10" },
          { status: 400 }
        );
      }
      if (keywordsPerRun * articlesPerKeyword > 50) {
        return NextResponse.json(
          { error: "keywordsPerRun * articlesPerKeyword must be <= 50" },
          { status: 400 }
        );
      }

      try {
        assertSupportedContentType(body.payload.contentType);
      } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid content type" }, { status: 400 });
      }
      for (const key of [
        "provider",
        "outlineProvider",
        "fullProvider",
      ]) {
        if (body.payload[key] && !VALID_AI_PROVIDERS.includes(body.payload[key])) {
          return NextResponse.json({ error: `Invalid ${key}` }, { status: 400 });
        }
      }
      for (const key of [
        "qualityMode",
        "outlineQualityMode",
        "fullQualityMode",
      ]) {
        if (body.payload[key] && !VALID_QUALITY_MODES.includes(body.payload[key])) {
          return NextResponse.json({ error: `Invalid ${key}` }, { status: 400 });
        }
      }
    }

    // Create schedule with appropriate payload structure
    let params: CreateScheduleParams;
    
    if (scheduleType === "publishing_queue") {
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
    } else if (scheduleType === "ai_generation") {
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
          ideationInput: body.payload.ideationInput,
          ideationKeywords: body.payload.ideationKeywords,
          batchSize: body.payload.batchSize,
          qualityMode: body.payload.qualityMode || "standard",
          provider: body.payload.provider,
          model: body.payload.model,
          autoPublish: body.payload.autoPublish !== undefined ? body.payload.autoPublish : false,
          generateOgImage: body.payload.generateOgImage !== undefined ? body.payload.generateOgImage : true,
          tags: body.payload.tags,
        },
      };
    } else {
      const parsedKeywords = Array.isArray(body.payload.keywords)
        ? body.payload.keywords
            .map((item: unknown) => (typeof item === "string" ? item.trim() : ""))
            .filter(Boolean)
        : typeof body.payload.keywords === "string"
          ? body.payload.keywords
              .split(/[\n,]/)
              .map((item: string) => item.trim())
              .filter(Boolean)
          : [];

      const keywordsPerRun = Number(body.payload.keywordsPerRun || 1);
      const articlesPerKeyword = Number(body.payload.articlesPerKeyword || 1);

      params = {
        name,
        taskType: "ai_content_generation",
        // Stored in DB as ai_generation; keyword pipeline type is derived from payload.pipelineMode.
        scheduleType: "ai_generation",
        cronExpr,
        timezone,
        enabled: body.enabled !== undefined ? body.enabled : true,
        payload: {
          pipelineMode: "keyword_pipeline",
          contentType: assertSupportedContentType(body.payload.contentType),
          keywords: parsedKeywords,
          keywordsPerRun,
          articlesPerKeyword,
          currentKeywordIndex: 0,
          batchSize: keywordsPerRun * articlesPerKeyword,
          qualityMode: body.payload.qualityMode || "standard",
          outlineQualityMode: body.payload.outlineQualityMode || body.payload.qualityMode || "standard",
          fullQualityMode: body.payload.fullQualityMode || body.payload.qualityMode || "standard",
          provider: body.payload.provider,
          model: body.payload.model,
          outlineProvider: body.payload.outlineProvider,
          outlineModel: body.payload.outlineModel,
          fullProvider: body.payload.fullProvider,
          fullModel: body.payload.fullModel,
          promptTemplateId: body.payload.promptTemplateId,
          customPrompt: body.payload.customPrompt,
          ideationInput: body.payload.ideationInput,
          ideationKeywords: body.payload.ideationKeywords,
          autoPublish: body.payload.autoPublish !== undefined ? body.payload.autoPublish : false,
          generateOgImage: body.payload.generateOgImage !== undefined ? body.payload.generateOgImage : true,
          tags: body.payload.tags,
        } as any,
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
