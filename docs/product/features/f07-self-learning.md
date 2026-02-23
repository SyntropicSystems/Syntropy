---
id: "f07"
type: feature-spec
title: "Self-Learning System"
status: exploring
owner: product-agent
priority: P1
created: 2025-02-07
updated: 2025-02-07
refs:
  architecture: [arch-ai-pipeline]
  decided-by: [adr-003]
  depends-on: [f04, f06]
  enables: [u03, u08]
  informed-by: [jtbd, stories]
  open-questions: [oq-monetization, oq-privacy-model]
  related: [dp10, dp11, dp12, f04-ai-engine-agent, f10, f12]
tags: [ai, learning, p1]
---

# F07 — Self-Learning System

## Summary
The system continuously learns from user behavior, corrections, and preferences to improve over time. Every interaction is a training signal that refines confidence calibration, action prediction, and personalization profiles, creating a system that evolves to match each user's unique patterns and preferences.

## Jobs Addressed
- J3 — Automate Myself Where Possible (primary)
- J4 — Maintain Control While Delegating to AI (secondary)

## How It Works
- Every user correction (accepting, rejecting, or modifying an AI suggestion) is a training signal.
- Patterns are identified: "User always archives emails from this sender," "User always creates projects from emails with attachments over 5 participants."
- Confidence calibration improves: if the AI is 80% confident but the user rejects 50% of the time, the model recalibrates.
- User can explicitly train: "Always do X when you see Y" rules.
- User can review what the system has learned and delete/modify learned behaviors.
- Personalization profiles evolve: communication style, priority weightings, scheduling preferences, project management style.

## Dependencies
- Requires: Event Sourcing & Audit Trail (F6) for training data from the event log; AI Action Engine (F4) for confidence scoring and action suggestions to learn from.
- Enables: AI Auto-Managing Inbox (U3) where learned patterns drive autonomous inbox management; Onboarding & Trust Building (U8) where the learning system powers the trust-ratcheting experience.

## Open Questions
- [ ] What is the minimum number of training signals needed before the system begins auto-acting on a pattern?
- [ ] How do we handle conflicting patterns (e.g., user archives newsletters from sender X on weekdays but reads them on weekends)?
- [ ] Should learned behaviors be exportable/importable across accounts?
- [ ] What is the feedback loop latency — how quickly should a correction affect future suggestions?
- [ ] How do we surface "what the system has learned" in a way that's understandable and not overwhelming?
