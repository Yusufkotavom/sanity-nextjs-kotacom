import { NextRequest, NextResponse } from "next/server";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";
import { getSeoOpsRuntimeConfig } from "@/lib/seo-ops/config";
import { canEncryptSeoSettings } from "@/lib/seo-ops/crypto";
import { summarizeIndexingJobs } from "@/lib/seo-ops/jobs";
import { canWriteSeoOpsSettings } from "@/lib/seo-ops/sanity-write";
import { getSeoOpsResolvedSettings } from "@/lib/seo-ops/settings-source";

export async function GET(request: NextRequest) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  let studioSettings: Awaited<
    ReturnType<(typeof import("@/sanity/lib/fetch"))["fetchSanitySeoOpsSettings"]>
  > = null;
  try {
    const { fetchSanitySeoOpsSettings } = await import("@/sanity/lib/fetch");
    studioSettings = await fetchSanitySeoOpsSettings();
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    const isMissingPublicSanityEnv = message.includes("Missing environment variable: NEXT_PUBLIC_SANITY_");
    if (!isMissingPublicSanityEnv) throw error;
  }
  const resolved = await getSeoOpsResolvedSettings();
  const runtimeConfig = await getSeoOpsRuntimeConfig();

  return NextResponse.json({
    ok: true,
    config: runtimeConfig,
    studioSettings,
    capabilities: {
      canWriteSettings: canWriteSeoOpsSettings(),
      canEncrypt: canEncryptSeoSettings(),
    },
    sources: {
      googleCredentials: resolved.google.credentialsSource,
      indexNowKey: resolved.indexNow.keySource,
      dashboardPassword: resolved.auth.dashboardPasswordHash
        ? "hash"
        : resolved.auth.dashboardPasswordPlain
          ? "env-plain"
          : "none",
    },
    queue: summarizeIndexingJobs(),
  });
}
