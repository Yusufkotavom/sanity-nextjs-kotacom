import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const [
    { ensureSeoApiAccess },
    { canEncryptSeoSettings },
    { canWriteAiWriterSettings },
    { fetchSanityAiWriterSettings },
    { getAiWriterResolvedSettings },
  ] = await Promise.all([
    import("@/lib/seo-ops/api-auth"),
    import("@/lib/seo-ops/crypto"),
    import("@/lib/ai-writer/sanity-write"),
    import("@/sanity/lib/fetch"),
    import("@/lib/ai-writer/settings-source"),
  ]);

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
      modelProfiles: resolved.modelProfiles,
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
