---
id: "dp15"
type: feature-spec
title: "Operational Engineering"
status: defining
owner: operational-engineering-agent
priority: P1
created: 2025-02-13
updated: 2025-02-13
refs:
  decided-by: []
  depends-on: [dp02, dp03, dp10, jtbd-dev-platform]
  enables: [dp-u16, dp-u17]
  related: [dp-stories, dp09, dp12, dp14, dp16, observations-agent, operational-engineering-agent, pulse-companion-agent]
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
- When a workflow fails, the diagnosis is ad hoc — no systematic way to identify whether the problem is the process design, the actor's capabilities, or a context gap
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

Methodology for configuring agent context (manifests, always/on-demand/reference tiers) for effectiveness:

- **Context budget**: How much context is optimal for different actor types and task complexities
- **Tier design**: What belongs in "always" vs. "on demand" vs. "reference" — principles, not just conventions
- **Relevance over completeness**: How to select context that enables the task without overwhelming the actor
- **Cross-domain context**: How much neighboring domain context an agent needs vs. what creates noise

### C4 — Actor Capability Modeling

Understanding different actors' strengths, limitations, and optimal instruction patterns:

- **Actor taxonomy**: Characterizing actor types (Opus, Sonnet, Haiku, different AI providers, human experience levels)
- **Failure mode mapping**: What goes wrong for each actor type (skip-ahead, context loss, rule drift, over-interpretation)
- **Optimal patterns**: What instruction styles work best for each actor type (explicit vs. inferential, structured vs. flexible)
- **Adaptation strategies**: When to write actor-specific process variants vs. when a single process can work universally

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
