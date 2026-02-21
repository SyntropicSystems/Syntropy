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

- Architecture documents in defining/exploring status
- ADRs accepted (Firebase, event sourcing, Claude LLM)
- AI pipeline architecture still in `exploring` — needs deeper specification

### Key Decisions in Effect

- ADR-001: Firebase backend (Firestore, Auth, Functions, Storage, Hosting)
- ADR-002: Pure event sourcing on Firestore (not hybrid CRUD + events)
- ADR-003: Claude as primary LLM
- Offline-first with Firestore offline persistence

### Invariants

- Every significant technical decision is an ADR (not inline)
- Architecture docs describe design; ADRs explain why
- Data model changes must consider: Firestore query patterns, offline behavior, event sourcing compatibility
- Alternatives must always be documented, even for obvious choices

### Open Threads

- AI pipeline architecture in `exploring` — needs detailed design
- Privacy model for AI reading external data (oq-privacy-model)
- Event sourcing implementation details (pure ES on Firestore)

### Cross-Domain Dependencies

- Product features drive architecture requirements
- Integration specs depend on security, data model, and AI pipeline architecture
- Event sourcing design affects all features that write data (F01–F12)
- Offline strategy affects all client-side behavior

### Last Synced

2025-02-09
