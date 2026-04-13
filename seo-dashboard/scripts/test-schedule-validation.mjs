/**
 * Test script to verify schedule type validation in schedule creation
 */

import { createSchedule, deleteSchedule } from "../lib/ai-writer/schedule-manager.js";

console.log("🧪 Testing Schedule Type Validation\n");

// Test 1: Create schedule without scheduleType (should fail)
console.log("Test 1: Create schedule without scheduleType");
try {
  await createSchedule({
    name: "Test Schedule",
    taskType: "ai_content_generation",
    cronExpr: "0 10 * * *",
    timezone: "Asia/Jakarta",
    enabled: true,
    payload: {
      contentType: "post",
      batchSize: 1,
      autoPublish: false,
      generateOgImage: true,
    },
  });
  console.log("❌ FAILED: Schedule created without scheduleType (should have been rejected)\n");
} catch (error) {
  console.log("✅ PASSED: Validation rejected schedule without scheduleType");
  console.log(`   Error: ${error.message}\n`);
}

// Test 2: Create schedule with invalid scheduleType (should fail)
console.log("Test 2: Create schedule with invalid scheduleType");
try {
  await createSchedule({
    name: "Test Schedule",
    taskType: "ai_content_generation",
    scheduleType: "invalid_type",
    cronExpr: "0 10 * * *",
    timezone: "Asia/Jakarta",
    enabled: true,
    payload: {
      contentType: "post",
      batchSize: 1,
      autoPublish: false,
      generateOgImage: true,
    },
  });
  console.log("❌ FAILED: Schedule created with invalid scheduleType (should have been rejected)\n");
} catch (error) {
  console.log("✅ PASSED: Validation rejected invalid scheduleType");
  console.log(`   Error: ${error.message}\n`);
}

// Test 3: Create AI generation schedule without required payload fields (should fail)
console.log("Test 3: Create AI generation schedule without contentType");
try {
  await createSchedule({
    name: "Test Schedule",
    taskType: "ai_content_generation",
    scheduleType: "ai_generation",
    cronExpr: "0 10 * * *",
    timezone: "Asia/Jakarta",
    enabled: true,
    payload: {
      batchSize: 1,
      autoPublish: false,
      generateOgImage: true,
    },
  });
  console.log("❌ FAILED: AI generation schedule created without contentType (should have been rejected)\n");
} catch (error) {
  console.log("✅ PASSED: Validation rejected AI generation schedule without contentType");
  console.log(`   Error: ${error.message}\n`);
}

// Test 4: Create publishing queue schedule without publishingQueueConfig (should fail)
console.log("Test 4: Create publishing queue schedule without publishingQueueConfig");
try {
  await createSchedule({
    name: "Test Schedule",
    taskType: "ai_content_generation",
    scheduleType: "publishing_queue",
    cronExpr: "0 10 * * *",
    timezone: "Asia/Jakarta",
    enabled: true,
    payload: {
      contentType: "post",
      batchSize: 1,
    },
  });
  console.log("❌ FAILED: Publishing queue schedule created without publishingQueueConfig (should have been rejected)\n");
} catch (error) {
  console.log("✅ PASSED: Validation rejected publishing queue schedule without publishingQueueConfig");
  console.log(`   Error: ${error.message}\n`);
}

// Test 5: Create valid AI generation schedule (should succeed)
console.log("Test 5: Create valid AI generation schedule");
try {
  const schedule = await createSchedule({
    name: "Valid AI Generation Schedule",
    taskType: "ai_content_generation",
    scheduleType: "ai_generation",
    cronExpr: "0 10 * * *",
    timezone: "Asia/Jakarta",
    enabled: true,
    payload: {
      contentType: "post",
      batchSize: 1,
      autoPublish: false,
      generateOgImage: true,
    },
  });
  console.log("✅ PASSED: Valid AI generation schedule created successfully");
  console.log(`   Schedule ID: ${schedule.id}`);
  console.log(`   Schedule Type: ${schedule.scheduleType}\n`);
  
  // Clean up
  await deleteSchedule(schedule.id);
} catch (error) {
  console.log("❌ FAILED: Valid AI generation schedule was rejected");
  console.log(`   Error: ${error.message}\n`);
}

// Test 6: Create valid publishing queue schedule (should succeed)
console.log("Test 6: Create valid publishing queue schedule");
try {
  const schedule = await createSchedule({
    name: "Valid Publishing Queue Schedule",
    taskType: "ai_content_generation",
    scheduleType: "publishing_queue",
    cronExpr: "0 11 * * *",
    timezone: "Asia/Jakarta",
    enabled: true,
    payload: {
      publishingQueueConfig: {
        contentType: "post",
        batchSize: 5,
      },
    },
  });
  console.log("✅ PASSED: Valid publishing queue schedule created successfully");
  console.log(`   Schedule ID: ${schedule.id}`);
  console.log(`   Schedule Type: ${schedule.scheduleType}\n`);
  
  // Clean up
  await deleteSchedule(schedule.id);
} catch (error) {
  console.log("❌ FAILED: Valid publishing queue schedule was rejected");
  console.log(`   Error: ${error.message}\n`);
}

console.log("✅ All validation tests completed!");
