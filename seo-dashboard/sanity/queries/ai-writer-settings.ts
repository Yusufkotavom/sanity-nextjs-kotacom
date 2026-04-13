import { groq } from "next-sanity";

export const AI_WRITER_SETTINGS_PUBLIC_QUERY = groq`*[_type == "aiWriterSettings"][0]{
  enabled,
  mode,
  defaultModel,
  customModelGateway,
  defaultModelGemini,
  customModelGemini,
  defaultModelGroq,
  customModelGroq,
  fallbackModels,
  modelProfiles,
  temperature,
  maxOutputTokens,
  prompts,
  notes
}`;

export const AI_WRITER_SETTINGS_PRIVATE_QUERY = groq`*[_type == "aiWriterSettings"][0]{
  enabled,
  mode,
  defaultModel,
  customModelGateway,
  defaultModelGemini,
  customModelGemini,
  defaultModelGroq,
  customModelGroq,
  fallbackModels,
  modelProfiles,
  temperature,
  maxOutputTokens,
  prompts,
  notes
}`;
