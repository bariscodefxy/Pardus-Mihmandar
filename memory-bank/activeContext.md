# Active Context

## Current Phase
Backend API completion phase finished for MVP endpoint scope; desktop safe-command flow integrated. Backend remains locally runnable/tested and intentionally private/ignored by Git.

## Latest User Request
Continue implementation and keep Memory Bank up to date.

## Important Repository Privacy Decision
`web/backend/` must remain ignored in `.gitignore` because the user does not want the backend to be public.

This is intentional and must not be treated as a mistake. Do not remove the `web/backend/` ignore rule unless the user explicitly asks to make backend files public/tracked.

## Latest Work Completed
Completed web API integration for auth and account pages:
- Added auth session store (`web/frontend/src/lib/stores/auth.ts`) with local persistence.
- Wired register page to `/api/auth/register` with loading and error handling.
- Wired login page to `/api/auth/login` with loading and error handling.
- Wired dashboard to `/api/me` and `/api/credits`, and added logout via `/api/auth/logout`.
- Wired usage page to `/api/usage` with loading/empty/error states.
- Wired providers page to:
  - `/api/providers`
  - `/api/provider-settings`
  - `/api/provider-settings` (save)
  - `/api/providers/test` (connection test)
- Wired credits page to:
  - `/api/credits`
  - `/api/credits/transactions`
- Wired settings page to:
  - `/api/me`
  - `/api/devices`
  - `/api/devices/{id}` (revoke)

Completed desktop MVP integration updates:
- Added desktop API client and local session store:
  - `app/src/lib/api/client.ts`
  - `app/src/lib/stores/session.ts`
- Wired desktop login/logout/session flow to backend auth endpoints.
- Wired desktop workspace load to `/api/me`, `/api/credits`, `/api/provider-settings`.
- Added provider settings save flow from desktop to `/api/provider-settings`.
- Added desktop chat pipeline:
  - Hosted mode -> `/api/chat`
  - Local mode -> direct Ollama (`/api/chat`) or LM Studio (`/v1/chat/completions`)
- Fixed hosted chat request contract mismatch in desktop client:
  - Send `message` string and consume backend `reply` field.
- Added desktop provider connection test button/flow:
  - Hosted: token/session validation via `/api/me`
  - Ollama: `GET {baseUrl}/api/tags`
  - LM Studio: `GET {baseUrl}/v1/models`
- Fixed desktop blank screen on Svelte 5 by replacing `new App(...)` with `mount(...)` in:
  - `app/src/main.ts`

Completed desktop safety flow updates:
- Added structured command safety review card in desktop app with:
  - What it does
  - Why it may be needed
  - What can go wrong
  - Safer alternatives
  - Explicit confirmation gate
- Added detected command suggestion extraction from assistant responses and "Review safely" action.
- Added audit logging calls from desktop safety flow for:
  - `command.reviewed`
  - `command.approval_requested`

Completed backend API expansion:
- Added `audit_logs` backend API:
  - `GET /api/audit-logs`
  - `POST /api/audit-logs`
- Added missing content/conversation APIs:
  - `GET/POST /api/workspaces`
  - `GET/POST /api/pages`
  - `GET/POST /api/notes`
  - `GET/POST /api/tasks`
  - `GET/POST /api/snippets`
  - `GET/POST /api/conversations`
- Added missing backend tables/models/requests/controllers for:
  - `pages`
  - `conversations`
  - `conversation_messages`
  - `audit_logs`

Completed production frontend hardening:
- Implemented production-ready website redesign with modern dark-mode-first shadcn/ui-style visual system.
- Added sticky responsive app shell navigation and polished landing/docs surfaces.
- Added route-level auth guard in `web/frontend/src/routes/+layout.svelte` to prevent protected-page flash before redirect.
- Standardized loading/error/empty states across protected pages with reusable status styling.
- Added accessibility improvements (`role=status`, `role=alert`, `aria-live`).

Completed frontend deploy readiness:
- Switched SvelteKit from `@sveltejs/adapter-auto` to `@sveltejs/adapter-node`.
- Added production frontend Docker runtime files:
  - `docker/frontend/Dockerfile`
  - `docker/frontend/docker-compose.yml`
  - `docker/frontend/README.md`
- Updated deployment environment defaults in `.env.example`:
  - `VITE_API_BASE_URL`
  - `FRONTEND_PORT`
  - `ORIGIN`
- Updated deploy commands in `README.md` and `docs/development.md`.

## Verification Completed
Backend verification:
- `php artisan test` passes: 4 tests, 29 assertions.
- `php artisan route:list --path=api` confirms required API routes are registered.

Frontend verification:
- `npm run --prefix web/frontend check` passes: 0 errors, 0 warnings.
- `npm run --prefix web/frontend build` passes.

Desktop frontend verification:
- `npm run --prefix app build` passes after desktop integration and Svelte 5 bootstrap fix.
- `npm run --prefix app build` passes after safety review + command suggestion + audit integration updates.

Frontend hardening/deploy verification:
- `npm run --prefix web/frontend check` passes after auth guard and UX state consistency pass.
- `npm run --prefix web/frontend build` passes after auth guard and UX state consistency pass.
- `npm run --prefix web/frontend check` passes after `adapter-node` migration.
- `npm run --prefix web/frontend build` passes with `adapter-node` active.

## Known Issues / Constraints
- Cargo is currently not on PATH in this shell/session for Tauri CLI (`cargo metadata` not found).
- Rustup shim reports metadata/path issues; direct toolchain binaries work and are preferred.
- Full installer bundling has not been run in current state.
- Web frontend `npm audit` reports 3 low-severity vulnerabilities through SvelteKit's transitive `cookie` dependency. `npm audit fix --force` would apply a breaking downgrade path, so it was not applied.
- Symfony Process/Laravel commands need `TMP` and `TEMP` redirected to backend-local writable temp path (`web/backend/storage/tmp`) on this machine.
- PowerShell constrained language mode emits a noisy output-encoding warning; it has been non-blocking.

## Current Visible Git Changes
Current visible desktop-focused changes include:
- `app/src/main.ts`
- `app/src/App.svelte`
- `app/src/lib/api/client.ts`
- `app/src/lib/stores/session.ts`

Earlier frontend-focused changes include:
- `web/frontend/src/lib/api/client.ts`
- `web/frontend/src/lib/stores/auth.ts`
- `web/frontend/src/routes/login/+page.svelte`
- `web/frontend/src/routes/register/+page.svelte`
- `web/frontend/src/routes/dashboard/+page.svelte`
- `web/frontend/src/routes/usage/+page.svelte`
- `web/frontend/src/routes/providers/+page.svelte`
- `web/frontend/src/routes/credits/+page.svelte`
- `web/frontend/src/routes/settings/+page.svelte`
- `web/frontend/src/app.css`

Backend files remain hidden by `web/backend/` ignore rule.

## Next Recommended Step
Finalize release documentation and demo artifacts:
1. Capture updated website screenshots for `docs/screenshots`.
2. Add end-to-end local demo runbook (backend + frontend + desktop login path).
3. Update API docs/OpenAPI skeleton to include all newly added backend endpoint groups.
4. Keep backend private (`web/backend/` ignored) unless user explicitly requests publication.

## Important Safety Constraint
Do not let AI-generated commands run automatically. The app may explain and prepare commands, but execution must require explicit approval through a safety pipeline.
