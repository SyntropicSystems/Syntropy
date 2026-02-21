---
id: "wp-u05"
type: use-case
title: "Migrating to a New Contract Version"
status: defining
owner: workspace-contracts-agent
created: 2026-02-21
updated: 2026-02-21
refs:
  depends-on: [wp01, wp04, wp06, wp08]
  related: [wp-u04]
tags: [workspace-platform, use-case, migration, versioning]
---

# WP-U05 — Migrating to a New Contract Version

## Scenario

A new version of the workspace contract schema is released (e.g., v0 → v1). The developer needs to upgrade their workspace configuration to the new version. The migration system handles the transformation automatically.

### Steps

1. Developer updates the Syntropy CLI to the latest version (which supports the new schema)
2. Developer runs `syntropy migrate` (or `syntropy migrate --to v1`)
3. The migration system:
   - Reads current schema version (`v0`) from `syntropy.toml`
   - Resolves migration path: v0 → v1
   - Computes the transformation patchset
4. The migration plan is presented:
   ```
   Migration: v0 → v1

   Changes:
     ~ syntropy.toml  (3 changes)
       + Added: [workspace.features] section (new in v1)
       ~ Renamed: [services] → [components.services]
       ~ Renamed: [apps] → [components.apps]
     ~ .syntropy/system-of-work/conventions.toml  (1 change)
       + Added: validation-profile field

   Validation (post-migration): PASS

   Apply migration? [y/n]
   ```
5. Developer reviews and confirms
6. Migration is applied through plan/apply
7. Post-migration validation confirms the workspace is valid under the new schema

### Outcome

- Workspace is upgraded to the new contract version
- All config files are transformed correctly
- No manual editing required
- The workspace validates under the new schema
- If migration fails, the workspace remains on the old version (no partial state)

## Features Exercised

- WP01 — Workspace Contract (contract is transformed)
- WP04 — Plan/Apply Engine (migration executed transactionally)
- WP06 — Migrations (migration path resolved and applied)
- WP08 — Contract Schema System (validates against new schema)

## Acceptance Criteria

- [ ] `syntropy migrate` detects the current and target versions correctly
- [ ] Migration plan shows every change clearly
- [ ] Migration is applied atomically (all or nothing)
- [ ] `syntropy validate` passes after migration under the new schema version
- [ ] Running `syntropy migrate` on an already-current workspace is a no-op
- [ ] Multi-step migrations (v0 → v1 → v2) chain correctly
