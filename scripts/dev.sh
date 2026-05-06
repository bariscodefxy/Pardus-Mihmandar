#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "Run these in separate terminals:"
echo "cd $ROOT_DIR/web/backend && php artisan serve"
echo "cd $ROOT_DIR/web/frontend && npm run dev"
echo "cd $ROOT_DIR/app && npm run tauri dev"
