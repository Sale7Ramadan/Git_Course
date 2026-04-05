# Git_Course
For Elzero Web school

## Project Notes

This repository now contains:
- Frontend: `company-profile-react` (React + Vite)
- Backend: `backend` (Express API)

## Backend Security Features
- CORS support (configurable by `CORS_ORIGIN`)
- HTTP/HTTPS server support (`ENABLE_HTTPS` + cert/key paths)
- JWT authentication
- Role-based access rules
- Ownership policy enforcement for protected resources
- Rate limiting for auth and API endpoints
- Logging (`morgan`) and auditing (`backend/logs/audit.log`)
- Register endpoint for new users

## Run Backend
```bash
cd backend
cp .env.example .env
npm install
npm start
```

## Important Endpoints
- `GET /health`
- `POST /api/register`
- `GET /api/admin/rules-check` (admin JWT required)
- `GET /api/resources/:id` (owner/admin policy)
