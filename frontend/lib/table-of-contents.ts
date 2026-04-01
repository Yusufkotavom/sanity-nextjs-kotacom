type PortableTextSpan = {
  _type?: string;
  text?: string;
};

type PortableTextBlock = {
  _key?: string;
  _type?: string;
  style?: string;
  children?: PortableTextSpan[];
};

export type TableOfContentsItem = {
  id: string;
  key: string;
  text: string;
  level: 2 | 3 | 4;
};

const HEADING_LEVELS: Record<string, 2 | 3 | 4> = {
  h2: 2,
  h3: 3,
  h4: 4,
};

export const slugifyHeading = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export const extractTableOfContents = (
  value: unknown,
): TableOfContentsItem[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  const blocks = value as PortableTextBlock[];
  const slugCount = new Map<string, number>();
  const items: TableOfContentsItem[] = [];

  for (const block of blocks) {
    if (block?._type !== "block" || !block.style || !(block.style in HEADING_LEVELS)) {
      continue;
    }

    const headingText = (block.children || [])
      .filter((child) => child?._type === "span")
      .map((child) => child?.text || "")
      .join("")
      .trim();

    if (!headingText || !block._key) {
      continue;
    }

    const baseSlug = slugifyHeading(headingText) || "section";
    const total = (slugCount.get(baseSlug) || 0) + 1;
    slugCount.set(baseSlug, total);
    const id = total > 1 ? `${baseSlug}-${total}` : baseSlug;

    items.push({
      id,
      key: block._key,
      text: headingText,
      level: HEADING_LEVELS[block.style],
    });
  }

  return items;
};
