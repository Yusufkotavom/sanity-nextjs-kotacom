#!/usr/bin/env bash
set -euo pipefail
node frontend/scripts/ops-upsert-sanity-content.mjs "$@"
