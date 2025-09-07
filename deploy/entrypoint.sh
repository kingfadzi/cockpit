#!/usr/bin/env bash
set -euo pipefail

: "${VITE_API_BASE:?VITE_API_BASE env var is required}"
: "${VITE_AUDIT_API_BASE:?VITE_AUDIT_API_BASE env var is required}"

# Normalize trailing slashes so proxy_pass ${BASE}$request_uri never yields //
VITE_API_BASE="${VITE_API_BASE%/}"
VITE_AUDIT_API_BASE="${VITE_AUDIT_API_BASE%/}"
export VITE_API_BASE VITE_AUDIT_API_BASE

# Render Nginx config from template using unified VITE variables
envsubst '${VITE_API_BASE} ${VITE_AUDIT_API_BASE}' \
  < /etc/nginx/templates/default.conf.template \
  > /etc/nginx/conf.d/default.conf

# Log the configuration for debugging
echo "Nginx configuration:"
echo "  Main API proxy:  /api/*   -> ${VITE_API_BASE}"
echo "  Audit API proxy: /audit/* -> ${VITE_AUDIT_API_BASE}"
echo "----- Rendered /etc/nginx/conf.d/default.conf -----"
cat /etc/nginx/conf.d/default.conf
echo "---------------------------------------------------"

# Start Nginx in foreground
exec nginx -g 'daemon off;'
