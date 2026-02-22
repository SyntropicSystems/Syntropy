---
id: "f10"
type: feature-spec
title: "Confidence Thresholds & Trust Controls"
status: defining
owner: product-agent
priority: P0
created: 2025-02-07
updated: 2026-02-22
refs:
  depends-on: [f04]
  enables: [u08, u01, u03]
  related: [f07, f01, f06, arch-agent-architecture]
  informed-by: [jtbd, stories]
  ux-patterns: [ux-ai-suggestion]
  open-questions: [oq-conflict-resolution, oq-monetization]
tags: [trust, ai, control, p0]
---

# F10 — Confidence Thresholds & Trust Controls

## Summary
User-configurable controls for how much autonomy the AI has. The system provides granular control over AI behavior through global, per-action, and per-source confidence thresholds, plus training and audit modes for onboarding and review.

In the [Heterogeneous Agent Architecture](../architecture/agent-architecture.md), confidence thresholds are the formal mechanism implementing the **Boundary of Trust** between Organic Agents (users) and Probabilistic Agents (AI). They define the calibration point where the system transitions from "suggest to the human" to "act autonomously" — the dynamic boundary between Organic authority and Probabilistic interpretation.

## Jobs Addressed
- J4 — Maintain Control While Delegating to AI (primary)

## How It Works
- Global confidence threshold: "Auto-act above X% confidence."
- Per-action thresholds: "Auto-archive above 95%, but never auto-reply above 0% (always ask me)."
- Per-source thresholds: "Auto-manage newsletters at 80%, but require confirmation for emails from contacts."
- The user can ratchet autonomy up or down over time as trust builds.
- A "training mode" where the AI suggests but never auto-acts, useful for onboarding.
- An "audit mode" where the user reviews all AI actions from the past day/week.

## Dependencies
- Requires: AI Action Engine (F4) for the confidence scoring system that thresholds are applied to.
- Enables: Onboarding & Trust Building (U8) where training mode and progressive threshold adjustment power the trust-building experience.

## Open Questions
- [ ] What are the default threshold values for new users?
- [ ] Should there be recommended threshold presets (e.g., "Conservative," "Balanced," "Aggressive")?
- [ ] How do we visualize threshold effectiveness — showing the user what would have been auto-acted at different levels?
- [ ] Should thresholds be per-domain/space as well (e.g., more autonomy for newsletters, less for work emails)?
- [ ] How does audit mode interact with the main queue flow — is it a separate view or integrated?
