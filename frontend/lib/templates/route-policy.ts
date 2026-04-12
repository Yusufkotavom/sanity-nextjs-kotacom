const TEMPLATE_ROUTE_PREFIXES = [
  "/pembuatan-website",
  "/software",
  "/percetakan",
];

const TEMPLATE_ROOT_PATTERNS = [/^\/jasa-[a-z0-9-]+$/];

export function isAllowedTemplateRoute(route?: string | null) {
  if (!route || !route.startsWith("/")) return false;
  if (
    TEMPLATE_ROUTE_PREFIXES.some(
      (prefix) => route === prefix || route.startsWith(`${prefix}/`),
    )
  ) {
    return true;
  }
  return TEMPLATE_ROOT_PATTERNS.some((pattern) => pattern.test(route));
}
