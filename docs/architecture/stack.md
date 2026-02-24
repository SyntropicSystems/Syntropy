---
id: "arch-stack"
type: architecture
title: "Technology Stack"
status: defining
owner: architecture-agent
created: 2025-02-07
updated: 2026-02-24
refs:
  decided-by: [adr-001, adr-003, adr-004, adr-005, adr-006, oq-monorepo-architecture]
  related: [adr-005, arch-ai-pipeline, arch-data-model, rp01, rp02, rp03, rp04, rp07, surf-repo-platform]
tags: [architecture, stack, rust, bazel]
---

# Technology Stack

## Current (Bootstrap Reality)

As of **2026-02-24**, this repository is intentionally focused on the **Workspace Platform bootstrap slice** (ADR-006):

- **Language:** Rust (edition 2021)
- **Workspace Platform:** `syntropy-sdk` (library) + `syntropy` CLI (binary)
- **Build systems:** Cargo (primary) + Bazel (kept green via `rules_rust`)
- **Repo structure:** north-star blueprint + `syntropy.toml` contract (drift-gated generators)

## Deferred (Product App/Backend Stack)

Syntropy OS client and backend choices are **not decided yet**. Firebase remains a historical reference and a *candidate*, but not a commitment.

When we re-open the app/backend stack decision, we will explicitly choose:
- client surfaces (mobile/web),
- backend storage + sync strategy,
- auth + integration token handling,
- IaC and deployment approach.

Those choices must be captured as new ADR(s) (see revisit triggers in ADR-006).
