---
id: "rp04"
type: feature-spec
title: "Project Configuration"
status: defining
owner: architecture-agent
priority: P0
created: 2025-02-09
updated: 2026-02-24
refs:
  depends-on: [rp02]
  enables: [rp-u02, rp-u03, rp10]
  related: [adr-006, adr-004, arch-stack, rp-stories, rp03, rp08, surf-repo-platform]
  informed-by: [jtbd-repo-platform]
tags: [repo-platform, compiler, type-safety, rust, p0]
---

# RP04 — Project Configuration

## Summary

Defines consistent compiler/tooling configuration across the repo so cross-package contracts are type-safe and changes are caught early.

Current implementation is Rust-first (ADR-006). If/when additional languages are introduced, this spec expands to cover their shared configuration and boundaries.

## Jobs Addressed

- RJ8 — Type-Safe Cross-Package Contracts (primary)
- RJ2 — Fast Incremental Builds (secondary)

## How It Works

### Rust Workspace Configuration

The Rust workspace defines shared build units and dependency boundaries.

**Currently:** `Cargo.toml` workspace members include:
- `platform/crates/syntropy-sdk`
- `products/command-center/apps/cli`

### Edition + Formatting + Linting

Tooling defaults are pinned and enforced via paved-road commands:
- Rust edition: 2021
- Formatting: `rustfmt` (pinned via `rust-toolchain.toml`)
- Linting: `clippy` (pinned via `rust-toolchain.toml`)

### Deterministic Outputs

Where the platform emits machine-readable output (JSON), keys and schema versions are kept stable (Workspace Platform invariants).

## Dependencies

- Requires: RP02 (Workspace & Module Management)
- Enables: RP10 (Code Quality Automation)

## Open Questions

- [ ] Do we want a repo-level `cargo fmt --check` / `cargo clippy` drift gate in CI?
- [ ] If a TypeScript codebase is reintroduced later, should it live in a separate repo or a bounded subtree here?
