import { db } from "@/lib/db";
import { schema } from "@repo/db";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { desc, inArray } from "drizzle-orm";

export const dynamic = 'force-dynamic';

function formatDate(value: Date | string | null) {
  if (!value) return "-";
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default async function SeoPage() {
  const audits = await db()
    .select()
    .from(schema.seoAudits)
    .orderBy(desc(schema.seoAudits.checkedAt))
    .limit(25);

  const contentIds = audits
    .map((audit) => audit.contentItemId)
    .filter((id): id is string => Boolean(id));

  const contentItems = contentIds.length
    ? await db()
        .select({ id: schema.contentItems.id, url: schema.contentItems.url })
        .from(schema.contentItems)
        .where(inArray(schema.contentItems.id, contentIds))
    : [];

  const urlById = new Map(contentItems.map((item) => [item.id, item.url]));

  return (
    <Card>
      <CardHeader>
        <CardTitle>SEO Audits</CardTitle>
        <CardDescription>Latest checks for published content.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>URL</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Checked</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {audits.map((audit) => (
              <TableRow key={audit.id}>
                <TableCell className="max-w-[320px] truncate">
                  {urlById.get(audit.contentItemId || "") || "-"}
                </TableCell>
                <TableCell>
                  <Badge variant={audit.status === "fail" ? "destructive" : "secondary"}>
                    {audit.status}
                  </Badge>
                </TableCell>
                <TableCell>{audit.score}</TableCell>
                <TableCell>{formatDate(audit.checkedAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
