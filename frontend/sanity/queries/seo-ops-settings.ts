import { groq } from "next-sanity";

export const SEO_OPS_SETTINGS_PUBLIC_QUERY = groq`*[_type == "seoOpsSettings"][0]{
  googleEnabled,
  googleAggressiveMode,
  indexNowEnabled,
  indexNowHost,
  indexNowEndpoint,
  indexNowKeyLocation,
  autoSubmitOnRevalidate,
  maxBatchSize,
  retryAttempts,
  notes
}`;

export const SEO_OPS_SETTINGS_PRIVATE_QUERY = groq`*[_type == "seoOpsSettings"][0]{
  googleEnabled,
  googleAggressiveMode,
  googleServiceAccountEncrypted,
  indexNowEnabled,
  indexNowHost,
  indexNowEndpoint,
  indexNowKeyEncrypted,
  indexNowKeyLocation,
  autoSubmitOnRevalidate,
  maxBatchSize,
  retryAttempts,
  dashboardPasswordHash,
  notes
}`;
