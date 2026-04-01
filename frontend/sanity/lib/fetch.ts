import { sanityFetch } from "@/sanity/lib/live";
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

export const fetchSanityPageBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<PAGE_QUERY_RESULT> => {
  const { data } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug },
  });

  return data;
};

export const fetchSanityPagesStaticParams =
  async (): Promise<PAGES_SLUGS_QUERY_RESULT> => {
    const { data } = await sanityFetch({
      query: PAGES_SLUGS_QUERY,
      perspective: "published",
      stega: false,
    });

    return data;
  };

export const fetchSanityPosts = async (): Promise<POSTS_QUERY_RESULT> => {
  const { data } = await sanityFetch({
    query: POSTS_QUERY,
  });

  return data;
};

export const fetchSanityPostBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<POST_QUERY_RESULT> => {
  const { data } = await sanityFetch({
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
  const { data } = await sanityFetch({
    query: POSTS_BY_CATEGORY_QUERY,
    params: { slug },
  });

  return data || [];
};

export const fetchSanityPostsStaticParams =
  async (): Promise<POSTS_SLUGS_QUERY_RESULT> => {
    const { data } = await sanityFetch({
      query: POSTS_SLUGS_QUERY,
      perspective: "published",
      stega: false,
    });

    return data;
  };

export const fetchSanityNavigation =
  async (): Promise<NAVIGATION_QUERY_RESULT> => {
    const { data } = await sanityFetch({
      query: NAVIGATION_QUERY,
    });

    return data;
  };

export const fetchSanitySettings = async (): Promise<SETTINGS_QUERY_RESULT> => {
  const { data } = await sanityFetch({
    query: SETTINGS_QUERY,
  });

  return data;
};

export const fetchSanityCategories = async (): Promise<any[]> => {
  const { data } = await sanityFetch({
    query: CATEGORIES_QUERY,
  });

  return data || [];
};

export const fetchSanityBlogCategories = async (): Promise<any[]> => {
  const { data } = await sanityFetch({
    query: BLOG_CATEGORIES_QUERY,
  });

  return data || [];
};

export const fetchSanityProductCategories = async (): Promise<any[]> => {
  const { data } = await sanityFetch({
    query: PRODUCT_CATEGORIES_QUERY,
  });

  return data || [];
};

export const fetchSanityServiceCategories = async (): Promise<any[]> => {
  const { data } = await sanityFetch({
    query: SERVICE_CATEGORIES_QUERY,
  });

  return data || [];
};

export const fetchSanityCategoryBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<any | null> => {
  const { data } = await sanityFetch({
    query: CATEGORY_QUERY,
    params: { slug },
  });

  return data;
};

export const fetchSanityCategoriesStaticParams = async (): Promise<any[]> => {
  const { data } = await sanityFetch({
    query: CATEGORIES_SLUGS_QUERY,
    perspective: "published",
    stega: false,
  });

  return data || [];
};

export const fetchSanityProducts = async (): Promise<any[]> => {
  const { data } = await sanityFetch({
    query: PRODUCTS_QUERY,
  });

  return data || [];
};

export const fetchSanityProductsByCategorySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<any[]> => {
  const { data } = await sanityFetch({
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
  const { data } = await sanityFetch({
    query: PRODUCT_QUERY,
    params: { slug },
  });

  return data;
};

export const fetchSanityProductsStaticParams = async (): Promise<any[]> => {
  const { data } = await sanityFetch({
    query: PRODUCTS_SLUGS_QUERY,
    perspective: "published",
    stega: false,
  });

  return data || [];
};

export const fetchSanityServices = async (): Promise<any[]> => {
  const { data } = await sanityFetch({
    query: SERVICES_QUERY,
  });

  return data || [];
};

export const fetchSanityServicesByCategorySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<any[]> => {
  const { data } = await sanityFetch({
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
  const { data } = await sanityFetch({
    query: SERVICE_QUERY,
    params: { slug },
  });

  return data;
};

export const fetchSanityServicesStaticParams = async (): Promise<any[]> => {
  const { data } = await sanityFetch({
    query: SERVICES_SLUGS_QUERY,
    perspective: "published",
    stega: false,
  });

  return data || [];
};
