---
id: "dp-u05"
type: use-case
title: "Resolving an Open Question"
status: defining
owner: meta-agent
created: 2025-02-09
updated: 2025-02-09
refs:
  depends-on: [dp01, dp03, dp04]
  related: [wf-resolve-question, dp-u03]
tags: [dev-platform, use-case, questions]
---

# DP-U05 — Resolving an Open Question

## Scenario

An open question has been explored enough that the team can converge on a direction. The question needs to transition from exploration to resolution, potentially producing an ADR, and all affected documents need to be updated to reflect the resolution.

### Steps

1. Contributor reviews the open question's current state in its `oq-*.md` file
2. Evaluates the Exploration section — are the options well-understood? Are the trade-offs clear?
3. Updates the Current Thinking section with the proposed direction
4. Checks if the Resolution Criteria (defined when the question was created) are met
5. If resolution requires a formal decision, triggers `wf-make-decision` to create an ADR
6. Updates the open question's status from `exploring`/`converging` to `resolved`
7. Adds `resolves-to: [adr-NNN]` to the open question's refs (if an ADR was created)
8. Updates all documents in the OQ's `affects` list to reflect the resolution
9. Updates the registry with the new status
10. Logs the resolution in the changelog

### Outcome

- The question is formally resolved with clear rationale
- If a decision was needed, an ADR exists with full context
- Affected documents are updated to reflect the resolution
- The knowledge graph's integrity is maintained — no dangling references to unresolved questions

## Features Exercised

- DP01 — Knowledge Graph (updating nodes and edges)
- DP03 — Workflow Engine (`wf-resolve-question`, possibly `wf-make-decision`)
- DP04 — Registry & Changelog (status update, change logged)

## Acceptance Criteria

- [ ] Open question status is updated to `resolved`
- [ ] Resolution criteria from the original question are met
- [ ] If an ADR was created, the OQ references it via `resolves-to`
- [ ] All affected documents are updated
- [ ] Registry and changelog reflect the resolution
