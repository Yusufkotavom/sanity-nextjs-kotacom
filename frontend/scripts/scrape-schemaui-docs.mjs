import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const BASE_URL = "https://schemaui.com";
const ROOT_DOCS_URL = `${BASE_URL}/docs`;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contentDir = path.resolve(__dirname, "../content");
const outputFile = path.resolve(contentDir, "schemaui-docs.json");

const absolute = (url) => new URL(url, BASE_URL).toString();

const normalizePathname = (pathname) => {
  const clean = pathname.replace(/\/+$/, "");
  return clean === "" ? "/docs" : clean;
};

const extractDocLinks = (html) => {
  const links = new Set();
  const hrefRegex = /href="(\/docs(?:\/[^"]*)?)"/g;
  const escapedUrlRegex = /\\"url\\":\\"(\/docs(?:\/[^\\"]*)?)\\"/g;

  for (const match of html.matchAll(hrefRegex)) {
    links.add(normalizePathname(match[1]));
  }
  for (const match of html.matchAll(escapedUrlRegex)) {
    links.add(normalizePathname(match[1]));
  }

  links.add("/docs");
  return Array.from(links).sort();
};

const decodeHtmlEntities = (value) =>
  value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

const extractTitle = (html, fallback) => {
  const match = html.match(/<title>([\s\S]*?)<\/title>/i);
  if (!match) return fallback;
  return decodeHtmlEntities(match[1].replace(/\s*\|\s*Schema UI\s*$/i, "").trim()) || fallback;
};

const stripUnsafe = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/\s(on\w+)="[^"]*"/gi, "")
    .replace(/\s(on\w+)='[^']*'/gi, "");

const extractArticle = (html) => {
  const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  if (!articleMatch) return "";
  const articleBody = articleMatch[1];
  return stripUnsafe(articleBody).trim();
};

const fetchHtml = async (url) => {
  const response = await fetch(url, {
    headers: {
      "user-agent": "SchemaUI-Docs-Scraper/1.0",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  return response.text();
};

const toLabel = (pathname) => {
  if (pathname === "/docs") return "Introduction";
  const raw = pathname.replace(/^\/docs\//, "").split("/").pop() || "docs";
  return raw
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

const toGroup = (pathname) => {
  if (pathname === "/docs") return "Getting Started";
  const parts = pathname.replace(/^\/docs\//, "").split("/");
  return parts.length > 1
    ? parts[0]
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ")
    : "Getting Started";
};

const main = async () => {
  const rootHtml = await fetchHtml(ROOT_DOCS_URL);
  const links = extractDocLinks(rootHtml);

  const pages = [];
  for (const pathname of links) {
    const pageUrl = absolute(pathname);
    const html = await fetchHtml(pageUrl);
    const articleHtml = extractArticle(html);

    pages.push({
      pathname,
      slug: pathname === "/docs" ? [] : pathname.replace(/^\/docs\//, "").split("/"),
      title: extractTitle(html, toLabel(pathname)),
      group: toGroup(pathname),
      sourceUrl: pageUrl,
      articleHtml,
    });
  }

  await mkdir(contentDir, { recursive: true });
  await writeFile(
    outputFile,
    `${JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        baseUrl: BASE_URL,
        totalPages: pages.length,
        pages,
      },
      null,
      2,
    )}\n`,
    "utf8",
  );

  console.log(`Saved ${pages.length} docs pages to ${outputFile}`);
};

await main();
