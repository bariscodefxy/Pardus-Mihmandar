# Frontend Docker Runtime

This runtime serves the SvelteKit Node build (`@sveltejs/adapter-node`) for `web/frontend`.

## Build and Run

From repository root:

```powershell
docker compose -f docker/frontend/docker-compose.yml up --build -d
```

## Environment

- `VITE_API_BASE_URL`: backend API URL embedded at build-time.
- `FRONTEND_PORT`: host port mapping for frontend container (default `4173`).
- `ORIGIN`: public origin exposed by SvelteKit runtime (default `http://localhost:4173`).
