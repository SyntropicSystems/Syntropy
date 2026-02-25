---
id: "dp18"
type: feature-spec
title: "Coherence Engine"
status: exploring
owner: meta-agent
priority: P0
created: 2026-02-25
updated: 2026-02-25
refs:
  depends-on: [dp01, dp02, dp03, dp04, dp09, dp10, dp11, dp13]
  enables: []
  informed-by: [coherence-engine, jtbd-dev-platform]
  related: [dp-stories, dp05, dp08, dp12, dp14, dp15, dp16]
tags: [dev-platform, coherence, semantic-drift, session-management, integration, p0]
---

# DP18 — Coherence Engine

## Summary

The system that keeps Syntropy's knowledge graph semantically coherent as it grows. Three modes — passive monitoring (detecting drift), active integration (propagating changes), and session management (context recovery at boundaries) — work together to ensure that moving fast doesn't erode the connections, alignment, and intent that make the system navigable.

Where `syntropy validate` catches structural problems (missing files, broken refs, naming violations), the Coherence Engine catches semantic problems (a principle changed but three domain contexts still reflect the old philosophy; an insight was captured but not integrated into the six documents it affects; a session ended without state capture).

## Problem

The system has solved the structural coherence problem: validation, bidirectional refs, generated registries, drift gates. But five coherence problems remain unsolved:

1. **Capture Gap** — Insights require manual integration into many documents; miss one and sources of truth diverge
2. **Semantic Drift** — Philosophical changes don't propagate to domain contexts, agent policies, and invariants that depend on them
3. **Session Recovery** — No protocol exists for "start a work session" or "end a work session" at the system level
4. **Tribal Knowledge** — The ratio of decisions made to decisions documented degrades under speed; philosophy lives in conversations, not the graph
5. **Force Multiplication** — Agents can follow instructions but can't reason from principles; calibration of agent judgment has no feedback loop

Each problem is manageable in isolation. They compound into a single systemic risk: the system's coherence degrades faster than it can be maintained, and growth creates entropy rather than emergence.

## Jobs Addressed

- **DJ15** — Integrate Insights from Any Source into the Knowledge Graph Automatically (primary)
- **DJ16** — Detect and Surface Semantic Drift Across the Knowledge Graph (primary)
- **DJ17** — Provide Instant Context Recovery at Every Session Boundary (primary)
- **DJ18** — Make Every Decision Traceable from Principle to Implementation (secondary)
- **DJ19** — Enable Any Actor to Operate with Correct Judgment, Not Just Correct Instructions (secondary)
- **DJ20** — Maintain a Real-Time Bird's Eye View of System State (secondary)
- **DJ21** — Ensure the System of Work Itself Evolves Through Its Own Principles (secondary)

Also extends:
- **DJ1** — Maintain a Single Source of Truth (the integration mode keeps sources aligned)
- **DJ7** — Preserve Domain Expertise (session management adds session-level continuity on top of domain-level)
- **WJ3** — Validate Workspace Coherence (adds semantic layer on top of structural validation)

## How It Works

### Mode 1: Passive Monitoring

Continuous background detection of coherence degradation:

- **Semantic drift detection**: When a vision, principle, or philosophy document changes, trace the dependency graph to identify domain contexts, agent policies, and feature specs whose *content* may now be inconsistent with the new direction. Surface these as a prioritized review list.
- **Decision density monitoring**: Track the ratio of decisions made (inferred from changelog, commits, conversation artifacts) to decisions documented (DR entries). Alert when the ratio drops below threshold.
- **Stale context detection**: Flag domain CONTEXT.md files whose `last-synced` date is older than significant changelog entries in their scope.
- **Orphaned concept detection**: Identify glossary terms not referenced by any document, or documents referencing terms not in the glossary.
- **Cross-reference staleness**: Beyond bidirectional ref validation, check whether referenced documents have changed semantically since the reference was established.

### Mode 2: Active Integration

Triggered integration when insights or changes occur:

- **Insight integration**: Given a natural-language description of an insight ("We decided to replace skill trees with pattern journals"), determine every document, domain context, glossary entry, feature spec, and cross-reference that needs updating. Generate a structured changeset with proposed updates. Present for human review before applying.
- **Philosophy propagation**: When a principle or design philosophy changes, trace downward through the dependency graph: principle → vision doc → feature spec → domain policy → agent behavior → workflow step. Generate a changeset for each layer.
- **Decision capture**: When a choice is made in conversation or code review, prompt for lightweight decision record capture. Auto-populate context from the current work state.
- **Batch integration**: After a large session that produced multiple insights, run integration for all of them as a batch, deduplicating and merging overlapping changes.

### Mode 3: Session Management

Protocol for session boundaries:

**Session Start (`wf-begin-session`)**:
1. Surface what changed since last session (commits, PRs, agent activity, new observations, resolved questions)
2. Show active threads and where each one paused
3. Show decisions waiting for review
4. Recommend session focus based on priority and momentum
5. Pre-load relevant domain contexts

**Session End (`wf-end-session`)**:
1. Capture session state: what was worked on, what's in progress, what decisions were made
2. Run lightweight coherence check on changes made during session
3. Flag any insights that haven't been integrated
4. Update relevant domain CONTEXT.md files
5. Record session summary for next session's recovery

### Coherence Scoring

Each domain and the system as a whole has a coherence score — a composite of:

- Structural integrity (refs valid, naming correct, frontmatter complete)
- Semantic alignment (contexts match current principles, glossary terms used consistently)
- Decision coverage (decisions made vs. decisions documented)
- Freshness (how recently each domain's context was synced)
- Integration completeness (how many insights have been fully integrated)

The score is diagnostic, not competitive. It identifies where attention is needed, not whether the system is "good enough."

## Relationship to Existing Features

| Feature | Relationship |
|---------|-------------|
| **DP01 (Knowledge Graph)** | The coherence engine operates *on* the knowledge graph — it's the quality assurance layer |
| **DP04 (Registry & Changelog)** | Changelog is the primary input for drift detection and session recovery |
| **DP09 (Domain Context Sync)** | The coherence engine extends domain-level sync to system-level semantic coherence |
| **DP10 (Observation System)** | Coherence issues detected by passive monitoring flow into the observation system |
| **DP11 (Reflection Loop)** | Session end protocol incorporates and extends the reflection workflow |
| **DP12 (Pulse Companion)** | The companion's "welcome back" experience is the UX for session management |
| **DP13 (Decision Records)** | Decision density monitoring ensures the reasoning graph stays comprehensive |
| **DP14 (Cognitive Engineering)** | How coherence reports and drift summaries are structured for comprehension |
| **DP15 (Operational Engineering)** | How coherence workflows are designed for different actors |
| **DP16 (Experience Layer)** | Session awareness (Phase 1) is the experience layer's first coherence touchpoint |

## Phases

### Phase 0 — Session Protocol (Now)

Codify session start/end as executable workflows (`wf-begin-session`, `wf-end-session`) that a human or AI can follow today, manually. No tooling required — just structured process.

Solves: The Tuesday Morning Problem (Problem 3)

### Phase 1 — Structural + Basic Semantic Validation

Build `syntropy coherence` as a CLI command that extends `syntropy validate` with:
- Check if domain contexts reference renamed/removed concepts
- Check if agent policies contradict current principles
- Check decision density per domain
- Report staleness of domain contexts

Solves: Partial coverage of Semantic Drift (Problem 2)

### Phase 2 — Integration Assistant

Build the active integration mode. Given a natural-language insight description:
- Trace implications through the dependency graph
- Generate a changeset with proposed updates
- Present for review

Solves: The Capture Gap (Problem 1)

### Phase 3 — Bird's Eye Dashboard

Live view of system state:
- Domain health and coherence scores
- Active threads and their status
- Semantic drift detections
- Pending decisions
- Recent agent activity
- System coherence heatmap (strong vs. fragile areas)

Solves: Bird's Eye View (DJ20)

### Phase 4 — Calibration Loop

Agent decision review and correction:
- Review agent decisions for alignment with principles
- Corrections trace back to principle refinements
- The system that improves the system

Solves: Force Multiplication (Problem 5), Self-Evolving System (DJ21)

Each phase delivers value independently. Each phase makes the next phase more effective.

## Dependencies

- Requires: DP01 (Knowledge Graph) — the graph is what's being kept coherent; DP02 (Agent System) — agents are both subjects and objects of coherence; DP03 (Workflow Engine) — session protocol and integration are workflows; DP04 (Registry & Changelog) — changelog drives drift detection; DP09 (Domain Context Sync) — domain state is the unit of coherence; DP10 (Observation System) — coherence issues become observations; DP11 (Reflection Loop) — session end incorporates reflection; DP13 (Decision Records) — decision density requires the decision system
- Related: DP05 (Convention System) — conventions are the structural coherence rules; DP08 (Entry Point Routing) — coherence ensures routing stays accurate; DP12 (Pulse Companion) — companion is the UX for session management

## Open Questions

- [ ] Should the coherence engine be its own domain agent, or an extension of the meta-agent's responsibilities?
- [ ] What's the right threshold for decision density alerting? (Every choice? Only choices with downstream implications?)
- [ ] How does semantic drift detection work in practice? (LLM comparison of principle text vs. context text? Pattern matching on key terms?)
- [ ] Should session state persist in `.syntropy/sessions/` or in domain CONTEXT.md files?
- [ ] How does the integration assistant handle conflicting implications? (Insight X requires change A to doc D, but insight Y requires change B to the same doc)
- [ ] What's the minimum viable coherence score model for Phase 1?
- [ ] How does the bird's eye dashboard render? (CLI table? Web UI? Generated markdown?)
- [ ] Should the calibration loop be opt-in per domain or system-wide?
