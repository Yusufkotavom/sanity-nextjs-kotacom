export const legacyRichContentQuery = `
  _type in ["legacy-rich-content", "rich-content"] => {
    _type,
    _key,
    title,
    excerpt,
    contentFormat,
    contentRaw,
  }
`;
