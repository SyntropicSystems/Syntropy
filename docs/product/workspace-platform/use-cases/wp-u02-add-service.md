---
id: "wp-u02"
type: use-case
title: "Adding a Service to an Existing Workspace"
status: defining
owner: workspace-contracts-agent
created: 2026-02-21
updated: 2026-02-21
refs:
  depends-on: [wp01, wp04, wp05]
  related: [rp-u02, wp-u01, wp-u04, wp-u06]
tags: [workspace-platform, use-case, scaffolding, service]
---

# WP-U02 — Adding a Service to an Existing Workspace

## Scenario

A developer needs to add a new service (e.g., `payments`) to the workspace. Instead of manually creating directories, config files, and boilerplate, they use the CLI's scaffolding command which puts everything in the right place.

### Steps

1. Developer runs `syntropy add service payments --product command-center`
2. The CLI reads `syntropy.toml` to understand the workspace structure
3. The CLI selects the appropriate service blueprint (Rust service by default, or specified via `--type`)
4. A patchset is generated showing:
   - New directory: `products/command-center/services/payments/`
   - New files: `Cargo.toml`, `src/main.rs`, `BUILD.bazel`
   - Modified: `syntropy.toml` (new service entry)
   - Modified: workspace-level `Cargo.toml` (new workspace member)
5. Developer reviews the plan
6. On confirmation, the patchset is applied atomically
7. `syntropy validate` runs to confirm coherence

### Outcome

- New service exists in the correct location with all required boilerplate
- `syntropy.toml` is updated with the new service entry
- Build system configuration is updated
- Validation passes — the service is immediately buildable
- No guessing about where files go or what conventions to follow

## Features Exercised

- WP01 — Workspace Contract (contract updated with new service)
- WP04 — Plan/Apply Engine (change previewed and applied atomically)
- WP05 — Scaffolding & Generators (service blueprint generates the structure)

## Acceptance Criteria

- [ ] Service is created in `products/<product>/services/<name>/`
- [ ] `syntropy.toml` includes the new service in its services list
- [ ] All generated files follow the workspace's naming conventions
- [ ] The service compiles/builds immediately after scaffolding
- [ ] `syntropy validate` passes after the addition
- [ ] Running `syntropy add service` with a duplicate name shows a clear error
