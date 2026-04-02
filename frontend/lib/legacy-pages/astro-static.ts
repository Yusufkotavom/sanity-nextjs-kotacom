import manifest from "./astro-static-manifest.json";

export type LegacyAstroPage = {
  route: string;
  section: string;
  slug: string;
  sourceFile: string;
  title: string;
  migrationStatus: "draft" | string;
};

const pages = (manifest as LegacyAstroPage[]).slice().sort((a, b) => {
  return a.route.localeCompare(b.route);
});

export function getLegacyRoute(route: string): LegacyAstroPage | null {
  return pages.find((item) => item.route === route) ?? null;
}

export function getLegacySectionIndex(section: string): LegacyAstroPage | null {
  return getLegacyRoute(`/${section}`);
}

export function getLegacySectionChildren(section: string): LegacyAstroPage[] {
  return pages.filter(
    (item) =>
      item.section === section &&
      item.route.startsWith(`/${section}/`) &&
      item.route.split("/").filter(Boolean).length === 2,
  );
}

export function getLegacySectionSlug(
  section: string,
  slug: string,
): LegacyAstroPage | null {
  return getLegacyRoute(`/${section}/${slug}`);
}

export function getLegacySinglePage(section: string): LegacyAstroPage | null {
  return getLegacyRoute(`/${section}`);
}

export function getLegacyRoutesByPrefix(prefix: string): LegacyAstroPage[] {
  return pages.filter((item) => item.route.startsWith(prefix));
}

export function getLegacySections() {
  return Array.from(new Set(pages.map((item) => item.section))).sort();
}
