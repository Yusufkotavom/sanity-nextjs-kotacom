import { groq } from "next-sanity";

export const AI_WRITER_SETTINGS_PUBLIC_QUERY = groq`*[_type == "aiWriterSettings"][0]{
  enabled,
  mode,
  defaultModel,
  fallbackModels,
  gatewayProviderOrder,
  temperature,
  maxOutputTokens,
  prompts,
  notes
}`;

export const AI_WRITER_SETTINGS_PRIVATE_QUERY = groq`*[_type == "aiWriterSettings"][0]{
  enabled,
  mode,
  defaultModel,
  fallbackModels,
  gatewayProviderOrder,
  temperature,
  maxOutputTokens,
  gatewayApiKeyEncrypted,
  geminiApiKeysEncrypted,
  groqApiKeysEncrypted,
  prompts,
  notes
}`;
