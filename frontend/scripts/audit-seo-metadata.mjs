#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

function parseArgs(argv) {
  const args = {
    inputCsv: process.env.SEO_AUDIT_INPUT_CSV || "./tmp/gsc/gsc-pages.csv",
    inputColumn: process.env.SEO_AUDIT_INPUT_COLUMN || "page",
    outDir: process.env.SEO_AUDIT_OUT_DIR || "./tmp/gsc",
    concurrency: Number(process.env.SEO_AUDIT_CONCURRENCY || 8),
    maxUrls: Number(process.env.SEO_AUDIT_MAX_URLS || 0),
    timeoutMs: Number(process.env.SEO_AUDIT_TIMEOUT_MS || 15000),
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
      case "max-urls":
        args.maxUrls = Number(value);
        if (inlineValue == null) i += 1;
        break;
      case "timeout-ms":
        args.timeoutMs = Number(value);
        if (inlineValue == null) i += 1;
        break;
      default:
        break;
    }
  }

  return args;
}

function printHelp() {
  console.log(`Audit SEO metadata for each URL from CSV\n\nUsage:\n  pnpm --filter frontend exec node scripts/audit-seo-metadata.mjs -- \\
    --input-csv ./tmp/gsc-kotacom-full/gsc-pages.csv \\
    --input-column page \\
    --out-dir ./tmp/gsc-kotacom-full \\
    --concurrency 8\n`);
}

function assertArgs(args) {
  if (!Number.isFinite(args.concurrency) || args.concurrency < 1) {
    throw new Error("concurrency must be >= 1");
  }
  if (!Number.isFinite(args.maxUrls) || args.maxUrls < 0) {
    throw new Error("max-urls must be >= 0");
  }
  if (!Number.isFinite(args.timeoutMs) || args.timeoutMs < 1000) {
    throw new Error("timeout-ms must be >= 1000");
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
    const host = u.hostname.replace(/^www\./i, "").toLowerCase();
    const pathname = u.pathname === "/" ? "/" : u.pathname.replace(/\/+$/, "");
    return `https://${host}${pathname || "/"}`;
  } catch {
    return raw;
  }
}

function decodeHtml(s = "") {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

function findTitle(html) {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return m ? decodeHtml(m[1].replace(/\s+/g, " ")) : "";
}

function findMetaContent(html, name) {
  const patterns = [
    new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']*)["'][^>]*>`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+name=["']${name}["'][^>]*>`, "i"),
  ];

  for (const p of patterns) {
    const m = html.match(p);
    if (m) return decodeHtml(m[1]);
  }
  return "";
}

function findMetaProperty(html, property) {
  const patterns = [
    new RegExp(`<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']*)["'][^>]*>`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+property=["']${property}["'][^>]*>`, "i"),
  ];

  for (const p of patterns) {
    const m = html.match(p);
    if (m) return decodeHtml(m[1]);
  }
  return "";
}

function findCanonical(html) {
  const m = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/i)
    || html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["'][^>]*>/i);
  return m ? decodeHtml(m[1]) : "";
}

function findH1(html) {
  const m = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (!m) return "";
  const plain = m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  return decodeHtml(plain);
}

function buildIssues(row) {
  const issues = [];

  if (row.fetchError) return ["fetch_error"];
  if (row.statusCode !== 200) issues.push("http_status_not_200");
  if (!row.title) issues.push("missing_title");
  if (row.title && row.title.length < 30) issues.push("title_too_short");
  if (row.title && row.title.length > 70) issues.push("title_too_long");

  if (!row.metaDescription) issues.push("missing_meta_description");
  if (row.metaDescription && row.metaDescription.length < 70) {
    issues.push("meta_description_too_short");
  }
  if (row.metaDescription && row.metaDescription.length > 170) {
    issues.push("meta_description_too_long");
  }

  if (!row.canonical) issues.push("missing_canonical");
  if (!row.ogTitle) issues.push("missing_og_title");
  if (!row.ogDescription) issues.push("missing_og_description");
  if (!row.ogImage) issues.push("missing_og_image");

  return issues;
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

async function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "user-agent":
          "Mozilla/5.0 (compatible; KotacomMigrationAudit/1.0; +https://kotacom.id)",
      },
    });
    const html = await res.text();
    return { res, html };
  } finally {
    clearTimeout(timer);
  }
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    printHelp();
    return;
  }
  assertArgs(args);

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

  let processed = 0;
  const started = Date.now();

  const auditRows = await runWithConcurrency(
    urls,
    async (url) => {
      try {
        const { res, html } = await fetchWithTimeout(url, args.timeoutMs);

        const title = findTitle(html);
        const metaDescription = findMetaContent(html, "description");
        const robots = findMetaContent(html, "robots");
        const canonical = findCanonical(html);
        const ogTitle = findMetaProperty(html, "og:title");
        const ogDescription = findMetaProperty(html, "og:description");
        const ogImage = findMetaProperty(html, "og:image");
        const h1 = findH1(html);

        const row = {
          url,
          finalUrl: normalizeUrl(res.url || url),
          statusCode: Number(res.status || 0),
          title,
          titleLength: title.length,
          metaDescription,
          metaDescriptionLength: metaDescription.length,
          robots,
          canonical,
          ogTitle,
          ogDescription,
          ogImage,
          h1,
          noindex: /noindex/i.test(robots),
          fetchError: "",
        };

        const issues = buildIssues(row);
        processed += 1;
        if (processed % 100 === 0 || processed === urls.length) {
          const elapsedSec = Math.max((Date.now() - started) / 1000, 1);
          console.log(
            `audited ${processed}/${urls.length} (${(processed / elapsedSec).toFixed(2)} url/s)`,
          );
        }

        return {
          ...row,
          issueCount: issues.length,
          issues: issues.join("|"),
        };
      } catch (error) {
        processed += 1;
        return {
          url,
          finalUrl: "",
          statusCode: 0,
          title: "",
          titleLength: 0,
          metaDescription: "",
          metaDescriptionLength: 0,
          robots: "",
          canonical: "",
          ogTitle: "",
          ogDescription: "",
          ogImage: "",
          h1: "",
          noindex: false,
          fetchError: error?.message || "unknown error",
          issueCount: 1,
          issues: "fetch_error",
        };
      }
    },
    args.concurrency,
  );

  const summary = {
    totalUrls: auditRows.length,
    okFetch: auditRows.filter((r) => !r.fetchError).length,
    fetchErrors: auditRows.filter((r) => r.fetchError).length,
    withIssues: auditRows.filter((r) => Number(r.issueCount || 0) > 0).length,
    issueBreakdown: auditRows.reduce((acc, row) => {
      if (!row.issues) return acc;
      for (const key of String(row.issues).split("|").filter(Boolean)) {
        acc[key] = (acc[key] || 0) + 1;
      }
      return acc;
    }, {}),
  };

  const csvPath = path.join(outDir, "seo-metadata-audit.csv");
  const jsonPath = path.join(outDir, "seo-metadata-audit-summary.json");

  await writeCsv(csvPath, auditRows, [
    "url",
    "finalUrl",
    "statusCode",
    "title",
    "titleLength",
    "metaDescription",
    "metaDescriptionLength",
    "robots",
    "canonical",
    "ogTitle",
    "ogDescription",
    "ogImage",
    "h1",
    "noindex",
    "fetchError",
    "issueCount",
    "issues",
  ]);

  await fs.writeFile(jsonPath, JSON.stringify(summary, null, 2), "utf8");

  console.log(`Metadata audit completed:\n- ${csvPath}\n- ${jsonPath}`);
}

main().catch((error) => {
  console.error("SEO metadata audit failed:", error.message);
  process.exit(1);
});
