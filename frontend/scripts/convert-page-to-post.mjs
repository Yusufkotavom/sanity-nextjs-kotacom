#!/usr/bin/env node
import {
  createSanityReadClient,
  createSanityWriteClient,
} from "./lib/sanity-page-guards.mjs";

function parseArgs(argv) {
  const raw = {
    write: false,
    mode: "create",
  };

  for (const arg of argv) {
    if (arg === "--write") raw.write = true;
    else if (arg.startsWith("--slug=")) raw.slug = arg.slice("--slug=".length).trim();
    else if (arg.startsWith("--post-slug="))
      raw.postSlug = arg.slice("--post-slug=".length).trim();
    else if (arg.startsWith("--post-title="))
      raw.postTitle = arg.slice("--post-title=".length).trim();
    else if (arg.startsWith("--author-ref="))
      raw.authorRef = arg.slice("--author-ref=".length).trim();
    else if (arg.startsWith("--category-refs="))
      raw.categoryRefs = arg
        .slice("--category-refs=".length)
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean);
    else if (arg.startsWith("--mode=")) raw.mode = arg.slice("--mode=".length).trim();
  }

  return raw;
}

function ensureArgs(args) {
  if (!args.slug) {
    throw new Error("Missing required --slug=<page-slug>.");
  }

  if (!["create", "upsert"].includes(args.mode)) {
    throw new Error('Invalid --mode. Use "create" or "upsert".');
  }
}

function buildSafePostId(slug) {
  return `post-${slug}`.replace(/[^a-z0-9-]/gi, "-").replace(/-+/g, "-");
}

function clone(value) {
  return value == null ? value : JSON.parse(JSON.stringify(value));
}

function makeTextBlock(text, keyPrefix) {
  return {
    _key: `${keyPrefix}-block-0`,
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [
      {
        _key: `${keyPrefix}-span-0`,
        _type: "span",
        marks: [],
        text,
      },
    ],
  };
}

function extractPlainText(blocks = []) {
  return blocks
    .flatMap((block) =>
      Array.isArray(block?.children)
        ? block.children.map((child) => `${child?.text || ""}`)
        : [],
    )
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function resolveExcerpt(page) {
  if (page?.meta?.description) {
    return page.meta.description;
  }

  const firstHero = Array.isArray(page?.blocks)
    ? page.blocks.find((block) => ["hero-1", "hero-2"].includes(block?._type))
    : null;

  const heroText = extractPlainText(firstHero?.body || []);
  if (heroText) return heroText;

  const sectionHeader = Array.isArray(page?.blocks)
    ? page.blocks.find((block) => block?._type === "section-header")
    : null;

  if (sectionHeader?.description) {
    return `${sectionHeader.description}`.trim();
  }

  return "";
}

function resolveImage(page) {
  if (page?.meta?.image) {
    return clone(page.meta.image);
  }

  const firstHeroWithImage = Array.isArray(page?.blocks)
    ? page.blocks.find(
        (block) =>
          ["hero-1", "hero-2"].includes(block?._type) && block?.image?.asset?._ref,
      )
    : null;

  return firstHeroWithImage?.image ? clone(firstHeroWithImage.image) : undefined;
}

function extractLegacyContentBlocks(blocks = []) {
  return blocks
    .filter((block) => block?._type === "legacy-rich-content")
    .map((block, index) => ({
      ...clone(block),
      _key: block?._key || `legacy-rich-content-${index}`,
    }));
}

function extractPortableBody(blocks = []) {
  const richBlocks = extractLegacyContentBlocks(blocks);
  if (richBlocks.length > 0) {
    return {
      body: richBlocks,
      warnings: [],
      source: "legacy-rich-content",
    };
  }

  const portable = [];
  const warnings = [];

  const firstHero = blocks.find((block) => ["hero-1", "hero-2"].includes(block?._type));
  if (Array.isArray(firstHero?.body) && firstHero.body.length > 0) {
    portable.push(...clone(firstHero.body));
  }

  const sectionHeaders = blocks.filter((block) => block?._type === "section-header");
  for (const [index, block] of sectionHeaders.entries()) {
    if (block?.title) {
      portable.push({
        _key: `section-title-${index}`,
        _type: "block",
        style: "h2",
        markDefs: [],
        children: [
          {
            _key: `section-title-${index}-span-0`,
            _type: "span",
            marks: [],
            text: `${block.title}`,
          },
        ],
      });
    }

    if (block?.description) {
      portable.push(makeTextBlock(`${block.description}`, `section-description-${index}`));
    }
  }

  if (portable.length === 0) {
    warnings.push(
      "No legacy-rich-content or obvious portable text was found in page.blocks. Post body was left empty.",
    );
  } else {
    warnings.push(
      "Post body was inferred from hero/section-header content because no legacy-rich-content block was available.",
    );
  }

  return {
    body: portable,
    warnings,
    source: portable.length > 0 ? "fallback-portable-text" : "empty",
  };
}

async function fetchPageBySlug(client, slug) {
  return client.fetch(
    `*[_type == "page" && slug.current == $slug][0]{
      _id,
      _type,
      title,
      slug,
      meta,
      blocks
    }`,
    { slug },
  );
}

async function fetchPostBySlug(client, slug) {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      _id,
      _type,
      title,
      slug,
      excerpt,
      image,
      author,
      categories,
      meta,
      body
    }`,
    { slug },
  );
}

function buildPostDocument({ page, args }) {
  const targetSlug = args.postSlug || page.slug?.current || args.slug;
  const { body, warnings, source } = extractPortableBody(Array.isArray(page?.blocks) ? page.blocks : []);
  const excerpt = resolveExcerpt(page);
  const image = resolveImage(page);
  const title = args.postTitle || page.title || targetSlug;

  const nextPost = {
    _id: buildSafePostId(targetSlug),
    _type: "post",
    title,
    slug: {
      _type: "slug",
      current: targetSlug,
    },
    excerpt: excerpt || undefined,
    image,
    body,
    meta: clone(page.meta),
  };

  if (args.authorRef) {
    nextPost.author = {
      _type: "reference",
      _ref: args.authorRef,
    };
  }

  if (Array.isArray(args.categoryRefs) && args.categoryRefs.length > 0) {
    nextPost.categories = args.categoryRefs.map((ref, index) => ({
      _key: `category-${index}`,
      _type: "reference",
      _ref: ref,
    }));
  }

  return {
    nextPost,
    warnings,
    bodySource: source,
  };
}

async function verifyPublicPost(client, slug) {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      "bodyCount": count(body),
      excerpt
    }`,
    { slug },
  );
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  ensureArgs(args);

  const writeClient = await createSanityWriteClient();
  const readClient = await createSanityReadClient();

  const page = await fetchPageBySlug(writeClient, args.slug);
  if (!page) {
    throw new Error(`Page with slug "${args.slug}" was not found.`);
  }

  const targetSlug = args.postSlug || page.slug?.current || args.slug;
  const existingPost = await fetchPostBySlug(writeClient, targetSlug);

  if (existingPost && args.mode === "create") {
    throw new Error(
      `Post with slug "${targetSlug}" already exists as ${existingPost._id}. Use --mode=upsert to overwrite the mapped fields.`,
    );
  }

  const { nextPost, warnings, bodySource } = buildPostDocument({ page, args });
  if (existingPost && args.mode === "upsert") {
    nextPost._id = existingPost._id;
  }

  let writeResult = null;
  if (args.write) {
    writeResult = await writeClient.createOrReplace(nextPost);
  }

  const publicRead = args.write ? await verifyPublicPost(readClient, targetSlug) : null;

  console.log(
    JSON.stringify(
      {
        ok: true,
        writeMode: args.write,
        mode: args.mode,
        sourcePage: {
          id: page._id,
          title: page.title || "",
          slug: page?.slug?.current || "",
          blockCount: Array.isArray(page.blocks) ? page.blocks.length : 0,
        },
        existingPost: existingPost
          ? {
              id: existingPost._id,
              title: existingPost.title || "",
              slug: existingPost?.slug?.current || "",
              bodyCount: Array.isArray(existingPost.body) ? existingPost.body.length : 0,
            }
          : null,
        nextPost: {
          id: nextPost._id,
          title: nextPost.title || "",
          slug: nextPost?.slug?.current || "",
          excerpt: nextPost.excerpt || "",
          hasImage: Boolean(nextPost.image?.asset?._ref || nextPost.image?.asset?._id),
          bodyCount: Array.isArray(nextPost.body) ? nextPost.body.length : 0,
          bodySource,
        },
        warnings,
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
