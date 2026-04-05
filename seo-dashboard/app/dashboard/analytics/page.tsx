import { db } from "@/lib/db";
import { schema } from "@repo/db";
import { desc, inArray } from "drizzle-orm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const dynamic = 'force-dynamic';

export default async function AnalyticsPage() {
  const rows = await db()
    .select()
    .from(schema.analyticsDaily)
    .orderBy(desc(schema.analyticsDaily.date))
    .limit(25);

  const contentIds = rows
    .map((row) => row.contentItemId)
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
        <CardTitle>Search Analytics</CardTitle>
        <CardDescription>Daily Search Console performance snapshots.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Clicks</TableHead>
              <TableHead>Impressions</TableHead>
              <TableHead>CTR</TableHead>
              <TableHead>Position</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.date}</TableCell>
                <TableCell className="max-w-[320px] truncate">
                  {urlById.get(row.contentItemId || "") || "-"}
                </TableCell>
                <TableCell>{row.clicks}</TableCell>
                <TableCell>{row.impressions}</TableCell>
                <TableCell>{row.ctr ?? "-"}</TableCell>
                <TableCell>{row.position ?? "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
