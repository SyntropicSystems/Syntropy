---
id: "rp06"
type: feature-spec
title: "Build Container"
status: defining
owner: architecture-agent
priority: P0
created: 2025-02-09
updated: 2026-02-24
refs:
  decided-by: [adr-006]
  depends-on: [rp01]
  enables: [rp-u05, rp-u07, rp05, rp09]
  related: [adr-006, adr-005, rp-stories, rp03, rp05, surf-repo-platform]
  informed-by: [jtbd-repo-platform]
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

The `build` stage extends the `base` stage and includes only what CI strictly needs beyond the OS:
- pinned Rust toolchain (from `rust-toolchain.toml`)
- Bazelisk (reads `.bazelversion`)
- minimal system packages for builds (git, ca-certs, build essentials)

**Currently:** `.devcontainer/Dockerfile` stages:
1. `base` — Debian + Rust toolchain + Bazelisk
2. `build` — base (lean CI stage)

### Strict Subset Guarantee

The build container is a strict subset of the devcontainer (RP05). The relationship `devcontainer FROM build FROM base` means any code that builds in CI will build in dev. This prevents drift by construction, not by discipline.

### CI Usage

CI pipelines target the `build` stage directly:
```bash
docker build --target build -f .devcontainer/Dockerfile -t syntropy-build .
```

### Self-Hosted Runner Ready

The `build` stage can serve directly as a self-hosted GitHub Actions runner image if the project moves to self-hosted infrastructure. Because it's the same image used for CI builds, runner state drift is eliminated.

## Dependencies

- Requires: RP01 (Toolchain Version Management)
- Enables: RP05 (Development Container) — devcontainer extends this stage
- Enables: RP09 (CI/CD Pipeline) — CI runs inside this container

## Open Questions

- [ ] Should we publish the build image to GHCR for CI pull-based usage?
- [ ] Add a `.dockerignore` to exclude large, non-build inputs from the build context if image builds become slow?
