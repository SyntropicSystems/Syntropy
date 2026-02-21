---
id: "arch-workspace-contracts"
type: architecture
title: "Workspace Contract System"
status: defining
owner: workspace-contracts-agent
created: 2026-02-21
updated: 2026-02-21
refs:
  related: [arch-plan-apply-engine, arch-north-star-layout, wp01, wp03, wp07, wp08]
  decided-by: []
tags: [architecture, workspace, contracts]
---

# Workspace Contract System

## Overview

The workspace contract system provides the structural backbone for how Syntropy manages repositories. It defines a contract-first approach where every boundary — between the platform and a repo, between tools and the workspace, between agents and the filesystem — has a machine-checkable schema.

## Bootstrap Implementation (v0)

The first "bootstrap slice" is implemented to prove the system works end-to-end with low surface area:

- **SDK**: `platform/crates/syntropy-sdk` — workspace discovery + structured operations
- **CLI**: `products/command-center/apps/cli` — thin IO wrapper around the SDK (`syntropy` binary)
- **Workspace contract**: `syntropy.toml` (and discovery support for `.syntropy/syntropy.toml`; legacy: `.work/syntropy.toml`)
- **Blueprint**: built-in `north-star/v0`

Bootstrap commands:
- `syntropy init` — creates `syntropy.toml` and `.syntropy/state/.gitignore`
- `syntropy tree` — human tree or JSON (`--json`)
- `syntropy info` / `syntropy describe` — purpose/rules/boundaries for any path
- `syntropy gen readmes` — deterministic folder README contracts (with `--dry-run`)
- `syntropy agents sync` — generate `.claude/**` + `.codex/**` adapters from canonical agent specs
- `syntropy agents check` — drift gate for generated adapters (fails CI if out of date)
- `syntropy validate` — blueprint lint (currently warning-oriented)

Contract note: JSON Schema snapshot generation and drift gates are WP08 work; v0 outputs are versioned via `schema_version: "v0"` and kept deterministic.

## Core Architecture

### The Contract Boundary

Syntropy introduces a new category of contract beyond traditional service APIs:

**Runtime contracts** (existing concept): APIs between services
- gRPC, OpenAPI, JSON Schema
- Enforced by type systems and serialization

**Workspace contracts** (new concept): APIs between Syntropy and a repo's filesystem
- CLI ↔ repo structure
- Agent ↔ workspace state
- Plan/apply ↔ file mutations
- Enforced by the validation engine and schema system

This second boundary is just as important as service APIs, because it's what prevents "read markdown + infer meaning."

### The Three Workspace Layers

```
syntropy.toml              ← workspace contract (what humans review)
.syntropy/                 ← workspace instance (human artifacts)
  system-of-work/          ← playbooks, templates, conventions
  tasks/                   ← task artifacts
  signals/                 ← captured observations
  state/                   ← machine state (gitignored)
```

The separation is:
- **Contract** (`syntropy.toml`): declarative intent — what the workspace should be
- **Instance** (`.syntropy/`): runtime artifacts — what the workspace contains
- **State** (`syntropy state`): computed reality — what the workspace is right now

### Source of Truth Strategy

**Strategy 2 (code-first, v0 approach):**

```
Rust types (serde structs)
    ↓ generate via schemars
JSON Schema snapshots (platform/contracts/workspace/v0/*.schema.json)
    ↓ CI drift check
Fail if schema ≠ code
```

1. Define canonical types in Rust with `serde` + `schemars`
2. Generate JSON Schema into `platform/contracts/workspace/v0/`
3. CI enforces drift: snapshot must match generated output
4. Upgrade to schema-first later if third-party consumers need it

### The Four v0 Contracts

| Contract | Purpose | Output of |
|----------|---------|-----------|
| `syntropy-config.schema.json` | `syntropy.toml` shape + types | Defines the workspace contract |
| `workspace-state.schema.json` | Agent hydration | `syntropy state --json` |
| `validation-report.schema.json` | Deterministic errors | `syntropy validate --json` |
| `patchset.schema.json` | Transaction format | `syntropy plan` |

### Contract Directory Layout

```
platform/
  contracts/
    runtime/                    # Service APIs (when needed)
      proto/...
      openapi/...
      json-schema/...
    workspace/                  # Workspace APIs
      v0/
        syntropy-config.schema.json
        workspace-state.schema.json
        validation-report.schema.json
        patchset.schema.json
```

## Validation Architecture

The validation engine runs checks in layers:

1. **Schema validation**: `syntropy.toml` matches declared schema version
2. **Structural validation**: filesystem matches contract declarations
3. **Convention validation**: naming rules, directory patterns
4. **Dependency validation**: import graph respects visibility rules
5. **Completeness validation**: declared components have required files
6. **Drift validation**: generated schemas match source types

Each layer produces typed errors with codes, locations, and fix hints. Errors are structured as `ValidationReport` (schema-backed).

## Integration Points

### CLI
Primary interface.

- Implemented in bootstrap: `init`, `tree`, `info`/`describe`, `gen readmes`, `validate`
- Planned next: `add`, `state`, `plan`, `apply`, `migrate`, `generate`

### CI
Validation runs as pipeline step. Schema drift gates prevent contract decay.

### MCP / Agent
`syntropy state --json` provides structured workspace understanding. Agents propose changes through plan/apply.

### Editor
LSP extension surfaces validation errors inline (future).

## Key Design Decisions

- **Strict parsing**: unknown keys in `syntropy.toml` are errors, not warnings
- **Code-first schemas**: Rust types are source of truth for v0
- **Plan/apply for all mutations**: no direct writes by the platform
- **Contracts over convention**: workspace boundaries are schema-backed, not documentation-backed

## Related Architecture

- Plan/Apply Engine → `plan-apply-engine.md`
- North Star Layout → `north-star-layout.md`
