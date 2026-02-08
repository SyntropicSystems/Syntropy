---
id: "oq-conflict-resolution"
type: open-question
title: "AI Conflict Resolution & Undo Mechanisms"
status: draft
owner: product-agent
created: 2025-02-07
updated: 2025-02-07
refs:
  affects: [f04, f10, f06]
  resolves-to: []
---

# OQ: AI Conflict Resolution & Undo Mechanisms

## Question

What happens when AI auto-acts but the user would have chosen differently? What are the undo mechanisms?

## Context

The AI Action Engine (F4) auto-executes actions above the confidence threshold (>90% by default). This means the system will archive emails, categorize tasks, and potentially draft replies without human confirmation. When the AI gets it wrong -- archives an important email, miscategorizes a task, or takes an action the user disagrees with -- there must be a clear, low-friction path to undo and correct. The event sourcing architecture (F6) guarantees every auto-action is logged, but the undo mechanism itself needs to be designed. This directly impacts user trust and the willingness to increase AI autonomy over time (F10).

## Exploration

_(To be filled as exploration happens.)_

## Current Thinking

_(To be filled.)_

## Resolution Criteria

- A defined undo mechanism for every auto-executed action type (archive, categorize, create task, etc.) with clear UX for how the user triggers it
- A specification for how undo interacts with event sourcing -- does undo create a compensating event, or does it reverse the original? (Event immutability suggests compensating events.)
- A design for post-facto review UX where users can browse AI auto-actions and batch-undo/correct, integrated with the audit trail (F6)
