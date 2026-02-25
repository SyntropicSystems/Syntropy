---
id: "dr-004"
type: decision-record
title: "Coherence Engine: Three-Mode Architecture with Phased Implementation"
status: accepted
owner: meta-agent
decision-type: type-2
created: 2026-02-25
updated: 2026-02-25
refs:
  affects: [dp18]
  children: []
  domain: [system]
  parent: []
  related: [coherence-engine, dp09, dp13, dr-003, jtbd-dev-platform]
  tensions: []
tags: [coherence, architecture, methodology, dev-platform]
---

# DR-004: Coherence Engine: Three-Mode Architecture with Phased Implementation

## Problem Stack

The system grows at AI speed. Structural coherence (do the files exist? are the refs valid?) is solved by `syntropy validate`. But semantic coherence (does everything still mean the same thing after a philosophical shift?) is not. Five problems compound:

1. **Capture Gap** — insights require manual integration into N documents
2. **Semantic Drift** — principle changes don't propagate to dependent contexts
3. **Session Recovery** — no protocol for context recovery at session boundaries
4. **Tribal Knowledge** — decisions made vs. decisions documented ratio degrades
5. **Force Multiplication** — agents follow instructions but can't reason from principles

These aren't separate problems — they're one systemic risk: coherence degrades faster than it can be maintained.

## Context & Data

- The knowledge graph currently has 100+ documents, 15 agents, 21 JTBD, and growing
- `syntropy validate` catches structural violations but has no semantic awareness
- Domain CONTEXT.md files exist but lack a session-level protocol
- Philosophical pivots (e.g., Dog Park → Bond Model, Pattern Journal → Skill Trees) require touching 10+ documents manually
- The recent Experience Layer integration (DP16/DP17) demonstrated both the scale of cross-cutting changes and the manual effort required to keep everything aligned

## Options Explored

### Option A: Extend `syntropy validate` with semantic checks

Pros: Single tool, incremental improvement.
Cons: Validation is inherently passive — it catches problems but doesn't help fix them. Doesn't address session management or integration.

### Option B: Build separate tools for each problem

Pros: Focused, independent tools.
Cons: Five separate tools with no unified model. Harder to reason about. The problems are interconnected — solving them independently misses the compounding benefit.

### Option C: Three-mode coherence engine (chosen)

Pros: Unified model that addresses all five problems through three complementary modes. Phased implementation allows immediate value (Phase 0) with long-term vision. Each mode reinforces the others.
Cons: Larger conceptual surface area. Risk of over-engineering if not phased carefully.

## Decision

Build the coherence engine as a three-mode system:

1. **Passive Monitoring** — continuous drift detection, decision density tracking, staleness alerting
2. **Active Integration** — triggered changeset generation when insights or changes need propagation
3. **Session Management** — structured protocols for session start/end/handoff

Implementation follows five phases:
- Phase 0 (Now): Session protocol as manual workflows (`wf-begin-session`, `wf-end-session`)
- Phase 1 (Next): `syntropy coherence` CLI with structural + basic semantic validation
- Phase 2 (Soon): Integration assistant (insight → changeset)
- Phase 3 (Later): Bird's eye dashboard
- Phase 4 (Eventually): Calibration loop (agent decision review → principle refinement)

The coherence jobs are added to the dev platform JTBD as DJ15–DJ21, representing a new axis: what keeps the system itself coherent, complementing the existing jobs that describe what the platform does for contributors.

## Success Metrics

- Phase 0: Session protocol exists and is executable by humans and AI today
- Phase 1: Semantic drift detectable for renamed concepts, stale contexts, and principle-policy contradictions
- Phase 2: A single insight description produces a complete, reviewable changeset covering all affected documents
- Long-term: Decision density stays above 80% (decisions documented / decisions made); no domain context older than 2 weeks without sync

## Revisit Triggers

- If the phased approach creates too much manual overhead in Phase 0, accelerate Phase 1
- If semantic drift detection produces too many false positives, recalibrate the detection model
- If the three-mode architecture proves too complex for a single feature, decompose into separate features (monitoring, integration, session)
- If the coherence engine's own evolution doesn't follow its own principles (DJ21), that's a design failure signal
