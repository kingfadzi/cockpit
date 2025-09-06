# Deployment Configuration Guide

This document explains how to configure the Governance Cockpit for different environments.

## Environment Files

### `.env.local` - Local Development
Used for local development with localhost backend services.
```bash
# Uses localhost for both main API and audit API
BACKEND_BASE_URL=http://localhost:8080
AUDIT_API_BASE_URL=http://localhost:8081
```

### `.env.mars` - mars.butterflycluster.com Development
Used for development deployment pointing to mars.butterflycluster.com backend services.
```bash
# Uses mars.butterflycluster.com for both main API and audit API
BACKEND_BASE_URL=http://mars.butterflycluster.com:8080
AUDIT_API_BASE_URL=http://mars.butterflycluster.com:8081
```

### `.env.example` - Documentation
Template showing all available configuration options.

## Docker Compose Usage

### For mars.butterflycluster.com deployment:
```bash
# Uses .env.mars configuration
docker-compose up -d
```

### For local development:
```bash
# Uses .env.local configuration (via docker-compose.override.yml)
docker-compose -f docker-compose.yaml -f docker-compose.override.yml up -d
```

### For custom environment:
```bash
# Create your own .env file and override the env_file in docker-compose.yaml
cp .env.example .env.prod
# Edit .env.prod with your settings
# Then modify docker-compose.yaml env_file to use .env.prod
```

## API Proxying

The Docker container uses nginx to proxy API requests:

- **Main API**: `/api/*` → `${BACKEND_BASE_URL}`
- **Audit API**: `/audit/*` → `${AUDIT_API_BASE_URL}`

## Development Server (npm run dev)

For development server, configuration is handled via:

- **Vite Proxy**: Routes requests through development server proxy
- **Environment Variables**: `VITE_API_TARGET` and `VITE_AUDIT_API_TARGET`

## Configuration Hierarchy

1. **Development Server**: Uses Vite proxy with `VITE_*_TARGET` variables
2. **Docker Local**: Uses `docker-compose.override.yml` → `.env.local`
3. **Docker Mars**: Uses `docker-compose.yaml` → `.env.mars`
4. **Production**: Set environment variables directly in deployment system

## Quick Commands

```bash
# Local development server
npm run dev

# Local Docker development
docker-compose -f docker-compose.yaml -f docker-compose.override.yml up -d

# mars.butterflycluster.com deployment
docker-compose up -d

# Build and deploy with custom environment
export BACKEND_BASE_URL=https://api.prod.com:8080
export AUDIT_API_BASE_URL=https://audit.prod.com:8081
docker-compose up -d
```