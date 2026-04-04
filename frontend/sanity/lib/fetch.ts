import { client } from "@/sanity/lib/client";
import { PAGE_QUERY, PAGES_SLUGS_QUERY } from "@/sanity/queries/page";
import { NAVIGATION_QUERY } from "@/sanity/queries/navigation";
import { SETTINGS_QUERY } from "@/sanity/queries/settings";
import { SEO_SETTINGS_QUERY } from "@/sanity/queries/seo-settings";
import { THEME_SETTINGS_QUERY } from "@/sanity/queries/theme-settings";
import { REUSABLE_SECTIONS_QUERY } from "@/sanity/queries/reusable-section";
import {
  SEO_OPS_SETTINGS_PRIVATE_QUERY,
  SEO_OPS_SETTINGS_PUBLIC_QUERY,
} from "@/sanity/queries/seo-ops-settings";
import {
  AI_WRITER_SETTINGS_PRIVATE_QUERY,
  AI_WRITER_SETTINGS_PUBLIC_QUERY,
} from "@/sanity/queries/ai-writer-settings";
import {
  BLOG_CATEGORIES_QUERY,
  CATEGORIES_QUERY,
  CATEGORY_QUERY,
  CATEGORIES_SLUGS_QUERY,
  PRODUCT_CATEGORIES_QUERY,
  SERVICE_CATEGORIES_QUERY,
} from "@/sanity/queries/category";
import {
  PRODUCT_QUERY,
  PRODUCTS_BY_CATEGORY_QUERY,
  PRODUCTS_QUERY,
  PRODUCTS_SLUGS_QUERY,
} from "@/sanity/queries/product";
import {
  SERVICE_QUERY,
  SERVICES_BY_CATEGORY_QUERY,
  SERVICES_QUERY,
  SERVICES_SLUGS_QUERY,
} from "@/sanity/queries/service";
import {
  PROJECT_QUERY,
  PROJECTS_QUERY,
  PROJECTS_SLUGS_QUERY,
} from "@/sanity/queries/project";
import {
  POST_QUERY,
  POSTS_BY_CATEGORY_QUERY,
  POSTS_QUERY,
  POSTS_SLUGS_QUERY,
} from "@/sanity/queries/post";
import {
  PAGE_QUERY_RESULT,
  PAGES_SLUGS_QUERY_RESULT,
  POST_QUERY_RESULT,
  POSTS_QUERY_RESULT,
  POSTS_SLUGS_QUERY_RESULT,
  NAVIGATION_QUERY_RESULT,
  SETTINGS_QUERY_RESULT,
} from "@/sanity.types";

type PageBlock = NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number];
export type ReusablePlacementSlot =
  | "beforeHeader"
  | "afterHeader"
  | "beforeFooter"
  | "afterFooter";
export type ReusableSectionItem = {
  _id: string;
  title?: string;
  priority?: number;
  placements?: ReusablePlacementSlot[];
  blocks?: PageBlock[];
};

const fetchPublished = async <T>({
  query,
  params,
}: {
  query: string;
  params?: Record<string, unknown>;
}): Promise<T> => {
  return client.fetch(query, params || {}, { perspective: "published", stega: false });
};

export const fetchSanityPageBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<PAGE_QUERY_RESULT> => {
  const data = await fetchPublished<PAGE_QUERY_RESULT>({
    query: PAGE_QUERY,
    params: { slug },
  });

  return data;
};

export const fetchSanityPagesStaticParams =
  async (): Promise<PAGES_SLUGS_QUERY_RESULT> => {
    const data = await fetchPublished<PAGES_SLUGS_QUERY_RESULT>({
      query: PAGES_SLUGS_QUERY,
    });

    return data;
  };

export const fetchSanityPosts = async (): Promise<POSTS_QUERY_RESULT> => {
  const data = await fetchPublished<POSTS_QUERY_RESULT>({
    query: POSTS_QUERY,
  });

  return data;
};

export const fetchSanityPostBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<POST_QUERY_RESULT> => {
  const data = await fetchPublished<POST_QUERY_RESULT>({
    query: POST_QUERY,
    params: { slug },
  });

  return data;
};

export const fetchSanityPostsByCategorySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<any[]> => {
  const data = await fetchPublished<any[]>({
    query: POSTS_BY_CATEGORY_QUERY,
    params: { slug },
  });

  return data || [];
};

export const fetchSanityPostsStaticParams =
  async (): Promise<POSTS_SLUGS_QUERY_RESULT> => {
    const data = await fetchPublished<POSTS_SLUGS_QUERY_RESULT>({
      query: POSTS_SLUGS_QUERY,
    });

    return data;
  };

export const fetchSanityNavigation =
  async (): Promise<NAVIGATION_QUERY_RESULT> => {
    const data = await fetchPublished<NAVIGATION_QUERY_RESULT>({
      query: NAVIGATION_QUERY,
    });

    return data;
  };

export const fetchSanitySettings = async (): Promise<SETTINGS_QUERY_RESULT> => {
  const data = await fetchPublished<SETTINGS_QUERY_RESULT>({
    query: SETTINGS_QUERY,
  });

  return data;
};

export const fetchSanitySeoSettings = async (): Promise<any | null> => {
  const data = await fetchPublished<any | null>({
    query: SEO_SETTINGS_QUERY,
  });

  return data;
};

export const fetchSanityThemeSettings = async (): Promise<{
  themeColors?: {
    themePreset?: string;
    lightPrimary?: string;
    lightPrimaryForeground?: string;
    lightAccent?: string;
    lightRing?: string;
    darkPrimary?: string;
    darkPrimaryForeground?: string;
    darkAccent?: string;
    darkRing?: string;
  } | null;
} | null> => {
  const data = await fetchPublished<{
    themeColors?: {
      themePreset?: string;
      lightPrimary?: string;
      lightPrimaryForeground?: string;
      lightAccent?: string;
      lightRing?: string;
      darkPrimary?: string;
      darkPrimaryForeground?: string;
      darkAccent?: string;
      darkRing?: string;
    } | null;
  } | null>({
    query: THEME_SETTINGS_QUERY,
  });

  return data;
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
  const data = await fetchPublished<{
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

  return data;
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
  const data = await fetchPublished<{
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

  return data;
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
  const data = await fetchPublished<{
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

  return data;
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
  const data = await fetchPublished<{
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

  return data;
};

export const fetchSanityReusableSections = async (): Promise<ReusableSectionItem[]> => {
  const data = await fetchPublished<ReusableSectionItem[]>({
    query: REUSABLE_SECTIONS_QUERY,
  });

  return data || [];
};

export const fetchSanityCategories = async (): Promise<any[]> => {
  const data = await fetchPublished<any[]>({
    query: CATEGORIES_QUERY,
  });

  return data || [];
};

export const fetchSanityBlogCategories = async (): Promise<any[]> => {
  const data = await fetchPublished<any[]>({
    query: BLOG_CATEGORIES_QUERY,
  });

  return data || [];
};

export const fetchSanityProductCategories = async (): Promise<any[]> => {
  const data = await fetchPublished<any[]>({
    query: PRODUCT_CATEGORIES_QUERY,
  });

  return data || [];
};

export const fetchSanityServiceCategories = async (): Promise<any[]> => {
  const data = await fetchPublished<any[]>({
    query: SERVICE_CATEGORIES_QUERY,
  });

  return data || [];
};

export const fetchSanityCategoryBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<any | null> => {
  const data = await fetchPublished<any | null>({
    query: CATEGORY_QUERY,
    params: { slug },
  });

  return data;
};

export const fetchSanityCategoriesStaticParams = async (): Promise<any[]> => {
  const data = await fetchPublished<any[]>({
    query: CATEGORIES_SLUGS_QUERY,
  });

  return data || [];
};

export const fetchSanityProducts = async (): Promise<any[]> => {
  const data = await fetchPublished<any[]>({
    query: PRODUCTS_QUERY,
  });

  return data || [];
};

export const fetchSanityProductsByCategorySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<any[]> => {
  const data = await fetchPublished<any[]>({
    query: PRODUCTS_BY_CATEGORY_QUERY,
    params: { slug },
  });

  return data || [];
};

export const fetchSanityProductBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<any | null> => {
  const data = await fetchPublished<any | null>({
    query: PRODUCT_QUERY,
    params: { slug },
  });

  return data;
};

export const fetchSanityProductsStaticParams = async (): Promise<any[]> => {
  const data = await fetchPublished<any[]>({
    query: PRODUCTS_SLUGS_QUERY,
  });

  return data || [];
};

export const fetchSanityServices = async (): Promise<any[]> => {
  const data = await fetchPublished<any[]>({
    query: SERVICES_QUERY,
  });

  return data || [];
};

export const fetchSanityServicesByCategorySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<any[]> => {
  const data = await fetchPublished<any[]>({
    query: SERVICES_BY_CATEGORY_QUERY,
    params: { slug },
  });

  return data || [];
};

export const fetchSanityServiceBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<any | null> => {
  const data = await fetchPublished<any | null>({
    query: SERVICE_QUERY,
    params: { slug },
  });

  return data;
};

export const fetchSanityServicesStaticParams = async (): Promise<any[]> => {
  const data = await fetchPublished<any[]>({
    query: SERVICES_SLUGS_QUERY,
  });

  return data || [];
};

export const fetchSanityProjects = async (): Promise<any[]> => {
  const data = await fetchPublished<any[]>({
    query: PROJECTS_QUERY,
  });

  return data || [];
};

export const fetchSanityProjectBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<any | null> => {
  const data = await fetchPublished<any | null>({
    query: PROJECT_QUERY,
    params: { slug },
  });

  return data;
};

export const fetchSanityProjectsStaticParams = async (): Promise<any[]> => {
  const data = await fetchPublished<any[]>({
    query: PROJECTS_SLUGS_QUERY,
  });

  return data || [];
};
