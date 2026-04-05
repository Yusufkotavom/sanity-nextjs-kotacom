import { NextRequest, NextResponse } from "next/server";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";
import { canEncryptSeoSettings } from "@/lib/seo-ops/crypto";
import { canWriteAiWriterSettings } from "@/lib/ai-writer/sanity-write";
import { fetchSanityAiWriterSettings } from "@/sanity/lib/fetch";
import { getAiWriterResolvedSettings } from "@/lib/ai-writer/settings-source";

export async function GET(request: NextRequest) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  const studioSettings = await fetchSanityAiWriterSettings();
  const resolved = await getAiWriterResolvedSettings();

  return NextResponse.json({
    ok: true,
    studioSettings,
    runtime: {
      enabled: resolved.enabled,
      mode: resolved.mode,
      defaultModel: resolved.defaultModel,
      defaultModels: resolved.defaultModels,
      providerOrder: resolved.providerOrder,
      fallbackModels: resolved.fallbackModels,
      gatewayProviderOrder: resolved.gatewayProviderOrder,
      temperature: resolved.temperature,
      maxOutputTokens: resolved.maxOutputTokens,
    },
    capabilities: {
      canWriteSettings: canWriteAiWriterSettings(),
      canEncrypt: canEncryptSeoSettings(),
    },
    sources: {
      gatewayApiKey: resolved.secrets.gatewayApiKey ? "studio-encrypted" : "none-or-oidc",
      oidcToken: resolved.secrets.hasOidcToken ? "present" : "missing",
      geminiKeyCount: resolved.secrets.geminiKeys.length,
      groqKeyCount: resolved.secrets.groqKeys.length,
    },
  });
}
