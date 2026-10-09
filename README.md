# Seatlock

A ticketing platform where thousands of users can race for the same seat — and only one wins.

## Tech Stack

- **Monorepo:** pnpm workspaces + Turborepo
- **Backend:** NestJS, Drizzle ORM, PostgreSQL, Redis
- **Frontend:** Next.js (React), TypeScript, Tailwind CSS
- **Infra:** Docker Compose

## Getting Started

Prerequisites: Node.js 24+, pnpm 10+, Docker

```bash
pnpm install
cp apps/api/.env.example apps/api/.env
pnpm infra:up     # start PostgreSQL (localhost:5435) and Redis (localhost:6379)
pnpm dev          # web: localhost:3000, api: localhost:4000
```
