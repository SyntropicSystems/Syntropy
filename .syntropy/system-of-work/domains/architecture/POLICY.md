# Architecture Domain Policy

## Invariants

- Prefer deterministic, versioned contracts at boundaries.
- Keep dependency direction explicit (platform → products).

## Rules

1. Every significant technical decision must be an ADR (not inline in other docs).
2. Architecture docs describe the design; ADRs explain why that design was chosen.
3. Data model changes must consider: Firestore query patterns, offline behavior, event sourcing compatibility.
4. Always document alternatives considered — even if the choice seems obvious.
5. Cost implications must be noted for infrastructure decisions.

## Workflows

- `docs/workflows/make-architecture-decision.md`
- `docs/workflows/resolve-open-question.md` (inherited)

## Decision Authority

### Autonomous

- Architecture document structure and content
- ADR creation and status updates
- Data model refinements within existing patterns
- Technical feasibility assessments
- Cost analysis and optimization recommendations

### Escalate

- Stack changes (switching away from Firebase, etc.) → `.syntropy/system-of-work/domains/system/AGENT.md` / human
- Security model changes → `.syntropy/system-of-work/domains/system/AGENT.md` / human
- Decisions with significant cost implications → human
- Cross-cutting concerns affecting product behavior → `.syntropy/system-of-work/domains/product/AGENT.md`
