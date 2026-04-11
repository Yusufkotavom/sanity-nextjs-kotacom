import { decryptSeoSecret } from "@/lib/seo-ops/crypto";

function envTrue(value?: string) {
  return ["1", "true", "yes", "on"].includes((value || "").toLowerCase());
}

function envNumber(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

type BooleanLike = boolean | null | undefined;
type NumberLike = number | null | undefined;
type StringLike = string | null | undefined;

function pickBoolean(studioValue: BooleanLike, envValue: boolean) {
  return typeof studioValue === "boolean" ? studioValue : envValue;
}

function pickNumber(studioValue: NumberLike, envValue: number) {
  return typeof studioValue === "number" && Number.isFinite(studioValue) ? studioValue : envValue;
}

function pickString(studioValue: StringLike, envValue: string) {
  const studio = (studioValue || "").trim();
  return studio || envValue;
}

export async function getSeoOpsResolvedSettings() {
  let studio: Awaited<
    ReturnType<
      (typeof import("@/sanity/lib/fetch"))["fetchSanitySeoOpsSettingsPrivate"]
    >
  > = null;
  try {
    const { fetchSanitySeoOpsSettingsPrivate } = await import("@/sanity/lib/fetch");
    studio = await fetchSanitySeoOpsSettingsPrivate();
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    const isMissingPublicSanityEnv = message.includes("Missing environment variable: NEXT_PUBLIC_SANITY_");
    if (!isMissingPublicSanityEnv) throw error;
  }

  const studioGoogleJson = decryptSeoSecret(studio?.googleServiceAccountEncrypted);
  const studioIndexNowKey = decryptSeoSecret(studio?.indexNowKeyEncrypted);

  const googleEnabled = pickBoolean(studio?.googleEnabled, envTrue(process.env.SEO_GOOGLE_INDEXING_ENABLED));
  const googleAggressiveMode = pickBoolean(
    studio?.googleAggressiveMode,
    envTrue(process.env.SEO_GOOGLE_INDEXING_AGGRESSIVE_MODE),
  );

  const indexNowEnabled = pickBoolean(studio?.indexNowEnabled, envTrue(process.env.SEO_INDEXNOW_ENABLED));
  const indexNowHost = pickString(studio?.indexNowHost, process.env.SEO_INDEXNOW_HOST || "");
  const indexNowEndpoint = pickString(
    studio?.indexNowEndpoint,
    process.env.SEO_INDEXNOW_ENDPOINT || "https://api.indexnow.org/indexnow",
  );
  const indexNowKeyLocation = pickString(
    studio?.indexNowKeyLocation,
    process.env.SEO_INDEXNOW_KEY_LOCATION || "",
  );

  const autoSubmitOnRevalidate = pickBoolean(
    studio?.autoSubmitOnRevalidate,
    envTrue(process.env.SEO_AUTO_SUBMIT_ON_REVALIDATE),
  );
  const maxBatchSize = pickNumber(studio?.maxBatchSize, envNumber(process.env.SEO_INDEXING_BATCH_SIZE, 100));
  const retryAttempts = pickNumber(
    studio?.retryAttempts,
    envNumber(process.env.SEO_INDEXING_RETRY_ATTEMPTS, 2),
  );

  const dashboardPasswordHash =
    (studio?.dashboardPasswordHash || "").trim() || (process.env.SEO_DASHBOARD_PASSWORD_SHA256 || "").trim();

  const googleServiceAccountJson =
    studioGoogleJson.trim() || process.env.SEO_GOOGLE_SERVICE_ACCOUNT_JSON || "";

  const indexNowKey = studioIndexNowKey.trim() || process.env.SEO_INDEXNOW_KEY || "";

  return {
    studio,
    auth: {
      dashboardPasswordHash,
      dashboardPasswordPlain: process.env.SEO_DASHBOARD_PASSWORD || "",
      sessionSecret:
        process.env.SEO_SESSION_SECRET || process.env.REVALIDATE_SECRET || "",
    },
    google: {
      enabled: googleEnabled,
      aggressive: googleAggressiveMode,
      serviceAccountJson: googleServiceAccountJson,
      hasCredentials: Boolean(process.env.GOOGLE_APPLICATION_CREDENTIALS || googleServiceAccountJson),
      credentialsSource: studioGoogleJson ? "studio" : process.env.SEO_GOOGLE_SERVICE_ACCOUNT_JSON ? "env" : process.env.GOOGLE_APPLICATION_CREDENTIALS ? "env-file" : "none",
    },
    indexNow: {
      enabled: indexNowEnabled,
      host: indexNowHost,
      endpoint: indexNowEndpoint,
      key: indexNowKey,
      hasKey: Boolean(indexNowHost && indexNowKey),
      keySource: studioIndexNowKey ? "studio" : process.env.SEO_INDEXNOW_KEY ? "env" : "none",
      keyLocation:
        indexNowKeyLocation || (indexNowHost && indexNowKey ? `https://${indexNowHost}/${indexNowKey}.txt` : ""),
    },
    webhook: {
      autoSubmitEnabled: autoSubmitOnRevalidate,
    },
    defaults: {
      maxBatchSize,
      retryAttempts,
    },
  };
}
