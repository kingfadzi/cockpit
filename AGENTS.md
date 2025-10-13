# Repository Guidelines

## Project Structure & Module Organization
The front-end source lives in `src/`, with domain features under `src/features` (e.g., `src/features/sme` for ARB and SME dashboards), shared UI in `src/components`, and API contracts in `src/api`. Typed schemas sit in `src/schemas`, while build artifacts land in `dist/`. Deployment helpers (`Dockerfile`, `docker-compose.yaml`, `deploy/`) support containerized delivery. Follow this layout when introducing new modules so cross-domain code stays composable and discoverable.

## Build, Test, and Development Commands
Install dependencies with `npm install`. Use `npm run dev` to start the Vite dev server with hot reloads. Ship-ready bundles are produced via `npm run build`, and `npm run preview` serves the compiled output locally. Run `npm run lint` before submitting changes to ensure ESLint passes, and `npm run format` to apply Prettier across TypeScript, CSS, JSON, and Markdown assets.

## Coding Style & Naming Conventions
The codebase targets TypeScript + React 18 with MUI. Name components in PascalCase (`ArbDashboardView`) and hooks in camelCase (`useArbDashboard`). Prefer function components with arrow syntax, keep props strongly typed, and colocate lightweight styling via the `sx` prop. Formatting is handled by Prettier; ESLint enforces React, hooks, and import rules. Maintain four-space indentation consistent with existing files and reserve default exports for top-level views.

## Testing Guidelines
An automated test runner is not yet configured. When adding tests, create files alongside implementation code as `<ComponentName>.test.tsx` and plan to execute them with Vitest or another Vite-compatible runner once introduced. Until formal automation is wired up, validate critical flows manually in `npm run dev`, document coverage in the pull request, and mock network calls through the API hook layer to keep tests deterministic.

## Commit & Pull Request Guidelines
Follow the imperative, descriptive style visible in `git log` (e.g., `Add SME and ARB dashboard implementations`). Keep summaries concise (~60 characters) and add context in the body if needed. Each pull request should describe the user-facing change, list verification steps or commands run, attach screenshots for UI updates, and link the relevant issue or roadmap item. Call out testing status and any follow-up work required before merge.

## Security & Configuration Tips
Store environment-specific configuration in Vite environment files (e.g., `.env.local`) and reference them via `import.meta.env`. Do not commit secrets or production credentials. Reuse the typed API helpers in `src/api/client.ts` instead of inlining fetch calls to ensure consistent error handling and request logging across features.
