export interface Env {
  OPS_API_URL: string;
  CRON_SECRET: string;
}

function resolveCronType(cron?: string) {
  switch (cron) {
    case "*/15 * * * *":
      return "drain-queues";
    case "0 * * * *":
      return "run-scheduled";
    case "0 2 * * *":
      return "submit-sitemap";
    case "0 3 * * *":
      return "pull-analytics";
    case "0 4 * * *":
      return "run-seo-audits";
    case "0 10 * * *":
      return "inspect-index";
    default:
      return "unknown";
  }
}

export default {
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    const cronType = resolveCronType(event.cron);
    if (!env.OPS_API_URL || !env.CRON_SECRET) return;

    const url = `${env.OPS_API_URL.replace(/\/+$/, "")}/api/internal/cron-run`;
    ctx.waitUntil(
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-cron-secret": env.CRON_SECRET,
        },
        body: JSON.stringify({ cron: event.cron, type: cronType }),
      }),
    );
  },
};
