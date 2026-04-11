import { createClient } from "@sanity/client";

function getArg(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function hasFlag(name) {
  return process.argv.includes(name);
}

function chunk(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

const HELP = `
Frontend-side bulk delete documents by GROQ query.

Usage:
  pnpm --filter frontend sanity:bulk:delete --query '*[_type == "redirect"][0...100]._id' [--write --confirm DELETE]

Options:
  --query <groq>      GROQ query that returns an array of document IDs.
  --write             Execute deletion. Without this flag, script runs in dry-run mode.
  --confirm DELETE    Required with --write as a safety gate.
  --dataset <name>    Optional dataset override.
  --api-version <v>   Optional API version override.
`;

if (hasFlag("--help") || hasFlag("-h")) {
  console.log(HELP);
  process.exit(0);
}

const query = getArg("--query");
if (!query) {
  console.error("Missing --query argument.\n" + HELP);
  process.exit(1);
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset =
  getArg("--dataset") || process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion =
  getArg("--api-version") || process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-03-23";

// Dev-first auth per repo policy.
const token = process.env.SANITY_DEV || process.env.SANITY_AUTH_TOKEN;

if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
  process.exit(1);
}

if (!token) {
  console.error("Missing SANITY_DEV or SANITY_AUTH_TOKEN (write token required)");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
});

const rawIds = await client.fetch(query);
if (!Array.isArray(rawIds)) {
  console.error("Query must return an array of document IDs.");
  process.exit(1);
}

const ids = [...new Set(rawIds.filter((id) => typeof id === "string" && id.trim().length > 0))];

console.log(
  JSON.stringify(
    {
      projectId,
      dataset,
      apiVersion,
      totalMatched: ids.length,
      sample: ids.slice(0, 20),
      mode: hasFlag("--write") ? "write" : "dry-run",
    },
    null,
    2,
  ),
);

if (!hasFlag("--write")) {
  console.log("Dry-run complete. Re-run with --write --confirm DELETE to execute.");
  process.exit(0);
}

if (getArg("--confirm") !== "DELETE") {
  console.error("Refusing to delete: pass --confirm DELETE");
  process.exit(1);
}

if (ids.length === 0) {
  console.log("No documents matched. Nothing to delete.");
  process.exit(0);
}

let deleted = 0;
for (const batch of chunk(ids, 100)) {
  const tx = client.transaction();
  for (const id of batch) {
    tx.delete(id);
  }
  await tx.commit();
  deleted += batch.length;
  console.log(`Deleted ${deleted}/${ids.length}`);
}

console.log(`Done. Deleted ${deleted} documents.`);
