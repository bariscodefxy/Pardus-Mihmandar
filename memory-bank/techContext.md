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
- PHP is available as `C:\php\php.exe`, reported version 8.5.1.
- Composer is available, reported version 2.9.5.
- Composer initially reported `C:\Users\Baris\AppData\Local\Temp` missing or not writable.
- Portable Node.js was downloaded into `.tools/node`, version `v24.15.0`, with npm `11.12.1`.
- Workspace-local Rust was installed into `.tools/rustup` and `.tools/cargo`.
- Direct Rust toolchain binaries work from `.tools/rustup/toolchains/stable-x86_64-pc-windows-msvc/bin`:
  - `rustc 1.95.0 (59807616e 2026-04-14)`
  - `cargo 1.95.0 (f2d3ce0bd 2026-03-21)`
- Rustup shim under `.tools/cargo/bin` has metadata/path issues; prefer direct toolchain binaries for commands.
- `winget` and `choco` are not available in PATH.
- PowerShell constrained language mode blocks some .NET object creation and emits a noisy output-encoding warning.
- PHP one-off scripts worked for BOM normalization and validation.
- Vite/esbuild builds may require escalation because child process spawning can hit `spawn EPERM` in the sandbox.

## Backend Responsibilities
- Auth
- Credits
- AI request logging
- Provider settings
- Device/session management
- Workspace APIs
- Notes APIs
- Tasks APIs
- Snippets APIs
- Conversations/messages APIs
- Rate limiting
- Security-sensitive audit logging

## Desktop Responsibilities
- Secure login
- Hosted/local provider selector
- Ollama connection test
- LM Studio connection test
- Assistant chat UI
- Command explanation UI
- Safe command approval flow
- Linux diagnostics
- Notion-like workspace skeleton
- Notes/tasks/snippets UI
- Settings

## Web Frontend Responsibilities
- Landing page
- Login/register pages
- Dashboard
- Credits page
- Usage history
- AI provider settings
- Documentation/help pages
- Account settings

## Expected Tooling
- Composer for Laravel
- NPM for Svelte/Tauri frontend tooling
- Cargo for Rust/Tauri backend
- Docker for backend deployment

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
