-- Create schedule_type enum
CREATE TYPE "public"."schedule_type" AS ENUM('ai_generation', 'publishing_queue');--> statement-breakpoint

-- Add scheduleType field to scheduled_tasks table
ALTER TABLE "scheduled_tasks" ADD COLUMN "schedule_type" "schedule_type" DEFAULT 'ai_generation' NOT NULL;--> statement-breakpoint

-- Update all existing schedules to have scheduleType = 'ai_generation' for backward compatibility
-- (This is handled by the DEFAULT value above, but explicitly documenting the intent)
UPDATE "scheduled_tasks" SET "schedule_type" = 'ai_generation' WHERE "schedule_type" IS NULL;--> statement-breakpoint

-- Add index on readyToPublish field in ai_generations table for efficient querying
CREATE INDEX IF NOT EXISTS "ai_generations_ready_to_publish_idx" ON "ai_generations" USING btree ("ready_to_publish");--> statement-breakpoint

-- Create content_ideas table (from previous schema changes)
CREATE TABLE IF NOT EXISTS "content_ideas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"topic" text NOT NULL,
	"content_type" text NOT NULL,
	"idea" text NOT NULL,
	"outline" text,
	"generation_id" uuid,
	"status" text DEFAULT 'idea' NOT NULL,
	"audience" text,
	"keyword" text,
	"word_count" text,
	"location" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint

-- Add foreign key constraint for content_ideas
DO $$ BEGIN
 ALTER TABLE "content_ideas" ADD CONSTRAINT "content_ideas_generation_id_ai_generations_id_fk" FOREIGN KEY ("generation_id") REFERENCES "public"."ai_generations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;--> statement-breakpoint

-- Add indexes for content_ideas
CREATE INDEX IF NOT EXISTS "content_ideas_status_idx" ON "content_ideas" USING btree ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "content_ideas_created_idx" ON "content_ideas" USING btree ("created_at");
