"use client";

import { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type IndexingJob = {
  id: string;
  reason: string;
  source: string;
  createdAt: string;
  status: string;
  tasks: Array<{ status: string }>;
};

export default function SeoIndexingPage() {
  const [urlInput, setUrlInput] = useState("");
  const [reason, setReason] = useState("manual dashboard submit");
  const [jobs, setJobs] = useState<IndexingJob[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadJobs() {
    const response = await fetch("/api/seo/indexing/jobs");
    const data = await response.json();
    if (response.ok) setJobs(data.jobs || []);
  }

  useEffect(() => {
    void loadJobs();
  }, []);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const urls = urlInput
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const response = await fetch("/api/seo/indexing/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ urls, reason }),
    });
    const data = await response.json();
    setLoading(false);
    setMessage(data?.message || (response.ok ? "Submitted." : "Submit failed."));

    if (response.ok) {
      setUrlInput("");
      void loadJobs();
    }
  }

  async function retry(jobId: string) {
    await fetch("/api/seo/indexing/retry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobId }),
    });
    void loadJobs();
  }

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-lg font-semibold">Manual Submit</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Submit one or multiple URLs (one URL per line) to enabled indexing engines.
        </p>

        <form onSubmit={submit} className="mt-4 space-y-3">
          <textarea
            className="w-full min-h-40 rounded-md border bg-background p-3 text-sm"
            placeholder="https://www.kotacom.id/page-a"
            value={urlInput}
            onChange={(event) => setUrlInput(event.target.value)}
          />
          <Input value={reason} onChange={(event) => setReason(event.target.value)} />
          <Button type="submit" disabled={loading || !urlInput.trim()}>
            {loading ? "Submitting..." : "Submit Indexing"}
          </Button>
          {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}
        </form>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Recent Jobs</h2>
        <div className="mt-3 space-y-3">
          {jobs.length === 0 ? (
            <p className="text-sm text-muted-foreground">No jobs yet.</p>
          ) : (
            jobs.slice(0, 20).map((job) => {
              const success = job.tasks.filter((task) => task.status === "success").length;
              const failed = job.tasks.filter((task) => task.status === "failed").length;
              return (
                <div key={job.id} className="rounded-md border p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-medium">{job.reason}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(job.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Status: {job.status} • Success: {success} • Failed: {failed}
                  </p>
                  {failed > 0 ? (
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-2"
                      onClick={() => retry(job.id)}
                    >
                      Retry Failed
                    </Button>
                  ) : null}
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
