import { db } from "@/lib/db";
import { schema } from "@repo/db";
import { eq, desc } from "drizzle-orm";

export async function createJobRun({
  taskId,
  jobType,
  payload,
}: {
  taskId?: string | null;
  jobType: string;
  payload?: unknown;
}) {
  const database = db();
  const [job] = await database
    .insert(schema.jobRuns)
    .values({
      taskId: taskId || null,
      jobType,
      status: "queued",
      payload: payload ?? null,
    })
    .returning();
  return job;
}

export async function updateJobRun(
  id: string,
  patch: Partial<typeof schema.jobRuns.$inferInsert>,
) {
  const database = db();
  const [job] = await database
    .update(schema.jobRuns)
    .set(patch)
    .where(eq(schema.jobRuns.id, id))
    .returning();
  return job;
}

export async function listJobs(limit = 50) {
  const database = db();
  return database.select().from(schema.jobRuns).orderBy(desc(schema.jobRuns.createdAt)).limit(limit);
}

export async function getJob(id: string) {
  const database = db();
  const [job] = await database.select().from(schema.jobRuns).where(eq(schema.jobRuns.id, id));
  return job || null;
}
