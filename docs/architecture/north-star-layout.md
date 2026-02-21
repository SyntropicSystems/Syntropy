---
id: "arch-north-star-layout"
type: architecture
title: "North Star Repository Layout"
status: defining
owner: workspace-contracts-agent
created: 2026-02-21
updated: 2026-02-21
refs:
  related: [arch-workspace-contracts, wp01, wp02, wp05, adr-004]
  decided-by: []
tags: [architecture, repo-layout, structure]
---

# North Star Repository Layout

## Overview

The north star layout is the canonical repository structure that Syntropy targets. It provides the mental model that keeps structure self-documenting: everything in the repo is one of five categories, and each has a clear home.

## The Five Categories

| Category | What It Contains | Directory |
|----------|-----------------|-----------|
| **Platform** | Reusable foundation: crates, adapters, contracts | `platform/` |
| **Products** | Concrete shipped surfaces built on the platform | `products/` |
| **Tooling** | Build/codegen/CI/devex that supports the repo | `tools/` |
| **Workspaces** | Fixture/template instances to prove portability | `workspaces/` |
| **Instance** | Dogfooding + real SoW artifacts | `.syntropy/` |

If a file doesn't clearly fit one of these, that's an entropy smell.

## Canonical Layout

```
syntropy/
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
    │   ├── templates/             # project-specific scaffolds
    │   ├── generators/            # project-specific generators
    │   ├── workflows/
    │   └── conventions.toml
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
| `docs/**` | |

This single choice prevents 80% of future entropy.

## Mental Model Summary

For the "10-minute model" that any new engineer needs:

1. **`.syntropy/`** is the workspace instance — human artifacts live here
2. **`syntropy.toml`** is the workspace contract — the one config file to review
3. **`plan/apply/validate/migrate`** are the four verbs that keep the workspace coherent
4. **Platform vs Products vs Tools** is the structural boundary — dependency direction is sacred
5. **If the platform provides a command for it, use the command** — that's the paved road
