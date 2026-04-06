#!/usr/bin/env node
import { access, rm } from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";

const root = process.cwd();
const skillDir = path.join(root, "skills", "sanity-content-ops");
const zipPath = path.join(skillDir, "skill.zip");

const required = [
  "SKILL.md",
  "metadata.json",
  "agents/sanity-content-ops-agent.md",
  "references/content-types.md",
  "references/workflow.md",
  "references/commands.md",
  "scripts/generate.sh",
  "scripts/validate.sh",
  "scripts/upsert.sh",
  "scripts/build-skill-zip.sh",
];

for (const rel of required) {
  try {
    await access(path.join(skillDir, rel));
  } catch {
    console.error(`[build-sanity-content-ops-skill-zip] missing required file: ${rel}`);
    process.exit(1);
  }
}

await rm(zipPath, { force: true });

await new Promise((resolve, reject) => {
  const zip = spawn("zip", ["-r", "skill.zip", "SKILL.md", "metadata.json", "agents", "references", "scripts", "fixtures"], {
    cwd: skillDir,
    stdio: "inherit",
  });
  zip.on("exit", (code) => {
    if (code === 0) resolve();
    else reject(new Error(`zip failed with code ${code}`));
  });
});

console.log(`[build-sanity-content-ops-skill-zip] created ${zipPath}`);
