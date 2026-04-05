import { client } from "@/sanity/lib/client";
import {
  SEO_OPS_SETTINGS_PRIVATE_QUERY,
  SEO_OPS_SETTINGS_PUBLIC_QUERY,
} from "@/sanity/queries/seo-ops-settings";
import {
  AI_WRITER_SETTINGS_PRIVATE_QUERY,
  AI_WRITER_SETTINGS_PUBLIC_QUERY,
} from "@/sanity/queries/ai-writer-settings";

const fetchPublished = async <T>({
  query,
  params,
}: {
  query: string;
  params?: Record<string, unknown>;
}): Promise<T> => {
  return client.fetch(query, params || {}, {
    perspective: "published",
    stega: false,
  });
};

export const fetchSanitySeoOpsSettings = async (): Promise<{
  googleEnabled?: boolean;
  googleAggressiveMode?: boolean;
  indexNowEnabled?: boolean;
  indexNowHost?: string;
  indexNowEndpoint?: string;
  indexNowKeyLocation?: string;
  autoSubmitOnRevalidate?: boolean;
  maxBatchSize?: number;
  retryAttempts?: number;
  notes?: string;
} | null> => {
  return fetchPublished<{
    googleEnabled?: boolean;
    googleAggressiveMode?: boolean;
    indexNowEnabled?: boolean;
    indexNowHost?: string;
    indexNowEndpoint?: string;
    indexNowKeyLocation?: string;
    autoSubmitOnRevalidate?: boolean;
    maxBatchSize?: number;
    retryAttempts?: number;
    notes?: string;
  } | null>({
    query: SEO_OPS_SETTINGS_PUBLIC_QUERY,
  });
};

export const fetchSanitySeoOpsSettingsPrivate = async (): Promise<{
  googleEnabled?: boolean;
  googleAggressiveMode?: boolean;
  googleServiceAccountEncrypted?: string;
  indexNowEnabled?: boolean;
  indexNowHost?: string;
  indexNowEndpoint?: string;
  indexNowKeyEncrypted?: string;
  indexNowKeyLocation?: string;
  autoSubmitOnRevalidate?: boolean;
  maxBatchSize?: number;
  retryAttempts?: number;
  dashboardPasswordHash?: string;
  notes?: string;
} | null> => {
  return fetchPublished<{
    googleEnabled?: boolean;
    googleAggressiveMode?: boolean;
    googleServiceAccountEncrypted?: string;
    indexNowEnabled?: boolean;
    indexNowHost?: string;
    indexNowEndpoint?: string;
    indexNowKeyEncrypted?: string;
    indexNowKeyLocation?: string;
    autoSubmitOnRevalidate?: boolean;
    maxBatchSize?: number;
    retryAttempts?: number;
    dashboardPasswordHash?: string;
    notes?: string;
  } | null>({
    query: SEO_OPS_SETTINGS_PRIVATE_QUERY,
  });
};

export const fetchSanityAiWriterSettings = async (): Promise<{
  enabled?: boolean;
  mode?: "gateway" | "direct-gemini" | "direct-groq";
  defaultModel?: string;
  customModelGateway?: string;
  defaultModelGemini?: string;
  customModelGemini?: string;
  defaultModelGroq?: string;
  customModelGroq?: string;
  fallbackModels?: string[];
  temperature?: number;
  maxOutputTokens?: number;
  prompts?: {
    globalSystem?: string;
    postRewrite?: string;
    serviceRewrite?: string;
    projectRewrite?: string;
  };
  notes?: string;
} | null> => {
  return fetchPublished<{
    enabled?: boolean;
    mode?: "gateway" | "direct-gemini" | "direct-groq";
    defaultModel?: string;
    customModelGateway?: string;
    defaultModelGemini?: string;
    customModelGemini?: string;
    defaultModelGroq?: string;
    customModelGroq?: string;
    fallbackModels?: string[];
    temperature?: number;
    maxOutputTokens?: number;
    prompts?: {
      globalSystem?: string;
      postRewrite?: string;
      serviceRewrite?: string;
      projectRewrite?: string;
    };
    notes?: string;
  } | null>({
    query: AI_WRITER_SETTINGS_PUBLIC_QUERY,
  });
};

export const fetchSanityAiWriterSettingsPrivate = async (): Promise<{
  enabled?: boolean;
  mode?: "gateway" | "direct-gemini" | "direct-groq";
  defaultModel?: string;
  customModelGateway?: string;
  defaultModelGemini?: string;
  customModelGemini?: string;
  defaultModelGroq?: string;
  customModelGroq?: string;
  fallbackModels?: string[];
  temperature?: number;
  maxOutputTokens?: number;
  prompts?: {
    globalSystem?: string;
    postRewrite?: string;
    serviceRewrite?: string;
    projectRewrite?: string;
  };
  notes?: string;
} | null> => {
  return fetchPublished<{
    enabled?: boolean;
    mode?: "gateway" | "direct-gemini" | "direct-groq";
    defaultModel?: string;
    customModelGateway?: string;
    defaultModelGemini?: string;
    customModelGemini?: string;
    defaultModelGroq?: string;
    customModelGroq?: string;
    fallbackModels?: string[];
    temperature?: number;
    maxOutputTokens?: number;
    prompts?: {
      globalSystem?: string;
      postRewrite?: string;
      serviceRewrite?: string;
      projectRewrite?: string;
    };
    notes?: string;
  } | null>({
    query: AI_WRITER_SETTINGS_PRIVATE_QUERY,
  });
};
