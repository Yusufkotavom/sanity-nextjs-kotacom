# Bugfix Requirements Document: Schedule System Clarity Fix

## Introduction

The AI Content Scheduler system currently has a fundamental usability issue where the purpose and behavior of schedules are unclear to users. The system only supports one type of schedule (AI Generation + Auto-Publish) but this is not explicitly communicated, and there is no way to schedule publishing of manually-created content. This creates confusion about what schedules actually do and prevents users from building a publishing queue workflow for content created through manual generation flows (`/dashboard/ai/generate` or `/dashboard/ai/ideas`).

This bugfix addresses the usability gap by introducing two distinct schedule types with clear purposes, adding a publishing queue mechanism with FIFO selection, and enabling manual content to be marked as "Ready to Publish" so it can enter the publishing queue.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN a user creates a schedule THEN the system does not clearly indicate whether the schedule is for AI generation or for publishing existing content

1.2 WHEN a user views the schedule list THEN there is no visual distinction between schedule purposes (all schedules look the same)

1.3 WHEN a user creates content manually via `/dashboard/ai/generate` or `/dashboard/ai/ideas` THEN that content cannot be scheduled for future publishing

1.4 WHEN a schedule runs THEN there is no configurable selection rule for which content to publish (no FIFO, no filtering by content type)

1.5 WHEN a user wants to publish only ready content THEN there is no "Ready to Publish" flag to mark content as queue-eligible

1.6 WHEN multiple content items are ready to publish THEN there is no deterministic ordering (oldest-first) for which items get published

1.7 WHEN a user wants to control batch size for publishing THEN there is no configuration option for how many items to publish per schedule run

### Expected Behavior (Correct)

2.1 WHEN a user creates a schedule THEN the system SHALL require selecting a schedule type: "AI Generation + Auto-Publish" or "Publishing Queue"

2.2 WHEN a user views the schedule list THEN the system SHALL display the schedule type clearly with distinct visual indicators (badges or icons)

2.3 WHEN a user creates content manually THEN the system SHALL provide a "Ready to Publish" toggle that marks content as eligible for the publishing queue

2.4 WHEN a "Publishing Queue" schedule runs THEN the system SHALL select content where `readyToPublish = true` AND `sanityWriteStatus != 'success'`

2.5 WHEN a "Publishing Queue" schedule runs THEN the system SHALL apply FIFO ordering (oldest `createdAt` first) to select which content to publish

2.6 WHEN a "Publishing Queue" schedule is configured THEN the system SHALL allow filtering by content type (post/service/product) in the schedule payload

2.7 WHEN a "Publishing Queue" schedule is configured THEN the system SHALL allow setting a batch size for how many items to publish per run

2.8 WHEN an "AI Generation + Auto-Publish" schedule runs THEN the system SHALL generate new content and immediately publish it (existing behavior)

2.9 WHEN content is published via "Publishing Queue" THEN the system SHALL update `sanityWriteStatus` to 'success' and set `sanityDocumentId`

2.10 WHEN a user views the AI generations list THEN the system SHALL display the "Ready to Publish" status for each content item

### Unchanged Behavior (Regression Prevention)

3.1 WHEN an existing "AI Generation + Auto-Publish" schedule runs THEN the system SHALL CONTINUE TO generate content using AI providers and publish automatically

3.2 WHEN a schedule is enabled/disabled THEN the system SHALL CONTINUE TO respect the enabled flag and only run enabled schedules

3.3 WHEN a schedule's cron expression triggers THEN the system SHALL CONTINUE TO calculate next run time correctly based on timezone

3.4 WHEN content generation fails THEN the system SHALL CONTINUE TO log errors and mark validation status appropriately

3.5 WHEN OG image generation is enabled THEN the system SHALL CONTINUE TO generate images for content items

3.6 WHEN a user deletes a schedule THEN the system SHALL CONTINUE TO soft-delete by setting enabled to false

3.7 WHEN the cron worker runs THEN the system SHALL CONTINUE TO validate CRON_SECRET before processing

3.8 WHEN content is generated with auto-publish disabled THEN the system SHALL CONTINUE TO store content without publishing to Sanity
