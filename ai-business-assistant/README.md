# MAK AI Business Assistant

Starter dashboard and API added without replacing the existing MAK website.

## Files
- `index.html`: responsive dashboard with overview, role-based agents, content studio, and sample lead pipeline.
- `backend/server.js`: Express API endpoint for AI responses.
- `backend/.env.example`: required backend environment variables.

## Current status
The source code is committed to GitHub. The AI provider, backend hosting, and dashboard deployment are **not automatically configured** by this commit. Demo metrics and lead records are placeholders.

## Run locally
1. Install Node.js 20 or newer.
2. In `backend/`, run `npm install`.
3. Copy `.env.example` to `.env` and set `OPENAI_API_KEY`, `OPENAI_MODEL`, and optional `ALLOWED_ORIGINS`.
4. Run `npm start`; test `/health` on the server.
5. The static dashboard currently calls a relative `/api/assistant`. For a separate static host and API host, update its fetch URL to the deployed backend URL and configure CORS.

## Security
Keep API keys only in backend environment variables. Do not add keys to HTML, GitHub Pages, or commit history. Add authentication and rate limiting before exposing the API publicly.

## Deploy
The dashboard can be hosted as a static page. The API must be deployed separately to a Node-compatible host. No hosting service or paid API has been connected by this repository commit.