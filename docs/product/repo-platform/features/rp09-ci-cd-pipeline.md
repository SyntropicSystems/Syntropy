---
id: "rp09"
type: feature-spec
title: "CI/CD Pipeline"
status: exploring
owner: architecture-agent
priority: P1
created: 2025-02-09
updated: 2026-02-24
refs:
  depends-on: [rp03, rp06, rp08]
  enables: [rp-u05]
  informed-by: [jtbd-repo-platform]
  related: [adr-006, adr-005, rp-stories, rp10, surf-repo-platform]
tags: [repo-platform, ci-cd, github-actions, automation, p1]
---

# RP09 — CI/CD Pipeline

## Summary

Automated pipelines that run on pull requests and merges to validate code quality, build integrity, and test coverage. Pipelines execute inside the build container (RP06) for reproducibility and leverage build orchestration caching (RP03) for speed.

## Jobs Addressed

- RJ6 — Lean, Trustworthy CI/CD (primary)

## How It Works

### PR Validation Pipeline

On every pull request:
1. Run `cargo run -p syntropy -- check` (drift gates + workspace validation)
2. Run `bazel build //products/command-center/apps/cli:syntropy` (keeps Bazel green)

### Merge Pipeline

On merge to `main`:
1. Run the same validation steps as PRs
2. (Future) Add deployment jobs once the backend/app stack is decided

### Container-Based Execution

CI may run inside the build container (RP06) for stricter environment parity. Today, CI uses GitHub-hosted runners with pinned toolchains; containerized CI is an optional future hardening step.

**Approach options:**
- Direct: `docker build --target build` then run commands inside
- `devcontainers/ci` GitHub Action: builds and runs the devcontainer
- GitHub-hosted runners with pinned toolchains (current)

### Caching Strategy (Planned)

- **Docker layer caching** — cache the base and build stages between runs
- **Cargo cache** — cache Rust build artifacts where safe
- **Bazel cache** — cache Bazel outputs (local and/or remote)

### Deployment (Planned)

- Deferred until the backend/app stack is decided (ADR-006).

## Dependencies

- Requires: RP03 (Build Orchestration) — CI uses affected detection and caching
- Requires: RP06 (Build Container) — CI runs inside the build container
- Requires: RP08 (Version Control) — branch conventions trigger CI

## Open Questions

- [ ] GitHub Actions vs. alternative CI? (GitHub Actions is the default assumption)
- [ ] Use `devcontainers/ci` action for exact parity, or direct Docker build for speed?
- [ ] Deploy preview environments for PRs? (e.g., Firebase preview channels)
- [ ] Required status checks — which jobs must pass before merge?
