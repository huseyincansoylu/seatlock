# Seatlock

A ticketing platform where thousands of users can race for the same seat — and only one wins.

## Tech Stack

- **Monorepo:** pnpm workspaces + Turborepo
- **Backend:** NestJS, Drizzle ORM, PostgreSQL, Redis
- **Frontend:** Next.js (React), TypeScript
- **Infra:** Docker Compose

## Getting Started

Prerequisites: Node.js 24+, pnpm 10+, Docker

```bash
pnpm install
cp .env.example .env
pnpm infra:up     # start PostgreSQL (localhost:5435) and Redis (localhost:6379)
```
