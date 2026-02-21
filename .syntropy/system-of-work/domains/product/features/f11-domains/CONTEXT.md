# F11 Domains/Spaces — Context

## Always Load

- `docs/product/features/f11-domains-spaces.md`
- `docs/product/ux/spaces-navigation.md`

## On Demand

- `docs/product/features/f12-artifact-intelligence.md`
- `docs/product/features/f02-recursive-hierarchy.md`
- `docs/product/use-cases/u06-space-living-reference.md`
- `docs/product/use-cases/u07-ai-auto-filing.md`
- `docs/architecture/data-model.md`

## Reference

- `docs/open-questions/oq-multi-user.md`

## Domain State

### Current Focus

- F11 spec in `defining` status — space structure and info tab being specified
- Spaces navigation UX pattern defined
- Auto-filing (U07) and living reference (U06) use cases being developed

### Key Decisions in Effect

- Spaces are permanent — never "complete" or "end"
- Hierarchy is Space → Project → Task/Card (naming is strict)
- Info tab is structured knowledge base (category → key-value), not free-form
- Cross-space awareness is a core AI capability

### Invariants

- Spaces never complete (unlike projects)
- Hierarchy naming is Space → Project → Task (no aliases)
- Info tab structure is category → key-value (not free-form notes)
- Every entity can belong to a space, but space-less entities are valid

### Open Threads

- Multi-user / shared spaces (oq-multi-user) — directly affects F11
- How cross-space connections surface to users
- Auto-filing classification logic (U07)

### Cross-Domain Dependencies

- F12 (Artifact Intelligence) — artifacts live in and link to spaces
- F02 (Recursive Hierarchy) — projects live within spaces
- Data model (arch-data-model) defines Firestore domain/info collections
- UX (spaces-navigation) defines how users interact with spaces

### Last Synced

2025-02-09
