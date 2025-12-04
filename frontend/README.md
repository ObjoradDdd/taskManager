# Reverse Gantt — Frontend

This folder contains a Vite + React + TypeScript scaffold for the "Reverse Gantt" frontend. Designed for local development (and Docker-based dev) only. You can find a short run guide and the backend endpoints expected by the frontend below.

Quick start (local):

1. cd frontend
2. npm install
3. npm run dev

Quick start (Docker dev):

1. docker compose up --build
2. Open http://localhost:5173

Environment variables:
- VITE_API_URL - base URL for backend API (default: http://localhost:4000/api)
- VITE_MOCK - if true, the app will use mock JSON data in `src/mocks/sample.json` for development/demo

Backend endpoints expected:
- GET /api/projects -> [{id,name,subject,results:[]}] (used by ProjectList)
- GET /api/projects/:id -> project details
- GET /api/results/:id -> result with tasks and dependencies (used by ResultDetail)
- POST /api/tasks -> create a new task
- GET /api/users -> list of users

If additional endpoints are missing on the backend, please add them and inform the frontend developer. See `backend_endpoints.md` for more detail.
