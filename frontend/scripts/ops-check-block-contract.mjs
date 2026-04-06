#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");

const studioPath = path.join(root, "..", "studio", "schemas", "blocks", "shared", "page-blocks.ts");
const queryPath = path.join(root, "sanity", "queries", "shared", "blocks.ts");
const rendererPath = path.join(root, "components", "blocks", "index.tsx");

const args = new Set(process.argv.slice(2));
const asJson = args.has("--json");

function extractStudioTypes(source) {
  const m = source.match(/of:\s*\[(.*?)\]\s*,\s*options:/s);
  if (!m) return [];
  return [...m[1].matchAll(/type:\s*"([^"]+)"/g)].map((x) => x[1]);
}

function extractRendererTypes(source) {
  const m = source.match(/const componentMap:[\s\S]*?=\s*\{([\s\S]*?)\};/);
  if (!m) return [];
  const quoted = [...m[1].matchAll(/"([^"]+)"\s*:/g)].map((x) => x[1]);
  const bare = [...m[1].matchAll(/(?:^|\n)\s*([a-zA-Z0-9-]+)\s*:/g)].map((x) => x[1]);
  const all = [...new Set([...quoted, ...bare])];
  if (all.includes("rich-content") && !all.includes("legacy-rich-content")) all.push("legacy-rich-content");
  return all;
}

async function extractQueryTypes(querySource, sharedSource) {
  const importMap = new Map();
  for (const match of sharedSource.matchAll(/import\s+\{\s*(\w+)\s*\}\s+from\s+"(.*?)";/g)) {
    importMap.set(match[1], match[2]);
  }
  const usedVars = [...sharedSource.matchAll(/\$\{(\w+)\}/g)].map((m) => m[1]);
  const types = [];
  for (const varName of usedVars) {
    const rel = importMap.get(varName);
    if (!rel) continue;
    const file = path.resolve(path.dirname(queryPath), `${rel}.ts`);
    try {
      const src = await readFile(file, "utf8");
      const t = [...src.matchAll(/_type\s*==\s*"([^"]+)"/g)].map((x) => x[1]);
      types.push(...t);
    } catch {
      // ignore unresolved imports for contract report
    }
  }
  return [...new Set(types)];
}

function diff(a, b) {
  const bs = new Set(b);
  return a.filter((x) => !bs.has(x));
}

const [studioSrc, querySrc, rendererSrc] = await Promise.all([
  readFile(studioPath, "utf8"),
  readFile(queryPath, "utf8"),
  readFile(rendererPath, "utf8"),
]);

const studioTypes = [...new Set(extractStudioTypes(studioSrc))];
const queryTypes = await extractQueryTypes(queryPath, querySrc);
const rendererTypes = [...new Set(extractRendererTypes(rendererSrc))];

const allowedRendererOnly = new Set(["rich-content"]);

const report = {
  counts: {
    studio: studioTypes.length,
    query: queryTypes.length,
    renderer: rendererTypes.length,
  },
  missingInQueryFromStudio: diff(studioTypes, queryTypes),
  missingInRendererFromStudio: diff(studioTypes, rendererTypes),
  missingInStudioFromRenderer: diff(rendererTypes, studioTypes).filter((x) => !allowedRendererOnly.has(x)),
};

const hasMismatch =
  report.missingInQueryFromStudio.length > 0 ||
  report.missingInRendererFromStudio.length > 0 ||
  report.missingInStudioFromRenderer.length > 0;

if (asJson) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log("[ops-check-block-contract] report");
  console.log(JSON.stringify(report, null, 2));
}

if (hasMismatch) {
  console.error("[ops-check-block-contract] mismatch detected");
  process.exit(1);
}

console.log("[ops-check-block-contract] contract is in sync");
