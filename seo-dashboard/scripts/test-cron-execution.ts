import { NextRequest } from "next/server";
import { createSchedule } from "@/lib/ai-writer/schedule-manager";
import { db } from "@/lib/db";
import { schema } from "@repo/db";
import { eq } from "drizzle-orm";
import { POST as cronPost } from "@/app/api/internal/cron-run/route";

async function main() {
  if (!process.env.DATABASE_URL) {
    console.warn("⚠️ Skipping cron integration test: DATABASE_URL is not configured");
    return;
  }

  const cronSecret = process.env.CRON_SECRET || "test-cron-secret";
  process.env.CRON_SECRET = cronSecret;

  const schedule = await createSchedule({
    name: "cron-integration-test",
    taskType: "ai_content_generation",
    scheduleType: "ai_generation",
    cronExpr: "* * * * *",
    timezone: "UTC",
    enabled: true,
    payload: {
      contentType: "post",
      batchSize: 1,
      autoPublish: false,
      generateOgImage: false,
      customPrompt: "Write a short paragraph about website performance.",
    },
  });

  // Force due now
  await db()
    .update(schema.scheduledTasks)
    .set({ nextRunAt: new Date(Date.now() - 60_000), enabled: true })
    .where(eq(schema.scheduledTasks.id, schedule.id));

  const request = new NextRequest("http://localhost/api/internal/cron-run", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-cron-secret": cronSecret,
    },
    body: JSON.stringify({ type: "run-scheduled" }),
  });

  const response = await cronPost(request);
  if (response.status !== 200) {
    throw new Error(`cron-run endpoint failed with status ${response.status}`);
  }

  const jobRuns = await db()
    .select()
    .from(schema.jobRuns)
    .where(eq(schema.jobRuns.taskId, schedule.id));

  if (jobRuns.length === 0) {
    throw new Error("No job run was created by run-scheduled");
  }

  const latest = jobRuns[0];
  if (!["success", "failed"].includes(latest.status)) {
    throw new Error(`Unexpected job status "${latest.status}"`);
  }

  await db().delete(schema.jobRuns).where(eq(schema.jobRuns.taskId, schedule.id));
  await db().delete(schema.scheduledTasks).where(eq(schema.scheduledTasks.id, schedule.id));

  console.log("✅ Cron execution integration test passed");
}

main().catch((error) => {
  console.error("❌ Cron execution integration test failed");
  console.error(error);
  process.exit(1);
});
