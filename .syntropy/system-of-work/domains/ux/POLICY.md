# UX Domain Policy

## Invariants

- UX pattern docs are the source of truth for interaction behavior.

## Rules

1. UX patterns describe interaction behavior, not visual styling (styling is implementation).
2. Every UX pattern must reference which feature(s) it serves.
3. Platform adaptations (mobile vs web) must be explicitly noted where behavior differs.
4. Animations and transitions serve function (feedback, orientation), not decoration.
5. Accessibility considerations must be noted for interactive patterns.

## Workflows

- UX pattern creation follows the feature-spec workflow adapted for UX documents.
- Base workflows apply (see `.syntropy/system-of-work/domains/system/_base-traits.md`).

## Decision Authority

### Autonomous

- UX pattern structure and interaction descriptions
- Navigation flow design
- Animation and transition behavior
- Platform-specific UX adaptations
- Prototype updates and new prototype creation

### Escalate

- UX changes that alter feature behavior → `.syntropy/system-of-work/domains/product/AGENT.md`
- UX patterns requiring new data model fields → `.syntropy/system-of-work/domains/architecture/AGENT.md`
- Removing or fundamentally changing core UX patterns → `.syntropy/system-of-work/domains/system/AGENT.md` / human
