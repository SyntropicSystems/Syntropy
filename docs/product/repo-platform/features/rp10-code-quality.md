---
id: "rp10"
type: feature-spec
title: "Code Quality Automation"
status: exploring
owner: architecture-agent
priority: P1
created: 2025-02-09
updated: 2025-02-09
refs:
  depends-on: [rp03, rp04]
  enables: [rp-u05]
  related: [rp09, rp08]
  informed-by: [jtbd-repo-platform]
tags: [repo-platform, linting, formatting, quality, p1]
---

# RP10 — Code Quality Automation

## Summary

Automated code quality enforcement across all packages — linting for correctness, formatting for consistency, type checking for safety, and module boundary enforcement for architectural integrity. Runs locally, in editors, and in CI.

## Jobs Addressed

- RJ7 — Automated Code Quality (primary)

## How It Works

### Linting (Planned)

Static analysis to catch bugs, enforce patterns, and flag anti-patterns.

**Planned:** ESLint with TypeScript parser. Shared config in `packages/config/` consumed by all packages. Rules should enforce:
- TypeScript best practices
- Import ordering
- No unused variables/imports
- Framework-specific rules (React, React Native)

### Formatting (Planned)

Automatic code formatting for consistent style.

**Planned:** Prettier with shared config. Format on save in editors, format check in CI.

### Type Checking

TypeScript compiler in strict mode catches type errors across all packages.

**Currently:** `tsc --build` in each package. Strict mode enabled in `tsconfig.base.json`.

### Module Boundary Enforcement (Planned)

Rules that prevent packages from importing outside their allowed dependency graph. E.g., domain packages cannot import UI packages; UI packages cannot write to stores.

**Planned:** Nx `@nx/enforce-module-boundaries` ESLint rule. Tags on each package define which dependency edges are allowed.

### Pre-Commit Hooks (Planned)

Run linting and formatting on staged files before each commit to catch issues early.

**Planned:** `lint-staged` + `husky` (or `lefthook`) for pre-commit hooks.

### Editor Integration

Quality tools integrated into editors via extensions for real-time feedback.

**Currently:** Devcontainer installs ESLint and Prettier VS Code extensions. Config files not yet created.

## Dependencies

- Requires: RP03 (Build Orchestration) — lint/format tasks orchestrated by the build tool
- Requires: RP04 (TypeScript Project Configuration) — type checking uses the shared tsconfig

## Open Questions

- [ ] ESLint flat config (eslint.config.js) or legacy (.eslintrc)?
- [ ] Shared config package (`packages/config/`) or root-level configs?
- [ ] Biome as an ESLint + Prettier alternative?
- [ ] Which pre-commit hook tool: husky, lefthook, or simple-git-hooks?
