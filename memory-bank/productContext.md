# Product Context

## Product Identity
Pardus Mihmandar is a calm, wise Linux guide for Debian and Debian-based systems. It should feel beginner-friendly but technically serious.

## Brand Voice
- Calm
- Helpful
- Educational
- Trustworthy
- Clear about risks
- Friendly without being childish

## Design Direction
Dark-mode-first, modern, premium, slightly futuristic, and Linux-native.

Preferred UX patterns:
- Command-palette interactions
- Split panes
- Cards
- Subtle borders
- Soft shadows
- Markdown rendering
- Keyboard-friendly workflows
- Clear empty states
- Beginner-focused explanations

Avoid:
- Generic SaaS landing page feel
- Purple-on-white default AI design
- Unsafe terminal automation
- Overcomplicated enterprise architecture for MVP

## User Modes

### Hosted Mode
The user authenticates with the backend. AI requests go through the platform backend and consume hosted credits.

Flow:
```text
Desktop/Web UI -> Laravel API -> Hosted AI infrastructure -> Credits deducted -> Usage logged
```

### Local Mode
The desktop app connects directly to local Ollama or LM Studio. Local mode does not consume hosted credits.

Flow:
```text
Desktop App -> Local Ollama/LM Studio -> No backend credit usage
```

## Main User Jobs
- Understand Linux concepts
- Explain terminal commands
- Solve Debian/Linux problems safely
- Generate command suggestions with risk explanation
- Make plans
- Take notes
- Create tasks
- Save command snippets
- Learn Linux step by step
- Choose hosted AI or local AI

## Presentation Story
Pardus Mihmandar helps Linux beginners learn and fix problems safely. The web app manages accounts, credits, usage, and settings. The desktop app provides the actual Linux-first assistant experience, including local AI support and safe command review.
