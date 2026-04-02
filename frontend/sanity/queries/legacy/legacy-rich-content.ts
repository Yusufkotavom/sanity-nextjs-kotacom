export const legacyRichContentQuery = `
  _type == "legacy-rich-content" => {
    _type,
    _key,
    title,
    excerpt,
    contentFormat,
    contentRaw,
  }
`;
