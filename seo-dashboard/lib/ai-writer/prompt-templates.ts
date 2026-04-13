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
const TEMPLATE_CACHE_TTL = 10 * 60 * 1000;

let templateListCache: {
  timestamp: number;
  data: PromptTemplate[] | null;
} = {
  timestamp: 0,
  data: null,
};

let templateByIdCache = new Map<string, { timestamp: number; data: PromptTemplate | null }>();

const VARIABLE_ALIASES: Record<string, string[]> = {
  audience: ["target_audience"],
  target_audience: ["audience"],
  keyword: ["keywords", "target_keyword"],
  keywords: ["keyword", "target_keyword"],
  target_keyword: ["keyword", "keywords"],
  topic: ["title", "idea", "keyword", "keywords", "target_keyword"],
  title: ["topic", "idea"],
  idea: ["topic", "title"],
  word_count: ["wordcount", "length"],
  wordcount: ["word_count", "length"],
  length: ["word_count", "wordcount"],
  location: ["target_location", "city", "area"],
  target_location: ["location", "city", "area"],
};

function invalidateTemplateCache(id?: string) {
  templateListCache = { timestamp: 0, data: null };
  if (id) {
    templateByIdCache.delete(id);
  } else {
    templateByIdCache.clear();
  }
}

/**
 * Validates template variable names (alphanumeric with underscores only)
 */
function validateVariableName(name: string): boolean {
  return /^[a-zA-Z0-9_]+$/.test(name);
}

function normalizeVariableName(name: string): string {
  return name.trim().toLowerCase().replace(/[\s-]+/g, "_");
}

function readVariableValue(
  variableName: string,
  variables: Record<string, string>
): string | undefined {
  const direct = variables[variableName];
  if (typeof direct === "string" && direct.trim().length > 0) {
    return direct;
  }

  const normalized = normalizeVariableName(variableName);

  for (const [key, value] of Object.entries(variables)) {
    if (normalizeVariableName(key) === normalized && value?.trim()) {
      return value;
    }
  }

  const aliases = VARIABLE_ALIASES[normalized] || [];
  for (const alias of aliases) {
    const aliased = variables[alias];
    if (typeof aliased === "string" && aliased.trim().length > 0) {
      return aliased;
    }
    for (const [key, value] of Object.entries(variables)) {
      if (normalizeVariableName(key) === alias && value?.trim()) {
        return value;
      }
    }
  }

  return undefined;
}

function fallbackVariableValue(
  variableName: string,
  variables: Record<string, string>
): string | undefined {
  const normalized = normalizeVariableName(variableName);
  const topic = readVariableValue("topic", variables);

  if (normalized.includes("audience")) {
    return readVariableValue("audience", variables) || "general audience";
  }
  if (normalized.includes("keyword")) {
    return readVariableValue("keyword", variables) || topic || "general keyword";
  }
  if (normalized.includes("word") || normalized === "length") {
    return readVariableValue("word_count", variables) || "1500";
  }
  if (normalized.includes("location") || normalized === "city" || normalized === "area") {
    return readVariableValue("location", variables) || "general";
  }
  if (normalized === "topic") {
    return (
      readVariableValue("title", variables) ||
      readVariableValue("idea", variables) ||
      readVariableValue("keyword", variables) ||
      "general topic"
    );
  }
  if (normalized === "service_name" || normalized === "product_name" || normalized === "idea") {
    return topic || "general topic";
  }
  if (normalized === "competitor") {
    return "alternatives";
  }

  return undefined;
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

  const mapped = {
    ...template,
    variables: template.variables as TemplateVariable[],
  } as PromptTemplate;
  invalidateTemplateCache();
  return mapped;
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

  const mapped = {
    ...template,
    variables: template.variables as TemplateVariable[],
  } as PromptTemplate;
  invalidateTemplateCache(id);
  return mapped;
}

/**
 * Deletes a prompt template
 */
export async function deleteTemplate(id: string): Promise<void> {
  const database = db();
  
  await database
    .delete(promptTemplates)
    .where(eq(promptTemplates.id, id));
  invalidateTemplateCache(id);
}

/**
 * Lists all prompt templates, optionally filtered by content type
 */
export async function listTemplates(contentType?: string): Promise<PromptTemplate[]> {
  const now = Date.now();
  if (!contentType && templateListCache.data && now - templateListCache.timestamp < TEMPLATE_CACHE_TTL) {
    return templateListCache.data;
  }

  const database = db();
  
  let query = database.select().from(promptTemplates);

  if (contentType) {
    query = query.where(eq(promptTemplates.contentType, contentType)) as any;
  }

  const templates = await query;

  const mapped = templates.map((template) => ({
    ...template,
    variables: template.variables as TemplateVariable[],
  } as PromptTemplate));

  if (!contentType) {
    templateListCache = { timestamp: now, data: mapped };
  }
  return mapped;
}

/**
 * Gets a single prompt template by ID
 */
export async function getTemplate(id: string): Promise<PromptTemplate | null> {
  const now = Date.now();
  const cached = templateByIdCache.get(id);
  if (cached && now - cached.timestamp < TEMPLATE_CACHE_TTL) {
    return cached.data;
  }

  const database = db();
  
  const [template] = await database
    .select()
    .from(promptTemplates)
    .where(eq(promptTemplates.id, id));

  if (!template) {
    templateByIdCache.set(id, { timestamp: now, data: null });
    return null;
  }

  const mapped = {
    ...template,
    variables: template.variables as TemplateVariable[],
  } as PromptTemplate;
  templateByIdCache.set(id, { timestamp: now, data: mapped });
  return mapped;
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

  // Build variable map with aliases/defaults/fallbacks
  const varMap: Record<string, string> = {};
  for (const variable of template.variables) {
    const provided = readVariableValue(variable.name, variables);
    if (provided) {
      varMap[variable.name] = provided;
      continue;
    }

    if (variable.defaultValue) {
      varMap[variable.name] = variable.defaultValue;
      continue;
    }

    const fallback = fallbackVariableValue(variable.name, variables);
    if (fallback) {
      varMap[variable.name] = fallback;
      continue;
    }

    if (variable.required) {
      throw new Error(`Required variable "${variable.name}" is missing`);
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
