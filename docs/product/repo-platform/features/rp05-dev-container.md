---
id: "rp05"
type: feature-spec
title: "Development Container"
status: defining
owner: architecture-agent
priority: P0
created: 2025-02-09
updated: 2025-02-09
refs:
  decided-by: [adr-005]
  depends-on: [rp01, rp06]
  enables: [rp-u01, rp-u06, rp-u07]
  informed-by: [jtbd-repo-platform]
  related: [adr-005, rp-stories, rp02, rp06, surf-repo-platform]
tags: [repo-platform, devcontainer, docker, dx, p0]
---

# RP05 — Development Container

## Summary

A reproducible, editor-agnostic development environment defined by the open devcontainer specification. Provides the full build toolchain plus developer convenience tools, working identically in VS Code, Cursor, and GitHub Codespaces.

## Jobs Addressed

- RJ1 — Reproducible Development Environments (primary)
- RJ9 — Zero-Friction Contributor Onboarding (secondary)

## How It Works

### Multi-Stage Dockerfile (devcontainer stage)

The `devcontainer` stage extends the `build` stage (RP06), adding developer convenience tools. Because it's a strict superset of `build`, anything that works in CI works in dev — drift is prevented by construction.

**Currently:** `.devcontainer/Dockerfile` → `FROM build AS devcontainer` adds: curl, wget, ssh-client, procps, sudo, vim, less, jq, bash-completion.

### Devcontainer Features

Additional dev tools are layered via devcontainer Features — modular, OCI-distributed install scripts that each become a cached Docker layer. Features can be added or removed without modifying the Dockerfile.

**Currently:** `.devcontainer/devcontainer.json` Features:
- `ghcr.io/devcontainers/features/github-cli:1` — GitHub CLI (`gh`)
- `ghcr.io/devcontainers/features/docker-in-docker:2` — Docker daemon access

### IDE Integration

The devcontainer spec's `customizations` field configures editor extensions and settings. These are applied automatically when the container opens.

**Currently:** VS Code customizations:
- Extensions: Nx Console, ESLint, Prettier
- Default terminal: bash

### Port Forwarding

Dev server ports are auto-forwarded from container to host, with descriptive labels.

**Currently:** Ports 3000 (Web App), 4200 (Dev Web), 5173 (Vite)

### Lifecycle Hooks

The `postCreateCommand` runs after the container is built, installing workspace dependencies automatically.

**Currently:** `postCreateCommand: "pnpm install"`

### Non-Root User

The container runs as the `node` user (uid 1000) with passwordless sudo for occasional root operations.

### GitHub Codespaces

The same `.devcontainer/` configuration works in GitHub Codespaces with zero additional setup. Codespaces provisions a cloud VM, builds the image, and provides a browser-based or local VS Code connection.

## Dependencies

- Requires: RP01 (Runtime Version Management) — the container pins Node.js and pnpm versions
- Requires: RP06 (Build Container) — the devcontainer extends the build stage
- Enables: RP-U01 (Setting Up Local Development), RP-U06 (GitHub Codespaces)

## Open Questions

- [ ] Should we pre-build and publish the devcontainer image to GHCR for faster startup?
- [ ] Evaluate adding Firebase emulator suite as a Feature or via Docker Compose
- [ ] Add Pulumi CLI as a Feature for infrastructure development?
