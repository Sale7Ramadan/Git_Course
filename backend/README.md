# Backend API

## Setup
```bash
cd backend
cp .env.example .env
npm install
npm start
```

## Environment Variables
- `PORT`: API port (default `3000`)
- `NODE_ENV`: environment name
- `CORS_ORIGIN`: allowed CORS origin (set explicit trusted frontend origin only)
- `JWT_SECRET`: secret for signing JWTs (generate a strong value with `openssl rand -hex 32`)
- `BCRYPT_ROUNDS`: bcrypt cost factor (default `12`)
- `ENABLE_HTTPS`: `true` or `false`
- `HTTPS_KEY_PATH`: path to TLS private key (required when HTTPS enabled)
- `HTTPS_CERT_PATH`: path to TLS certificate (required when HTTPS enabled)

## Security and Policies
- Helmet-enabled security headers
- CORS policy via `CORS_ORIGIN`
- Rate limiting on `/api` and `/api/register`
- JWT authentication middleware
- Role rule middleware (`admin` access route)
- Ownership policy middleware for resource access
- Audit log file: `logs/audit.log`

## Register Endpoint
### `POST /api/register`
Request body:
```json
{
  "username": "user1",
  "email": "user1@example.com",
  "password": "strongPass123"
}
```
Response includes user details and a JWT token.
