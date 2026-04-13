import { NextRequest, NextResponse } from "next/server";
import { createTemplate } from "@/lib/ai-writer/prompt-templates";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";
import { sanitizeText } from "@/lib/sanitize";
import { assertSupportedContentType } from "@/lib/ai-writer/content-type";

export async function POST(request: NextRequest) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  try {
    const body = await request.json();
    const name = sanitizeText(body.name, 120);
    const contentType = body.contentType === "all" ? "all" : assertSupportedContentType(body.contentType);
    const systemPrompt = sanitizeText(body.systemPrompt, 5000);
    const userPromptTemplate = sanitizeText(body.userPromptTemplate, 10000);
    const variables = Array.isArray(body.variables) ? body.variables : [];

    if (!name || !contentType || !systemPrompt || !userPromptTemplate) {
      return NextResponse.json(
        { error: "Missing required fields: name, contentType, systemPrompt, userPromptTemplate" },
        { status: 400 }
      );
    }

    const template = await createTemplate({
      name,
      contentType,
      systemPrompt,
      userPromptTemplate,
      variables: variables.map((variable: any) => ({
        name: sanitizeText(variable?.name, 80),
        description: sanitizeText(variable?.description, 240),
        required: Boolean(variable?.required),
        defaultValue: sanitizeText(variable?.defaultValue, 240),
      })),
    });

    return NextResponse.json({ success: true, data: template });
  } catch (error) {
    console.error("Template creation error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create template" },
      { status: 500 }
    );
  }
}
