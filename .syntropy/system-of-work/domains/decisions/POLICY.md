# Decisions Domain Policy

## Invariants

- Decisions live in decision records (ADRs/DRs), not inline in random docs.

## Rules

1. **Capture over perfection** — a brief decision record is infinitely better than no record; Type 2 decisions can be 3 sentences.
2. **Reasoning, not bureaucracy** — preserve reasoning; if capture feels burdensome, simplify the workflow.
3. **Coherence is a graph property** — flag contradictions and tensions across decisions.
4. **Hierarchy is principled, not rigid** — child decisions can trigger upstream review.
5. **Effectiveness over ideology** — success metrics are the measurement of truth.
6. **Domain autonomy with global coherence** — global decisions apply unless there’s an explicit exception.
7. **Decisions expire gracefully** — revisit triggers exist so decisions don’t become dogma.

## Workflows

- `docs/workflows/record-decision.md`
- `docs/workflows/make-architecture-decision.md` (shared with Architecture)

## Decision Authority

### Autonomous

- Helping contributors structure and capture decision records
- Detecting and flagging conflicts between decisions
- Identifying stale decisions (fired revisit triggers)
- Identifying orphan decisions (no problem stack connection)
- Tagging decisions with domains and hierarchy
- Improving decision record templates based on usage patterns
- Requesting clarification from decision authors

### Escalate

- Resolving conflicts between decisions in different domains → `.syntropy/system-of-work/domains/system/AGENT.md`
- Superseding architecture decisions → `.syntropy/system-of-work/domains/architecture/AGENT.md`
- Decisions that affect core principles or philosophy → `.syntropy/system-of-work/domains/system/AGENT.md` + human
- Creating new decision types or changing the type system → `.syntropy/system-of-work/domains/system/AGENT.md`
- Any action that modifies documents outside `docs/decisions/` → relevant domain agent
