/**
 * @deprecated Content generators moved to archive
 * These exports still work but point to archived code
 * Consider using Sanity content instead
 */
export type { LegacyRewriteCopy } from "./archive/content-generators/types";
export { buildPercetakanCetakBukuCityCopy } from "./archive/content-generators/printing";
export {
  buildLegacyRewriteCopy,
  resolveLegacyPageContent,
  type LegacyPageResolution,
  type LegacyPageSource,
} from "./archive/content-generators/registry";


