---
id: "f02"
type: feature-spec
title: "Recursive Task Hierarchy"
status: defining
owner: product-agent
priority: P0
created: 2025-02-07
updated: 2025-02-07
refs:
  depends-on: [f01]
  enables: [u02, u04]
  related: [f09, f11]
  informed-by: [jtbd, stories]
  ux-patterns: [ux-epic-drill-down, ux-dependency-viz]
  architecture: [arch-data-model]
  open-questions: [oq-multi-user]
tags: [core, mvp, hierarchy, p0]
---

# F02 — Recursive Task Hierarchy

## Summary

Any task can become a parent to other tasks, creating a recursive tree/graph structure. The naming is flexible (epic, project, parent task — it's all the same mechanism).

## Jobs Addressed

- J1 — Remove Mental Overhead from Daily Life (primary)
- J5 — Build a Personal Knowledge & Action System (secondary)

## How It Works

- Any card can be promoted to a parent/epic by adding sub-tasks to it.
- Sub-tasks can have their own sub-tasks (recursive depth is unlimited).
- Tasks can also have dependency relationships (task B depends on task A completing).
- This forms a directed acyclic graph (DAG) of tasks, not just a flat list.
- An epic/project can be created from an email, a note, or manually.

### Epic Queue Drill-Down

- Each card can display its parent epic as a clickable badge.
- Clicking the epic badge switches the queue to "Epic View" — only cards belonging to that epic are shown in the bottom queue.
- In Epic View, cards are sorted by dependency order: unblocked first, blocked later.
- An Epic Header bar appears at the top showing: epic name, icon, progress (X/Y done), and count of blocked tasks.
- A "Back to Queue" button exits Epic View and returns to the full priority queue, remembering where the user left off.
- The dependency graph is visible: cards show if they are blocked (with indicator showing blocker count) or if completing them unlocks follow-up tasks.

## Dependencies

- Requires: F01 (Task Card System) — cards are the atomic unit that hierarchy organizes
- Enables: U04 (Project Overview & Epic Drill-Down)

## Open Questions

- [ ] What is the practical depth limit before the UI becomes unwieldy?
- [ ] How should circular dependency attempts be detected and prevented?
- [ ] Should cross-project dependencies be supported (task in Project A depends on task in Project B)?
