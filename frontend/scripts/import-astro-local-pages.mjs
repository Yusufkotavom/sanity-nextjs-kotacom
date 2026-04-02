#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";

const cwd = process.cwd();
const sourceRoot = path.join(
  cwd,
  "frontend",
  "content",
  "astro-local",
  "jasa-cetak-buku-kota",
);
const defaultSiteUrl = "https://www.kotacom.id";
const shouldWrite = process.argv.includes("--write");
const shouldForce = process.argv.includes("--force");

function parseEnvFile(raw) {
  const parsed = {};

  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;

    const key = trimmed.slice(0, eqIndex).trim();
    let value = trimmed.slice(eqIndex + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    parsed[key] = value;
  }

  return parsed;
}

async function loadEnvFrom(paths) {
  const merged = {};

  for (const filePath of paths) {
    try {
      const raw = await fs.readFile(filePath, "utf8");
      Object.assign(merged, parseEnvFile(raw));
    } catch {
      // Ignore missing env files.
    }
  }

  return merged;
}

function replacePlaceholders(template, vars) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => `${vars[key] ?? ""}`);
}

function normalizeExcerpt(value, fallback) {
  const trimmed = `${value || ""}`.trim();
  return trimmed || fallback;
}

function chunk(items, size) {
  const result = [];
  for (let index = 0; index < items.length; index += size) {
    result.push(items.slice(index, index + size));
  }
  return result;
}

function buildPageDoc({ item, template, siteUrl }) {
  const contentRaw = replacePlaceholders(template, {
    city: item.city,
    citySlug: item.citySlug,
    sourceId: item.sourceId || "",
    coverImage: item.coverImage || "",
  }).trim();

  return {
    _id: `page-astro-local-${item.slug}`,
    _type: "page",
    title: item.title,
    slug: {
      _type: "slug",
      current: item.slug,
    },
    blocks: [
      {
        _key: `legacy-rich-content-${item.slug}`.slice(0, 96),
        _type: "legacy-rich-content",
        title: item.title,
        excerpt: item.excerpt,
        contentFormat: "markdown",
        contentRaw,
      },
    ],
    meta: {
      title: item.title,
      description: item.excerpt,
      canonicalUrl: `${siteUrl.replace(/\/+$/, "")}/${item.slug}`,
      focusKeyword: `jasa cetak buku ${item.city}`.toLowerCase(),
      secondaryKeywords: [
        `percetakan buku ${item.city}`.toLowerCase(),
        `cetak buku ${item.city}`.toLowerCase(),
        `print buku ${item.city}`.toLowerCase(),
      ],
      noindex: false,
    },
  };
}

async function readSourcePack() {
  const [citiesRaw, excludedRaw, template] = await Promise.all([
    fs.readFile(path.join(sourceRoot, "cities.json"), "utf8"),
    fs.readFile(path.join(sourceRoot, "excluded-non-city.json"), "utf8"),
    fs.readFile(path.join(sourceRoot, "template.mdx"), "utf8"),
  ]);

  const cities = JSON.parse(citiesRaw);
  const excluded = JSON.parse(excludedRaw);

  const synthesizedExcluded = excluded.map((entry) => {
    const slug = `${entry.slug || ""}`.trim();
    const keyword = slug
      .replace(/^jasa-cetak-buku-/, "")
      .replace(/-/g, " ")
      .trim();
    const titleKeyword = keyword.replace(/\b\w/g, (char) => char.toUpperCase());

    return {
      slug,
      citySlug: slug.replace(/^jasa-cetak-buku-/, ""),
      city: titleKeyword,
      sourceId: "",
      title: `Jasa cetak buku ${titleKeyword} Terbaik`,
      excerpt: `Layanan pencetakan buku profesional untuk kebutuhan ${keyword}. Konsultasi spesifikasi, estimasi biaya, dan pengiriman nasional tersedia dalam satu alur kerja.`,
      coverImage: "",
      status: "published",
    };
  });

  const allItems = [...cities, ...synthesizedExcluded].map((item) => ({
    ...item,
    title: `${item.title || ""}`.trim(),
    excerpt: normalizeExcerpt(
      item.excerpt,
      `Layanan pencetakan buku profesional untuk ${item.city}. Konsultasi spesifikasi, estimasi biaya, dan pengiriman nasional tersedia.`,
    ),
    slug: `${item.slug || ""}`.trim(),
    citySlug: `${item.citySlug || ""}`.trim(),
    city: `${item.city || ""}`.trim(),
  }));

  return { items: allItems, template };
}

async function main() {
  const envFromFiles = await loadEnvFrom([
    path.join(cwd, "frontend", ".env.local"),
    path.join(cwd, "deploy", "env", "vercel-frontend.env"),
  ]);

  const env = {
    ...envFromFiles,
    ...process.env,
  };

  const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = env.NEXT_PUBLIC_SANITY_DATASET;
  const apiVersion = env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-04-02";
  const token = env.SANITY_AUTH_TOKEN;
  const siteUrl = env.NEXT_PUBLIC_SITE_URL || defaultSiteUrl;

  if (!projectId || !dataset || !token) {
    throw new Error(
      "Missing Sanity write config. Expected NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and SANITY_AUTH_TOKEN.",
    );
  }

  const { items, template } = await readSourcePack();
  const docs = items.map((item) => buildPageDoc({ item, template, siteUrl }));
  const targetSlugs = docs.map((doc) => doc.slug.current);

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  });

  const existing = await client.fetch(
    `*[_type == "page" && slug.current in $slugs]{_id, "slug": slug.current}`,
    { slugs: targetSlugs },
  );

  const existingBySlug = new Map(existing.map((item) => [item.slug, item]));
  const missingDocs = docs.filter((doc) => !existingBySlug.has(doc.slug.current));
  const ownedDocs = docs.filter((doc) => existingBySlug.get(doc.slug.current)?._id === doc._id);
  const conflictingDocs = docs.filter((doc) => {
    const existingDoc = existingBySlug.get(doc.slug.current);
    return existingDoc && existingDoc._id !== doc._id;
  });
  const writableDocs = shouldForce ? [...missingDocs, ...ownedDocs] : missingDocs;

  console.log(
    JSON.stringify(
      {
        totalSourceDocs: docs.length,
        existingSlugCount: existing.length,
        missingCount: missingDocs.length,
        ownedExistingCount: ownedDocs.length,
        conflictingSlugCount: conflictingDocs.length,
        writeMode: shouldWrite,
        forceMode: shouldForce,
      },
      null,
      2,
    ),
  );

  if (conflictingDocs.length) {
    console.log("Conflicting slugs skipped:");
    for (const doc of conflictingDocs.slice(0, 20)) {
      const existingDoc = existingBySlug.get(doc.slug.current);
      console.log(`- ${doc.slug.current} (existing _id: ${existingDoc?._id})`);
    }
  }

  if (!shouldWrite) {
    console.log("Dry run only. Re-run with --write to import missing docs.");
    return;
  }

  if (!writableDocs.length) {
    console.log("No docs require import.");
    return;
  }

  for (const batch of chunk(writableDocs, 50)) {
    const tx = client.transaction();
    for (const doc of batch) {
      tx.createOrReplace(doc);
    }
    await tx.commit();
  }

  const imported = await client.fetch(
    `count(*[_type == "page" && slug.current in $slugs])`,
    { slugs: targetSlugs },
  );

  console.log(
    JSON.stringify(
      {
        importedCountForTargetSet: imported,
        wroteCount: writableDocs.length,
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
