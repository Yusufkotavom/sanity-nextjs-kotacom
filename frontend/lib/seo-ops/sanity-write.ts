type MutationPatch = Record<string, unknown>;

function getSanityWriteConfig() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "";
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-03-23";
  const token = process.env.SANITY_AUTH_TOKEN || "";
  return { projectId, dataset, apiVersion, token };
}

export function canWriteSeoOpsSettings() {
  const cfg = getSanityWriteConfig();
  return Boolean(cfg.projectId && cfg.dataset && cfg.token);
}

export async function upsertSeoOpsSettings(patch: MutationPatch) {
  const cfg = getSanityWriteConfig();
  if (!cfg.projectId || !cfg.dataset || !cfg.token) {
    return {
      ok: false as const,
      message:
        "Missing Sanity write config. Set NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and SANITY_AUTH_TOKEN.",
    };
  }

  const url = `https://${cfg.projectId}.api.sanity.io/v${cfg.apiVersion}/data/mutate/${cfg.dataset}`;
  const body = {
    mutations: [
      {
        createOrReplace: {
          _id: "seoOpsSettings",
          _type: "seoOpsSettings",
          ...patch,
        },
      },
    ],
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cfg.token}`,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = (await response.json().catch(() => ({}))) as { error?: { description?: string } };
    if (!response.ok) {
      return {
        ok: false as const,
        message: data?.error?.description || `Sanity mutation failed (${response.status})`,
      };
    }

    return { ok: true as const };
  } catch (error) {
    return { ok: false as const, message: error instanceof Error ? error.message : "Save failed" };
  }
}
