#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "Setting up Pardus Mihmandar..."

if command -v composer >/dev/null 2>&1; then
  (cd "$ROOT_DIR/web/backend" && composer install)
else
  echo "Composer is not installed. Skipping backend dependencies."
fi

if command -v npm >/dev/null 2>&1; then
  (cd "$ROOT_DIR/web/frontend" && npm install)
  (cd "$ROOT_DIR/app" && npm install)
else
  echo "npm is not installed. Skipping frontend and desktop dependencies."
fi
