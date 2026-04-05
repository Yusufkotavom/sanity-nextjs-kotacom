# SEO Ops Worker

Cloudflare Worker for scheduled SEO operations and queue processing.

## Overview

This worker runs on Cloudflare's edge network and triggers scheduled tasks in the ops dashboard via cron triggers.

## Cron Schedule

| Schedule | Type | Description |
|----------|------|-------------|
| `*/15 * * * *` | drain-queues | Process Redis queues every 15 minutes |
| `0 * * * *` | run-scheduled | Run scheduled tasks hourly |
| `0 2 * * *` | submit-sitemap | Submit sitemap at 2 AM Asia/Jakarta |
| `0 3 * * *` | pull-analytics | Pull GSC analytics at 3 AM |
| `0 4 * * *` | run-seo-audits | Run SEO audits at 4 AM |
| `0 10 * * *` | inspect-index | Check index status at 10 AM |

## Local Development

1. Copy environment variables:
```bash
cp .dev.vars.example .dev.vars
```

2. Update `.dev.vars`:
```bash
OPS_API_URL=http://localhost:3001
CRON_SECRET=your-local-secret
```

3. Start development server:
```bash
pnpm dev
```

4. Test cron trigger:
```bash
curl "http://localhost:8787/__scheduled?cron=*/15+*+*+*+*"
```

## Production Deployment

1. Deploy to Cloudflare:
```bash
pnpm deploy
```

2. Set production secrets:
```bash
wrangler secret put OPS_API_URL
# Enter: https://your-ops-dashboard.vercel.app

wrangler secret put CRON_SECRET
# Enter: your-production-cron-secret (must match dashboard)
```

3. Verify deployment:
```bash
wrangler tail
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `OPS_API_URL` | URL of ops dashboard | `https://ops.example.com` |
| `CRON_SECRET` | Secret for authenticating cron requests | `random-32-chars` |

## How It Works

1. Cloudflare triggers worker based on cron schedule
2. Worker determines job type from cron expression
3. Worker calls ops dashboard API: `POST /api/internal/cron-run`
4. Dashboard processes the job and updates database
5. Dashboard enqueues tasks to Redis if needed

## Monitoring

View worker logs:
```bash
wrangler tail
```

View worker analytics:
```bash
wrangler metrics
```

## Troubleshooting

### Worker not triggering

1. Check cron schedule in `wrangler.toml`
2. Verify worker is deployed: `wrangler deployments list`
3. Check worker logs: `wrangler tail`

### API calls failing

1. Verify `OPS_API_URL` is correct
2. Check `CRON_SECRET` matches dashboard
3. Test dashboard endpoint manually:
```bash
curl -X POST https://your-ops-dashboard.vercel.app/api/internal/cron-run \
  -H "Content-Type: application/json" \
  -H "x-cron-secret: your-secret" \
  -d '{"cron": "*/15 * * * *", "type": "drain-queues"}'
```

## Cost

Cloudflare Workers Free Tier:
- 100,000 requests/day
- 10ms CPU time per request

With 6 cron schedules:
- 15-min: 96 requests/day
- Hourly: 24 requests/day
- Daily: 4 requests/day
- Total: ~124 requests/day

**Recommendation:** Upgrade to Workers Paid ($5/month) for production use.
