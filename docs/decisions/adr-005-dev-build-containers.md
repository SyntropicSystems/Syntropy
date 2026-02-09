---
id: "adr-005"
type: adr
title: "Dev Container and Build Container Strategy"
status: accepted
owner: architecture-agent
decision-type: type-1
created: 2025-02-09
updated: 2025-02-09
refs:
  affects: [arch-stack, f08]
  related: [adr-004, arch-stack]
tags: [architecture, containers, devcontainer, ci-cd, dx]
---

# ADR-005: Dev Container and Build Container Strategy

## Context

Syntropy uses an Nx monorepo (ADR-004) with Node 24, pnpm 9.x, and TypeScript 5.7+. As the team grows beyond a single contributor, we need reproducible development and CI/CD environments that:

1. **Eliminate "works on my machine"** — every contributor gets the same Node version, pnpm version, and system dependencies regardless of host OS.
2. **Support multiple editors** — VS Code, Cursor, and GitHub Codespaces via the open devcontainer spec.
3. **Keep CI/CD lean** — a build container with only what's needed to install, lint, test, and build. No dev convenience tools.
4. **Prevent drift** — dev and CI environments must share the same foundation so a passing CI build means a working dev environment and vice versa.
5. **Prepare for self-hosted runners** — if we ever move to self-hosted CI/CD runners, the build container ensures reproducibility without runner state drift.

### Relationship with Nx

Nx caching (local and remote) optimizes *task execution* — skipping unchanged work. Containers optimize *environment reproducibility* — ensuring identical OS, runtimes, and native dependencies. These are complementary concerns:

- Nx caching works best when the environment is identical across machines. A container guarantees this.
- A build container is useful even with Nx because it pins the runtime stack, not just task outputs.
- Nx remote cache (Nx Replay) can be shared across local dev, devcontainers, and CI — all hitting the same cache because the environment is identical.

## Decision

**Multi-stage Dockerfile with devcontainer Features.** A single `.devcontainer/Dockerfile` with three stages:

```
base → build → devcontainer
```

1. **`base` stage** — Node 24 slim + corepack-enabled pnpm 9.15.4. The absolute minimum shared by all environments.
2. **`build` stage** — Extends `base`. Adds only `git` and `ca-certificates` (needed by Nx for affected detection and by pnpm for fetching packages). This is the CI/CD image.
3. **`devcontainer` stage** — Extends `build`. Adds developer convenience tools (curl, vim, sudo, etc.) and configures a non-root user. Additional dev tools (GitHub CLI, Docker-in-Docker) are layered via **devcontainer Features** — modular, OCI-distributed install scripts that each become a cached Docker layer.

The `devcontainer.json` targets the `devcontainer` stage and adds Features for editor integration, port forwarding, and lifecycle hooks.

### Why devcontainer is a superset of build

By making `devcontainer FROM build FROM base`, the devcontainer is a strict superset of the build container. Any code that builds in CI will build in dev. The devcontainer just adds convenience tools on top. This is the strongest possible drift prevention — it's not just "similar environments," it's the same image layers.

### CI/CD usage

CI pipelines target the `build` stage directly:

```bash
docker build --target build -t syntropy-build .
```

Or use the `devcontainers/ci` GitHub Action to run CI commands inside the full devcontainer (heavier but guarantees exact parity):

```yaml
- uses: devcontainers/ci@v0.3
  with:
    imageName: ghcr.io/syntropicsystems/syntropy-devcontainer
    runCmd: pnpm install --frozen-lockfile && pnpm build && pnpm test
```

### GitHub Codespaces

The `devcontainer.json` works with GitHub Codespaces out of the box. Codespaces provisions a cloud VM, builds the devcontainer image, and provides a browser-based or local VS Code connection. No additional configuration is needed beyond what's already in `.devcontainer/`.

## Rationale

1. **Single source of truth** — one Dockerfile defines all environments. Change the Node version once, it propagates everywhere.
2. **Strict superset relationship** — `devcontainer ⊃ build ⊃ base`. No drift by construction, not by discipline.
3. **Lean CI** — the `build` stage has no curl, no vim, no sudo, no GitHub CLI. Minimal attack surface, fast image pulls for CI runners.
4. **Modular dev tooling** — devcontainer Features are independently versioned, cached, and removable. Adding the GitHub CLI doesn't require rebuilding the entire image.
5. **Editor-agnostic** — the devcontainer spec is supported by VS Code, Cursor, JetBrains, DevPod, and GitHub Codespaces.
6. **Self-hosted runner ready** — the `build` stage can be used directly as a CI runner image if we move to self-hosted GitHub Actions runners.

## Alternatives Considered

### A: Separate Dockerfiles for dev and build

Separate `Dockerfile.dev` and `Dockerfile.build` with a shared base image published to a registry. Rejected because maintaining two files introduces drift risk and requires a separate image publication pipeline for the base.

### B: No containers, rely on nvm + corepack

Continue with `.nvmrc` + corepack for local dev and use GitHub-hosted runners for CI. Rejected because:
- `.nvmrc` doesn't pin OS-level dependencies or system libraries.
- Doesn't work with GitHub Codespaces (which needs a devcontainer).
- No path to self-hosted runners without additional work.

### C: devcontainer Features only (no custom Dockerfile)

Use a stock `mcr.microsoft.com/devcontainers/javascript-node` image and layer everything via Features. Rejected because:
- We lose the ability to have a distinct lean `build` stage for CI.
- The stock image includes tools we don't need and is larger than necessary.
- Less control over the exact Node/pnpm versions.

### D: Docker Compose-based devcontainer

Use `docker-compose.yml` with services for the dev environment plus future services (e.g., local emulators). Considered and deferred — can be added later when we need multi-service local development (e.g., Firebase emulators). The current single-container approach is simpler and sufficient.

## Consequences

- Contributors need Docker Desktop (or Podman/Colima) installed to use the devcontainer. Those preferring bare-metal dev can still use `.nvmrc` + corepack, but will lack environment guarantees.
- The Dockerfile must be updated when Node or pnpm versions change. This is a feature (explicit version management), not a bug.
- Future services (Firebase emulators, databases) may require evolving to a Docker Compose-based devcontainer. This is an additive change — the Dockerfile stages remain the same.
- The `@nx/docker` plugin can be adopted later for building production images of individual apps. This ADR covers the dev/build environment, not app-level production images.

## Revisit Triggers

- Need to run Firebase emulators or other services locally → add `docker-compose.yml` to devcontainer.
- Move to self-hosted CI/CD runners → publish `build` stage to container registry.
- Adopt Nx Docker plugin for production images → may want a separate production Dockerfile per app.
