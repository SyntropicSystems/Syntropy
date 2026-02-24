---
id: "dp-u13"
type: use-case
title: "Navigating the Decision Graph to Understand Why"
status: defining
owner: decisions-agent
created: 2025-02-09
updated: 2026-02-24
refs:
  depends-on: [dp13, dp01, dp08]
  related: [dp-u04, wf-record-decision, decisions-agent]
tags: [dev-platform, decisions, navigation, reasoning]
---

# DP-U13 — Navigating the Decision Graph to Understand Why

## Scenario

A contributor — new to the project or returning after a context switch — encounters something in the codebase or documentation and wants to understand why it's that way. Instead of asking around (tribal knowledge) or guessing, they navigate the decision graph.

**Example flow:**

1. A contributor sees older docs that mention Firebase/Firestore, but newer docs describe the backend as “undecided” and the repo as Rust-first. They wonder: *what is current?*
2. They open `docs/decisions/_index.md` and find ADR-006: "Rust-First Repository Foundation; App/Backend Stack Deferred."
3. ADR-006 explains the intent: remove placeholder Node/Nx/Pulumi scaffolding, keep the repo focused on the Rust Workspace Platform, and explicitly defer the backend/app stack.
4. ADR-006 also points to superseded ADRs (ADR-001/ADR-002/ADR-004/ADR-005). The contributor opens them to understand historical rationale, but sees they are clearly marked `superseded-by: [adr-006]`.
5. In minutes, they understand not just *what is true now*, but *what used to be assumed*, *why that was reasonable at the time*, and *what would trigger revisiting the decision*.

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
