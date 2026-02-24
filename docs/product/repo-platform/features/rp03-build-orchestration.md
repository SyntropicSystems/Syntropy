---
id: "rp03"
type: feature-spec
title: "Build Orchestration & Caching"
status: defining
owner: architecture-agent
priority: P0
created: 2025-02-09
updated: 2026-02-24
refs:
  depends-on: [rp01, rp02]
  enables: [rp-u02, rp-u03, rp-u05, rp09, rp10]
  related: [adr-006, adr-004, arch-stack, rp-stories, rp04, rp06, surf-repo-platform]
  informed-by: [jtbd-repo-platform]
tags: [repo-platform, build, caching, cargo, bazel, p0]
---

# RP03 — Build Orchestration & Caching

## Summary

Orchestrates build, test, and validation tasks across the Rust workspace. Uses deterministic generators and drift gates for repo contracts, and leverages Cargo + Bazel caching to keep feedback loops fast.

## Jobs Addressed

- RJ2 — Fast Incremental Builds (primary)
- RJ6 — Lean, Trustworthy CI/CD (secondary)

## How It Works

### Dependency-Aware Task Execution

The orchestrator uses the Rust workspace graph (Cargo) and/or Bazel targets to run tasks in the correct order.

**Currently (Cargo):** `cargo build`, `cargo test`, `cargo run -p syntropy -- check`
**Currently (Bazel):** `bazel build //products/command-center/apps/cli:syntropy`

### Content-Hash Caching

Caching comes from:
- **Cargo incremental compilation** — skips unchanged crates and reuses build artifacts
- **Bazel action cache** — content-addressed caching of build steps and external deps

Remote caching is possible later if needed (Bazel remote cache, buildfarm, etc.).

### Drift Gates (Deterministic Generation)

Repo structure and tooling adapters are treated as deterministic projections, not hand-maintained files. Drift gates ensure the repo stays coherent:
- `syntropy gen cli-docs --check`
- `syntropy gen readmes --check`
- `syntropy gen agents --check`

**Currently:** `syntropy check` is the single entrypoint that runs all drift gates + workspace validation.

## Dependencies

- Requires: RP01 (Toolchain Version Management), RP02 (Workspace & Module Management)
- Enables: RP09 (CI/CD Pipeline), RP10 (Code Quality Automation)

## Open Questions

- [ ] Should we add a `bazel test //...` target set once tests exist under Bazel?
- [ ] Should we introduce a `tools/` directory for repo automation scripts as the platform grows?
