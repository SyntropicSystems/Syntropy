---
id: "surf-workspace-platform"
type: surface
title: "Workspace Platform"
status: active
owner: workspace-contracts-agent
created: 2026-02-21
updated: 2026-02-21
refs:
  related: [workspace-contracts-agent, jtbd-workspace-platform, wp-product-index, wp01, wp02, wp03, wp04, wp05, wp06, wp07, wp08, arch-workspace-contracts, arch-plan-apply-engine, arch-north-star-layout]
tags: [surface, workspace, contracts, validation, scaffolding]
---

# Workspace Platform Surface

The Workspace Platform is the contract and tooling layer that makes any repository structurally coherent, safely evolvable, and zero-mental-overhead to work in. It encompasses everything about how workspaces are defined, validated, scaffolded, migrated, and understood by tools and agents.

Where the **Dev Platform** is the _intellectual_ layer (knowledge graph, agents, workflows — how we think and organize), the **Repo Platform** is the _build_ layer (containers, CI/CD, toolchain — how we build and ship), and the **Workspace Platform** is the _structural_ layer (contracts, validation, scaffolding — how we keep the repo coherent).

## What This Surface Is

- The workspace contract system (`syntropy.toml`)
- The workspace instance directory (`.syntropy/`)
- The validation engine (`syntropy validate`)
- The plan/apply transactional mutation engine
- The scaffolding and generator system (`syntropy init/add/generate`)
- The migration system (`syntropy migrate`)
- The workspace state and hydration system (`syntropy state`)
- The contract schema system (versioned JSON Schema)

## What This Surface Is Not

- Application-level architecture (that's `arch-*` docs)
- Build toolchain, CI/CD, containers (that's the Repo Platform)
- Knowledge graph, agents, workflows (that's the Dev Platform)
- Product feature specs for end users (that's `docs/product/`)

## Core Pattern: Contract → Validate → Scaffold → Plan/Apply

The workspace platform follows a contract-first pattern:

1. **Contract**: Everything starts with `syntropy.toml` — the single source of truth
2. **Validate**: The validation engine continuously checks structural coherence
3. **Scaffold**: The CLI provides the "easy right path" for adding components
4. **Plan/Apply**: All mutations are previewed, validated, and applied atomically

The system's truth isn't "paths" — it's "contracts + operations."

## How This Surface Grows

1. **Identify a structural friction** — a repeated mistake, a convention violation, a confusing decision point
2. **Make it a contract** — define the boundary with a schema
3. **Add a validator** — catch violations automatically
4. **Add a scaffold** — provide the easy right path
5. **Iterate** — validators and scaffolds improve through emergence

## Consumers of This Surface

| Consumer | How They Use It |
|----------|----------------|
| Developers | Initialize workspaces, add components, validate structure, run migrations |
| AI agents | Hydrate workspace context via `syntropy state --json`, propose changes via plan/apply |
| CI pipelines | Run validation as merge gate, check schema drift |
| Platform engineers | Author blueprints, design migrations, extend validators |
| Team leads | Create custom generators, override conventions |
| New contributors | Scaffold components correctly on day one |

## Principles

1. **Contract over convention** — workspace boundaries are schema-backed, not documentation-backed; if it's not in the schema, it doesn't exist
2. **Plan/apply for all mutations** — every structural change is previewed and atomic; no "half-done" refactors
3. **Strict by default** — unknown config keys are errors, not warnings; this prevents the config layer from becoming a junk drawer
4. **Code-first, schema-checked** — Rust types are source of truth, schemas are generated artifacts, CI enforces alignment
5. **Easy right path** — the CLI command is always easier than manual editing; correctness comes free when you use the platform

## Product Documentation

The workspace platform is documented as a product with the same structure as the application itself:

- **Jobs to Be Done**: `docs/vision/jtbd-workspace-platform.md` — 10 core jobs (WJ1–WJ10)
- **Product Index**: `docs/product/workspace-platform/_index.md` — feature map, use cases, stories
- **Feature Specs**: `docs/product/workspace-platform/features/` — 8 feature specs (WP01–WP08)
- **Use Cases**: `docs/product/workspace-platform/use-cases/` — 7 use cases (WP-U01–WP-U07)
- **User Stories**: `docs/product/workspace-platform/user-stories/stories-workspace-platform.md` — 24 stories (WP-S01–WP-S24)

## Architecture Documentation

- **Workspace Contract System**: `docs/architecture/workspace-contracts.md` — contract boundaries, source of truth strategy, validation architecture
- **Plan/Apply Engine**: `docs/architecture/plan-apply-engine.md` — transactional mutation system
- **North Star Layout**: `docs/architecture/north-star-layout.md` — canonical repository structure
