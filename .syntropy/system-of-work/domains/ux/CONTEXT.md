# UX Domain Context

## Always Load

- `docs/vision/principles.md`
- `docs/product/ux/*`

## On Demand

- `docs/product/features/fNN-*.md` (the feature whose UX is being designed)
- `prototypes/*.jsx` (interactive prototypes)
- `surfaces/*.md` (surface constraints for platform-specific adaptation)

## Reference

- `docs/product/_index.md` (feature map for scope)
- `docs/product/use-cases/uNN-*.md` (use cases that exercise the UX)

## Domain State

### Current Focus

- UX patterns defined (card queue, epic drill-down, AI suggestion, spaces nav, artifact flow, follow-up, dependency viz)
- Interactive prototypes in `prototypes/`
- Surface definitions (mobile, web, dev platform)

### Key Decisions in Effect

- "One Card at a Time" — primary interaction pattern
- "Depth on Demand" — progressive disclosure, not information overload
- UX patterns describe interaction behavior, not visual styling
- Animations serve function (feedback, orientation), not decoration

### Invariants

- Every UX pattern references the feature(s) it serves
- Platform differences (mobile vs web) are explicitly noted where behavior differs
- Accessibility considerations are noted for interactive patterns
- Prototypes reference specific features and UX patterns

### Open Threads

- Dependency visualization pattern may need refinement as F09 develops

### Cross-Domain Dependencies

- UX patterns implement product features (product → UX)
- Prototypes validate feature + UX design before implementation
- Surface definitions constrain platform-specific adaptations
- Data model shapes inform what UX can display (architecture → UX)

### Last Synced

2025-02-09
