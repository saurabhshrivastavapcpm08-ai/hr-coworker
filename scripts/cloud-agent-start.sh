#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PID_DIR="${ROOT}/.run"
mkdir -p "${PID_DIR}"

start_if_missing() {
  local name="$1"
  local cmd="$2"
  local pid_file="${PID_DIR}/${name}.pid"
  if [[ -f "${pid_file}" ]] && kill -0 "$(cat "${pid_file}")" 2>/dev/null; then
    return 0
  fi
  nohup bash -lc "${cmd}" >"${PID_DIR}/${name}.log" 2>&1 &
  echo $! >"${pid_file}"
}

start_if_missing api "cd '${ROOT}' && .venv/bin/uvicorn app.main:app --app-dir backend --host 127.0.0.1 --port 8000"
start_if_missing web "cd '${ROOT}/frontend' && npm run dev"

for _ in $(seq 1 30); do
  if curl -fsS "http://127.0.0.1:8000/health" >/dev/null && curl -fsS "http://127.0.0.1:5173" >/dev/null; then
    exit 0
  fi
  sleep 1
done

echo "Services did not become ready in time" >&2
exit 1
