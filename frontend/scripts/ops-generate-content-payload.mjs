#!/usr/bin/env node
import { writeFile } from "node:fs/promises";
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

function slugify(input) {
  return String(input || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function required(value, message) {
  if (!value || String(value).trim().length === 0) {
    throw new Error(message);
  }
  return String(value).trim();
}

function makeBase({ type, title, slug }) {
  return {
    _id: `${type}-${slug}`,
    _type: type,
    title,
    slug: {
      _type: "slug",
      current: slug,
    },
  };
}

function buildPayload({ type, title, slug, route, excerpt }) {
  const base = makeBase({ type, title, slug });

  if (type === "post") {
    return {
      ...base,
      excerpt: excerpt || `Ringkasan ${title}`,
      body: [
        {
          _type: "block",
          _key: "intro-1",
          style: "normal",
          markDefs: [],
          children: [{ _type: "span", _key: "span-1", text: `Konten awal ${title}` }],
        },
      ],
      categories: [],
      blocks: [],
    };
  }

  if (type === "product") {
    return {
      ...base,
      excerpt: excerpt || `Deskripsi singkat ${title}`,
      price: 0,
      currency: "IDR",
      availability: "InStock",
      categories: [],
      body: [],
      blocks: [],
    };
  }

  if (type === "service") {
    return {
      ...base,
      excerpt: excerpt || `Deskripsi layanan ${title}`,
      duration: "Custom",
      startingPrice: 0,
      currency: "IDR",
      deliverables: [],
      categories: [],
      body: [],
      blocks: [],
    };
  }

  if (type === "project") {
    return {
      ...base,
      excerpt: excerpt || `Ringkasan project ${title}`,
      clientName: "",
      industry: "",
      completionYear: new Date().getFullYear(),
      body: [],
      blocks: [],
    };
  }

  if (type === "pageLocation") {
    const finalRoute = required(route, "--route wajib untuk pageLocation");
    return {
      ...base,
      route: finalRoute,
      routePattern: "",
      template: null,
      location: null,
      structured: null,
      blocks: [],
      contentStatus: "draft",
    };
  }

  if (type === "serviceLocation") {
    const finalRoute = required(route, "--route wajib untuk serviceLocation");
    return {
      ...base,
      route: finalRoute,
      routePattern: "",
      service: null,
      serviceType: null,
      location: null,
      template: null,
      structured: null,
      blocks: [],
      contentStatus: "draft",
    };
  }

  throw new Error(`Unsupported type: ${type}`);
}

const type = getArg("--type");
const title = getArg("--title");
const explicitSlug = getArg("--slug");
const route = getArg("--route");
const excerpt = getArg("--excerpt");
const output = getArg("--output");

if (!type || !allowedTypes.has(type)) {
  console.error(`--type wajib. Pilihan: ${Array.from(allowedTypes).join(", ")}`);
  process.exit(1);
}

try {
  const finalTitle = required(title, "--title wajib");
  const slug = required(explicitSlug || slugify(finalTitle), "slug tidak valid");
  const payload = buildPayload({ type, title: finalTitle, slug, route, excerpt });

  const outFile = output || path.resolve(process.cwd(), `tmp/${type}-${slug}.json`);
  await writeFile(outFile, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

  console.log(
    JSON.stringify(
      {
        ok: true,
        type,
        slug,
        output: outFile,
        mode: "generate",
      },
      null,
      2,
    ),
  );
} catch (err) {
  console.error(`[ops-generate-content-payload] ${err.message}`);
  process.exit(1);
}
