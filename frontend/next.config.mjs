/** @type {import('next').NextConfig} */
import { createClient } from "@sanity/client";

const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET;
const SANITY_API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-04-01";

const STATIC_REDIRECTS = [
  {
    source: "/index",
    destination: "/",
    permanent: true,
  },
];

const REDIRECTS_QUERY = `*[
  _type == "redirect"
  && isEnabled == true
  && defined(source)
  && defined(destination)
]{
  source,
  destination,
  permanent
}`;

async function fetchSanityRedirects() {
  if (!SANITY_PROJECT_ID || !SANITY_DATASET) {
    return [];
  }

  try {
    const client = createClient({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      apiVersion: SANITY_API_VERSION,
      useCdn: false,
      perspective: "published",
    });

    const redirects = await client.fetch(REDIRECTS_QUERY);
    if (!Array.isArray(redirects)) {
      return [];
    }

    return redirects
      .filter((item) => item && typeof item.source === "string" && typeof item.destination === "string")
      .map((item) => ({
        source: item.source,
        destination: item.destination,
        permanent: Boolean(item.permanent),
      }));
  } catch (error) {
    console.warn("[next.config] Failed to load Sanity redirects:", error);
    return [];
  }
}

const nextConfig = {
  allowedDevOrigins: [
    '168.110.210.101',
    'localhost',
    '127.0.0.1',
  ],
  async redirects() {
    const sanityRedirects = await fetchSanityRedirects();
    return [...STATIC_REDIRECTS, ...sanityRedirects];
  },
  images: {
    qualities: [75, 100],
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
