---
id: "wp-product-index"
type: reference
title: "Workspace Platform Product Domain"
status: active
owner: workspace-contracts-agent
created: 2026-02-21
updated: 2026-02-21
refs:
  related: [product-index, surf-workspace-platform, jtbd-workspace-platform]
tags: [workspace-platform, product, index]
---

# Workspace Platform Product Domain

The Workspace Platform is the contract and tooling layer that makes any repository structurally coherent, safely evolvable, and zero-mental-overhead to work in. It's the antidote to repo-structure anxiety: if the platform always provides the "easy right path," the folder tree stops being a brittle religion and becomes a mostly cosmetic map.

Where the **Dev Platform** is the _intellectual_ layer (knowledge graph, agents, workflows) and the **Repo Platform** is the _build_ layer (containers, CI/CD, toolchain), the **Workspace Platform** is the _structural_ layer (contracts, validation, scaffolding, safe evolution).

## Jobs to Be Done

10 core jobs → `docs/vision/jtbd-workspace-platform.md`

## Feature Map

### P0 — Critical (Foundation)
- **WP01** — Workspace Contract: `syntropy.toml` as single reviewed config, strict schema, unknown keys error → `features/wp01-workspace-contract.md`
- **WP02** — Workspace Instance: `.syntropy/` directory, human vs machine state separation → `features/wp02-workspace-instance.md`
- **WP03** — Validation Engine: `syntropy validate`, dependency direction, coherence checks → `features/wp03-validation-engine.md`
- **WP04** — Plan/Apply Engine: transactional patches, preview, atomic apply, rollback → `features/wp04-plan-apply-engine.md`
- **WP05** — Scaffolding & Generators: `syntropy init/add`, blueprints, custom generators → `features/wp05-scaffolding-generators.md`
- **WP07** — Workspace State & Hydration: `syntropy state --json`, agent hydration → `features/wp07-workspace-state.md`
- **WP08** — Contract Schema System: versioned JSON Schema, Rust-first strategy, drift gates → `features/wp08-contract-schema-system.md`

### P1 — High Priority
- **WP06** — Migrations: schema version upgrades, safe transformation, version chaining → `features/wp06-migrations.md`

## Use Cases

7 concrete usage scenarios → `use-cases/`

## User Stories

24 user stories → `user-stories/stories-workspace-platform.md`
