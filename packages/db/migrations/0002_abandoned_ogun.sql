CREATE TABLE "analytics_ga4_daily" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content_item_id" uuid,
	"page_url" text NOT NULL,
	"date" date NOT NULL,
	"sessions" integer DEFAULT 0 NOT NULL,
	"engaged_sessions" integer DEFAULT 0 NOT NULL,
	"conversions" numeric(12, 2),
	"revenue" numeric(14, 2),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "prompt_templates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"content_type" text NOT NULL,
	"system_prompt" text NOT NULL,
	"user_prompt_template" text NOT NULL,
	"variables" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "ai_generations" ADD COLUMN "og_image_asset_id" text;--> statement-breakpoint
ALTER TABLE "analytics_ga4_daily" ADD CONSTRAINT "analytics_ga4_daily_content_item_id_content_items_id_fk" FOREIGN KEY ("content_item_id") REFERENCES "public"."content_items"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "analytics_ga4_daily_unique" ON "analytics_ga4_daily" USING btree ("page_url","date");--> statement-breakpoint
CREATE INDEX "analytics_ga4_daily_date_idx" ON "analytics_ga4_daily" USING btree ("date");--> statement-breakpoint
CREATE INDEX "analytics_ga4_daily_content_date_idx" ON "analytics_ga4_daily" USING btree ("content_item_id","date");--> statement-breakpoint
CREATE INDEX "prompt_templates_content_type_idx" ON "prompt_templates" USING btree ("content_type");--> statement-breakpoint
CREATE UNIQUE INDEX "prompt_templates_name_content_type_unique" ON "prompt_templates" USING btree ("name","content_type");--> statement-breakpoint
ALTER TABLE "ai_generations" ADD CONSTRAINT "ai_generations_template_id_prompt_templates_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."prompt_templates"("id") ON DELETE no action ON UPDATE no action;