---
id: "rp-u02"
type: use-case
title: "Adding a New Build Unit"
status: defining
owner: architecture-agent
created: 2025-02-09
updated: 2026-02-24
refs:
  depends-on: [rp02, rp03, rp04]
  related: [adr-006, adr-004, rp-u03, wp-u02, wp05]
tags: [repo-platform, use-case, scaffolding]
---

# RP-U02 — Adding a New Build Unit

## Scenario

A developer needs to add a new Rust crate (library) or a new shipped app (binary). The new unit must integrate with the workspace structure, build orchestration, and drift gates.

### Steps

1. Create the crate/app directory:
   - Library: `platform/crates/<crate-name>/`
   - App: `products/<product>/apps/<app-name>/`
2. Create `Cargo.toml` for the new crate/app
3. Add the new crate/app to the root `Cargo.toml` workspace `members`
4. (Bazel) Add a `BUILD.bazel` target for the new crate/app
5. (Workspace contracts) Add a `syntropy.toml` `[[override]]` for the new path (purpose/kind/rules)
6. Generate/update folder README contracts: `cargo run -p syntropy -- gen readmes`
7. Verify:
   - `cargo build` / `cargo test`
   - `bazel build //...` (or the specific target)
   - `cargo run -p syntropy -- check`

### Outcome

- The new build unit is discoverable by Cargo and/or Bazel
- Repo structure is documented via deterministic folder contracts
- CI can validate and build the new unit without special cases

## Features Exercised

- RP02 — Workspace & Module Management (workspace membership)
- RP03 — Build Orchestration (dependency graph and caching)
- RP04 — Project Configuration

## Acceptance Criteria

- [ ] `cargo build` succeeds
- [ ] `bazel build` succeeds for the new target (if Bazel coverage is required)
- [ ] `cargo run -p syntropy -- check` is clean after generation
