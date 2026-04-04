import { NextRequest, NextResponse } from "next/server";
import { generateAiText } from "@/lib/ai-writer/generate";

type DocType = "post" | "service" | "project";

type Payload = {
  id?: string;
  type?: DocType;
  instruction?: string;
  document?: Record<string, unknown>;
  mode?: "rewrite" | "extend";
};

function getSanityWriteConfig() {
  return {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "",
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-03-23",
    token: process.env.SANITY_AUTH_TOKEN || "",
  };
}

function getAllowedStudioOrigins() {
  const envOrigin = (process.env.NEXT_PUBLIC_STUDIO_URL || "").replace(/\/+$/, "");
  const origins = ["https://studio.kotacom.id", "http://localhost:3333"];
  if (envOrigin && !origins.includes(envOrigin)) {
    origins.push(envOrigin);
  }
  return origins;
}

/** Returns true for Vercel preview deployments of the Studio project */
function isVercelStudioPreview(origin: string) {
  return /^https:\/\/sanity-nextjs-kotacom-studio[^.]*\.vercel\.app$/.test(origin);
}

function withCorsHeaders(origin?: string | null) {
  const allowedOrigins = getAllowedStudioOrigins();

  // Allow exact-match origins OR Vercel preview URLs for the studio project
  const isAllowed =
    origin && (allowedOrigins.includes(origin) || isVercelStudioPreview(origin));

  const matchedOrigin = isAllowed ? origin! : allowedOrigins[0];

  return {
    "Access-Control-Allow-Origin": matchedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type, x-ai-writer-action-secret, Authorization",
    Vary: "Origin",
  };
}

function hasActionSecretAccess(request: NextRequest) {
  const expected = process.env.AI_WRITER_ACTION_SECRET || "";
  if (!expected) return false;
  const received = request.headers.get("x-ai-writer-action-secret") || "";
  return Boolean(received && received === expected);
}

function stripSystemFields(input: Record<string, unknown>) {
  const entries = Object.entries(input).filter(([key]) => !key.startsWith("_"));
  return Object.fromEntries(entries);
}

function toDraftId(id: string) {
  return id.startsWith("drafts.") ? id : `drafts.${id}`;
}

function textToPortableText(text: string) {
  const paragraphs = text
    .split(/\n{2,}/g)
    .map((item) => item.trim())
    .filter(Boolean);

  return paragraphs.map((paragraph, idx) => ({
    _key: `ai-${idx}-${Date.now().toString(36)}`,
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [
      {
        _key: `ai-ch-${idx}`,
        _type: "span",
        marks: [],
        text: paragraph,
      },
    ],
  }));
}

function extractTextBody(document: Record<string, unknown>) {
  const body = document.body;
  if (!Array.isArray(body)) return "";

  const lines: string[] = [];
  for (const block of body) {
    if (!block || typeof block !== "object") continue;
    const entry = block as Record<string, unknown>;
    if (entry._type !== "block") continue;
    const children = Array.isArray(entry.children) ? entry.children : [];
    const text = children
      .map((child) => {
        if (!child || typeof child !== "object") return "";
        const childEntry = child as Record<string, unknown>;
        return typeof childEntry.text === "string" ? childEntry.text : "";
      })
      .join("")
      .trim();
    if (text) lines.push(text);
  }

  return lines.join("\n\n");
}

/**
 * Attempt to repair a truncated JSON string where the "body" field got cut off.
 * Strategy: close the open string → close the object.
 */
function repairTruncatedJson(raw: string): string {
  let inString = false;
  let escaped = false;

  for (let i = 0; i < raw.length; i++) {
    const c = raw[i];
    if (escaped) { escaped = false; continue; }
    if (c === "\\" && inString) { escaped = true; continue; }
    if (c === '"') inString = !inString;
  }

  // If we ended inside a string value, close it and the object.
  // Trim trailing partial word (cut at last whitespace) for cleaner text.
  if (inString) {
    const trimmed = raw.replace(/\s\S*$/, ""); // drop last incomplete word
    return trimmed + '"}';
  }

  // Already outside a string but object not closed
  if (!raw.trimEnd().endsWith("}")) return raw.trimEnd() + "}";

  return raw;
}

/**
 * Regex-based fallback: pull title / excerpt / body directly from the raw text
 * without relying on JSON.parse at all.
 */
function extractFieldsFallback(raw: string): { title: string; excerpt: string; body: string } {
  const get = (key: string) => {
    const m = raw.match(new RegExp(`"${key}"\\s*:\\s*"((?:[^"\\\\]|\\\\[\\s\\S])*)`));
    if (!m) return "";
    // Unescape basic JSON escapes
    return m[1].replace(/\\n/g, "\n").replace(/\\t/g, "\t").replace(/\\"/g, '"').replace(/\\\\/g, "\\").trim();
  };
  return { title: get("title"), excerpt: get("excerpt"), body: get("body") };
}

function parseRewriteResponse(raw: string) {
  const cleaned = raw
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  let parsed: { title?: string; excerpt?: string; body?: string } = {};

  // 1st attempt: standard JSON.parse
  try {
    parsed = JSON.parse(cleaned) as typeof parsed;
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);

    // 2nd attempt: repair truncated JSON
    if (msg.toLowerCase().includes("unterminated") || msg.toLowerCase().includes("unexpected end")) {
      try {
        parsed = JSON.parse(repairTruncatedJson(cleaned)) as typeof parsed;
      } catch {
        // 3rd attempt: regex extraction
        parsed = extractFieldsFallback(cleaned);
      }
    } else {
      // 3rd attempt: regex extraction for other parse errors
      parsed = extractFieldsFallback(cleaned);
    }
  }

  const title = (parsed.title || "").trim();
  const excerpt = (parsed.excerpt || "").trim();
  const body = (parsed.body || "").trim();

  if (!title || !body) {
    throw new Error("AI output must include non-empty title and body.");
  }

  return { title, excerpt, body };
}

function buildPrompt({
  type,
  title,
  excerpt,
  body,
  instruction,
}: {
  type: DocType;
  title: string;
  excerpt: string;
  body: string;
  instruction: string;
}) {
  return `
Rewrite this ${type} content in Indonesian.

Requirements:
- Keep same intent and topic.
- Improve clarity and SEO quality.
- Do not output markdown fences.
- Return JSON only with keys: "title", "excerpt", "body".
- "body" must be plain text paragraphs separated by blank lines.
- Keep title <= 70 chars and excerpt <= 180 chars when possible.

User instruction:
${instruction || "(none)"}

Current title:
${title}

Current excerpt:
${excerpt}

Current body:
${body}
`.trim();
}

function buildExtendPrompt({
  type,
  title,
  excerpt,
  body,
  instruction,
}: {
  type: DocType;
  title: string;
  excerpt: string;
  body: string;
  instruction: string;
}) {
  return `
Perbaiki dan perluas isi konten berikut. Jaga agar TIDAK mengubah judul (title) dan ringkasan (excerpt).

Requirements:
- JANGAN mengubah title dan excerpt sama sekali.
- Perbaiki dan perluas body saja.
- Do not output markdown fences.
- Return JSON only with keys: "body" (only body, no title/excerpt).
- "body" must be plain text paragraphs separated by blank lines.
- Pertahankan gaya penulisan yang konsisten.

Instruksi khusus:
${instruction || "(none)"}

Judul (JANGAN UBAH):
${title}

Ringkasan (JANGAN UBAH):
${excerpt}

Body saat ini:
${body}
`.trim();
}

async function patchDraftDocument({
  id,
  type,
  original,
  rewritten,
}: {
  id: string;
  type: DocType;
  original: Record<string, unknown>;
  rewritten: { title: string; excerpt: string; body: string };
}) {
  const cfg = getSanityWriteConfig();
  if (!cfg.projectId || !cfg.dataset || !cfg.token) {
    throw new Error("Missing Sanity write config for AI rewrite apply.");
  }

  const draftId = toDraftId(id);
  const baseDoc = {
    _id: draftId,
    _type: type,
    ...stripSystemFields(original),
  };

  const url = `https://${cfg.projectId}.api.sanity.io/v${cfg.apiVersion}/data/mutate/${cfg.dataset}`;
  const body = {
    mutations: [
      {
        createOrReplace: baseDoc,
      },
      {
        patch: {
          id: draftId,
          set: {
            title: rewritten.title,
            excerpt: rewritten.excerpt,
            body: textToPortableText(rewritten.body),
          },
        },
      },
    ],
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cfg.token}`,
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!response.ok) {
    const json = (await response.json().catch(() => ({}))) as {
      error?: { description?: string };
    };
    throw new Error(json?.error?.description || `Sanity mutation failed (${response.status})`);
  }
}

async function patchExtendDocument({
  id,
  type,
  original,
  newBody,
}: {
  id: string;
  type: DocType;
  original: Record<string, unknown>;
  newBody: string;
}) {
  const cfg = getSanityWriteConfig();
  if (!cfg.projectId || !cfg.dataset || !cfg.token) {
    throw new Error("Missing Sanity write config for AI rewrite apply.");
  }

  const draftId = toDraftId(id);

  const url = `https://${cfg.projectId}.api.sanity.io/v${cfg.apiVersion}/data/mutate/${cfg.dataset}`;
  const body = {
    mutations: [
      {
        patch: {
          id: draftId,
          set: {
            body: textToPortableText(newBody),
          },
        },
      },
    ],
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cfg.token}`,
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!response.ok) {
    const json = (await response.json().catch(() => ({}))) as {
      error?: { description?: string };
    };
    throw new Error(json?.error?.description || `Sanity mutation failed (${response.status})`);
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: withCorsHeaders(request.headers.get("origin")),
  });
}

export async function POST(request: NextRequest) {
  const corsHeaders = withCorsHeaders(request.headers.get("origin"));

  if (!hasActionSecretAccess(request)) {
    return NextResponse.json(
      { ok: false, message: "Unauthorized action access." },
      { status: 401, headers: corsHeaders },
    );
  }

  const payload = (await request.json().catch(() => ({}))) as Payload;
  const id = (payload.id || "").trim();
  const type = payload.type;
  const instruction = (payload.instruction || "").trim();
  const mode = payload.mode || "rewrite";
  const document = payload.document || {};

  if (!id || !type || !["post", "service", "project"].includes(type)) {
    return NextResponse.json(
      { ok: false, message: "Invalid payload. id and supported type are required." },
      { status: 400, headers: corsHeaders },
    );
  }

  const title = String(document.title || "");
  const excerpt = String(document.excerpt || "");
  const body = extractTextBody(document);
  if (!title && !body) {
    return NextResponse.json(
      { ok: false, message: "Document title/body is empty." },
      { status: 400, headers: corsHeaders },
    );
  }

  try {
    if (mode === "extend") {
      const extendedBody = await generateAiText({
        prompt: buildExtendPrompt({ type, title, excerpt, body, instruction }),
        model: undefined,
        userId: "studio-action",
        tags: [`docType:${type}`, "mode:extend", "route:ai-rewrite-apply"],
        minOutputTokens: 4000,
      });

      const parsed = JSON.parse(
        extendedBody.text
          .replace(/^```json\s*/i, "")
          .replace(/^```\s*/i, "")
          .replace(/\s*```$/i, "")
          .trim(),
      );
      const newBody = (parsed.body || "").trim();
      if (!newBody) {
        throw new Error("AI extend output missing body.");
      }

      await patchExtendDocument({
        id,
        type,
        original: document,
        newBody,
      });

      return NextResponse.json(
        {
          ok: true,
          message: "AI extend applied to draft (body only).",
          providerMode: extendedBody.providerMode,
          model: extendedBody.model,
        },
        { headers: corsHeaders },
      );
    }

    const ai = await generateAiText({
      prompt: buildPrompt({ type, title, excerpt, body, instruction }),
      model: undefined,
      userId: "studio-action",
      tags: [`docType:${type}`, "route:ai-rewrite-apply"],
      minOutputTokens: 2000,
    });

    const rewritten = parseRewriteResponse(ai.text);
    await patchDraftDocument({
      id,
      type,
      original: document,
      rewritten,
    });

    return NextResponse.json(
      {
        ok: true,
        message: "AI rewrite applied to draft.",
        providerMode: ai.providerMode,
        model: ai.model,
      },
      { headers: corsHeaders },
    );
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Rewrite apply failed",
      },
      { status: 500, headers: corsHeaders },
    );
  }
}
