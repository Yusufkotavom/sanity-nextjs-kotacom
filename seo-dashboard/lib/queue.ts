import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export const QUEUES = {
  publish: "q:publish",
  ai: "q:ai",
  seo: "q:seo",
  search: "q:search",
} as const;

export async function enqueue(queue: string, payload: unknown) {
  await redis.lpush(queue, JSON.stringify(payload));
}

export async function drain(queue: string, limit = 10) {
  const items: string[] = [];
  for (let i = 0; i < limit; i += 1) {
    const value = await redis.rpop<string>(queue);
    if (!value) break;
    items.push(value);
  }
  return items.map((item) => {
    try {
      return JSON.parse(item) as unknown;
    } catch {
      return item as unknown;
    }
  });
}

export async function acquireLock(key: string, ttlSeconds = 900) {
  const result = await redis.set(key, "1", { nx: true, ex: ttlSeconds });
  return result === "OK";
}

export async function releaseLock(key: string) {
  await redis.del(key);
}
