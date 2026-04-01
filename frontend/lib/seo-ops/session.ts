import crypto from "node:crypto";
import { NextRequest } from "next/server";
import { getSeoOpsResolvedSettings } from "@/lib/seo-ops/settings-source";

export const SEO_SESSION_COOKIE = "seo_dash_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12;

type SessionPayload = {
  role: "admin";
  exp: number;
};

function getSessionSecret() {
  return process.env.SEO_SESSION_SECRET || process.env.REVALIDATE_SECRET || "";
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return crypto.timingSafeEqual(left, right);
}

function sign(value: string) {
  const secret = getSessionSecret();
  if (!secret) return "";
  return crypto.createHmac("sha256", secret).update(value).digest("hex");
}

function encodePayload(payload: SessionPayload) {
  return Buffer.from(JSON.stringify(payload)).toString("base64url");
}

function decodePayload(value: string): SessionPayload | null {
  try {
    const decoded = Buffer.from(value, "base64url").toString("utf8");
    const parsed = JSON.parse(decoded) as SessionPayload;
    if (!parsed?.exp || parsed?.role !== "admin") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function createSessionToken() {
  const payload: SessionPayload = {
    role: "admin",
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  };

  const encoded = encodePayload(payload);
  const signature = sign(encoded);
  return `${encoded}.${signature}`;
}

export function verifySessionToken(token?: string | null) {
  if (!token) return false;
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return false;

  const expected = sign(encoded);
  if (!expected || !safeEqual(signature, expected)) return false;

  const payload = decodePayload(encoded);
  if (!payload) return false;

  return payload.exp > Math.floor(Date.now() / 1000);
}

export function getSessionTokenFromRequest(request: NextRequest) {
  return request.cookies.get(SEO_SESSION_COOKIE)?.value;
}

export async function verifySeoDashboardPassword(password: string) {
  const resolved = await getSeoOpsResolvedSettings();
  const plain = resolved.auth.dashboardPasswordPlain;
  const sha256 = resolved.auth.dashboardPasswordHash;

  if (plain) return safeEqual(password, plain);

  if (sha256) {
    const digest = crypto.createHash("sha256").update(password).digest("hex");
    return safeEqual(digest, sha256);
  }

  return false;
}

export async function isSeoAuthConfigured() {
  const resolved = await getSeoOpsResolvedSettings();
  return Boolean(
    resolved.auth.sessionSecret &&
      (resolved.auth.dashboardPasswordPlain || resolved.auth.dashboardPasswordHash),
  );
}

export function getSessionCookieConfig() {
  return {
    name: SEO_SESSION_COOKIE,
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      path: "/",
      maxAge: SESSION_TTL_SECONDS,
    },
  };
}
