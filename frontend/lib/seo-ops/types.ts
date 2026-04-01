export type IndexEngine = "google" | "indexnow" | "bing";

export type JobTaskStatus = "queued" | "processing" | "success" | "failed" | "skipped";

export type SeoJobTask = {
  id: string;
  url: string;
  engine: IndexEngine;
  status: JobTaskStatus;
  message?: string;
  attempts: number;
  updatedAt: string;
};

export type SeoIndexingJob = {
  id: string;
  reason: string;
  source: "manual" | "webhook" | "retry";
  urls: string[];
  engines: IndexEngine[];
  createdAt: string;
  updatedAt: string;
  status: "queued" | "processing" | "done" | "partial" | "failed";
  tasks: SeoJobTask[];
};

export type SeoOpsRuntimeConfig = {
  authConfigured: boolean;
  google: {
    enabled: boolean;
    aggressive: boolean;
    hasCredentials: boolean;
  };
  indexNow: {
    enabled: boolean;
    endpoint: string;
    hasKey: boolean;
    host: string;
  };
  webhook: {
    autoSubmitEnabled: boolean;
  };
  defaults: {
    maxBatchSize: number;
    retryAttempts: number;
  };
};
