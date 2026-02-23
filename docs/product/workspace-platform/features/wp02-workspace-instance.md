---
id: "wp02"
type: feature-spec
title: "Workspace Instance"
status: exploring
owner: workspace-contracts-agent
priority: P0
created: 2026-02-21
updated: 2026-02-21
refs:
  architecture: [arch-workspace-contracts]
  depends-on: [wp01]
  enables: [wp-u01, wp03]
  informed-by: [jtbd-workspace-platform]
  open-questions: []
  related: [arch-north-star-layout, surf-workspace-platform, wp-stories, wp06, wp07]
tags: [workspace-platform, instance, directory, p0]
---

# WP02 — Workspace Instance

## Summary

The workspace instance is the `.syntropy/` directory — the runtime home for both human-facing artifacts and machine-generated state. It gives Syntropy a clear home in any repository without polluting the project's own structure, and establishes explicit conventions for what's version-controlled and what's ephemeral.

## Jobs Addressed

- WJ8 — Separate Human Artifacts From Machine State (primary)
- WJ1 — Define Workspace Structure Through a Single Reviewed Contract (secondary)

## How It Works

### Directory Structure

```
.syntropy/
  tasks/                     # Human-created task artifacts
  system-of-work/            # Playbooks, workflows, templates, conventions
    templates/               # Project-specific scaffold templates
    generators/              # Project-specific generators
    workflows/               # Project-specific workflow overrides
    conventions.toml         # Project-specific convention overrides
  signals/                   # Captured observations and signals
  state/                     # Machine state (gitignored)
    index/                   # Workspace index/cache
    runs/                    # Execution run database
    logs/                    # Runtime logs
    tmp/                     # Temporary workspace
```

### Human vs Machine Separation

The critical distinction:
- **Human artifacts** (tasks, SoW, signals): version-controlled, reviewed, meaningful in diffs
- **Machine state** (state/): gitignored, ephemeral, rebuildable from scratch

This single choice prevents 80% of future entropy by keeping git diffs meaningful and code review focused.

### Initialization

When `syntropy init` creates a workspace, it:
1. Creates `syntropy.toml` at the repo root
2. Creates `.syntropy/` with the standard directory structure
3. Adds `.syntropy/state/` to `.gitignore`
4. Creates a minimal `.syntropy/system-of-work/` scaffold

### The Mental Model

Everything in the repo fits one of five categories:
1. **Platform**: reusable foundation, versioned contracts, adapters
2. **Products**: concrete shipped surfaces built on the platform
3. **Tooling**: build/codegen/CI/devex that supports the repo
4. **Workspaces**: fixture/template instances to prove portability
5. **Your instance** (`.syntropy/`): dogfooding + real SoW artifacts

If a file doesn't clearly fit one of these, that's an entropy smell.

## Dependencies

- Requires: WP01 (Workspace Contract) — the contract defines what the instance contains
- Enables: WP03 (Workspace State) — state is read from the instance

## Open Questions

- [ ] Should `.syntropy/tasks/` use a specific format or be freeform?
- [ ] How does `.syntropy/system-of-work/` relate to platform-provided defaults?
- [ ] Should there be a `.syntropy/config.local.toml` for machine-specific overrides?
