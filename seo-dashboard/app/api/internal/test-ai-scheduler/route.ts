import { NextRequest, NextResponse } from "next/server";
import { generateContent, resolvePrompt } from "@/lib/ai-writer/content-generator";
import {
  createTemplate,
  listTemplates,
  getTemplate,
  renderTemplate,
  deleteTemplate,
} from "@/lib/ai-writer/prompt-templates";

/**
 * Internal test endpoint for AI Content Scheduler (no auth required)
 * 
 * POST /api/internal/test-ai-scheduler
 * 
 * Body:
 * {
 *   "action": "test-all" | "test-templates" | "test-generation"
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action = "test-all", template } = body;

    const results: any = {
      success: true,
      tests: [],
    };

    // Test: Create template from seed script
    if (action === "create-template" && template) {
      try {
        const created = await createTemplate(template);
        return NextResponse.json({
          success: true,
          data: created,
        });
      } catch (error) {
        return NextResponse.json({
          success: false,
          error: error instanceof Error ? error.message : "Failed to create template",
        }, { status: 500 });
      }
    }

    // Test 1: Prompt Templates
    if (action === "test-all" || action === "test-templates") {
      try {
        // Create template
        const template = await createTemplate({
          name: `Test Template ${Date.now()}`,
          contentType: "post",
          systemPrompt: "You are an expert blog writer.",
          userPromptTemplate: "Write a blog post about {{topic}} for {{audience}}.",
          variables: [
            { name: "topic", description: "The blog topic", required: true },
            { name: "audience", description: "Target audience", required: true },
          ],
        });

        results.tests.push({
          name: "Create Template",
          status: "passed",
          data: { templateId: template.id },
        });

        // List templates
        const templates = await listTemplates("post");
        results.tests.push({
          name: "List Templates",
          status: "passed",
          data: { count: templates.length },
        });

        // Get template
        const retrieved = await getTemplate(template.id);
        results.tests.push({
          name: "Get Template",
          status: retrieved ? "passed" : "failed",
          data: { found: Boolean(retrieved) },
        });

        // Render template
        const rendered = await renderTemplate(template.id, {
          topic: "AI and Machine Learning",
          audience: "developers",
        });
        results.tests.push({
          name: "Render Template",
          status: "passed",
          data: { rendered: rendered.substring(0, 100) + "..." },
        });

        // Store template ID for cleanup
        results.templateId = template.id;
      } catch (error) {
        results.tests.push({
          name: "Template Tests",
          status: "failed",
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }

    // Test 2: Content Generation
    if (action === "test-all" || action === "test-generation") {
      try {
        // Generate with custom prompt
        const content = await generateContent({
          contentType: "post",
          prompt: "Write a very short blog post (2-3 sentences) about TypeScript benefits. Include a title, excerpt, and body in JSON format: {\"title\": \"...\", \"excerpt\": \"...\", \"body\": \"...\"}",
          generateOgImage: false,
          autoPublish: false,
          metadata: {
            source: "internal-test",
          },
        });

        results.tests.push({
          name: "Generate Content",
          status: content.validationStatus === "valid" ? "passed" : "failed",
          data: {
            id: content.id,
            title: content.title,
            validationStatus: content.validationStatus,
            provider: content.provider,
            model: content.model,
          },
        });
      } catch (error) {
        results.tests.push({
          name: "Content Generation",
          status: "failed",
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }

    // Cleanup: Delete test template
    if (results.templateId) {
      try {
        await deleteTemplate(results.templateId);
        results.tests.push({
          name: "Cleanup Template",
          status: "passed",
        });
      } catch (error) {
        results.tests.push({
          name: "Cleanup Template",
          status: "failed",
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }

    // Calculate summary
    const passed = results.tests.filter((t: any) => t.status === "passed").length;
    const failed = results.tests.filter((t: any) => t.status === "failed").length;
    
    results.summary = {
      total: results.tests.length,
      passed,
      failed,
      success: failed === 0,
    };

    return NextResponse.json(results);
  } catch (error) {
    console.error("Test execution error:", error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Test execution failed",
      },
      { status: 500 }
    );
  }
}
