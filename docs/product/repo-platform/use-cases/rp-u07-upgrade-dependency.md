---
id: "rp-u07"
type: use-case
title: "Upgrading a Shared Runtime Dependency"
status: defining
owner: architecture-agent
created: 2025-02-09
updated: 2026-02-24
refs:
  depends-on: [rp01, rp05, rp06]
  related: [rp-u01]
tags: [repo-platform, use-case, maintenance]
---

# RP-U07 — Upgrading a Shared Runtime Dependency

## Scenario

Rust or Bazel releases a new version with important fixes. A developer upgrades the pinned version and the change must propagate to all environments — local dev, containers, Bazel, and CI.

### Steps (Rust Toolchain Upgrade)

1. Update `rust-toolchain.toml` `channel` (single source of truth)
2. Update `MODULE.bazel` Rust toolchain version list to match
3. Update CI toolchain pin (GitHub Actions)
4. Rebuild devcontainer (it installs from `rust-toolchain.toml`)
5. Verify:
   - `cargo run -p syntropy -- check`
   - `bazel build //products/command-center/apps/cli:syntropy`
6. Commit all changes in a single PR for review

### Steps (Bazel Upgrade)

1. Update `.bazelversion`
2. Verify Bazelisk (local/devcontainer/CI) picks it up
3. Run `bazel build //products/command-center/apps/cli:syntropy`
4. Commit in a single PR

### Outcome

- The version change is tracked in version control
- All environments pick up the new version: bare-metal (via rustup + toolchain file), devcontainer, Bazel, CI
- If CI fails, the PR catches it before merge

## Features Exercised

- RP01 — Toolchain Version Management (Rust toolchain, Bazel version)
- RP05 — Development Container (toolchain propagation)
- RP06 — Build Container (CI parity)

## Acceptance Criteria

- [ ] Version change requires updating no more than 3 files
- [ ] Devcontainer rebuilds with the new version
- [ ] CI passes with the new version before merge
- [ ] No developer has to manually guess versions (pinned files drive installs)
