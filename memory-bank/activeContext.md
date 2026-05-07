# Active Context

## Current Phase
Desktop integration phase in progress after web frontend account integration completion. Backend is locally runnable/tested but intentionally private and ignored by Git.

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

## Verification Completed
Backend verification:
- `php artisan test` passes: 2 tests, 8 assertions.

Frontend verification:
- `npm run --prefix web/frontend check` passes: 0 errors, 0 warnings.
- `npm run --prefix web/frontend build` passes.

Desktop frontend verification:
- `npm run --prefix app build` passes after desktop integration and Svelte 5 bootstrap fix.

## Known Issues / Constraints
- Cargo is currently not on PATH in this shell/session for Tauri CLI (`cargo metadata` not found).
- Rustup shim reports metadata/path issues; direct toolchain binaries work and are preferred.
- Full installer bundling has not been run in current state.
- Web frontend `npm audit` reports 3 low-severity vulnerabilities through SvelteKit's transitive `cookie` dependency. `npm audit fix --force` would apply a breaking downgrade path, so it was not applied.
- Symfony Process/Laravel commands need `TMP` and `TEMP` redirected to a writable workspace-local temp directory on this machine.
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
Implement desktop safe command approval pipeline UI state and flow:
1. Parse/surface command suggestions in structured cards.
2. Show risk analysis fields (what it does, why needed, what can go wrong, safer alternatives).
3. Enforce explicit confirmation gate before any execution action.
4. Keep execution disabled by default and separate from model output path.

## Important Safety Constraint
Do not let AI-generated commands run automatically. The app may explain and prepare commands, but execution must require explicit approval through a safety pipeline.
