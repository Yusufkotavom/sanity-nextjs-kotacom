import { isDatabaseConfigured, db } from "@/lib/db-safe";
import { DatabaseNotConfigured, DatabaseError } from "@/components/database-error";
import { schema } from "@repo/db";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { desc, and, eq } from "drizzle-orm";
import { SearchFilters } from "@/components/search-filters";
import { ManualIndexForm } from "@/components/manual-index-form";
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

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ provider?: string; type?: string; status?: string }>;
}) {
  if (!isDatabaseConfigured()) {
    return <DatabaseNotConfigured title="Search Submissions" />;
  }

  const params = await searchParams;
  let submissions: any[] = [];
  let inspections: any[] = [];
  
  try {
    const conditions = [];
    
    if (params.provider && params.provider !== "all") {
      conditions.push(eq(schema.searchSubmissions.provider, params.provider));
    }
    
    if (params.type && params.type !== "all") {
      conditions.push(eq(schema.searchSubmissions.submissionType, params.type));
    }
    
    if (params.status && params.status !== "all") {
      conditions.push(eq(schema.searchSubmissions.status, params.status));
    }

    const query = db()
      .select()
      .from(schema.searchSubmissions)
      .orderBy(desc(schema.searchSubmissions.submittedAt))
      .limit(30);

    submissions = conditions.length > 0 
      ? await query.where(and(...conditions))
      : await query;

    inspections = await db()
      .select()
      .from(schema.indexStatusChecks)
      .orderBy(desc(schema.indexStatusChecks.checkedAt))
      .limit(10);
  } catch (error) {
    return <DatabaseError title="Search Submissions" error={error} />;
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Manual Index Form */}
      <ManualIndexForm />

      {/* Submissions History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Search Submissions</CardTitle>
              <CardDescription>IndexNow and sitemap submission history</CardDescription>
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
                  <TableHead>Provider</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>URL Count</TableHead>
                  <TableHead>Submitted</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((item) => (
                  <TableRow key={item.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{item.provider}</TableCell>
                    <TableCell>{item.submissionType}</TableCell>
                    <TableCell>
                      <Badge variant={item.status === "failed" ? "destructive" : "secondary"}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.urlCount || "-"}</TableCell>
                    <TableCell className="text-sm">{formatDate(item.submittedAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Index Inspections */}
      <Card>
        <CardHeader>
          <CardTitle>Index Inspections</CardTitle>
          <CardDescription>Google URL inspection results</CardDescription>
        </CardHeader>
        <CardContent>
          {inspections.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No inspections yet</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Verdict</TableHead>
                  <TableHead>Coverage</TableHead>
                  <TableHead>Last Crawl</TableHead>
                  <TableHead>Checked</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inspections.map((item) => (
                  <TableRow key={item.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{item.verdict || "-"}</TableCell>
                    <TableCell>{item.coverageState || "-"}</TableCell>
                    <TableCell className="text-sm">{formatDate(item.lastCrawlTime)}</TableCell>
                    <TableCell className="text-sm">{formatDate(item.checkedAt)}</TableCell>
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
