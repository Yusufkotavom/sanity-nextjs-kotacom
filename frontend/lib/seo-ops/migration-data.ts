import fs from "node:fs/promises";
import path from "node:path";

type PriorityRow = {
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  priorityScore: number;
  recommendedAction: string;
};

type Ga4Row = {
  page: string;
  sessions: number;
  conversions: number;
};

const GA4_ROWS: Ga4Row[] = [];

function parseCsv(text: string) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (!lines.length) return { headers: [], rows: [] as string[][] };

  const parseLine = (line: string) => {
    const fields: string[] = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i += 1) {
      const char = line[i];
      const next = line[i + 1];

      if (char === '"') {
        if (inQuotes && next === '"') {
          current += '"';
          i += 1;
        } else {
          inQuotes = !inQuotes;
        }
        continue;
      }

      if (char === "," && !inQuotes) {
        fields.push(current);
        current = "";
        continue;
      }

      current += char;
    }

    fields.push(current);
    return fields;
  };

  const headers = parseLine(lines[0]);
  const rows = lines.slice(1).map(parseLine);
  return { headers, rows };
}

function asNumber(value?: string) {
  const num = Number(value || 0);
  return Number.isFinite(num) ? num : 0;
}

export async function readPriorityRows() {
  const defaultPath = path.resolve(process.cwd(), "tmp/gsc/gsc-pages-priority.csv");
  const filePath = process.env.SEO_GSC_PRIORITY_CSV_PATH || defaultPath;

  try {
    const csv = await fs.readFile(filePath, "utf8");
    const { headers, rows } = parseCsv(csv);

    const index = {
      page: headers.indexOf("page"),
      clicks: headers.indexOf("clicks"),
      impressions: headers.indexOf("impressions"),
      ctr: headers.indexOf("ctr"),
      position: headers.indexOf("position"),
      priorityScore: headers.indexOf("priorityScore"),
      recommendedAction: headers.indexOf("recommendedAction"),
    };

    return rows
      .map((row) => ({
        page: row[index.page] || "",
        clicks: asNumber(row[index.clicks]),
        impressions: asNumber(row[index.impressions]),
        ctr: asNumber(row[index.ctr]),
        position: asNumber(row[index.position]),
        priorityScore: asNumber(row[index.priorityScore]),
        recommendedAction: row[index.recommendedAction] || "keep_archive_redirect",
      }))
      .filter((row) => Boolean(row.page));
  } catch {
    return [] as PriorityRow[];
  }
}

export function getGa4Rows() {
  return [...GA4_ROWS];
}

export function importGa4Rows(rows: Array<{ page?: string; sessions?: number; conversions?: number }>) {
  GA4_ROWS.splice(0, GA4_ROWS.length);
  for (const row of rows) {
    if (!row.page) continue;
    GA4_ROWS.push({
      page: row.page,
      sessions: Number(row.sessions || 0),
      conversions: Number(row.conversions || 0),
    });
  }

  return GA4_ROWS.length;
}

export async function getMergedPriorityRows() {
  const priorityRows = await readPriorityRows();
  const ga4 = getGa4Rows();
  const ga4Map = new Map(ga4.map((item) => [item.page, item]));

  return priorityRows
    .map((row) => {
      const ga4Row = ga4Map.get(row.page);
      const sessionBoost = ga4Row ? Math.log10(ga4Row.sessions + 1) * 2 : 0;
      const conversionBoost = ga4Row ? ga4Row.conversions * 1.5 : 0;
      const mergedScore = row.priorityScore + sessionBoost + conversionBoost;

      let finalAction = row.recommendedAction;
      if (mergedScore >= 18) finalAction = "migrate_now";
      else if (mergedScore >= 10) finalAction = "improve_then_migrate";

      return {
        ...row,
        ga4Sessions: ga4Row?.sessions || 0,
        ga4Conversions: ga4Row?.conversions || 0,
        mergedScore: Number(mergedScore.toFixed(2)),
        finalAction,
      };
    })
    .sort((a, b) => b.mergedScore - a.mergedScore);
}
