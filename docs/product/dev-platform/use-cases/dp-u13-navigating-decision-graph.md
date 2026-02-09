---
id: "dp-u13"
type: use-case
title: "Navigating the Decision Graph to Understand Why"
status: defining
owner: decisions-agent
created: 2025-02-09
updated: 2025-02-09
refs:
  depends-on: [dp13, dp01, dp08]
  related: [dp-u04, wf-record-decision, decisions-agent]
tags: [dev-platform, decisions, navigation, reasoning]
---

# DP-U13 — Navigating the Decision Graph to Understand Why

## Scenario

A contributor — new to the project or returning after a context switch — encounters something in the codebase or documentation and wants to understand why it's that way. Instead of asking around (tribal knowledge) or guessing, they navigate the decision graph.

**Example flow:**

1. A new contributor sees that the system uses pure event sourcing on Firestore (not a hybrid approach) and wonders why.
2. They open `docs/decisions/_index.md` and find ADR-002: "Event Sourcing on Firestore."
3. The ADR explains the context (Firestore's strengths/limitations), the decision, the rationale, and the alternatives that were considered (hybrid was explored but rejected for complexity reasons).
4. They see `refs.parent` pointing to ADR-001 (Firebase as Backend Platform) — this decision was downstream of choosing Firebase.
5. They check the revisit triggers: "Reconsider if Firestore's 1MB document limit becomes a bottleneck for event-heavy entities." This tells them the decision is sound now but has known limits.
6. They also see a child decision (a hypothetical DR about materialized view strategy) that implements a specific aspect of the event sourcing choice.
7. In 5 minutes, they understand not just *what* was decided, but *why*, *what else was considered*, *when to worry about it*, and *how it connects to bigger choices*.

**Another example — finding a conflict:**

1. A contributor is about to make a decision about error handling conventions in a new service.
2. They check the decision graph for existing conventions and find DR-005: "All errors use structured error codes."
3. They also find DR-012: "Service X uses free-form error messages for rapid prototyping" with an explicit exception referencing DR-005.
4. They now know the global convention, the exception, and the reasoning behind both — and can make an informed choice for their new service.

## Features Exercised

- DP13 — Decision Records (primary — the graph is the product)
- DP01 — Knowledge Graph (traversal via refs)
- DP08 — Entry Point Routing (finding decisions from any starting point)
- DP04 — Registry & Changelog (discovery via registry)

## Acceptance Criteria

- [ ] A contributor can find relevant decisions starting from the decisions index
- [ ] Decision records link to their parents, children, and related decisions
- [ ] The problem stack in each decision connects up to higher-level goals
- [ ] Conflicts between decisions are either resolved or have explicit exceptions documented
- [ ] A contributor can understand the reasoning behind any system choice in under 10 minutes
- [ ] Revisit triggers are visible and actionable
