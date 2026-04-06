#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import path from "node:path";

const allowedTypes = new Set([
  "post",
  "product",
  "service",
  "project",
  "pageLocation",
  "serviceLocation",
]);

function getArg(name, fallback = null) {
  const idx = process.argv.indexOf(name);
  if (idx === -1) return fallback;
  return process.argv[idx + 1] ?? fallback;
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

function validatePayload(payload) {
  assert(payload && typeof payload === "object", "Payload harus object JSON");
  assert(typeof payload._type === "string", "Payload wajib memiliki _type");
  assert(allowedTypes.has(payload._type), `Unsupported _type: ${payload._type}`);
  assert(typeof payload.title === "string" && payload.title.trim(), "Payload wajib title");
  assert(payload.slug?.current, "Payload wajib slug.current");
  assert(typeof payload._id === "string" && payload._id.trim(), "Payload wajib _id");
  assert(!payload._id.includes("."), "_id public tidak boleh mengandung titik");

  if (payload._type === "pageLocation" || payload._type === "serviceLocation") {
    assert(typeof payload.route === "string" && payload.route.startsWith("/"), "route wajib dimulai '/'");
  }

  return true;
}

const input = getArg("--input");
const writeMode = process.argv.includes("--write");

if (!input) {
  console.error("Usage: node ops-upsert-sanity-content.mjs --input <payload.json> [--write]");
  process.exit(1);
}

let payload;
try {
  payload = JSON.parse(await readFile(path.resolve(input), "utf8"));
  validatePayload(payload);
} catch (err) {
  console.error(`[ops-upsert-sanity-content] invalid payload: ${err.message}`);
  process.exit(1);
}

const report = {
  ok: true,
  mode: writeMode ? "write" : "dry-run",
  input,
  targetType: payload._type,
  targetId: payload._id,
  targetSlug: payload.slug.current,
};

if (!writeMode) {
  console.log(JSON.stringify(report, null, 2));
  process.exit(0);
}

const token = process.env.SANITY_DEV || process.env.SANITY_AUTH_TOKEN;
if (!token) {
  console.error("[ops-upsert-sanity-content] missing SANITY_DEV / SANITY_AUTH_TOKEN for write mode");
  process.exit(1);
}

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-04-06";

if (!projectId || !dataset) {
  console.error("[ops-upsert-sanity-content] missing project/dataset env");
  process.exit(1);
}

try {
  const { createClient } = await import("@sanity/client");
  const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

  await client.createOrReplace(payload);
  console.log(
    JSON.stringify(
      {
        ...report,
        written: true,
      },
      null,
      2,
    ),
  );
} catch (err) {
  console.error(`[ops-upsert-sanity-content] write failed: ${err.message}`);
  process.exit(1);
}
