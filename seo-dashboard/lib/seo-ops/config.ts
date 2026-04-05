import { isSeoAuthConfigured } from "@/lib/seo-ops/session";
import { getSeoOpsResolvedSettings } from "@/lib/seo-ops/settings-source";
import { SeoOpsRuntimeConfig } from "@/lib/seo-ops/types";

export async function getSeoOpsRuntimeConfig(): Promise<SeoOpsRuntimeConfig> {
  const resolved = await getSeoOpsResolvedSettings();
  return {
    authConfigured: await isSeoAuthConfigured(),
    google: {
      enabled: resolved.google.enabled,
      aggressive: resolved.google.aggressive,
      hasCredentials: resolved.google.hasCredentials,
    },
    indexNow: {
      enabled: resolved.indexNow.enabled,
      endpoint: resolved.indexNow.endpoint,
      hasKey: resolved.indexNow.hasKey,
      host: resolved.indexNow.host,
    },
    webhook: {
      autoSubmitEnabled: resolved.webhook.autoSubmitEnabled,
    },
    defaults: {
      maxBatchSize: resolved.defaults.maxBatchSize,
      retryAttempts: resolved.defaults.retryAttempts,
    },
  };
}

export async function getEnabledEngines() {
  const config = await getSeoOpsRuntimeConfig();
  const engines: Array<"google" | "indexnow" | "bing"> = [];

  if (config.google.enabled && config.google.hasCredentials) engines.push("google");
  if (config.indexNow.enabled && config.indexNow.hasKey) engines.push("indexnow");

  if (["1", "true", "yes", "on"].includes((process.env.SEO_BING_INDEXNOW_ALIAS || "").toLowerCase()) && engines.includes("indexnow")) {
    engines.push("bing");
  }

  return engines;
}
