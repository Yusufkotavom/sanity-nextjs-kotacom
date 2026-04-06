import { isDatabaseConfigured, db } from "@/lib/db-safe";
import { DatabaseNotConfigured, DatabaseError } from "@/components/database-error";
import { schema } from "@repo/db";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { desc, inArray, and, eq, gte, lte, between } from "drizzle-orm";
import { SeoFilters } from "@/components/seo-filters";
import { ExportCsvButton } from "@/components/export-csv-button";
import { RefreshCw, Play } from "lucide-react";
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

function getScoreBadgeVariant(score: number | null) {
  if (!score) return "secondary";
  if (score >= 90) return "default";
  if (score >= 70) return "secondary";
  if (score >= 50) return "outline";
  return "destructive";
}

export default async function SeoPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; score?: string }>;
}) {
  if (!isDatabaseConfigured()) {
    return <DatabaseNotConfigured title="SEO Audits" />;
  }

  const params = await searchParams;
  let audits: any[] = [];
  let urlById = new Map<string, string>();

  try {
    const conditions = [];
    
    if (params.status && params.status !== "all") {
      conditions.push(eq(schema.seoAudits.status, params.status));
    }
    
    if (params.score && params.score !== "all") {
      const [min, max] = params.score.split("-").map(Number);
      conditions.push(between(schema.seoAudits.score, min, max));
    }

    const query = db()
      .select()
      .from(schema.seoAudits)
      .orderBy(desc(schema.seoAudits.checkedAt))
      .limit(50);

    audits = conditions.length > 0 
      ? await query.where(and(...conditions))
      : await query;

    const contentIds = audits
      .map((audit) => audit.contentItemId)
      .filter((id): id is string => Boolean(id));

    const contentItems = contentIds.length
      ? await db()
          .select({ id: schema.contentItems.id, url: schema.contentItems.url })
          .from(schema.contentItems)
          .where(inArray(schema.contentItems.id, contentIds))
      : [];

    urlById = new Map(contentItems.map((item) => [item.id, item.url]));
  } catch (error) {
    return <DatabaseError title="SEO Audits" error={error} />;
  }

  // Prepare export data
  const exportData = audits.map(audit => ({
    url: urlById.get(audit.contentItemId || "") || "-",
    status: audit.status,
    score: audit.score || "-",
    checkedAt: formatDate(audit.checkedAt),
    issues: audit.issues ? JSON.stringify(audit.issues) : "-",
  }));

  const exportColumns = [
    { key: "url", label: "URL" },
    { key: "status", label: "Status" },
    { key: "score", label: "Score" },
    { key: "checkedAt", label: "Checked At" },
    { key: "issues", label: "Issues" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>SEO Audits</CardTitle>
              <CardDescription>Monitor SEO health and compliance</CardDescription>
            </div>
            <div className="flex gap-2">
              <ExportCsvButton 
                data={exportData} 
                filename="seo-audits" 
                columns={exportColumns}
              />
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/seo">
                  <RefreshCw className="size-4 mr-2" />
                  Refresh
                </Link>
              </Button>
              <Button size="sm">
                <Play className="size-4 mr-2" />
                Run Audit
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <SeoFilters />
          
          {audits.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg font-medium">No audits found</p>
              <p className="text-sm mt-1">Try adjusting your filters or run a new audit</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>URL</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                  <TableHead>Checked</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {audits.map((audit) => (
                  <TableRow key={audit.id} className="hover:bg-muted/50">
                    <TableCell className="max-w-[400px] truncate text-sm">
                      {urlById.get(audit.contentItemId || "") || "-"}
                    </TableCell>
                    <TableCell>
                      <Badge variant={audit.status === "fail" ? "destructive" : "secondary"}>
                        {audit.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant={getScoreBadgeVariant(audit.score)}>
                        {audit.score || "-"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{formatDate(audit.checkedAt)}</TableCell>
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
