CREATE TABLE "ai_generations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"source_type" text NOT NULL,
	"template_id" uuid,
	"job_run_id" uuid,
	"input_json" jsonb NOT NULL,
	"prompt_version" text,
	"provider" text NOT NULL,
	"model" text NOT NULL,
	"raw_output" text,
	"parsed_output" jsonb,
	"validation_status" text NOT NULL,
	"validation_errors" jsonb,
	"sanity_write_status" text NOT NULL,
	"sanity_document_id" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "analytics_daily" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content_item_id" uuid,
	"date" date NOT NULL,
	"clicks" integer DEFAULT 0 NOT NULL,
	"impressions" integer DEFAULT 0 NOT NULL,
	"ctr" numeric(8, 4),
	"position" numeric(8, 2),
	"top_queries" jsonb,
	"top_countries" jsonb,
	"top_devices" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "content_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sanity_id" text NOT NULL,
	"document_type" text NOT NULL,
	"slug" text NOT NULL,
	"url" text NOT NULL,
	"title" text,
	"published_at" timestamp with time zone,
	"updated_at" timestamp with time zone,
	"last_seen_in_sitemap_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "index_status_checks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content_item_id" uuid,
	"provider" text DEFAULT 'google' NOT NULL,
	"verdict" text,
	"coverage_state" text,
	"indexing_state" text,
	"page_fetch_state" text,
	"robots_state" text,
	"last_crawl_time" timestamp with time zone,
	"google_canonical" text,
	"user_canonical" text,
	"raw_response" jsonb,
	"checked_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "job_runs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"task_id" uuid,
	"job_type" text NOT NULL,
	"status" text NOT NULL,
	"attempt" integer DEFAULT 0 NOT NULL,
	"payload" jsonb,
	"result" jsonb,
	"error_message" text,
	"started_at" timestamp with time zone,
	"finished_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "scheduled_tasks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"task_type" text NOT NULL,
	"name" text NOT NULL,
	"cron_expr" text NOT NULL,
	"timezone" text DEFAULT 'Asia/Jakarta',
	"enabled" boolean DEFAULT true NOT NULL,
	"payload" jsonb NOT NULL,
	"last_run_at" timestamp with time zone,
	"next_run_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "search_submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content_item_id" uuid,
	"provider" text NOT NULL,
	"submission_type" text NOT NULL,
	"request_payload" jsonb,
	"response_payload" jsonb,
	"http_status" integer,
	"status" text NOT NULL,
	"submitted_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "seo_audits" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content_item_id" uuid,
	"score" integer NOT NULL,
	"status" text NOT NULL,
	"issues" jsonb NOT NULL,
	"checked_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "ai_generations" ADD CONSTRAINT "ai_generations_job_run_id_job_runs_id_fk" FOREIGN KEY ("job_run_id") REFERENCES "public"."job_runs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "analytics_daily" ADD CONSTRAINT "analytics_daily_content_item_id_content_items_id_fk" FOREIGN KEY ("content_item_id") REFERENCES "public"."content_items"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "index_status_checks" ADD CONSTRAINT "index_status_checks_content_item_id_content_items_id_fk" FOREIGN KEY ("content_item_id") REFERENCES "public"."content_items"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_runs" ADD CONSTRAINT "job_runs_task_id_scheduled_tasks_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."scheduled_tasks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "search_submissions" ADD CONSTRAINT "search_submissions_content_item_id_content_items_id_fk" FOREIGN KEY ("content_item_id") REFERENCES "public"."content_items"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "seo_audits" ADD CONSTRAINT "seo_audits_content_item_id_content_items_id_fk" FOREIGN KEY ("content_item_id") REFERENCES "public"."content_items"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "ai_generations_validation_idx" ON "ai_generations" USING btree ("validation_status");--> statement-breakpoint
CREATE INDEX "ai_generations_created_idx" ON "ai_generations" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "analytics_daily_unique" ON "analytics_daily" USING btree ("content_item_id","date");--> statement-breakpoint
CREATE INDEX "analytics_daily_date_idx" ON "analytics_daily" USING btree ("date");--> statement-breakpoint
CREATE UNIQUE INDEX "content_items_sanity_id_unique" ON "content_items" USING btree ("sanity_id");--> statement-breakpoint
CREATE INDEX "content_items_url_idx" ON "content_items" USING btree ("url");--> statement-breakpoint
CREATE INDEX "index_status_checks_content_idx" ON "index_status_checks" USING btree ("content_item_id");--> statement-breakpoint
CREATE INDEX "index_status_checks_checked_idx" ON "index_status_checks" USING btree ("checked_at");--> statement-breakpoint
CREATE INDEX "job_runs_status_idx" ON "job_runs" USING btree ("status");--> statement-breakpoint
CREATE INDEX "job_runs_created_idx" ON "job_runs" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "search_submissions_provider_idx" ON "search_submissions" USING btree ("provider");--> statement-breakpoint
CREATE INDEX "search_submissions_status_idx" ON "search_submissions" USING btree ("status");--> statement-breakpoint
CREATE INDEX "search_submissions_submitted_idx" ON "search_submissions" USING btree ("submitted_at");