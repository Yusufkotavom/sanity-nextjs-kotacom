#!/usr/bin/env node

/**
 * Test script for Schedule Manager
 * 
 * Tests:
 * 1. Cron expression validation
 * 2. Timezone validation
 * 3. Next run time calculation
 * 4. Schedule creation
 * 5. Schedule update
 * 6. Schedule deletion
 * 7. Schedule listing
 */

import {
  validateCronExpression,
  validateTimezone,
  calculateNextRunTime,
  createSchedule,
  updateSchedule,
  deleteSchedule,
  listSchedules,
  getSchedule,
  getDueSchedules,
} from "../lib/ai-writer/schedule-manager.ts";

let testsPassed = 0;
let testsFailed = 0;
let createdScheduleId = null;

function assert(condition, message) {
  if (condition) {
    console.log(`✓ ${message}`);
    testsPassed++;
  } else {
    console.error(`✗ ${message}`);
    testsFailed++;
  }
}

async function runTests() {
  console.log("🧪 Testing Schedule Manager\n");

  // Test 1: Cron expression validation
  console.log("Test 1: Cron Expression Validation");
  const validCron = validateCronExpression("0 9 * * *");
  assert(validCron.valid === true, "Valid cron expression accepted");

  const invalidCron = validateCronExpression("invalid cron");
  assert(invalidCron.valid === false, "Invalid cron expression rejected");
  console.log("");

  // Test 2: Timezone validation
  console.log("Test 2: Timezone Validation");
  const validTz = validateTimezone("Asia/Jakarta");
  assert(validTz.valid === true, "Valid timezone accepted");

  const invalidTz = validateTimezone("Invalid/Timezone");
  assert(invalidTz.valid === false, "Invalid timezone rejected");
  console.log("");

  // Test 3: Next run time calculation
  console.log("Test 3: Next Run Time Calculation");
  try {
    const nextRun = calculateNextRunTime("0 9 * * *", "Asia/Jakarta");
    assert(nextRun instanceof Date, "Next run time is a Date object");
    assert(nextRun > new Date(), "Next run time is in the future");
  } catch (error) {
    assert(false, `Next run time calculation failed: ${error.message}`);
  }
  console.log("");

  // Test 4: Schedule creation
  console.log("Test 4: Schedule Creation");
  try {
    const schedule = await createSchedule({
      name: "Test Schedule",
      taskType: "ai_content_generation",
      cronExpr: "0 9 * * *",
      timezone: "Asia/Jakarta",
      enabled: true,
      payload: {
        contentType: "post",
        batchSize: 5,
        autoPublish: false,
        generateOgImage: true,
      },
    });
    
    createdScheduleId = schedule.id;
    assert(schedule.id !== null, "Schedule created with ID");
    assert(schedule.name === "Test Schedule", "Schedule name matches");
    assert(schedule.nextRunAt !== null, "Next run time calculated");
  } catch (error) {
    assert(false, `Schedule creation failed: ${error.message}`);
  }
  console.log("");

  // Test 5: Schedule retrieval
  console.log("Test 5: Schedule Retrieval");
  if (createdScheduleId) {
    try {
      const schedule = await getSchedule(createdScheduleId);
      assert(schedule !== null, "Schedule retrieved by ID");
      assert(schedule.id === createdScheduleId, "Retrieved schedule ID matches");
    } catch (error) {
      assert(false, `Schedule retrieval failed: ${error.message}`);
    }
  }
  console.log("");

  // Test 6: Schedule update
  console.log("Test 6: Schedule Update");
  if (createdScheduleId) {
    try {
      const updated = await updateSchedule(createdScheduleId, {
        name: "Updated Test Schedule",
        enabled: false,
      });
      assert(updated.name === "Updated Test Schedule", "Schedule name updated");
      assert(updated.enabled === false, "Schedule disabled");
    } catch (error) {
      assert(false, `Schedule update failed: ${error.message}`);
    }
  }
  console.log("");

  // Test 7: Schedule listing
  console.log("Test 7: Schedule Listing");
  try {
    const schedules = await listSchedules({ limit: 10 });
    assert(Array.isArray(schedules), "Schedules list is an array");
    assert(schedules.length > 0, "At least one schedule exists");
  } catch (error) {
    assert(false, `Schedule listing failed: ${error.message}`);
  }
  console.log("");

  // Test 8: Due schedules query
  console.log("Test 8: Due Schedules Query");
  try {
    const dueSchedules = await getDueSchedules();
    assert(Array.isArray(dueSchedules), "Due schedules list is an array");
    // Note: May be empty if no schedules are due
  } catch (error) {
    assert(false, `Due schedules query failed: ${error.message}`);
  }
  console.log("");

  // Test 9: Schedule deletion
  console.log("Test 9: Schedule Deletion");
  if (createdScheduleId) {
    try {
      const deleted = await deleteSchedule(createdScheduleId);
      assert(deleted.enabled === false, "Schedule marked as disabled");
    } catch (error) {
      assert(false, `Schedule deletion failed: ${error.message}`);
    }
  }
  console.log("");

  // Test 10: Batch size validation
  console.log("Test 10: Batch Size Validation");
  try {
    await createSchedule({
      name: "Invalid Batch Size",
      taskType: "ai_content_generation",
      cronExpr: "0 9 * * *",
      timezone: "Asia/Jakarta",
      enabled: true,
      payload: {
        contentType: "post",
        batchSize: 100, // Invalid: > 50
        autoPublish: false,
        generateOgImage: true,
      },
    });
    assert(false, "Should reject batch size > 50");
  } catch (error) {
    assert(error.message.includes("Batch size"), "Batch size validation works");
  }
  console.log("");

  // Test 11: Content type validation
  console.log("Test 11: Content Type Validation");
  try {
    await createSchedule({
      name: "Invalid Content Type",
      taskType: "ai_content_generation",
      cronExpr: "0 9 * * *",
      timezone: "Asia/Jakarta",
      enabled: true,
      payload: {
        contentType: "invalid", // Invalid content type
        batchSize: 5,
        autoPublish: false,
        generateOgImage: true,
      },
    });
    assert(false, "Should reject invalid content type");
  } catch (error) {
    assert(error.message.includes("Content type"), "Content type validation works");
  }
  console.log("");

  // Summary
  console.log("=".repeat(50));
  console.log(`Tests passed: ${testsPassed}`);
  console.log(`Tests failed: ${testsFailed}`);
  console.log(`Total tests: ${testsPassed + testsFailed}`);
  
  if (testsFailed === 0) {
    console.log("\n✅ All tests passed!");
    process.exit(0);
  } else {
    console.log("\n❌ Some tests failed");
    process.exit(1);
  }
}

runTests().catch((error) => {
  console.error("Test suite failed:", error);
  process.exit(1);
});
