# Project Brief: Pardus Mihmandar

## Project Name
Pardus Mihmandar

## Repository
Pardus-Mihmandar

## Purpose
Pardus Mihmandar is an AI assistant for Debian and Debian-based Linux distributions, focused on beginner Linux users. It combines a Linux learning guide, safe command assistant, notes/tasks workspace, command snippets, and AI provider management.

The product should feel like Notion + Copilot designed for Linux: calm, educational, trustworthy, keyboard-friendly, and Linux-native.

## Problem
Beginner Linux users often struggle with terminal commands, package management, system errors, logs, permissions, and knowing whether online command suggestions are safe. Many assistants can generate commands, but they do not consistently explain risks or prevent unsafe execution.

## Target Users
- Beginner Debian/Pardus/Linux users
- Students learning Linux
- Users migrating from Windows/macOS to Debian-based systems
- Users who want AI help without blindly trusting terminal commands
- Users who prefer either hosted AI credits or local AI through Ollama/LM Studio

## Core Product Promise
Help users understand and safely solve Linux problems without blindly executing AI-generated commands.

## Required Monorepo Structure
```text
Pardus-Mihmandar/
├── app/
├── web/
│   ├── frontend/
│   └── backend/
├── docs/
├── docker/
├── scripts/
├── README.md
└── .gitignore
```

## Main Components
- `app/`: Tauri desktop app with Svelte + TypeScript frontend and Rust system layer.
- `web/frontend/`: Svelte + TypeScript website and user dashboard.
- `web/backend/`: PHP 8.4 + Laravel REST API backend.
- `docs/`: architecture, API, security, development, and MVP documentation.
- `docker/`: deployment-related Docker/Nginx files.
- `scripts/`: setup, dev, and test helper scripts.

## MVP Goal
Deliver a complete, demonstrable school final project that clearly shows:
- User account creation on the website
- Desktop app login with that account
- Hosted AI mode using backend credits
- Local AI mode using Ollama or LM Studio without consuming credits
- Safe command explanation and approval UI
- Notes/tasks/snippets workspace skeleton
- Linux diagnostics through safe Tauri/Rust commands

## Non-Negotiable Safety Rule
The app must never blindly execute AI-generated commands. All command execution, if added later, must pass through a safe approval pipeline.
