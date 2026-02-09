---
id: "jtbd-dev-platform"
type: vision
title: "Dev Platform — Jobs to Be Done"
status: active
owner: meta-agent
created: 2025-02-09
updated: 2025-02-09
refs:
  depends-on: [manifesto]
  enables: [dp01, dp02, dp03, dp04, dp05, dp06, dp07, dp08, dp09, dp10, dp11, dp12]
  related: [jtbd, principles, surf-dev-platform]
tags: [vision, motivation, jtbd, dev-platform, meta]
---

# Dev Platform — Jobs to Be Done

The ten core jobs that the development platform exists to fulfill. Every dev platform feature must trace back to at least one job. These are parallel to the application's J1–J7 but serve the builders instead of end users.

## DJ1 — Maintain a Single Source of Truth for All Product Knowledge

**When** product knowledge is scattered across conversations, documents, and people's heads, **I want** a structured system where every concept has one canonical file with explicit cross-references **so that** anyone (human or AI) can find the authoritative definition of anything without ambiguity or duplication.

## DJ2 — Enable Humans and AI Agents to Execute the Same Processes

**When** a task needs to be done (add a feature, make a decision, resolve a question), **I want** executable workflow documents that work identically whether a human or AI agent follows them **so that** the process is consistent, repeatable, and not dependent on tribal knowledge.

## DJ3 — Keep Decisions Traceable and Reversible

**When** a design or architecture decision is made, **I want** it logged as an ADR with context, rationale, alternatives, and consequences, and all affected documents updated **so that** future contributors can understand why things are the way they are and make informed decisions about changing them.

## DJ4 — Scale Development Complexity Without Restructuring

**When** the product grows in scope (new features, new domains, new integrations), **I want** to add nodes and edges to the knowledge graph without reorganizing existing structure **so that** growth is additive and the system remains navigable at any scale.

## DJ5 — Reduce Friction When Adding, Finding, or Changing Product Specs

**When** I need to add a new feature spec, find an existing use case, or update a decision, **I want** clear entry points, consistent navigation patterns, and standardized templates **so that** the mechanical overhead of documentation is minimal and I can focus on the content.

## DJ6 — Ensure Consistency Across All Documentation

**When** multiple contributors (humans and AI agents) are working on documentation simultaneously, **I want** enforced conventions (frontmatter, naming, cross-references, status lifecycles) **so that** every document follows the same structure and the knowledge graph maintains its integrity.

## DJ7 — Preserve Domain Expertise and Enable Fast Context Recovery

**When** work in a domain pauses (context switch, session end, handoff to another contributor) or when I need to multiply myself by delegating to domain experts, **I want** each domain's current understanding preserved as living state (not just file lists but what's active, what decisions govern it, what invariants hold, what's unresolved) **so that** anyone (human or AI) can spin up in a domain instantly, no expertise is lost between sessions, and domain experts can independently audit and maintain their territory.

## DJ8 — Capture and Surface Emergent Signals from All Contributors

**When** anyone working on the system notices a friction, bug, idea, question, anxiety, pattern, need, or any other signal, **I want** a zero-barrier way to capture that observation in the moment — with as much or as little structure as they can provide — and have those signals periodically audited for patterns, structured retroactively where needed, and promoted to actionable items when the signal is strong enough, **so that** the system grows and evolves organically by emergence, no insight is lost, everyone contributes to collective intelligence just by sharing what they notice, and contributors are continuously upleveled to become more effective observers without creating dependency or learned helplessness.

## DJ9 — Enable Continuous Self-Improvement Through Honest Reflection

**When** I finish a piece of work (a feature inception, a spec review, a debugging session, an audit), **I want** a lightweight practice that prompts me to pause and genuinely notice my personal experience — what worked for me, what was hard, where I got stuck, what felt effective, what I'd need next time — without requiring me to design solutions or think about what others should do, **so that** I continuously develop self-awareness about my own effectiveness, my reflections feed the observation system as honest signals that surface patterns across contributors, and the whole system improves organically because everyone is simply noticing and sharing their actual experience.

## DJ10 — Support Each Contributor with a Personalized Work Companion

**When** I'm reflecting on my work or trying to understand my own patterns and effectiveness, **I want** a personalized companion that knows my work context — what I committed, what I struggled with, what I've been noticing — and asks me the right questions to help me articulate and reflect more deeply, **so that** my reflections are richer and more specific than they'd be alone, I develop deeper self-awareness through guided introspection, and the companion grows over time into a genuine work ally that supports my effectiveness while also collaborating across contributors to surface collective signals that help the whole system evolve.
