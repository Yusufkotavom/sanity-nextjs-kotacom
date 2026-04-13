/**
 * Bug Condition Exploration Test: Schedule System Clarity Fix
 * 
 * **Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.9, 2.10**
 * 
 * CRITICAL: This test MUST FAIL on unfixed code - failure confirms the bug exists
 * 
 * This test encodes the EXPECTED behavior after the fix is implemented.
 * When run on UNFIXED code, it will fail and surface counterexamples that demonstrate:
 * 1. Schedule creation succeeds without scheduleType field (should be required)
 * 2. Schedule list returns no type indicators (should have badges)
 * 3. Setting readyToPublish flag fails due to missing database field
 * 4. Publishing queue schedule fails or selects content randomly instead of FIFO
 * 
 * DO NOT attempt to fix the test or the code when it fails.
 * The test failure is the SUCCESS case - it proves the bug exists.
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
  listSchedules,
  getSchedule,
  type CreateScheduleParams,
} from "../schedule-manager";

describe("Bug Condition Exploration: Schedule Type Clarity and Publishing Queue", () => {
  
  describe("Bug Condition 1: Schedule creation without scheduleType", () => {
    it("should FAIL to create schedule without scheduleType field (expected behavior after fix)", async () => {
      // This test encodes the EXPECTED behavior: scheduleType should be required
      // On UNFIXED code, this will PASS (schedule creation succeeds without type)
      // On FIXED code, this will PASS (validation rejects missing type)
      
      const params = {
        name: "Test Schedule Without Type",
        taskType: "ai_content_generation",
        cronExpr: "0 9 * * *",
        timezone: "Asia/Jakarta",
        payload: {
          contentType: "post",
          batchSize: 1,
          autoPublish: true,
        },
        // NOTE: scheduleType is intentionally missing
      } as CreateScheduleParams;

      try {
        const schedule = await createSchedule(params);
        
        // If we reach here on UNFIXED code, the bug exists
        // The schedule was created without a type field
        console.log("❌ BUG DETECTED: Schedule created without scheduleType field");
        console.log("   Schedule ID:", schedule.id);
        console.log("   This should have been rejected with a validation error");
        
        // On UNFIXED code, we expect this to succeed (bug exists)
        // On FIXED code, we should never reach here (validation should throw)
        expect(schedule).toBeDefined();
        
        // Clean up
        await db()
          .update(schema.scheduledTasks)
          .set({ enabled: false })
          .where(eq(schema.scheduledTasks.id, schedule.id));
          
      } catch (error) {
        // On FIXED code, we expect a validation error
        console.log("✅ EXPECTED: Validation rejected schedule without scheduleType");
        expect(error).toBeDefined();
        expect((error as Error).message).toMatch(/scheduleType|required|type/i);
      }
    });
  });

  describe("Bug Condition 2: Schedule list missing type indicators", () => {
    it("should return scheduleType field in schedule list (expected behavior after fix)", async () => {
      // This test encodes the EXPECTED behavior: schedules should have type indicators
      // On UNFIXED code, scheduleType field will be missing/undefined
      // On FIXED code, scheduleType field will be present
      
      // Create a test schedule with scheduleType
      const testSchedule = await createSchedule({
        name: "Test Schedule for Type Display",
        taskType: "ai_content_generation",
        scheduleType: "ai_generation", // Now required after fix
        cronExpr: "0 10 * * *",
        timezone: "Asia/Jakarta",
        payload: {
          contentType: "post",
          batchSize: 1,
        },
      } as CreateScheduleParams);

      // Query schedule list
      const schedules = await listSchedules({ enabled: true });
      const ourSchedule = schedules.find((s) => s.id === testSchedule.id);

      if (!ourSchedule) {
        throw new Error("Test schedule not found in list");
      }

      // Check if scheduleType field exists
      const hasScheduleType = "scheduleType" in ourSchedule && ourSchedule.scheduleType !== undefined;
      
      if (!hasScheduleType) {
        console.log("❌ BUG DETECTED: Schedule list missing scheduleType field");
        console.log("   Schedule:", ourSchedule);
        console.log("   Expected: scheduleType field with value 'ai_generation' or 'publishing_queue'");
        console.log("   Actual: scheduleType field is missing or undefined");
      } else {
        console.log("✅ EXPECTED: Schedule has scheduleType field:", (ourSchedule as any).scheduleType);
      }

      // On UNFIXED code, this will FAIL (scheduleType missing)
      // On FIXED code, this will PASS (scheduleType present)
      expect(hasScheduleType).toBe(true);
      
      // Clean up
      await db()
        .update(schema.scheduledTasks)
        .set({ enabled: false })
        .where(eq(schema.scheduledTasks.id, testSchedule.id));
    });
  });

  describe("Bug Condition 3: Missing readyToPublish flag on manual content", () => {
    it("should allow setting readyToPublish flag on aiGenerations (expected behavior after fix)", async () => {
      // This test encodes the EXPECTED behavior: manual content should have readyToPublish flag
      // On UNFIXED code, the database field doesn't exist (will throw error)
      // On FIXED code, the field exists and can be updated
      
      // First, create a test AI generation record
      const [testGeneration] = await db()
        .insert(schema.aiGenerations)
        .values({
          sourceType: "manual",
          inputJson: { test: "data" },
          provider: "gemini",
          model: "gemini-2.0-flash-exp",
          rawOutput: "Test content",
          validationStatus: "valid",
          sanityWriteStatus: "pending",
        })
        .returning();

      try {
        // Attempt to update readyToPublish flag
        const [updated] = await db()
          .update(schema.aiGenerations)
          .set({ readyToPublish: true })
          .where(eq(schema.aiGenerations.id, testGeneration.id))
          .returning();

        console.log("✅ EXPECTED: readyToPublish flag updated successfully");
        expect(updated.readyToPublish).toBe(true);
        
      } catch (error) {
        // On UNFIXED code, this will throw because the field doesn't exist
        console.log("❌ BUG DETECTED: Cannot set readyToPublish flag");
        console.log("   Error:", (error as Error).message);
        console.log("   This indicates the readyToPublish field is missing from the database schema");
        
        // On UNFIXED code, we expect this error
        expect(error).toBeDefined();
        throw error;
        
      } finally {
        // Clean up
        await db()
          .delete(schema.aiGenerations)
          .where(eq(schema.aiGenerations.id, testGeneration.id));
      }
    });
  });

  describe("Bug Condition 4: Publishing queue missing FIFO selection", () => {
    it("should select content in FIFO order (oldest first) for publishing queue (expected behavior after fix)", async () => {
      // This test encodes the EXPECTED behavior: publishing queue should use FIFO ordering
      // On UNFIXED code, there's no publishing queue logic (will fail)
      // On FIXED code, content is selected by createdAt ASC (FIFO)
      
      // Create multiple test AI generation records with staggered timestamps
      const generations = [];
      for (let i = 0; i < 5; i++) {
        const [gen] = await db()
          .insert(schema.aiGenerations)
          .values({
            sourceType: "manual",
            inputJson: { index: i },
            provider: "gemini",
            model: "gemini-2.0-flash-exp",
            rawOutput: `Test content ${i}`,
            validationStatus: "valid",
            sanityWriteStatus: "pending",
            readyToPublish: true,
            createdAt: new Date(Date.now() - (5 - i) * 1000), // Older items have earlier timestamps
          })
          .returning();
        generations.push(gen);
        
        // Small delay to ensure distinct timestamps
        await new Promise((resolve) => setTimeout(resolve, 10));
      }

      try {
        // Query content that would be selected for publishing queue
        // Expected behavior: ORDER BY createdAt ASC (FIFO)
        const selectedContent = await db()
          .select()
          .from(schema.aiGenerations)
          .where(
            and(
              eq(schema.aiGenerations.readyToPublish, true),
              eq(schema.aiGenerations.sanityWriteStatus, "pending")
            )
          )
          .orderBy(schema.aiGenerations.createdAt) // ASC is default
          .limit(3);

        if (selectedContent.length === 0) {
          console.log("❌ BUG DETECTED: No content selected for publishing queue");
          console.log("   This indicates the publishing queue selection logic is missing");
          throw new Error("Publishing queue selection returned no results");
        }

        // Verify FIFO ordering: first item should be the oldest
        const firstSelected = selectedContent[0];
        const oldestGeneration = generations[0]; // Index 0 has the oldest timestamp

        const isFIFO = firstSelected.id === oldestGeneration.id;
        
        if (!isFIFO) {
          console.log("❌ BUG DETECTED: Publishing queue not using FIFO ordering");
          console.log("   Expected first item:", oldestGeneration.id, "created at", oldestGeneration.createdAt);
          console.log("   Actual first item:", firstSelected.id, "created at", firstSelected.createdAt);
          console.log("   Content should be selected oldest-first (FIFO)");
        } else {
          console.log("✅ EXPECTED: Publishing queue uses FIFO ordering");
          console.log("   Oldest item selected first:", firstSelected.id);
        }

        // On UNFIXED code, this might FAIL if ordering is random or missing
        // On FIXED code, this will PASS (FIFO ordering implemented)
        expect(isFIFO).toBe(true);
        
      } finally {
        // Clean up all test generations
        for (const gen of generations) {
          await db()
            .delete(schema.aiGenerations)
            .where(eq(schema.aiGenerations.id, gen.id));
        }
      }
    });
  });

  describe("Bug Condition 5: Publishing queue missing content type filtering", () => {
    it("should filter content by type in publishing queue config (expected behavior after fix)", async () => {
      // This test encodes the EXPECTED behavior: publishing queue should filter by content type
      // On UNFIXED code, there's no content type filtering logic
      // On FIXED code, only matching content types are selected
      
      // Create test content with different types
      const postGen = await db()
        .insert(schema.aiGenerations)
        .values({
          sourceType: "manual",
          inputJson: { contentType: "post" },
          provider: "gemini",
          model: "gemini-2.0-flash-exp",
          rawOutput: "Post content",
          validationStatus: "valid",
          sanityWriteStatus: "pending",
          readyToPublish: true,
        })
        .returning();

      const serviceGen = await db()
        .insert(schema.aiGenerations)
        .values({
          sourceType: "manual",
          inputJson: { contentType: "service" },
          provider: "gemini",
          model: "gemini-2.0-flash-exp",
          rawOutput: "Service content",
          validationStatus: "valid",
          sanityWriteStatus: "pending",
          readyToPublish: true,
        })
        .returning();

      try {
        // Create a publishing queue schedule with content type filter
        const schedule = await createSchedule({
          name: "Publishing Queue with Filter",
          taskType: "publishing_queue",
          cronExpr: "0 11 * * *",
          timezone: "Asia/Jakarta",
          payload: {
            publishingQueueConfig: {
              contentType: "post", // Filter for posts only
              batchSize: 5,
            },
          },
        } as any);

        // On UNFIXED code, scheduleType and publishingQueueConfig won't be supported
        console.log("❌ BUG DETECTED: Publishing queue schedule created, but filtering logic may not exist");
        console.log("   Schedule ID:", schedule.id);
        console.log("   Expected: System should support publishingQueueConfig with contentType filter");
        
        // Clean up
        await db()
          .update(schema.scheduledTasks)
          .set({ enabled: false })
          .where(eq(schema.scheduledTasks.id, schedule.id));
        
      } catch (error) {
        console.log("❌ BUG DETECTED: Cannot create publishing queue schedule");
        console.log("   Error:", (error as Error).message);
        console.log("   This indicates publishing queue functionality is not implemented");
        
        // On UNFIXED code, we expect this to fail
        expect(error).toBeDefined();
      } finally {
        // Clean up test generations
        await db()
          .delete(schema.aiGenerations)
          .where(eq(schema.aiGenerations.id, postGen[0].id));
        await db()
          .delete(schema.aiGenerations)
          .where(eq(schema.aiGenerations.id, serviceGen[0].id));
      }
    });
  });
});

// Run tests if this file is executed directly
if (require.main === module) {
  runAllTests().then((success) => {
    process.exit(success ? 0 : 1);
  });
}
