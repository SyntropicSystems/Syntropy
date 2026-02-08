---
id: "oq-notification-strategy"
type: open-question
title: "Notification Strategy"
status: draft
owner: product-agent
created: 2025-02-07
updated: 2025-02-07
refs:
  affects: [f01, f04, f08]
  resolves-to: []
---

# OQ: Notification Strategy

## Question

How does the system alert the user to things that need attention without creating more noise?

## Context

Syntropy OS exists to reduce mental overhead -- its core job is to remove noise, not add it. Yet the system needs to surface time-sensitive items (deadlines, blocked tasks becoming unblocked, AI actions that need review, new high-priority cards). The paradox: the system must notify the user about important things while being the system that is supposed to eliminate notification overload. If the notification strategy is too aggressive, it undermines the core value proposition. If it is too passive, important items get missed. The card queue (F1) is the primary attention mechanism, but push notifications (FCM via F8) and AI-driven prioritization (F4) also play a role.

## Exploration

_(To be filled as exploration happens.)_

## Current Thinking

_(To be filled.)_

## Resolution Criteria

- A notification taxonomy defining categories of alerts (urgent, time-sensitive, informational, review-needed) with default delivery channels for each (push, in-app badge, queue reorder, silent)
- A user-configurable notification preferences model that lets users tune aggressiveness per category, per Space, and per time-of-day
- A design principle or heuristic for when the system should push-notify vs. silently queue, grounded in the "reduce mental overhead" philosophy
