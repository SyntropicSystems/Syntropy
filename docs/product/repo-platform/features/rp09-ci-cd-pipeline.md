---
id: "rp09"
type: feature-spec
title: "CI/CD Pipeline"
status: exploring
owner: architecture-agent
priority: P1
created: 2025-02-09
updated: 2025-02-09
refs:
  depends-on: [rp03, rp06, rp08]
  enables: [rp-u05]
  related: [rp10, adr-005]
  informed-by: [jtbd-repo-platform]
tags: [repo-platform, ci-cd, github-actions, automation, p1]
---

# RP09 — CI/CD Pipeline

## Summary

Automated pipelines that run on pull requests and merges to validate code quality, build integrity, and test coverage. Pipelines execute inside the build container (RP06) for reproducibility and leverage build orchestration caching (RP03) for speed.

## Jobs Addressed

- RJ6 — Lean, Trustworthy CI/CD (primary)

## How It Works

### PR Validation Pipeline (Planned)

On every pull request:
1. Build the `build` container stage (or pull cached image)
2. Install dependencies (`pnpm install --frozen-lockfile`)
3. Run affected linting (`nx affected -t lint`)
4. Run affected type checking (`nx affected -t typecheck`)
5. Run affected tests (`nx affected -t test`)
6. Run affected builds (`nx affected -t build`)

### Merge Pipeline (Planned)

On merge to `main`:
1. Run full build/test/lint (not just affected)
2. Deploy infrastructure changes (if `infra/` changed)
3. Deploy affected apps (if configured for continuous deployment)

### Container-Based Execution

All CI commands run inside the `build` stage of the multi-stage Dockerfile, ensuring the CI environment is identical to the build layer of the devcontainer.

**Approach options:**
- Direct: `docker build --target build` then run commands inside
- `devcontainers/ci` GitHub Action: builds and runs the devcontainer
- GitHub-hosted runners with `.nvmrc`/corepack: lighter but less reproducible

### Caching Strategy (Planned)

- **Docker layer caching** — cache the base and build stages between runs
- **Nx task caching** — Nx Replay (remote cache) shares task outputs across CI runs
- **pnpm store caching** — cache the pnpm content-addressable store between runs

### Deployment (Planned)

- Firebase Functions: `nx run functions:deploy`
- Web apps: build output → hosting platform
- Infrastructure: `pulumi up` with stack selection

## Dependencies

- Requires: RP03 (Build Orchestration) — CI uses affected detection and caching
- Requires: RP06 (Build Container) — CI runs inside the build container
- Requires: RP08 (Version Control) — branch conventions trigger CI

## Open Questions

- [ ] GitHub Actions vs. alternative CI? (GitHub Actions is the default assumption)
- [ ] Use `devcontainers/ci` action for exact parity, or direct Docker build for speed?
- [ ] Deploy preview environments for PRs? (e.g., Firebase preview channels)
- [ ] Required status checks — which jobs must pass before merge?
