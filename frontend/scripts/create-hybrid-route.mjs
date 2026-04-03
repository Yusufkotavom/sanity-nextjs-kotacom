#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const FRONTEND_DIR = path.resolve(SCRIPT_DIR, "..");
const REPO_DIR = path.resolve(FRONTEND_DIR, "..");

function parseArgs(argv) {
  const raw = {
    write: false,
    preset: "main-landing",
    mode: "seed-missing",
  };

  for (const arg of argv) {
    if (arg === "--write") raw.write = true;
    else if (arg.startsWith("--slug=")) raw.slug = arg.slice("--slug=".length).trim();
    else if (arg.startsWith("--title=")) raw.title = arg.slice("--title=".length).trim();
    else if (arg.startsWith("--preset=")) raw.preset = arg.slice("--preset=".length).trim();
    else if (arg.startsWith("--mode=")) raw.mode = arg.slice("--mode=".length).trim();
  }

  return raw;
}

function ensureArgs(args) {
  if (!args.slug) {
    throw new Error("Missing required --slug=<route-segment>.");
  }

  if (!/^[a-z0-9-]+$/.test(args.slug)) {
    throw new Error(
      'Slug must use lowercase letters, numbers, and hyphens only. Nested routes like "foo/bar" are not supported by this scaffold.',
    );
  }

  if (!["seed-missing", "upsert", "create"].includes(args.mode)) {
    throw new Error('Invalid --mode. Use "seed-missing", "upsert", or "create".');
  }
}

function toTitleCase(value) {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function toPascalCase(value) {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function routeFileTemplate({ slug, title, componentName, componentImport }) {
  const fallbackTitle = `${title} | Hybrid Landing Page`;
  const fallbackDescription = `${title} memakai pola hybrid: block Sanity di atas dan bawah, dengan middle section code-owned yang tetap menjaga struktur halaman utama.`;

  return `import type { Metadata } from "next";
import PageHybridShell from "@/components/hybrid/page-hybrid-shell";
import { fetchSanityPageBySlug } from "@/sanity/lib/fetch";
import {
  generateBasicMetadata,
  generatePageMetadata,
} from "@/sanity/lib/metadata";
import ${componentName} from "${componentImport}";

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchSanityPageBySlug({ slug: "${slug}" });

  if (page) {
    return generatePageMetadata({
      page,
      slug: "${slug}",
    });
  }

  return generateBasicMetadata({
    title: "${fallbackTitle}",
    description:
      "${fallbackDescription}",
    slug: "${slug}",
  });
}

export default async function ${componentName.replace(/MiddleSection$/, "")}Page() {
  return (
    <PageHybridShell slug="${slug}">
      <${componentName} />
    </PageHybridShell>
  );
}
`;
}

function componentTemplate({ title, componentName }) {
  return `import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function ${componentName}() {
  return (
    <section className="border-y border-border/60 bg-muted/20">
      <div className="container py-16 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_360px]">
          <div className="space-y-5">
            <span className="inline-flex items-center rounded-full border border-border/70 bg-background px-4 py-1 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Code-Owned Middle Section
            </span>
            <h2 className="max-w-4xl text-3xl font-semibold tracking-tight sm:text-4xl">
              ${title} sekarang siap memakai pola hybrid tanpa melepas kontrol struktur inti.
            </h2>
            <p className="max-w-3xl text-base leading-7 text-muted-foreground">
              File ini sengaja digenerate sebagai titik awal. Editor bebas mengatur
              block Sanity di atas dan bawah shell, sementara section ini tetap
              menjadi lapisan positioning yang dikontrol code.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.5rem] border border-border/70 bg-background/90 p-5">
                <div className="text-sm font-medium text-foreground">Kapan diubah</div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Ubah copy dan struktur section ini saat Anda sudah tahu narasi inti
                  yang wajib stabil untuk page utama ini.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-border/70 bg-background/90 p-5">
                <div className="text-sm font-medium text-foreground">Kapan dibiarkan CMS</div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Gunakan block Sanity untuk proof, hero support, CTA, FAQ, dan
                  eksperimen copy yang tidak perlu mengubah shell utama.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-border/70 bg-background/90 p-7 shadow-[0_18px_70px_-42px_rgba(0,0,0,0.3)]">
            <div className="space-y-4">
              <div className="text-sm font-medium text-foreground">
                Scaffold next steps
              </div>
              <p className="text-sm leading-6 text-muted-foreground">
                Setelah scaffold dibuat, biasanya langkah berikutnya adalah
                menyempurnakan middle section ini, lalu membiarkan tim konten
                mengatur block Sanity di atas dan bawahnya.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/contact">Diskusikan kebutuhan</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/test-page-hybrid">Lihat blueprint</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
`;
}

async function fileExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function addSlugToRegistry({ filePath, declarationName, slug }) {
  const raw = await fs.readFile(filePath, "utf8");
  const pattern = new RegExp(
    `(const\\s+${declarationName}\\s*=\\s*new\\s+Set\\(\\[)([\\s\\S]*?)(\\]\\);)`,
  );
  const match = raw.match(pattern);

  if (!match) {
    throw new Error(`Could not find ${declarationName} set in ${filePath}.`);
  }

  const [, start, body, end] = match;
  const existing = Array.from(body.matchAll(/"([^"]+)"/g), (item) => item[1]);

  if (existing.includes(slug)) {
    return { changed: false };
  }

  const nextValues = [...existing, slug].sort();
  const nextBody = `\n${nextValues.map((value) => `  "${value}",`).join("\n")}\n`;
  const nextRaw = raw.replace(pattern, `${start}${nextBody}${end}`);

  await fs.writeFile(filePath, nextRaw, "utf8");
  return { changed: true };
}

async function ensureDir(targetPath) {
  await fs.mkdir(targetPath, { recursive: true });
}

async function runHybridPageSeed({ slug, title, preset, mode, write }) {
  const args = [
    path.join(FRONTEND_DIR, "scripts", "create-hybrid-page.mjs"),
    `--slug=${slug}`,
    `--preset=${preset}`,
    `--mode=${mode}`,
  ];

  if (title) {
    args.push(`--title=${title}`);
  }

  if (write) {
    args.push("--write");
  }

  const { stdout, stderr } = await execFileAsync(process.execPath, args, {
    cwd: FRONTEND_DIR,
  });

  return {
    stdout: stdout.trim(),
    stderr: stderr.trim(),
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  ensureArgs(args);

  const title = args.title || toTitleCase(args.slug);
  const routeDir = path.join(FRONTEND_DIR, "app", "(main)", args.slug);
  const routeFile = path.join(routeDir, "page.tsx");
  const componentDir = path.join(FRONTEND_DIR, "components", "hybrid", "generated");
  const componentFile = path.join(componentDir, `${args.slug}-middle-section.tsx`);
  const componentName = `${toPascalCase(args.slug)}MiddleSection`;
  const componentImport = `@/components/hybrid/generated/${args.slug}-middle-section`;

  const routeExists = await fileExists(routeFile);
  const componentExists = await fileExists(componentFile);

  if (routeExists || componentExists) {
    throw new Error(
      `Refusing to scaffold duplicate hybrid route. Existing targets: ${
        [routeExists ? routeFile : null, componentExists ? componentFile : null]
          .filter(Boolean)
          .join(", ")
      }`,
    );
  }

  const studioRegistryFile = path.join(REPO_DIR, "studio", "schemas", "documents", "page.ts");
  const scriptRegistryFile = path.join(
    FRONTEND_DIR,
    "scripts",
    "lib",
    "hybrid-page-presets.mjs",
  );

  let seedResult = null;

  if (args.write) {
    await ensureDir(routeDir);
    await ensureDir(componentDir);
    await fs.writeFile(
      routeFile,
      routeFileTemplate({
        slug: args.slug,
        title,
        componentName,
        componentImport,
      }),
      "utf8",
    );
    await fs.writeFile(componentFile, componentTemplate({ title, componentName }), "utf8");

    await addSlugToRegistry({
      filePath: studioRegistryFile,
      declarationName: "HYBRID_PAGE_SLUGS",
      slug: args.slug,
    });
    await addSlugToRegistry({
      filePath: scriptRegistryFile,
      declarationName: "HYBRID_ELIGIBLE_SLUGS",
      slug: args.slug,
    });

    seedResult = await runHybridPageSeed({
      slug: args.slug,
      title,
      preset: args.preset,
      mode: args.mode,
      write: true,
    });
  }

  console.log(
    JSON.stringify(
      {
        ok: true,
        writeMode: args.write,
        slug: args.slug,
        title,
        preset: args.preset,
        mode: args.mode,
        routeFile,
        componentFile,
        registries: {
          studio: studioRegistryFile,
          scripts: scriptRegistryFile,
        },
        seedCommand: `node scripts/create-hybrid-page.mjs --slug=${args.slug} --preset=${args.preset} --mode=${args.mode}${title ? ` --title=${JSON.stringify(title)}` : ""}${args.write ? " --write" : ""}`,
        seedResult,
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
