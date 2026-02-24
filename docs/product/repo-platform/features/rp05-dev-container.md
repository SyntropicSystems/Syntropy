---
id: "rp05"
type: feature-spec
title: "Development Container"
status: defining
owner: architecture-agent
priority: P0
created: 2025-02-09
updated: 2026-02-24
refs:
  decided-by: [adr-006]
  depends-on: [rp01, rp06]
  enables: [rp-u01, rp-u06, rp-u07]
  related: [adr-006, adr-005, rp-stories, rp02, rp06, surf-repo-platform]
  informed-by: [jtbd-repo-platform]
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

**Currently:** `.devcontainer/Dockerfile` installs a pinned Rust toolchain (from `rust-toolchain.toml`) and Bazelisk, then layers developer conveniences in the `devcontainer` stage.

### IDE Integration

The devcontainer spec's `customizations` field configures editor extensions and settings. These are applied automatically when the container opens.

**Currently:** VS Code customizations:
- Extensions: Rust Analyzer, Bazel, TOML support
- Default terminal: bash

### Lifecycle Hooks

The `postCreateCommand` runs after the container is built, installing workspace dependencies automatically.

**Currently:** `postCreateCommand: "cargo run -p syntropy -- check"`

### Non-Root User

The container runs as a non-root user (`dev`) with passwordless sudo for occasional root operations.

### GitHub Codespaces

The same `.devcontainer/` configuration works in GitHub Codespaces with zero additional setup. Codespaces provisions a cloud VM, builds the image, and provides a browser-based or local VS Code connection.

## Dependencies

- Requires: RP01 (Toolchain Version Management) — the container pins Rust and Bazel versions
- Requires: RP06 (Build Container) — the devcontainer extends the build stage
- Enables: RP-U01 (Setting Up Local Development), RP-U06 (GitHub Codespaces)

## Open Questions

- [ ] Should we pre-build and publish the devcontainer image to GHCR for faster startup?
- [ ] Do we want optional Features (GitHub CLI, Docker-in-Docker), or keep the base container minimal?
