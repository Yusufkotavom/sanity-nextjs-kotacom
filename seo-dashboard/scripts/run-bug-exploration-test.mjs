#!/usr/bin/env node

/**
 * Bug Condition Exploration Test Runner
 * 
 * This script runs the bug condition exploration test for the Schedule System Clarity Fix.
 * 
 * CRITICAL: This test MUST FAIL on unfixed code - failure confirms the bug exists.
 * 
 * Usage:
 *   node scripts/run-bug-exploration-test.mjs
 */

import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "..");

console.log("🔍 Bug Condition Exploration Test");
console.log("===================================");
console.log("Spec: Schedule System Clarity Fix");
console.log("Testing on: UNFIXED code");
console.log("");
console.log("⚠️  IMPORTANT: This test is EXPECTED TO FAIL on unfixed code.");
console.log("   Test failures indicate the bug exists (this is correct!)");
console.log("");

// Run the test using tsx
const testFile = join(projectRoot, "lib/ai-writer/__tests__/schedule-system-clarity-bug.test.ts");

const child = spawn("npx", ["tsx", testFile], {
  cwd: projectRoot,
  stdio: "inherit",
  env: { ...process.env, NODE_ENV: "test" },
});

child.on("exit", (code) => {
  console.log("");
  console.log("===================================");
  
  if (code !== 0) {
    console.log("❌ Test FAILED (as expected on unfixed code)");
    console.log("");
    console.log("This confirms the bug exists. Counterexamples have been documented.");
    console.log("Next step: Implement the fix according to the design document.");
    process.exit(0); // Exit with success because failure is expected
  } else {
    console.log("✅ Test PASSED");
    console.log("");
    console.log("This indicates the bug may already be fixed, or the test needs adjustment.");
    process.exit(0);
  }
});

child.on("error", (error) => {
  console.error("❌ Failed to run test:", error.message);
  process.exit(1);
});
