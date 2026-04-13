#!/usr/bin/env node

/**
 * Simple test script for AI Content Scheduler (uses internal endpoint, no auth required)
 * 
 * Usage:
 *   node scripts/test-ai-scheduler-simple.mjs
 */

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

async function runTests() {
  console.log("🚀 AI Content Scheduler Test Suite");
  console.log("===================================");
  console.log(`Testing against: ${BASE_URL}\n`);

  try {
    console.log("Running comprehensive tests...\n");
    
    const response = await fetch(`${BASE_URL}/api/internal/test-ai-scheduler`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "test-all" }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("❌ Test request failed:", error);
      process.exit(1);
    }

    const results = await response.json();

    // Display results
    console.log("Test Results:");
    console.log("=============\n");

    for (const test of results.tests) {
      const icon = test.status === "passed" ? "✅" : "❌";
      console.log(`${icon} ${test.name}`);
      
      if (test.data) {
        console.log(`   Data:`, JSON.stringify(test.data, null, 2).split('\n').join('\n   '));
      }
      
      if (test.error) {
        console.log(`   Error: ${test.error}`);
      }
      
      console.log();
    }

    // Display summary
    console.log("Summary:");
    console.log("========");
    console.log(`Total:  ${results.summary.total}`);
    console.log(`Passed: ${results.summary.passed} ✅`);
    console.log(`Failed: ${results.summary.failed} ❌`);
    console.log();

    if (results.summary.success) {
      console.log("🎉 All tests passed!");
      process.exit(0);
    } else {
      console.log("⚠️  Some tests failed");
      process.exit(1);
    }
  } catch (error) {
    console.error("\n❌ Test suite failed:", error.message);
    process.exit(1);
  }
}

runTests();
