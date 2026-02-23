---
id: "arch-north-star-layout"
type: architecture
title: "North Star Repository Layout"
status: defining
owner: workspace-contracts-agent
created: 2026-02-21
updated: 2026-02-23
refs:
  decided-by: [dr-001, dr-002]
  related: [adr-004, arch-workspace-contracts, surf-workspace-platform, wp01, wp02, wp05]
tags: [architecture, repo-layout, structure]
---

# North Star Repository Layout

## Overview

The north star layout is the canonical repository structure that Syntropy targets. It provides the mental model that keeps structure self-documenting: everything in the repo is one of five categories, and each has a clear home.

## Authority / Precedence

When artifacts conflict, resolve by this hierarchy:

1. **Code + contract outputs** — what `syntropy` actually does and outputs (SDK/CLI behavior)
2. **Decision records (ADRs/DRs)** — one-way doors, invariants, and rationale
3. **Workflows** — the paved road for making changes safely
4. **Reference docs** — orientation and explanation (including this document)

If reality diverges: fix the canonical artifact first (code/decision/workflow), then update this document.

## Current Repo Map (this repository)

Top-level directories that exist *today*:

| Directory | What it is | Authority |
|-----------|------------|-----------|
| `apps/` | Syntropy OS + Dev Platform application shells (ADR-004 monorepo) | ADR-004 + code |
| `packages/` | Domain/infrastructure/UI TypeScript packages (ADR-004 monorepo) | ADR-004 + code |
| `infra/` | IaC (Pulumi) | ADR-004 + code |
| `platform/` | Workspace Platform reusable foundation (Rust crates, future contracts/adapters) | contract + code |
| `products/` | Workspace Platform shipped surfaces (e.g., `syntropy` CLI) | contract + code |
| `surfaces/` | Surface definitions (product + platform surfaces) | knowledge graph |
| `prototypes/` | Interactive JSX prototypes (UX exploration) | knowledge graph |
| `observations/` | Raw signals captured over time | knowledge graph |
| `.syntropy/` | Workspace instance directory (system-of-work + state) | workspace contract |
| `.claude/` | Generated Claude Code adapter | generated output |
| `.codex/` | Generated OpenAI Codex adapter | generated output |
| `.github/` | GitHub configuration (CI, etc.) | repo platform |
| `.devcontainer/` | Dev/build container configuration | repo platform |
| `.eraser/` | Eraser diagram exports | repo platform |

North star directories that may not exist yet (and should not be created empty):
- `tools/` — repo tooling (CI/devex/codegen) once needed
- `workspaces/` — fixtures/templates once portability tests exist

## The Five Categories

| Category | What It Contains | Directory |
|----------|-----------------|-----------|
| **Platform** | Reusable foundation: crates, adapters, contracts | `platform/` |
| **Products** | Concrete shipped surfaces built on the platform | `products/` |
| **Tooling** | Build/codegen/CI/devex that supports the repo | `tools/` |
| **Workspaces** | Fixture/template instances to prove portability | `workspaces/` |
| **Instance** | Dogfooding + real SoW artifacts | `.syntropy/` |

If a file doesn't clearly fit one of these, that's an entropy smell.

### Tool Adapters (Generated)

Some coding tools expect repo-local configuration in fixed root-level directories. Syntropy generates these adapters from canonical agent specs under `.syntropy/system-of-work/domains/**`:

- `.claude/**` — Claude Code project agents and slash commands
- `.codex/**` — OpenAI Codex project config and roles

They are checked in, but treated as build artifacts: do not hand-edit; regenerate with `syntropy gen agents` and drift-check with `syntropy gen agents --check`.

## Folder Contracts (How the Repo Describes Itself)

Folder contracts are how humans and AIs answer, for any path:
- What is this for?
- What rules apply?
- What is allowed/forbidden here?
- What is the paved road for working here?

### Canonical Source of Truth

Folder contracts are **schema-backed and code-first**:

1. **Built-in blueprint** (`north-star/v0`) defines baseline meaning for known paths
2. **Workspace overrides** in `syntropy.toml` refine meaning for repo-specific paths

### Generated Views (Deterministic)

Folder README contracts are a deterministic projection of the effective folder contract:

- Generate/update: `cargo run -p syntropy -- gen readmes`
- Drift gate: `cargo run -p syntropy -- gen readmes --check`

Generated READMEs are marked with `<!-- syntropy:generated -->`.

### Query Interface (Humans + Tools)

- Human: `cargo run -p syntropy -- info <path>`
- Machine: `cargo run -p syntropy -- --json info <path>`

### Inheritance Semantics (Policy Scopes)

- **Rules** inherit from ancestors (root → leaf), are deduped, and keep deterministic order.
- **Purpose** and **kind** resolve to the deepest defined value (fallback to ancestors).
- **Boundaries** are local-only (apply to the folder itself, not inherited).

## Canonical Layout

```
syntropy/
├── AGENTS.md                     # stable human+AI entrypoint
├── CLAUDE.md                     # shim for Claude users (points to AGENTS.md)
├── .claude/                      # GENERATED tool adapters (Claude Code)
│   ├── agents/
│   └── commands/
├── .codex/                       # GENERATED tool adapters (OpenAI Codex)
│   ├── config.toml
│   └── agents/
├── MODULE.bazel
├── MODULE.bazel.lock
├── BUILD.bazel
├── .bazelrc
├── syntropy.toml                  # the workspace contract
│
├── platform/
│   ├── contracts/
│   │   ├── runtime/               # service APIs (proto, openapi, json-schema)
│   │   │   ├── proto/
│   │   │   └── json-schema/
│   │   └── workspace/             # workspace APIs (Syntropy ↔ repo)
│   │       └── v0/
│   │           ├── syntropy-config.schema.json
│   │           ├── workspace-state.schema.json
│   │           ├── validation-report.schema.json
│   │           └── patchset.schema.json
│   ├── crates/                    # ALL Rust libs (domains + kernel)
│   │   ├── syntropy-kernel/
│   │   ├── syntropy-ops/
│   │   ├── syntropy-workspace/
│   │   ├── syntropy-sow/
│   │   ├── syntropy-runs/
│   │   ├── syntropy-analysis/
│   │   └── syntropy-telemetry/
│   └── adapters/
│       ├── fs/
│       ├── git/
│       ├── postgres/              # only when actually used
│       ├── temporal/              # only when actually used
│       └── otel/
│
├── products/
│   └── command-center/
│       ├── apps/
│       │   ├── cli/               # syntropy binary
│       │   └── web/               # if/when needed
│       ├── services/              # only if truly separate processes
│       ├── infrastructure/
│       └── docs/
│
├── workspaces/
│   ├── fixtures/
│   │   ├── minimal/
│   │   ├── fireweed-like/
│   │   └── weird-layout/
│   └── templates/
│       └── init/
│
├── tools/
│   ├── bazel/
│   ├── codegen/
│   ├── ci/
│   └── devex/
│
├── docs/
│   ├── architecture/
│   ├── adr/
│   └── reference/
│
└── .syntropy/                     # workspace instance
    ├── tasks/
    ├── system-of-work/
    │   ├── README.md
    │   ├── EXECUTION_CONTRACT.md
    │   ├── ROUTER.md
    │   ├── domains/               # canonical agent specs (source of truth)
    │   │   └── <domain>/
    │   │       ├── CONTEXT.md
    │   │       ├── POLICY.md
    │   │       ├── OWNER.md
    │   │       ├── AGENT.md
    │   │       └── workflows/
    │   └── scripts/
    │       └── validate.sh
    ├── signals/
    └── state/                     # gitignored machine state
        ├── index/
        ├── runs/
        ├── logs/
        └── tmp/
```

## Key Design Decisions

### Merge domains/ and packages/ into platform/crates/

The layout merges what could be separate `domains/` and `packages/` directories into a single `platform/crates/` directory. Each "domain" is just a crate (or a module inside a crate). The mental rule is dead simple: **Rust libs go in `platform/crates/`**. No second-guessing.

### contracts/ with runtime/ and workspace/ subdivisions

One concept ("contract"), two subfolders. The boundary is:
- `runtime/` — APIs between services (external interfaces)
- `workspace/` — APIs between Syntropy and a repo (internal platform contracts)

If you can't explain the difference in one sentence, it'll blur. The one sentence: runtime contracts are for service consumers; workspace contracts are for the platform itself.

### Don't create empty future folders

`products/cloud/` doesn't exist until there's a real service binary or deployment boundary. Empty scaffolding adds psychological weight and debates for no payoff.

### Dependency direction is sacred

```
platform/  →  never imports  →  products/
products/  →  can import     →  platform/
tools/     →  independent
```

Bazel visibility rules enforce this. The validation engine checks it.

### Checked-in vs ignored

| Checked in | Ignored |
|-----------|---------|
| `syntropy.toml` | `.syntropy/state/**` |
| `.syntropy/system-of-work/**` | `.syntropy/logs/**` |
| `.syntropy/tasks/**` | `.syntropy/tmp/**` |
| `.claude/**` | `.claude/settings.local.json` |
| `.codex/**` | |
| `docs/**` | |

This single choice prevents 80% of future entropy.

## How to Change Repo Structure Safely

Any structural change (new top-level dir, moving major subtrees, changing invariants) must follow this flow:

1. **Record the decision** (if it’s a meaningful choice):
   - DR: `docs/workflows/record-decision.md`
   - ADR: `docs/workflows/make-architecture-decision.md`
2. **Update contract sources**:
   - built-in blueprint (if the north star meaning changes)
   - `syntropy.toml` overrides (for repo-specific structure)
3. **Regenerate deterministic views**:
   - `cargo run -p syntropy -- gen readmes`
4. **Run drift gates and validation**:
   - `cargo run -p syntropy -- check`
5. **Update the knowledge graph bookkeeping** (when docs change):
   - `docs/_registry.md`
   - `docs/_changelog.md`

## Mental Model Summary

For the "10-minute model" that any new engineer needs:

1. **`AGENTS.md`** is the repo entrypoint — start here, then route via `.syntropy/system-of-work/ROUTER.md`
2. **`.syntropy/`** is the workspace instance — the system-of-work lives under `.syntropy/system-of-work/`
3. **`.claude/` + `.codex/`** are generated tool adapters — edit `.syntropy/system-of-work/domains/**`, then run `syntropy gen agents` and `syntropy gen agents --check`
4. **`syntropy.toml`** is the workspace contract — the one config file to review
5. **`plan/apply/validate/migrate`** are the four verbs that keep the workspace coherent
