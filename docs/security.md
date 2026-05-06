# Security

## Core Rule

AI-generated commands must never execute automatically.

## Command Review Pipeline

1. Detect shell-like commands.
2. Classify risk.
3. Explain what the command does.
4. Explain why it may be needed.
5. Explain what can go wrong.
6. Show safer alternatives.
7. Require explicit confirmation.
8. Execute only through a future audited command pipeline.

## Risky Commands

Commands involving these are risky:

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
- firewall, network, disk, user deletion, permission escalation, `/etc`, `/boot`, and system directory changes

## Auth and Tokens

- Use Laravel Sanctum tokens.
- Never log tokens.
- Revoke current token on logout.
- Track desktop devices.

## Credits

- Only backend services can deduct hosted credits.
- Local mode must not consume credits.
