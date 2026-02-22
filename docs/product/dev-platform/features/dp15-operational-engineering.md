---
id: "dp15"
type: feature-spec
title: "Operational Engineering"
status: defining
owner: operational-engineering-agent
priority: P1
created: 2025-02-13
updated: 2026-02-22
refs:
  depends-on: [dp02, dp03, dp10]
  enables: [dp-u16, dp-u17]
  related: [dp14, dp12, dp09, arch-agent-architecture]
  decided-by: []
tags: [dev-platform, operational-engineering, process-design, actor-effectiveness]
---

# DP15 — Operational Engineering

## Summary

A methodology system that defines how workflows, rules, skills, context configurations, and agent manifests should be designed so that different actors — humans, different AI models (Opus, Sonnet, OpenAI, etc.), future contributors — can execute work effectively. Owned by the operational-engineering-agent, this feature provides the design principles, actor-awareness patterns, measurement practices, and feedback-driven improvement loops that make the system of work actually work for the actors inside it.

## Problem

Having a workflow engine (DP03) and an agent system (DP02) gives us the infrastructure for defining and executing work. But infrastructure alone doesn't ensure effectiveness. Today:

- Workflows are designed by the author's intuition, not by principled methodology for actor effectiveness
- A workflow that works for Opus may silently fail for Sonnet (different reasoning styles, context handling, step-following patterns)
- A workflow that works for an experienced contributor may confuse a newcomer (assumed context, implicit conventions)
- Agent manifests load context by convention, not by principled architecture (too much context degrades performance; too little creates gaps)
- Rules are listed but there's no methodology for writing rules that actors actually follow vs. silently ignore
- When a workflow fails, the diagnosis is ad hoc — no systematic way to identify whether the problem is a Workflows gap (process design), a Capabilities/Skills mismatch (wrong actor for the task), a Memory gap (missing background knowledge), or an Internal Context overflow (too much information for the actor's Attributes)
- Different AI models have different strengths, failure modes, and optimal instruction patterns, but all use the same workflow format
- No feedback loop exists to measure whether a process design actually works and evolve it based on evidence

## Core Capabilities

### C1 — Workflow Design Methodology

Principles and patterns for writing workflows that actors can follow correctly end-to-end:

- **Step clarity**: How to write steps that are unambiguous for both humans and different AI models
- **Checkpoint design**: Where to place validation points so failures are caught early, not at the end
- **Branching patterns**: When and how to handle conditional paths without losing actors
- **Scope calibration**: How to size workflows — too large creates context loss; too small creates coordination overhead
- **Error recovery**: How to design workflows that handle partial completion and interruption gracefully

### C2 — Rule Design Methodology

Principles for writing rules that are actually followed:

- **Actionable over aspirational**: Rules should describe specific behaviors, not abstract principles
- **Observable compliance**: A well-designed rule makes it possible to tell whether it's being followed
- **Conflict resolution**: How to design rules that don't contradict each other across domains
- **Priority signaling**: How to communicate which rules are critical vs. which are guidelines

### C3 — Context Architecture

Methodology for configuring agent context — specifically the relationship between an agent's **Memory** (background knowledge), **Internal Context** (active focus), and **Attributes** (capacity limits):

- **Context budget**: How much Memory to load into Internal Context, given the actor's Attributes. A Probabilistic Agent with a 200K token context window has different Attributes than one with 8K. An Organic Agent has different attention span Attributes in the morning vs. end of day.
- **Tier design**: What belongs in "always" (Memory that is always loaded into Internal Context) vs. "on demand" (Memory loaded when Skills require it) vs. "reference" (Memory available but not actively loaded) — principles, not just conventions.
- **Relevance over completeness**: How to select context that enables the task without overflowing the actor's Internal Context beyond its Attributes capacity.
- **Cross-domain context**: How much neighboring domain Memory an agent needs vs. what creates noise in its Internal Context.

### C4 — Actor Capability Modeling

Understanding different actors' strengths, limitations, and optimal instruction patterns. Grounded in the [Heterogeneous Agent Architecture](../../architecture/agent-architecture.md) taxonomy and the [9 Internal Components](../../architecture/agent-architecture.md#the-9-internal-components) framework. The Decision Profile provides the summary; the 9 Internal Components provide the detail for actor characterization.

- **Actor taxonomy**: Characterizing actor types using the 9 Internal Components — specifically, how their Capabilities, Attributes, Skills, and Memory differ. For example: Opus has broader Capabilities but higher Attributes cost than Haiku; a senior contributor has deeper Memory but the same Attributes limits as a junior.
- **Failure mode mapping by component**: What goes wrong for each actor type, traced to specific components. Skip-ahead = Workflows gap (missing steps). Context loss = Internal Context overflow (Attributes limit). Rule drift = Policies misunderstanding. Over-interpretation = Traits bias amplification. Hallucination = Memory gap + Skills overreach.
- **Optimal patterns by component**: What instruction styles work best, informed by which components the actor relies on. Actors with deep Memory need less explicit Workflows. Actors with narrow Attributes (limited context window) need compact Internal Context.
- **Adaptation strategies**: When to write actor-specific process variants vs. when a single process can work universally — decided by comparing which Internal Components differ between actor types for the task at hand.

### C5 — Process Effectiveness Measurement

Systematic approach to measuring whether processes work and improving them:

- **Execution outcome tracking**: Did the actor complete the process correctly? Where did it fail?
- **Feedback capture**: Lightweight signals from actors about process friction (via observation system)
- **A/B process testing**: Trying workflow variants and measuring which produces better outcomes
- **Regression detection**: Noticing when a previously effective process starts failing (new model version, changed context)

## How It Works

1. **Meta-agent designs a new workflow or agent** and consults operational-engineering-agent for methodology
2. **Operational-engineering-agent provides** design principles, patterns, and actor-awareness guidance
3. **Workflow or agent is created** using the methodology
4. **Actors execute the process** and provide feedback (explicit or via observation system)
5. **Operational-engineering-agent analyzes** execution outcomes and feedback patterns
6. **Methodology evolves** — design principles are refined, actor-specific adaptations are documented
7. **Over time**: different actors may receive adapted process variants tuned to their capabilities

## Integration Points

- **Meta-agent** consults when creating new workflows, agents, or modifying existing ones
- **All domain agents** benefit from improved workflow and rule design across the system
- **Cognitive-engineering-agent** — sibling: comprehension (how to present results) and execution (how to do the work) are complementary
- **Pulse-companion-agent** — translates process methodology into individual-specific adaptation
- **Observations-agent** — captures process effectiveness feedback signals
- **DP02 (Agent System)** — agent manifest design quality improves through context architecture methodology
- **DP03 (Workflow Engine)** — workflow design quality improves through execution methodology

## Phases

### Phase 1 — Design Principles
- Audit existing workflows for actor-effectiveness patterns
- Document initial workflow design principles (step clarity, checkpoint design, scope calibration)
- Document initial context architecture principles (context budget, tier design)
- Establish feedback capture for process effectiveness (via observations)

### Phase 2 — Actor Awareness
- Build initial actor capability taxonomy (Opus, Sonnet, human experience levels)
- Map common failure modes for each actor type
- First actor-specific workflow adaptations or annotation patterns
- Systematic measurement of process effectiveness across actor types

### Phase 3 — Personalization
- Per-contributor process adaptation (with consent)
- Companion integration — process methodology adapted per individual working style
- Cross-model workflow testing methodology
- Individual and collective feedback loop closure

## Jobs Addressed

- **DJ13** — Ensure Every Work Process Is Designed for the Actor Who Will Execute It

## Success Metrics

- Workflows are followed correctly end-to-end by different actor types (not just the author's mental model)
- Process failures are caught at checkpoints, not discovered after completion
- Agent manifests have principled context architecture (not just "load everything")
- Rules are measurably followed, not just listed
- Methodology evolves based on actual execution outcomes (not static design documents)
- Different actors can execute the same work effectively, possibly via adapted process variants
