---
id: "dp-u12"
type: use-case
title: "Recording a Decision During Work"
status: defining
owner: decisions-agent
created: 2025-02-09
updated: 2025-02-09
refs:
  depends-on: [dp13, dp01]
  related: [dp-u03, wf-record-decision, decisions-agent]
tags: [dev-platform, decisions, capture]
---

# DP-U12 — Recording a Decision During Work

## Scenario

A contributor (human or AI) is working on a task — writing a feature spec, choosing a methodology, setting a convention, or resolving a disagreement — and a decision is made. Rather than letting it dissolve into conversation history, they capture it as a decision record.

**Example flow:**

1. While refining user stories, the team decides that all user stories should include acceptance criteria as testable checkboxes (not prose descriptions).
2. The contributor recognizes this as a decision worth capturing — it took thought, someone might question it later, and it affects how everyone writes stories going forward.
3. They run `wf-record-decision` (or ask the decisions-agent for help).
4. They classify it as Type 2 (easily reversible — the convention can change).
5. They write a brief record:
   - **Problem Stack**: User story quality varies; some stories lack clear acceptance criteria, making it hard to know when they're done. Serves DJ6 (consistency).
   - **Decision**: Acceptance criteria in user stories are written as testable checkbox items, not prose.
   - **Success Metrics**: Stories are easier to verify as complete; fewer "is this done?" conversations.
   - **Revisit Triggers**: If checkbox format feels too rigid for complex stories, reconsider.
6. The record is filed as `dr-001-acceptance-criteria-format.md`, cross-referenced to the stories spec, and logged.

The entire capture took 3 minutes. The next person who asks "why do we use checkboxes for acceptance criteria?" has a 10-second answer instead of a 10-minute archaeology exercise.

## Features Exercised

- DP13 — Decision Records (primary)
- DP01 — Knowledge Graph (refs, graph structure)
- DP04 — Registry & Changelog (tracking)
- DP03 — Workflow Engine (wf-record-decision)
- DP05 — Convention System (follows templates)

## Acceptance Criteria

- [ ] A decision is captured as a decision record file in `docs/decisions/`
- [ ] The record has at minimum: Problem Stack and Decision sections
- [ ] The record has valid frontmatter with decision-type set
- [ ] Cross-references are bidirectional (affected docs ↔ decision)
- [ ] The decisions index, registry, and changelog are updated
- [ ] The total capture time for a Type 2 decision is under 5 minutes
