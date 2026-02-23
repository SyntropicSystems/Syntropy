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
  enables: [dp-stories, dp01, dp02, dp03, dp04, dp05, dp06, dp07, dp08, dp09, dp10, dp11, dp12, dp13, dp14, dp15]
  related: [dp-product-index, jtbd, jtbd-repo-platform, jtbd-workspace-platform, principles, surf-dev-platform]
tags: [vision, motivation, jtbd, dev-platform, meta]
---

# Dev Platform — Jobs to Be Done

The thirteen core jobs that the development platform exists to fulfill. Every dev platform feature must trace back to at least one job. These are parallel to the application's J1–J7 but serve the builders instead of end users.

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

## DJ11 — Build a Reasoning Graph That Makes Every Decision Reproducible and Traceable

**When** decisions are made implicitly in conversations, lost in context switches, repeated because no one remembers why something was decided, or silently contradicted by newer choices, **I want** a system where every decision — from high-stakes architectural choices to everyday methodology picks — is captured as a lightweight record with its problem context, options explored, success metrics, and revisit triggers, organized as a navigable graph with hierarchy, domain scoping, and parent-child relationships, **so that** any contributor can understand the reasoning behind the current state of things, avoid repeating history, make informed decisions about changing what exists, reduce decision fatigue by building on what's already been thought through, and — taken together — the decision graph constitutes a reasoning trail that could reconstruct the system from scratch to its current state, even if the specific details would look different.

## DJ12 — Ensure Every Piece of Communicated Knowledge Is Structured for Actual Comprehension

**When** agents and humans produce reviews, reports, change summaries, architecture explanations, and learning materials — and these artifacts are consumed by orchestrators, reviewers, and newcomers who need to genuinely understand what happened, what matters, and what to verify — **I want** a principled methodology system that defines how information should be structured for cognitive effectiveness (progressive disclosure, lossless compression, chunking, contextual framing), with templates that evolve through feedback loops and progressively adapt to how different contributors best absorb information, **so that** the human orchestrator can quickly grasp what changed and why it matters without drowning in details, reviewers know exactly where to focus their attention and what to verify, newcomers can build accurate mental models of subsystems efficiently, the methodology continuously improves based on what actually helps people understand, and over time each contributor receives information structured for how their particular brain works best.

## DJ13 — Ensure Every Work Process Is Designed for the Actor Who Will Execute It

**When** workflows, rules, skills, and agent configurations are created for execution by different actors — humans with varying experience, Claude Opus with deep reasoning, Claude Sonnet with fast structured execution, other AI models with their own capabilities and failure modes — and these processes need to be followed correctly end-to-end without silent failures, missed steps, or degraded quality, **I want** a principled methodology system that defines how work processes should be designed for actor effectiveness (step clarity, checkpoint design, context architecture, rule actionability, scope calibration), with design principles that evolve through measured execution outcomes and feedback loops, and progressively adapt to how different actor types best execute work, **so that** workflows are followed correctly by all target actors (not just the author's mental model), failures are caught at checkpoints rather than discovered after completion, agent configurations load the right amount of context for their task and actor type, rules are specific enough to be followed rather than abstract enough to be ignored, and the system continuously improves its process design based on what actually works for each actor type.
