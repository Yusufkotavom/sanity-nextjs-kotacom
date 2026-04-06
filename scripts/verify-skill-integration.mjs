#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import path from "node:path";

const checks = [
  {
    file: "package.json",
    requiredScripts: [
      "skill:ops:contract",
      "skill:content:generate",
      "skill:content:validate",
      "skill:content:upsert",
      "skill:zip:all",
      "skill:verify:integration",
    ],
  },
  {
    file: "frontend/package.json",
    requiredScripts: [
      "skill:ops:contract",
      "skill:content:generate",
      "skill:content:validate",
      "skill:content:upsert",
    ],
  },
  {
    file: "studio/package.json",
    requiredScripts: ["skill:ops:contract", "skill:content:validate"],
  },
  {
    file: "seo-dashboard/package.json",
    requiredScripts: ["skill:ops:contract", "skill:content:validate"],
  },
];

const missing = [];
for (const check of checks) {
  const abs = path.resolve(process.cwd(), check.file);
  const json = JSON.parse(await readFile(abs, "utf8"));
  const scripts = json.scripts || {};
  for (const name of check.requiredScripts) {
    if (!scripts[name]) {
      missing.push(`${check.file}: missing script '${name}'`);
    }
  }
}

if (missing.length > 0) {
  console.error("[verify-skill-integration] FAILED");
  for (const msg of missing) console.error(`- ${msg}`);
  process.exit(1);
}

console.log(
  JSON.stringify(
    {
      ok: true,
      message: "Skill commands integrated across root/frontend/studio/seo-dashboard",
      checkedFiles: checks.map((c) => c.file),
    },
    null,
    2,
  ),
);
