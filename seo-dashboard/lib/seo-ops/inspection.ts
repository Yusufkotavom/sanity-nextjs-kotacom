import { inspectUrl } from "@repo/search";
import { db } from "@/lib/db";
import { schema } from "@repo/db";
import { inArray } from "drizzle-orm";

type InspectResult = {
  url: string;
  ok: boolean;
  verdict: string | null;
  coverageState: string | null;
  indexingState: string | null;
  error: string | null;
};

function normalizeSiteUrl(siteUrl: string) {
  const trimmed = (siteUrl || "").trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("sc-domain:")) return trimmed;
  return trimmed.endsWith("/") ? trimmed : `${trimmed}/`;
}

function extractLocTags(xml: string) {
  return Array.from(xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi))
    .map((match) => match[1].trim())
    .filter(Boolean);
}

async function fetchXml(url: string) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Failed to fetch sitemap (${response.status})`);
  }
  return response.text();
}

export async function extractUrlsFromSitemap(
  sitemapUrl: string,
  maxUrls = 100,
): Promise<string[]> {
  const rootXml = await fetchXml(sitemapUrl);
  const rootLocs = extractLocTags(rootXml);
  if (!rootLocs.length) return [];

  const isSitemapIndex = /<sitemapindex[\s>]/i.test(rootXml);
  if (!isSitemapIndex) {
    return Array.from(new Set(rootLocs)).slice(0, maxUrls);
  }

  const urls: string[] = [];
  for (const childSitemapUrl of rootLocs) {
    if (urls.length >= maxUrls) break;
    try {
      const childXml = await fetchXml(childSitemapUrl);
      const childLocs = extractLocTags(childXml);
      const isChildUrlset = /<urlset[\s>]/i.test(childXml);
      if (!isChildUrlset) continue;
      for (const url of childLocs) {
        if (!urls.includes(url)) urls.push(url);
        if (urls.length >= maxUrls) break;
      }
    } catch {
      // Ignore one broken child sitemap and continue with others.
    }
  }

  return urls.slice(0, maxUrls);
}

export async function inspectAndPersistUrls({
  urls,
  clientEmail,
  privateKey,
  siteUrl,
}: {
  urls: string[];
  clientEmail: string;
  privateKey: string;
  siteUrl: string;
}): Promise<InspectResult[]> {
  const cleanUrls = Array.from(
    new Set(
      urls
        .map((url) => url.trim())
        .filter(Boolean),
    ),
  );

  const contentItems = cleanUrls.length
    ? await db()
        .select({ id: schema.contentItems.id, url: schema.contentItems.url })
        .from(schema.contentItems)
        .where(inArray(schema.contentItems.url, cleanUrls))
    : [];
  const idByUrl = new Map(contentItems.map((item) => [item.url, item.id]));

  const normalizedSiteUrl = normalizeSiteUrl(siteUrl);
  const results: InspectResult[] = [];

  for (const url of cleanUrls) {
    try {
      const data = await inspectUrl({
        clientEmail,
        privateKey,
        siteUrl: normalizedSiteUrl,
        url,
      });
      const inspectionResult = data.inspectionResult;
      const indexStatus = inspectionResult?.indexStatusResult;

      await db().insert(schema.indexStatusChecks).values({
        contentItemId: idByUrl.get(url) || null,
        provider: "google",
        verdict: indexStatus?.verdict || null,
        coverageState: indexStatus?.coverageState || null,
        indexingState: indexStatus?.indexingState || null,
        pageFetchState: indexStatus?.pageFetchState || null,
        robotsState: indexStatus?.robotsTxtState || null,
        lastCrawlTime: indexStatus?.lastCrawlTime
          ? new Date(indexStatus.lastCrawlTime)
          : null,
        googleCanonical: indexStatus?.googleCanonical || null,
        userCanonical: indexStatus?.userCanonical || null,
        rawResponse: data as unknown as Record<string, unknown>,
        checkedAt: new Date(),
      });

      results.push({
        url,
        ok: true,
        verdict: indexStatus?.verdict || null,
        coverageState: indexStatus?.coverageState || null,
        indexingState: indexStatus?.indexingState || null,
        error: null,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown inspection error";
      await db().insert(schema.indexStatusChecks).values({
        contentItemId: idByUrl.get(url) || null,
        provider: "google",
        verdict: null,
        coverageState: null,
        indexingState: null,
        pageFetchState: null,
        robotsState: null,
        lastCrawlTime: null,
        googleCanonical: null,
        userCanonical: null,
        rawResponse: { error: message, inspectionUrl: url },
        checkedAt: new Date(),
      });
      results.push({
        url,
        ok: false,
        verdict: null,
        coverageState: null,
        indexingState: null,
        error: message,
      });
    }
  }

  return results;
}
