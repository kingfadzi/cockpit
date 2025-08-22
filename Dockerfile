# ---------- Build stage ----------
FROM node:20-alpine AS build
WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm ci

# Build app
COPY . .
# If you use env-based API URLs at build time, set VITE_* here via --build-arg or env
RUN npm run build

# ---------- Runtime stage ----------
FROM nginx:1.27-alpine

# For envsubst
RUN apk add --no-cache bash gettext

# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx config template + entrypoint
COPY deploy/nginx.conf.template /etc/nginx/templates/default.conf.template
COPY deploy/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80
CMD ["/entrypoint.sh"]