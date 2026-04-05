import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { schema } from "@repo/db";
import { createJobRun } from "@/lib/jobs";
import { enqueue, QUEUES } from "@/lib/queue";

type SanityWebhookPayload = {
  _id?: string;
  _type?: string;
  slug?: { current?: string };
  title?: string;
  path?: string;
  publishedAt?: string;
  _updatedAt?: string;
};

function requireInternalSecret(request: NextRequest) {
  const expected = process.env.INTERNAL_API_SECRET || "";
  const provided =
    request.headers.get("x-internal-secret") ||
    request.nextUrl.searchParams.get("secret") ||
    "";
  return Boolean(expected && provided && expected === provided);
}

function buildPathFromPayload(payload: SanityWebhookPayload) {
  if (payload.path?.startsWith("/")) return payload.path;
  const slug = payload.slug?.current;
  const type = payload._type;
  if (!slug) return "/";

  if (type === "post") return `/blog/${slug}`;
  if (type === "page") return slug === "index" ? "/" : `/${slug}`;
  if (type === "product") return `/products/${slug}`;
  if (type === "service") return `/services/${slug}`;
  return `/${slug}`;
}

export async function POST(request: NextRequest) {
  if (!requireInternalSecret(request)) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const payload = (await request.json().catch(() => ({}))) as SanityWebhookPayload;
  if (!payload._id || !payload._type) {
    return NextResponse.json(
      { ok: false, message: "Missing _id or _type on payload" },
      { status: 400 },
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.PUBLIC_SITE_URL || "";
  const normalizedSlug =
    typeof payload.slug === "string" ? payload.slug : payload.slug?.current || undefined;
  const normalizedPayload = { ...payload, slug: { current: normalizedSlug } };
  const path = buildPathFromPayload(normalizedPayload);
  const url = baseUrl ? `${baseUrl.replace(/\/+$/, "")}${path}` : path;

  const [contentItem] = await db()
    .insert(schema.contentItems)
    .values({
      sanityId: payload._id,
      documentType: payload._type,
      slug: normalizedSlug || payload._id,
      url,
      title: payload.title || null,
      publishedAt: payload.publishedAt ? new Date(payload.publishedAt) : null,
      updatedAt: payload._updatedAt ? new Date(payload._updatedAt) : new Date(),
    })
    .onConflictDoUpdate({
      target: schema.contentItems.sanityId,
      set: {
        documentType: payload._type,
        slug: normalizedSlug || payload._id,
        url,
        title: payload.title || null,
        publishedAt: payload.publishedAt ? new Date(payload.publishedAt) : null,
        updatedAt: payload._updatedAt ? new Date(payload._updatedAt) : new Date(),
      },
    })
    .returning({ id: schema.contentItems.id, url: schema.contentItems.url });

  if (contentItem?.id) {
    const seoJob = await createJobRun({
      jobType: "seo_audit",
      payload: { url: contentItem.url, contentItemId: contentItem.id },
    });
    await enqueue(QUEUES.seo, {
      jobRunId: seoJob.id,
      jobType: "seo_audit",
      payload: { url: contentItem.url, contentItemId: contentItem.id },
    });

    const indexKey = process.env.INDEXNOW_KEY || "";
    const indexLocation = process.env.INDEXNOW_KEY_LOCATION || "";
    const resolvedHost = process.env.INDEXNOW_HOST
      || (contentItem.url.startsWith("http") ? new URL(contentItem.url).host : "");
    if (indexKey && indexLocation && resolvedHost) {
      const indexPayload = {
        host: resolvedHost,
        key: indexKey,
        keyLocation: indexLocation,
        urls: [contentItem.url],
        submissionType: "update",
        contentItemId: contentItem.id,
      };

      const searchJob = await createJobRun({
        jobType: "search_submit",
        payload: indexPayload,
      });
      await enqueue(QUEUES.search, {
        jobRunId: searchJob.id,
        jobType: "search_submit",
        payload: indexPayload,
      });
    }
  }

  return NextResponse.json({ ok: true, id: contentItem?.id || null, url });
}
