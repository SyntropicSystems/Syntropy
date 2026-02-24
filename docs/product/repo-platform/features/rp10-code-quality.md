---
id: "rp10"
type: feature-spec
title: "Code Quality Automation"
status: exploring
owner: architecture-agent
priority: P1
created: 2025-02-09
updated: 2026-02-24
refs:
  decided-by: [adr-006]
  depends-on: [rp03, rp04]
  enables: [rp-u05]
  informed-by: [jtbd-repo-platform]
  related: [rp-stories, rp08, rp09, surf-repo-platform, wp03]
tags: [repo-platform, linting, formatting, quality, p1]
---

# RP10 — Code Quality Automation

## Summary

Automated code quality enforcement across all packages — linting for correctness, formatting for consistency, type checking for safety, and module boundary enforcement for architectural integrity. Runs locally, in editors, and in CI.

## Jobs Addressed

- RJ7 — Automated Code Quality (primary)

## How It Works

### Linting

Static analysis to catch bugs, enforce patterns, and flag anti-patterns.

**Currently (Rust):** `cargo clippy` (toolchain pinned via `rust-toolchain.toml`).

### Formatting

Automatic code formatting for consistent style.

**Currently (Rust):** `cargo fmt` (toolchain pinned via `rust-toolchain.toml`).

### Type Checking

The Rust compiler provides type checking across the workspace.

**Currently:** `cargo build` / `cargo test` across the workspace.

### Module Boundary Enforcement (Planned)

Rules that prevent crates/modules from importing outside their allowed dependency graph (e.g., `platform/` must not depend on `products/`).

**Planned:** Dedicated validators in the Workspace Platform (contract + validation rules), plus optional build-system enforcement.

### Pre-Commit Hooks (Planned)

Run linting and formatting on staged files before each commit to catch issues early.

**Planned:** Lightweight git hooks (tool TBD) to run `cargo fmt` and `cargo clippy` on changed crates.

### Editor Integration

Quality tools integrated into editors via extensions for real-time feedback.

**Currently:** Rust Analyzer provides inline diagnostics; devcontainer recommends Rust + Bazel extensions.

## Dependencies

- Requires: RP03 (Build Orchestration) — lint/format tasks orchestrated by the build tool
- Requires: RP04 (Project Configuration)

## Open Questions

- [ ] Should CI require `cargo fmt --check` and `cargo clippy`?
- [ ] Do we want dependency/license/security gates (e.g., `cargo deny`, `cargo audit`)?
