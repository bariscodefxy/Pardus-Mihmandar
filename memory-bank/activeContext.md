# Active Context

## Current Phase
Web frontend account integration phase completed for MVP scope. Backend is locally runnable/tested but intentionally private and ignored by Git.

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

## Verification Completed
Backend verification:
- `php artisan test` passes: 2 tests, 8 assertions.

Frontend verification:
- `npm run --prefix web/frontend check` passes: 0 errors, 0 warnings.
- `npm run --prefix web/frontend build` passes.

Desktop/Rust verification from previous phase:
- `cargo check` in `app/src-tauri` passes.
- `npm run tauri -- build --no-bundle` passes.

## Known Issues / Constraints
- Rustup shim reports metadata/path issues; direct toolchain binaries work and are preferred.
- Full installer bundling has not been run; only `--no-bundle` Tauri build was verified.
- Web frontend `npm audit` reports 3 low-severity vulnerabilities through SvelteKit's transitive `cookie` dependency. `npm audit fix --force` would apply a breaking downgrade path, so it was not applied.
- Symfony Process/Laravel commands need `TMP` and `TEMP` redirected to a writable workspace-local temp directory on this machine.
- PowerShell constrained language mode emits a noisy output-encoding warning; it has been non-blocking.

## Current Visible Git Changes
Current frontend-focused changes include:
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
Start desktop app API integration to match web functionality:
1. Desktop login/session wiring to backend auth endpoints.
2. Desktop provider settings sync with backend endpoints.
3. Desktop usage/credits fetch in app shell.
4. Keep local provider mode separated from hosted credits logic.

## Important Safety Constraint
Do not let AI-generated commands run automatically. The app may explain and prepare commands, but execution must require explicit approval through a safety pipeline.
