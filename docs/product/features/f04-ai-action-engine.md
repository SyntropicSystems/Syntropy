---
id: "f04"
type: feature-spec
title: "AI Action Engine"
status: exploring
owner: product-agent
priority: P0
created: 2025-02-07
updated: 2025-02-07
refs:
  depends-on: [f06]
  enables: [u01, u03, u05, u07, u08]
  related: [f03, f05, f07, f09, f10, f11]
  informed-by: [jtbd, stories]
  decided-by: [adr-003]
  ux-patterns: [ux-ai-suggestion]
  architecture: [arch-ai-pipeline]
  open-questions: [oq-privacy-model, oq-conflict-resolution, oq-monetization, oq-notification-strategy]
tags: [core, ai, engine, p0]
---

# F04 — AI Action Engine

## Summary

The intelligence layer that analyzes every card and either suggests or auto-executes actions based on confidence scoring.

## Jobs Addressed

- J1 — Remove Mental Overhead from Daily Life (primary)
- J3 — Automate Myself Where Possible (primary)
- J4 — Maintain Control While Delegating to AI (secondary)

## How It Works

- Every card is analyzed by the AI engine which determines: likely intent, best action, confidence level.
- **High confidence (>90%):** AI auto-executes the action (e.g., auto-archive a known newsletter). User is notified post-facto via the audit trail.
- **Medium confidence (60-90%):** AI suggests the action prominently on the card with an "AI Suggestion" badge and confidence meter. User confirms with one tap.
- **Low confidence (<60%):** Card is presented without a strong suggestion. AI may offer multiple options ranked by likelihood.
- Users can adjust confidence thresholds globally and per-action-type.

### AI Roles/Agents

- **Personal Assistant:** Scheduling, reminders, follow-ups, routine email management.
- **Project Manager:** Task prioritization, dependency tracking, deadline management, status rollups.
- **Domain Agents:** Specialized agents for specific contexts (e.g., financial emails get a "finance agent" that understands invoices, bills, subscriptions).

### Confidence-Based Handoff

- The confidence meter is always visible on cards with AI suggestions.
- Users can see *why* the AI chose an action (explainability).
- Every AI action (auto or suggested) is logged in the audit trail.
- User corrections feed back into the learning system to improve future confidence calibration.

## Dependencies

- Requires: F06 (Event Sourcing & Audit Trail) — all AI actions are event-logged for transparency and learning
- Enables: U01 (Email Triage), U03 (AI Auto-Managing Inbox), U05 (End-of-Day Review), U07 (AI Auto-Filing into Spaces)

## Open Questions

- [ ] What LLM architecture best supports the multi-agent approach (single model with role prompts vs. specialized fine-tuned models)?
- [ ] How should confidence calibration work during the cold-start period before user correction data exists?
- [ ] What is the cost-per-card target for LLM inference, and how does batching affect latency?
- [ ] How should the system handle conflicting suggestions from different agents?
