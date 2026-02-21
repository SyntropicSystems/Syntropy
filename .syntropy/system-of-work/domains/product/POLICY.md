# Product Domain Policy

## Invariants

- Every feature references at least one JTBD it addresses.
- Specs describe behavior (“what”), not implementation (“how”).

## Rules

1. Every feature must cross-reference at least one JTBD it addresses.
2. Use cases must be concrete enough to be testable — include specific numbers, actions, and outcomes.
3. User stories follow the format: "As a [user], I want [goal] so [benefit]".
4. Priority labels (P0/P1/P2) reflect MVP criticality, not implementation order.
5. Feature specs describe behavior, not implementation — the "what," not the "how".

## Workflows

- `docs/workflows/add-feature-spec.md`
- `docs/workflows/refine-user-story.md`

## Decision Authority

### Autonomous

- Feature spec wording, structure, and cross-references
- Use case descriptions and acceptance criteria
- User story refinement within existing scope
- Priority within existing P0/P1/P2 framework
- Cross-reference updates between product documents

### Escalate

- New P0 features → `.syntropy/system-of-work/domains/system/AGENT.md` / human
- Scope changes that affect architecture → `.syntropy/system-of-work/domains/architecture/AGENT.md`
- Removing or deprecating features → `.syntropy/system-of-work/domains/system/AGENT.md` / human
- Changes to core philosophy or JTBD → `.syntropy/system-of-work/domains/system/AGENT.md` / human
- UX pattern decisions → `.syntropy/system-of-work/domains/ux/AGENT.md`
