# ---------- Build stage ----------
FROM node:20-alpine AS build
WORKDIR /app

# Build arguments for environment variables
ARG VITE_API_BASE
ARG VITE_AUDIT_API_BASE  
ARG VITE_USE_MOCK

# Set environment variables for build
ENV VITE_API_BASE=$VITE_API_BASE
ENV VITE_AUDIT_API_BASE=$VITE_AUDIT_API_BASE
ENV VITE_USE_MOCK=$VITE_USE_MOCK

# Install deps
COPY package*.json ./
RUN npm ci

# Build app
COPY . .
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