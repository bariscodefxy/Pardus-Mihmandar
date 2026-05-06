# Pardus Mihmandar

Pardus Mihmandar is an AI assistant for Debian and Debian-based Linux users. It is designed for beginners who need clear explanations, safe command guidance, hosted AI credits, and optional local AI through Ollama or LM Studio.

## Monorepo

```text
app/            Tauri desktop app: Svelte + TypeScript + Rust
web/frontend/   Website and dashboard: Svelte + TypeScript
web/backend/    API backend: PHP 8.4 + Laravel
docs/           Architecture, API, security, development docs
docker/         Deployment support
scripts/        Setup, dev, and test helpers
memory-bank/    Project planning memory
```

## MVP

- Website landing page, login, register, dashboard, credits, usage, providers, settings
- Laravel auth, credits, provider settings, AI request logging, OpenAPI skeleton
- Desktop login, chat shell, provider selector, local Ollama/LM Studio connection tests
- Safe command explanation and approval UI
- Notes, tasks, snippets, and diagnostics skeleton

## Safety Rule

AI-generated commands are never executed automatically. Risky commands must be explained, reviewed, and explicitly approved by the user.

## Setup

See `docs/development.md` for full local setup.
