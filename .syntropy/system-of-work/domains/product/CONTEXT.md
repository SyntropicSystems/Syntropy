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

- 12 feature specs (F01–F12) are in defining/exploring status
- 10 use cases and 16 user stories extracted and cross-referenced
- Feature agents (F04, F11, F12) handle deep specification work
- Dev platform product documentation is being built out

### Key Decisions in Effect

- JTBD-driven feature justification — every feature must trace to at least one job
- Priority labels (P0/P1/P2) reflect MVP criticality
- Feature specs describe behavior ("what"), not implementation ("how")

### Invariants

- Every feature references at least one JTBD
- Use cases are concrete enough to be testable (specific numbers, actions, outcomes)
- User stories follow "As a [user], I want [goal] so [benefit]" format
- Feature agents inherit product-agent rules in addition to base traits

### Open Threads

- F04 (AI Engine) and F07 (Self-Learning) are still in `exploring` status
- Privacy model unresolved — affects F03 (Gmail), F04 (AI Engine)
- Multi-user question unresolved — affects F11 (Spaces)

### Cross-Domain Dependencies

- Product specs drive architecture requirements (product → architecture)
- UX patterns implement product features (product → UX)
- Integration specs define external data flows into product (integration → product)
- AI pipeline architecture constrains AI feature behavior (architecture → product)

### Last Synced

2025-02-09
