---
id: "adr-006"
type: adr
title: "Rust-First Repository Foundation; App/Backend Stack Deferred"
status: accepted
owner: architecture-agent
decision-type: type-1
created: 2026-02-24
updated: 2026-02-24
refs:
  affects: [arch-data-model, arch-event-sourcing, arch-offline, arch-stack, dr-001, rp01, rp02, rp03, rp04, rp05, rp06, rp07, rp09, rp10]
  related: [arch-north-star-layout, arch-workspace-contracts, oq-monorepo-architecture, rp-stories, rp-u02, rp-u04]
  supersedes: [adr-001, adr-002, adr-004, adr-005]
tags: [architecture, repo, stack, rust, bazel, cleanup]
---

# ADR-006: Rust-First Repository Foundation; App/Backend Stack Deferred

## Context

This repository currently has two “real” pillars:

1. **Workspace Platform (bootstrap implementation)** — Rust SDK + CLI for deterministic workspace discovery, contracts, drift gates, and validation (`platform/`, `products/`).
2. **Knowledge graph + system-of-work** — specifications, decisions, workflows, and collaboration system (`docs/`, `.syntropy/`, `surfaces/`, `prototypes/`, `observations/`).

Historically, the repo also accumulated early scaffolding for a TypeScript/Nx monorepo and Firebase/Pulumi infrastructure. That scaffolding is largely placeholder and creates accidental complexity:
- It implies decisions (Firebase, Nx, Pulumi) we are not ready to commit to.
- It increases maintenance burden and confuses the “what is real right now?” answer.

## Decision

1. **This repo is Rust-first.**
   - The Workspace Platform Rust code is the only production code in scope right now.
   - The repository layout and contracts are updated to reflect this reality.

2. **The app/backend stack is intentionally deferred.**
   - Firebase remains a *candidate*, not a decision.
   - We will choose backend/app infrastructure later, based on product readiness and constraints.

3. **Keep Bazel, but make it real.**
   - Bazel remains part of the foundation for Rust builds.
   - The Rust toolchain is pinned and aligned across Cargo, Bazel, and CI.

4. **Remove placeholder scaffolding that encodes premature decisions.**
   - Delete Node/Nx/TypeScript/Pulumi scaffolding (`apps/`, `packages/`, `infra/` and related root config files).

## Rationale

- **Reduce entropy:** fewer “maybe” systems in the repo means fewer false paths for contributors and agents.
- **Single source of truth:** repo structure and documentation should describe current reality, not aspirational scaffolding.
- **Stability:** pinned toolchains + green Bazel builds prevent slow drift.

## Alternatives Considered

- **Keep the hybrid TS monorepo scaffold.** Rejected: it encodes stack decisions before we’re ready and adds overhead now.
- **Split into two repos (platform vs app).** Deferred: we can do this later once the app stack exists and warrants separation.
- **Remove Bazel and use Cargo only.** Rejected: Bazel is retained as a foundation capability, but must be kept green.

## Consequences

- Docs and decision records that previously assumed Firebase/Nx are superseded and rewritten to reflect “candidate, not decided”.
- Re-introducing an application/backend stack later must be a deliberate, documented decision (new ADR) with a clean scaffold.

## Revisit Triggers

- We start shipping end-user clients or backend services (Syntropy OS surfaces) → decide app/backend stack.
- Bazel stops providing net value (maintenance > benefit) → revisit build system choice with evidence.
