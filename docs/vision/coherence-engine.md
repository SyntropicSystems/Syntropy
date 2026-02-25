---
id: "coherence-engine"
type: vision
title: "The Coherence Engine"
status: active
owner: meta-agent
created: 2026-02-25
updated: 2026-02-25
refs:
  depends-on: [manifesto, principles]
  enables: [dp18]
  related: [delivery-flow, dp09, dp13, dp16, experience-layer, glossary, jtbd-dev-platform]
tags: [vision, philosophy, coherence, meta]
---

# The Coherence Engine

> How to move fast without losing the map.

## The Root Anxiety

There's a specific anxiety that comes from generating at the speed AI enables: not fear of failure, but fear of entropy. Fear that the ideas, the architecture, the connections — the *coherence* — will degrade faster than you can maintain it.

This anxiety has a shape. It's five distinct problems that compound into one feeling: "I'm moving too fast and the system can't hold."

The Coherence Engine is the system-level answer — the heartbeat that keeps Syntropy alive as it grows. It's the system-level equivalent of what the companion does for an individual: maintains the bird's eye view, catches drift, ensures every change ripples correctly, and makes the state transparent at all times.

## Problem 1: The Capture Gap

### What it is

Breakthroughs happen in conversations, in code, in the shower. There's always a translation step between "insight occurred" and "insight is integrated into the system." That step is manual, fragile, and the first thing to slip under pressure.

A conversation produces a paradigm shift (Dog Park mechanic replaces bond model). That shift needs to ripple into: the experience layer vision doc, the companion module, the social module, the anti-patterns, the glossary, the pulse-companion domain context, the cognitive-engineering context, the feature spec, the architecture doc. Miss one, and now you have two sources of truth that disagree.

### What it feels like

"Did I capture everything from that session? Did I update all the cross-references? Is the glossary current? Did the domain contexts get the new philosophy?"

### What's already in place

- DJ1 (Single source of truth) establishes the principle
- DJ8 (Capture signals) handles observations
- `wf-capture-observation` provides low-friction signal capture
- `wf-update-document` provides the mechanics of updating docs

### What's missing

There's no workflow for: "A conversation just produced insights X, Y, Z. Determine every document, domain context, glossary entry, and cross-reference that needs updating, generate a changeset, and present it for review." The integration step needs to be as close to automatic as possible.

## Problem 2: The Semantic Drift Problem

### What it is

Structural coherence (do the files exist? are the cross-refs valid?) is solvable with `syntropy validate`. Semantic coherence (does the companion domain context still align with the companion philosophy after we changed the philosophy?) is not.

You change a principle. Fourteen domain agents don't know. The pulse-companion's invariants say "the companion never evaluates, judges, or ranks contributors" — which still aligns with the Pattern Journal model — but its context still references "skill trees" because that context was written before the pivot. The structure is valid. The meaning has drifted.

### What it feels like

"Is everything still saying the same thing? Did that philosophical shift actually propagate everywhere? Are any of my agents operating on outdated assumptions?"

### What's already in place

- WJ3 (Validate workspace coherence) catches structural drift
- `syntropy validate` checks file structure, frontmatter, naming
- `syntropy gen agents --check` catches adapter drift
- Bidirectional cross-references create a navigable graph

### What's missing

A semantic coherence layer that can: read a principle change, trace its implications through the dependency graph, identify documents whose *content* (not just *structure*) may now be inconsistent, and surface them for review. Not AI rewriting everything — AI identifying what *needs human attention* after a change.

## Problem 3: The Tuesday Morning Problem

### What it is

You sit down on Tuesday morning. You worked on three things yesterday. Two agents ran overnight. There's a PR to review. You had an insight in the shower. Your brain has context from yesterday that's partially stale, partially relevant. Where do you start?

This is a context recovery and session handoff problem. Every context switch (between sessions, between tasks, between domains) has a cost. The system should minimize that cost to near-zero.

### What it feels like

"Where was I? What's changed since I last looked? What's the highest-leverage thing to do right now? I don't want to spend 30 minutes re-loading my own context before I can be productive."

### What's already in place

- DJ7 (Preserve domain expertise) establishes domain state as living documents
- Domain CONTEXT.md files capture current focus, open threads, and last synced dates
- `wf-reflect` captures end-of-session state
- The experience layer's "first day" design (welcome back, here's what changed, here's your options) describes the UX goal

### What's missing

A **session protocol** — a concrete workflow for: "Begin a work session." The protocol would:

1. Surface what changed since your last session (commits, PRs, agent activity, observation patterns)
2. Show your active threads and where each one paused
3. Recommend a session focus based on priority, momentum, and energy
4. Pre-load the relevant domain contexts so you start at full speed
5. At session end, capture state so the next session can pick up seamlessly

This is the companion's most basic function — but it needs to work even before the companion is built, as a workflow that humans and basic AI can follow.

## Problem 4: The Tribal Knowledge Problem

### What it is

You're building a system designed to eliminate tribal knowledge. But Syntropy itself still has tribal knowledge — it lives in your head, in Claude conversation transcripts, in the gap between "what the docs say" and "what Christian actually means."

Someone new (human or AI) should be able to start at AGENTS.md, follow the graph, and understand not just *what* the system is but *why* every decision was made, *what alternatives were considered*, and *what the intent behind each pattern is*. Right now, the repo captures the *what* well. The *why* is partially in ADRs, partially in doc prose, and partially in conversations that haven't been integrated.

### What it feels like

"If I got hit by a bus, could someone reconstruct the reasoning? Could an AI agent operate with the right *intent*, not just the right *instructions*? Am I the single point of failure for the philosophy?"

### What's already in place

- DJ3 (Traceable decisions) and DJ11 (Reasoning graph) establish the principle
- ADRs capture major technical decisions
- The manifesto, principles, and vision docs capture high-level philosophy
- The experience layer docs capture the design philosophy for the experience architecture
- `wf-record-decision` provides the mechanics

### What's missing

A **decision density threshold** — ensuring that the ratio of "decisions made" to "decisions documented" stays high. Every time you make a choice ("Pattern Journals not Skill Trees," "Dog Park not Bond Model," "Apprenticeship not Tutoring"), that choice and its reasoning should be captured. Not as a heavyweight ADR necessarily — but as a lightweight decision record that preserves the *why*.

Also missing: a **philosophy sync** mechanism. When the high-level philosophy evolves, there should be a traceable path from "the philosophy says X" to "therefore this agent behaves like Y" to "therefore this workflow does Z." Intent should be as traceable as code dependencies.

## Problem 5: The Force Multiplier Problem

### What it is

You want to multiply yourself. Not just delegate tasks, but enable others (humans and AI agents) to operate with your *judgment* — to make the decisions you would make, for the reasons you would make them, without having to ask you.

This is different from documentation. Documentation tells you *what to do*. Force multiplication enables you to *think the way the system needs you to think*. It's the difference between a manual and a mentor.

### What it feels like

"I want to give an AI agent a domain and have it make decisions I'd agree with 90% of the time — not because it memorized my preferences, but because it understands the principles well enough to reason from them. And I want a human collaborator to read the repo and immediately know how to contribute without asking me."

### What's already in place

- The system of work (agents, domains, workflows) is the structural answer
- DJ2 (Same processes for humans and AI) establishes the principle
- DJ13 (Design processes for the actor) handles actor-appropriate execution
- Domain AGENT.md, CONTEXT.md, POLICY.md, OWNER.md provide the per-domain brain
- Base traits provide inherited behaviors

### What's missing

A **first principles propagation** system — where the core principles aren't just documented at the top level but are *operationalized* at every layer. Each domain policy should trace back to which principles it embodies. Each workflow should articulate which principles govern its design. Each agent should be able to explain *why* it behaves the way it does, referencing the principles.

Also missing: a **calibration loop**. How do you know if an agent is making decisions you'd agree with? There should be a lightweight mechanism for reviewing agent decisions, providing corrections, and having those corrections trace back to principle refinements.

## The Coherence Engine (Synthesis)

These five problems and their seven associated jobs (DJ15–DJ21) describe a **coherence engine** — the heartbeat that keeps Syntropy alive as it grows. It's the immune system, the nervous system, and the circulatory system of Syntropy's body.

The coherence engine has three modes:

### Passive Monitoring

Continuously watching for semantic drift, orphaned decisions, stale contexts, and structural inconsistencies. Running in the background. Surfacing issues when detected.

### Active Integration

When triggered by an insight or change, actively tracing implications, generating changesets, and presenting them for review. Doing the integration work so the human reviews quality rather than completeness.

### Session Management

At every session boundary (start, pause, resume, end), capturing state and recovering context so transitions are seamless.

## Implementation Path

This doesn't need to be built all at once. The phases:

**Phase 0 (Now):** Codify the session protocol as a workflow. `wf-begin-session` and `wf-end-session` that a human or AI can follow today, manually. This solves the Tuesday Morning Problem immediately.

**Phase 1 (Next):** Build `syntropy coherence` as a CLI command that does structural + basic semantic validation. Check if domain contexts reference concepts that have been renamed. Check if agent policies contradict current principles.

**Phase 2 (Soon):** Build the integration assistant — describe an insight, get a changeset. This is the capture gap solved.

**Phase 3 (Later):** Build the bird's eye dashboard. Live view of system state, drift detection, thread status.

**Phase 4 (Eventually):** Build the calibration loop. Agent decisions reviewed, corrections traced to principle refinements, the system that improves the system.

## Relationship to Existing Systems

The coherence engine sits at a unique intersection in the system:

| Problem | Extends | Fills Gap In |
|---------|---------|-------------|
| Capture Gap | DJ1, DJ8 | The gap between "signal captured" and "signal integrated everywhere" |
| Semantic Drift | WJ3, DJ6 | Only structural coherence is validated today, not semantic |
| Session Recovery | DJ7 | Domain state exists but session-level state and handoff don't |
| Tribal Knowledge | DJ3, DJ11 | Decisions are recorded but not chained principle → design → implementation |
| Force Multiplication | DJ2, DJ13 | Processes are executable but *reasoning* isn't transferable |

The coherence engine doesn't replace the existing DJ and WJ sets — it's a **new axis**. The existing jobs describe what the platforms do for contributors. The coherence jobs (DJ15–DJ21) describe what keeps the *system itself* coherent as it grows.
