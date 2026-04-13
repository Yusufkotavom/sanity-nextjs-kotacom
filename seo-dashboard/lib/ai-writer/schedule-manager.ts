import { db } from "@/lib/db";
import { scheduledTasks } from "@repo/db/schema";
import { eq, and, lte, desc } from "drizzle-orm";
import { CronExpressionParser } from "cron-parser";

/**
 * Schedule Manager Service
 * 
 * Manages creation, updating, and deletion of scheduled content generation tasks.
 * Validates cron expressions, timezones, and enforces resource limits.
 */

export interface CreateScheduleParams {
  name: string;
  taskType: "ai_content_generation";
  scheduleType?: "ai_generation" | "publishing_queue";
  cronExpr: string;
  timezone: string;
  enabled: boolean;
  payload: ContentGenerationPayload | PublishingQueuePayload;
}

export interface ContentGenerationPayload {
  contentType: "post" | "service" | "product";
  promptTemplateId?: string;
  customPrompt?: string;
  ideationInput?: string;
  ideationKeywords?: string[];
  qualityMode?: "economy" | "standard" | "high";
  provider?: "gateway" | "groq" | "gemini";
  model?: string;
  pipelineMode?: "keyword_pipeline";
  keywords?: string[];
  keywordsPerRun?: number;
  articlesPerKeyword?: number;
  currentKeywordIndex?: number;
  outlineQualityMode?: "economy" | "standard" | "high";
  fullQualityMode?: "economy" | "standard" | "high";
  outlineProvider?: "gateway" | "groq" | "gemini";
  outlineModel?: string;
  fullProvider?: "gateway" | "groq" | "gemini";
  fullModel?: string;
  lastProcessedKeywords?: string[];
  lastKeywordPipelineRunAt?: string;
  batchSize: number;
  autoPublish: boolean;
  generateOgImage: boolean;
  tags?: string[];
}

export interface PublishingQueuePayload {
  publishingQueueConfig: {
    contentType?: "post" | "service" | "product";
    batchSize: number;
  };
}

export interface UpdateScheduleParams {
  name?: string;
  cronExpr?: string;
  timezone?: string;
  enabled?: boolean;
  payload?: Partial<ContentGenerationPayload> | Partial<PublishingQueuePayload>;
}

export interface ScheduleFilters {
  enabled?: boolean;
  taskType?: string;
  limit?: number;
  offset?: number;
}

function mergeSchedulePayload(
  existingPayload: Record<string, any> | null | undefined,
  incomingPayload: Record<string, any>,
) {
  const base = { ...(existingPayload || {}) };
  const merged = { ...base, ...incomingPayload };

  if ("publishingQueueConfig" in incomingPayload) {
    merged.publishingQueueConfig = {
      ...(base.publishingQueueConfig || {}),
      ...(incomingPayload.publishingQueueConfig || {}),
    };
  }

  return merged;
}

/**
 * Validates a cron expression against standard cron syntax
 */
export function validateCronExpression(cronExpr: string): { valid: boolean; error?: string } {
  try {
    // Parse cron expression to validate syntax
    CronExpressionParser.parse(cronExpr);
    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : "Invalid cron expression",
    };
  }
}

/**
 * Validates a timezone against IANA timezone database
 */
export function validateTimezone(timezone: string): { valid: boolean; error?: string } {
  try {
    // Try to format a date with the timezone
    new Intl.DateTimeFormat("en-US", { timeZone: timezone }).format(new Date());
    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      error: `Invalid timezone: ${timezone}. Must be a valid IANA timezone (e.g., Asia/Jakarta, America/New_York)`,
    };
  }
}

/**
 * Calculates the next run time based on cron expression and timezone
 */
export function calculateNextRunTime(cronExpr: string, timezone: string): Date {
  try {
    const expression = CronExpressionParser.parse(cronExpr, {
      currentDate: new Date(),
      tz: timezone,
    });
    return expression.next().toDate();
  } catch (error) {
    throw new Error(`Failed to calculate next run time: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

/**
 * Creates a new scheduled task
 */
export async function createSchedule(params: CreateScheduleParams) {
  // Default scheduleType to "ai_generation" for backward compatibility
  const scheduleType = params.scheduleType || "ai_generation";
  
  // Validate scheduleType
  const validScheduleTypes = ["ai_generation", "publishing_queue"];
  if (!validScheduleTypes.includes(scheduleType)) {
    throw new Error(`scheduleType must be one of: ${validScheduleTypes.join(", ")}`);
  }

  // Validate payload structure matches schedule type
  if (scheduleType === "publishing_queue") {
    const payload = params.payload as PublishingQueuePayload;
    if (!payload.publishingQueueConfig) {
      throw new Error("Publishing queue schedules require publishingQueueConfig in payload");
    }
    if (!payload.publishingQueueConfig.batchSize || payload.publishingQueueConfig.batchSize < 1) {
      throw new Error("publishingQueueConfig.batchSize is required and must be at least 1");
    }
    if (payload.publishingQueueConfig.batchSize > 50) {
      throw new Error("publishingQueueConfig.batchSize must not exceed 50");
    }
    if (payload.publishingQueueConfig.contentType) {
      const validContentTypes = ["post", "service", "product"];
      if (!validContentTypes.includes(payload.publishingQueueConfig.contentType)) {
        throw new Error(`publishingQueueConfig.contentType must be one of: ${validContentTypes.join(", ")}`);
      }
    }
  } else if (scheduleType === "ai_generation") {
    const payload = params.payload as ContentGenerationPayload;
    if (!payload.contentType) {
      throw new Error("AI generation schedules require contentType in payload");
    }
    if (!payload.batchSize || payload.batchSize < 1) {
      throw new Error("batchSize is required and must be at least 1");
    }
    if (payload.batchSize > 50) {
      throw new Error("batchSize must not exceed 50");
    }
    const validContentTypes = ["post", "service", "product"];
    if (!validContentTypes.includes(payload.contentType)) {
      throw new Error(`contentType must be one of: ${validContentTypes.join(", ")}`);
    }
  }

  // Validate cron expression
  const cronValidation = validateCronExpression(params.cronExpr);
  if (!cronValidation.valid) {
    throw new Error(cronValidation.error);
  }

  // Validate timezone
  const timezoneValidation = validateTimezone(params.timezone);
  if (!timezoneValidation.valid) {
    throw new Error(timezoneValidation.error);
  }

  // Legacy validation for backward compatibility (only for ai_generation)
  if (scheduleType === "ai_generation") {
    const payload = params.payload as ContentGenerationPayload;
    
    // Validate batch size
    if (payload.batchSize < 1 || payload.batchSize > 50) {
      throw new Error("Batch size must be between 1 and 50");
    }

    // Validate content type
    const validContentTypes = ["post", "service", "product"];
    if (!validContentTypes.includes(payload.contentType)) {
      throw new Error(`Content type must be one of: ${validContentTypes.join(", ")}`);
    }
  }

  // Check schedule limit (50 per user)
  const existingSchedules = await db()
    .select()
    .from(scheduledTasks)
    .where(eq(scheduledTasks.taskType, params.taskType));
  
  if (existingSchedules.length >= 50) {
    throw new Error("Maximum of 50 schedules per user reached");
  }

  // Calculate next run time
  const nextRunAt = calculateNextRunTime(params.cronExpr, params.timezone);

  // Create schedule
  const [schedule] = await db()
    .insert(scheduledTasks)
    .values({
      name: params.name,
      taskType: params.taskType,
      scheduleType: scheduleType,
      cronExpr: params.cronExpr,
      timezone: params.timezone,
      enabled: params.enabled,
      payload: params.payload as any,
      nextRunAt,
    })
    .returning();

  return schedule;
}

/**
 * Updates an existing scheduled task
 */
export async function updateSchedule(id: string, params: UpdateScheduleParams) {
  // Get existing schedule
  const [existing] = await db()
    .select()
    .from(scheduledTasks)
    .where(eq(scheduledTasks.id, id));

  if (!existing) {
    throw new Error("Schedule not found");
  }

  // Validate cron expression if provided
  if (params.cronExpr) {
    const cronValidation = validateCronExpression(params.cronExpr);
    if (!cronValidation.valid) {
      throw new Error(cronValidation.error);
    }
  }

  // Validate timezone if provided
  if (params.timezone) {
    const timezoneValidation = validateTimezone(params.timezone);
    if (!timezoneValidation.valid) {
      throw new Error(timezoneValidation.error);
    }
  }

  // Merge payload if provided
  let mergedPayload = existing.payload as any;
  if (params.payload) {
    mergedPayload = mergeSchedulePayload(
      (existing.payload as Record<string, any>) || {},
      params.payload as Record<string, any>,
    );

    // Validate batch size if changed
    if ("batchSize" in params.payload && params.payload.batchSize !== undefined) {
      if (params.payload.batchSize < 1 || params.payload.batchSize > 50) {
        throw new Error("Batch size must be between 1 and 50");
      }
    }
    if (
      "publishingQueueConfig" in params.payload &&
      params.payload.publishingQueueConfig?.batchSize !== undefined
    ) {
      const batchSize = params.payload.publishingQueueConfig.batchSize;
      if (batchSize < 1 || batchSize > 50) {
        throw new Error("Publishing queue batch size must be between 1 and 50");
      }
    }
  }

  // Recalculate next run time if cron or timezone changed
  let nextRunAt = existing.nextRunAt;
  if (params.cronExpr || params.timezone) {
    const cronExpr = params.cronExpr || existing.cronExpr;
    const timezone = params.timezone || existing.timezone || "Asia/Jakarta";
    nextRunAt = calculateNextRunTime(cronExpr, timezone);
  }

  // Update schedule
  const [updated] = await db()
    .update(scheduledTasks)
    .set({
      ...(params.name && { name: params.name }),
      ...(params.cronExpr && { cronExpr: params.cronExpr }),
      ...(params.timezone && { timezone: params.timezone }),
      ...(params.enabled !== undefined && { enabled: params.enabled }),
      ...(params.payload && { payload: mergedPayload as any }),
      nextRunAt,
    })
    .where(eq(scheduledTasks.id, id))
    .returning();

  return updated;
}

/**
 * Deletes a scheduled task (soft delete by disabling)
 */
export async function deleteSchedule(id: string) {
  const [schedule] = await db()
    .update(scheduledTasks)
    .set({ enabled: false })
    .where(eq(scheduledTasks.id, id))
    .returning();

  if (!schedule) {
    throw new Error("Schedule not found");
  }

  return schedule;
}

/**
 * Lists scheduled tasks with optional filtering and pagination
 */
export async function listSchedules(filters: ScheduleFilters = {}) {
  let query = db().select().from(scheduledTasks);

  // Apply filters
  const conditions = [];
  if (filters.enabled !== undefined) {
    conditions.push(eq(scheduledTasks.enabled, filters.enabled));
  }
  if (filters.taskType) {
    conditions.push(eq(scheduledTasks.taskType, filters.taskType));
  }

  if (conditions.length > 0) {
    query = query.where(and(...conditions)) as any;
  }

  // Apply ordering
  query = query.orderBy(desc(scheduledTasks.createdAt)) as any;

  // Apply pagination
  if (filters.limit) {
    query = query.limit(filters.limit) as any;
  }
  if (filters.offset) {
    query = query.offset(filters.offset) as any;
  }

  return await query;
}

/**
 * Gets a single scheduled task by ID
 */
export async function getSchedule(id: string) {
  const [schedule] = await db()
    .select()
    .from(scheduledTasks)
    .where(eq(scheduledTasks.id, id));

  return schedule || null;
}

/**
 * Gets all due schedules (enabled schedules where nextRunAt has passed)
 */
export async function getDueSchedules() {
  const now = new Date();
  
  return await db()
    .select()
    .from(scheduledTasks)
    .where(
      and(
        eq(scheduledTasks.enabled, true),
        lte(scheduledTasks.nextRunAt, now)
      )
    );
}

/**
 * Updates the last run time and calculates next run time for a schedule
 */
export async function updateScheduleRunTimes(id: string) {
  const [schedule] = await db()
    .select()
    .from(scheduledTasks)
    .where(eq(scheduledTasks.id, id));

  if (!schedule) {
    throw new Error("Schedule not found");
  }

  const now = new Date();
  const nextRunAt = calculateNextRunTime(
    schedule.cronExpr,
    schedule.timezone || "Asia/Jakarta"
  );

  const [updated] = await db()
    .update(scheduledTasks)
    .set({
      lastRunAt: now,
      nextRunAt,
    })
    .where(eq(scheduledTasks.id, id))
    .returning();

  return updated;
}
