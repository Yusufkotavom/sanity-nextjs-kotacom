#!/usr/bin/env node
import {
  collectPageIssues,
  createSanityWriteClient,
  fetchSanityPages,
  normalizePageBlock,
} from "./lib/sanity-page-guards.mjs";

const shouldWrite = process.argv.includes("--write");
const slugArg = process.argv.find((arg) => arg.startsWith("--slug="));
const slug = slugArg ? slugArg.slice("--slug=".length) : "";

async function main() {
  const client = await createSanityWriteClient();
  const pages = await fetchSanityPages(client, slug);

  const targets = pages
    .map((page) => ({
      page,
      beforeIssues: collectPageIssues(page),
    }))
    .filter((item) => item.beforeIssues.length > 0);

  const normalized = targets.map(({ page, beforeIssues }) => {
    const nextBlocks = Array.isArray(page.blocks)
      ? page.blocks.map((block, blockIndex) => normalizePageBlock(block, blockIndex))
      : [];

    const nextPage = { ...page, blocks: nextBlocks };

    return {
      page,
      beforeIssues,
      afterIssues: collectPageIssues(nextPage),
      nextBlocks,
    };
  });

  if (shouldWrite) {
    for (const item of normalized) {
      await client.patch(item.page._id).set({ blocks: item.nextBlocks }).commit();
    }
  }

  console.log(
    JSON.stringify(
      {
        writeMode: shouldWrite,
        auditedPageCount: pages.length,
        targetPageCount: normalized.length,
        normalized: normalized.map((item) => ({
          id: item.page._id,
          slug: item.page?.slug?.current || "",
          title: item.page?.title || "",
          beforeIssueCount: item.beforeIssues.length,
          afterIssueCount: item.afterIssues.length,
          beforeIssues: item.beforeIssues,
          afterIssues: item.afterIssues,
        })),
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
