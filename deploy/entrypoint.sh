#!/usr/bin/env bash
set -euo pipefail

: "${BACKEND_BASE_URL:?BACKEND_BASE_URL env var is required}"

# Render Nginx config from template using BACKEND_BASE_URL
envsubst '${BACKEND_BASE_URL}' \
  < /etc/nginx/templates/default.conf.template \
  > /etc/nginx/conf.d/default.conf

# Start Nginx in foreground
exec nginx -g 'daemon off;'