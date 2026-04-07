#!/usr/bin/env node
/**
 * Batch PageSpeed Insights v5 (mobile, performance category) for random sitemap URLs.
 *
 * API key (first match) from frontend/.env:
 *   PAGE_SPEED_INSIGHTS_API | GOOGLE_PAGESPEED_API_KEY | PAGESPEED_INSIGHTS_API_KEY
 *
 * Usage:
 *   node scripts/pagespeed-insights-batch.mjs
 *   node scripts/pagespeed-insights-batch.mjs --count=25 --delay-ms=2000
 *   node scripts/pagespeed-insights-batch.mjs --sitemap=https://example.com/sitemap.xml --out=./tmp/psi-batch.json
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FRONTEND_ROOT = path.resolve(__dirname, "..");
const DEFAULT_SITEMAP = "https://www.kotacom.id/sitemap.xml";

function loadEnvFile(filePath) {
  const env = {};
  return readFile(filePath, "utf8")
    .then((text) => {
      for (const line of text.split("\n")) {
        const t = line.trim();
        if (!t || t.startsWith("#")) continue;
        const i = t.indexOf("=");
        if (i === -1) continue;
        let k = t.slice(0, i).trim();
        let v = t.slice(i + 1).trim();
        if (
          (v.startsWith('"') && v.endsWith('"')) ||
          (v.startsWith("'") && v.endsWith("'"))
        ) {
          v = v.slice(1, -1);
        }
        env[k] = v;
      }
      return env;
    })
    .catch(() => ({}));
}

function parseArgs(argv) {
  const out = {
    count: null,
    delayMs: 2000,
    sitemap: DEFAULT_SITEMAP,
    outPath: path.join(FRONTEND_ROOT, "tmp", "pagespeed-batch-latest.json"),
  };
  for (const a of argv) {
    if (a.startsWith("--count=")) out.count = Number(a.slice("--count=".length));
    if (a.startsWith("--delay-ms="))
      out.delayMs = Number(a.slice("--delay-ms=".length));
    if (a.startsWith("--sitemap=")) out.sitemap = a.slice("--sitemap=".length);
    if (a.startsWith("--out=")) out.outPath = path.resolve(FRONTEND_ROOT, a.slice("--out=".length));
  }
  return out;
}

/** Random integer in [min, max] inclusive */
function randomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function auditNumeric(audits, id) {
  const a = audits?.[id];
  if (!a || a.numericValue == null) return null;
  return Math.round(a.numericValue * 1000) / 1000;
}

async function fetchSitemapUrls(sitemapUrl) {
  const res = await fetch(sitemapUrl, {
    headers: { "User-Agent": "Mozilla/5.0 (pagespeed-batch)" },
  });
  if (!res.ok) throw new Error(`Sitemap HTTP ${res.status}`);
  const xml = await res.text();
  const urls = [];
  const re = /<loc>([^<]+)<\/loc>/g;
  let m;
  while ((m = re.exec(xml)) !== null) urls.push(m[1].trim());
  return urls;
}

async function runPagespeed(url, apiKey) {
  const params = new URLSearchParams({
    url,
    strategy: "mobile",
    category: "performance",
    key: apiKey,
  });
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params}`;
  const res = await fetch(apiUrl, {
    headers: { "User-Agent": "Mozilla/5.0 (pagespeed-batch)" },
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    return {
      ok: false,
      status: res.status,
      error: `Non-JSON response (${text.slice(0, 200)})`,
    };
  }
  if (!res.ok) {
    return {
      ok: false,
      status: res.status,
      error: json?.error?.message || JSON.stringify(json?.error || json).slice(0, 300),
    };
  }
  const lh = json.lighthouseResult;
  const audits = lh?.audits || {};
  const perf = lh?.categories?.performance?.score;
  return {
    ok: true,
    status: res.status,
    performanceScore: perf != null ? Math.round(perf * 100) : null,
    lcpMs: auditNumeric(audits, "largest-contentful-paint"),
    cls: auditNumeric(audits, "cumulative-layout-shift"),
    fcpMs: auditNumeric(audits, "first-contentful-paint"),
    tbtMs: auditNumeric(audits, "total-blocking-time"),
    speedIndexMs: auditNumeric(audits, "speed-index"),
  };
}

function average(nums) {
  const n = nums.filter((x) => x != null);
  if (!n.length) return null;
  return Math.round((n.reduce((a, b) => a + b, 0) / n.length) * 10) / 10;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const sampleSize =
    args.count != null && !Number.isNaN(args.count)
      ? args.count
      : randomInt(20, 30);

  const envPath = path.join(FRONTEND_ROOT, ".env");
  const env = await loadEnvFile(envPath);
  const apiKey =
    env.PAGE_SPEED_INSIGHTS_API ||
    env.GOOGLE_PAGESPEED_API_KEY ||
    env.PAGESPEED_INSIGHTS_API_KEY;
  if (!apiKey) {
    console.error(
      "Missing API key: set PAGE_SPEED_INSIGHTS_API (or GOOGLE_PAGESPEED_API_KEY) in frontend/.env",
    );
    process.exit(1);
  }

  console.error(`Sitemap: ${args.sitemap}`);
  console.error(`Sample size: ${sampleSize}, delay: ${args.delayMs}ms`);

  const allUrls = await fetchSitemapUrls(args.sitemap);
  if (allUrls.length < sampleSize) {
    console.error(`Only ${allUrls.length} URLs in sitemap; using all.`);
  }
  const picked = shuffle(allUrls).slice(
    0,
    Math.min(sampleSize, allUrls.length),
  );

  const results = [];
  const startedAt = new Date().toISOString();

  for (let i = 0; i < picked.length; i++) {
    const url = picked[i];
    process.stderr.write(`[${i + 1}/${picked.length}] ${url} ... `);
    const row = { url, index: i + 1 };
    try {
      const data = await runPagespeed(url, apiKey);
      Object.assign(row, data);
      if (data.ok) {
        console.error(`score ${data.performanceScore}`);
      } else {
        console.error(`FAIL ${data.status} ${data.error}`);
      }
    } catch (e) {
      row.ok = false;
      row.error = e?.message || String(e);
      console.error(`ERROR ${row.error}`);
    }
    results.push(row);
    if (i < picked.length - 1 && args.delayMs > 0) {
      await sleep(args.delayMs);
    }
  }

  const okRows = results.filter((r) => r.ok);
  const scores = okRows.map((r) => r.performanceScore).filter((s) => s != null);
  const summary = {
    sitemapUrl: args.sitemap,
    sampleSizeRequested: sampleSize,
    urlsTested: results.length,
    succeeded: okRows.length,
    failed: results.length - okRows.length,
    startedAt,
    finishedAt: new Date().toISOString(),
    delayMsBetweenRequests: args.delayMs,
    performanceScoreAvg: average(scores),
    performanceScoreMin: scores.length ? Math.min(...scores) : null,
    performanceScoreMax: scores.length ? Math.max(...scores) : null,
  };

  const output = { summary, results };
  await mkdir(path.dirname(args.outPath), { recursive: true });
  await writeFile(args.outPath, JSON.stringify(output, null, 2), "utf8");
  console.error(`\nWrote ${args.outPath}`);
  console.log(JSON.stringify(summary, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
