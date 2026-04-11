import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";
import { canEncryptSeoSettings, encryptSeoSecret } from "@/lib/seo-ops/crypto";
import { canWriteSeoOpsSettings, upsertSeoOpsSettings } from "@/lib/seo-ops/sanity-write";
import { getSeoOpsResolvedSettings } from "@/lib/seo-ops/settings-source";

type SaveBody = {
  googleEnabled?: boolean;
  googleAggressiveMode?: boolean;
  googleServiceAccountJson?: string;
  indexNowEnabled?: boolean;
  indexNowHost?: string;
  indexNowEndpoint?: string;
  indexNowKey?: string;
  indexNowKeyLocation?: string;
  autoSubmitOnRevalidate?: boolean;
  maxBatchSize?: number;
  retryAttempts?: number;
  dashboardPassword?: string;
  notes?: string;
};

function normalizeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeBool(value: unknown, fallback: boolean) {
  return typeof value === "boolean" ? value : fallback;
}

function normalizeNumber(value: unknown, fallback: number, min: number, max: number) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(min, Math.min(max, Math.round(parsed)));
}

export async function POST(request: NextRequest) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  if (!canWriteSeoOpsSettings()) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Sanity write token is not configured. Set SANITY_AUTH_TOKEN to save dashboard settings.",
      },
      { status: 503 },
    );
  }

  if (!canEncryptSeoSettings()) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Encryption secret is missing. Set SEO_SETTINGS_ENCRYPTION_KEY or SEO_SESSION_SECRET.",
      },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => ({}))) as SaveBody;
  const resolved = await getSeoOpsResolvedSettings();
  const existing = resolved.studio;

  const googleServiceAccountJson = normalizeString(body.googleServiceAccountJson);
  const indexNowKey = normalizeString(body.indexNowKey);
  const dashboardPassword = normalizeString(body.dashboardPassword);

  const mutation = {
    googleEnabled: normalizeBool(body.googleEnabled, false),
    googleAggressiveMode: normalizeBool(body.googleAggressiveMode, false),
    googleServiceAccountEncrypted: googleServiceAccountJson
      ? encryptSeoSecret(googleServiceAccountJson)
      : existing?.googleServiceAccountEncrypted || "",
    indexNowEnabled: normalizeBool(body.indexNowEnabled, false),
    indexNowHost: normalizeString(body.indexNowHost),
    indexNowEndpoint:
      normalizeString(body.indexNowEndpoint) || "https://api.indexnow.org/indexnow",
    indexNowKeyEncrypted: indexNowKey
      ? encryptSeoSecret(indexNowKey)
      : existing?.indexNowKeyEncrypted || "",
    indexNowKeyLocation: normalizeString(body.indexNowKeyLocation),
    autoSubmitOnRevalidate: normalizeBool(body.autoSubmitOnRevalidate, true),
    maxBatchSize: normalizeNumber(body.maxBatchSize, 100, 1, 1000),
    retryAttempts: normalizeNumber(body.retryAttempts, 2, 0, 10),
    dashboardPasswordHash: dashboardPassword
      ? crypto.createHash("sha256").update(dashboardPassword).digest("hex")
      : existing?.dashboardPasswordHash || "",
    notes: normalizeString(body.notes),
  };

  const result = await upsertSeoOpsSettings(mutation);
  if (!result.ok) {
    return NextResponse.json({ ok: false, message: result.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, message: "SEO dashboard settings saved to Sanity." });
}
