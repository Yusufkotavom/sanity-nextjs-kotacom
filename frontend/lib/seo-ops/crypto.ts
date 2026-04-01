import crypto from "node:crypto";

function getEncryptionSecret() {
  return (
    process.env.SEO_SETTINGS_ENCRYPTION_KEY ||
    process.env.SEO_SESSION_SECRET ||
    process.env.REVALIDATE_SECRET ||
    ""
  );
}

function getAesKey() {
  const secret = getEncryptionSecret();
  if (!secret) return null;
  return crypto.createHash("sha256").update(secret).digest();
}

export function canEncryptSeoSettings() {
  return Boolean(getAesKey());
}

export function encryptSeoSecret(value: string) {
  const key = getAesKey();
  if (!key) return "";

  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `v1:${iv.toString("base64url")}:${encrypted.toString("base64url")}:${tag.toString("base64url")}`;
}

export function decryptSeoSecret(payload?: string | null) {
  if (!payload) return "";
  const key = getAesKey();
  if (!key) return "";

  try {
    const [version, ivB64, dataB64, tagB64] = payload.split(":");
    if (version !== "v1" || !ivB64 || !dataB64 || !tagB64) return "";
    const iv = Buffer.from(ivB64, "base64url");
    const encrypted = Buffer.from(dataB64, "base64url");
    const tag = Buffer.from(tagB64, "base64url");

    const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(tag);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted.toString("utf8");
  } catch {
    return "";
  }
}
