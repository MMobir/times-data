#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FRONTEND_DIR="$REPO_ROOT/interface/frontend"

cd "$FRONTEND_DIR"
npm install
npm run test
npm run build

echo "Frontend smoke flow passed."
