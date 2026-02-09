---
id: "rp04"
type: feature-spec
title: "TypeScript Project Configuration"
status: defining
owner: architecture-agent
priority: P0
created: 2025-02-09
updated: 2025-02-09
refs:
  depends-on: [rp02]
  enables: [rp10, rp-u03]
  related: [rp03, rp08, adr-004]
  informed-by: [jtbd-repo-platform]
tags: [repo-platform, typescript, compiler, type-safety, p0]
---

# RP04 — TypeScript Project Configuration

## Summary

Provides a shared TypeScript compiler configuration across all packages with strict type checking, path aliases for clean imports, composite builds for incremental compilation, and project references for cross-package type safety.

## Jobs Addressed

- RJ8 — Type-Safe Cross-Package Contracts (primary)
- RJ2 — Fast Incremental Builds (secondary)

## How It Works

### Shared Base Configuration

A root `tsconfig.base.json` defines compiler options inherited by all packages. Each package extends this base and adds its own source/output paths.

**Currently:** `tsconfig.base.json` with:
- `target: "ES2024"` — modern JavaScript output
- `module: "ESNext"` with `moduleResolution: "bundler"` — compatible with Vite, esbuild, swc
- `strict: true` — all strict checks enabled
- `composite: true` — enables project references
- `declarationMap: true`, `sourceMap: true` — debugging support

### Path Aliases

Import aliases map `@syntropy/*` to package source directories, so packages import each other by name rather than relative paths.

**Currently:** `tsconfig.base.json` paths:
- `@syntropy/domain-core` → `packages/domain-core/src/index.ts`
- `@syntropy/domain-events` → `packages/domain-events/src/index.ts`
- `@syntropy/firebase` → `packages/firebase/src/index.ts`
- `@syntropy/shared-types` → `packages/shared-types/src/index.ts`
- `@syntropy/design-tokens` → `packages/design-tokens/src/index.ts`

### Composite Builds & Project References

Each package declares TypeScript project references to its dependencies. The TypeScript compiler uses these for incremental compilation — only recompiling packages whose inputs changed.

**Currently:** `packages/domain-core/tsconfig.json` references `shared-types` and `domain-events`. Build command: `tsc --build`.

### Branded Types for ID Safety

Shared types use a branded type pattern to prevent confusing IDs across domains at compile time (e.g., passing a `UserId` where a `TaskId` is expected).

**Currently:** `packages/shared-types/src/index.ts` exports branded types: `UserId`, `TaskId`, `ProjectId`, `DomainId`, `ArtifactId`, `EventId`, `IntegrationId`.

### ESM-First Module Strategy

All packages are configured as ES modules, aligning with the modern JavaScript ecosystem and bundler expectations.

**Currently:** Every `package.json` sets `"type": "module"`.

## Dependencies

- Requires: RP02 (Workspace Management) — path aliases and project references depend on the workspace package structure
- Enables: RP10 (Code Quality Automation) — type checking is a quality gate

## Open Questions

- [ ] Should we add `@syntropy/ui-web` and `@syntropy/ui-mobile` path aliases when those packages are created?
- [ ] Evaluate `verbatimModuleSyntax` for stricter import/export handling
