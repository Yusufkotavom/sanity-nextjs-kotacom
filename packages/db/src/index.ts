import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

let cached: ReturnType<typeof drizzle> | null = null;

export function getDb(connectionString?: string) {
  if (cached) return cached;
  const url = connectionString || process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not configured");
  }
  const client = postgres(url, { max: 5 });
  cached = drizzle(client, { schema });
  return cached;
}

export { schema };
