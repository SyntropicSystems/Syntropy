---
id: "rp-u03"
type: use-case
title: "Running an Incremental Build After Code Changes"
status: defining
owner: architecture-agent
created: 2025-02-09
updated: 2026-02-24
refs:
  depends-on: [rp03, rp04]
  related: [rp-u02, rp-u05]
tags: [repo-platform, use-case, build]
---

# RP-U03 — Running an Incremental Build After Code Changes

## Scenario

A developer modifies code in `platform/crates/syntropy-sdk/` and wants to verify the build. They run `cargo build` and/or the relevant Bazel target and expect only the affected crates/actions to rebuild — not the entire world.

### Steps

1. Developer edits a file in `platform/crates/syntropy-sdk/src/`
2. Runs `cargo build` (and optionally `cargo test`)
3. Cargo rebuilds only the affected crate(s) and dependents (incremental compilation)
4. (Optional) Runs `bazel build //products/command-center/apps/cli:syntropy`
5. Bazel rebuilds only affected actions (content-addressed cache)
6. Developer sees build output quickly and deterministically

### Outcome

- Only changed crates and their dependents rebuild
- Total build time scales with the change, not the repo size
- Bazel builds are cacheable and reproducible

## Features Exercised

- RP03 — Build Orchestration (content-hash caching, dependency-aware ordering)
- RP04 — Project Configuration (workspace boundaries and tooling)

## Acceptance Criteria

- [ ] Second consecutive `cargo build` with no changes completes quickly (incremental/no-op)
- [ ] `bazel build //products/command-center/apps/cli:syntropy` reuses cache when inputs are unchanged
