---
id: "wp01"
type: feature-spec
title: "Workspace Contract"
status: building
owner: workspace-contracts-agent
priority: P0
created: 2026-02-21
updated: 2026-02-23
refs:
  depends-on: [wp08]
  enables: [wp02, wp03, wp04, wp05, wp06, wp-u01, wp-u02]
  related: [wp07, rp02]
  informed-by: [jtbd-workspace-platform]
  architecture: [arch-workspace-contracts]
  decided-by: [dr-001]
  open-questions: []
tags: [workspace-platform, contract, config, p0]
---

# WP01 — Workspace Contract

## Summary

The workspace contract is `syntropy.toml` — the single reviewed configuration file that defines a workspace's structure, services, conventions, and behavior. It is strict (unknown keys error), schema-validated, and versioned. It replaces scattered config files with one canonical source of truth for what the workspace is.

## Bootstrap Implementation (v0)

The bootstrap slice implements a minimal, strict TOML contract loader in `platform/crates/syntropy-sdk`:

- Contract location: `syntropy.toml` (repo root)
  - Workspace discovery also supports `.syntropy/syntropy.toml` for compatibility
- Strict parsing: unknown keys error (`serde` + `deny_unknown_fields`)
- Supported sections (v0 bootstrap):
  - `[workspace]`: `name`, `blueprint`
  - `[output]`: `format_default` (`human|json`), `generate_readmes` (bool)
  - `[[override]]`: per-path overrides for `kind`, `purpose`, `rules`, `boundaries`, `readme_filename`

Schema snapshot generation and drift gates are deferred to WP08.

## Jobs Addressed

- WJ1 — Define Workspace Structure Through a Single Reviewed Contract (primary)
- WJ8 — Separate Human Artifacts From Machine State (secondary)

## How It Works

### The Contract File

`syntropy.toml` lives at the repository root and declares:

- **Workspace metadata**: name, version, description
- **Schema version**: which contract version this workspace targets (e.g., `schema = "v0"`)
- **Products**: the shipped surfaces built on the platform (e.g., `command-center`)
- **Services and apps**: what components exist, where they live, their type
- **Conventions**: naming rules, directory structure expectations, checked-in vs ignored patterns
- **Extensions**: project-specific generators, templates, overrides

### Strict Validation

The contract enforces strict parsing:
- Unknown keys cause hard errors (not warnings)
- Missing required fields cause hard errors
- Type mismatches cause hard errors
- This prevents the config layer from becoming a junk drawer

### The Three Workspace Layers

The contract establishes a clean mental model with three separate concerns:

1. **`syntropy.toml`** — the workspace contract (what humans review)
2. **`.syntropy/`** — the workspace instance (human-facing artifacts: tasks, SoW docs, signals)
3. **`.syntropy/state/`** — machine state/cache (ignored, never reviewed)

This keeps "what we do" (`.syntropy/`) separate from "how the system behaves" (`syntropy.toml`) separate from "tool internals" (`.syntropy/state/`).

### Checked-In vs Ignored

The contract defines explicit gitignore semantics:

**Checked in:**
- `syntropy.toml`
- `.syntropy/system-of-work/**` (playbooks, workflows, templates, conventions)
- `.syntropy/tasks/**` (if tasks are real artifacts)

**Ignored:**
- `.syntropy/state/**` (indexes, run DB, caches)
- `.syntropy/logs/**`
- `.syntropy/tmp/**`

## Dependencies

- Requires: WP08 (Contract Schema System) — the schema that validates the contract
- Enables: WP02 (Workspace Instance), WP03 (Validation Engine), WP04 (Plan/Apply Engine), WP05 (Scaffolding), WP06 (Migrations)

## Open Questions

- [ ] Exact TOML schema for v0 — what sections, what keys?
- [ ] Should `syntropy.toml` support environment-specific overrides?
- [ ] How does the contract reference external schemas (e.g., custom service types)?
