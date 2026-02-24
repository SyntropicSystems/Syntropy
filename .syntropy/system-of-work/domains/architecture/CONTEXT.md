# Architecture Domain Context

## Always Load

- `docs/architecture/_index.md`
- `docs/decisions/_index.md`

## On Demand

- `docs/architecture/*.md` (the specific area being worked on)
- `docs/decisions/adr-*.md` (relevant ADRs)
- `docs/product/features/fNN-*.md` (feature specs that drive architecture requirements)

## Reference

- `docs/open-questions/oq-*.md` (unresolved questions with architecture implications)
- `docs/product/_index.md` (product feature map for feasibility checks)

## Domain State

### Current Focus

- Align architecture docs and decision graph to the current bootstrap reality (ADR-006)
- Keep the architecture storage/backend-agnostic until the app/backend stack is re-decided
- AI pipeline architecture remains in `exploring` — needs deeper specification once product surfaces exist

### Key Decisions in Effect

- ADR-006: Rust-First Repository Foundation; App/Backend Stack Deferred
- ADR-003: Claude as Primary LLM
- DR-001: Repo Structure Contract + Folder Contracts (architecture docs follow the north-star layout contract)

### Invariants

- Every significant technical decision is an ADR (not inline)
- Architecture docs describe design; ADRs explain why
- Data model changes must consider: storage query patterns, offline behavior, event sourcing compatibility
- Alternatives must always be documented, even for obvious choices

### Open Threads

- App/backend stack selection is deferred (storage, sync, auth, IaC) — requires new ADR(s) when re-opened
- AI pipeline architecture in `exploring` — needs detailed design
- Privacy model for AI reading external data (oq-privacy-model)
- Concrete storage mapping for the data model (arch-data-model) once a backend is chosen

### Cross-Domain Dependencies

- Product features drive architecture requirements
- Integration specs depend on security, data model, and AI pipeline architecture
- Event sourcing design affects all features that write data (F01–F12)
- Offline strategy affects all client-side behavior

### Last Synced

2026-02-24
