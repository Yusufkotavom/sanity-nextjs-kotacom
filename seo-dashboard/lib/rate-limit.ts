type Bucket = {
  count: number;
  resetAt: number;
};

const memoryBuckets = new Map<string, Bucket>();

export function checkSimpleRateLimit(options: {
  key: string;
  limit: number;
  windowMs: number;
}): { ok: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const bucket = memoryBuckets.get(options.key);

  if (!bucket || bucket.resetAt <= now) {
    const resetAt = now + options.windowMs;
    memoryBuckets.set(options.key, { count: 1, resetAt });
    return { ok: true, remaining: options.limit - 1, resetAt };
  }

  if (bucket.count >= options.limit) {
    return { ok: false, remaining: 0, resetAt: bucket.resetAt };
  }

  bucket.count += 1;
  memoryBuckets.set(options.key, bucket);
  return { ok: true, remaining: options.limit - bucket.count, resetAt: bucket.resetAt };
}

