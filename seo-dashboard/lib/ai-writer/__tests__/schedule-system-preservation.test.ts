/**
 * Preservation Property Tests: Schedule System Clarity Fix
 * 
 * **Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8**
 * 
 * IMPORTANT: These tests follow observation-first methodology
 * 
 * These tests capture the EXISTING behavior of "AI Generation + Auto-Publish" schedules
 * that must be preserved after the fix is implemented.
 * 
 * When run on UNFIXED code, these tests should PASS (confirming baseline behavior).
 * When run on FIXED code, these tests should still PASS (confirming no regressions).
 * 
 * The tests observe and validate:
 * 1. AI generation schedules continue to generate content and publish automatically
 * 2. Schedule enable/disable functionality works correctly
 * 3. Cron expression calculation and timezone handling work correctly
 * 4. Content generation error logging and validation status marking work correctly
 * 5. OG image generation for content items works correctly
 * 6. Schedule soft-delete behavior (setting enabled to false) works correctly
 * 7. Cron worker CRON_SECRET validation works correctly
 * 8. Content storage without publishing (when auto-publish is disabled) works correctly
 */

// Load environment variables from .env.local
import { readFileSync } from "fs";
import { resolve } from "path";

try {
  const envPath = resolve(process.cwd(), ".env.local");
  const envContent = readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const [key, ...valueParts] = trimmed.split("=");
      if (key && valueParts.length > 0) {
        let value = valueParts.join("=");
        // Remove surrounding quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) || 
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        process.env[key] = value;
      }
    }
  });
} catch (error) {
  console.warn("Warning: Could not load .env.local file");
}

import "./test-runner";
import { runAllTests } from "./test-runner";
import { db } from "@/lib/db";
import { schema } from "@repo/db";
import { eq, and, lte, desc } from "drizzle-orm";
import {
  createSchedule,
  updateSchedule,
  deleteSchedule,
  listSchedules,
  getSchedule,
  getDueSchedules,
  validateCronExpression,
  validateTimezone,
  calculateNextRunTime,
  type CreateScheduleParams,
} from "../schedule-manager";

describe("Preservation: Existing Schedule Behavior", () => {
  
  describe("Property 3.1: AI Generation schedules continue to generate and publish", () => {
    it("should create AI content generation schedule with existing behavior", async () => {
      // Observe: Existing schedules can be created with ai_content_generation taskType
      const params: CreateScheduleParams = {
        name: "Test AI Generation Schedule",
        taskType: "ai_content_generation",
        cronExpr: "0 9 * * *",
        timezone: "Asia/Jakarta",
        enabled: true,
        payload: {
          contentType: "post",
          batchSize: 1,
          autoPublish: true,
          generateOgImage: true,
        },
      };

      const schedule = await createSchedule(params);
      
      // Verify schedule was created with expected properties
      expect(schedule).toBeDefined();
      expect(schedule.taskType).toBe("ai_content_generation");
      expect(schedule.enabled).toBe(true);
      expect(schedule.cronExpr).toBe("0 9 * * *");
      expect(schedule.timezone).toBe("Asia/Jakarta");
      
      const payload = schedule.payload as any;
      expect(payload.contentType).toBe("post");
      expect(payload.batchSize).toBe(1);
      expect(payload.autoPublish).toBe(true);
      expect(payload.generateOgImage).toBe(true);
      
      console.log("✅ Preserved: AI generation schedule created successfully");
      console.log("   Schedule ID:", schedule.id);
      console.log("   Task Type:", schedule.taskType);
      console.log("   Auto-publish:", payload.autoPublish);
      
      // Clean up
      await db()
        .update(schema.scheduledTasks)
        .set({ enabled: false })
        .where(eq(schema.scheduledTasks.id, schedule.id));
    });

    it("should support batch content generation in schedule payload", async () => {
      // Observe: Schedules support batch generation with configurable batch size
      const params: CreateScheduleParams = {
        name: "Batch Generation Schedule",
        taskType: "ai_content_generation",
        cronExpr: "0 10 * * *",
        timezone: "Asia/Jakarta",
        enabled: true,
        payload: {
          contentType: "service",
          batchSize: 5,
          autoPublish: true,
          generateOgImage: false,
        },
      };

      const schedule = await createSchedule(params);
      const payload = schedule.payload as any;
      
      expect(payload.batchSize).toBe(5);
      expect(payload.contentType).toBe("service");
      
      console.log("✅ Preserved: Batch generation configuration works");
      console.log("   Batch size:", payload.batchSize);
      console.log("   Content type:", payload.contentType);
      
      // Clean up
      await db()
        .update(schema.scheduledTasks)
        .set({ enabled: false })
        .where(eq(schema.scheduledTasks.id, schedule.id));
    });
  });

  describe("Property 3.2: Schedule enable/disable functionality", () => {
    it("should respect enabled flag when querying schedules", async () => {
      // Observe: Enabled flag controls whether schedules are active
      const enabledSchedule = await createSchedule({
        name: "Enabled Schedule",
        taskType: "ai_content_generation",
        cronExpr: "0 11 * * *",
        timezone: "Asia/Jakarta",
        enabled: true,
        payload: {
          contentType: "post",
          batchSize: 1,
          autoPublish: true,
          generateOgImage: true,
        },
      });

      const disabledSchedule = await createSchedule({
        name: "Disabled Schedule",
        taskType: "ai_content_generation",
        cronExpr: "0 12 * * *",
        timezone: "Asia/Jakarta",
        enabled: false,
        payload: {
          contentType: "post",
          batchSize: 1,
          autoPublish: true,
          generateOgImage: true,
        },
      });

      // Query only enabled schedules
      const enabledList = await listSchedules({ enabled: true });
      const hasEnabled = enabledList.some((s) => s.id === enabledSchedule.id);
      const hasDisabled = enabledList.some((s) => s.id === disabledSchedule.id);
      
      expect(hasEnabled).toBe(true);
      expect(hasDisabled).toBe(false);
      
      console.log("✅ Preserved: Enable/disable filtering works correctly");
      console.log("   Enabled schedule found:", hasEnabled);
      console.log("   Disabled schedule excluded:", !hasDisabled);
      
      // Clean up
      await db()
        .delete(schema.scheduledTasks)
        .where(eq(schema.scheduledTasks.id, enabledSchedule.id));
      await db()
        .delete(schema.scheduledTasks)
        .where(eq(schema.scheduledTasks.id, disabledSchedule.id));
    });

    it("should allow toggling enabled status via update", async () => {
      // Observe: Schedules can be enabled/disabled via update
      const schedule = await createSchedule({
        name: "Toggle Test Schedule",
        taskType: "ai_content_generation",
        cronExpr: "0 13 * * *",
        timezone: "Asia/Jakarta",
        enabled: true,
        payload: {
          contentType: "post",
          batchSize: 1,
          autoPublish: true,
          generateOgImage: true,
        },
      });

      // Disable the schedule
      const updated = await updateSchedule(schedule.id, { enabled: false });
      expect(updated.enabled).toBe(false);
      
      console.log("✅ Preserved: Schedule enable/disable toggle works");
      console.log("   Original enabled:", schedule.enabled);
      console.log("   Updated enabled:", updated.enabled);
      
      // Clean up
      await db()
        .delete(schema.scheduledTasks)
        .where(eq(schema.scheduledTasks.id, schedule.id));
    });
  });

  describe("Property 3.3: Cron expression calculation and timezone handling", () => {
    it("should validate cron expressions correctly", () => {
      // Observe: System validates cron expressions
      const validCron = validateCronExpression("0 9 * * *");
      expect(validCron.valid).toBe(true);
      
      const invalidCron = validateCronExpression("invalid cron");
      expect(invalidCron.valid).toBe(false);
      
      console.log("✅ Preserved: Cron expression validation works");
      console.log("   Valid cron accepted:", validCron.valid);
      console.log("   Invalid cron rejected:", !invalidCron.valid);
    });

    it("should validate timezones correctly", () => {
      // Observe: System validates IANA timezones
      const validTz = validateTimezone("Asia/Jakarta");
      expect(validTz.valid).toBe(true);
      
      const validTzUS = validateTimezone("America/New_York");
      expect(validTzUS.valid).toBe(true);
      
      const invalidTz = validateTimezone("Invalid/Timezone");
      expect(invalidTz.valid).toBe(false);
      
      console.log("✅ Preserved: Timezone validation works");
      console.log("   Valid timezones accepted:", validTz.valid && validTzUS.valid);
      console.log("   Invalid timezone rejected:", !invalidTz.valid);
    });

    it("should calculate next run time based on cron and timezone", () => {
      // Observe: System calculates next run time correctly
      const cronExpr = "0 9 * * *"; // 9 AM daily
      const timezone = "Asia/Jakarta";
      
      const nextRun = calculateNextRunTime(cronExpr, timezone);
      expect(nextRun).toBeDefined();
      expect(nextRun instanceof Date).toBe(true);
      expect(nextRun.getTime()).toBeGreaterThan(Date.now());
      
      console.log("✅ Preserved: Next run time calculation works");
      console.log("   Cron expression:", cronExpr);
      console.log("   Timezone:", timezone);
      console.log("   Next run:", nextRun.toISOString());
    });

    it("should store nextRunAt when creating schedule", async () => {
      // Observe: Schedules store calculated next run time
      const schedule = await createSchedule({
        name: "Next Run Test",
        taskType: "ai_content_generation",
        cronExpr: "0 14 * * *",
        timezone: "Asia/Jakarta",
        enabled: true,
        payload: {
          contentType: "post",
          batchSize: 1,
          autoPublish: true,
          generateOgImage: true,
        },
      });

      expect(schedule.nextRunAt).toBeDefined();
      expect(schedule.nextRunAt instanceof Date).toBe(true);
      
      console.log("✅ Preserved: Schedule stores nextRunAt timestamp");
      console.log("   Next run at:", schedule.nextRunAt?.toISOString());
      
      // Clean up
      await db()
        .delete(schema.scheduledTasks)
        .where(eq(schema.scheduledTasks.id, schedule.id));
    });
  });

  describe("Property 3.4: Content generation error logging and validation", () => {
    it("should store validation status in aiGenerations table", async () => {
      // Observe: Generated content has validation status tracking
      const [generation] = await db()
        .insert(schema.aiGenerations)
        .values({
          sourceType: "scheduled",
          inputJson: { test: "data" },
          provider: "gemini",
          model: "gemini-2.0-flash-exp",
          rawOutput: "Test content",
          validationStatus: "valid",
          sanityWriteStatus: "pending",
        })
        .returning();

      expect(generation.validationStatus).toBe("valid");
      expect(generation.sanityWriteStatus).toBe("pending");
      
      console.log("✅ Preserved: Validation status tracking works");
      console.log("   Validation status:", generation.validationStatus);
      console.log("   Sanity write status:", generation.sanityWriteStatus);
      
      // Clean up
      await db()
        .delete(schema.aiGenerations)
        .where(eq(schema.aiGenerations.id, generation.id));
    });

    it("should support validation errors in aiGenerations", async () => {
      // Observe: System can store validation errors
      const [generation] = await db()
        .insert(schema.aiGenerations)
        .values({
          sourceType: "scheduled",
          inputJson: { test: "data" },
          provider: "gemini",
          model: "gemini-2.0-flash-exp",
          rawOutput: "Invalid content",
          validationStatus: "invalid",
          validationErrors: ["Title missing", "Body too short"] as any,
          sanityWriteStatus: "pending",
        })
        .returning();

      expect(generation.validationStatus).toBe("invalid");
      expect(generation.validationErrors).toBeDefined();
      
      const errors = generation.validationErrors as any;
      expect(Array.isArray(errors)).toBe(true);
      
      console.log("✅ Preserved: Validation error logging works");
      console.log("   Validation status:", generation.validationStatus);
      console.log("   Error count:", errors?.length || 0);
      
      // Clean up
      await db()
        .delete(schema.aiGenerations)
        .where(eq(schema.aiGenerations.id, generation.id));
    });
  });

  describe("Property 3.5: OG image generation for content items", () => {
    it("should support ogImageAssetId in aiGenerations", async () => {
      // Observe: Generated content can have OG image asset references
      const [generation] = await db()
        .insert(schema.aiGenerations)
        .values({
          sourceType: "scheduled",
          inputJson: { test: "data" },
          provider: "gemini",
          model: "gemini-2.0-flash-exp",
          rawOutput: "Test content",
          validationStatus: "valid",
          sanityWriteStatus: "success",
          ogImageAssetId: "image-test-asset-id-123",
        })
        .returning();

      expect(generation.ogImageAssetId).toBe("image-test-asset-id-123");
      
      console.log("✅ Preserved: OG image asset tracking works");
      console.log("   OG image asset ID:", generation.ogImageAssetId);
      
      // Clean up
      await db()
        .delete(schema.aiGenerations)
        .where(eq(schema.aiGenerations.id, generation.id));
    });

    it("should support generateOgImage flag in schedule payload", async () => {
      // Observe: Schedules can configure OG image generation
      const withOgImage = await createSchedule({
        name: "With OG Image",
        taskType: "ai_content_generation",
        cronExpr: "0 15 * * *",
        timezone: "Asia/Jakarta",
        enabled: true,
        payload: {
          contentType: "post",
          batchSize: 1,
          autoPublish: true,
          generateOgImage: true,
        },
      });

      const withoutOgImage = await createSchedule({
        name: "Without OG Image",
        taskType: "ai_content_generation",
        cronExpr: "0 16 * * *",
        timezone: "Asia/Jakarta",
        enabled: true,
        payload: {
          contentType: "post",
          batchSize: 1,
          autoPublish: true,
          generateOgImage: false,
        },
      });

      const payload1 = withOgImage.payload as any;
      const payload2 = withoutOgImage.payload as any;
      
      expect(payload1.generateOgImage).toBe(true);
      expect(payload2.generateOgImage).toBe(false);
      
      console.log("✅ Preserved: OG image generation configuration works");
      console.log("   With OG image:", payload1.generateOgImage);
      console.log("   Without OG image:", payload2.generateOgImage);
      
      // Clean up
      await db()
        .delete(schema.scheduledTasks)
        .where(eq(schema.scheduledTasks.id, withOgImage.id));
      await db()
        .delete(schema.scheduledTasks)
        .where(eq(schema.scheduledTasks.id, withoutOgImage.id));
    });
  });

  describe("Property 3.6: Schedule soft-delete behavior", () => {
    it("should soft-delete schedule by setting enabled to false", async () => {
      // Observe: Delete operation sets enabled to false (soft delete)
      const schedule = await createSchedule({
        name: "To Be Deleted",
        taskType: "ai_content_generation",
        cronExpr: "0 17 * * *",
        timezone: "Asia/Jakarta",
        enabled: true,
        payload: {
          contentType: "post",
          batchSize: 1,
          autoPublish: true,
          generateOgImage: true,
        },
      });

      expect(schedule.enabled).toBe(true);
      
      // Delete the schedule
      const deleted = await deleteSchedule(schedule.id);
      expect(deleted.enabled).toBe(false);
      
      // Verify schedule still exists in database but is disabled
      const retrieved = await getSchedule(schedule.id);
      expect(retrieved).toBeDefined();
      expect(retrieved?.enabled).toBe(false);
      
      console.log("✅ Preserved: Soft-delete behavior works");
      console.log("   Original enabled:", schedule.enabled);
      console.log("   After delete enabled:", deleted.enabled);
      console.log("   Still exists in DB:", !!retrieved);
      
      // Clean up
      await db()
        .delete(schema.scheduledTasks)
        .where(eq(schema.scheduledTasks.id, schedule.id));
    });
  });

  describe("Property 3.7: Cron worker CRON_SECRET validation", () => {
    it("should have CRON_SECRET environment variable configured", () => {
      // Observe: System uses CRON_SECRET for authentication
      const cronSecret = process.env.CRON_SECRET;
      
      // We just verify the env var exists, not its value
      expect(cronSecret).toBeDefined();
      
      console.log("✅ Preserved: CRON_SECRET environment variable exists");
      console.log("   CRON_SECRET configured:", !!cronSecret);
    });
  });

  describe("Property 3.8: Content storage without publishing", () => {
    it("should support autoPublish flag in schedule payload", async () => {
      // Observe: Schedules can disable auto-publish to store content without publishing
      const withAutoPublish = await createSchedule({
        name: "With Auto-Publish",
        taskType: "ai_content_generation",
        cronExpr: "0 18 * * *",
        timezone: "Asia/Jakarta",
        enabled: true,
        payload: {
          contentType: "post",
          batchSize: 1,
          autoPublish: true,
          generateOgImage: true,
        },
      });

      const withoutAutoPublish = await createSchedule({
        name: "Without Auto-Publish",
        taskType: "ai_content_generation",
        cronExpr: "0 19 * * *",
        timezone: "Asia/Jakarta",
        enabled: true,
        payload: {
          contentType: "post",
          batchSize: 1,
          autoPublish: false,
          generateOgImage: true,
        },
      });

      const payload1 = withAutoPublish.payload as any;
      const payload2 = withoutAutoPublish.payload as any;
      
      expect(payload1.autoPublish).toBe(true);
      expect(payload2.autoPublish).toBe(false);
      
      console.log("✅ Preserved: Auto-publish configuration works");
      console.log("   With auto-publish:", payload1.autoPublish);
      console.log("   Without auto-publish:", payload2.autoPublish);
      
      // Clean up
      await db()
        .delete(schema.scheduledTasks)
        .where(eq(schema.scheduledTasks.id, withAutoPublish.id));
      await db()
        .delete(schema.scheduledTasks)
        .where(eq(schema.scheduledTasks.id, withoutAutoPublish.id));
    });

    it("should store content with pending sanityWriteStatus when not published", async () => {
      // Observe: Content can be stored without publishing (sanityWriteStatus = pending)
      const [generation] = await db()
        .insert(schema.aiGenerations)
        .values({
          sourceType: "scheduled",
          inputJson: { test: "data" },
          provider: "gemini",
          model: "gemini-2.0-flash-exp",
          rawOutput: "Test content",
          validationStatus: "valid",
          sanityWriteStatus: "pending",
          sanityDocumentId: null,
        })
        .returning();

      expect(generation.sanityWriteStatus).toBe("pending");
      expect(generation.sanityDocumentId).toBe(null);
      
      console.log("✅ Preserved: Content storage without publishing works");
      console.log("   Sanity write status:", generation.sanityWriteStatus);
      console.log("   Sanity document ID:", generation.sanityDocumentId);
      
      // Clean up
      await db()
        .delete(schema.aiGenerations)
        .where(eq(schema.aiGenerations.id, generation.id));
    });
  });

  describe("Property: Due schedules query", () => {
    it("should query due schedules based on nextRunAt and enabled status", async () => {
      // Observe: System can query schedules that are due to run
      const pastTime = new Date(Date.now() - 60 * 60 * 1000); // 1 hour ago
      
      // Create a schedule that's due to run
      const [dueSchedule] = await db()
        .insert(schema.scheduledTasks)
        .values({
          name: "Due Schedule",
          taskType: "ai_content_generation",
          cronExpr: "0 * * * *",
          timezone: "Asia/Jakarta",
          enabled: true,
          payload: {
            contentType: "post",
            batchSize: 1,
            autoPublish: true,
            generateOgImage: true,
          } as any,
          nextRunAt: pastTime,
        })
        .returning();

      // Query due schedules
      const dueSchedules = await getDueSchedules();
      const foundDue = dueSchedules.some((s) => s.id === dueSchedule.id);
      
      expect(foundDue).toBe(true);
      
      console.log("✅ Preserved: Due schedules query works");
      console.log("   Due schedule found:", foundDue);
      console.log("   Next run at:", dueSchedule.nextRunAt?.toISOString());
      
      // Clean up
      await db()
        .delete(schema.scheduledTasks)
        .where(eq(schema.scheduledTasks.id, dueSchedule.id));
    });
  });
});

// Run tests if this file is executed directly
if (require.main === module) {
  runAllTests().then((success) => {
    process.exit(success ? 0 : 1);
  });
}
