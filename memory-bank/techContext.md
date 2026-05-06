# Tech Context

## Required Technologies

### Desktop App
- Tauri
- Rust
- Svelte
- TypeScript
- shadcn/ui-style component approach
- Linux-first UX

### Web Frontend
- Svelte
- TypeScript
- shadcn/ui-style component approach
- Responsive design
- Dark mode first

### Web Backend
- PHP 8.4+
- Laravel
- Sanctum or Passport authentication
- OpenAPI documentation
- PHPUnit or Pest testing
- Docker deployment
- REST API-first architecture

## Development Environment
Primary user environment is Windows PowerShell. The product target is Debian and Debian-based Linux distributions.

Current local tooling observations:
- PHP is available as `C:\php\php.exe` (`8.5.1`).
- Composer is available (`2.9.5`).
- Portable Node.js available at `.tools/node` (`v24.15.0`, npm `11.12.1`).
- Workspace-local Rust available under `.tools/rustup` and `.tools/cargo`.
- Direct Rust toolchain binaries from `.tools/rustup/toolchains/stable-x86_64-pc-windows-msvc/bin` are reliable.
- Rustup shim under `.tools/cargo/bin` may show metadata/path issues.
- `winget` and `choco` are not available in PATH.
- PowerShell constrained language mode blocks some .NET object creation and prints a non-blocking output-encoding warning.
- Vite/esbuild builds may require escalation because child process spawning can hit `spawn EPERM` in sandbox.

## Web Frontend Integration Status
Implemented and verified:
- Auth register/login/logout endpoint integration.
- Auth session persistence store.
- Dashboard integration (`/api/me`, `/api/credits`).
- Usage integration (`/api/usage`).
- Providers integration (`/api/providers`, `/api/provider-settings`, `/api/providers/test`).
- Credits integration (`/api/credits`, `/api/credits/transactions`).
- Settings integration (`/api/me`, `/api/devices`, device revoke).

## Environment Rules
- Use environment variables for secrets.
- Never hard-code API keys.
- Never expose auth tokens in logs.
- Validate API requests.
- Add error handling and loading states.
- Use accessible labels.
- Keep strict TypeScript.
- Keep generated text/source files UTF-8 without BOM when PHP/JSON parsers are involved.
- Keep `web/backend/` ignored unless the user explicitly asks to publish backend files.
