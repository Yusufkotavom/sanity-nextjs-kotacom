#!/usr/bin/env node
import {
  collectPageIssues,
  createSanityWriteClient,
  fetchSanityPages,
} from "./lib/sanity-page-guards.mjs";

const slugArg = process.argv.find((arg) => arg.startsWith("--slug="));
const slug = slugArg ? slugArg.slice("--slug=".length) : "";

async function main() {
  const client = await createSanityWriteClient();
  const pages = await fetchSanityPages(client, slug);

  const findings = pages
    .map((page) => ({
      id: page._id,
      slug: page?.slug?.current || "",
      title: page?.title || "",
      issues: collectPageIssues(page),
    }))
    .filter((item) => item.issues.length > 0);

  console.log(
    JSON.stringify(
      {
        auditedPageCount: pages.length,
        affectedPageCount: findings.length,
        findings,
      },
      null,
      2,
    ),
  );

  process.exitCode = findings.length > 0 ? 1 : 0;
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
