---
id: "rp06"
type: feature-spec
title: "Build Container"
status: defining
owner: architecture-agent
priority: P0
created: 2025-02-09
updated: 2025-02-09
refs:
  decided-by: [adr-005]
  depends-on: [rp01]
  enables: [rp-u05, rp-u07, rp05, rp09]
  informed-by: [jtbd-repo-platform]
  related: [adr-005, rp-stories, rp03, rp05, surf-repo-platform]
tags: [repo-platform, container, ci-cd, docker, p0]
---

# RP06 — Build Container

## Summary

A lean container image with only the tools required to install dependencies, build, test, and lint. Used by CI/CD pipelines and as the base for the development container. Contains no developer convenience tools, minimizing image size, attack surface, and pull times.

## Jobs Addressed

- RJ3 — Consistent Runtime Versions Everywhere (primary)
- RJ6 — Lean, Trustworthy CI/CD (primary)

## How It Works

### Multi-Stage Dockerfile (build stage)

The `build` stage extends the `base` stage (Node.js + pnpm) and adds only what CI strictly needs beyond the runtime:
- `git` — required by Nx for affected detection (comparing branches)
- `ca-certificates` — required for HTTPS operations (registry fetches, remote cache)

**Currently:** `.devcontainer/Dockerfile` stages:
1. `base` — `node:24-slim` + corepack-enabled pnpm 9.15.4
2. `build` — base + git + ca-certificates

### Strict Subset Guarantee

The build container is a strict subset of the devcontainer (RP05). The relationship `devcontainer FROM build FROM base` means any code that builds in CI will build in dev. This prevents drift by construction, not by discipline.

### CI Usage

CI pipelines target the `build` stage directly:
```bash
docker build --target build -t syntropy-build .devcontainer/
```

Or use the `devcontainers/ci` GitHub Action for exact devcontainer parity:
```yaml
- uses: devcontainers/ci@v0.3
  with:
    imageName: ghcr.io/syntropicsystems/syntropy-devcontainer
    runCmd: pnpm install --frozen-lockfile && pnpm build && pnpm test
```

### Self-Hosted Runner Ready

The `build` stage can serve directly as a self-hosted GitHub Actions runner image if the project moves to self-hosted infrastructure. Because it's the same image used for CI builds, runner state drift is eliminated.

## Dependencies

- Requires: RP01 (Runtime Version Management) — inherits Node.js and pnpm from the base stage
- Enables: RP05 (Development Container) — devcontainer extends this stage
- Enables: RP09 (CI/CD Pipeline) — CI runs inside this container

## Open Questions

- [ ] Should we publish the build image to GHCR for CI pull-based usage?
- [ ] Add a `.dockerignore` to exclude docs/, prototypes/, observations/ from the build context?
