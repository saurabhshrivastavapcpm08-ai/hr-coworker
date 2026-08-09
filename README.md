# hr-coworker

Tara AI — recruitment coworker prototype (FastAPI + React).

## Prerequisites

- Python 3.12+
- Node.js 22+

## Setup

```bash
./scripts/cloud-agent-install.sh
```

## Development

Start the API and web app (or use Cursor Cloud Agent terminals from `.cursor/environment.json`):

```bash
.venv/bin/uvicorn app.main:app --app-dir backend --host 127.0.0.1 --port 8000 --reload
cd frontend && npm run dev
```

Open http://localhost:5173

## Checks

```bash
cd frontend && npm run lint
curl http://127.0.0.1:8000/health
```
