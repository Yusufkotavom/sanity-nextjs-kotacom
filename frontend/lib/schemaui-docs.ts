import rawDocs from "@/content/schemaui-docs.json";

export type SchemauiDocPage = {
  pathname: string;
  slug: string[];
  title: string;
  group: string;
  sourceUrl: string;
  articleHtml: string;
};

type SchemauiDocsPayload = {
  generatedAt: string;
  baseUrl: string;
  totalPages: number;
  pages: SchemauiDocPage[];
};

const docs = rawDocs as SchemauiDocsPayload;

export const getSchemauiDocs = () => docs;

export const getSchemauiDocByPath = (path: string) =>
  docs.pages.find((page) => page.pathname === path);

export const getSchemauiDocsGroups = () => {
  const groups = new Map<string, SchemauiDocPage[]>();

  for (const page of docs.pages) {
    const current = groups.get(page.group) || [];
    current.push(page);
    groups.set(page.group, current);
  }

  return Array.from(groups.entries()).map(([name, pages]) => ({
    name,
    pages: pages.sort((a, b) => a.pathname.localeCompare(b.pathname)),
  }));
};
