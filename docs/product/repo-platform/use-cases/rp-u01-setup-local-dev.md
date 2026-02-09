---
id: "rp-u01"
type: use-case
title: "Setting Up Local Development"
status: defining
owner: architecture-agent
created: 2025-02-09
updated: 2025-02-09
refs:
  depends-on: [rp01, rp02, rp05]
  related: [rp-u06, rp-u07]
tags: [repo-platform, use-case, onboarding]
---

# RP-U01 — Setting Up Local Development

## Scenario

A new contributor joins the project and needs a working development environment. They should be productive within minutes, regardless of their host OS or existing tool installations.

### Path A: Devcontainer (Recommended)

1. Clone the repository
2. Open in VS Code or Cursor
3. Accept the "Reopen in Container" prompt
4. Wait for the container to build (first time) or start (cached)
5. The `postCreateCommand` runs `pnpm install` automatically
6. Start developing — all tools, extensions, and settings are pre-configured

### Path B: Bare-Metal

1. Clone the repository
2. Install nvm and run `nvm install` (reads `.nvmrc`)
3. Enable corepack: `corepack enable`
4. Run `pnpm install`
5. Start developing

### Outcome

- The contributor has all correct runtime versions (Node.js 24, pnpm 9.15.4)
- All workspace packages are linked and dependencies installed
- Editor has the correct extensions and settings (devcontainer path)
- The contributor can run `pnpm build`, `pnpm test`, `pnpm dev:web` immediately

## Features Exercised

- RP01 — Runtime Version Management (version pinning via .nvmrc and corepack)
- RP02 — Workspace Management (pnpm install links all packages)
- RP05 — Development Container (full environment in a container)

## Acceptance Criteria

- [ ] `pnpm install` succeeds with zero manual intervention after clone
- [ ] `pnpm build` completes successfully in a fresh devcontainer
- [ ] VS Code shows correct TypeScript IntelliSense across package boundaries
- [ ] Time from clone to first successful build is under 5 minutes
