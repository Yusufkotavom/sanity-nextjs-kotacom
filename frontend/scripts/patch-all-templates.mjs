console.error(
  [
    "This script is deprecated.",
    "Use `node frontend/scripts/upgrade-template-conversion-content.mjs --write` instead.",
    "Reason: the old patch contained outdated placeholder-heavy copy and conflicting pricing/proof content.",
  ].join(" "),
);

process.exit(1);
