# Architecture

Pardus Mihmandar is a monorepo with three main applications:

- `web/backend`: Laravel REST API and source of truth for auth, credits, provider settings, usage logs, devices, and workspace data.
- `web/frontend`: Svelte website and dashboard for account, credits, usage, docs, and settings.
- `app`: Tauri desktop app for the Linux-first assistant experience.

## Hosted Mode

```text
Desktop/Web UI -> Laravel API -> Hosted AI infrastructure -> Credit deduction -> Usage logs
```

Hosted mode requires authentication and consumes backend-owned credits.

## Local Mode

```text
Desktop App -> Local Ollama or LM Studio -> No hosted credit deduction
```

Local mode is handled by the desktop app and must not consume hosted credits.

## Boundaries

- Backend owns credits and hosted AI accounting.
- Desktop owns Linux system UX and local provider connections.
- Web frontend owns public site and user dashboard.
- AI-generated shell commands are untrusted text until reviewed and explicitly approved.
