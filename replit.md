# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

## Recent UI Updates

- Admin and portal layouts use compact full-width page spacing instead of centered max-width containers.
- Sidebar scrollbars are visually hidden while preserving scroll behavior.
- Admin and portal navigation now include mobile-friendly menu behavior.
- Dashboard was expanded into an executive insight view covering revenue, sales, finance, customer health, operations, support, inventory, and daily priorities.
- ERP includes a Financial Distribution page for configuring company cash, partner withdrawals, and expense allocation categories.

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
