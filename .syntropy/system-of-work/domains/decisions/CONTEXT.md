# Decisions Domain Context

## Always Load

- `docs/decisions/_index.md`
- `docs/product/dev-platform/features/dp13-decision-records.md`
- `docs/workflows/record-decision.md`
- `docs/workflows/make-architecture-decision.md`

## On Demand

- `docs/decisions/*.md` (individual decision records)
- `.syntropy/system-of-work/ROUTER.md` (domain context)
- `.syntropy/system-of-work/domains/**/AGENT.md` (domain impact checks)
- `docs/vision/principles.md` (decision coherence lens)

## Reference

- `docs/vision/manifesto.md`
- `docs/product/dev-platform/_index.md`

## Domain State

### Current Focus

- Decision records system being established (DP13 in `defining` status)
- Record-decision workflow exists
- Existing ADRs (adr-001 through adr-003) pre-date this system and remain valid

### Key Decisions in Effect

- ADRs remain the pattern for architecture-specific decisions
- General decisions use the `dr-NNN` ID prefix
- Both live in `docs/decisions/`
- Decision records follow the Type 1 / Type 2 classification
- Decision lifecycle: `proposed` → `accepted` → `deprecated` | `superseded`

### Invariants

- Every decision record has YAML frontmatter with at minimum: id, type, title, status, owner, decision-type, created, updated
- Problem Stack and Decision sections are always present (even if brief)
- No two accepted decisions may directly contradict without an explicit exception
- Superseded decisions link to their successor
- Parent-child relationships are bidirectional

### Open Threads

- Coherence audit cadence to be determined by actual volume
- Conflict detection automation (future)
- Integration with observation system — observations that surface decision gaps

### Cross-Domain Dependencies

- Architecture domain owns ADRs; decisions domain owns the broader graph
- All domain agents reference governing decisions in their Domain State
- DP09 (Domain Context Sync) — domain agents list key decisions in effect

### Last Synced

2025-02-09
