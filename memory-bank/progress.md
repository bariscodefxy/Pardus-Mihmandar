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

## 2026-05-07

### Frontend/Desktop Tooling Setup Completed
Completed:
- Downloaded portable Node.js `v24.15.0` into `.tools/node`.
- Added `.tools/` to `.gitignore`.
- Installed web frontend dependencies and generated `web/frontend/package-lock.json`.
- Added required SvelteKit file `web/frontend/src/app.html`.
- Added `@types/node` to web frontend dev dependencies.
- Installed desktop app dependencies and generated `app/package-lock.json`.
- Fixed desktop sidebar accessibility warnings in `app/src/App.svelte`.

### Rust/Tauri Verification Completed
Completed:
- Installed workspace-local Rust under `.tools/rustup` and `.tools/cargo`.
- Verified direct toolchain binaries:
  - `rustc 1.95.0 (59807616e 2026-04-14)`
  - `cargo 1.95.0 (f2d3ce0bd 2026-03-21)`
- Added required Tauri Windows icon: `app/src-tauri/icons/icon.ico`.
- Generated `app/src-tauri/Cargo.lock`.
- Ran `cargo check` in `app/src-tauri`: passed.
- Ran `npm run tauri -- build --no-bundle` in `app`: passed.
- Local executable created at `app/src-tauri/target/release/pardus-mihmandar.exe`.
- Added `app/src-tauri/gen/` to `.gitignore` and removed generated schema artifacts.

### Verification Summary
Completed:
- PHP syntax check passed for 27 backend PHP files.
- JSON validation passed for backend/frontend/app JSON config files.
- UTF-8 BOM was stripped from PHP/JSON/source files where it blocked parsing.
- `php artisan about` boots the backend when `TMP` and `TEMP` point to workspace-local temp.
- `php artisan test` passes: 2 tests, 8 assertions.
- Git status after rehiding backend no longer lists backend files.
- `web/frontend npm run check` passes: 0 errors, 0 warnings.
- `web/frontend npm run build` passes.
- `app npm run build` passes.
- `app/src-tauri cargo check` passes.
- `app npm run tauri -- build --no-bundle` passes.

### Current Status
- Backend dependencies are installed and backend tests pass locally, but `web/backend/` is intentionally ignored/private.
- Web frontend dependencies are installed and build/type-check pass.
- Desktop app frontend dependencies are installed and Vite build passes.
- Tauri/Rust no-bundle build passes.
- Full installer bundling has not been run.

### Local Tooling Notes
- PHP is available as `C:\php\php.exe`, version 8.5.1.
- Composer is available, version 2.9.5.
- Composer dependency install required escalation for network access to Packagist.
- Portable Node.js is available at `.tools/node`, version `v24.15.0`, npm `11.12.1`.
- Direct Rust toolchain binaries are available at `.tools/rustup/toolchains/stable-x86_64-pc-windows-msvc/bin`.
- Rustup shim in `.tools/cargo/bin` has metadata/path issues; use direct toolchain binaries when needed.
- Laravel/Symfony commands need workspace-local `TMP` and `TEMP`; default `C:\Users\Baris\AppData\Local\Temp` is not writable/usable.
- PowerShell constrained language mode prints a noisy output-encoding warning; this warning is non-blocking.

### Known Issues
- Web frontend npm audit reports 3 low-severity vulnerabilities via SvelteKit's transitive `cookie` dependency.
- `npm audit fix --force` was not applied because npm reports it would use a breaking downgrade path.
- Tauri warns that bundle identifier `tr.pardusmihmandar.app` ends with `.app`, which is not recommended for macOS. Current target is Linux-first/Windows dev, but the identifier can be changed later.
- A `git update-index --refresh` attempt hit `.git/objects` permission issues. Avoid Git metadata repair unless requested.

### Next Recommended Step
Move from scaffold verification to feature implementation:
1. Connect web login/register forms to the Laravel API.
2. Connect desktop login/provider screens to API/local provider test commands.
3. Add real safe-command review UI states and persisted snippets/notes skeleton flows.
