---
id: "dr-002"
type: decision-record
title: "Verb-First CLI Command Grammar"
status: accepted
owner: workspace-contracts-agent
decision-type: type-2
created: 2026-02-23
updated: 2026-02-23
refs:
  affects: [arch-north-star-layout, arch-workspace-contracts, conventions, dp04, wf-add-feature, wf-implement-syntropy-command, wf-record-decision, wf-run-syntropy-cli, wp03, wp05]
  children: []
  domain: [workspace-contracts]
  parent: []
  related: [dp01, dp05, dr-001, workspace-contracts-agent]
  tensions: []
tags: [cli, grammar, commands, workspace-platform, drift-gates]
---

# DR-002: Verb-First CLI Command Grammar

## Problem Stack

As the Syntropy workspace platform grows, the CLI surface area will expand across multiple domains (workspace contracts, repo collaboration, generators, etc.). A domain-first CLI tree (`syntropy <domain> <verb>`) creates cognitive cross-wires when domains and verbs overlap (e.g., “check the check domain”), and makes it harder to keep a small, stable set of top-level commands.

We need a grammar that:
- scales from 0 → N targets without top-level sprawl,
- stays self-documenting (help output is authoritative),
- keeps workflows like plan/apply/validate/migrate/check front-and-center,
- avoids token collisions that create confusion.

## Decision

Adopt a **verb-first** (workflow-first) CLI grammar:

- Top-level commands are **workflow verbs**: `gen`, `validate`, `check`, … (and later `plan`, `apply`, `migrate`).
- “Domains” appear as **targets** beneath the workflow verb: `syntropy gen <target>`, `syntropy gen <target> --check`.
- `syntropy check` is the canonical single entrypoint that runs **all drift gates + workspace validation**.

Naming constraints:
- No domain/group named `check` (avoid `syntropy check check`).
- Internal crate/module names may be `checks`/`gates`/`artifacts`, but those names must not leak into CLI tokens.

Aliasing strategy (allowed, but not canonical):
- Backwards-compatible aliases may exist (and may be hidden), but **only the verb-first grammar is documented**.

## Options Explored (brief)

1) **Domain-first** (`syntropy <domain> <verb>`)  
Pros: domain ownership is explicit.  
Cons: collisions and “double-meaning” tokens; top-level sprawl; harder to keep a small set of stable verbs.

2) **Verb-first** (`syntropy <verb> <target>`)  
Pros: matches the workspace platform’s core verbs; avoids collisions; scales with many targets under a few verbs.  
Cons: domain grouping is one level deeper (under verbs), not at the root.

3) **Hybrid** (both as first-class, fully documented)  
Pros: multiple mental models supported.  
Cons: two sources of truth; drift and confusion risk.

## Consequences

- Drift gates become consistent: `syntropy gen <target> --check`.
- CI and humans use one entrypoint: `syntropy check`.
- CLI remains self-documenting; a generated CLI reference can be drift-gated as a deterministic projection of clap help output.
