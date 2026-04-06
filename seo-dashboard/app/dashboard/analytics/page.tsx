import { isDatabaseConfigured, db } from "@/lib/db-safe";
import { DatabaseNotConfigured, DatabaseError } from "@/components/database-error";
import { schema } from "@repo/db";
import { desc, inArray, sql, and, gte, lte } from "drizzle-orm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AnalyticsChart } from "@/components/analytics-chart";
import { ExportCsvButton } from "@/components/export-csv-button";
import { AnalyticsDateFilter } from "@/components/analytics-date-filter";
import { SortableHeader } from "@/components/sortable-header";
import { TrendingUp, MousePointer, Eye, Percent } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; to?: string; sort?: string; order?: string }>;
}) {
  const params = await searchParams;
  if (!isDatabaseConfigured()) {
    return <DatabaseNotConfigured title="Search Analytics" />;
  }

  let rows: any[] = [];
  let urlById = new Map<string, string>();
  let totalClicks = 0;
  let totalImpressions = 0;
  let avgCtr = 0;
  let avgPosition = 0;
  let chartData: Array<{ date: string; clicks: number; impressions: number }> = [];
  
  try {
    // Build date filter conditions
    const conditions = [];
    if (params.from) {
      conditions.push(gte(schema.analyticsDaily.date, params.from));
    }
    if (params.to) {
      conditions.push(lte(schema.analyticsDaily.date, params.to));
    }

    // Build order by clause
    let orderByClause;
    const sortColumn = params.sort || "date";
    const sortOrder = params.order || "desc";
    
    switch (sortColumn) {
      case "clicks":
        orderByClause = sortOrder === "asc" 
          ? schema.analyticsDaily.clicks 
          : desc(schema.analyticsDaily.clicks);
        break;
      case "impressions":
        orderByClause = sortOrder === "asc"
          ? schema.analyticsDaily.impressions
          : desc(schema.analyticsDaily.impressions);
        break;
      case "ctr":
        orderByClause = sortOrder === "asc"
          ? schema.analyticsDaily.ctr
          : desc(schema.analyticsDaily.ctr);
        break;
      case "position":
        orderByClause = sortOrder === "asc"
          ? schema.analyticsDaily.position
          : desc(schema.analyticsDaily.position);
        break;
      default:
        orderByClause = sortOrder === "asc"
          ? schema.analyticsDaily.date
          : desc(schema.analyticsDaily.date);
    }

    const query = db()
      .select()
      .from(schema.analyticsDaily)
      .orderBy(orderByClause)
      .limit(100);

    rows = conditions.length > 0
      ? await query.where(and(...conditions))
      : await query;

    const contentIds = rows
      .map((row) => row.contentItemId)
      .filter((id): id is string => Boolean(id));

    const contentItems = contentIds.length
      ? await db()
          .select({ id: schema.contentItems.id, url: schema.contentItems.url })
          .from(schema.contentItems)
          .where(inArray(schema.contentItems.id, contentIds))
      : [];

    urlById = new Map(contentItems.map((item) => [item.id, item.url]));

    // Calculate summary metrics
    totalClicks = rows.reduce((sum, row) => sum + (row.clicks || 0), 0);
    totalImpressions = rows.reduce((sum, row) => sum + (row.impressions || 0), 0);
    avgCtr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
    
    const positionRows = rows.filter(row => row.position !== null);
    avgPosition = positionRows.length > 0
      ? positionRows.reduce((sum, row) => sum + (row.position || 0), 0) / positionRows.length
      : 0;

    // Prepare chart data (aggregate by date)
    const dateMap = new Map<string, { clicks: number; impressions: number }>();
    rows.forEach(row => {
      const existing = dateMap.get(row.date) || { clicks: 0, impressions: 0 };
      dateMap.set(row.date, {
        clicks: existing.clicks + (row.clicks || 0),
        impressions: existing.impressions + (row.impressions || 0),
      });
    });

    chartData = Array.from(dateMap.entries())
      .map(([date, data]) => ({ date, ...data }))
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-14); // Last 14 days
  } catch (error) {
    return <DatabaseError title="Search Analytics" error={error} />;
  }

  // Prepare export data
  const exportData = rows.map(row => ({
    date: row.date,
    url: urlById.get(row.contentItemId || "") || "-",
    clicks: row.clicks,
    impressions: row.impressions,
    ctr: row.ctr ? (row.ctr * 100).toFixed(2) : "-",
    position: row.position ? row.position.toFixed(1) : "-",
  }));

  const exportColumns = [
    { key: "date", label: "Date" },
    { key: "url", label: "URL" },
    { key: "clicks", label: "Clicks" },
    { key: "impressions", label: "Impressions" },
    { key: "ctr", label: "CTR (%)" },
    { key: "position", label: "Position" },
  ];

  const dateRangeText = params.from && params.to
    ? `${params.from} to ${params.to}`
    : "Last 30 days";

  return (
    <div className="flex flex-col gap-6">
      {/* Date Range Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Date Range</CardTitle>
          <CardDescription>Filter analytics by date range</CardDescription>
        </CardHeader>
        <CardContent>
          <AnalyticsDateFilter />
        </CardContent>
      </Card>

      {/* Summary Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <MousePointer className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClicks.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">{dateRangeText}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impressions</CardTitle>
            <Eye className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalImpressions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">{dateRangeText}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg CTR</CardTitle>
            <Percent className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgCtr.toFixed(2)}%</div>
            <p className="text-xs text-muted-foreground mt-1">Click-through rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Position</CardTitle>
            <TrendingUp className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgPosition.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground mt-1">Search ranking</p>
          </CardContent>
        </Card>
      </div>

      {/* Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Trend</CardTitle>
          <CardDescription>Clicks and impressions over the last 14 days</CardDescription>
        </CardHeader>
        <CardContent>
          {chartData.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No data available for chart</p>
            </div>
          ) : (
            <AnalyticsChart data={chartData} />
          )}
        </CardContent>
      </Card>

      {/* Detailed Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>URL Performance</CardTitle>
              <CardDescription>Daily Search Console performance by URL</CardDescription>
            </div>
            <ExportCsvButton 
              data={exportData} 
              filename="analytics" 
              columns={exportColumns}
            />
          </div>
        </CardHeader>
        <CardContent>
          {rows.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg font-medium">No analytics data</p>
              <p className="text-sm mt-1">Data will appear once Search Console sync is configured</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <SortableHeader column="date" label="Date" />
                  </TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead className="text-right">
                    <SortableHeader column="clicks" label="Clicks" align="right" />
                  </TableHead>
                  <TableHead className="text-right">
                    <SortableHeader column="impressions" label="Impressions" align="right" />
                  </TableHead>
                  <TableHead className="text-right">
                    <SortableHeader column="ctr" label="CTR" align="right" />
                  </TableHead>
                  <TableHead className="text-right">
                    <SortableHeader column="position" label="Position" align="right" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id} className="hover:bg-muted/50">
                    <TableCell className="text-sm">{row.date}</TableCell>
                    <TableCell className="max-w-[320px] truncate text-sm">
                      {urlById.get(row.contentItemId || "") || "-"}
                    </TableCell>
                    <TableCell className="text-right font-medium">{row.clicks}</TableCell>
                    <TableCell className="text-right">{row.impressions}</TableCell>
                    <TableCell className="text-right">
                      {row.ctr ? `${(row.ctr * 100).toFixed(2)}%` : "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      {row.position ? row.position.toFixed(1) : "-"}
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
