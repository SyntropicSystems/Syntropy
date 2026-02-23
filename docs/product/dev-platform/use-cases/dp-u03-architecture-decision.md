---
id: "dp-u03"
type: use-case
title: "Making and Recording an Architecture Decision"
status: defining
owner: meta-agent
created: 2025-02-09
updated: 2025-02-09
refs:
  depends-on: [dp01, dp03, dp04]
  related: [dp-u01, dp-u05, dp-u12, dp02, wf-make-decision]
tags: [dev-platform, use-case, decisions]
---

# DP-U03 — Making and Recording an Architecture Decision

## Scenario

A design or architecture question arises during feature work (e.g., "Should we use Firestore or a relational database?"). The team needs to evaluate options, make a decision, record the rationale, and update all affected documents so future contributors understand why the choice was made.

### Steps

1. Contributor identifies a decision point — something that will constrain future design choices
2. Checks `docs/open-questions/` to see if this has already been explored as an open question
3. Opens `docs/decisions/_index.md` and identifies the next available ADR number
4. Creates `docs/decisions/adr-NNN-slug.md` using the ADR template from `docs/_conventions.md`
5. Fills in: Context (what prompted this), Decision (what we chose), Rationale (why), Alternatives Considered (what we rejected and why), Consequences (trade-offs)
6. Updates `refs.affects` to list all documents impacted by this decision
7. Updates each affected document to add `decided-by: [adr-NNN]` in their refs
8. If resolving an open question, updates the OQ's `resolves-to` ref and changes its status to `resolved`
9. Adds the ADR to `docs/_registry.md` and `docs/decisions/_index.md`
10. Logs the change in `docs/_changelog.md`

### Outcome

- The decision is permanently recorded with full context and rationale
- All affected documents reference the ADR
- Future contributors can trace any design constraint back to a specific decision
- The open question (if one existed) is marked as resolved

## Features Exercised

- DP01 — Knowledge Graph (new ADR node, cross-references)
- DP03 — Workflow Engine (`wf-make-decision` workflow followed)
- DP04 — Registry & Changelog (updated with new ADR)
- DP02 — Agent System (architecture-agent owns the decision)

## Acceptance Criteria

- [ ] ADR file exists with complete Context, Decision, Rationale, Alternatives, Consequences
- [ ] All affected documents reference the ADR in their frontmatter
- [ ] If an open question was resolved, its status is updated and it references the ADR
- [ ] Registry and changelog are updated
- [ ] The decision is reachable from `docs/decisions/_index.md`
