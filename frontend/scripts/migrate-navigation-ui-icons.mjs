#!/usr/bin/env node
import { createSanityWriteClient } from "./lib/sanity-page-guards.mjs";

const shouldWrite = process.argv.includes("--write");

const LINKEDIN_SVG =
  '<svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4.98 3.5a2.48 2.48 0 1 1 0 4.96 2.48 2.48 0 0 1 0-4.96ZM2.8 9.4h4.36V21H2.8V9.4Zm7.16 0h4.18v1.58h.06c.58-1.1 2-2.26 4.12-2.26 4.4 0 5.22 2.9 5.22 6.66V21h-4.36v-5.1c0-1.22-.02-2.8-1.7-2.8-1.7 0-1.96 1.33-1.96 2.7V21H9.96V9.4Z" /></svg>';

const LEGACY_ICON_MAP = {
  home: { provider: "lu", name: "LuHouse" },
  grid: { provider: "lu", name: "LuLayoutGrid" },
  product: { provider: "lu", name: "LuPackage" },
  service: { provider: "lu", name: "LuBriefcaseBusiness" },
  blog: { provider: "lu", name: "LuNewspaper" },
  docs: { provider: "lu", name: "LuBookOpen" },
  page: { provider: "lu", name: "LuFileText" },
  company: { provider: "lu", name: "LuBuilding2" },
  contact: { provider: "lu", name: "LuHandshake" },
  pricing: { provider: "lu", name: "LuBadgeCheck" },
  growth: { provider: "lu", name: "LuChartLine" },
  rocket: { provider: "lu", name: "LuRocket" },
  ai: { provider: "lu", name: "LuSparkles" },
  magic: { provider: "lu", name: "LuWandSparkles" },
  workflow: { provider: "lu", name: "LuWorkflow" },
  security: { provider: "lu", name: "LuShieldCheck" },
  search: { provider: "lu", name: "LuScanSearch" },
  support: { provider: "lu", name: "LuLifeBuoy" },
  help: { provider: "lu", name: "LuCircleHelp" },
  global: { provider: "lu", name: "LuGlobe" },
  labs: { provider: "lu", name: "LuFlaskConical" },
  program: { provider: "lu", name: "LuFlag" },
  facebook: { provider: "si", name: "SiFacebook" },
  instagram: { provider: "si", name: "SiInstagram" },
  x: { provider: "si", name: "SiX" },
  youtube: { provider: "si", name: "SiYoutube" },
  linkedin: { provider: "si", name: "SiLinkedin", svg: LINKEDIN_SVG },
  tiktok: { provider: "si", name: "SiTiktok" },
  github: { provider: "si", name: "SiGithub" },
  website: { provider: "lu", name: "LuGlobe" },
};

function hasUiIcon(value) {
  return Boolean(value && typeof value === "object" && (value.provider || value.name || value.svg));
}

function cloneUiIcon(icon) {
  if (!icon) return null;

  return {
    _type: "iconPicker",
    provider: icon.provider,
    name: icon.name,
    ...(icon.svg ? { svg: icon.svg } : {}),
  };
}

function migrateIconFields(entry, path, summary) {
  const nextEntry = { ...entry };
  const legacyIcon = typeof entry?.icon === "string" ? entry.icon : "";
  const currentUiIcon = entry?.uiIcon;

  if (hasUiIcon(currentUiIcon)) {
    if (legacyIcon) {
      delete nextEntry.icon;
      summary.cleanedLegacyIcons.push(path);
    }
    return nextEntry;
  }

  if (!legacyIcon) return nextEntry;

  const mapped = LEGACY_ICON_MAP[legacyIcon];
  if (!mapped) {
    summary.unmappedIcons.push({ path, icon: legacyIcon });
    return nextEntry;
  }

  nextEntry.uiIcon = cloneUiIcon(mapped);
  delete nextEntry.icon;
  summary.migratedIcons.push({ path, from: legacyIcon, to: mapped.name });

  return nextEntry;
}

function normalizeNavLocation(link, primaryCounter, summary, index) {
  const nextLink = { ...link };
  const showInHeader = nextLink.showInHeader !== false;
  const currentLocation = nextLink.navLocation || "primary";

  if (!showInHeader || currentLocation === "utility" || currentLocation === "more") {
    return { nextLink, primaryCounter };
  }

  const nextPrimaryCount = primaryCounter + 1;
  if (nextPrimaryCount > 8) {
    nextLink.navLocation = "more";
    summary.movedToMore.push({
      index,
      title: nextLink.title || "",
    });
    return { nextLink, primaryCounter: nextPrimaryCount };
  }

  nextLink.navLocation = "primary";
  return { nextLink, primaryCounter: nextPrimaryCount };
}

function migrateNavigationDoc(navigation) {
  const summary = {
    movedToMore: [],
    migratedIcons: [],
    cleanedLegacyIcons: [],
    unmappedIcons: [],
  };

  const nextNavigation = { ...navigation };
  nextNavigation.headerCta = navigation.headerCta
    ? migrateIconFields(navigation.headerCta, "headerCta", summary)
    : navigation.headerCta;

  let primaryCounter = 0;
  nextNavigation.links = (Array.isArray(navigation.links) ? navigation.links : []).map(
    (link, index) => {
      let nextLink = migrateIconFields(link, `links[${index}]`, summary);
      const locationResult = normalizeNavLocation(nextLink, primaryCounter, summary, index);
      nextLink = locationResult.nextLink;
      primaryCounter = locationResult.primaryCounter;

      if (Array.isArray(link.children)) {
        nextLink.children = link.children.map((child, childIndex) =>
          migrateIconFields(child, `links[${index}].children[${childIndex}]`, summary),
        );
      }

      return nextLink;
    },
  );

  return { nextNavigation, summary };
}

async function main() {
  const client = await createSanityWriteClient();
  const navigation = await client.fetch(
    `*[_type == "navigation"][0]{
      _id,
      _type,
      _rev,
      headerCta,
      links
    }`,
  );

  if (!navigation?._id) {
    throw new Error("Navigation document not found.");
  }

  const { nextNavigation, summary } = migrateNavigationDoc(navigation);

  let writeResult = null;
  if (shouldWrite) {
    writeResult = await client.createOrReplace(nextNavigation);
  }

  console.log(
    JSON.stringify(
      {
        ok: true,
        writeMode: shouldWrite,
        navigationId: navigation._id,
        movedToMoreCount: summary.movedToMore.length,
        migratedIconCount: summary.migratedIcons.length,
        cleanedLegacyIconCount: summary.cleanedLegacyIcons.length,
        unmappedIconCount: summary.unmappedIcons.length,
        movedToMore: summary.movedToMore,
        migratedIcons: summary.migratedIcons,
        cleanedLegacyIcons: summary.cleanedLegacyIcons,
        unmappedIcons: summary.unmappedIcons,
        writeResult: writeResult
          ? {
              id: writeResult._id,
              rev: writeResult._rev,
            }
          : null,
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(
    JSON.stringify(
      {
        ok: false,
        message: error instanceof Error ? error.message : String(error),
      },
      null,
      2,
    ),
  );
  process.exitCode = 1;
});
