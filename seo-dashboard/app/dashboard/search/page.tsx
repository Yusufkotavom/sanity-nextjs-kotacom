import { isDatabaseConfigured, db } from "@/lib/db-safe";
import { DatabaseNotConfigured, DatabaseError } from "@/components/database-error";
import { schema } from "@repo/db";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { desc, and, eq, inArray } from "drizzle-orm";
import { SearchFilters } from "@/components/search-filters";
import { InspectFilters } from "@/components/inspect-filters";
import { ManualIndexForm } from "@/components/manual-index-form";
import { InspectUrlForm } from "@/components/inspect-url-form";
import { RetrySubmissionButton } from "@/components/retry-submission-button";
import { RetryInspectionButton } from "@/components/retry-inspection-button";
import { RefreshCw } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

function formatDate(value: Date | string | null) {
  if (!value) return "-";
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function formatProvider(value: string | null) {
  if (!value) return "-";
  if (value === "google_sitemap") return "Google Sitemap";
  if (value === "indexnow") return "IndexNow";
  return value;
}

function formatSubmissionType(value: string | null) {
  if (!value) return "-";
  if (value === "indexing_manual") return "Manual Indexing";
  if (value === "sitemap_submit") return "Sitemap Submit";
  if (value === "update") return "Update";
  return value;
}

function extractResponseMessage(
  payload: unknown,
): string | null {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return null;
  }

  const message = "message" in payload ? payload.message : null;
  return typeof message === "string" && message.trim() ? message.trim() : null;
}

function extractUrlsFromPayload(payload: unknown) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return [];
  const urls = "urls" in payload ? payload.urls : null;
  if (!Array.isArray(urls)) return [];
  return urls.filter((url): url is string => typeof url === "string" && url.trim().length > 0);
}

function extractInspectionUrl(rawResponse: unknown): string | null {
  if (!rawResponse || typeof rawResponse !== "object" || Array.isArray(rawResponse)) {
    return null;
  }

  const inspectionResult = "inspectionResult" in rawResponse
    ? (rawResponse as Record<string, unknown>).inspectionResult
    : null;
  if (inspectionResult && typeof inspectionResult === "object" && !Array.isArray(inspectionResult)) {
    const maybe = (inspectionResult as Record<string, unknown>).inspectionUrl;
    if (typeof maybe === "string" && maybe.trim()) return maybe;
  }

  const fallback = "inspectionUrl" in rawResponse
    ? (rawResponse as Record<string, unknown>).inspectionUrl
    : null;
  if (typeof fallback === "string" && fallback.trim()) return fallback;

  return null;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    provider?: string;
    type?: string;
    status?: string;
    sub_q?: string;
    inspect_verdict?: string;
    inspect_state?: string;
    inspect_q?: string;
  }>;
}) {
  if (!isDatabaseConfigured()) {
    return <DatabaseNotConfigured title="Search Submissions" />;
  }

  const params = await searchParams;
  let submissions: any[] = [];
  let inspections: any[] = [];
  
  try {
    const submissionConditions = [];
    
    if (params.provider && params.provider !== "all") {
      submissionConditions.push(eq(schema.searchSubmissions.provider, params.provider));
    }
    
    if (params.type && params.type !== "all") {
      submissionConditions.push(eq(schema.searchSubmissions.submissionType, params.type));
    }
    
    if (params.status && params.status !== "all") {
      submissionConditions.push(eq(schema.searchSubmissions.status, params.status));
    }

    const submissionsQuery = db()
      .select()
      .from(schema.searchSubmissions)
      .orderBy(desc(schema.searchSubmissions.submittedAt))
      .limit(100);

    submissions = submissionConditions.length > 0
      ? await submissionsQuery.where(and(...submissionConditions))
      : await submissionsQuery;

    const inspectionConditions = [];
    if (params.inspect_verdict && params.inspect_verdict !== "all") {
      inspectionConditions.push(eq(schema.indexStatusChecks.verdict, params.inspect_verdict));
    }
    if (params.inspect_state && params.inspect_state !== "all") {
      inspectionConditions.push(eq(schema.indexStatusChecks.indexingState, params.inspect_state));
    }

    const inspectionsQuery = db()
      .select()
      .from(schema.indexStatusChecks)
      .orderBy(desc(schema.indexStatusChecks.checkedAt))
      .limit(100);
    inspections = inspectionConditions.length > 0
      ? await inspectionsQuery.where(and(...inspectionConditions))
      : await inspectionsQuery;

    const contentItemIds = Array.from(
      new Set(
        [...submissions, ...inspections]
          .map((row) => row.contentItemId as string | null)
          .filter((id): id is string => Boolean(id)),
      ),
    );
    const contentItems = contentItemIds.length
      ? await db()
          .select({ id: schema.contentItems.id, url: schema.contentItems.url })
          .from(schema.contentItems)
          .where(inArray(schema.contentItems.id, contentItemIds))
      : [];
    const contentUrlById = new Map(contentItems.map((item) => [item.id, item.url]));

    submissions = submissions
      .map((item) => {
        const urls = extractUrlsFromPayload(item.requestPayload);
        const contentUrl =
          item.contentItemId && typeof item.contentItemId === "string"
            ? contentUrlById.get(item.contentItemId)
            : null;
        const fullUrls = urls.length ? urls : contentUrl ? [contentUrl] : [];
        const primaryUrl = fullUrls[0] || null;
        return {
          ...item,
          _urls: fullUrls,
          _primaryUrl: primaryUrl,
          _urlCount: fullUrls.length,
        };
      })
      .filter((item) => {
        const q = (params.sub_q || "").trim().toLowerCase();
        if (!q) return true;
        return (
          String(item._primaryUrl || "").toLowerCase().includes(q) ||
          String(item.submissionType || "").toLowerCase().includes(q) ||
          String(item.provider || "").toLowerCase().includes(q)
        );
      });

    inspections = inspections
      .map((item) => {
        const contentUrl =
          item.contentItemId && typeof item.contentItemId === "string"
            ? contentUrlById.get(item.contentItemId)
            : null;
        const inspectionUrl = extractInspectionUrl(item.rawResponse) || contentUrl || null;
        return {
          ...item,
          _url: inspectionUrl,
        };
      })
      .filter((item) => {
        const q = (params.inspect_q || "").trim().toLowerCase();
        if (!q) return true;
        return (
          String(item._url || "").toLowerCase().includes(q) ||
          String(item.coverageState || "").toLowerCase().includes(q) ||
          String(item.indexingState || "").toLowerCase().includes(q)
        );
      });
  } catch (error) {
    return <DatabaseError title="Search Submissions" error={error} />;
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Manual Index Form */}
      <ManualIndexForm />
      <InspectUrlForm />

      {/* Submissions History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Search Submissions</CardTitle>
              <CardDescription>Google, IndexNow, and sitemap submission history</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/search">
                <RefreshCw className="size-4 mr-2" />
                Refresh
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <SearchFilters />
          
          {submissions.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg font-medium">No submissions found</p>
              <p className="text-sm mt-1">Try adjusting your filters or submit new URLs above</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>URL</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Error Message</TableHead>
                  <TableHead>URL Count</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((item) => {
                  const responseMessage = extractResponseMessage(item.responsePayload);

                  return (
                    <TableRow key={item.id} className="hover:bg-muted/50">
                      <TableCell
                        className="max-w-[280px] truncate"
                        title={String(item._primaryUrl || "") || undefined}
                      >
                        {String(item._primaryUrl || "-")}
                      </TableCell>
                      <TableCell className="font-medium">{formatProvider(item.provider)}</TableCell>
                      <TableCell>{formatSubmissionType(item.submissionType)}</TableCell>
                      <TableCell>
                        <Badge variant={item.status === "failed" ? "destructive" : "secondary"}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell
                        className="max-w-[360px] whitespace-normal text-xs text-muted-foreground"
                        title={responseMessage || undefined}
                      >
                        {responseMessage || "-"}
                      </TableCell>
                      <TableCell>{String(item._urlCount || 0)}</TableCell>
                      <TableCell className="text-sm">{formatDate(item.submittedAt)}</TableCell>
                      <TableCell>
                        <RetrySubmissionButton id={String(item.id)} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Index Inspections */}
      <Card>
        <CardHeader>
          <CardTitle>Index Inspections</CardTitle>
          <CardDescription>Google URL inspection results with retry support</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <InspectFilters />
          {inspections.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No inspections yet</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>URL</TableHead>
                  <TableHead>Verdict</TableHead>
                  <TableHead>Coverage</TableHead>
                  <TableHead>Indexing State</TableHead>
                  <TableHead>Fetch</TableHead>
                  <TableHead>Robots</TableHead>
                  <TableHead>Google Canonical</TableHead>
                  <TableHead>User Canonical</TableHead>
                  <TableHead>Last Crawl</TableHead>
                  <TableHead>Checked</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inspections.map((item) => (
                  <TableRow key={item.id} className="hover:bg-muted/50">
                    <TableCell className="max-w-[260px] truncate" title={String(item._url || "") || undefined}>
                      {String(item._url || "-")}
                    </TableCell>
                    <TableCell className="font-medium">{item.verdict || "-"}</TableCell>
                    <TableCell>{item.coverageState || "-"}</TableCell>
                    <TableCell>{item.indexingState || "-"}</TableCell>
                    <TableCell>{item.pageFetchState || "-"}</TableCell>
                    <TableCell>{item.robotsState || "-"}</TableCell>
                    <TableCell className="max-w-[220px] truncate" title={String(item.googleCanonical || "") || undefined}>
                      {item.googleCanonical || "-"}
                    </TableCell>
                    <TableCell className="max-w-[220px] truncate" title={String(item.userCanonical || "") || undefined}>
                      {item.userCanonical || "-"}
                    </TableCell>
                    <TableCell className="text-sm">{formatDate(item.lastCrawlTime)}</TableCell>
                    <TableCell className="text-sm">{formatDate(item.checkedAt)}</TableCell>
                    <TableCell>
                      <RetryInspectionButton url={String(item._url || "")} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
