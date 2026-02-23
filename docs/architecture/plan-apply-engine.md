---
id: "arch-plan-apply-engine"
type: architecture
title: "Plan/Apply Engine"
status: defining
owner: workspace-contracts-agent
created: 2026-02-21
updated: 2026-02-21
refs:
  decided-by: []
  related: [arch-workspace-contracts, surf-workspace-platform, wp04, wp05, wp06]
tags: [architecture, plan-apply, transactions]
---

# Plan/Apply Engine

## Overview

The plan/apply engine is the transactional mutation system for workspace structural changes. It ensures that every change — whether initiated by a human, CLI command, or AI agent — is previewed, validated, and applied atomically. This is the "antidote to repo-structure anxiety."

## Architecture

### The Transaction Model

Every workspace mutation follows this flow:

```
Intent → Plan → Validate → Review → Apply → Post-Validate
                                      ↓
                                   Rollback (if needed)
```

1. **Intent**: A desired change (e.g., "add service payments")
2. **Plan**: Engine computes the full set of file operations (PatchSet)
3. **Validate**: Projected post-apply state is validated against the workspace contract
4. **Review**: Human or automated policy reviews the patchset
5. **Apply**: File operations are executed atomically
6. **Post-Validate**: Full validation runs on the actual post-apply state
7. **Rollback**: If post-validation fails, all changes are reverted

### PatchSet Structure

A PatchSet is the unit of transactional change:

```rust
struct PatchSet {
    schema_version: SchemaVersion,
    operation: OperationType,
    parameters: Map<String, Value>,
    changes: Vec<Change>,
    validation_result: ValidationResult,
}

enum Change {
    Create { path: PathBuf, content: Vec<u8>, file_type: FileType },
    Modify { path: PathBuf, diff: Diff },
    Delete { path: PathBuf },
    Move { from: PathBuf, to: PathBuf },
}
```

### Operation Types

| Operation | CLI Command | What It Does |
|-----------|-------------|--------------|
| `init` | `syntropy init` | Create workspace from scratch |
| `add-service` | `syntropy add service <name>` | Scaffold new service |
| `add-app` | `syntropy add app <name>` | Scaffold new app |
| `add-crate` | `syntropy add crate <name>` | Scaffold new platform crate |
| `rename` | `syntropy rename <thing>` | Rename with reference updates |
| `move` | `syntropy move <thing>` | Relocate within structure |
| `migrate` | `syntropy migrate` | Contract version migration |
| `generate` | `syntropy generate <gen>` | Run custom generator |

### Atomicity Guarantees

The engine ensures atomicity through:

1. **Compute-then-execute**: All changes are computed before any are written
2. **Journal**: Changes are logged to `.syntropy/state/journal/` before execution
3. **Ordered execution**: Creates before modifies before deletes
4. **Rollback on failure**: If any change fails, all prior changes in the patchset are reverted
5. **Post-validation**: Even after successful apply, validation confirms coherence

### Integration With Blueprints

Scaffolding commands are syntactic sugar over the plan/apply engine:

```
syntropy add service payments
    ↓
Blueprint "rust-service" selected
    ↓
Template interpolation (name=payments)
    ↓
PatchSet generated
    ↓
Normal plan/apply flow
```

### Integration With Agents

AI agents interact with plan/apply through the same interface:

1. Agent calls `syntropy state --json` to understand current workspace
2. Agent determines desired changes
3. Agent generates a PatchSet (or uses CLI commands that produce one)
4. Human reviews the plan
5. Apply executes

This gives humans oversight of all structural changes, whether initiated by humans or agents.

## Design Principles

1. **No silent mutations**: Every change is visible before execution
2. **Validation gates**: Pre-apply and post-apply validation prevent broken states
3. **Human stays in the loop**: Even automated changes are reviewable
4. **Atomic by default**: Partial applies don't exist
5. **Journal for auditability**: Every apply is recorded

## Crate Location

`platform/crates/syntropy-ops/` — the operations engine that implements plan/apply.
