---
id: "ux-epic-drill-down"
type: ux-pattern
title: "Epic Drill-Down Flow"
status: defining
owner: ux-agent
created: 2025-02-07
updated: 2025-02-07
refs:
  depends-on: [f01, f02]
  related: [ux-card-queue, ux-follow-up, ux-dependency-viz]
tags: [ux, epic, drill-down, navigation]
---

# Epic Drill-Down Flow

1. User sees epic badge on a card (e.g., "Q1 Product Launch").
2. Taps badge → queue transitions to Epic View.
3. Epic Header appears below top bar: icon, title, progress, blocked count.
4. Bottom queue shows only epic's cards, sorted by dependency order.
5. Cards show dependency status (blocked indicator with blocker count).
6. "← Back to Queue" button in header returns to full priority queue.
