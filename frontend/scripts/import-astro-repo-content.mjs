#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";

const cwd = process.cwd();
const astroRoot =
  process.env.ASTRO_SOURCE_ROOT || "/home/ubuntu/Kotacom-supabase-schhool/src/pages";
const defaultSiteUrl = "https://www.kotacom.id";
const shouldWrite = process.argv.includes("--write");

const contentConfigs = [
  {
    type: "post",
    dir: "posts",
    routeBase: "/blog",
    collectFrontmatter(frontmatter, body, fileName) {
      return {
        title: frontmatter.title || slugToTitle(frontmatter.slug || fileName),
        slug: frontmatter.slug || fileName,
        excerpt: frontmatter.description || frontmatter.excerpt || firstParagraph(body),
        metaDescription:
          frontmatter.description || frontmatter.excerpt || firstParagraph(body),
        categories: arrayValue(frontmatter.tags),
        body,
      };
    },
  },
  {
    type: "service",
    dir: "services",
    routeBase: "/services",
    collectFrontmatter(frontmatter, body, fileName) {
      return {
        title: frontmatter.title || slugToTitle(frontmatter.slug || fileName),
        slug: frontmatter.slug || fileName,
        excerpt: frontmatter.review || frontmatter.description || firstParagraph(body),
        metaDescription:
          frontmatter.review || frontmatter.description || firstParagraph(body),
        categories: arrayValue(frontmatter.category),
        body,
        duration: frontmatter.projectDuration || undefined,
        startingPrice: parsePrice(frontmatter.price),
        currency: "IDR",
      };
    },
  },
  {
    type: "project",
    dir: "projects",
    routeBase: "/projects",
    collectFrontmatter(frontmatter, body, fileName) {
      return {
        title: frontmatter.title || slugToTitle(frontmatter.slug || fileName),
        slug: frontmatter.slug || fileName,
        excerpt:
          frontmatter.results ||
          frontmatter.solutions ||
          frontmatter.description ||
          firstParagraph(body),
        metaDescription:
          frontmatter.results ||
          frontmatter.solutions ||
          frontmatter.description ||
          firstParagraph(body),
        categories: arrayValue(frontmatter.category),
        body,
        clientName: frontmatter.client || frontmatter.clientName || undefined,
        industry: frontmatter.clientIndustry || undefined,
        completionYear: parseYear(frontmatter.published),
        projectUrl: frontmatter.url || undefined,
      };
    },
  },
  {
    type: "product",
    dir: "products",
    routeBase: "/products",
    collectFrontmatter(frontmatter, body, fileName) {
      return {
        title: frontmatter.title || slugToTitle(frontmatter.slug || fileName),
        slug: frontmatter.slug || fileName,
        excerpt: frontmatter.description || frontmatter.excerpt || firstParagraph(body),
        metaDescription:
          frontmatter.description || frontmatter.excerpt || firstParagraph(body),
        categories: arrayValue(frontmatter.category),
        body,
        price: parsePrice(frontmatter.price),
        currency: "IDR",
        availability: "in-stock",
      };
    },
  },
];

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

function slugify(input) {
  return `${input || ""}`
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, "-")
    .replace(/-+/g, "-");
}

function slugToTitle(slug) {
  return `${slug || ""}`
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function parseScalar(rawValue) {
  const value = rawValue.trim();
  if (!value) return "";

  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  if (value.startsWith("[") && value.endsWith("]")) {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }

  if (value === "true") return true;
  if (value === "false") return false;
  if (/^\d+$/.test(value)) return Number(value);

  return value;
}

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    return { frontmatter: {}, body: content.trim() };
  }

  const [, rawFrontmatter, body] = match;
  const frontmatter = {};
  const lines = rawFrontmatter.split(/\r?\n/);

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const keyMatch = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!keyMatch) continue;

    const [, key, rawValue] = keyMatch;
    if (rawValue.trim()) {
      frontmatter[key] = parseScalar(rawValue);
      continue;
    }

    const nestedLines = [];
    for (let nextIndex = index + 1; nextIndex < lines.length; nextIndex += 1) {
      const nestedLine = lines[nextIndex];
      if (/^[A-Za-z0-9_]+:\s*/.test(nestedLine)) {
        break;
      }
      if (!nestedLine.trim()) {
        continue;
      }
      if (!/^\s/.test(nestedLine)) {
        break;
      }
      nestedLines.push(nestedLine.trim());
      index = nextIndex;
    }

    if (!nestedLines.length) {
      frontmatter[key] = "";
      continue;
    }

    if (nestedLines.every((entry) => entry.startsWith("- "))) {
      frontmatter[key] = nestedLines.map((entry) => parseScalar(entry.slice(2)));
      continue;
    }

    frontmatter[key] = nestedLines.join("\n");
  }

  return { frontmatter, body: body.trim() };
}

function firstParagraph(body) {
  return (
    body
      .split(/\n\s*\n/)
      .map((chunk) => chunk.replace(/^#+\s+/gm, "").trim())
      .find(Boolean) || ""
  );
}

function arrayValue(value) {
  return Array.isArray(value)
    ? value.map((item) => `${item}`.trim()).filter(Boolean)
    : [];
}

function parsePrice(value) {
  if (typeof value === "number") return value;
  if (!value) return undefined;
  const digits = `${value}`.replace(/[^\d]/g, "");
  return digits ? Number(digits) : undefined;
}

function parseYear(value) {
  if (!value) return undefined;
  const match = `${value}`.match(/^(\d{4})/);
  return match ? Number(match[1]) : undefined;
}

function chunk(items, size) {
  const result = [];
  for (let index = 0; index < items.length; index += size) {
    result.push(items.slice(index, index + size));
  }
  return result;
}

function bodyBlock(title, excerpt, contentRaw) {
  return [
    {
      _key: `legacy-${slugify(title)}`.slice(0, 96),
      _type: "legacy-rich-content",
      title,
      excerpt,
      contentFormat: "markdown",
      contentRaw,
    },
  ];
}

async function collectRepoItems() {
  const items = [];

  for (const config of contentConfigs) {
    const dirPath = path.join(astroRoot, config.dir);
    const entries = await fs.readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isFile() || !entry.name.endsWith(".mdx")) continue;
      const absPath = path.join(dirPath, entry.name);
      const raw = await fs.readFile(absPath, "utf8");
      const { frontmatter, body } = parseFrontmatter(raw);
      const fileSlug = entry.name.replace(/\.mdx$/, "");
      const normalized = config.collectFrontmatter(frontmatter, body, fileSlug);

      items.push({
        type: config.type,
        routeBase: config.routeBase,
        sourcePath: absPath,
        ...normalized,
      });
    }
  }

  return items;
}

function buildCategoryDoc(title) {
  const slug = slugify(title);
  return {
    _id: `category-astro-${slug}`,
    _type: "category",
    title,
    slug: { _type: "slug", current: slug },
    description: `Imported from Astro source taxonomy: ${title}.`,
    meta: {
      title,
      description: `Imported Astro category for ${title}.`,
      noindex: false,
    },
  };
}

function buildContentDoc(item, categoryIdMap, siteUrl) {
  const categoryRefs = item.categories
    .map((title) => categoryIdMap.get(slugify(title)))
    .filter(Boolean)
    .map((id) => ({ _type: "reference", _ref: id }));

  const base = {
    _id: `${item.type}-astro-${item.slug}`,
    _type: item.type,
    title: item.title,
    slug: { _type: "slug", current: item.slug },
    excerpt: item.excerpt,
    body: bodyBlock(item.title, item.excerpt, item.body),
    categories: categoryRefs,
    meta: {
      title: item.title,
      description: item.metaDescription,
      canonicalUrl: `${siteUrl.replace(/\/+$/, "")}${item.routeBase}/${item.slug}`,
      noindex: false,
    },
  };

  if (item.type === "service") {
    return {
      ...base,
      duration: item.duration,
      startingPrice: item.startingPrice,
      currency: item.currency || "IDR",
    };
  }

  if (item.type === "project") {
    return {
      ...base,
      clientName: item.clientName,
      industry: item.industry,
      completionYear: item.completionYear,
      projectUrl: item.projectUrl,
    };
  }

  if (item.type === "product") {
    return {
      ...base,
      price: item.price,
      currency: item.currency || "IDR",
      availability: item.availability || "in-stock",
    };
  }

  return base;
}

async function main() {
  const envFromFiles = await loadEnvFrom([
    path.join(cwd, "frontend", ".env.local"),
    path.join(cwd, "deploy", "env", "vercel-frontend.env"),
  ]);

  const env = { ...envFromFiles, ...process.env };
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

  const repoItems = await collectRepoItems();
  const categoryTitles = Array.from(
    new Set(repoItems.flatMap((item) => item.categories || []).filter(Boolean)),
  ).sort((a, b) => a.localeCompare(b));

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  });

  const existingContent = await client.fetch(
    `*[_type in ["post","service","project","product"] && slug.current in $slugs]{_id,_type,"slug":slug.current}`,
    { slugs: repoItems.map((item) => item.slug) },
  );
  const existingCategories = await client.fetch(
    `*[_type == "category" && slug.current in $slugs]{_id,"slug":slug.current}`,
    { slugs: categoryTitles.map((title) => slugify(title)) },
  );

  const existingContentByKey = new Map(
    existingContent.map((item) => [`${item._type}:${item.slug}`, item]),
  );
  const existingCategoryIdBySlug = new Map(
    existingCategories.map((item) => [item.slug, item._id]),
  );

  const newCategoryDocs = categoryTitles
    .filter((title) => !existingCategoryIdBySlug.has(slugify(title)))
    .map((title) => buildCategoryDoc(title));

  const categoryIdMap = new Map(existingCategoryIdBySlug);
  for (const doc of newCategoryDocs) {
    categoryIdMap.set(doc.slug.current, doc._id);
  }

  const missingItems = repoItems.filter(
    (item) => !existingContentByKey.has(`${item.type}:${item.slug}`),
  );
  const docsToCreate = missingItems.map((item) =>
    buildContentDoc(item, categoryIdMap, siteUrl),
  );

  const counts = repoItems.reduce((acc, item) => {
    acc[item.type] = (acc[item.type] || 0) + 1;
    return acc;
  }, {});
  const missingCounts = missingItems.reduce((acc, item) => {
    acc[item.type] = (acc[item.type] || 0) + 1;
    return acc;
  }, {});

  console.log(
    JSON.stringify(
      {
        totalRepoItems: repoItems.length,
        sourceCounts: counts,
        missingCounts,
        missingTotal: missingItems.length,
        newCategories: newCategoryDocs.length,
        writeMode: shouldWrite,
      },
      null,
      2,
    ),
  );

  if (!shouldWrite) {
    console.log("Dry run only. Re-run with --write to import missing Astro repo content.");
    return;
  }

  for (const batch of chunk(newCategoryDocs, 50)) {
    const tx = client.transaction();
    for (const doc of batch) {
      tx.createIfNotExists(doc);
    }
    await tx.commit();
  }

  for (const batch of chunk(docsToCreate, 50)) {
    const tx = client.transaction();
    for (const doc of batch) {
      tx.createIfNotExists(doc);
    }
    await tx.commit();
  }

  const verification = await client.fetch(
    `{
      "posts": count(*[_type == "post" && slug.current in $postSlugs]),
      "services": count(*[_type == "service" && slug.current in $serviceSlugs]),
      "projects": count(*[_type == "project" && slug.current in $projectSlugs]),
      "products": count(*[_type == "product" && slug.current in $productSlugs])
    }`,
    {
      postSlugs: repoItems.filter((item) => item.type === "post").map((item) => item.slug),
      serviceSlugs: repoItems
        .filter((item) => item.type === "service")
        .map((item) => item.slug),
      projectSlugs: repoItems
        .filter((item) => item.type === "project")
        .map((item) => item.slug),
      productSlugs: repoItems
        .filter((item) => item.type === "product")
        .map((item) => item.slug),
    },
  );

  console.log(
    JSON.stringify(
      {
        importedDocs: docsToCreate.length,
        importedCategories: newCategoryDocs.length,
        verification,
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
