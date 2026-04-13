import { NextRequest, NextResponse } from "next/server";
import { deleteTemplate, getTemplate, updateTemplate } from "@/lib/ai-writer/prompt-templates";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";
import { sanitizeText } from "@/lib/sanitize";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  try {
    const { id } = await params;
    const template = await getTemplate(id);

    if (!template) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: template });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch template" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  try {
    const { id } = await params;
    const body = await request.json();

    const template = await updateTemplate(id, {
      name: sanitizeText(body.name, 120) || undefined,
      systemPrompt: sanitizeText(body.systemPrompt, 5000) || undefined,
      userPromptTemplate: sanitizeText(body.userPromptTemplate, 10000) || undefined,
      variables: Array.isArray(body.variables)
        ? body.variables.map((variable: any) => ({
            name: sanitizeText(variable?.name, 80),
            description: sanitizeText(variable?.description, 240),
            required: Boolean(variable?.required),
            defaultValue: sanitizeText(variable?.defaultValue, 240),
          }))
        : undefined,
    });

    return NextResponse.json({ success: true, data: template });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update template" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  try {
    const { id } = await params;
    await deleteTemplate(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete template" },
      { status: 500 },
    );
  }
}
