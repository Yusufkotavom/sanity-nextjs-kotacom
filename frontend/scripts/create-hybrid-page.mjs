#!/usr/bin/env node
import {
  collectPageIssues,
  createSanityReadClient,
  createSanityWriteClient,
  fetchSanityPages,
  normalizePageBlock,
} from "./lib/sanity-page-guards.mjs";
import {
  HYBRID_ELIGIBLE_SLUGS,
  buildHybridPreset,
  buildSafePageId,
  listHybridPresetNames,
} from "./lib/hybrid-page-presets.mjs";

function parseArgs(argv) {
  const raw = {
    write: false,
    mode: "seed-missing",
    allowUnwired: false,
  };

  for (const arg of argv) {
    if (arg === "--write") raw.write = true;
    else if (arg === "--allow-unwired") raw.allowUnwired = true;
    else if (arg.startsWith("--slug=")) raw.slug = arg.slice("--slug=".length).trim();
    else if (arg.startsWith("--preset=")) raw.preset = arg.slice("--preset=".length).trim();
    else if (arg.startsWith("--title=")) raw.title = arg.slice("--title=".length).trim();
    else if (arg.startsWith("--mode=")) raw.mode = arg.slice("--mode=".length).trim();
  }

  return raw;
}

function ensureRequiredArgs(args) {
  if (!args.slug) {
    throw new Error("Missing required --slug=<route-slug>.");
  }

  if (!args.preset) {
    throw new Error(
      `Missing required --preset=<name>. Available presets: ${listHybridPresetNames().join(", ")}.`,
    );
  }

  if (!["create", "upsert", "seed-missing"].includes(args.mode)) {
    throw new Error('Invalid --mode. Use "create", "upsert", or "seed-missing".');
  }

  if (!args.allowUnwired && !HYBRID_ELIGIBLE_SLUGS.has(args.slug)) {
    throw new Error(
      `Slug "${args.slug}" is not a supported hybrid slug yet. Use --allow-unwired only if the frontend route is already wired to PageHybridShell or will be wired separately.`,
    );
  }
}

function buildNextDocument({ existingPage, slug, title, presetData, mode }) {
  const nextBlocks = presetData.blocks.map((block, index) => normalizePageBlock(block, index));
  const nextId = existingPage?._id || buildSafePageId(slug);
  const nextTitle = title || presetData.title;

  if (!existingPage) {
    return {
      _id: nextId,
      _type: "page",
      title: nextTitle,
      slug: { _type: "slug", current: slug },
      topBlockCount: presetData.topBlockCount,
      blocks: nextBlocks,
    };
  }

  if (mode === "seed-missing") {
    return {
      ...existingPage,
      _type: "page",
      title: existingPage.title || nextTitle,
      slug: existingPage.slug || { _type: "slug", current: slug },
      topBlockCount:
        typeof existingPage.topBlockCount === "number"
          ? existingPage.topBlockCount
          : presetData.topBlockCount,
      blocks:
        Array.isArray(existingPage.blocks) && existingPage.blocks.length > 0
          ? existingPage.blocks
          : nextBlocks,
    };
  }

  return {
    ...existingPage,
    _type: "page",
    title: nextTitle,
    slug: { _type: "slug", current: slug },
    topBlockCount: presetData.topBlockCount,
    blocks: nextBlocks,
  };
}

async function verifyPublicRead({ slug, expectedTopBlockCount, expectedBlockCount }) {
  const readClient = await createSanityReadClient();
  const page = await readClient.fetch(
    `*[_type == "page" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      topBlockCount,
      "blockCount": count(blocks)
    }`,
    { slug },
  );

  return {
    ok:
      Boolean(page) &&
      typeof page?.topBlockCount === "number" &&
      page.topBlockCount === expectedTopBlockCount &&
      page.blockCount >= expectedBlockCount,
    page,
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  ensureRequiredArgs(args);

  const client = await createSanityWriteClient();
  const existingPages = await fetchSanityPages(client, args.slug);
  const existingPage = existingPages[0] || null;

  if (args.mode === "create" && existingPage) {
    throw new Error(
      `A page with slug "${args.slug}" already exists as ${existingPage._id}. Use --mode=upsert or --mode=seed-missing instead.`,
    );
  }

  const presetData = buildHybridPreset({
    preset: args.preset,
    slug: args.slug,
    title: args.title,
  });

  const nextDocument = buildNextDocument({
    existingPage,
    slug: args.slug,
    title: args.title,
    presetData,
    mode: args.mode,
  });

  const issues = collectPageIssues(nextDocument);
  if (issues.length > 0) {
    throw new Error(`Generated document failed page guards: ${issues.join("; ")}`);
  }

  let writeResult = null;
  if (args.write) {
    writeResult = await client.createOrReplace(nextDocument);
  }

  const publicRead = args.write
    ? await verifyPublicRead({
        slug: args.slug,
        expectedTopBlockCount: nextDocument.topBlockCount,
        expectedBlockCount: nextDocument.blocks.length,
      })
    : null;

  console.log(
    JSON.stringify(
      {
        ok: true,
        writeMode: args.write,
        mode: args.mode,
        slug: args.slug,
        preset: args.preset,
        routeKnownHybrid: HYBRID_ELIGIBLE_SLUGS.has(args.slug),
        existingPage: existingPage
          ? {
              id: existingPage._id,
              title: existingPage.title || "",
              topBlockCount:
                typeof existingPage.topBlockCount === "number"
                  ? existingPage.topBlockCount
                  : null,
              blockCount: Array.isArray(existingPage.blocks)
                ? existingPage.blocks.length
                : 0,
            }
          : null,
        nextDocument: {
          id: nextDocument._id,
          title: nextDocument.title || "",
          topBlockCount: nextDocument.topBlockCount,
          blockCount: Array.isArray(nextDocument.blocks) ? nextDocument.blocks.length : 0,
        },
        publicRead,
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
