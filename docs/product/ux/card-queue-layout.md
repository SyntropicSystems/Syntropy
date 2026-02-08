---
id: "ux-card-queue"
type: ux-pattern
title: "Card Queue Layout"
status: defining
owner: ux-agent
created: 2025-02-07
updated: 2025-02-07
refs:
  depends-on: [f01]
  related: [ux-epic-drill-down, ux-ai-suggestion]
tags: [ux, queue, layout, cards]
---

# Card Queue Layout

- **Main area:** Single active card displayed prominently, vertically centered.
- **Bottom queue:** Horizontal scrollable strip of card chips. Active card is visually highlighted (gold border) and auto-centered.
- **Done cards:** Remain in queue with muted styling (darker, strikethrough, checkmark). Tapping a done card shows a read-only summary.
- **Progress:** Top-right progress ring (completed/total) with fraction text.
