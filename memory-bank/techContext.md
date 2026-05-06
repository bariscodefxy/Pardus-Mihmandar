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

Current local tooling observations from 2026-05-06:
- PHP is available as `C:\php\php.exe`, reported version 8.5.1.
- Composer is available, reported version 2.9.5.
- Composer reports `C:\Users\Baris\AppData\Local\Temp` missing or not writable.
- `npm` is not available in PATH.
- `cargo` is not available in PATH.
- PowerShell constrained language mode blocks some .NET object creation and emits a noisy output-encoding warning.
- PHP one-off scripts worked for BOM normalization and validation.

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
