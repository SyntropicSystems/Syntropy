---
id: "rp-u02"
type: use-case
title: "Adding a New Package to the Monorepo"
status: defining
owner: architecture-agent
created: 2025-02-09
updated: 2025-02-09
refs:
  depends-on: [rp02, rp03, rp04]
  related: [rp-u03, adr-004]
tags: [repo-platform, use-case, scaffolding]
---

# RP-U02 — Adding a New Package to the Monorepo

## Scenario

A developer needs to add a new domain package (e.g., splitting `domain-tasks` out of `domain-core`) or a new infrastructure package. The package must integrate with the workspace, TypeScript configuration, and build orchestration.

### Steps

1. Create the package directory under `packages/` (or `apps/` for an app)
2. Create `package.json` with the `@syntropy/` scope, `"private": true`, `"type": "module"`, and workspace protocol dependencies
3. Create `tsconfig.json` extending `../../tsconfig.base.json` with project references to dependencies
4. Create `src/index.ts` as the package entry point
5. Add path alias to `tsconfig.base.json` for `@syntropy/<package-name>`
6. Run `pnpm install` to link the new package into the workspace
7. Verify with `pnpm build` that the package builds and the dependency graph is correct

### Outcome

- The new package is discoverable by the workspace manager and build orchestrator
- Other packages can import from it using the `@syntropy/` alias
- TypeScript project references ensure correct build order
- The build orchestrator includes it in `run-many` and `affected` commands

## Features Exercised

- RP02 — Workspace Management (package discovery and linking)
- RP03 — Build Orchestration (dependency graph and caching)
- RP04 — TypeScript Project Configuration (path aliases and project references)

## Acceptance Criteria

- [ ] New package is included in `pnpm list --recursive`
- [ ] `pnpm build` builds the new package in the correct order
- [ ] TypeScript resolves imports from the new package in consuming packages
- [ ] Nx project graph shows the new package with correct dependency edges
