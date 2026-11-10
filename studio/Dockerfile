# Multi-stage build for the Kotacom Sanity Studio (project b017f7tl).
# Deployed for kotacom.id at https://studio.kotacom.id
#
# The workspace is narrowed to `studio` only so `pnpm install` resolves without
# the frontend/seo-dashboard/worker workspace members (their manifests are not
# copied into this build context).

# ---- Builder ----
FROM node:22-alpine AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.19.0 --activate

# Root manifests (used by pnpm for the whole workspace)
COPY package.json pnpm-lock.yaml* ./
COPY studio/package.json ./studio/

# Restrict the workspace to just the studio package for this image
RUN printf 'packages:\n  - "studio"\n' > pnpm-workspace.yaml

RUN pnpm install --no-frozen-lockfile

# Studio sources
COPY studio/ ./studio/

# Project the studio edits. Overridable via Dokploy build args if needed.
ARG SANITY_STUDIO_PROJECT_ID=b017f7tl
ARG SANITY_STUDIO_DATASET=production
ARG SANITY_STUDIO_API_VERSION=2026-03-23
ENV SANITY_STUDIO_PROJECT_ID=${SANITY_STUDIO_PROJECT_ID}
ENV SANITY_STUDIO_DATASET=${SANITY_STUDIO_DATASET}
ENV SANITY_STUDIO_API_VERSION=${SANITY_STUDIO_API_VERSION}

WORKDIR /app/studio
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN pnpm build

# ---- Runner ----
FROM node:22-alpine AS runner
WORKDIR /app

# Static file server for the built studio SPA (SPA fallback for client routes)
RUN npm install -g serve

COPY --from=builder /app/studio/dist ./dist

EXPOSE 3333
CMD ["serve", "-s", "dist", "-l", "3333"]
