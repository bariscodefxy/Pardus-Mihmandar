# Active Context

## Current Phase
Backend runtime setup was completed locally, but the backend directory is intentionally private and ignored by Git. Frontend and desktop dependency installation remain blocked by missing Node/npm and Rust/Cargo.

## Latest User Request
Hide the backend repository again and record in Memory Bank that this was intentional because the backend should not be public.

## Important Repository Privacy Decision
`web/backend/` must remain ignored in `.gitignore` because the user does not want the backend to be public.

This is intentional and must not be treated as a mistake. Do not remove the `web/backend/` ignore rule unless the user explicitly asks to make backend files public/tracked.

## Latest Work Completed
- Restored `.gitignore` rule: `web/backend/`.
- Verified Git status no longer lists backend files as untracked.
- Backend still exists locally and was previously made runnable/testable, but it is intentionally hidden from Git.

## Local Backend Status
Completed locally before rehiding backend:
- Ran `composer install` successfully in `web/backend` using workspace-local Composer temp/cache directories.
- Added Laravel runtime entrypoints: `artisan`, `bootstrap/app.php`, `bootstrap/providers.php`, `public/index.php`, and `routes/console.php`.
- Added minimal Laravel config files for app, auth, database, cache, session, logging, hashing, Sanctum, and Mihmandar settings.
- Added `AppServiceProvider` with named rate limiters for `auth` and `chat` routes.
- Added Sanctum `personal_access_tokens` migration.
- Added `phpunit.xml` for SQLite in-memory tests.
- Copied root `.env.example` into `web/backend/.env` and generated `APP_KEY`.
- Added `Database\\Factories\\` autoload-dev mapping in backend `composer.json`.
- Fixed authenticated controllers to use `request()->user()->id` instead of route parameter `request()->id()`.

## Verification Completed
- `composer install` completed successfully and created local `web/backend/composer.lock`.
- `php artisan about` successfully booted Laravel 12.58.0 with PHP 8.5.1 after temp variables were redirected.
- `php artisan test` passed: 2 tests, 8 assertions.
- Backend tests passing:
  - `Tests\\Feature\\AuthTest`
  - `Tests\\Feature\\CreditTest`

## Current Constraints
- `npm` is not available in PATH.
- `cargo` and `rustc` are not available in PATH.
- `winget` and `choco` are not available in PATH, so Node/Rust cannot be installed automatically from this shell.
- Symfony Process/Laravel commands need `TMP` and `TEMP` redirected to a writable workspace-local temp directory on this machine.
- PowerShell constrained language mode emits a noisy output-encoding warning; it has been non-blocking.

## Next Recommended Step
Install or expose Node.js/npm and Rust/Cargo in PATH, then run:
1. `cd web/frontend && npm install && npm run build`
2. `cd app && npm install && npm run build`
3. After Rust/Cargo and Tauri prerequisites are ready: `cd app && npm run tauri dev`

For backend commands on this machine, keep backend local/private and set temp variables first:
```powershell
cd C:\Users\Baris\Desktop\projeler\Pardus-Mihmandar\web\backend
New-Item -ItemType Directory -Force .tmp\php-temp | Out-Null
$env:TMP=(Resolve-Path .tmp\php-temp).Path
$env:TEMP=(Resolve-Path .tmp\php-temp).Path
php artisan test
```

## Important Safety Constraint
Do not let AI-generated commands run automatically. The app may explain and prepare commands, but execution must require explicit approval through a safety pipeline.
