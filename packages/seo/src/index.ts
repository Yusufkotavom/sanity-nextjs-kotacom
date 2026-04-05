import * as cheerio from "cheerio";

export type SeoIssue = {
  code: string;
  message: string;
};

export type SeoAuditResult = {
  score: number;
  status: "pass" | "warning" | "fail";
  issues: SeoIssue[];
};

export function auditHtml(html: string): SeoAuditResult {
  const $ = cheerio.load(html);
  const issues: SeoIssue[] = [];

  const title = $("title").text().trim();
  if (!title) issues.push({ code: "title_missing", message: "Missing <title>" });

  const metaDescription = $("meta[name='description']").attr("content") || "";
  if (!metaDescription.trim()) {
    issues.push({ code: "meta_description_missing", message: "Missing meta description" });
  }

  const canonical = $("link[rel='canonical']").attr("href") || "";
  if (!canonical.trim()) {
    issues.push({ code: "canonical_missing", message: "Missing canonical link" });
  }

  const h1 = $("h1").first().text().trim();
  if (!h1) issues.push({ code: "h1_missing", message: "Missing H1" });

  const robots = $("meta[name='robots']").attr("content") || "";
  if (robots.toLowerCase().includes("noindex")) {
    issues.push({ code: "noindex", message: "Robots meta contains noindex" });
  }

  let score = 100 - issues.length * 12;
  if (score < 0) score = 0;
  const status = score >= 80 ? "pass" : score >= 60 ? "warning" : "fail";

  return { score, status, issues };
}
