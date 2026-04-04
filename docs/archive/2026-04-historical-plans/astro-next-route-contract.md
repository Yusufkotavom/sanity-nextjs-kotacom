# Route Contract: Astro Legacy -> Next.js + Sanity

Date: 2026-04-01
Status: Active (v1)

## Canonical Target Routes (Next)

- `/`
- `/blog`
- `/blog/[slug]`
- `/blog/category/[slug]`
- `/services`
- `/services/[slug]`
- `/services/category/[slug]`
- `/products`
- `/products/[slug]`
- `/products/category/[slug]`
- `/projects/[slug]`

## Mapping Rules (Priority Ordered)

1. `^/posts/(?<slug>[^/]+)/?$` -> `/blog/{slug}`
- Reason code: `legacy_posts_to_blog`

2. `^/blog/(?<slug>[^/]+)/?$` -> `/blog/{slug}`
- Reason code: `blog_slug_normalization`

3. `^/category/(?<slug>[^/]+)(/page/\d+)?/?$` -> `/blog/category/{slug}`
- Reason code: `legacy_category_to_blog_category`

4. `^/services/(?<slug>[^/]+)/?$` -> `/services/{slug}`
- Reason code: `services_direct`

5. `^/(service|it-services|software)/(?<slug>[^/]+)/?$` -> `/services/{slug}`
- Reason code: `service_namespace_merge`

6. `^/products/(?<slug>[^/]+)/?$` -> `/products/{slug}`
- Reason code: `products_direct`

7. `^/product/(?<slug>[^/]+)/?$` -> `/products/{slug}`
- Reason code: `product_singular_to_plural`

8. `^/projects/(?<slug>[^/]+)/?$` -> `/projects/{slug}`
- Reason code: `projects_direct`

9. `^/product-tag/(?<slug>[^/]+)(/page/\d+)?/?$` -> `/products/category/{slug}`
- Reason code: `product_tag_to_products_category`

10. `^/pembuatan-website(/.*)?$` -> `/services/jasa-pembuatan-website-surabaya`
- Reason code: `landing_cluster_to_service_canonical`

11. `^/percetakan(/.*)?$` -> `/services/printing-services`
- Reason code: `printing_cluster_to_service_canonical`

12. `^/jasa-cetak-.*$` -> `/services/printing-services`
- Reason code: `printing_keyword_cluster`

13. Pagination/archives (`/page/{n}`) -> canonical listing page (`/blog`, `/products`, or `/services`)
- Reason code: `pagination_to_canonical_listing`

14. Unclassified legacy URL -> manual curation queue
- Reason code: `manual_intent_review_required`

## Conflict Resolution Rules

- If both direct detail mapping and cluster mapping are possible, prioritize detail mapping.
- If target slug not found in current CMS, map to nearest canonical parent and mark for content gap follow-up.
- For low-quality archive/tag pages, prefer category/listing canonical over thin detail target.

## Validation Checklist

- [ ] target path exists in Next route contract
- [ ] content intent matches target intent
- [ ] canonical does not create redirect chain
- [ ] mapped URL added to redirect dataset with reason code
