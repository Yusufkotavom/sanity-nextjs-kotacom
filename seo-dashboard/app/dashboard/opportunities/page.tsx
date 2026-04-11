import { isDatabaseConfigured, db } from "@/lib/db-safe";
import { DatabaseError, DatabaseNotConfigured } from "@/components/database-error";
import { schema } from "@repo/db";
import { desc, gte } from "drizzle-orm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

type AggregateRow = {
  contentItemId: string;
  url: string;
  impressions: number;
  clicks: number;
  ctr: number;
  avgPosition: number;
  recent7Clicks: number;
  prev7Clicks: number;
};

function fmtPct(value: number) {
  return `${(value * 100).toFixed(2)}%`;
}

function fmtNum(value: number) {
  return value.toLocaleString();
}

function toDateOnly(dateLike: string | Date) {
  const date = typeof dateLike === "string" ? new Date(dateLike) : dateLike;
  return date.toISOString().slice(0, 10);
}

export default async function OpportunitiesPage() {
  if (!isDatabaseConfigured()) {
    return <DatabaseNotConfigured title="SEO Opportunities" />;
  }

  let quickWins: AggregateRow[] = [];
  let decayPages: AggregateRow[] = [];
  let blockers: Array<{
    url: string;
    verdict: string | null;
    coverageState: string | null;
    indexingState: string | null;
    checkedAt: Date | string | null;
  }> = [];

  try {
    const today = new Date();
    const from = new Date(today);
    from.setUTCDate(from.getUTCDate() - 30);

    const analyticsRows = await db()
      .select()
      .from(schema.analyticsDaily)
      .where(gte(schema.analyticsDaily.date, from.toISOString().slice(0, 10)))
      .orderBy(desc(schema.analyticsDaily.date))
      .limit(5000);

    const contentRows = await db()
      .select({ id: schema.contentItems.id, url: schema.contentItems.url })
      .from(schema.contentItems);
    const urlById = new Map(contentRows.map((row) => [row.id, row.url]));

    const recentCutoff = new Date(today);
    recentCutoff.setUTCDate(recentCutoff.getUTCDate() - 7);
    const prevCutoff = new Date(today);
    prevCutoff.setUTCDate(prevCutoff.getUTCDate() - 14);

    const aggregate = new Map<string, AggregateRow>();
    for (const row of analyticsRows) {
      if (!row.contentItemId) continue;
      const url = urlById.get(row.contentItemId) || "-";
      const dateOnly = toDateOnly(row.date);

      const current =
        aggregate.get(row.contentItemId) || {
          contentItemId: row.contentItemId,
          url,
          impressions: 0,
          clicks: 0,
          ctr: 0,
          avgPosition: 0,
          recent7Clicks: 0,
          prev7Clicks: 0,
        };

      const clicks = Number(row.clicks || 0);
      const impressions = Number(row.impressions || 0);
      current.clicks += clicks;
      current.impressions += impressions;
      current.avgPosition += Number(row.position || 0) * impressions;

      if (dateOnly >= recentCutoff.toISOString().slice(0, 10)) {
        current.recent7Clicks += clicks;
      } else if (dateOnly >= prevCutoff.toISOString().slice(0, 10)) {
        current.prev7Clicks += clicks;
      }

      aggregate.set(row.contentItemId, current);
    }

    const normalized = Array.from(aggregate.values()).map((row) => ({
      ...row,
      ctr: row.impressions > 0 ? row.clicks / row.impressions : 0,
      avgPosition: row.impressions > 0 ? row.avgPosition / row.impressions : 0,
    }));

    quickWins = normalized
      .filter(
        (row) =>
          row.impressions >= 1000 &&
          row.ctr < 0.015 &&
          row.avgPosition >= 4 &&
          row.avgPosition <= 20,
      )
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 25);

    decayPages = normalized
      .filter((row) => row.prev7Clicks >= 50 && row.recent7Clicks < row.prev7Clicks * 0.7)
      .sort((a, b) => b.prev7Clicks - a.prev7Clicks)
      .slice(0, 25);

    const inspections = await db()
      .select()
      .from(schema.indexStatusChecks)
      .orderBy(desc(schema.indexStatusChecks.checkedAt))
      .limit(1000);

    const latestByContent = new Map<string, (typeof inspections)[number]>();
    for (const item of inspections) {
      if (!item.contentItemId || latestByContent.has(item.contentItemId)) continue;
      latestByContent.set(item.contentItemId, item);
    }

    blockers = Array.from(latestByContent.values())
      .filter((item) => {
        const verdict = (item.verdict || "").toLowerCase();
        const coverage = (item.coverageState || "").toLowerCase();
        const indexing = (item.indexingState || "").toLowerCase();
        if (verdict && !verdict.includes("pass")) return true;
        if (coverage.includes("blocked") || coverage.includes("error")) return true;
        if (indexing.includes("blocked") || indexing.includes("not")) return true;
        return false;
      })
      .map((item) => ({
        url: urlById.get(item.contentItemId || "") || "-",
        verdict: item.verdict,
        coverageState: item.coverageState,
        indexingState: item.indexingState,
        checkedAt: item.checkedAt,
      }))
      .slice(0, 25);
  } catch (error) {
    return <DatabaseError title="SEO Opportunities" error={error} />;
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Quick Wins</CardTitle>
          <CardDescription>
            High impressions + low CTR + rank 4-20. Optimize title/meta/snippet first.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {quickWins.length === 0 ? (
            <p className="text-sm text-muted-foreground">No quick wins found for current window.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>URL</TableHead>
                  <TableHead className="text-right">Impressions</TableHead>
                  <TableHead className="text-right">CTR</TableHead>
                  <TableHead className="text-right">Avg Position</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quickWins.map((row) => (
                  <TableRow key={row.contentItemId}>
                    <TableCell className="max-w-[460px] truncate">{row.url}</TableCell>
                    <TableCell className="text-right">{fmtNum(row.impressions)}</TableCell>
                    <TableCell className="text-right">{fmtPct(row.ctr)}</TableCell>
                    <TableCell className="text-right">{row.avgPosition.toFixed(1)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Decay Pages</CardTitle>
          <CardDescription>
            Click drop &gt; 30% comparing last 7 days vs previous 7 days.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {decayPages.length === 0 ? (
            <p className="text-sm text-muted-foreground">No decay pages detected.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>URL</TableHead>
                  <TableHead className="text-right">Prev 7d Clicks</TableHead>
                  <TableHead className="text-right">Last 7d Clicks</TableHead>
                  <TableHead className="text-right">Drop</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {decayPages.map((row) => {
                  const drop = row.prev7Clicks > 0 ? 1 - row.recent7Clicks / row.prev7Clicks : 0;
                  return (
                    <TableRow key={row.contentItemId}>
                      <TableCell className="max-w-[460px] truncate">{row.url}</TableCell>
                      <TableCell className="text-right">{fmtNum(row.prev7Clicks)}</TableCell>
                      <TableCell className="text-right">{fmtNum(row.recent7Clicks)}</TableCell>
                      <TableCell className="text-right">{fmtPct(drop)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Indexing Blockers</CardTitle>
          <CardDescription>Latest URLs with non-pass indexing verdict or blocked coverage.</CardDescription>
        </CardHeader>
        <CardContent>
          {blockers.length === 0 ? (
            <p className="text-sm text-muted-foreground">No indexing blockers detected.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>URL</TableHead>
                  <TableHead>Verdict</TableHead>
                  <TableHead>Coverage</TableHead>
                  <TableHead>Indexing State</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blockers.map((item) => (
                  <TableRow key={`${item.url}-${item.checkedAt || ""}`}>
                    <TableCell className="max-w-[360px] truncate">{item.url}</TableCell>
                    <TableCell>
                      <Badge variant="destructive">{item.verdict || "unknown"}</Badge>
                    </TableCell>
                    <TableCell className="max-w-[260px] truncate">{item.coverageState || "-"}</TableCell>
                    <TableCell className="max-w-[260px] truncate">{item.indexingState || "-"}</TableCell>
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
