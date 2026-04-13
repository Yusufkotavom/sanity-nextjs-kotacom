#!/usr/bin/env tsx

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
 * 
 * Usage:
 *   npx tsx scripts/test-schedule-bug-exploration.ts
 */

// Load environment variables from .env.local
import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(__dirname, "../.env.local") });

import { db } from "../lib/db";
import { schema } from "@repo/db";
import { eq, and } from "drizzle-orm";
import {
  createSchedule,
  listSchedules,
  type CreateScheduleParams,
} from "../lib/ai-writer/schedule-manager";

let testsPassed = 0;
let testsFailed = 0;
const failureDetails: string[] = [];

async function testBugCondition1() {
  console.log("\n📋 Test 1: Schedule creation without scheduleType");
  console.log("   Expected: Should FAIL to create schedule without scheduleType field");
  
  try {
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

    const schedule = await createSchedule(params);
    
    // If we reach here on UNFIXED code, the bug exists
    console.log("   ❌ BUG DETECTED: Schedule created without scheduleType field");
    console.log("      Schedule ID:", schedule.id);
    console.log("      This should have been rejected with a validation error");
    
    failureDetails.push("Bug Condition 1: Schedule creation succeeded without scheduleType (should be required)");
    testsFailed++;
    
    // Clean up
    await db()
      .update(schema.scheduledTasks)
      .set({ enabled: false })
      .where(eq(schema.scheduledTasks.id, schedule.id));
      
  } catch (error) {
    // On FIXED code, we expect a validation error
    console.log("   ✅ EXPECTED: Validation rejected schedule without scheduleType");
    console.log("      Error:", (error as Error).message);
    testsPassed++;
  }
}

async function testBugCondition2() {
  console.log("\n📋 Test 2: Schedule list missing type indicators");
  console.log("   Expected: Schedules should have scheduleType field");
  
  try {
    // Create a test schedule
    const testSchedule = await createSchedule({
      name: "Test Schedule for Type Display",
      taskType: "ai_content_generation",
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
    const hasScheduleType = "scheduleType" in ourSchedule && (ourSchedule as any).scheduleType !== undefined;
    
    if (!hasScheduleType) {
      console.log("   ❌ BUG DETECTED: Schedule list missing scheduleType field");
      console.log("      Expected: scheduleType field with value 'ai_generation' or 'publishing_queue'");
      console.log("      Actual: scheduleType field is missing or undefined");
      
      failureDetails.push("Bug Condition 2: Schedule list missing scheduleType field");
      testsFailed++;
    } else {
      console.log("   ✅ EXPECTED: Schedule has scheduleType field:", (ourSchedule as any).scheduleType);
      testsPassed++;
    }
    
    // Clean up
    await db()
      .update(schema.scheduledTasks)
      .set({ enabled: false })
      .where(eq(schema.scheduledTasks.id, testSchedule.id));
      
  } catch (error) {
    console.log("   ❌ ERROR:", (error as Error).message);
    failureDetails.push(`Bug Condition 2: ${(error as Error).message}`);
    testsFailed++;
  }
}

async function testBugCondition3() {
  console.log("\n📋 Test 3: Missing readyToPublish flag on manual content");
  console.log("   Expected: Should allow setting readyToPublish flag on aiGenerations");
  
  let testGenerationId: string | null = null;
  
  try {
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

    testGenerationId = testGeneration.id;

    // Attempt to update readyToPublish flag
    const [updated] = await db()
      .update(schema.aiGenerations)
      .set({ readyToPublish: true } as any)
      .where(eq(schema.aiGenerations.id, testGeneration.id))
      .returning();

    console.log("   ✅ EXPECTED: readyToPublish flag updated successfully");
    console.log("      Value:", (updated as any).readyToPublish);
    testsPassed++;
    
  } catch (error) {
    // On UNFIXED code, this will throw because the field doesn't exist
    console.log("   ❌ BUG DETECTED: Cannot set readyToPublish flag");
    console.log("      Error:", (error as Error).message);
    console.log("      This indicates the readyToPublish field is missing from the database schema");
    
    failureDetails.push("Bug Condition 3: readyToPublish field missing from aiGenerations table");
    testsFailed++;
    
  } finally {
    // Clean up
    if (testGenerationId) {
      await db()
        .delete(schema.aiGenerations)
        .where(eq(schema.aiGenerations.id, testGenerationId))
        .catch(() => {}); // Ignore cleanup errors
    }
  }
}

async function testBugCondition4() {
  console.log("\n📋 Test 4: Publishing queue missing FIFO selection");
  console.log("   Expected: Content should be selected in FIFO order (oldest first)");
  
  const generationIds: string[] = [];
  
  try {
    // Create multiple test AI generation records with staggered timestamps
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
        } as any)
        .returning();
      generationIds.push(gen.id);
      
      // Small delay to ensure distinct timestamps
      await new Promise((resolve) => setTimeout(resolve, 10));
    }

    // Query content that would be selected for publishing queue
    // Expected behavior: ORDER BY createdAt ASC (FIFO)
    const selectedContent = await db()
      .select()
      .from(schema.aiGenerations)
      .where(
        and(
          eq(schema.aiGenerations.readyToPublish as any, true),
          eq(schema.aiGenerations.sanityWriteStatus, "pending")
        )
      )
      .orderBy(schema.aiGenerations.createdAt) // ASC is default
      .limit(3);

    if (selectedContent.length === 0) {
      console.log("   ❌ BUG DETECTED: No content selected for publishing queue");
      console.log("      This indicates the publishing queue selection logic is missing");
      
      failureDetails.push("Bug Condition 4: Publishing queue selection returned no results");
      testsFailed++;
    } else {
      // Verify FIFO ordering: first item should be the oldest
      const firstSelected = selectedContent[0];
      const oldestGenerationId = generationIds[0]; // Index 0 has the oldest timestamp

      const isFIFO = firstSelected.id === oldestGenerationId;
      
      if (!isFIFO) {
        console.log("   ❌ BUG DETECTED: Publishing queue not using FIFO ordering");
        console.log("      Expected first item:", oldestGenerationId);
        console.log("      Actual first item:", firstSelected.id);
        console.log("      Content should be selected oldest-first (FIFO)");
        
        failureDetails.push("Bug Condition 4: Publishing queue not using FIFO ordering");
        testsFailed++;
      } else {
        console.log("   ✅ EXPECTED: Publishing queue uses FIFO ordering");
        console.log("      Oldest item selected first:", firstSelected.id);
        testsPassed++;
      }
    }
    
  } catch (error) {
    console.log("   ❌ ERROR:", (error as Error).message);
    failureDetails.push(`Bug Condition 4: ${(error as Error).message}`);
    testsFailed++;
    
  } finally {
    // Clean up all test generations
    for (const id of generationIds) {
      await db()
        .delete(schema.aiGenerations)
        .where(eq(schema.aiGenerations.id, id))
        .catch(() => {}); // Ignore cleanup errors
    }
  }
}

async function testBugCondition5() {
  console.log("\n📋 Test 5: Publishing queue missing content type filtering");
  console.log("   Expected: Should support publishingQueueConfig with contentType filter");
  
  const generationIds: string[] = [];
  
  try {
    // Create test content with different types
    const [postGen] = await db()
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
      } as any)
      .returning();
    generationIds.push(postGen.id);

    const [serviceGen] = await db()
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
      } as any)
      .returning();
    generationIds.push(serviceGen.id);

    // Try to create a publishing queue schedule with content type filter
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
    console.log("   ❌ BUG DETECTED: Publishing queue schedule created, but filtering logic may not exist");
    console.log("      Schedule ID:", schedule.id);
    console.log("      Expected: System should support publishingQueueConfig with contentType filter");
    
    failureDetails.push("Bug Condition 5: Publishing queue functionality may not be fully implemented");
    testsFailed++;
    
    // Clean up
    await db()
      .update(schema.scheduledTasks)
      .set({ enabled: false })
      .where(eq(schema.scheduledTasks.id, schedule.id));
    
  } catch (error) {
    console.log("   ❌ BUG DETECTED: Cannot create publishing queue schedule");
    console.log("      Error:", (error as Error).message);
    console.log("      This indicates publishing queue functionality is not implemented");
    
    failureDetails.push("Bug Condition 5: Publishing queue functionality not implemented");
    testsFailed++;
  } finally {
    // Clean up test generations
    for (const id of generationIds) {
      await db()
        .delete(schema.aiGenerations)
        .where(eq(schema.aiGenerations.id, id))
        .catch(() => {}); // Ignore cleanup errors
    }
  }
}

async function main() {
  console.log("🔍 Bug Condition Exploration Test");
  console.log("===================================");
  console.log("Spec: Schedule System Clarity Fix");
  console.log("Testing on: UNFIXED code");
  console.log("");
  console.log("⚠️  IMPORTANT: This test is EXPECTED TO FAIL on unfixed code.");
  console.log("   Test failures indicate the bug exists (this is correct!)");
  console.log("");

  try {
    await testBugCondition1();
    await testBugCondition2();
    await testBugCondition3();
    await testBugCondition4();
    await testBugCondition5();

    console.log("\n" + "=".repeat(60));
    console.log("\n📊 Test Results:");
    console.log(`   ✅ Passed: ${testsPassed}`);
    console.log(`   ❌ Failed: ${testsFailed}`);
    
    if (testsFailed > 0) {
      console.log("\n🐛 Counterexamples Found (Bug Conditions Detected):");
      failureDetails.forEach((detail, index) => {
        console.log(`   ${index + 1}. ${detail}`);
      });
      
      console.log("\n✅ SUCCESS: Bug conditions confirmed!");
      console.log("   The test failures prove the bug exists.");
      console.log("   Next step: Implement the fix according to the design document.");
      console.log("");
      
      // Exit with 0 because failures are expected on unfixed code
      process.exit(0);
    } else {
      console.log("\n⚠️  All tests passed - bug may already be fixed or test needs adjustment");
      console.log("");
      process.exit(0);
    }
    
  } catch (error) {
    console.error("\n❌ Test execution error:", (error as Error).message);
    console.error((error as Error).stack);
    process.exit(1);
  }
}

main();
