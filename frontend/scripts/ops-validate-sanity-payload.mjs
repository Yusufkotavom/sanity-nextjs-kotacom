#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

function arg(name, fallback = null) {
  const idx = process.argv.indexOf(name);
  if (idx === -1) return fallback;
  return process.argv[idx + 1] ?? fallback;
}

const input = arg("--input");
const output = arg("--output", input);
const writeMode = process.argv.includes("--write");

if (!input) {
  console.error("Usage: node ops-validate-sanity-payload.mjs --input <file.json> [--output <file>] [--write]");
  process.exit(1);
}

function makeKey() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 12);
}

function ensureArrayKeys(node, issues, fixes, pointer = "$") {
  if (!Array.isArray(node)) return;
  node.forEach((item, i) => {
    const p = `${pointer}[${i}]`;
    if (item && typeof item === "object" && !Array.isArray(item) && !item._key) {
      issues.push(`${p} missing _key`);
      item._key = makeKey();
      fixes.push(`${p} _key generated`);
    }
    walk(item, issues, fixes, p);
  });
}

function validateLinkObject(obj, issues, fixes, pointer) {
  const isLinkObj =
    obj &&
    typeof obj === "object" &&
    !Array.isArray(obj) &&
    (obj._type === "link" || "isExternal" in obj || "internalLink" in obj || "href" in obj);
  if (!isLinkObj) return;

  if (typeof obj.isExternal !== "boolean") {
    issues.push(`${pointer} link missing isExternal`);
    if (obj.internalLink) obj.isExternal = false;
    else if (obj.href) obj.isExternal = true;
    else obj.isExternal = false;
    fixes.push(`${pointer} isExternal normalized`);
  }

  if (obj.isExternal === false && !obj.internalLink) {
    issues.push(`${pointer} internal link requires internalLink`);
  }

  if (obj.isExternal === true && !obj.href) {
    issues.push(`${pointer} external link requires href`);
  }
}

function walk(node, issues, fixes, pointer = "$") {
  if (Array.isArray(node)) {
    ensureArrayKeys(node, issues, fixes, pointer);
    return;
  }
  if (!node || typeof node !== "object") return;

  if (typeof node._id === "string" && node._id.includes(".")) {
    issues.push(`${pointer} _id contains dot`);
  }

  validateLinkObject(node, issues, fixes, pointer);

  for (const [k, v] of Object.entries(node)) {
    walk(v, issues, fixes, `${pointer}.${k}`);
  }
}

let payload;
try {
  const raw = await readFile(path.resolve(input), "utf8");
  payload = JSON.parse(raw);
} catch (err) {
  console.error("Failed to read/parse input JSON:", err.message);
  process.exit(1);
}

const issues = [];
const fixes = [];
walk(payload, issues, fixes);

const report = {
  input,
  output,
  writeMode,
  issueCount: issues.length,
  fixCount: fixes.length,
  issues,
  fixes,
};

console.log("[ops-validate-sanity-payload] report");
console.log(JSON.stringify(report, null, 2));

if (writeMode) {
  try {
    await writeFile(path.resolve(output), `${JSON.stringify(payload, null, 2)}\n`, "utf8");
    console.log(`[ops-validate-sanity-payload] wrote ${output}`);
  } catch (err) {
    console.error("Failed to write output:", err.message);
    process.exit(1);
  }
}

if (issues.some((x) => x.includes("requires")) || issues.some((x) => x.includes("_id contains dot"))) {
  process.exit(1);
}
