const DEFAULT_TIMEOUT_MS = 8000;

export type SeoAuditItem = {
  url: string;
  statusCode: number;
  indexability: "indexable" | "noindex" | "unknown";
  canonical: string | null;
  titlePresent: boolean;
  descriptionPresent: boolean;
  ogImagePresent: boolean;
  jsonLdPresent: boolean;
  internalLinks: number;
  externalLinks: number;
  issues: string[];
};

async function fetchWithTimeout(url: string, timeoutMs: number) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "SEO-Ops-Audit/1.0" },
      cache: "no-store",
    });
  } finally {
    clearTimeout(timeout);
  }
}

function pickMeta(content: string, regex: RegExp) {
  const match = content.match(regex);
  return match?.[1] || null;
}

function extractSitemapUrls(xml: string) {
  return Array.from(xml.matchAll(/<loc>(.*?)<\/loc>/g)).map((match) => match[1]);
}

export async function runSeoAudit({
  limit = 80,
  timeoutMs = DEFAULT_TIMEOUT_MS,
}: {
  limit?: number;
  timeoutMs?: number;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

  if (!baseUrl) {
    return {
      ok: false as const,
      message: "Missing NEXT_PUBLIC_SITE_URL",
      items: [] as SeoAuditItem[],
    };
  }

  const sitemapUrl = `${baseUrl.replace(/\/+$/, "")}/sitemap.xml`;
  const sitemapRes = await fetchWithTimeout(sitemapUrl, timeoutMs);

  if (!sitemapRes.ok) {
    return {
      ok: false as const,
      message: `Failed to fetch sitemap: ${sitemapRes.status}`,
      items: [] as SeoAuditItem[],
    };
  }

  const sitemapXml = await sitemapRes.text();
  const urls = extractSitemapUrls(sitemapXml).slice(0, limit);
  const items: SeoAuditItem[] = [];

  for (const url of urls) {
    const issues: string[] = [];

    try {
      const response = await fetchWithTimeout(url, timeoutMs);
      const html = await response.text();

      const robots = pickMeta(
        html,
        /<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["'][^>]*>/i,
      );
      const canonical = pickMeta(
        html,
        /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["'][^>]*>/i,
      );
      const titlePresent = /<title>[\s\S]*?<\/title>/i.test(html);
      const descriptionPresent = /<meta[^>]*name=["']description["'][^>]*>/i.test(html);
      const ogImagePresent = /<meta[^>]*property=["']og:image["'][^>]*>/i.test(html);
      const jsonLdPresent =
        /<script[^>]*type=["']application\/ld\+json["'][^>]*>/i.test(html);

      const noindex = robots ? /noindex/i.test(robots) : false;
      if (!titlePresent) issues.push("missing_title");
      if (!descriptionPresent) issues.push("missing_meta_description");
      if (!canonical) issues.push("missing_canonical");
      if (!ogImagePresent) issues.push("missing_og_image");
      if (!jsonLdPresent) issues.push("missing_jsonld");
      if (response.status >= 400) issues.push(`http_${response.status}`);
      if (canonical && canonical !== url) issues.push("canonical_mismatch");

      // Menghitung Internal & External Links
      let internalLinks = 0;
      let externalLinks = 0;
      const linkMatches = Array.from(html.matchAll(/<a[^>]+href=["']([^"']+)["']/gi));
      const normalizedBaseUrl = baseUrl.replace(/\/+$/, "");
      
      for (const match of linkMatches) {
        const href = match[1].trim();
        // Ignore anchors, mailto, tel scripts
        if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
          continue;
        }
        
        if (href.startsWith('http://') || href.startsWith('https://')) {
           if (href.startsWith(normalizedBaseUrl)) internalLinks++;
           else externalLinks++;
        } else {
           // Relative urls are internal
           internalLinks++;
        }
      }

      items.push({
        url,
        statusCode: response.status,
        indexability: noindex ? "noindex" : "indexable",
        canonical,
        titlePresent,
        descriptionPresent,
        ogImagePresent,
        jsonLdPresent,
        internalLinks,
        externalLinks,
        issues,
      });
    } catch (error) {
      items.push({
        url,
        statusCode: 0,
        indexability: "unknown",
        canonical: null,
        titlePresent: false,
        descriptionPresent: false,
        ogImagePresent: false,
        jsonLdPresent: false,
        internalLinks: 0,
        externalLinks: 0,
        issues: [error instanceof Error ? error.message : "request_failed"],
      });
    }
  }

  const summary = {
    total: items.length,
    healthy: items.filter((item) => item.issues.length === 0).length,
    withIssues: items.filter((item) => item.issues.length > 0).length,
    noindex: items.filter((item) => item.indexability === "noindex").length,
  };

  return { ok: true as const, message: "Audit complete", summary, items };
}
