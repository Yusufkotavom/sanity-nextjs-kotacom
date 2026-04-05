#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

function parseArgs(argv) {
  const args = {
    migrationCsv:
      process.env.MIGRATION_CSV || "./tmp/gsc/gsc-migration-curation.csv",
    inspectionCsv:
      process.env.INSPECTION_CSV || "./tmp/gsc/gsc-url-inspection.csv",
    metadataCsv:
      process.env.METADATA_CSV || "./tmp/gsc/seo-metadata-audit.csv",
    outDir: process.env.MERGE_OUT_DIR || "./tmp/gsc",
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
      case "migration-csv":
        args.migrationCsv = value;
        if (inlineValue == null) i += 1;
        break;
      case "inspection-csv":
        args.inspectionCsv = value;
        if (inlineValue == null) i += 1;
        break;
      case "metadata-csv":
        args.metadataCsv = value;
        if (inlineValue == null) i += 1;
        break;
      case "out-dir":
        args.outDir = value;
        if (inlineValue == null) i += 1;
        break;
      default:
        break;
    }
  }

  return args;
}

function printHelp() {
  console.log(`Merge migration curation + index inspection + metadata audit\n\nUsage:\n  pnpm --filter seo-dashboard exec node scripts/merge-gsc-migration-health.mjs -- \\
    --migration-csv ./tmp/gsc-kotacom-full/gsc-migration-curation.csv \\
    --inspection-csv ./tmp/gsc-kotacom-full/gsc-url-inspection.csv \\
    --metadata-csv ./tmp/gsc-kotacom-full/seo-metadata-audit.csv \\
    --out-dir ./tmp/gsc-kotacom-full\n`);
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

function parseIssues(raw) {
  return String(raw || "")
    .split("|")
    .map((x) => x.trim())
    .filter(Boolean);
}

function assignReadiness(row) {
  if (row.migrationAction === "keep_path") return "keep_verify";
  if (row.migrationAction === "review_manual") return "manual_mapping_required";

  const inspectionError = Boolean(row.inspectionError);
  const metadataError = Boolean(row.fetchError);
  const issues = parseIssues(row.metadataIssues);
  const hardMetaIssues = issues.filter((x) =>
    [
      "fetch_error",
      "http_status_not_200",
      "missing_title",
      "missing_meta_description",
      "missing_canonical",
      "missing_og_title",
      "missing_og_description",
      "missing_og_image",
    ].includes(x),
  );

  const indexBlocked =
    /BLOCKED|NOT_INDEXED|NOINDEX|ROBOTS/i.test(row.indexingState || "") ||
    /FAIL|NEUTRAL/i.test(row.verdict || "");

  if (!inspectionError && !metadataError && !indexBlocked && hardMetaIssues.length === 0) {
    return "ready_to_redirect";
  }
  if (inspectionError) return "needs_index_recheck";
  if (metadataError || hardMetaIssues.length > 0) return "needs_metadata_fix";
  if (indexBlocked) return "needs_index_fix";
  return "needs_review";
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    printHelp();
    return;
  }

  const outDir = path.resolve(process.cwd(), args.outDir);
  await fs.mkdir(outDir, { recursive: true });

  const [migrationText, inspectionText, metadataText] = await Promise.all([
    fs.readFile(path.resolve(process.cwd(), args.migrationCsv), "utf8"),
    fs.readFile(path.resolve(process.cwd(), args.inspectionCsv), "utf8"),
    fs.readFile(path.resolve(process.cwd(), args.metadataCsv), "utf8"),
  ]);

  const migrationRows = parseCsv(migrationText);
  const inspectionRows = parseCsv(inspectionText);
  const metadataRows = parseCsv(metadataText);

  const inspectionByUrl = new Map(
    inspectionRows.map((r) => [normalizeUrl(r.url), r]),
  );
  const metadataByUrl = new Map(
    metadataRows.map((r) => [normalizeUrl(r.url), r]),
  );

  const merged = migrationRows.map((row) => {
    const url = normalizeUrl(row.page);
    const inspection = inspectionByUrl.get(url) || {};
    const metadata = metadataByUrl.get(url) || {};

    const mergedRow = {
      page: row.page,
      oldPath: row.oldPath,
      clicks: Number(row.clicks || 0),
      impressions: Number(row.impressions || 0),
      priorityScore: Number(row.priorityScore || 0),
      seoPriorityAction: row.seoPriorityAction,
      migrationAction: row.migrationAction,
      suggestedTargetPath: row.suggestedTargetPath,
      legacyType: row.legacyType,
      mappingConfidence: row.mappingConfidence,
      verdict: inspection.verdict || "",
      indexingState: inspection.indexingState || "",
      coverageState: inspection.coverageState || "",
      inspectionError: inspection.inspectionError || "",
      statusCode: Number(metadata.statusCode || 0),
      title: metadata.title || "",
      metaDescription: metadata.metaDescription || "",
      canonical: metadata.canonical || "",
      robots: metadata.robots || "",
      metadataIssues: metadata.issues || "",
      fetchError: metadata.fetchError || "",
    };

    mergedRow.readiness = assignReadiness(mergedRow);
    return mergedRow;
  });

  merged.sort((a, b) => {
    const order = {
      ready_to_redirect: 1,
      keep_verify: 2,
      needs_metadata_fix: 3,
      needs_index_fix: 4,
      needs_index_recheck: 5,
      manual_mapping_required: 6,
      needs_review: 7,
    };
    const oa = order[a.readiness] || 99;
    const ob = order[b.readiness] || 99;
    if (oa !== ob) return oa - ob;
    return b.clicks - a.clicks;
  });

  const summary = {
    total: merged.length,
    byReadiness: merged.reduce((acc, row) => {
      acc[row.readiness] = (acc[row.readiness] || 0) + 1;
      return acc;
    }, {}),
    byMigrationAction: merged.reduce((acc, row) => {
      acc[row.migrationAction] = (acc[row.migrationAction] || 0) + 1;
      return acc;
    }, {}),
  };

  const csvPath = path.join(outDir, "gsc-migration-health-merged.csv");
  const jsonPath = path.join(outDir, "gsc-migration-health-summary.json");

  await writeCsv(csvPath, merged, [
    "page",
    "oldPath",
    "clicks",
    "impressions",
    "priorityScore",
    "seoPriorityAction",
    "migrationAction",
    "suggestedTargetPath",
    "legacyType",
    "mappingConfidence",
    "verdict",
    "indexingState",
    "coverageState",
    "inspectionError",
    "statusCode",
    "title",
    "metaDescription",
    "canonical",
    "robots",
    "metadataIssues",
    "fetchError",
    "readiness",
  ]);

  await fs.writeFile(jsonPath, JSON.stringify(summary, null, 2), "utf8");

  console.log(`Merge completed:\n- ${csvPath}\n- ${jsonPath}`);
}

main().catch((error) => {
  console.error("Merge migration health failed:", error.message);
  process.exit(1);
});
