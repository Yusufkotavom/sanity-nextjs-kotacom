const TAG_RE = /<[^>]*>/g;

export function sanitizeText(value: unknown, maxLength = 5000): string {
  if (typeof value !== "string") return "";
  return value.replace(TAG_RE, "").trim().slice(0, maxLength);
}

export function sanitizeOptionalText(value: unknown, maxLength = 5000): string | undefined {
  const cleaned = sanitizeText(value, maxLength);
  return cleaned.length > 0 ? cleaned : undefined;
}

export function sanitizeStringArray(value: unknown, maxItems = 50, maxLength = 300): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .slice(0, maxItems)
    .map((entry) => sanitizeText(entry, maxLength))
    .filter(Boolean);
}

