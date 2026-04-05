import { google } from "googleapis";

export type IndexNowPayload = {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
};

export async function submitIndexNow(endpoint: string, payload: IndexNowPayload) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const text = await response.text();
  return {
    ok: response.ok,
    status: response.status,
    body: text,
  };
}

export function createGscAuth(clientEmail: string, privateKey: string) {
  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/webmasters"],
  });
}

export async function submitSitemap({
  clientEmail,
  privateKey,
  siteUrl,
  sitemapUrl,
}: {
  clientEmail: string;
  privateKey: string;
  siteUrl: string;
  sitemapUrl: string;
}) {
  const auth = createGscAuth(clientEmail, privateKey);
  const webmasters = google.webmasters({ version: "v3", auth });
  const result = await webmasters.sitemaps.submit({
    siteUrl,
    feedpath: sitemapUrl,
  });
  return result.data;
}

export async function fetchSearchAnalytics({
  clientEmail,
  privateKey,
  siteUrl,
  startDate,
  endDate,
}: {
  clientEmail: string;
  privateKey: string;
  siteUrl: string;
  startDate: string;
  endDate: string;
}) {
  const auth = createGscAuth(clientEmail, privateKey);
  const webmasters = google.webmasters({ version: "v3", auth });
  const result = await webmasters.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate,
      endDate,
      dimensions: ["page"],
    },
  });

  return result.data;
}

export async function inspectUrl({
  clientEmail,
  privateKey,
  siteUrl,
  url,
  languageCode = "id-ID",
}: {
  clientEmail: string;
  privateKey: string;
  siteUrl: string;
  url: string;
  languageCode?: string;
}) {
  const auth = createGscAuth(clientEmail, privateKey);
  const searchconsole = google.searchconsole({ version: "v1", auth });
  const result = await searchconsole.urlInspection.index.inspect({
    requestBody: {
      inspectionUrl: url,
      siteUrl,
      languageCode,
    },
  });

  return result.data;
}
