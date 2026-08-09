#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if ! python3 -m venv "${ROOT}/.venv" >/dev/null 2>&1; then
  sudo DEBIAN_FRONTEND=noninteractive apt-get update -qq
  sudo DEBIAN_FRONTEND=noninteractive apt-get install -y python3.12-venv
  python3 -m venv "${ROOT}/.venv"
fi
"${ROOT}/.venv/bin/pip" install --upgrade pip
"${ROOT}/.venv/bin/pip" install -r "${ROOT}/backend/requirements.txt"

cd "${ROOT}/frontend"
npm ci
