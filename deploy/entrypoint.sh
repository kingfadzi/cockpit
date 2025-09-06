#!/usr/bin/env bash
set -euo pipefail

: "${BACKEND_BASE_URL:?BACKEND_BASE_URL env var is required}"
: "${AUDIT_API_BASE_URL:?AUDIT_API_BASE_URL env var is required}"

# Render Nginx config from template using both BACKEND_BASE_URL and AUDIT_API_BASE_URL
envsubst '${BACKEND_BASE_URL} ${AUDIT_API_BASE_URL}' \
  < /etc/nginx/templates/default.conf.template \
  > /etc/nginx/conf.d/default.conf

# Log the configuration for debugging
echo "Nginx configuration:"
echo "  Main API proxy: /api/* -> ${BACKEND_BASE_URL}"
echo "  Audit API proxy: /audit/* -> ${AUDIT_API_BASE_URL}"

# Start Nginx in foreground
exec nginx -g 'daemon off;'