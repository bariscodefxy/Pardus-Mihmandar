# API

Base URL in development:

```text
http://localhost:8000/api
```

## Auth

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/me
```

## Credits and Usage

```http
GET /api/credits
GET /api/credits/transactions
GET /api/usage
```

## Providers

```http
GET  /api/providers
GET  /api/provider-settings
POST /api/provider-settings
POST /api/providers/test
```

## Chat

```http
POST /api/chat
```

`POST /api/chat` is for hosted mode only and consumes credits.

## Devices

```http
GET    /api/devices
POST   /api/devices/register
DELETE /api/devices/{device}
```

OpenAPI skeleton: `web/backend/storage/api-docs/openapi.yaml`.
