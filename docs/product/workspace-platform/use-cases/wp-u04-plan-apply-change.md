---
id: "wp-u04"
type: use-case
title: "Planning and Applying a Structural Change"
status: defining
owner: workspace-contracts-agent
created: 2026-02-21
updated: 2026-02-21
refs:
  depends-on: [wp01, wp03, wp04]
  related: [wp-u02, wp-u03, wp-u05]
tags: [workspace-platform, use-case, plan-apply, refactoring]
---

# WP-U04 — Planning and Applying a Structural Change

## Scenario

A developer needs to make a structural change — renaming a service, moving a crate, or reorganizing part of the workspace. Instead of manually moving files and updating references, they use the plan/apply engine to preview and execute the change safely.

### Steps

1. Developer runs a structural command, e.g., `syntropy rename service auth authentication`
2. The plan/apply engine computes the full patchset:
   - Directory rename: `products/command-center/services/auth/` → `products/command-center/services/authentication/`
   - Config update: `syntropy.toml` service name change
   - Reference updates: import paths, build configs, workspace members
3. Validation is run on the projected post-apply state
4. The patchset is presented:
   ```
   Plan: rename service 'auth' → 'authentication'

     ~ syntropy.toml               (modify: rename service entry)
     ~ Cargo.toml                  (modify: workspace member path)
     > services/auth/ → services/authentication/  (move directory)
     ~ services/authentication/Cargo.toml  (modify: package name)

   Validation: PASS (0 errors, 0 warnings)

   Apply this change? [y/n]
   ```
5. Developer confirms
6. Change is applied atomically
7. Post-apply validation runs to confirm success

### Outcome

- Structural change is previewed before execution
- All references are updated consistently
- No "half-done" refactors where some files moved but references are stale
- Validation confirms the workspace is coherent after the change
- If anything fails, the change is rolled back

## Features Exercised

- WP01 — Workspace Contract (contract updated with the change)
- WP03 — Validation Engine (validates projected and actual post-apply state)
- WP04 — Plan/Apply Engine (computes, previews, and executes the patchset)

## Acceptance Criteria

- [ ] Plan output shows every file that will be created, modified, moved, or deleted
- [ ] Validation runs on the projected state before apply
- [ ] Apply is atomic — all changes succeed or none do
- [ ] `syntropy validate` passes after the change
- [ ] Import paths and build references are updated consistently
- [ ] `--dry-run` shows the plan without prompting for apply
