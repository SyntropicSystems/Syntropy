---
id: "ux-ai-suggestion"
type: ux-pattern
title: "AI Suggestion Display"
status: defining
owner: ux-agent
created: 2025-02-07
updated: 2025-02-07
refs:
  depends-on: [f04, f10]
  related: [ux-card-queue]
tags: [ux, ai, suggestions, confidence]
---

# AI Suggestion Display

- Yellow-accented card section below the task description.
- Shows: "AI Suggestion" label, recommended action text, confidence meter (bar + percentage).
- Confidence color coding: green (>80%), yellow (60-80%), orange (<60%).
- High confidence actions (>90%) show "would auto-execute" label.
- The suggested action is visually emphasized in the action button row (highlighted border, lightning icon).
