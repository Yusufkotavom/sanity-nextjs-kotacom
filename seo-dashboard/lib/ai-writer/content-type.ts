export type SupportedContentType = "post" | "service" | "product";
export type SanityPublishType = "post" | "service" | "project";

const SUPPORTED_CONTENT_TYPES: SupportedContentType[] = ["post", "service", "product"];

export function isSupportedContentType(value: unknown): value is SupportedContentType {
  return typeof value === "string" && SUPPORTED_CONTENT_TYPES.includes(value as SupportedContentType);
}

export function assertSupportedContentType(value: unknown): SupportedContentType {
  if (!isSupportedContentType(value)) {
    throw new Error("Invalid content type. Must be 'post', 'service', or 'product'");
  }
  return value;
}

export function toSanityPublishType(contentType: SupportedContentType): SanityPublishType {
  return contentType === "product" ? "project" : contentType;
}

