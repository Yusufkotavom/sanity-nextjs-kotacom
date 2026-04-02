#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";

const scriptDir = path.dirname(new URL(import.meta.url).pathname);
const frontendRoot = path.resolve(scriptDir, "..");
const repoRoot = path.resolve(frontendRoot, "..");
const sourceFile =
  process.env.ASTRO_MENU_SOURCE_FILE ||
  "/home/ubuntu/Kotacom-supabase-schhool/website/content/astro-mirror/globals/main-menu.md";
const shouldWrite = process.argv.includes("--write");
const GSC_PRIORITY_PATHS = [
  path.join(frontendRoot, "tmp", "gsc-kotacom-full-sitemap0", "gsc-pages-priority.csv"),
  path.join(frontendRoot, "tmp", "gsc-kotacom-full", "gsc-pages-priority.csv"),
];

const ROUTE_REWRITES = new Map([
  ["/posts", "/blog"],
  ["/posts/", "/blog"],
  ["/categories/percetakan", "/percetakan"],
  ["/categories/percetakan/", "/percetakan"],
  ["/services/", "/services"],
  ["/projects/", "/projects"],
  ["/products/", "/products"],
  ["/about-us", "/about"],
  ["/contact-us", "/contact"],
]);

const TITLE_ROUTE_OVERRIDES = new Map([
  ["Website Development", "/pembuatan-website"],
  ["Software Development", "/software"],
  ["Mobile App Development", "/software"],
  ["E-commerce Solutions", "/pembuatan-website"],
  ["IT Support", "/layanan"],
  ["Network Setup", "/services"],
  ["System Administration", "/services"],
  ["Digital Consultation", "/contact"],
  ["Printing Services", "/percetakan"],
  ["Graphic Design", "/services"],
  ["Branding Package", "/pembuatan-website"],
  ["Semua Portfolio", "/projects"],
  ["Website Development@Portfolio", "/projects"],
  ["Mobile Applications", "/projects"],
  ["System Integration", "/software"],
  ["Restaurant Management System", "/sistem-pos"],
  ["E-learning Platform", "/projects"],
  ["Inventory Management", "/software"],
  ["Semua Produk", "/products"],
  ["Software Tools", "/software"],
  ["Templates", "/products"],
  ["Digital Assets", "/products"],
  ["POS System Template", "/sistem-pos"],
  ["Website Template Pack", "/pembuatan-website"],
  ["Mobile UI Kit", "/software"],
]);

const TOP_LEVEL_ICON_BY_TRIGGER = {
  Services: "service",
  Portfolio: "grid",
  Produk: "product",
};

const CHILD_ICON_RULES = [
  { match: /(website|web|e-commerce|ecommerce)/i, icon: "global" },
  { match: /(software|system|tools|network|admin|integrat)/i, icon: "workflow" },
  { match: /(mobile|app|android|ios|ui kit)/i, icon: "rocket" },
  { match: /(printing|template|article|post|blog|design|document)/i, icon: "page" },
  { match: /(support|consultation|consult|help)/i, icon: "support" },
  { match: /(portfolio|project|case study|asset)/i, icon: "grid" },
  { match: /(product|pos|pack)/i, icon: "product" },
];

const CURATED_GSC_LINKS = [
  {
    parent: "Services",
    group: "Popular Services",
    title: "Jasa Cetak Buku Surabaya",
    href: "/jasa-cetak-buku-surabaya",
    description: "Halaman komersial percetakan buku dengan trafik organik tinggi.",
    icon: "page",
  },
  {
    parent: "Services",
    group: "Popular Services",
    title: "Jasa Instal Aplikasi Surabaya",
    href: "/jasa-instal-aplikasi-surabaya",
    description: "Layanan instal software yang konsisten menarik pencarian intent tinggi.",
    icon: "workflow",
  },
  {
    parent: "Services",
    group: "Popular Services",
    title: "Jasa Install Software Macbook",
    href: "/jasa-install-software-macbook",
    description: "Landing page macOS/macbook service dengan permintaan organik stabil.",
    icon: "rocket",
  },
  {
    parent: "Services",
    group: "Popular Services",
    title: "Jasa Recovery Data Surabaya",
    href: "/jasa-recovery-data-surabaya",
    description: "Service recovery data yang relevan untuk support dan emergency intent.",
    icon: "security",
  },
  {
    parent: "Services",
    group: "Popular Services",
    title: "Service Komputer Surabaya Panggilan",
    href: "/service-komputer-surabaya-panggilan",
    description: "Halaman service on-site yang tetap hidup dan kuat dari sisi demand lokal.",
    icon: "support",
  },
  {
    parent: "Blog",
    group: "Popular Guides",
    title: "Rekomendasi Rakit PC 5 Jutaan",
    href: "/rekomendasi-rakit-pc-5-jutaan",
    description: "Artikel panduan rakit PC dengan impresi dan klik tertinggi di GSC.",
    icon: "blog",
  },
  {
    parent: "Blog",
    group: "Popular Guides",
    title: "Panduan Rakit PC 3 Jutaan",
    href: "/panduan-rakit-pc-3-jutaan-terbaik-update-2025-all-new-build",
    description: "Guide rakit PC mid-budget yang sudah terbukti menarik trafik pencarian.",
    icon: "blog",
  },
  {
    parent: "Blog",
    group: "Popular Guides",
    title: "Rakit PC 1 Jutaan",
    href: "/rakit-pc-1-jutaan-di-2025-realistis-atau-mustahil",
    description: "Konten awareness tinggi untuk funnel awal pencarian rakit PC murah.",
    icon: "blog",
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

function makeImportId(prefix) {
  const stamp = new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14);
  return `${prefix}-${stamp}`;
}

function pickWriteToken(env) {
  const candidates = [env.SANITY_DEV, env.SANITY_DEPLOY, env.SANITY_AUTH_TOKEN];
  return (
    candidates.find((value) => {
      const normalized = `${value || ""}`.trim();
      return Boolean(normalized) && !["true", "false"].includes(normalized.toLowerCase());
    }) || ""
  );
}

function sanitizeLabel(value) {
  return `${value || ""}`
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function sanitizePath(rawPath) {
  const trimmed = `${rawPath || ""}`.trim();
  if (!trimmed) return "/";
  if (/^(https?:|mailto:|tel:)/i.test(trimmed)) return trimmed;

  const [pathname, query = ""] = trimmed.split("?");
  let normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  normalized = normalized.replace(/\/{2,}/g, "/");
  normalized = normalized !== "/" ? normalized.replace(/\/+$/, "") : normalized;
  normalized = ROUTE_REWRITES.get(normalized) || normalized;

  return query ? `${normalized}?${query}` : normalized;
}

function normalizeSitePath(rawPath) {
  const trimmed = `${rawPath || ""}`.trim();
  if (!trimmed) return "/";
  if (/^https?:\/\//i.test(trimmed)) {
    const url = new URL(trimmed);
    return sanitizePath(`${url.pathname}${url.search}`);
  }
  return sanitizePath(trimmed);
}

function inferIcon({ title, url, trigger }) {
  const haystack = `${title || ""} ${url || ""} ${trigger || ""}`;
  if (trigger && TOP_LEVEL_ICON_BY_TRIGGER[trigger]) {
    return TOP_LEVEL_ICON_BY_TRIGGER[trigger];
  }
  const matched = CHILD_ICON_RULES.find((rule) => rule.match.test(haystack));
  return matched?.icon || "page";
}

function buildNavLink({
  title,
  href,
  icon,
  description,
  badge,
  group,
  navLocation,
  showInFooter,
  showInHeader,
}) {
  return {
    _key: slugify(`${navLocation || "primary"}-${title}-${href}`),
    _type: group ? "navigation-link-child" : "link",
    title,
    isExternal: true,
    href,
    target: false,
    ...(description ? { description } : {}),
    ...(badge ? { badge } : {}),
    ...(group ? { group } : {}),
    ...(icon ? { icon } : {}),
    ...(navLocation ? { navLocation } : {}),
    ...(group
      ? {}
      : {
          buttonVariant: "ghost",
          showInFooter: showInFooter ?? true,
          showInHeader: showInHeader ?? true,
        }),
  };
}

function dedupeChildren(children) {
  const seen = new Set();
  return children.filter((child) => {
    const key = `${child.href || ""}::${child.title || ""}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function readTopGscPages() {
  for (const filePath of GSC_PRIORITY_PATHS) {
    try {
      const raw = await fs.readFile(filePath, "utf8");
      const [header, ...lines] = raw.trim().split(/\r?\n/);
      const cols = header.split(",");
      const idx = Object.fromEntries(cols.map((col, index) => [col, index]));
      const rows = lines
        .map((line) => {
          const parts = line.split(",");
          return {
            href: normalizeSitePath(parts[idx.page] || parts[idx.url] || ""),
            clicks: Number(parts[idx.clicks] || 0),
            impressions: Number(parts[idx.impressions] || 0),
          };
        })
        .filter((row) => row.href);
      if (rows.length) return rows;
    } catch {
      // Ignore missing or malformed GSC exports and continue with fallback.
    }
  }

  return [];
}

async function readAstroMenuSource() {
  const raw = await fs.readFile(sourceFile, "utf8");
  const match = raw.match(/```json\r?\n([\s\S]*?)\r?\n```/);
  if (!match) {
    throw new Error(`Could not find JSON menu snapshot in ${sourceFile}`);
  }

  return JSON.parse(match[1]);
}

async function fetchLiveCollections(client) {
  const [projects, products] = await Promise.all([
    client.fetch(
      `*[_type == "project" && defined(slug)] | order(featured desc, _createdAt desc)[0...3]{
        title,
        excerpt,
        "href": "/projects/" + slug.current
      }`,
    ),
    client.fetch(
      `*[_type == "product" && defined(slug)] | order(featured desc, _createdAt desc)[0...3]{
        title,
        excerpt,
        "href": "/products/" + slug.current
      }`,
    ),
  ]);

  return { projects: projects || [], products: products || [] };
}

function rankCuratedGscLinks(rows) {
  const scoreByHref = new Map(rows.map((row) => [row.href, row]));
  return CURATED_GSC_LINKS.filter((item) => scoreByHref.has(item.href)).sort((a, b) => {
    const left = scoreByHref.get(a.href);
    const right = scoreByHref.get(b.href);
    return (right?.clicks || 0) - (left?.clicks || 0) || (right?.impressions || 0) - (left?.impressions || 0);
  });
}

function resolveAstroItemHref({ item, trigger }) {
  const triggerScopedTitle = `${sanitizeLabel(item.title)}@${sanitizeLabel(trigger)}`;
  return sanitizePath(
    TITLE_ROUTE_OVERRIDES.get(triggerScopedTitle) ||
      TITLE_ROUTE_OVERRIDES.get(sanitizeLabel(item.title)) ||
      item.url,
  );
}

async function buildNavigationPayload(snapshot, client) {
  const megaEntries = Object.values(snapshot.MEGA_MENU_CONFIG || {});
  const simpleItems = snapshot.SIMPLE_NAV_ITEMS || [];
  const [gscRows, liveCollections] = await Promise.all([
    readTopGscPages(),
    fetchLiveCollections(client),
  ]);
  const rankedGscLinks = rankCuratedGscLinks(gscRows);

  const links = megaEntries.map((entry) => {
    const href = sanitizePath(
      entry.trigger === "Services"
        ? "/services"
        : entry.trigger === "Portfolio"
          ? "/projects"
          : "/products",
    );

    return buildNavLink({
      title: sanitizeLabel(entry.trigger),
      href,
      icon: inferIcon({ title: entry.trigger, url: href, trigger: entry.trigger }),
      navLocation: "primary",
      group: null,
      children: null,
    });
  });

  for (let index = 0; index < megaEntries.length; index += 1) {
    const entry = megaEntries[index];
    links[index].children = dedupeChildren((entry.sections || []).flatMap((section) =>
      (section.items || []).map((item) =>
        buildNavLink({
          title: sanitizeLabel(item.title),
          href: resolveAstroItemHref({ item, trigger: entry.trigger }),
          description: item.description?.trim(),
          badge: item.badge?.trim(),
          group: sanitizeLabel(section.title),
          icon: inferIcon({
            title: item.title,
            url: resolveAstroItemHref({ item, trigger: entry.trigger }),
            trigger: entry.trigger,
          }),
        }),
      ),
    ));
  }

  for (const item of simpleItems) {
    const href = sanitizePath(item.url);
    const normalizedTitle =
      href === "/blog"
        ? "Blog"
        : href === "/about"
          ? "About"
          : href === "/contact"
            ? "Contact"
            : sanitizeLabel(item.title);

    links.push(
      buildNavLink({
        title: normalizedTitle,
        href,
        icon: inferIcon({ title: normalizedTitle, url: href }),
        navLocation: "primary",
        showInFooter: true,
        showInHeader: !["About", "Contact"].includes(normalizedTitle),
      }),
    );
  }

  const blogLink = links.find((item) => item.title === "Blog");
  if (blogLink) {
    blogLink.children = dedupeChildren([
      ...(blogLink.children || []),
      ...rankedGscLinks
        .filter((item) => item.parent === "Blog")
        .map((item) =>
          buildNavLink({
            title: item.title,
            href: item.href,
            description: item.description,
            group: item.group,
            icon: item.icon,
          }),
        ),
      buildNavLink({
        title: "Browse Categories",
        href: "/blog/category",
        description: "Masuk ke indeks kategori blog untuk eksplorasi topik lebih cepat.",
        group: "Explore",
        icon: "grid",
      }),
    ]);
  }

  const serviceLink = links.find((item) => item.title === "Services");
  if (serviceLink) {
    serviceLink.children = dedupeChildren([
      ...(serviceLink.children || []),
      buildNavLink({
        title: "Percetakan",
        href: "/percetakan",
        description: "Hub legacy rewrite aktif untuk cluster percetakan dan cetak buku.",
        group: "Live Hubs",
        icon: "page",
      }),
      buildNavLink({
        title: "Pembuatan Website",
        href: "/pembuatan-website",
        description: "Landing hub aktif untuk website bisnis, company profile, dan web custom.",
        group: "Live Hubs",
        icon: "global",
      }),
      buildNavLink({
        title: "Software",
        href: "/software",
        description: "Hub software development dan implementasi sistem yang aktif di frontend.",
        group: "Live Hubs",
        icon: "workflow",
      }),
      ...rankedGscLinks
        .filter((item) => item.parent === "Services")
        .map((item) =>
          buildNavLink({
            title: item.title,
            href: item.href,
            description: item.description,
            group: item.group,
            icon: item.icon,
          }),
        ),
    ]);
  }

  const portfolioLink = links.find((item) => item.title === "Portfolio");
  if (portfolioLink) {
    portfolioLink.children = dedupeChildren([
      ...(portfolioLink.children || []),
      ...liveCollections.projects.map((item) =>
        buildNavLink({
          title: sanitizeLabel(item.title),
          href: item.href,
          description: item.excerpt || "Project live dari Sanity yang siap dijadikan referensi portfolio.",
          group: "Featured Projects",
          icon: "grid",
        }),
      ),
    ]);
  }

  const productsLink = links.find((item) => item.title === "Produk");
  if (productsLink) {
    productsLink.children = dedupeChildren([
      ...(productsLink.children || []),
      ...liveCollections.products.map((item) =>
        buildNavLink({
          title: sanitizeLabel(item.title),
          href: item.href,
          description: item.excerpt || "Produk live dari Sanity untuk memperkaya submenu katalog.",
          group: "Live Products",
          icon: "product",
        }),
      ),
    ]);
  }

  return {
    links,
    headerCta: {
      _type: "link",
      title: "WhatsApp",
      isExternal: true,
      href: "https://wa.me/085799520350",
      target: true,
      buttonVariant: "default",
    },
  };
}

async function main() {
  const envFromFiles = await loadEnvFrom([
    path.join(frontendRoot, ".env"),
    path.join(frontendRoot, ".env.local"),
    path.join(repoRoot, "studio", ".env"),
    path.join(repoRoot, "deploy", "env", "github-actions-vars.env"),
    path.join(repoRoot, "deploy", "env", "github-actions-secrets.env"),
    path.join(repoRoot, "deploy", "env", "vercel-frontend.env"),
    path.join(repoRoot, "deploy", "env", "studio.env"),
  ]);

  const env = {
    ...envFromFiles,
    ...process.env,
  };

  const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = env.NEXT_PUBLIC_SANITY_DATASET;
  const apiVersion = env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-04-02";
  const token = pickWriteToken(env);

  if (!projectId || !dataset || !token) {
    throw new Error(
      "Missing Sanity write config. Expected NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and SANITY_AUTH_TOKEN.",
    );
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  });
  const snapshot = await readAstroMenuSource();
  const payload = await buildNavigationPayload(snapshot, client);

  const existing = await client.fetch(
    `*[_type == "navigation"] | order(_updatedAt desc)[0]{
      _id,
      _rev,
      _updatedAt,
      "linkCount": count(links)
    }`,
  );

  const targetId = existing?._id || "navigation-main";
  const doc = {
    _id: targetId,
    _type: "navigation",
    ...payload,
  };

  console.log(
    JSON.stringify(
      {
        sourceFile,
        targetId,
        existingNavigationFound: Boolean(existing?._id),
        existingLinkCount: existing?.linkCount || 0,
        importedTopLevelCount: payload.links.length,
        importedChildCount: payload.links.reduce(
          (total, item) => total + (item.children?.length || 0),
          0,
        ),
        sampleSanitizedRoutes: [
          sanitizePath("/posts"),
          sanitizePath("/categories/percetakan"),
          sanitizePath("/services/"),
          sanitizePath("/projects/"),
          sanitizePath("/products/"),
          sanitizePath("/jasa-pembuatan-website-surabaya"),
        ],
        writeMode: shouldWrite,
      },
      null,
      2,
    ),
  );

  if (!shouldWrite) {
    console.log("Dry run only. Re-run with --write to import Astro navigation into Sanity.");
    return;
  }

  let finalId = targetId;
  let writeStrategy = existing?._id ? "replace-existing" : "create-new";

  try {
    await client.createOrReplace(doc);
  } catch (error) {
    const message = `${error?.message || error}`;
    const canFallbackToCreate =
      existing?._id && /permission "update" required/i.test(message);

    if (!canFallbackToCreate) {
      throw error;
    }

    finalId = makeImportId("navigation-imported");
    writeStrategy = "create-fallback";
    await client.create({
      _id: finalId,
      _type: "navigation",
      ...payload,
    });
  }

  const verify = await client.fetch(
    `*[_id == $id][0]{
      _id,
      _updatedAt,
      "linkCount": count(links),
      "childCount": count(links[].children[])
    }`,
    { id: finalId },
  );

  console.log(JSON.stringify({ writeStrategy, writeResult: verify }, null, 2));
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
