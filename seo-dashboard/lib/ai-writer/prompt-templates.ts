import { db } from "@/lib/db";
import { promptTemplates } from "@repo/db/schema";
import { eq, and } from "drizzle-orm";

export interface TemplateVariable {
  name: string;
  description: string;
  required: boolean;
  defaultValue?: string;
}

export interface PromptTemplate {
  id: string;
  name: string;
  contentType: "post" | "service" | "product" | "all";
  systemPrompt: string;
  userPromptTemplate: string;
  variables: TemplateVariable[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTemplateParams {
  name: string;
  contentType: "post" | "service" | "product" | "all";
  systemPrompt: string;
  userPromptTemplate: string;
  variables: TemplateVariable[];
}

export interface UpdateTemplateParams {
  name?: string;
  systemPrompt?: string;
  userPromptTemplate?: string;
  variables?: TemplateVariable[];
}

const MAX_SYSTEM_PROMPT_LENGTH = 5000;
const MAX_USER_PROMPT_LENGTH = 10000;

/**
 * Validates template variable names (alphanumeric with underscores only)
 */
function validateVariableName(name: string): boolean {
  return /^[a-zA-Z0-9_]+$/.test(name);
}

/**
 * Validates template syntax and constraints
 */
function validateTemplate(params: CreateTemplateParams | UpdateTemplateParams): void {
  if ("systemPrompt" in params && params.systemPrompt) {
    if (params.systemPrompt.length > MAX_SYSTEM_PROMPT_LENGTH) {
      throw new Error(`System prompt exceeds maximum length of ${MAX_SYSTEM_PROMPT_LENGTH} characters`);
    }
  }

  if ("userPromptTemplate" in params && params.userPromptTemplate) {
    if (params.userPromptTemplate.length > MAX_USER_PROMPT_LENGTH) {
      throw new Error(`User prompt template exceeds maximum length of ${MAX_USER_PROMPT_LENGTH} characters`);
    }
  }

  if ("variables" in params && params.variables) {
    for (const variable of params.variables) {
      if (!validateVariableName(variable.name)) {
        throw new Error(
          `Invalid variable name "${variable.name}". Variable names must contain only alphanumeric characters and underscores.`
        );
      }
    }
  }
}

/**
 * Creates a new prompt template
 */
export async function createTemplate(params: CreateTemplateParams): Promise<PromptTemplate> {
  validateTemplate(params);

  const database = db();
  
  const [template] = await database
    .insert(promptTemplates)
    .values({
      name: params.name,
      contentType: params.contentType,
      systemPrompt: params.systemPrompt,
      userPromptTemplate: params.userPromptTemplate,
      variables: params.variables as any,
    })
    .returning();

  return {
    ...template,
    variables: template.variables as TemplateVariable[],
  } as PromptTemplate;
}

/**
 * Updates an existing prompt template
 */
export async function updateTemplate(
  id: string,
  params: UpdateTemplateParams
): Promise<PromptTemplate> {
  validateTemplate(params);

  const database = db();
  
  const updateData: any = {
    updatedAt: new Date(),
  };

  if (params.name !== undefined) updateData.name = params.name;
  if (params.systemPrompt !== undefined) updateData.systemPrompt = params.systemPrompt;
  if (params.userPromptTemplate !== undefined) updateData.userPromptTemplate = params.userPromptTemplate;
  if (params.variables !== undefined) updateData.variables = params.variables;

  const [template] = await database
    .update(promptTemplates)
    .set(updateData)
    .where(eq(promptTemplates.id, id))
    .returning();

  if (!template) {
    throw new Error(`Template with id ${id} not found`);
  }

  return {
    ...template,
    variables: template.variables as TemplateVariable[],
  } as PromptTemplate;
}

/**
 * Deletes a prompt template
 */
export async function deleteTemplate(id: string): Promise<void> {
  const database = db();
  
  await database
    .delete(promptTemplates)
    .where(eq(promptTemplates.id, id));
}

/**
 * Lists all prompt templates, optionally filtered by content type
 */
export async function listTemplates(contentType?: string): Promise<PromptTemplate[]> {
  const database = db();
  
  let query = database.select().from(promptTemplates);

  if (contentType) {
    query = query.where(eq(promptTemplates.contentType, contentType)) as any;
  }

  const templates = await query;

  return templates.map((template) => ({
    ...template,
    variables: template.variables as TemplateVariable[],
  } as PromptTemplate));
}

/**
 * Gets a single prompt template by ID
 */
export async function getTemplate(id: string): Promise<PromptTemplate | null> {
  const database = db();
  
  const [template] = await database
    .select()
    .from(promptTemplates)
    .where(eq(promptTemplates.id, id));

  if (!template) {
    return null;
  }

  return {
    ...template,
    variables: template.variables as TemplateVariable[],
  } as PromptTemplate;
}

/**
 * Renders a template with provided variables
 */
export async function renderTemplate(
  templateId: string,
  variables: Record<string, string>
): Promise<string> {
  const template = await getTemplate(templateId);

  if (!template) {
    throw new Error(`Template with id ${templateId} not found`);
  }

  // Check for required variables
  const requiredVars = template.variables.filter((v) => v.required);
  for (const requiredVar of requiredVars) {
    if (!(requiredVar.name in variables) && !requiredVar.defaultValue) {
      throw new Error(`Required variable "${requiredVar.name}" is missing`);
    }
  }

  // Build variable map with defaults
  const varMap: Record<string, string> = {};
  for (const variable of template.variables) {
    if (variable.name in variables) {
      varMap[variable.name] = variables[variable.name];
    } else if (variable.defaultValue) {
      varMap[variable.name] = variable.defaultValue;
    }
  }

  // Interpolate variables into template
  let rendered = template.userPromptTemplate;
  for (const [key, value] of Object.entries(varMap)) {
    const regex = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, "g");
    rendered = rendered.replace(regex, value);
  }

  return rendered;
}
