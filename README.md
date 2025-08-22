# Governance Cockpit (Themed + Actionable KPIs)

## Quick Start
```bash
cp .env.example .env.local   # edit VITE_API_BASE if needed
pnpm install
pnpm dev
# open http://localhost:5173
```

### Environment
- `VITE_API_BASE` - Backend base URL (e.g., http://localhost:8080)
- `VITE_USE_MOCK` - Set `1` to use local mock data (no backend required)

### New
- Severity-based icon/color mapping
- Heroicons integrated
- Actionable KPI tiles (clickable + tooltips + subtext)
- `/po/evidence` portfolio view with query filter
