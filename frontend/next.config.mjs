/** @type {import('next').NextConfig} */
import { createClient } from "@sanity/client";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET;
const SANITY_API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-04-01";
const SANITY_REDIRECT_TOKEN =
  process.env.SANITY_API_READ_TOKEN ||
  process.env.SANITY_DEPLOY ||
  process.env.SANITY_AUTH_TOKEN ||
  process.env.SANITY_DEV;

const STATIC_REDIRECTS = [
  {
    source: "/index",
    destination: "/",
    permanent: true,
  },
  {
    source: "/portfolio",
    destination: "/projects",
    permanent: true,
  },
  {
    source: "/services/ecommerce-development",
    destination: "/services",
    permanent: false,
  },
  {
    source: "/product/:slug",
    destination: "/products/:slug",
    permanent: true,
  },
  {
    source: "/service/:slug",
    destination: "/services/:slug",
    permanent: true,
  },
  {
    source: "/digital-product/:slug",
    destination: "/products/:slug",
    permanent: true,
  },
  {
    source: "/it-services/:slug",
    destination: "/services/:slug",
    permanent: true,
  },
  {
    source: "/product-tag/:slug*",
    destination: "/products",
    permanent: true,
  },
  {
    source: "/product-category/:slug*",
    destination: "/products",
    permanent: true,
  },
  {
    source: "/tag/:slug*",
    destination: "/blog",
    permanent: true,
  },
  {
    source: "/blog/page/:page",
    destination: "/blog",
    permanent: true,
  },
  // --- Structural redirects: old URL patterns -> new canonical routes ---
  // /jasa-pembuatan-website-{kota} -> /pembuatan-website/{kota}
  {
    source: "/jasa-pembuatan-website-:city",
    destination: "/pembuatan-website/:city",
    permanent: true,
  },
  // /pembuatan-website-{kota} -> /pembuatan-website/{kota}
  {
    source: "/pembuatan-website-:city",
    destination: "/pembuatan-website/:city",
    permanent: true,
  },
  // /website-{kota} -> /pembuatan-website/{kota}
  {
    source: "/website-:city",
    destination: "/pembuatan-website/:city",
    permanent: true,
  },
  // /jasa-cetak-kalender-{kota} -> /percetakan/cetak-kalender/{kota}
  {
    source: "/jasa-cetak-kalender-:city",
    destination: "/percetakan/cetak-kalender/:city",
    permanent: true,
  },
  // /cetak-kalender-{kota} -> /percetakan/cetak-kalender/{kota}
  {
    source: "/cetak-kalender-:city",
    destination: "/percetakan/cetak-kalender/:city",
    permanent: true,
  },
  // /software-{kota} -> /software
  {
    source: "/software-:city",
    destination: "/software",
    permanent: true,
  },
];

const REDIRECTS_QUERY = `*[
  _type == "redirect"
  && isEnabled == true
  && defined(source)
]{
  source,
  destination,
  permanent,
  statusCode
}`;

async function fetchSanityRedirects() {
  if (!SANITY_PROJECT_ID || !SANITY_DATASET) {
    console.warn(
      "[next.config] Sanity redirect loader skipped: missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET",
    );
    return { redirects: [], gone: [] };
  }

  try {
    const client = createClient({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      apiVersion: SANITY_API_VERSION,
      useCdn: false,
      perspective: "published",
      token: SANITY_REDIRECT_TOKEN,
    });

    const docs = await client.fetch(REDIRECTS_QUERY);
    if (!Array.isArray(docs)) {
      console.warn("[next.config] Sanity redirect loader returned non-array payload");
      return { redirects: [], gone: [] };
    }

    const redirects = [];
    const gone = [];
    for (const item of docs) {
      if (!item || typeof item.source !== "string") continue;
      if (item.statusCode === "410") {
        gone.push(item.source);
        continue;
      }
      if (typeof item.destination !== "string") continue;
      redirects.push({
        source: item.source,
        destination: item.destination,
        permanent: item.statusCode ? item.statusCode === "301" : Boolean(item.permanent),
      });
    }

    // Guard 1: a live page/route must always win over a redirect.
    // Guard 2: dedupe by source (first wins) so Next never sees conflicting rules.
    const livePaths = new Set([
      "/", "/about", "/contact", "/privacy",
      "/blog", "/products", "/projects", "/services", "/blog/category",
    ]);
    try {
      const pagePaths = await client.fetch(
        `*[_type=="page" && defined(path)].path`,
      );
      for (const p of pagePaths) if (typeof p === "string") livePaths.add(p);
    } catch {
      // non-fatal: fall back to static live-route list
    }
    const seenSources = new Set();
    const safeRedirects = redirects.filter((r) => {
      if (livePaths.has(r.source)) return false;
      if (seenSources.has(r.source)) return false;
      seenSources.add(r.source);
      return true;
    });

    console.log(
      "[next.config] Sanity redirects loaded",
      JSON.stringify({
        projectId: SANITY_PROJECT_ID,
        dataset: SANITY_DATASET,
        apiVersion: SANITY_API_VERSION,
        tokenMode: SANITY_REDIRECT_TOKEN ? "authenticated" : "anonymous",
        redirects: safeRedirects.length,
        filtered: redirects.length - safeRedirects.length,
        gone: gone.length,
        sample: safeRedirects.slice(0, 3),
      }),
    );

    return { redirects: safeRedirects, gone };
  } catch (error) {
    console.warn("[next.config] Failed to load Sanity redirects:", error);
    return { redirects: [], gone: [] };
  }
}

// Evaluated once (build/start) so we can expose the 410 Gone set to middleware
// via env. ESM top-level await is supported in next.config.mjs.
const sanityRouteData = await fetchSanityRedirects();


const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  // Expose the 410 Gone set to middleware (read at build/start).
  env: {
    SANITY_GONE_PATHS: JSON.stringify(sanityRouteData.gone),
  },
  allowedDevOrigins: [
    '168.110.210.101',
    'localhost',
    '127.0.0.1',
  ],
  async redirects() {
    return [...STATIC_REDIRECTS, ...sanityRouteData.redirects];
  },
  images: {
    qualities: [60, 75, 85],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [
      {
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' http://localhost:* https://*.sanity.studio https://*.vercel.app https://sanity.kotacom.id; upgrade-insecure-requests;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
