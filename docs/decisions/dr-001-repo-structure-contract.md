---
id: "dr-001"
type: decision-record
title: "Repo Structure Contract + Folder Contracts"
status: accepted
owner: workspace-contracts-agent
decision-type: type-1
created: 2026-02-23
updated: 2026-02-23
refs:
  parent: []
  children: []
  domain: [workspace-contracts]
  affects: [arch-north-star-layout, arch-workspace-contracts, wp01, wp03, wp05]
  tensions: []
  related: [adr-004]
tags: [repo-layout, folder-contracts, workspace-platform]
---

# DR-001: Repo Structure Contract + Folder Contracts

## Problem Stack

Syntropy needs repository structure that is:
- low-entropy by default (obvious homes, explicit boundaries),
- machine-queryable (humans + AIs can ask “what is this path?”),
- deterministic (generated artifacts are drift-gated),
- and safe to evolve (structure changes don’t become “tribal knowledge”).

Historically, `.work/` was used as a workspace instance folder. The repo has moved to `.syntropy/`, and keeping `.work/` around increases confusion and drift.

## Decision

1. **Canonical repo-structure contract** lives in:
   - `docs/architecture/north-star-layout.md` (`arch-north-star-layout`)
2. **Folder contracts are schema-backed and code-first**:
   - baseline meaning comes from the built-in blueprint (`north-star/v0`)
   - repo-specific meaning comes from `syntropy.toml` overrides
   - READMEs are deterministic projections (`syntropy gen readmes`), not the source of truth
3. **Folder contracts are compositional**:
   - rules inherit from ancestors (root → leaf), deduped deterministically
   - purpose/kind resolve to the deepest defined value
   - boundaries are local-only (apply to the folder itself)
4. **`.work/` is removed**:
   - `.work/syntropy.toml` is no longer supported
   - `.syntropy/` is the only supported workspace instance directory

## Rationale

- **Single canonical contract** prevents structural truth from fragmenting across ad hoc docs.
- **Code-first contracts** keep meaning enforceable (validators + stable JSON output), not inferred.
- **Deterministic generation + drift gates** prevent “quiet rot” in structure documentation.
- **Inheritance semantics** reduce duplication and make “what rules apply here?” answerable for any subtree.

## Options Explored

### 1) README frontmatter as the canonical config
Pros: meaning is colocated with folders.  
Cons: duplicates the canonical contract layer and risks drift (README vs `syntropy.toml` vs validators).

### 2) Hybrid (README overrides on top of contract sources)
Pros: local customization.  
Cons: introduces precedence complexity early; harder to keep schema-backed and strict.

### 3) Keep `.work/` support
Pros: avoids a breaking change.  
Cons: increases ambiguity; makes migrations harder later; encourages stale legacy patterns.

## Consequences

- Structural understanding becomes queryable via `syntropy info` (`--json` supported).
- CI now drift-gates README contracts (no “forgot to run generation” merges).
- `.work/` users must migrate; discovery emits a targeted migration error.

## Migration Steps

If you have legacy `.work/`:
1. Rename `.work/` → `.syntropy/`
2. Move `syntropy.toml` to repo root (recommended), or to `.syntropy/syntropy.toml`
3. Run:
   - `cargo run -p syntropy -- gen readmes`
   - `bash .syntropy/system-of-work/scripts/validate.sh`

## Success Metrics

- New contributors can locate “where should this go?” within 60 seconds using `arch-north-star-layout`.
- `cargo run -p syntropy -- gen readmes --check` is clean on main.
- `cargo run -p syntropy -- validate` reports no unexpected top-level dirs in the north-star blueprint.

## Revisit Triggers

- Third-party consumers require schema-first contracts (WP08).
- Repo grows to multiple workspace instances or cross-repo federation (requires new contract boundary).
