# Product Domain Context

## Always Load

- `docs/vision/jtbd.md`
- `docs/product/_index.md`

## On Demand

- `docs/product/features/*`
- `docs/product/use-cases/*`
- `docs/product/user-stories/*`
- `docs/product/ux/*` (coordinate with UX domain)

## Reference

- `docs/architecture/_index.md` (feasibility checks)
- `docs/decisions/*` (past decisions)
- `docs/open-questions/*` (unresolved items in product scope)

## Domain State

### Current Focus

- 12 core application feature specs (F01–F12) in defining/exploring status
- 17 dev platform features (DP01–DP17) documented, including:
  - DP14 (Cognitive Engineering), DP15 (Operational Engineering) — methodology layers
  - DP16 (Experience Layer) — satisfaction architecture with 11 module deep-dives in `docs/product/dev-platform/experience-layer/`
  - DP17 (Personality Layer) — procedural agent character with 9 module deep-dives in `docs/product/dev-platform/personality-layer/`
- 10 repo platform features (RP01–RP10) and 8 workspace platform features (WP01–WP08)
- 10 use cases (app), 17 use cases (dev platform), 7 use cases (repo/workspace)
- Feature agents (F04, F11, F12) handle deep specification work
- Dev platform documented as a product with 14 JTBD (DJ1–DJ14)

### Key Decisions in Effect

- JTBD-driven feature justification — every feature must trace to at least one job
- Priority labels (P0/P1/P2) reflect MVP criticality
- Feature specs describe behavior ("what"), not implementation ("how")
- Module deep-dives use `module` document type with layer prefixes (`el-*`, `pl-*`)
- Three platforms documented as products: Dev Platform, Repo Platform, Workspace Platform

### Invariants

- Every feature references at least one JTBD
- Use cases are concrete enough to be testable (specific numbers, actions, outcomes)
- User stories follow "As a [user], I want [goal] so [benefit]" format
- Feature agents inherit product-agent rules in addition to base traits
- Module deep-dives are linked to their parent feature spec via `refs.depends-on`
- Layer modules have an `_index.md` that lists all modules in the layer

### Open Threads

- F04 (AI Engine) and F07 (Self-Learning) are still in `exploring` status
- Privacy model unresolved — affects F03 (Gmail), F04 (AI Engine)
- Multi-user question unresolved — affects F11 (Spaces)
- Experience Layer and Personality Layer features are in `exploring` status
- No feature agents exist yet for DP16 or DP17 (covered by pulse-companion-agent)

### Cross-Domain Dependencies

- Product specs drive architecture requirements (product → architecture)
- UX patterns implement product features (product → UX)
- Integration specs define external data flows into product (integration → product)
- AI pipeline architecture constrains AI feature behavior (architecture → product)
- Experience Layer (DP16) depends on DP12 (Pulse Companion), DP14 (Cognitive Engineering), DP15 (Operational Engineering)
- Personality Layer (DP17) depends on DP02 (Agent System), feeds into DP16 (Experience Layer)

### Last Synced

2026-02-24
