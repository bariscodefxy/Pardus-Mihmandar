# System Patterns

## Architecture Pattern
Single monorepo on disk with independently runnable applications:

```text
app/           Tauri desktop app
web/frontend/  Svelte web frontend
web/backend/   Laravel API backend, local/private and ignored by Git
docs/          project documentation
docker/        deployment support
scripts/       local automation
```

## Repository Privacy Pattern
`web/backend/` is intentionally ignored by Git because the user does not want the backend to be public.

Rules:
- Keep `web/backend/` in the local monorepo structure.
- Keep `.gitignore` entry `web/backend/` unless the user explicitly says to publish/track backend code.
- Do not treat hidden backend files as an accidental ignore problem.
- Public repository work should focus on non-private files unless the user explicitly allows backend tracking.

## Backend Pattern
Laravel REST API-first architecture.

Recommended local structure:
```text
app/Http/Controllers/Api/
app/Http/Requests/
app/Models/
app/Services/Auth/
app/Services/Credits/
app/Services/AI/
app/Services/Providers/
app/Services/Audit/
routes/api.php
```

Controllers should stay thin. Business logic should live in services.

## Frontend Pattern
Svelte + TypeScript with strict typing and a local design system inspired by shadcn/ui patterns.

Recommended structure:
```text
src/lib/api/
src/lib/components/
src/lib/stores/
src/lib/design/
src/routes/
```

## Desktop Pattern
Tauri app with Svelte + TypeScript UI and Rust for system-level features only.

Recommended structure:
```text
app/src/lib/api/
app/src/lib/components/
app/src/lib/stores/
app/src/lib/providers/
app/src/lib/safety/
app/src-tauri/src/commands/
app/src-tauri/src/system/
app/src-tauri/src/safety/
```

## AI Provider Pattern
Provider modes must remain explicit:

- `hosted`: backend API, credits consumed
- `local`: direct desktop connection, no hosted credits consumed

Provider types:
- Hosted platform provider
- Ollama local provider
- LM Studio local provider

## Command Safety Pattern
All model output is untrusted.

Safe command pipeline:
1. Detect shell-like commands in assistant response.
2. Classify command risk.
3. Show what the command does.
4. Explain why it may be needed.
5. Explain what can go wrong.
6. Offer safer alternatives.
7. Require explicit user confirmation.
8. Never execute directly from model output.

Risk triggers include:
- `sudo`
- `su`
- `rm`
- `rmdir`
- `chmod`
- `chown`
- `dd`
- `mkfs`
- `fdisk`
- `parted`
- `mount`
- `umount`
- `systemctl disable`
- `systemctl stop`
- `apt remove`
- `apt purge`
- firewall/network/disk/user/permission/bootloader/system-directory changes

## Credit Pattern
Credits are backend-owned. The frontend and desktop app may display balances, but only backend services can deduct credits.

Credit flow:
1. User sends hosted AI request.
2. Backend authenticates request.
3. Backend checks balance.
4. Backend logs AI request.
5. Backend deducts credits in a transaction.
6. Backend returns response or structured error.

Local AI requests bypass hosted credit deduction.
