import { isDatabaseConfigured, DatabaseNotConfigured, DatabaseError, db } from "@/lib/db-safe";
import { schema } from "@repo/db";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { desc } from "drizzle-orm";

export const dynamic = 'force-dynamic';

function formatDate(value: Date | string | null) {
  if (!value) return "-";
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default async function SearchPage() {
  if (!isDatabaseConfigured()) {
    return <DatabaseNotConfigured title="Search Submissions" />;
  }

  let submissions: any[] = [];
  let inspections: any[] = [];
  
  try {
    submissions = await db()
      .select()
      .from(schema.searchSubmissions)
      .orderBy(desc(schema.searchSubmissions.submittedAt))
      .limit(20);

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
      <Card>
        <CardHeader>
          <CardTitle>Search Submissions</CardTitle>
          <CardDescription>IndexNow + sitemap submit history.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Provider</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.provider}</TableCell>
                  <TableCell>{item.submissionType}</TableCell>
                  <TableCell>
                    <Badge variant={item.status === "failed" ? "destructive" : "secondary"}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(item.submittedAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Index Inspections</CardTitle>
          <CardDescription>Latest Google URL inspection snapshots.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Verdict</TableHead>
                <TableHead>Coverage</TableHead>
                <TableHead>Last Crawl</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inspections.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.verdict || "-"}</TableCell>
                  <TableCell>{item.coverageState || "-"}</TableCell>
                  <TableCell>{formatDate(item.lastCrawlTime)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
