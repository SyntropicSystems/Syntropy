---
id: "dp14"
type: feature-spec
title: "Cognitive Engineering"
status: defining
owner: cognitive-engineering-agent
priority: P1
created: 2025-02-13
updated: 2025-02-13
refs:
  decided-by: []
  depends-on: [dp02, dp09, dp10, jtbd-dev-platform]
  enables: [dp-u14, dp-u15]
  related: [cognitive-engineering-agent, dp-stories, dp03, dp11, dp12, dp13, dp15, observations-agent]
tags: [dev-platform, cognitive-engineering, comprehension, information-architecture]
---

# DP14 — Cognitive Engineering

## Summary

A methodology system that defines how information — code reviews, change summaries, architecture explanations, learning briefs, decision reports — should be structured so that humans and agents can comprehend it effectively. Owned by the cognitive-engineering-agent, this feature provides the templates, progressive disclosure patterns, chunking strategies, and feedback-driven improvement loops that all other agents and contributors use when communicating knowledge.

## Problem

In a system where unlimited AI agents can be spawned, execution is no longer the bottleneck — **comprehension is**. More agents producing more output creates more noise unless the output is structured for the reader's actual cognitive needs. Today:

- Code reviews list changes but don't prioritize what the reader needs to understand vs. skim
- Architecture explanations assume the reader's context level rather than adapting to it
- Change summaries describe *what* without highlighting *why it matters* or *what to verify*
- The human orchestrator drowns in information rather than being empowered by it
- Different people absorb information differently, but all output follows one format
- Agents producing reports don't have principled guidance on information structure
- Knowledge transfer is ad hoc — no methodology for helping someone genuinely understand a subsystem

## Core Capabilities

### C1 — Review Templates

Structured templates for code reviews and change reviews that use progressive disclosure:

- **Headline**: One sentence — what changed and why it matters
- **Impact summary**: What's affected, what risks exist, what the reviewer should focus on
- **Change walkthrough**: Structured by concern (not by file), with annotations on intent
- **Deep dive sections**: For areas that need genuine understanding, not just approval
- **Verification checklist**: What the reviewer should specifically validate

### C2 — Learning Briefs

Templates for helping someone understand a subsystem, domain, or significant change:

- **Context frame**: Where this fits in the bigger picture
- **Mental model**: The key concepts and their relationships (the "shape" of the thing)
- **Critical paths**: What matters most — the 20% that explains 80%
- **Common misconceptions**: What people typically get wrong
- **Exploration guide**: Where to go deeper, in what order

### C3 — Knowledge Compression Methodology

Principles and patterns for reducing cognitive load without losing essential information:

- **Chunking strategies**: How to group related information into digestible units
- **Abstraction layering**: When to summarize vs. when to show detail
- **Signal-to-noise optimization**: Identifying what's essential vs. reference
- **Contextual framing**: Presenting information relative to what the reader already knows

### C4 — Feedback-Driven Evolution

The system learns from how well its methodologies work:

- **Consumer feedback capture**: Did this review/brief actually help you understand?
- **Pattern detection**: Which templates and structures consistently work? Which don't?
- **A/B methodology**: Trying variations and measuring comprehension outcomes
- **Collective learning**: Aggregating feedback across contributors to improve templates

### C5 — Cognitive Adaptation (Future)

Progressive personalization of information delivery:

- **General methodology**: One solid approach that works for most people (Phase 1)
- **Archetype adaptation**: 2–4 cognitive archetypes with adapted presentation styles (Phase 2)
- **Individual profiles**: Per-contributor adaptation based on observed patterns (Phase 3)
- **Companion integration**: Pulse companion applies cognitive methodology personalized to its contributor

## How It Works

1. **Agent or human needs to communicate knowledge** (review, report, brief, summary)
2. **Consults cognitive-engineering-agent** for the appropriate template and methodology
3. **Produces the artifact** using the template's progressive disclosure structure
4. **Consumer provides feedback** (explicit rating or implicit signal via observation system)
5. **Cognitive-engineering-agent evolves methodology** based on aggregated feedback
6. **Over time**: methodology specializes for different contributor types and contexts

## Integration Points

- **All domain agents** use review templates during `wf-domain-review`
- **Meta-agent** uses report templates for cross-domain coordination summaries
- **Pulse-companion-agent** requests methodology guidance for personalized delivery
- **Observations-agent** captures feedback signals about methodology effectiveness
- **Decisions-agent** uses decision communication templates for presenting reasoning
- **Architecture-agent** uses learning briefs for architecture onboarding

## Phases

### Phase 1 — Foundation Templates
- Code review / change review template with progressive disclosure
- Architecture comprehension brief template
- Feedback capture mechanism (lightweight, via observations)
- General methodology documentation

### Phase 2 — Feedback Loops
- Systematic feedback collection on template effectiveness
- Pattern analysis on what structures work for which contexts
- First methodology iterations based on actual usage data
- 2–4 cognitive archetypes identified from feedback patterns

### Phase 3 — Personalization
- Per-contributor cognitive profiles (with consent)
- Companion integration — methodology adapted per individual
- Archetype-based template variants
- Individual and collective feedback loop closure

## Jobs Addressed

- **DJ12** — Ensure Every Piece of Communicated Knowledge Is Structured for Actual Comprehension

## Success Metrics

- Contributors report that reviews help them understand changes (not just list them)
- Time to comprehend a change decreases while comprehension depth increases
- New contributors can understand subsystems faster using learning briefs
- Methodology evolves measurably based on feedback (not static templates)
- Different contributors receive appropriately adapted information structures (Phase 3)
