---
id: "f04"
type: feature-spec
title: "AI Action Engine"
status: exploring
owner: product-agent
priority: P0
created: 2025-02-07
updated: 2026-02-22
refs:
  depends-on: [f06]
  enables: [u01, u03, u05, u07, u08]
  related: [f03, f05, f07, f09, f10, f11, arch-agent-architecture]
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

In the [Heterogeneous Agent Architecture](../../architecture/agent-architecture.md), the AI Action Engine operates as a **Probabilistic Agent** — trusted with interpretation but never absolute state changes without Deterministic validation. All AI outputs pass through Deterministic validation (confidence scoring, schema checks, business rules) before becoming system truth.

Each role is a Probabilistic Agent with distinct [Internal Components](../../architecture/agent-architecture.md#the-9-internal-components):

- **Personal Assistant:** Skills: scheduling, reminders, follow-ups, routine email management. Policies: "reduce cognitive load on daily routines." Memory: user's scheduling patterns, communication preferences. (Probabilistic)
- **Project Manager:** Skills: task prioritization, dependency tracking, deadline management, status rollups. Policies: "keep projects on track, surface blockers early." Memory: project history, velocity patterns. (Probabilistic Skills + Deterministic Skills for math)
- **Domain Agents:** Specialized agents whose Traits, Skills, and Memory are tuned for specific contexts (e.g., the Finance Agent's Memory includes invoice patterns; its Skills include expense categorization). (Probabilistic)
- **Confidence Scoring & Threshold Enforcement:** Deterministic Agent. Skills: mathematical threshold comparison. Workflows: "if score > X then auto-execute; else suggest." Policies: N/A (commands only). (Deterministic)
- **Human User:** Organic Agent. Policies: personal goals ("clear my inbox," "train the AI"). Skills: judgment, override, correction. Memory: lived experience, domain knowledge. (Organic)

### Confidence-Based Handoff

The confidence system implements the [Boundary of Trust](../../architecture/agent-architecture.md) between agent types. In [component](../../architecture/agent-architecture.md#the-9-internal-components) terms, this is where Internal Components flow between all three agent types:

- The confidence meter feeds the Organic Agent's **Internal Context** — making the Probabilistic Agent's reasoning visible so the human can exercise authority.
- Users (Organic Agents) can see *why* the AI chose an action: the Probabilistic Agent's **Internal Context** (what data it considered) and **Skills** (what logic it applied) are surfaced as explainability.
- Every AI action (auto or suggested) is stored in **Memory** (the event log) by Deterministic Agent **Skills** (event sourcing).
- User corrections (Organic Agent **Skills** applied with judgment) feed back into Probabilistic Agent **Memory** to improve calibration over time.
- When Probabilistic Agent **Internal State** shifts to "low confidence," Graceful Degradation routes the decision to the Organic Agent's **Internal Context** for human judgment.

## Dependencies

- Requires: F06 (Event Sourcing & Audit Trail) — all AI actions are event-logged for transparency and learning
- Enables: U01 (Email Triage), U03 (AI Auto-Managing Inbox), U05 (End-of-Day Review), U07 (AI Auto-Filing into Spaces)

## Open Questions

- [ ] What LLM architecture best supports the multi-agent approach (single model with role prompts vs. specialized fine-tuned models)?
- [ ] How should confidence calibration work during the cold-start period before user correction data exists?
- [ ] What is the cost-per-card target for LLM inference, and how does batching affect latency?
- [ ] How should the system handle conflicting suggestions from different agents?
