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
- Created local `web/backend/composer.lock`.
- Added Laravel runtime files: `artisan`, `bootstrap/app.php`, `bootstrap/providers.php`, `public/index.php`, `routes/console.php`.
- Added minimal Laravel config files needed to boot and test the API.
- Added `AppServiceProvider` and named rate limiters for `auth` and `chat`.
- Added Sanctum personal access token migration.
- Added `phpunit.xml` using SQLite in-memory database for tests.
- Generated backend `APP_KEY` in ignored local `.env`.
- Fixed authenticated user-id access in API controllers.
- Added backend factory autoloading to `composer.json`.

### Backend Scaffold
Current local backend includes:
- API route skeleton in `web/backend/routes/api.php`
- Auth, credit, chat, provider, and device controllers
- Register/login/chat/provider request validation classes
- User, credit, AI request, provider setting, and device models
- Credit service, hosted AI service skeleton, provider test service
- Core database migration covering MVP entities
- Demo database seeder and user factory
- OpenAPI skeleton
- Dockerfile and docker-compose
- Basic auth and credit feature tests

### Frontend Scaffold
Added:
- SvelteKit-oriented config and strict TypeScript config
- Dark-mode-first global CSS tokens
- Landing page
- Login/register pages
- Dashboard, credits, usage, providers, docs, settings pages
- API client helper
- Shared page card component

### Desktop Scaffold
Added:
- Tauri config and Rust crate skeleton
- Svelte desktop shell UI
- Chat area skeleton
- Hosted/local provider selector
- Local Ollama/LM Studio selector
- Safe command review panel
- TypeScript command risk classifier
- Rust safe system info command
- Rust provider test command placeholders

### Verification
Completed:
- PHP syntax check passed for 27 backend PHP files.
- JSON validation passed for backend/frontend/app JSON config files.
- UTF-8 BOM was stripped from PHP/JSON/source files where it blocked parsing.
- `php artisan about` boots the backend when `TMP` and `TEMP` point to workspace-local temp.
- `php artisan test` passes: 2 tests, 8 assertions.
- Git status after rehiding backend no longer lists backend files.

### Current Status
- Backend dependencies are installed and backend tests pass locally, but `web/backend/` is intentionally ignored/private.
- Web frontend source files are scaffolded but dependencies are not installed.
- Desktop app source files are scaffolded but dependencies are not installed.
- Full frontend/desktop builds have not run because Node/Rust tooling is unavailable.

### Local Tooling Notes
- PHP is available as `C:\php\php.exe`, version 8.5.1.
- Composer is available, version 2.9.5.
- Composer dependency install required escalation for network access to Packagist.
- Laravel/Symfony commands need workspace-local `TMP` and `TEMP`; default `C:\Users\Baris\AppData\Local\Temp` is not writable/usable.
- `npm` is not available in PATH.
- `cargo` and `rustc` are not available in PATH.
- `winget` and `choco` are not available in PATH.
- PowerShell constrained language mode prints a noisy output-encoding warning; this warning is non-blocking.

### Next Recommended Step
Install or expose Node.js/npm and Rust/Cargo in PATH, then verify frontend and desktop:
1. `cd web/frontend && npm install && npm run build`
2. `cd app && npm install && npm run build`
3. `cd app && npm run tauri dev` after Rust/Cargo and Tauri prerequisites are ready.
