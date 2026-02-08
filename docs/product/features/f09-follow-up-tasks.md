---
id: "f09"
type: feature-spec
title: "Follow-Up Task Creation & Dependency Resolution"
status: defining
owner: product-agent
priority: P1
created: 2025-02-07
updated: 2025-02-07
refs:
  depends-on: [f01, f02]
  enables: [u04]
  related: [f04]
  informed-by: [jtbd, stories]
  ux-patterns: [ux-follow-up, ux-dependency-viz]
tags: [workflow, dependencies, p1]
---

# F09 — Follow-Up Task Creation & Dependency Resolution

## Summary
When a task is completed, the system can automatically create or surface follow-up tasks based on the dependency graph. This ensures nothing falls through the cracks by proactively managing the chain of work that flows from each completed action.

## Jobs Addressed
- J1 — Remove Mental Overhead from Daily Life (primary)
- J2 — Never Lose Track of Commitments (secondary)

## How It Works
- Tasks can declare what follow-up tasks they "create" when completed (defined in the dependency graph).
- When a task is completed, any dependent tasks that are now unblocked are surfaced in the queue.
- AI can also suggest follow-up tasks based on the context of what was just completed (e.g., after replying to an email, suggest "Follow up in 3 days if no response").
- If a task is completed and there are no remaining follow-up tasks in the queue, the user is prompted: "Create a follow-up?" with a quick-add form.
- In Epic View, when all tasks are done, the user sees a completion screen with options to add follow-ups or return to the main queue.

## Dependencies
- Requires: Task Card System (F1) for the queue and card interface; Recursive Task Hierarchy (F2) for the dependency graph structure.
- Enables: Project Overview & Epic Drill-Down (U4) where dependency resolution powers the drill-down workflow.

## Open Questions
- [ ] How deep should automatic follow-up chain creation go — should completing one task trigger a cascade?
- [ ] What is the UX for managing follow-up suggestions that the user doesn't want?
- [ ] How do AI-suggested follow-ups interact with explicitly declared dependency chains?
- [ ] Should follow-up creation be configurable per project or globally?
