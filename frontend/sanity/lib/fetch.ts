import { client } from "@/sanity/lib/client";
import { PAGE_QUERY, PAGES_SLUGS_QUERY } from "@/sanity/queries/page";
import { NAVIGATION_QUERY } from "@/sanity/queries/navigation";
import { SETTINGS_QUERY } from "@/sanity/queries/settings";
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
