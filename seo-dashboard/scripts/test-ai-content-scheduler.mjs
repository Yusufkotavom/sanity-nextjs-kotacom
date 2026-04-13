#!/usr/bin/env node

/**
 * Test script for AI Content Scheduler
 * 
 * This script tests the core functionality:
 * 1. Database schema (prompt templates table)
 * 2. Prompt template CRUD operations
 * 3. Content generation with templates
 * 4. Content generation with custom prompts
 * 
 * Usage:
 *   node scripts/test-ai-content-scheduler.mjs
 */

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

async function testPromptTemplates() {
  console.log("\n=== Testing Prompt Templates ===\n");

  // Test 1: Create a template
  console.log("1. Creating a test template...");
  const createResponse = await fetch(`${BASE_URL}/api/ai/templates/test`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "create",
      name: "Test Blog Template",
      contentType: "post",
      systemPrompt: "You are an expert blog writer.",
      userPromptTemplate: "Write a blog post about {{topic}} for {{audience}}.",
      variables: [
        { name: "topic", description: "The blog topic", required: true },
        { name: "audience", description: "Target audience", required: true },
      ],
    }),
  });

  if (!createResponse.ok) {
    const error = await createResponse.text();
    console.error("❌ Failed to create template:", error);
    return null;
  }

  const createResult = await createResponse.json();
  console.log("✅ Template created:", createResult.data.id);
  const templateId = createResult.data.id;

  // Test 2: List templates
  console.log("\n2. Listing templates...");
  const listResponse = await fetch(`${BASE_URL}/api/ai/templates/test?action=list&contentType=post`);
  const listResult = await listResponse.json();
  console.log(`✅ Found ${listResult.data.length} template(s)`);

  // Test 3: Get specific template
  console.log("\n3. Getting template by ID...");
  const getResponse = await fetch(`${BASE_URL}/api/ai/templates/test?action=get&id=${templateId}`);
  const getResult = await getResponse.json();
  console.log("✅ Template retrieved:", getResult.data.name);

  // Test 4: Render template
  console.log("\n4. Rendering template with variables...");
  const renderResponse = await fetch(`${BASE_URL}/api/ai/templates/test`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "render",
      templateId,
      variables: {
        topic: "AI and Machine Learning",
        audience: "developers",
      },
    }),
  });

  const renderResult = await renderResponse.json();
  console.log("✅ Rendered prompt:", renderResult.data.rendered);

  return templateId;
}

async function testContentGeneration(templateId) {
  console.log("\n=== Testing Content Generation ===\n");

  // Test 1: Generate with custom prompt
  console.log("1. Generating content with custom prompt...");
  const customPromptResponse = await fetch(`${BASE_URL}/api/ai/test-generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contentType: "post",
      prompt: "Write a short blog post about the benefits of TypeScript for web development. Include a title, excerpt, and body.",
      generateOgImage: false,
      autoPublish: false,
    }),
  });

  if (!customPromptResponse.ok) {
    const error = await customPromptResponse.text();
    console.error("❌ Failed to generate content:", error);
  } else {
    const customResult = await customPromptResponse.json();
    console.log("✅ Content generated:");
    console.log("   - ID:", customResult.data.id);
    console.log("   - Title:", customResult.data.title);
    console.log("   - Excerpt:", customResult.data.excerpt.substring(0, 50) + "...");
    console.log("   - Validation:", customResult.data.validationStatus);
    console.log("   - Provider:", customResult.data.provider);
    console.log("   - Model:", customResult.data.model);
  }

  // Test 2: Generate with template (if template was created)
  if (templateId) {
    console.log("\n2. Generating content with template...");
    const templateResponse = await fetch(`${BASE_URL}/api/ai/test-generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contentType: "post",
        templateId,
        variables: {
          topic: "Next.js 15 features",
          audience: "React developers",
        },
        generateOgImage: false,
        autoPublish: false,
      }),
    });

    if (!templateResponse.ok) {
      const error = await templateResponse.text();
      console.error("❌ Failed to generate content with template:", error);
    } else {
      const templateResult = await templateResponse.json();
      console.log("✅ Content generated with template:");
      console.log("   - ID:", templateResult.data.id);
      console.log("   - Title:", templateResult.data.title);
      console.log("   - Validation:", templateResult.data.validationStatus);
    }
  }
}

async function cleanup(templateId) {
  if (!templateId) return;

  console.log("\n=== Cleanup ===\n");
  console.log("Deleting test template...");
  
  const deleteResponse = await fetch(`${BASE_URL}/api/ai/templates/test?id=${templateId}`, {
    method: "DELETE",
  });

  if (deleteResponse.ok) {
    console.log("✅ Template deleted");
  } else {
    console.error("❌ Failed to delete template");
  }
}

async function main() {
  console.log("🚀 AI Content Scheduler Test Suite");
  console.log("===================================");
  console.log(`Testing against: ${BASE_URL}`);

  try {
    // Test prompt templates
    const templateId = await testPromptTemplates();

    // Test content generation
    await testContentGeneration(templateId);

    // Cleanup
    await cleanup(templateId);

    console.log("\n✅ All tests completed!");
  } catch (error) {
    console.error("\n❌ Test suite failed:", error.message);
    process.exit(1);
  }
}

main();
