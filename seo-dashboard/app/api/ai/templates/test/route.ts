import { NextRequest, NextResponse } from "next/server";
import {
  createTemplate,
  listTemplates,
  getTemplate,
  renderTemplate,
  deleteTemplate,
} from "@/lib/ai-writer/prompt-templates";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";

/**
 * Test endpoint for prompt template operations
 * 
 * GET /api/ai/templates/test?action=list&contentType=post
 * GET /api/ai/templates/test?action=get&id=<uuid>
 * POST /api/ai/templates/test with action=create
 * POST /api/ai/templates/test with action=render
 * DELETE /api/ai/templates/test?id=<uuid>
 */
export async function GET(request: NextRequest) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  try {
    const searchParams = request.nextUrl.searchParams;
    const action = searchParams.get("action");
    const id = searchParams.get("id");
    const contentType = searchParams.get("contentType");

    if (action === "list") {
      const templates = await listTemplates(contentType || undefined);
      return NextResponse.json({
        success: true,
        data: templates,
      });
    }

    if (action === "get") {
      if (!id) {
        return NextResponse.json(
          { error: "Template ID is required" },
          { status: 400 }
        );
      }

      const template = await getTemplate(id);
      
      if (!template) {
        return NextResponse.json(
          { error: "Template not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: template,
      });
    }

    return NextResponse.json(
      { error: "Invalid action. Use 'list' or 'get'" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Template operation error:", error);
    
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Operation failed",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  try {
    const body = await request.json();
    const { action } = body;

    if (action === "create") {
      const { name, contentType, systemPrompt, userPromptTemplate, variables } = body;

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
        variables: variables || [],
      });

      return NextResponse.json({
        success: true,
        data: template,
      });
    }

    if (action === "render") {
      const { templateId, variables } = body;

      if (!templateId) {
        return NextResponse.json(
          { error: "Template ID is required" },
          { status: 400 }
        );
      }

      const rendered = await renderTemplate(templateId, variables || {});

      return NextResponse.json({
        success: true,
        data: { rendered },
      });
    }

    return NextResponse.json(
      { error: "Invalid action. Use 'create' or 'render'" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Template operation error:", error);
    
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Operation failed",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Template ID is required" },
        { status: 400 }
      );
    }

    await deleteTemplate(id);

    return NextResponse.json({
      success: true,
      message: "Template deleted successfully",
    });
  } catch (error) {
    console.error("Template deletion error:", error);
    
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Deletion failed",
      },
      { status: 500 }
    );
  }
}
