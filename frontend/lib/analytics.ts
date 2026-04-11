"use client";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

export function isGaEnabled() {
  return Boolean(GA_MEASUREMENT_ID);
}

function toGaValue(value: unknown): string | number | undefined {
  if (typeof value === "string") return value;
  if (typeof value === "number") return value;
  if (typeof value === "boolean") return value ? "true" : "false";
  return undefined;
}

export function trackEvent(
  eventName: string,
  params: Record<string, unknown> = {},
) {
  if (!isGaEnabled()) return;
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;

  const sanitized = Object.entries(params).reduce<Record<string, string | number>>(
    (acc, [key, value]) => {
      const normalized = toGaValue(value);
      if (normalized !== undefined) acc[key] = normalized;
      return acc;
    },
    {},
  );

  window.gtag("event", eventName, sanitized);
}

export function trackWhatsAppClick({
  location,
  label,
  phoneLast4,
  pagePath,
}: {
  location?: string;
  label?: string;
  phoneLast4?: string;
  pagePath?: string;
}) {
  trackEvent("whatsapp_click", {
    location: location || "unknown",
    label: label || "",
    phone_last4: phoneLast4 || "",
    page_path: pagePath || "",
  });
}

