# ---------- Build stage ----------
FROM node:20-alpine AS build
WORKDIR /app

# Build args (optional — only if you want to bake values into the bundle)
ARG VITE_API_BASE
ARG VITE_AUDIT_API_BASE
ARG VITE_USE_MOCK

# Expose to Vite build (optional)
ENV VITE_API_BASE=$VITE_API_BASE
ENV VITE_AUDIT_API_BASE=$VITE_AUDIT_API_BASE
ENV VITE_USE_MOCK=$VITE_USE_MOCK

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---------- Runtime stage ----------
FROM nginx:1.27-alpine
RUN apk add --no-cache bash gettext

# Static files
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx template + entrypoint
COPY deploy/nginx.conf.template /etc/nginx/templates/default.conf.template
COPY deploy/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80
CMD ["/entrypoint.sh"]
