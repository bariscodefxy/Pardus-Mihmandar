# Development

## Prerequisites

- PHP 8.4+
- Composer
- Node.js and npm
- Rust and Cargo
- Tauri prerequisites for your OS
- Docker, optional for backend deployment

## Backend

```powershell
cd web/backend
composer install
Copy-Item ..\..\.env.example .env
php artisan key:generate
php artisan migrate
php artisan test
```

## Web Frontend

```powershell
cd web/frontend
npm install
npm run dev
```

## Desktop App

```powershell
cd app
npm install
npm run tauri dev
```

## Current Local Tooling Note

During initial scaffold, Composer was available but reported a Windows temp directory issue. `npm` and `cargo` were not available in PATH. Install/fix these before running full builds.
