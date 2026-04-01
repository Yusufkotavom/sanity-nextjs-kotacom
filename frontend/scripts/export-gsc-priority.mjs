#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { google } from "googleapis";

const WEBMASTERS_SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";

function parseArgs(argv) {
  const args = {
    siteUrl: process.env.GSC_SITE_URL || "",
    startDate: process.env.GSC_START_DATE || "",
    endDate: process.env.GSC_END_DATE || "",
    outDir: process.env.GSC_OUT_DIR || "./tmp/gsc",
    rowLimit: Number(process.env.GSC_ROW_LIMIT || 25000),
    blogBase: process.env.GSC_BLOG_BASE || "/blog",
    categoryBase: process.env.GSC_CATEGORY_BASE || "/blog/category",
    minImpressionsForAuto: Number(process.env.GSC_MIN_IMPRESSIONS_AUTO || 1),
    sitemapUrl: process.env.GSC_SITEMAP_URL || "",
  };

  for (let i = 2; i < argv.length; i += 1) {
    const token = argv[i];
    const next = argv[i + 1];

    if (token === "--") continue;
    if (token === "--help" || token === "-h") {
      args.help = true;
      return args;
    }
    if (!token.startsWith("--")) continue;

    const [key, inlineValue] = token.slice(2).split("=");
    const value = inlineValue ?? next;

    switch (key) {
      case "site-url":
        args.siteUrl = value;
        if (inlineValue == null) i += 1;
        break;
      case "start-date":
        args.startDate = value;
        if (inlineValue == null) i += 1;
        break;
      case "end-date":
        args.endDate = value;
        if (inlineValue == null) i += 1;
        break;
      case "out-dir":
        args.outDir = value;
        if (inlineValue == null) i += 1;
        break;
      case "row-limit":
        args.rowLimit = Number(value);
        if (inlineValue == null) i += 1;
        break;
      case "blog-base":
        args.blogBase = value;
        if (inlineValue == null) i += 1;
        break;
      case "category-base":
        args.categoryBase = value;
        if (inlineValue == null) i += 1;
        break;
      case "min-impressions-auto":
        args.minImpressionsForAuto = Number(value);
        if (inlineValue == null) i += 1;
        break;
      case "sitemap-url":
        args.sitemapUrl = value;
        if (inlineValue == null) i += 1;
        break;
      default:
        break;
    }
  }

  return args;
}

function printHelp() {
  console.log(`Batch export Google Search Console + migration curation\n\nUsage:\n  pnpm --filter frontend gsc:export -- \\
    --site-url https://www.kotacom.id/ \\
    --start-date 2025-01-01 \\
    --end-date 2026-04-01 \\
    --out-dir ./tmp/gsc-kotacom\n\nRequired:\n  --site-url                 Verified property URL (URL prefix or sc-domain)\n  --start-date               YYYY-MM-DD\n  --end-date                 YYYY-MM-DD\n\nOptional:\n  --out-dir                  Output folder (default: ./tmp/gsc)\n  --row-limit                Page size per API request (default: 25000)\n  --blog-base                Target blog base path (default: /blog)\n  --category-base            Target category base path (default: /blog/category)\n  --min-impressions-auto     Minimum impressions for auto redirect export (default: 1)\n  --sitemap-url              Optional sitemap to include URLs with 0 GSC traffic\n\nAuth:\n  Uses Application Default Credentials (GOOGLE_APPLICATION_CREDENTIALS).\n\nOutput files:\n  - gsc-pages.csv\n  - gsc-queries.csv\n  - gsc-page-query.csv\n  - gsc-page-country.csv\n  - gsc-page-device.csv\n  - gsc-pages-priority.csv\n  - gsc-migration-curation.csv\n  - gsc-redirect-auto-import.csv\n  - gsc-summary.json\n`);
}

function assertRequired({ siteUrl, startDate, endDate, rowLimit }) {
  if (!siteUrl || !startDate || !endDate) {
    throw new Error("Missing required args. Use --help for usage.");
  }

  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!datePattern.test(startDate) || !datePattern.test(endDate)) {
    throw new Error("start-date and end-date must use YYYY-MM-DD format.");
  }

  if (!Number.isFinite(rowLimit) || rowLimit <= 0) {
    throw new Error("row-limit must be a positive number.");
  }
}

function normalizePath(pathname) {
  if (!pathname) return "/";
  const normalized = pathname.replace(/\/+/g, "/");
  if (normalized !== "/" && normalized.endsWith("/")) {
    return normalized.slice(0, -1);
  }
  return normalized;
}

function normalizeUrl(rawUrl) {
  try {
    const url = new URL(rawUrl);
    const host = url.hostname.toLowerCase();
    const pathname = normalizePath(url.pathname);
    return `https://${host}${pathname}`;
  } catch {
    return rawUrl;
  }
}

function getPathname(rawUrl) {
  try {
    return normalizePath(new URL(rawUrl).pathname);
  } catch {
    return rawUrl;
  }
}

function businessWeight(pageUrl) {
  const pathname = getPathname(pageUrl).toLowerCase();

  if (
    pathname === "/" ||
    pathname.startsWith("/services") ||
    pathname.startsWith("/products") ||
    pathname.includes("pricing") ||
    pathname.includes("contact")
  ) {
    return 4;
  }

  if (pathname.startsWith("/blog") || pathname.startsWith("/docs")) {
    return 2;
  }

  return 1;
}

function opportunityWeight(position) {
  if (!Number.isFinite(position)) return 0;
  if (position > 3 && position <= 20) return (21 - position) * 0.8;
  if (position > 20 && position <= 40) return 1;
  return 0;
}

function calculatePriority(row) {
  const clicks = Number(row.clicks || 0);
  const impressions = Number(row.impressions || 0);
  const ctr = Number(row.ctr || 0);
  const position = Number(row.position || 0);

  const trafficScore =
    Math.log10(clicks + 1) * 8 +
    Math.log10(impressions + 1) * 4 +
    ctr * 100 * 0.05;

  const score = trafficScore + opportunityWeight(position) + businessWeight(row.page);

  if (score >= 16) return { score, action: "migrate_now" };
  if (score >= 9) return { score, action: "improve_then_migrate" };
  return { score, action: "keep_archive_redirect" };
}

function classifyLegacyPath(pathname, { blogBase, categoryBase }) {
  if (pathname === "/") {
    return {
      legacyType: "home",
      migrationAction: "keep_path",
      suggestedTargetPath: "/",
      confidence: "high",
    };
  }

  if (/^\/\d+$/.test(pathname)) {
    return {
      legacyType: "root_pagination",
      migrationAction: "redirect_auto",
      suggestedTargetPath: blogBase,
      confidence: "high",
    };
  }

  if (pathname === "/posts" || /^\/posts\/\d+$/.test(pathname)) {
    return {
      legacyType: "posts_index",
      migrationAction: "redirect_auto",
      suggestedTargetPath: blogBase,
      confidence: "high",
    };
  }

  if (pathname === "/category") {
    return {
      legacyType: "category_index",
      migrationAction: "redirect_auto",
      suggestedTargetPath: categoryBase,
      confidence: "high",
    };
  }

  if (/^\/category\/.+\/\d+$/.test(pathname)) {
    const slug = pathname.split("/")[2];
    return {
      legacyType: "category_pagination",
      migrationAction: "redirect_auto",
      suggestedTargetPath: `${categoryBase}/${slug}`,
      confidence: "high",
    };
  }

  if (pathname.startsWith("/category/")) {
    const slug = pathname.split("/")[2];
    return {
      legacyType: "category",
      migrationAction: "redirect_auto",
      suggestedTargetPath: `${categoryBase}/${slug}`,
      confidence: "high",
    };
  }

  if (pathname === "/services" || pathname.startsWith("/services/")) {
    return {
      legacyType: "service",
      migrationAction: "keep_path",
      suggestedTargetPath: pathname,
      confidence: "high",
    };
  }

  if (pathname === "/products" || pathname.startsWith("/products/")) {
    return {
      legacyType: "product",
      migrationAction: "keep_path",
      suggestedTargetPath: pathname,
      confidence: "high",
    };
  }

  if (pathname === "/projects" || /^\/projects\/\d+$/.test(pathname)) {
    return {
      legacyType: "project_index",
      migrationAction: "review_manual",
      suggestedTargetPath: "/services",
      confidence: "low",
    };
  }

  if (pathname.startsWith("/projects/")) {
    return {
      legacyType: "project_detail",
      migrationAction: "review_manual",
      suggestedTargetPath: "/services",
      confidence: "low",
    };
  }

  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 1) {
    return {
      legacyType: "root_post_legacy",
      migrationAction: "redirect_auto",
      suggestedTargetPath: `${blogBase}/${segments[0]}`,
      confidence: "medium",
    };
  }

  return {
    legacyType: "other_nested",
    migrationAction: "review_manual",
    suggestedTargetPath: "",
    confidence: "low",
  };
}

function csvEscape(value) {
  if (value == null) return "";
  const str = String(value);
  if (/[",\n]/.test(str)) {
    return `"${str.replaceAll('"', '""')}"`;
  }
  return str;
}

async function writeCsv(filePath, rows, headers) {
  const lines = [headers.join(",")];
  for (const row of rows) {
    lines.push(headers.map((header) => csvEscape(row[header])).join(","));
  }
  await fs.writeFile(filePath, `${lines.join("\n")}\n`, "utf8");
}

async function fetchSearchAnalytics({
  webmasters,
  siteUrl,
  startDate,
  endDate,
  dimensions,
  rowLimit,
}) {
  const rows = [];
  let startRow = 0;

  while (true) {
    const res = await webmasters.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions,
        type: "web",
        rowLimit,
        startRow,
      },
    });

    const batch = res.data.rows || [];
    if (!batch.length) break;

    rows.push(...batch);
    if (batch.length < rowLimit) break;
    startRow += rowLimit;
  }

  return rows;
}

async function safeFetchAnalytics(params) {
  try {
    return await fetchSearchAnalytics(params);
  } catch (error) {
    const dims = params.dimensions.join(",");
    console.warn(`Skip dimensions [${dims}] due to error: ${error.message}`);
    return [];
  }
}

function aggregateRows(rawRows, dimensions) {
  const map = new Map();

  for (const row of rawRows) {
    const keyObj = {};
    dimensions.forEach((dimension, index) => {
      keyObj[dimension] = row.keys?.[index] ?? "";
    });

    if ("page" in keyObj) {
      keyObj.page = normalizeUrl(keyObj.page);
    }

    const key = JSON.stringify(keyObj);
    const current = map.get(key) || {
      ...keyObj,
      clicks: 0,
      impressions: 0,
      ctrClicks: 0,
      ctrImpressions: 0,
      positionWeighted: 0,
      positionImpressions: 0,
    };

    const clicks = Number(row.clicks || 0);
    const impressions = Number(row.impressions || 0);
    const position = Number(row.position || 0);

    current.clicks += clicks;
    current.impressions += impressions;
    current.ctrClicks += clicks;
    current.ctrImpressions += impressions;
    current.positionWeighted += position * impressions;
    current.positionImpressions += impressions;

    map.set(key, current);
  }

  return Array.from(map.values()).map((row) => {
    const ctr = row.ctrImpressions > 0 ? row.ctrClicks / row.ctrImpressions : 0;
    const position =
      row.positionImpressions > 0 ? row.positionWeighted / row.positionImpressions : 0;

    const normalized = { ...row, ctr, position };
    delete normalized.ctrClicks;
    delete normalized.ctrImpressions;
    delete normalized.positionWeighted;
    delete normalized.positionImpressions;
    return normalized;
  });
}

async function extractSitemapUrls(sitemapUrl) {
  if (!sitemapUrl) return [];

  const res = await fetch(sitemapUrl, { method: "GET" });
  if (!res.ok) {
    throw new Error(`Failed to fetch sitemap (${res.status})`);
  }

  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => normalizeUrl(m[1]));
  return Array.from(new Set(urls));
}

function buildMigrationRows(scoredPages, args) {
  return scoredPages.map((row) => {
    const pathname = getPathname(row.page);
    const mapping = classifyLegacyPath(pathname, args);

    return {
      ...row,
      oldPath: pathname,
      legacyType: mapping.legacyType,
      migrationAction: mapping.migrationAction,
      suggestedTargetPath: mapping.suggestedTargetPath,
      mappingConfidence: mapping.confidence,
    };
  });
}

function buildAutoRedirectRows(migrationRows, minImpressionsForAuto) {
  const map = new Map();

  for (const row of migrationRows) {
    if (row.migrationAction !== "redirect_auto") continue;
    if (!row.suggestedTargetPath) continue;
    if (Number(row.impressions || 0) < minImpressionsForAuto) continue;

    const source = row.oldPath;
    const existing = map.get(source);
    if (!existing || Number(row.clicks || 0) > Number(existing.clicks || 0)) {
      map.set(source, {
        source,
        destination: row.suggestedTargetPath,
        permanent: true,
        isEnabled: true,
        clicks: row.clicks,
        impressions: row.impressions,
        priorityScore: row.priorityScore,
      });
    }
  }

  return Array.from(map.values()).sort((a, b) => Number(b.clicks) - Number(a.clicks));
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    printHelp();
    return;
  }

  assertRequired(args);

  const auth = new google.auth.GoogleAuth({ scopes: [WEBMASTERS_SCOPE] });
  const authClient = await auth.getClient();
  const webmasters = google.webmasters({ version: "v3", auth: authClient });

  const [pagesRaw, queriesRaw, pageQueryRaw, pageCountryRaw, pageDeviceRaw] = await Promise.all([
    fetchSearchAnalytics({
      webmasters,
      siteUrl: args.siteUrl,
      startDate: args.startDate,
      endDate: args.endDate,
      dimensions: ["page"],
      rowLimit: args.rowLimit,
    }),
    fetchSearchAnalytics({
      webmasters,
      siteUrl: args.siteUrl,
      startDate: args.startDate,
      endDate: args.endDate,
      dimensions: ["query"],
      rowLimit: args.rowLimit,
    }),
    fetchSearchAnalytics({
      webmasters,
      siteUrl: args.siteUrl,
      startDate: args.startDate,
      endDate: args.endDate,
      dimensions: ["page", "query"],
      rowLimit: args.rowLimit,
    }),
    safeFetchAnalytics({
      webmasters,
      siteUrl: args.siteUrl,
      startDate: args.startDate,
      endDate: args.endDate,
      dimensions: ["page", "country"],
      rowLimit: args.rowLimit,
    }),
    safeFetchAnalytics({
      webmasters,
      siteUrl: args.siteUrl,
      startDate: args.startDate,
      endDate: args.endDate,
      dimensions: ["page", "device"],
      rowLimit: args.rowLimit,
    }),
  ]);

  let pages = aggregateRows(pagesRaw, ["page"]).sort((a, b) => b.clicks - a.clicks);
  const queries = aggregateRows(queriesRaw, ["query"]).sort((a, b) => b.clicks - a.clicks);
  const pageQuery = aggregateRows(pageQueryRaw, ["page", "query"]).sort(
    (a, b) => b.clicks - a.clicks,
  );
  const pageCountry = aggregateRows(pageCountryRaw, ["page", "country"]).sort(
    (a, b) => b.clicks - a.clicks,
  );
  const pageDevice = aggregateRows(pageDeviceRaw, ["page", "device"]).sort(
    (a, b) => b.clicks - a.clicks,
  );

  if (args.sitemapUrl) {
    try {
      const sitemapUrls = await extractSitemapUrls(args.sitemapUrl);
      const existingPages = new Set(pages.map((row) => row.page));
      const missing = sitemapUrls
        .filter((url) => !existingPages.has(url))
        .map((url) => ({
          page: url,
          clicks: 0,
          impressions: 0,
          ctr: 0,
          position: 0,
        }));

      if (missing.length) {
        pages = [...pages, ...missing];
      }
    } catch (error) {
      console.warn(`Skip sitemap enrichment due to error: ${error.message}`);
    }
  }

  const scoredPages = pages
    .map((row) => {
      const { score, action } = calculatePriority(row);
      return {
        ...row,
        priorityScore: Number(score.toFixed(2)),
        seoPriorityAction: action,
      };
    })
    .sort((a, b) => b.priorityScore - a.priorityScore);

  const migrationRows = buildMigrationRows(scoredPages, args);
  const autoRedirectRows = buildAutoRedirectRows(
    migrationRows,
    args.minImpressionsForAuto,
  );

  const actionSummary = migrationRows.reduce((acc, row) => {
    acc[row.migrationAction] = (acc[row.migrationAction] || 0) + 1;
    return acc;
  }, {});

  const typeSummary = migrationRows.reduce((acc, row) => {
    acc[row.legacyType] = (acc[row.legacyType] || 0) + 1;
    return acc;
  }, {});

  const outDir = path.resolve(process.cwd(), args.outDir);
  await fs.mkdir(outDir, { recursive: true });

  await writeCsv(path.join(outDir, "gsc-pages.csv"), pages, [
    "page",
    "clicks",
    "impressions",
    "ctr",
    "position",
  ]);

  await writeCsv(path.join(outDir, "gsc-queries.csv"), queries, [
    "query",
    "clicks",
    "impressions",
    "ctr",
    "position",
  ]);

  await writeCsv(path.join(outDir, "gsc-page-query.csv"), pageQuery, [
    "page",
    "query",
    "clicks",
    "impressions",
    "ctr",
    "position",
  ]);

  await writeCsv(path.join(outDir, "gsc-page-country.csv"), pageCountry, [
    "page",
    "country",
    "clicks",
    "impressions",
    "ctr",
    "position",
  ]);

  await writeCsv(path.join(outDir, "gsc-page-device.csv"), pageDevice, [
    "page",
    "device",
    "clicks",
    "impressions",
    "ctr",
    "position",
  ]);

  await writeCsv(path.join(outDir, "gsc-pages-priority.csv"), scoredPages, [
    "page",
    "clicks",
    "impressions",
    "ctr",
    "position",
    "priorityScore",
    "seoPriorityAction",
  ]);

  await writeCsv(path.join(outDir, "gsc-migration-curation.csv"), migrationRows, [
    "page",
    "oldPath",
    "clicks",
    "impressions",
    "ctr",
    "position",
    "priorityScore",
    "seoPriorityAction",
    "legacyType",
    "migrationAction",
    "suggestedTargetPath",
    "mappingConfidence",
  ]);

  await writeCsv(path.join(outDir, "gsc-redirect-auto-import.csv"), autoRedirectRows, [
    "source",
    "destination",
    "permanent",
    "isEnabled",
    "clicks",
    "impressions",
    "priorityScore",
  ]);

  await fs.writeFile(
    path.join(outDir, "gsc-summary.json"),
    JSON.stringify(
      {
        args: {
          siteUrl: args.siteUrl,
          startDate: args.startDate,
          endDate: args.endDate,
          rowLimit: args.rowLimit,
          blogBase: args.blogBase,
          categoryBase: args.categoryBase,
          minImpressionsForAuto: args.minImpressionsForAuto,
          sitemapUrl: args.sitemapUrl || null,
        },
        totals: {
          pages: pages.length,
          queries: queries.length,
          pageQuery: pageQuery.length,
          pageCountry: pageCountry.length,
          pageDevice: pageDevice.length,
          autoRedirectRows: autoRedirectRows.length,
        },
        migrationSummary: {
          actionSummary,
          typeSummary,
        },
      },
      null,
      2,
    ),
    "utf8",
  );

  console.log(`Export completed:\n- ${path.join(outDir, "gsc-pages.csv")}\n- ${path.join(
    outDir,
    "gsc-queries.csv",
  )}\n- ${path.join(outDir, "gsc-page-query.csv")}\n- ${path.join(
    outDir,
    "gsc-page-country.csv",
  )}\n- ${path.join(outDir, "gsc-page-device.csv")}\n- ${path.join(
    outDir,
    "gsc-pages-priority.csv",
  )}\n- ${path.join(outDir, "gsc-migration-curation.csv")}\n- ${path.join(
    outDir,
    "gsc-redirect-auto-import.csv",
  )}\n- ${path.join(outDir, "gsc-summary.json")}`);
}

main().catch((error) => {
  console.error("GSC export failed:", error.message);
  process.exit(1);
});
