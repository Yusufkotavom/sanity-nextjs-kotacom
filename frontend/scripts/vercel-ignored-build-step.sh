#!/bin/bash
# Vercel Ignored Build Step Script
#
# Vercel runs this script before building. If it exits with code 0, the build
# is SKIPPED. If it exits with code 1, the build PROCEEDS.
#
# Docs: https://vercel.com/docs/projects/overview#ignored-build-step
#
# Logic: Only build if changes exist in paths that affect the frontend.

WATCHED_PATHS=(
  "frontend/"
  "packages/"
  "pnpm-lock.yaml"
  "package.json"
  "pnpm-workspace.yaml"
)

echo "🔍 Checking for changes relevant to frontend build..."
echo "HEAD commit: $VERCEL_GIT_COMMIT_SHA"
echo "Previous commit: $VERCEL_GIT_PREVIOUS_SHA"

# If no previous SHA (first deploy), always build
if [ -z "$VERCEL_GIT_PREVIOUS_SHA" ] || [ "$VERCEL_GIT_PREVIOUS_SHA" = "0000000000000000000000000000000000000000" ]; then
  echo "✅ First deploy or no previous SHA — proceeding with build"
  exit 1
fi

# Check if any watched paths changed
for path in "${WATCHED_PATHS[@]}"; do
  if git diff --quiet "$VERCEL_GIT_PREVIOUS_SHA" "$VERCEL_GIT_COMMIT_SHA" -- "$path"; then
    : # No changes in this path, continue
  else
    echo "✅ Changes detected in: $path — proceeding with build"
    exit 1
  fi
done

echo "⏭️  No frontend-relevant changes detected. Skipping build."
exit 0
