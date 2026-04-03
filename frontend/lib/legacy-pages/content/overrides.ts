import { PRINTING_PRIORITY_OVERRIDES } from "./printing-overrides";
import { SOFTWARE_PRIORITY_OVERRIDES } from "./software-overrides";
import type { LegacyRewriteCopy } from "./types";
import { WEBSITE_PRIORITY_OVERRIDES } from "./website-overrides";

export const PRIORITY_SLUG_OVERRIDES: Record<string, Partial<LegacyRewriteCopy>> = {
  ...WEBSITE_PRIORITY_OVERRIDES,
  ...PRINTING_PRIORITY_OVERRIDES,
  ...SOFTWARE_PRIORITY_OVERRIDES,
};
