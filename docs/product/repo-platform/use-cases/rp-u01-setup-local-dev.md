---
id: "rp-u01"
type: use-case
title: "Setting Up Local Development"
status: defining
owner: architecture-agent
created: 2025-02-09
updated: 2026-02-24
refs:
  depends-on: [rp01, rp02, rp05]
  related: [rp-u06, rp-u07, wp-u01]
tags: [repo-platform, use-case, onboarding]
---

# RP-U01 — Setting Up Local Development

## Scenario

A new contributor joins the project and needs a working development environment. They should be productive within minutes, regardless of their host OS or existing tool installations.

### Path A: Devcontainer (Recommended)

1. Clone the repository
2. Open in VS Code or Cursor
3. Accept the "Reopen in Container" prompt
4. Wait for the container to build (first time) or start (cached)
5. The `postCreateCommand` runs `cargo run -p syntropy -- check` automatically
6. Start developing — all tools, extensions, and settings are pre-configured

### Path B: Bare-Metal

1. Clone the repository
2. Install rustup
3. Install the pinned toolchain: `rustup toolchain install` (reads `rust-toolchain.toml`)
4. Install Bazelisk (or Bazel) and ensure `.bazelversion` is respected
5. Run `cargo run -p syntropy -- check`

### Outcome

- The contributor has the pinned Rust toolchain and Bazel version
- Editor has the correct extensions and settings (devcontainer path)
- The contributor can run `cargo build`, `cargo test`, `cargo run -p syntropy -- check`, and Bazel builds immediately

## Features Exercised

- RP01 — Toolchain Version Management (pinned Rust + Bazel)
- RP02 — Workspace & Module Management (Cargo workspace + Bazel modules)
- RP05 — Development Container (full environment in a container)

## Acceptance Criteria

- [ ] `cargo run -p syntropy -- check` succeeds with zero manual intervention after clone
- [ ] `bazel build //products/command-center/apps/cli:syntropy` succeeds in a fresh devcontainer
- [ ] VS Code shows correct Rust Analyzer diagnostics across crate boundaries
- [ ] Time from clone to first successful build is under 5 minutes
