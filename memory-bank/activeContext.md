# Active Context

## Current Phase
Rust/Tauri verification phase completed. Backend is locally runnable/tested but intentionally private and ignored by Git.

## Latest User Request
Continue from the frontend/desktop dependency setup and complete the next blocker.

## Important Repository Privacy Decision
`web/backend/` must remain ignored in `.gitignore` because the user does not want the backend to be public.

This is intentional and must not be treated as a mistake. Do not remove the `web/backend/` ignore rule unless the user explicitly asks to make backend files public/tracked.

## Latest Work Completed
- Installed workspace-local Rust using `rustup-init` under `.tools/rustup` and `.tools/cargo`.
- Direct Rust toolchain binaries work:
  - `rustc 1.95.0 (59807616e 2026-04-14)`
  - `cargo 1.95.0 (f2d3ce0bd 2026-03-21)`
- The rustup shim has metadata/path issues, so commands should use the direct toolchain path under `.tools/rustup/toolchains/stable-x86_64-pc-windows-msvc/bin`.
- Ran `cargo check` in `app/src-tauri`: passed.
- `cargo check` initially failed because Tauri required `src-tauri/icons/icon.ico`; added `app/src-tauri/icons/icon.ico`.
- Ran no-bundle Tauri build: `npm run tauri -- build --no-bundle`: passed.
- Tauri build produced `app/src-tauri/target/release/pardus-mihmandar.exe` locally.
- Added `app/src-tauri/gen/` to `.gitignore` and removed generated Tauri schema artifacts.

## Verification Completed
Backend, from previous step:
- `composer install` completed successfully and created local `web/backend/composer.lock`.
- `php artisan about` successfully booted Laravel 12.58.0 with PHP 8.5.1 after temp variables were redirected.
- `php artisan test` passed: 2 tests, 8 assertions.

Frontend/Desktop:
- Portable Node.js: `v24.15.0`.
- Portable npm: `11.12.1`.
- `web/frontend`: dependencies installed, `npm run check` passed, `npm run build` passed.
- `app`: dependencies installed, `npm run build` passed.
- `app/src-tauri`: `cargo check` passed.
- `app`: `npm run tauri -- build --no-bundle` passed.

## Known Issues / Constraints
- Rustup shim reports metadata issues such as missing manifest / no active toolchain; bypass by using direct toolchain binaries.
- Full installer bundling has not been run; only `--no-bundle` Tauri build was verified.
- Web frontend `npm audit` reports 3 low-severity vulnerabilities through SvelteKit's transitive `cookie` dependency. npm suggests `npm audit fix --force`, but that would apply a breaking downgrade path, so it was not applied.
- Symfony Process/Laravel commands need `TMP` and `TEMP` redirected to a writable workspace-local temp directory on this machine.
- PowerShell constrained language mode emits a noisy output-encoding warning; it has been non-blocking.
- A `git update-index --refresh` attempt hit `.git/objects` permission issues. Do not force Git metadata repair unless the user asks.

## Current Visible Git Changes
Expected visible changes include:
- `.gitignore`
- `web/frontend/package.json`
- `web/frontend/package-lock.json`
- `web/frontend/src/app.html`
- `app/package-lock.json`
- `app/src/App.svelte`
- `app/src-tauri/Cargo.lock`
- `app/src-tauri/icons/icon.ico`
- Memory Bank files

Backend files remain hidden by `web/backend/` ignore rule.

## Next Recommended Step
Move from scaffold verification to feature implementation:
1. Connect web login/register forms to the Laravel API.
2. Connect desktop login/provider screens to API/local provider test commands.
3. Add real safe-command review UI states and persisted snippets/notes skeleton flows.

If doing more environment verification first, the next optional check is full Tauri bundling, but no-bundle build already confirms Rust linking and frontend integration.

## Important Safety Constraint
Do not let AI-generated commands run automatically. The app may explain and prepare commands, but execution must require explicit approval through a safety pipeline.
