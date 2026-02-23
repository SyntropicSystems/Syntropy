---
id: "rp02"
type: feature-spec
title: "Workspace & Package Management"
status: defining
owner: architecture-agent
priority: P0
created: 2025-02-09
updated: 2025-02-09
refs:
  depends-on: [rp01]
  enables: [rp-u01, rp-u02, rp03, rp04, rp07]
  informed-by: [jtbd-repo-platform]
  related: [adr-004, arch-stack, rp-stories, rp05, rp08, surf-repo-platform, wp01]
tags: [repo-platform, workspace, pnpm, monorepo, p0]
---

# RP02 — Workspace & Package Management

## Summary

Manages multiple packages within a single repository using workspace-aware package management. Internal packages are linked locally without publishing to a registry, and dependency resolution is centralized.

## Jobs Addressed

- RJ5 — Domain-Isolated Package Boundaries (primary)
- RJ10 — Scalable Monorepo Growth (secondary)

## How It Works

### Workspace Definition

A workspace configuration file declares which directories contain packages. The package manager discovers and links them automatically.

**Currently:** `pnpm-workspace.yaml` defines three workspace roots:
- `apps/*` — deployable application shells
- `packages/*` — shared libraries (domain, infrastructure, UI)
- `infra` — infrastructure as code

### Internal Dependency Protocol

Packages reference each other using a workspace protocol instead of version numbers. The package manager resolves these to local symlinks, ensuring changes are immediately visible without publishing.

**Currently:** pnpm workspace protocol — `"@syntropy/shared-types": "workspace:*"`

### Package Isolation

All packages are marked private to prevent accidental publication to public registries.

**Currently:** Every `package.json` sets `"private": true`

### Scoped Package Naming

All packages use a consistent namespace to avoid naming collisions and make imports self-documenting.

**Currently:** `@syntropy/*` scope — e.g., `@syntropy/domain-core`, `@syntropy/shared-types`

### Workspace Structure

The workspace is organized into tiers following the hybrid domain-package architecture (ADR-004):

1. **Domain packages** (`packages/domain-*`) — pure TypeScript business logic
2. **Infrastructure packages** (`packages/firebase`, `packages/shared-types`) — shared plumbing
3. **UI packages** (`packages/design-tokens`, `packages/ui-*`) — rendering layer
4. **Apps** (`apps/*`) — thin composition shells
5. **Infra** (`infra/`) — infrastructure as code

## Dependencies

- Requires: RP01 (Runtime Version Management) — workspace tooling requires the correct Node.js and pnpm versions
- Enables: RP03 (Build Orchestration), RP04 (TypeScript Project Configuration)

## Open Questions

- [ ] Should we add a `tools/` workspace root for internal CLI tools or generators?
