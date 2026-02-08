---
id: "u04"
type: use-case
title: "Project Overview & Epic Drill-Down"
status: defining
owner: product-agent
priority: P0
created: 2025-02-07
updated: 2025-02-07
refs:
  depends-on: [f02, f01, f09]
  related: [u05]
tags: [projects, epic, workflow]
---

# U04 — Project Overview & Epic Drill-Down

## Scenario
User clicks an epic badge on a card: "Q1 Product Launch." The queue switches to show only launch tasks: 4 completed, 2 in progress, 3 blocked. They can see the dependency chain: design approval → staging deploy → launch announcement. They approve the design, which unblocks staging, which the AI auto-assigns to the dev lead.

## Features Exercised
- F02 — Recursive Task Hierarchy
- F01 — Task Card System
- F09 — Follow-Up Task Creation & Dependency Resolution
