#!/usr/bin/env node

/**
 * Test script for Cron Execution
 * 
 * Tests the scheduled task execution by:
 * 1. Creating a test schedule
 * 2. Triggering cron execution
 * 3. Checking job run results
 */

import { createSchedule, getDueSchedules } from "../lib/ai-writer/schedule-manager.ts";

async function testCronExecution() {
  console.log("🧪 Testing Cron Execution\n");

  try {
    // Step 1: Create a test schedule that's due now
    console.log("Step 1: Creating test schedule...");
    const schedule = await createSchedule({
      name: "Test Cron Schedule",
      taskType: "ai_content_generation",
      cronExpr: "* * * * *", // Every minute
      timezone: "Asia/Jakarta",
      enabled: true,
      payload: {
        contentType: "post",
        batchSize: 2,
        autoPublish: false,
        generateOgImage: true,
        customPrompt: "Write a short blog post about the benefits of automated content generation.",
      },
    });
    
    console.log(`✓ Schedule created: ${schedule.id}`);
    console.log(`  Next run: ${schedule.nextRunAt}`);

    // Step 2: Check due schedules
    console.log("\nStep 2: Checking due schedules...");
    const dueSchedules = await getDueSchedules();
    console.log(`✓ Found ${dueSchedules.length} due schedule(s)`);

    // Step 3: Trigger cron execution
    console.log("\nStep 3: Triggering cron execution...");
    const cronSecret = process.env.CRON_SECRET || "test-secret";
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    
    const response = await fetch(`${baseUrl}/api/internal/cron-run`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-cron-secret": cronSecret,
      },
      body: JSON.stringify({ type: "run-scheduled" }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("✓ Cron execution triggered successfully");
      console.log("  Result:", JSON.stringify(result, null, 2));
    } else {
      console.error("✗ Cron execution failed:", response.status, response.statusText);
      const error = await response.text();
      console.error("  Error:", error);
    }

    // Step 4: Wait a bit for processing
    console.log("\nStep 4: Waiting for processing (10 seconds)...");
    await new Promise(resolve => setTimeout(resolve, 10000));

    // Step 5: Check job runs
    console.log("\nStep 5: Checking job runs...");
    const { db } = await import("../lib/db.ts");
    const { jobRuns } = await import("@repo/db/schema");
    const { eq, desc } = await import("drizzle-orm");
    
    const recentRuns = await db()
      .select()
      .from(jobRuns)
      .where(eq(jobRuns.taskId, schedule.id))
      .orderBy(desc(jobRuns.createdAt))
      .limit(5);

    console.log(`✓ Found ${recentRuns.length} job run(s)`);
    for (const run of recentRuns) {
      console.log(`  - Job ${run.id}:`);
      console.log(`    Status: ${run.status}`);
      console.log(`    Started: ${run.startedAt}`);
      console.log(`    Finished: ${run.finishedAt}`);
      if (run.result) {
        console.log(`    Result:`, JSON.stringify(run.result, null, 2));
      }
      if (run.errorMessage) {
        console.log(`    Error: ${run.errorMessage}`);
      }
    }

    console.log("\n✅ Test completed!");
    console.log("\nNote: Check the database for generated content in aiGenerations table");
    console.log("Schedule ID:", schedule.id);

  } catch (error) {
    console.error("\n❌ Test failed:", error);
    process.exit(1);
  }
}

testCronExecution();
