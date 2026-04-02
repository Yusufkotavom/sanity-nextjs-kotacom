#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";

const sourceRoot =
  process.env.ASTRO_SOURCE_ROOT || "/home/ubuntu/Kotacom-supabase-schhool/src/pages";
const sourceDataRoot =
  process.env.ASTRO_SOURCE_DATA_ROOT || "/home/ubuntu/Kotacom-supabase-schhool/src/data";

const outputPath = path.resolve(
  process.cwd(),
  "lib/legacy-pages/astro-static-manifest.json",
);

const allowedSections = new Set([
  "about",
  "contact",
  "privacy",
  "layanan",
  "pembuatan-website",
  "percetakan",
  "software",
  "sistem-pos",
]);

function toTitle(input) {
  return input
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

function toRoute(relPath) {
  const normalized = relPath.replaceAll("\\", "/");
  if (normalized === "index.astro") return "/";

  if (normalized.endsWith("/index.astro")) {
    return `/${normalized.slice(0, -"/index.astro".length)}`;
  }

  if (normalized.endsWith(".astro")) {
    return `/${normalized.slice(0, -".astro".length)}`;
  }

  if (normalized.endsWith(".mdx")) {
    return `/${normalized.slice(0, -".mdx".length)}`;
  }

  return `/${normalized.replace(/\.[^.]+$/, "")}`;
}

function toSection(route) {
  const part = route.split("/").filter(Boolean)[0] || "root";
  return part;
}

function getSlug(route) {
  const parts = route.split("/").filter(Boolean);
  return parts[parts.length - 1] || "";
}

async function walk(dir, acc = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full, acc);
      continue;
    }

    if (!entry.isFile()) continue;
    if (!entry.name.endsWith(".astro") && !entry.name.endsWith(".mdx")) continue;

    const rel = path.relative(sourceRoot, full).replaceAll("\\", "/");
    if (rel.includes("[")) continue;

    const route = toRoute(rel).replace("//", "/");
    const section = toSection(route);

    if (!allowedSections.has(section)) continue;

    const slug = getSlug(route);
    const titleSeed = slug || section;

    acc.push({
      route,
      section,
      slug,
      sourceFile: rel,
      title: toTitle(titleSeed),
      migrationStatus: "draft",
    });
  }

  return acc;
}

async function main() {
  const entries = await walk(sourceRoot);

  const cityDir = path.join(sourceDataRoot, "kota_website");
  const cityFiles = await fs.readdir(cityDir).catch(() => []);
  const citySlugs = cityFiles
    .filter((file) => file.endsWith(".json"))
    .map((file) => file.replace(/\.json$/, ""))
    .sort();

  for (const citySlug of citySlugs) {
    entries.push({
      route: `/pembuatan-website/${citySlug}`,
      section: "pembuatan-website",
      slug: citySlug,
      sourceFile: "pembuatan-website/[kota]/index.astro",
      title: `Pembuatan Website ${toTitle(citySlug)}`,
      migrationStatus: "draft",
    });

    entries.push({
      route: `/percetakan/cetak-kalender/${citySlug}`,
      section: "percetakan",
      slug: citySlug,
      sourceFile: "percetakan/cetak-kalender/[kota]/index.astro",
      title: `Cetak Kalender ${toTitle(citySlug)}`,
      migrationStatus: "draft",
    });
  }

  entries.sort((a, b) => a.route.localeCompare(b.route));

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, `${JSON.stringify(entries, null, 2)}\n`, "utf8");

  console.log(`Generated ${entries.length} legacy static entries:`);
  console.log(`- ${outputPath}`);
}

main().catch((error) => {
  console.error("Failed to generate Astro manifest:", error.message);
  process.exit(1);
});
