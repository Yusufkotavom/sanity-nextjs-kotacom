import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  integer,
  jsonb,
  numeric,
  date,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";

export const contentItems = pgTable(
  "content_items",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    sanityId: text("sanity_id").notNull(),
    documentType: text("document_type").notNull(),
    slug: text("slug").notNull(),
    url: text("url").notNull(),
    title: text("title"),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
    lastSeenInSitemapAt: timestamp("last_seen_in_sitemap_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    sanityIdUnique: uniqueIndex("content_items_sanity_id_unique").on(table.sanityId),
    urlIndex: index("content_items_url_idx").on(table.url),
  }),
);

export const scheduledTasks = pgTable("scheduled_tasks", {
  id: uuid("id").defaultRandom().primaryKey(),
  taskType: text("task_type").notNull(),
  name: text("name").notNull(),
  cronExpr: text("cron_expr").notNull(),
  timezone: text("timezone").default("Asia/Jakarta"),
  enabled: boolean("enabled").default(true).notNull(),
  payload: jsonb("payload").notNull(),
  lastRunAt: timestamp("last_run_at", { withTimezone: true }),
  nextRunAt: timestamp("next_run_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const jobRuns = pgTable(
  "job_runs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    taskId: uuid("task_id").references(() => scheduledTasks.id),
    jobType: text("job_type").notNull(),
    status: text("status").notNull(),
    attempt: integer("attempt").default(0).notNull(),
    payload: jsonb("payload"),
    result: jsonb("result"),
    errorMessage: text("error_message"),
    startedAt: timestamp("started_at", { withTimezone: true }),
    finishedAt: timestamp("finished_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    statusIndex: index("job_runs_status_idx").on(table.status),
    createdIndex: index("job_runs_created_idx").on(table.createdAt),
  }),
);

export const promptTemplates = pgTable(
  "prompt_templates",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    contentType: text("content_type").notNull(),
    systemPrompt: text("system_prompt").notNull(),
    userPromptTemplate: text("user_prompt_template").notNull(),
    variables: jsonb("variables").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    contentTypeIndex: index("prompt_templates_content_type_idx").on(table.contentType),
    nameContentTypeUnique: uniqueIndex("prompt_templates_name_content_type_unique").on(table.name, table.contentType),
  }),
);

export const aiGenerations = pgTable(
  "ai_generations",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    sourceType: text("source_type").notNull(),
    templateId: uuid("template_id").references(() => promptTemplates.id),
    jobRunId: uuid("job_run_id").references(() => jobRuns.id),
    inputJson: jsonb("input_json").notNull(),
    promptVersion: text("prompt_version"),
    provider: text("provider").notNull(),
    model: text("model").notNull(),
    rawOutput: text("raw_output"),
    parsedOutput: jsonb("parsed_output"),
    validationStatus: text("validation_status").notNull(),
    validationErrors: jsonb("validation_errors"),
    sanityWriteStatus: text("sanity_write_status").notNull(),
    sanityDocumentId: text("sanity_document_id"),
    ogImageAssetId: text("og_image_asset_id"),
    readyToPublish: boolean("ready_to_publish").default(false).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    validationIndex: index("ai_generations_validation_idx").on(table.validationStatus),
    createdIndex: index("ai_generations_created_idx").on(table.createdAt),
  }),
);

export const seoAudits = pgTable("seo_audits", {
  id: uuid("id").defaultRandom().primaryKey(),
  contentItemId: uuid("content_item_id").references(() => contentItems.id),
  score: integer("score").notNull(),
  status: text("status").notNull(),
  issues: jsonb("issues").notNull(),
  checkedAt: timestamp("checked_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const searchSubmissions = pgTable(
  "search_submissions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    contentItemId: uuid("content_item_id").references(() => contentItems.id),
    provider: text("provider").notNull(),
    submissionType: text("submission_type").notNull(),
    requestPayload: jsonb("request_payload"),
    responsePayload: jsonb("response_payload"),
    httpStatus: integer("http_status"),
    status: text("status").notNull(),
    submittedAt: timestamp("submitted_at", { withTimezone: true }).notNull(),
  },
  (table) => ({
    providerIndex: index("search_submissions_provider_idx").on(table.provider),
    statusIndex: index("search_submissions_status_idx").on(table.status),
    submittedIndex: index("search_submissions_submitted_idx").on(table.submittedAt),
  }),
);

export const indexStatusChecks = pgTable(
  "index_status_checks",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    contentItemId: uuid("content_item_id").references(() => contentItems.id),
    provider: text("provider").default("google").notNull(),
    verdict: text("verdict"),
    coverageState: text("coverage_state"),
    indexingState: text("indexing_state"),
    pageFetchState: text("page_fetch_state"),
    robotsState: text("robots_state"),
    lastCrawlTime: timestamp("last_crawl_time", { withTimezone: true }),
    googleCanonical: text("google_canonical"),
    userCanonical: text("user_canonical"),
    rawResponse: jsonb("raw_response"),
    checkedAt: timestamp("checked_at", { withTimezone: true }).notNull(),
  },
  (table) => ({
    contentIndex: index("index_status_checks_content_idx").on(table.contentItemId),
    checkedIndex: index("index_status_checks_checked_idx").on(table.checkedAt),
  }),
);

export const analyticsDaily = pgTable(
  "analytics_daily",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    contentItemId: uuid("content_item_id").references(() => contentItems.id),
    date: date("date").notNull(),
    clicks: integer("clicks").default(0).notNull(),
    impressions: integer("impressions").default(0).notNull(),
    ctr: numeric("ctr", { precision: 8, scale: 4 }),
    position: numeric("position", { precision: 8, scale: 2 }),
    topQueries: jsonb("top_queries"),
    topCountries: jsonb("top_countries"),
    topDevices: jsonb("top_devices"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    uniqueDaily: uniqueIndex("analytics_daily_unique").on(table.contentItemId, table.date),
    dateIndex: index("analytics_daily_date_idx").on(table.date),
  }),
);

export const analyticsGa4Daily = pgTable(
  "analytics_ga4_daily",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    contentItemId: uuid("content_item_id").references(() => contentItems.id),
    pageUrl: text("page_url").notNull(),
    date: date("date").notNull(),
    sessions: integer("sessions").default(0).notNull(),
    engagedSessions: integer("engaged_sessions").default(0).notNull(),
    conversions: numeric("conversions", { precision: 12, scale: 2 }),
    revenue: numeric("revenue", { precision: 14, scale: 2 }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    uniqueDaily: uniqueIndex("analytics_ga4_daily_unique").on(table.pageUrl, table.date),
    dateIndex: index("analytics_ga4_daily_date_idx").on(table.date),
    contentDateIndex: index("analytics_ga4_daily_content_date_idx").on(table.contentItemId, table.date),
  }),
);

export const contentIdeas = pgTable(
  "content_ideas",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    topic: text("topic").notNull(),
    contentType: text("content_type").notNull(),
    idea: text("idea").notNull(),
    outline: text("outline"),
    generationId: uuid("generation_id").references(() => aiGenerations.id),
    status: text("status").notNull().default("idea"),
    // Template variables
    audience: text("audience"),
    keyword: text("keyword"),
    wordCount: text("word_count"),
    location: text("location"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    statusIndex: index("content_ideas_status_idx").on(table.status),
    createdIndex: index("content_ideas_created_idx").on(table.createdAt),
  }),
);
