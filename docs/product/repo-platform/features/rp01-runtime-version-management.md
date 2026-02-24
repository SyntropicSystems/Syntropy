---
id: "rp01"
type: feature-spec
title: "Toolchain Version Management"
status: defining
owner: architecture-agent
priority: P0
created: 2025-02-09
updated: 2026-02-24
refs:
  depends-on: []
  enables: [rp-u01, rp-u07, rp02, rp03, rp05, rp06, rp07]
  informed-by: [jtbd-repo-platform]
  related: [adr-004, adr-006, arch-stack, rp-stories, rp03, rp05, surf-repo-platform]
tags: [repo-platform, toolchain, rust, bazel, p0]
---

# RP01 — Toolchain Version Management

## Summary

Pins the exact Rust toolchain and Bazel version used across all environments — local development, containers, and CI — so that builds and outputs are deterministic. A single version change propagates to all consumers.

## Jobs Addressed

- RJ3 — Consistent Runtime Versions Everywhere (primary)
- RJ9 — Zero-Friction Contributor Onboarding (secondary)

## How It Works

### Rust Toolchain Pinning

A `rust-toolchain.toml` file at the repo root pins the Rust toolchain version. Tools using `rustup` will automatically install/use the pinned toolchain.

**Currently:** `rust-toolchain.toml` → `channel = "1.93.1"`

### Cargo Dependency Pinning

`Cargo.lock` pins transitive dependency versions for reproducible builds.

**Currently:** `Cargo.lock` is checked in at repo root.

### Bazel Version Pinning

`.bazelversion` pins the Bazel version used by Bazelisk (locally and in CI).

**Currently:** `.bazelversion` → `9.0.0`

### Bazel Rust Toolchain Pinning

`MODULE.bazel` pins the Rust toolchain version used by Bazel `rules_rust`. This must stay aligned with `rust-toolchain.toml`.

**Currently:** `MODULE.bazel` → `versions = ["1.93.1"]`

## Dependencies

- Requires: nothing (foundational capability)
- Enables: RP02 (Workspace Management), RP03 (Build Orchestration), RP05 (Dev Container), RP06 (Build Container)

## Open Questions

- [ ] Should we add a drift gate to ensure `rust-toolchain.toml` matches `MODULE.bazel`?
- [ ] Should CI also run `rustfmt`/`clippy` as required checks (see RP10)?
