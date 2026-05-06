# Progress

## 2026-05-06

### Memory Bank Initialized
Initialized project Memory Bank before writing application code.

Created files:
- `memory-bank/projectbrief.md`
- `memory-bank/productContext.md`
- `memory-bank/systemPatterns.md`
- `memory-bank/techContext.md`
- `memory-bank/activeContext.md`
- `memory-bank/progress.md`

### Initial Monorepo Scaffold Created
Created:
- Root `README.md`, `.env.example`, `.gitignore`, `LICENSE`
- `web/backend` Laravel-oriented API skeleton locally
- `web/frontend` SvelteKit-oriented website/dashboard skeleton
- `app` Tauri + Svelte + Rust desktop skeleton
- `docs` architecture/API/security/development/MVP docs
- `docker` backend/nginx deployment stubs
- `scripts` setup/dev/test helpers

### Backend Privacy Decision
The user intentionally wants `web/backend/` hidden from Git because the backend should not be public.

Current rule:
- `.gitignore` includes `web/backend/`.
- Do not remove this ignore rule unless the user explicitly asks to publish/track backend files.
- Treat backend as local/private implementation, even though it is part of the monorepo on disk.

### Backend Runtime Setup Completed Locally
Completed locally before rehiding backend from Git:
- Installed backend Composer dependencies successfully.
- Added Laravel runtime files and minimal config for boot/test.
- Added Sanctum migration and auth/credit test coverage.
- Generated backend `APP_KEY` in ignored local `.env`.

## 2026-05-07

### Frontend/Desktop Tooling Setup Completed
Completed:
- Portable Node.js installed at `.tools/node` (`v24.15.0`, npm `11.12.1`).
- Web frontend dependencies installed.
- Desktop app dependencies installed.
- Rust toolchain installed locally under `.tools/rustup` and `.tools/cargo`.

### Rust/Tauri Verification Completed
Completed:
- `cargo check` in `app/src-tauri`: passed.
- `npm run tauri -- build --no-bundle`: passed.
- Local executable produced at `app/src-tauri/target/release/pardus-mihmandar.exe`.

### Web Auth and Account API Integration Completed
Completed:
- Added auth store with local session persistence (`web/frontend/src/lib/stores/auth.ts`).
- Wired login/register flows to backend auth endpoints.
- Wired dashboard with live `/api/me` and `/api/credits` plus logout.
- Wired usage page to `/api/usage`.
- Wired providers page to provider catalog/settings/save/test endpoints.
- Wired credits page to credits balance and transaction history endpoints.
- Wired settings page to profile + devices list and device revoke endpoint.

### Verification Summary
Completed:
- `web/frontend npm run check` passes: 0 errors, 0 warnings.
- `web/frontend npm run build` passes.
- `web/backend php artisan test` passes: 2 tests, 8 assertions.
- `app/src-tauri cargo check` passes.
- `app npm run tauri -- build --no-bundle` passes.

### Current Status
- Backend is operational locally and tested, but intentionally hidden from Git.
- Web frontend is connected to backend for core account/credits/providers/usage/settings MVP flows.
- Desktop build pipelines are verified, but desktop API wiring is still pending.

### Known Issues
- Web frontend npm audit shows 3 low-severity transitive vulnerabilities (SvelteKit/cookie path).
- `npm audit fix --force` is not used because npm reports a breaking downgrade path.
- Rustup shim may report metadata issues; direct toolchain binaries are reliable.
- Full Tauri installer bundling has not been run.

### Next Recommended Step
Begin desktop API integration:
1. Desktop login/session flow with backend auth.
2. Desktop provider settings sync with backend.
3. Desktop credits/usage fetch for hosted mode.
4. Preserve strict separation: local mode must not consume hosted credits.
