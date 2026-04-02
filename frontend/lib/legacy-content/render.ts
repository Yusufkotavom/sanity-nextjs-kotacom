import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { visit } from "unist-util-visit";

const LEGACY_SANITIZE_SCHEMA = {
  ...defaultSchema,
  tagNames: [
    ...(defaultSchema.tagNames || []),
    "h1",
    "h2",
    "h3",
    "h4",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
  ],
  attributes: {
    ...(defaultSchema.attributes || {}),
    a: [
      ...((defaultSchema.attributes && defaultSchema.attributes.a) || []),
      "href",
      "target",
      "rel",
      "title",
    ],
    img: [
      ...((defaultSchema.attributes && defaultSchema.attributes.img) || []),
      "src",
      "alt",
      "title",
      "width",
      "height",
    ],
    td: ["colspan", "rowspan"],
    th: ["colspan", "rowspan"],
  },
  protocols: {
    ...(defaultSchema.protocols || {}),
    href: ["http", "https", "mailto", "tel", "#", "/"],
    src: ["http", "https", "data"],
  },
};

function normalizeLegacyInput(raw: string): string {
  return (raw || "")
    .replace(/\r\n/g, "\n")
    .replace(/\\n/g, "\n")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
    .replace(/<div[^>]*\b(?:vc_row|wpb_row|wpb_column|wpb_wrapper|mceTemp)\b[^>]*>/gi, "")
    .replace(/<\/div>/gi, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/\uFFFD/g, "")
    .trim();
}

function rehypeExternalLinks() {
  return (tree: any) => {
    visit(tree, "element", (node: any) => {
      if (node.tagName !== "a") return;
      const href = String(node.properties?.href || "");
      if (!/^https?:\/\//i.test(href)) return;

      node.properties = node.properties || {};
      node.properties.target = "_blank";
      node.properties.rel = "noopener noreferrer";
    });
  };
}

function renderHtmlInput(input: string): string {
  return String(
    unified()
      .use(rehypeParse, { fragment: true })
      .use(rehypeSanitize, LEGACY_SANITIZE_SCHEMA as any)
      .use(rehypeExternalLinks)
      .use(rehypeStringify)
      .processSync(input),
  );
}

function renderMarkdownInput(input: string): string {
  return String(
    unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeSanitize, LEGACY_SANITIZE_SCHEMA as any)
      .use(rehypeExternalLinks)
      .use(rehypeStringify)
      .processSync(input),
  );
}

export function renderLegacyRichHtml(contentRaw: string, contentFormat?: string): string {
  const normalized = normalizeLegacyInput(contentRaw);
  if (!normalized) return "";

  if ((contentFormat || "markdown") === "html") {
    return renderHtmlInput(normalized);
  }
  return renderMarkdownInput(normalized);
}
