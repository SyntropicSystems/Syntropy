---
id: "dr-003"
type: decision-record
title: "Generated Registry + Docs Sync + Rust-First Gate"
status: accepted
owner: meta-agent
decision-type: type-1
created: 2026-02-23
updated: 2026-02-23
refs:
  parent: []
  children: []
  domain: [dev-platform, workspace-contracts]
  affects: [registry, dp04, conventions, wf-add-feature, wf-record-decision]
  tensions: []
  related: [dp01, dp05, wf-sync-generated-artifacts, workspace-contracts-agent]
tags: [dev-platform, docs-graph, registry, drift-gates]
---

# DR-003: Generated Registry + Docs Sync + Rust-First Gate

## Problem Stack

Syntropy’s Dev Platform is a knowledge graph (docs + agents + workflows) that must remain:

- **coherent** (references resolve, and are bidirectional),
- **drift-free** (generated projections are deterministic and gated),
- **scalable** (zero → N docs without manual bookkeeping),
- **Rust-first** (no load-bearing scripts in CI or product behavior).

Today, the graph can drift: frontmatter can be malformed, backrefs can be missing, and the registry can become a hand-maintained source of truth.

## Decision

1. **Bidirectional refs are a hard invariant.**
   - `syntropy docs check` validates strict frontmatter + refs + missing backrefs.
   - `syntropy docs sync` deterministically auto-adds missing reciprocal refs (backrefs).
2. **The registry is generated, not hand-edited.**
   - `docs/_registry.md` is a deterministic projection of document frontmatter.
   - `syntropy gen registry --check` drift-gates it; `--force` is only for one-time migration.
3. **Rust provides the canonical “single gate”.**
   - `syntropy check` runs all drift/validation gates in order (docs sync, registry, readmes, agents, validate).
   - Shell scripts remain thin wrappers that call the Rust gate.

## Rationale

- **Strictness without autofix** is impractical; `docs sync` makes correctness achievable.
- **A manual registry** becomes a second source of truth; generation removes entropy.
- **One Rust gate** makes CI and local workflows consistent and removes script logic as a truth source.

## Options Explored

### 1) Keep registry manual

Pros: simple.  
Cons: constant drift, non-deterministic bookkeeping, and brittle scaling.

### 2) Enforce backrefs manually

Pros: no tooling required.  
Cons: fails in practice; the graph becomes incoherent over time.

### 3) CI gate via shell scripts

Pros: quick.  
Cons: splits truth across languages and makes the platform harder to evolve safely.

## Consequences

- Contributors update docs by editing frontmatter and then running:
  - `cargo run -p syntropy -- docs sync`
  - `cargo run -p syntropy -- gen registry`
- CI gates become stable and deterministic via `syntropy check`.

## Success Metrics

- `cargo run -p syntropy -- docs sync --check` stays clean on main.
- `cargo run -p syntropy -- gen registry --check` stays clean on main.
- `cargo run -p syntropy -- check` is the single CI drift gate (no load-bearing scripts).

## Revisit Triggers

- Registry size/perf becomes an issue (requires sharded/segmented registry projections).
- A richer ref schema is needed (directional semantics beyond the current reciprocal map).
