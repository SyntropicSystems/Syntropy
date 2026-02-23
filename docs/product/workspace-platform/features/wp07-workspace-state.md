---
id: "wp07"
type: feature-spec
title: "Workspace State & Hydration"
status: exploring
owner: workspace-contracts-agent
priority: P0
created: 2026-02-21
updated: 2026-02-21
refs:
  architecture: [arch-workspace-contracts]
  depends-on: [wp01, wp02]
  enables: [wp-u07]
  informed-by: [jtbd-workspace-platform]
  open-questions: []
  related: [surf-workspace-platform, wp-stories, wp03, wp04, wp05, wp08]
tags: [workspace-platform, state, hydration, agents, p0]
---

# WP07 — Workspace State & Hydration

## Summary

Workspace state is the structured, machine-readable representation of what a workspace currently is — its components, dependencies, validation status, and configuration. `syntropy state --json` outputs a `WorkspaceState` contract that agents, tools, and automations use to hydrate their understanding without parsing files or inferring meaning.

## Jobs Addressed

- WJ7 — Hydrate Agents and Tools With Structured Workspace State (primary)
- WJ1 — Define Workspace Structure Through a Single Reviewed Contract (secondary)

## How It Works

### The WorkspaceState Contract

`syntropy state --json` outputs:

```json
{
  "schema_version": "v0",
  "workspace": {
    "name": "syntropy",
    "schema": "v0",
    "root": "/path/to/syntropy"
  },
  "platform": {
    "crates": [
      { "name": "syntropy-kernel", "path": "platform/crates/syntropy-kernel", "type": "rust-crate" },
      { "name": "syntropy-workspace", "path": "platform/crates/syntropy-workspace", "type": "rust-crate" }
    ],
    "adapters": [
      { "name": "fs", "path": "platform/adapters/fs", "type": "adapter" }
    ],
    "contracts": {
      "runtime": "platform/contracts/runtime",
      "workspace": "platform/contracts/workspace"
    }
  },
  "products": [
    {
      "name": "command-center",
      "apps": [{ "name": "cli", "path": "products/command-center/apps/cli" }],
      "services": []
    }
  ],
  "tooling": {
    "bazel": true,
    "codegen": "tools/codegen"
  },
  "validation": {
    "last_run": "2026-02-21T10:30:00Z",
    "valid": true
  }
}
```

### Hydration Use Cases

**Agent hydration**: When an AI agent starts working on the workspace, it calls `syntropy state --json` to understand:
- What components exist
- How they're organized
- What the dependency graph looks like
- Whether the workspace is currently valid

**CI hydration**: CI pipelines use workspace state to determine:
- What to build
- What to validate
- What changed relative to the baseline

**Tool hydration**: IDE extensions, MCP servers, and other tools consume workspace state to provide intelligent assistance.

### State vs Contract vs Instance

Three distinct concepts:
- **Contract** (`syntropy.toml`): what the workspace should be (declarative)
- **Instance** (`.syntropy/`): what the workspace contains (artifacts)
- **State** (`syntropy state`): what the workspace is right now (computed)

State is derived — it's computed from the contract + instance + filesystem reality. It's never stored as source of truth; it's always recomputed.

## Dependencies

- Requires: WP01 (Workspace Contract) — state is derived from the contract
- Requires: WP02 (Workspace Instance) — state includes instance information

## Open Questions

- [ ] Should state include dependency graph information?
- [ ] Should state be cacheable, or always recomputed?
- [ ] What's the contract for partial state (workspace with errors)?
- [ ] Should state include git-level info (branch, dirty state, last commit)?
