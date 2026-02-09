---
id: "rp-u07"
type: use-case
title: "Upgrading a Shared Runtime Dependency"
status: defining
owner: architecture-agent
created: 2025-02-09
updated: 2025-02-09
refs:
  depends-on: [rp01, rp05, rp06]
  related: [rp-u01]
tags: [repo-platform, use-case, maintenance]
---

# RP-U07 — Upgrading a Shared Runtime Dependency

## Scenario

Node.js releases a new LTS version, or pnpm releases a new minor version with important fixes. A developer upgrades the version and the change must propagate to all environments — local dev, containers, and CI.

### Steps (Node.js Upgrade)

1. Update `.nvmrc` to the new version (e.g., `24` → `26`)
2. Update `package.json` `engines.node` constraint
3. Update `.devcontainer/Dockerfile` base image (e.g., `node:24-slim` → `node:26-slim`)
4. Run `nvm install` (or rebuild devcontainer) to activate locally
5. Run `pnpm install` and `pnpm build` to verify compatibility
6. Commit all changes in a single PR for review

### Steps (pnpm Upgrade)

1. Update `package.json` `packageManager` field (e.g., `pnpm@9.15.4` → `pnpm@9.16.0`)
2. Update `.devcontainer/Dockerfile` corepack line
3. Run `corepack prepare pnpm@9.16.0 --activate`
4. Run `pnpm install` and `pnpm build` to verify
5. Commit in a single PR

### Outcome

- The version change is tracked in version control
- All environments pick up the new version: bare-metal (via nvm/corepack), devcontainer (via Dockerfile), CI (via container)
- If CI fails, the PR catches it before merge

## Features Exercised

- RP01 — Runtime Version Management (.nvmrc, packageManager, engines)
- RP05 — Development Container (Dockerfile base image update)
- RP06 — Build Container (same Dockerfile, shared base stage)

## Acceptance Criteria

- [ ] Version change requires updating no more than 3 files
- [ ] Devcontainer rebuilds with the new version
- [ ] CI passes with the new version before merge
- [ ] No developer has to manually install the new version (nvm/corepack handle it)
