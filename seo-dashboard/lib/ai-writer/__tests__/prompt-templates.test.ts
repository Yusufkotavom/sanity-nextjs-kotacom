/**
 * Unit tests for prompt template service
 * 
 * These tests validate the prompt template manager functionality including:
 * - Template creation with valid and invalid inputs
 * - Variable interpolation with missing required variables
 * - Template name uniqueness per content type
 * - Max length validation for prompts
 * 
 * To run these tests, install a test framework like vitest or jest
 * and execute: npm test prompt-templates.test.ts
 */

import {
  createTemplate,
  updateTemplate,
  deleteTemplate,
  listTemplates,
  getTemplate,
  renderTemplate,
  type CreateTemplateParams,
} from "../prompt-templates";

describe("Prompt Template Service", () => {
  describe("createTemplate", () => {
    it("should create a template with valid inputs", async () => {
      const params: CreateTemplateParams = {
        name: "Test Template",
        contentType: "post",
        systemPrompt: "You are a helpful assistant",
        userPromptTemplate: "Write about {{topic}}",
        variables: [
          {
            name: "topic",
            description: "The topic to write about",
            required: true,
          },
        ],
      };

      const template = await createTemplate(params);

      expect(template).toBeDefined();
      expect(template.id).toBeDefined();
      expect(template.name).toBe(params.name);
      expect(template.contentType).toBe(params.contentType);
      expect(template.systemPrompt).toBe(params.systemPrompt);
      expect(template.userPromptTemplate).toBe(params.userPromptTemplate);
      expect(template.variables).toHaveLength(1);
      expect(template.createdAt).toBeInstanceOf(Date);
      expect(template.updatedAt).toBeInstanceOf(Date);
    });

    it("should reject template with invalid variable name", async () => {
      const params: CreateTemplateParams = {
        name: "Invalid Template",
        contentType: "post",
        systemPrompt: "Test",
        userPromptTemplate: "Test {{invalid-var}}",
        variables: [
          {
            name: "invalid-var", // Contains hyphen, should fail
            description: "Invalid variable",
            required: true,
          },
        ],
      };

      await expect(createTemplate(params)).rejects.toThrow(
        /Variable names must contain only alphanumeric characters and underscores/
      );
    });

    it("should reject template with system prompt exceeding max length", async () => {
      const params: CreateTemplateParams = {
        name: "Long System Prompt",
        contentType: "post",
        systemPrompt: "a".repeat(5001), // Exceeds 5000 char limit
        userPromptTemplate: "Test",
        variables: [],
      };

      await expect(createTemplate(params)).rejects.toThrow(
        /System prompt exceeds maximum length/
      );
    });

    it("should reject template with user prompt exceeding max length", async () => {
      const params: CreateTemplateParams = {
        name: "Long User Prompt",
        contentType: "post",
        systemPrompt: "Test",
        userPromptTemplate: "a".repeat(10001), // Exceeds 10000 char limit
        variables: [],
      };

      await expect(createTemplate(params)).rejects.toThrow(
        /User prompt template exceeds maximum length/
      );
    });

    it("should accept valid variable names with underscores and numbers", async () => {
      const params: CreateTemplateParams = {
        name: "Valid Variables",
        contentType: "post",
        systemPrompt: "Test",
        userPromptTemplate: "{{var_1}} {{var2}} {{VAR_3}}",
        variables: [
          { name: "var_1", description: "Test", required: true },
          { name: "var2", description: "Test", required: false },
          { name: "VAR_3", description: "Test", required: false },
        ],
      };

      const template = await createTemplate(params);
      expect(template).toBeDefined();
      expect(template.variables).toHaveLength(3);
    });
  });

  describe("updateTemplate", () => {
    it("should update template and increment updatedAt timestamp", async () => {
      // First create a template
      const created = await createTemplate({
        name: "Original",
        contentType: "post",
        systemPrompt: "Original prompt",
        userPromptTemplate: "Original {{topic}}",
        variables: [{ name: "topic", description: "Test", required: true }],
      });

      const originalUpdatedAt = created.updatedAt;

      // Wait a bit to ensure timestamp difference
      await new Promise((resolve) => setTimeout(resolve, 10));

      // Update the template
      const updated = await updateTemplate(created.id, {
        name: "Updated",
        systemPrompt: "Updated prompt",
      });

      expect(updated.name).toBe("Updated");
      expect(updated.systemPrompt).toBe("Updated prompt");
      expect(updated.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt.getTime());
    });

    it("should throw error when updating non-existent template", async () => {
      await expect(
        updateTemplate("00000000-0000-0000-0000-000000000000", { name: "Test" })
      ).rejects.toThrow(/not found/);
    });
  });

  describe("renderTemplate", () => {
    it("should interpolate variables correctly", async () => {
      const template = await createTemplate({
        name: "Interpolation Test",
        contentType: "post",
        systemPrompt: "Test",
        userPromptTemplate: "Write about {{topic}} for {{audience}}",
        variables: [
          { name: "topic", description: "Topic", required: true },
          { name: "audience", description: "Audience", required: true },
        ],
      });

      const rendered = await renderTemplate(template.id, {
        topic: "AI",
        audience: "developers",
      });

      expect(rendered).toBe("Write about AI for developers");
    });

    it("should throw error when required variable is missing", async () => {
      const template = await createTemplate({
        name: "Required Var Test",
        contentType: "post",
        systemPrompt: "Test",
        userPromptTemplate: "Write about {{topic}}",
        variables: [{ name: "topic", description: "Topic", required: true }],
      });

      await expect(renderTemplate(template.id, {})).rejects.toThrow(
        /Required variable "topic" is missing/
      );
    });

    it("should use default value when variable not provided", async () => {
      const template = await createTemplate({
        name: "Default Value Test",
        contentType: "post",
        systemPrompt: "Test",
        userPromptTemplate: "Write about {{topic}}",
        variables: [
          {
            name: "topic",
            description: "Topic",
            required: false,
            defaultValue: "technology",
          },
        ],
      });

      const rendered = await renderTemplate(template.id, {});

      expect(rendered).toBe("Write about technology");
    });

    it("should handle variables with whitespace in template", async () => {
      const template = await createTemplate({
        name: "Whitespace Test",
        contentType: "post",
        systemPrompt: "Test",
        userPromptTemplate: "Write about {{ topic }} and {{  audience  }}",
        variables: [
          { name: "topic", description: "Topic", required: true },
          { name: "audience", description: "Audience", required: true },
        ],
      });

      const rendered = await renderTemplate(template.id, {
        topic: "AI",
        audience: "developers",
      });

      expect(rendered).toBe("Write about AI and developers");
    });
  });

  describe("listTemplates", () => {
    it("should filter templates by content type", async () => {
      // Create templates with different content types
      await createTemplate({
        name: "Post Template",
        contentType: "post",
        systemPrompt: "Test",
        userPromptTemplate: "Test",
        variables: [],
      });

      await createTemplate({
        name: "Service Template",
        contentType: "service",
        systemPrompt: "Test",
        userPromptTemplate: "Test",
        variables: [],
      });

      const postTemplates = await listTemplates("post");
      const serviceTemplates = await listTemplates("service");

      expect(postTemplates.some((t) => t.name === "Post Template")).toBe(true);
      expect(postTemplates.some((t) => t.name === "Service Template")).toBe(false);
      expect(serviceTemplates.some((t) => t.name === "Service Template")).toBe(true);
      expect(serviceTemplates.some((t) => t.name === "Post Template")).toBe(false);
    });

    it("should return all templates when no filter provided", async () => {
      const allTemplates = await listTemplates();
      expect(Array.isArray(allTemplates)).toBe(true);
    });
  });

  describe("getTemplate", () => {
    it("should return null for non-existent template", async () => {
      const template = await getTemplate("00000000-0000-0000-0000-000000000000");
      expect(template).toBeNull();
    });

    it("should return complete template with all metadata", async () => {
      const created = await createTemplate({
        name: "Complete Template",
        contentType: "post",
        systemPrompt: "System",
        userPromptTemplate: "User {{var}}",
        variables: [{ name: "var", description: "Test", required: true }],
      });

      const retrieved = await getTemplate(created.id);

      expect(retrieved).not.toBeNull();
      expect(retrieved?.id).toBe(created.id);
      expect(retrieved?.name).toBe(created.name);
      expect(retrieved?.variables).toHaveLength(1);
      expect(retrieved?.createdAt).toBeInstanceOf(Date);
      expect(retrieved?.updatedAt).toBeInstanceOf(Date);
    });
  });

  describe("deleteTemplate", () => {
    it("should delete template successfully", async () => {
      const template = await createTemplate({
        name: "To Delete",
        contentType: "post",
        systemPrompt: "Test",
        userPromptTemplate: "Test",
        variables: [],
      });

      await deleteTemplate(template.id);

      const retrieved = await getTemplate(template.id);
      expect(retrieved).toBeNull();
    });
  });
});

/**
 * Property-based test cases
 * 
 * These test invariants that should hold for all valid inputs
 */
describe("Prompt Template Properties", () => {
  it("Property: Template name uniqueness per content type", async () => {
    const name = "Unique Name Test";
    
    // Create first template
    await createTemplate({
      name,
      contentType: "post",
      systemPrompt: "Test",
      userPromptTemplate: "Test",
      variables: [],
    });

    // Attempting to create another template with same name and content type should fail
    // (This would be enforced by database unique constraint)
    await expect(
      createTemplate({
        name,
        contentType: "post",
        systemPrompt: "Test 2",
        userPromptTemplate: "Test 2",
        variables: [],
      })
    ).rejects.toThrow();

    // But same name with different content type should succeed
    const differentType = await createTemplate({
      name,
      contentType: "service",
      systemPrompt: "Test 3",
      userPromptTemplate: "Test 3",
      variables: [],
    });

    expect(differentType).toBeDefined();
    expect(differentType.name).toBe(name);
    expect(differentType.contentType).toBe("service");
  });

  it("Property: Variable interpolation is idempotent", async () => {
    const template = await createTemplate({
      name: "Idempotent Test",
      contentType: "post",
      systemPrompt: "Test",
      userPromptTemplate: "Write about {{topic}}",
      variables: [{ name: "topic", description: "Topic", required: true }],
    });

    const vars = { topic: "AI" };
    const rendered1 = await renderTemplate(template.id, vars);
    const rendered2 = await renderTemplate(template.id, vars);

    expect(rendered1).toBe(rendered2);
  });

  it("Property: Updated timestamp always increases", async () => {
    const template = await createTemplate({
      name: "Timestamp Test",
      contentType: "post",
      systemPrompt: "Test",
      userPromptTemplate: "Test",
      variables: [],
    });

    const timestamps: Date[] = [template.updatedAt];

    for (let i = 0; i < 3; i++) {
      await new Promise((resolve) => setTimeout(resolve, 10));
      const updated = await updateTemplate(template.id, {
        systemPrompt: `Test ${i}`,
      });
      timestamps.push(updated.updatedAt);
    }

    // Verify timestamps are strictly increasing
    for (let i = 1; i < timestamps.length; i++) {
      expect(timestamps[i].getTime()).toBeGreaterThan(timestamps[i - 1].getTime());
    }
  });
});
