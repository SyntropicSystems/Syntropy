---
id: "rp02"
type: feature-spec
title: "Workspace & Module Management"
status: defining
owner: architecture-agent
priority: P0
created: 2025-02-09
updated: 2026-02-24
refs:
  depends-on: [rp01]
  enables: [rp-u01, rp-u02, rp03, rp04, rp07]
  related: [adr-006, adr-004, arch-stack, rp-stories, rp05, rp08, surf-repo-platform, wp01]
  informed-by: [jtbd-repo-platform]
tags: [repo-platform, workspace, cargo, bazel, p0]
---

# RP02 — Workspace & Module Management

## Summary

Manages multiple build units within a single repository using workspace/module definitions. Internal crates/modules are linked locally, dependency resolution is centralized, and boundaries stay explicit as the repo grows.

## Jobs Addressed

- RJ5 — Domain-Isolated Package Boundaries (primary)
- RJ10 — Scalable Monorepo Growth (secondary)

## How It Works

### Workspace Definition

A workspace configuration file declares which directories contain build units. Tools discover and link them automatically.

**Currently (Rust):** `Cargo.toml` defines the Cargo workspace members (SDK + CLI).
**Currently (Bazel):** `MODULE.bazel` defines Bazel dependencies and Rust toolchains via `rules_rust`.

### Internal Dependencies

Crates/modules reference each other locally so changes are immediately visible without publishing.

**Currently:** Cargo workspace path dependencies and Bazel `//...` labels.

### Boundary Clarity

The repository layout and workspace contracts ensure new build units have obvious homes:
- Rust libraries live in `platform/crates/`
- Rust binaries live in `products/**/apps/**`

## Dependencies

- Requires: RP01 (Toolchain Version Management)
- Enables: RP03 (Build Orchestration), RP04 (Project Configuration)

## Open Questions

- [ ] Should we automatically discover and generate README contracts for crates under `platform/crates/*`?
