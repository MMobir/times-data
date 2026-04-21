# times-data interface

Local-first interface for `times-data`.

## Backend

Run the FastAPI backend from repo root:

```bash
python3 -m interface.backend.app
```

Default URL: `http://127.0.0.1:8000`

## Frontend

```bash
cd interface/frontend
npm install
npm run dev
```

Set `VITE_API_BASE_URL` if backend runs on a different host/port.

## Quick verification

From repo root:

```bash
python3 scripts/smoke_interface.py
bash scripts/smoke_frontend.sh
```
