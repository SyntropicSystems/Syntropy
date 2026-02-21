---
id: "wp-u01"
type: use-case
title: "Initializing a New Workspace"
status: defining
owner: workspace-contracts-agent
created: 2026-02-21
updated: 2026-02-21
refs:
  depends-on: [wp01, wp02, wp05]
  related: [wp-u02, rp-u01]
tags: [workspace-platform, use-case, init]
---

# WP-U01 — Initializing a New Workspace

## Scenario

A developer starts a new project (or adopts Syntropy in an existing repo) and needs to set up the workspace contract and instance. They run `syntropy init`, which creates the foundational structure.

### Steps

1. Developer runs `syntropy init` in the repo root (or `syntropy init --from-existing` for existing repos)
2. The CLI detects whether this is a fresh repo or has existing structure
3. If fresh: prompts for workspace name and basic configuration
4. If existing: analyzes the current structure and proposes a mapping to the north star layout
5. The CLI generates a plan showing:
   - `syntropy.toml` to be created with initial config
   - `.syntropy/` directory structure to be created
   - `.gitignore` updates for `.syntropy/state/`
6. Developer reviews the plan
7. On confirmation, the plan is applied atomically
8. `syntropy validate` runs automatically to confirm the workspace is coherent

### Outcome

- `syntropy.toml` exists at the repo root with valid schema and metadata
- `.syntropy/` directory exists with standard structure (system-of-work, tasks, signals, state)
- `.syntropy/state/` is in `.gitignore`
- `syntropy validate` passes with no errors
- The workspace is ready for `syntropy add` commands

## Features Exercised

- WP01 — Workspace Contract (creates the contract file)
- WP02 — Workspace Instance (creates the instance directory)
- WP05 — Scaffolding & Generators (uses the init blueprint)

## Acceptance Criteria

- [ ] `syntropy init` creates a valid `syntropy.toml` at repo root
- [ ] `.syntropy/` directory follows the standard structure
- [ ] `.syntropy/state/` is gitignored
- [ ] `syntropy validate` passes immediately after init
- [ ] Re-running `syntropy init` in an initialized workspace shows a clear error (not a destructive overwrite)
- [ ] `syntropy init --from-existing` proposes sensible mappings for non-empty repos
