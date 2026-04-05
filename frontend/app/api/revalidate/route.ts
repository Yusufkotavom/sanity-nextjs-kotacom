import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

type WebhookPayload = {
  _type?: string;
  slug?: { current?: string };
  path?: string;
};

function getSecret(request: NextRequest) {
  return (
    request.nextUrl.searchParams.get("secret") ||
    request.headers.get("x-revalidate-secret")
  );
}

function collectPaths(payload: WebhookPayload | null) {
  const paths = new Set<string>(["/", "/blog", "/products", "/services"]);

  const contentType = payload?._type;
  const slug = payload?.slug?.current;
  const explicitPath = payload?.path;

  if (explicitPath?.startsWith("/")) {
    paths.add(explicitPath);
  }

  if (!contentType) {
    return paths;
  }

  if (contentType === "post") {
    paths.add("/blog");
    paths.add("/blog/category");
    if (slug) paths.add(`/blog/${slug}`);
  }

  if (contentType === "product") {
    paths.add("/products");
    if (slug) paths.add(`/products/${slug}`);
  }

  if (contentType === "service") {
    paths.add("/services");
    if (slug) paths.add(`/services/${slug}`);
  }

  if (contentType === "category") {
    paths.add("/blog/category");
    if (slug) {
      paths.add(`/blog/category/${slug}`);
      paths.add(`/products/${slug}`);
      paths.add(`/services/${slug}`);
    }
  }

  if (contentType === "page") {
    if (slug && slug !== "index") {
      paths.add(`/${slug}`);
    } else {
      paths.add("/");
    }
  }

  if (
    contentType === "settings" ||
    contentType === "navigation" ||
    contentType === "seoSettings"
  ) {
    paths.add("/");
    paths.add("/blog");
    paths.add("/blog/category");
    paths.add("/products");
    paths.add("/services");
    paths.add("/docs");
    paths.add("/style-guide");
  }

  return paths;
}

export async function POST(request: NextRequest) {
  const configuredSecret = process.env.REVALIDATE_SECRET;

  if (!configuredSecret) {
    return NextResponse.json(
      { ok: false, message: "Missing REVALIDATE_SECRET on server" },
      { status: 500 },
    );
  }

  const providedSecret = getSecret(request);
  if (!providedSecret || providedSecret !== configuredSecret) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  let payload: WebhookPayload | null = null;

  try {
    payload = (await request.json()) as WebhookPayload;
  } catch {
    payload = null;
  }

  const paths = collectPaths(payload);

  for (const path of paths) {
    revalidatePath(path);
  }

  const dashboardUrl = process.env.SEO_DASHBOARD_URL || "";
  const dashboardSecret = process.env.SEO_DASHBOARD_WEBHOOK_SECRET || "";
  if (dashboardUrl && dashboardSecret) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
    const urls = Array.from(paths)
      .map((path) => {
        if (!baseUrl || !path.startsWith("/")) return null;
        return `${baseUrl.replace(/\/+$/, "")}${path}`;
      })
      .filter((url): url is string => Boolean(url));

    if (urls.length) {
      try {
        await fetch(`${dashboardUrl.replace(/\/+$/, "")}/api/seo/indexing/webhook`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-seo-dashboard-secret": dashboardSecret,
          },
          body: JSON.stringify({
            urls,
            reason: `revalidate webhook: ${payload?._type || "unknown"}`,
          }),
        });
      } catch {
        // ignore dashboard webhook failures; revalidate should still succeed
      }
    }
  }

  return NextResponse.json({
    ok: true,
    revalidated: Array.from(paths),
    type: payload?._type || null,
    slug: payload?.slug?.current || null,
  });
}
