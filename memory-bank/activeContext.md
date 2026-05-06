# Active Context

## Current Phase
Initial scaffold phase. The monorepo structure and first source skeletons have been created. No dependency installation has completed yet.

## Latest User Request
Update the project Memory Bank after the initial scaffold.

## Latest Work Completed
Created the initial project scaffold:
- `web/backend` Laravel-oriented API skeleton
- `web/frontend` SvelteKit-oriented website/dashboard skeleton
- `app` Tauri + Svelte + Rust desktop skeleton
- `docs` project documentation
- `docker` deployment stubs
- `scripts` helper scripts
- Root README/configuration files

## Backend Scaffold Details
Backend includes:
- `composer.json`
- `routes/api.php`
- API controllers for auth, credits, chat, providers, and devices
- Form requests for auth, chat, and provider settings
- Models for users, credit accounts, transactions, AI requests, provider settings, and devices
- Core migration for users, credits, AI requests, provider settings, devices, workspaces, notes, tasks, snippets
- Services for credits, hosted AI skeleton, and provider tests
- OpenAPI skeleton at `web/backend/storage/api-docs/openapi.yaml`
- Dockerfile and docker-compose
- Basic feature tests for auth and credits

## Web Frontend Scaffold Details
Web frontend includes:
- SvelteKit-oriented config files
- Dark-mode-first design tokens
- Landing page
- Login/register pages
- Dashboard, credits, usage, providers, docs, settings skeleton pages
- API client helper
- Shared `PageCard` component

## Desktop Scaffold Details
Desktop app includes:
- Tauri + Svelte + TypeScript config files
- Main desktop shell UI
- Provider mode selector
- Local provider selector
- Chat UI skeleton
- Safe command review panel
- TypeScript command risk classifier
- Rust Tauri commands for system info and provider connection-test placeholders

## Verification Completed
- Backend PHP files were normalized to UTF-8 without BOM.
- JSON/config/source files were normalized to UTF-8 without BOM where needed.
- PHP syntax checks passed for all 27 backend PHP files.
- JSON validation passed for backend/frontend/app JSON config files.
- Repository currently has 90 files.

## Current Constraints
- Composer is installed, but it reported a Windows temp directory issue: PHP temp directory `C:\Users\Baris\AppData\Local\Temp` does not exist or is not writable to Composer.
- `npm` is not available in PATH.
- `cargo` is not available in PATH.
- Full backend/frontend/desktop dependency installation and builds have not been run.
- Current scaffold is manually created source structure, not yet a generated and dependency-installed Laravel/Svelte/Tauri app.

## Next Recommended Step
Fix local tooling and dependency installation:
1. Create/fix the writable Composer/PHP temp directory.
2. Install Node.js/npm or add it to PATH.
3. Install Rust/Cargo and Tauri prerequisites or add them to PATH.
4. Run `composer install` in `web/backend`.
5. Run `npm install` in `web/frontend`.
6. Run `npm install` in `app`.
7. Run backend tests and frontend/desktop builds.

## Important Constraint
Do not let AI-generated commands run automatically. The app may explain and prepare commands, but execution must require explicit approval through a safety pipeline.
