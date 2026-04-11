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
ALTER TABLE "analytics_ga4_daily" ADD CONSTRAINT "analytics_ga4_daily_content_item_id_content_items_id_fk" FOREIGN KEY ("content_item_id") REFERENCES "public"."content_items"("id") ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
CREATE UNIQUE INDEX "analytics_ga4_daily_unique" ON "analytics_ga4_daily" USING btree ("page_url","date");
--> statement-breakpoint
CREATE INDEX "analytics_ga4_daily_date_idx" ON "analytics_ga4_daily" USING btree ("date");
--> statement-breakpoint
CREATE INDEX "analytics_ga4_daily_content_date_idx" ON "analytics_ga4_daily" USING btree ("content_item_id","date");
