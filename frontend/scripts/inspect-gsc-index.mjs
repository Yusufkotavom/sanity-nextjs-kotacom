#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { google } from "googleapis";

const WEBMASTERS_SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";

function parseArgs(argv) {
  const args = {
    siteUrl: process.env.GSC_SITE_URL || "",
    inputCsv: process.env.GSC_INPUT_CSV || "./tmp/gsc/gsc-pages.csv",
    inputColumn: process.env.GSC_INPUT_COLUMN || "page",
    outDir: process.env.GSC_OUT_DIR || "./tmp/gsc",
    concurrency: Number(process.env.GSC_INSPECTION_CONCURRENCY || 3),
    delayMs: Number(process.env.GSC_INSPECTION_DELAY_MS || 0),
    maxUrls: Number(process.env.GSC_MAX_URLS || 0),
    languageCode: process.env.GSC_LANGUAGE_CODE || "id-ID",
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
      case "input-csv":
        args.inputCsv = value;
        if (inlineValue == null) i += 1;
        break;
      case "input-column":
        args.inputColumn = value;
        if (inlineValue == null) i += 1;
        break;
      case "out-dir":
        args.outDir = value;
        if (inlineValue == null) i += 1;
        break;
      case "concurrency":
        args.concurrency = Number(value);
        if (inlineValue == null) i += 1;
        break;
      case "delay-ms":
        args.delayMs = Number(value);
        if (inlineValue == null) i += 1;
        break;
      case "max-urls":
        args.maxUrls = Number(value);
        if (inlineValue == null) i += 1;
        break;
      case "language-code":
        args.languageCode = value;
        if (inlineValue == null) i += 1;
        break;
      default:
        break;
    }
  }

  return args;
}

function printHelp() {
  console.log(`Inspect indexing status per URL using Google Search Console URL Inspection API\n\nUsage:\n  pnpm --filter frontend exec node scripts/inspect-gsc-index.mjs -- \\
    --site-url https://www.kotacom.id/ \\
    --input-csv ./tmp/gsc-kotacom-full/gsc-pages.csv \\
    --input-column page \\
    --out-dir ./tmp/gsc-kotacom-full\n\nRequired:\n  --site-url        GSC property URL (or sc-domain:...)\n\nOptional:\n  --input-csv       Source CSV with URLs (default: ./tmp/gsc/gsc-pages.csv)\n  --input-column    URL column name (default: page)\n  --out-dir         Output directory (default: ./tmp/gsc)\n  --concurrency     Parallel requests (default: 3)\n  --delay-ms        Delay per task (default: 0)\n  --max-urls        Limit URLs (0 = all)\n  --language-code   Language code for inspection API (default: id-ID)\n`);
}

function assertRequired(args) {
  if (!args.siteUrl) throw new Error("Missing --site-url");
  if (!Number.isFinite(args.concurrency) || args.concurrency < 1) {
    throw new Error("concurrency must be >= 1");
  }
  if (!Number.isFinite(args.maxUrls) || args.maxUrls < 0) {
    throw new Error("max-urls must be >= 0");
  }
}

function csvEscape(value) {
  if (value == null) return "";
  const str = String(value);
  if (/[",\n]/.test(str)) return `"${str.replaceAll('"', '""')}"`;
  return str;
}

async function writeCsv(filePath, rows, headers) {
  const lines = [headers.join(",")];
  for (const row of rows) {
    lines.push(headers.map((h) => csvEscape(row[h])).join(","));
  }
  await fs.writeFile(filePath, `${lines.join("\n")}\n`, "utf8");
}

function parseCsv(text) {
  const lines = text.replace(/^\uFEFF/, "").split(/\r?\n/).filter(Boolean);
  if (!lines.length) return [];

  const parseLine = (line) => {
    const out = [];
    let cur = "";
    let quoted = false;
    for (let i = 0; i < line.length; i += 1) {
      const ch = line[i];
      if (ch === '"') {
        if (quoted && line[i + 1] === '"') {
          cur += '"';
          i += 1;
        } else {
          quoted = !quoted;
        }
      } else if (ch === "," && !quoted) {
        out.push(cur);
        cur = "";
      } else {
        cur += ch;
      }
    }
    out.push(cur);
    return out;
  };

  const headers = parseLine(lines[0]);
  return lines.slice(1).map((line) => {
    const cols = parseLine(line);
    const row = {};
    headers.forEach((h, idx) => {
      row[h] = cols[idx] ?? "";
    });
    return row;
  });
}

function normalizeUrl(raw) {
  try {
    const u = new URL(raw);
    const host = u.hostname.toLowerCase();
    const pathname = u.pathname === "/" ? "/" : u.pathname.replace(/\/+$/, "");
    return `https://${host}${pathname || "/"}`;
  } catch {
    return raw;
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runWithConcurrency(items, worker, concurrency) {
  const results = [];
  let idx = 0;

  async function loop() {
    while (idx < items.length) {
      const currentIndex = idx;
      idx += 1;
      results[currentIndex] = await worker(items[currentIndex], currentIndex);
    }
  }

  await Promise.all(Array.from({ length: concurrency }, () => loop()));
  return results;
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    printHelp();
    return;
  }
  assertRequired(args);

  const inputPath = path.resolve(process.cwd(), args.inputCsv);
  const outDir = path.resolve(process.cwd(), args.outDir);
  await fs.mkdir(outDir, { recursive: true });

  const csvText = await fs.readFile(inputPath, "utf8");
  const rows = parseCsv(csvText);
  if (!rows.length) throw new Error("Input CSV has no rows");
  if (!(args.inputColumn in rows[0])) {
    throw new Error(`Column '${args.inputColumn}' not found in input CSV`);
  }

  const uniqueUrls = Array.from(
    new Set(rows.map((r) => normalizeUrl(r[args.inputColumn])).filter(Boolean)),
  );

  const urls = args.maxUrls > 0 ? uniqueUrls.slice(0, args.maxUrls) : uniqueUrls;

  const auth = new google.auth.GoogleAuth({ scopes: [WEBMASTERS_SCOPE] });
  const authClient = await auth.getClient();
  const searchconsole = google.searchconsole({ version: "v1", auth: authClient });

  let processed = 0;
  const start = Date.now();

  const inspected = await runWithConcurrency(
    urls,
    async (url) => {
      if (args.delayMs > 0) await sleep(args.delayMs);

      try {
        const res = await searchconsole.urlInspection.index.inspect({
          requestBody: {
            inspectionUrl: url,
            siteUrl: args.siteUrl,
            languageCode: args.languageCode,
          },
        });

        const result = res.data.inspectionResult?.indexStatusResult || {};
        processed += 1;

        if (processed % 100 === 0 || processed === urls.length) {
          const elapsedSec = Math.max((Date.now() - start) / 1000, 1);
          const rate = (processed / elapsedSec).toFixed(2);
          console.log(`inspected ${processed}/${urls.length} (${rate} url/s)`);
        }

        return {
          url,
          verdict: result.verdict || "",
          coverageState: result.coverageState || "",
          robotsTxtState: result.robotsTxtState || "",
          indexingState: result.indexingState || "",
          pageFetchState: result.pageFetchState || "",
          googleCanonical: result.googleCanonical || "",
          userCanonical: result.userCanonical || "",
          lastCrawlTime: result.lastCrawlTime || "",
          referrerUrls: Array.isArray(result.referringUrls)
            ? result.referringUrls.join(" | ")
            : "",
          sitemapUrls: Array.isArray(result.sitemap)
            ? result.sitemap.join(" | ")
            : "",
          inspectionError: "",
        };
      } catch (error) {
        processed += 1;
        return {
          url,
          verdict: "",
          coverageState: "",
          robotsTxtState: "",
          indexingState: "",
          pageFetchState: "",
          googleCanonical: "",
          userCanonical: "",
          lastCrawlTime: "",
          referrerUrls: "",
          sitemapUrls: "",
          inspectionError: error?.message || "unknown error",
        };
      }
    },
    args.concurrency,
  );

  const summary = {
    totalUrls: inspected.length,
    ok: inspected.filter((r) => !r.inspectionError).length,
    errors: inspected.filter((r) => r.inspectionError).length,
    verdicts: inspected.reduce((acc, row) => {
      const key = row.verdict || "UNKNOWN";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {}),
    indexingStates: inspected.reduce((acc, row) => {
      const key = row.indexingState || "UNKNOWN";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {}),
  };

  const csvPath = path.join(outDir, "gsc-url-inspection.csv");
  const jsonPath = path.join(outDir, "gsc-url-inspection-summary.json");

  await writeCsv(csvPath, inspected, [
    "url",
    "verdict",
    "coverageState",
    "robotsTxtState",
    "indexingState",
    "pageFetchState",
    "googleCanonical",
    "userCanonical",
    "lastCrawlTime",
    "referrerUrls",
    "sitemapUrls",
    "inspectionError",
  ]);

  await fs.writeFile(jsonPath, JSON.stringify(summary, null, 2), "utf8");

  console.log(`Inspection completed:\n- ${csvPath}\n- ${jsonPath}`);
}

main().catch((error) => {
  console.error("GSC index inspection failed:", error.message);
  process.exit(1);
});
