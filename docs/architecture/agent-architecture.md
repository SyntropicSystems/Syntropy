---
id: "arch-agent-architecture"
type: architecture
title: "Heterogeneous Agent Architecture"
status: defining
owner: architecture-agent
created: 2026-02-22
updated: 2026-02-22
refs:
  related: [arch-ai-pipeline, f04, f10, dp02, dp15, principles, manifesto]
  decided-by: []
tags: [architecture, agents, foundational, heterogeneous]
---

# Heterogeneous Agent Architecture

## Overview

The Heterogeneous Agent Architecture is a foundational specification for Syntropy OS. It establishes that **all participants in the system — humans, AI models, and hardcoded programs — are Agents**, sharing the same systemic privileges and interacting through a universal interface. Agents are not defined by what they are (biological, neural net, or compiled code), but by their **Decision Profile** — how they process logic to arrive at a conclusion.

This architecture provides the shared vocabulary and formal boundaries that prevent ambiguity when designing, building, and reasoning about the system. It ensures that every component — from a user tapping a button, to an LLM interpreting natural language, to a Cloud Function enforcing business rules — is understood through the same lens.

## Core Philosophy: The First-Class Citizen Principle

In this system, humans, AI, and hardcoded machine code are all treated as Agents. An agent is the universal container — a first-class citizen that shares the exact same systemic privileges:

- **Observe** the environment (receive inputs, read state)
- **Process** state data (apply their logic engine)
- **Execute** actions (produce outputs, mutate state)

They are not defined by what they are (flesh, neural net, or compiled script), but by their **Decision Profile** — how they process logic to arrive at a conclusion.

This means:
- A human reviewing email is an agent observing, processing, and acting
- An LLM classifying that email is an agent observing, processing, and acting
- A Cloud Function routing that email by sender rules is an agent observing, processing, and acting

All three participate in the same system through the same interfaces. The architecture does not privilege one type over another — it respects each type's strengths and constrains each type's weaknesses.

## The Agent Taxonomy

To avoid the ambiguity of the word "Agent," the platform uses the following modifiers to describe the three pillars of the architecture. Every component in the system is one of these three types.

### Organic Agent

| Attribute | Description |
|-----------|-------------|
| **Logic Engine** | Biological / Intuitive |
| **Key Strength** | High-level strategy, moral judgment, creative leaps, empathy, contextual wisdom |
| **Key Constraint** | Slow latency, highly unpredictable, subject to fatigue, limited working memory |
| **Ideal Use Case** | Setting overarching goals, resolving complex ethical dilemmas, providing the "why" behind actions, final authority on ambiguous situations |

The human. Organic Agents bring irreplaceable capabilities: moral reasoning, creative insight, long-term vision, and the authority to define what "good" means. Their inputs are the highest-authority signals in the system, but they are also the most constrained by bandwidth and cognitive load — which is exactly why Syntropy OS exists.

### Probabilistic Agent

| Attribute | Description |
|-----------|-------------|
| **Logic Engine** | Machine Learning / AI (LLMs, neural networks, statistical models) |
| **Key Strength** | High adaptability, pattern recognition, natural language understanding, dynamic response to novel situations |
| **Key Constraint** | Black-box reasoning, prone to drift or hallucination, requires validation for high-stakes decisions |
| **Ideal Use Case** | Interpreting natural language, adapting to unexpected inputs, managing dynamic classification, generating suggestions, learning from corrections |

The AI. Probabilistic Agents excel at tasks that require flexibility, interpretation, and pattern matching. They handle the vast middle ground between rigid rules and human judgment. Their outputs carry **confidence scores** — the system's mechanism for calibrating how much autonomy to grant them.

### Deterministic Agent

| Attribute | Description |
|-----------|-------------|
| **Logic Engine** | Procedural Code / Rules (functions, scripts, rule engines, state machines) |
| **Key Strength** | 100% reliability, instant execution (zero latency), mathematically provable correctness |
| **Key Constraint** | Extreme rigidity; fails completely if an unprogrammed edge case occurs |
| **Ideal Use Case** | Enforcing business rules, computing derived state, validating data integrity, managing hard boundaries, event sourcing guarantees |

The machine. Deterministic Agents are the bedrock of system reliability. When the answer is knowable and the rules are complete, a Deterministic Agent should handle it — no LLM call needed, no human intervention required. They are the fastest, cheapest, and most reliable agents in the system.

## Decision Profile

A Decision Profile characterizes how an agent processes logic, not what the agent is made of. It captures:

- **Logic engine type**: biological, probabilistic, or deterministic
- **Latency characteristics**: how fast can this agent respond?
- **Reliability envelope**: under what conditions is this agent's output trustworthy?
- **Failure mode**: how does this agent fail? (fatigue, hallucination, edge case crash)
- **Adaptability**: can this agent handle novel situations outside its training/programming?
- **Cost**: what resources does this agent consume per invocation?

Decision Profiles enable the system to make principled routing decisions: which agent should handle this task, and what validation should wrap its output?

## Boundaries and Rules of Engagement

Because these agents possess completely different cognitive profiles, they must adhere to specific boundaries to ensure system stability.

### 1. Universal I/O

All agents must speak the same underlying system language. A Deterministic Agent's output must be readable by a Probabilistic Agent, and vice versa. No agent gets a "special" hidden API to interact with the system.

In Syntropy OS, this means:
- **Events** are the universal I/O format — every agent produces and consumes events
- **Event schemas** are typed, validated, and versioned — any agent can process any event
- **The event log** is the shared state — agents don't communicate through side channels

This directly extends the [Event-Sourced Everything](../vision/principles.md) principle: events are not just for audit trails, they are the universal language that makes heterogeneous agent collaboration possible.

### 2. The Boundary of Trust

Each agent type has a trust boundary defined by its Decision Profile:

- **Deterministic Agents** are trusted with **absolute truth**. They enforce invariants, compute derived state, validate schemas, and guarantee mathematical correctness. When a Deterministic Agent says the answer is X, the answer is X.

- **Probabilistic Agents** are trusted with **interpretation**, but never absolute state changes without validation. They classify, suggest, score confidence, and generate — but their outputs pass through Deterministic validation before becoming system truth. The **confidence threshold** (see [F10](../product/features/f10-confidence-thresholds.md)) is the mechanism that calibrates this trust boundary.

- **Organic Agents** are trusted with **ultimate authority** — they define goals, resolve ambiguity, and make moral judgments. But their inputs are still validated by Deterministic Agents to prevent rule-breaking (e.g., a human cannot bypass business rules that protect data integrity).

Trust flows in a specific pattern:
```
Organic Agent (authority) → defines intent
    ↓
Probabilistic Agent (interpretation) → translates intent to structured action
    ↓
Deterministic Agent (execution) → validates and executes with guarantees
    ↓
Event Log (universal truth) → immutable record for all agents
```

### 3. Graceful Degradation

The system must handle agent failure without cascading collapse:

- If a **Probabilistic Agent** encounters a scenario it cannot process (low confidence, out-of-distribution input, model failure), it must cleanly hand off to either:
  - A **Deterministic Agent** (hardcoded fallback loop), or
  - An **Organic Agent** (human intervention request)

- If a **Deterministic Agent** encounters an unprogrammed edge case, it must:
  - Reject the input with a clear error (not silently produce wrong output)
  - Escalate to a Probabilistic or Organic Agent if the situation requires interpretation

- If an **Organic Agent** is unavailable (offline, unresponsive), the system must:
  - Queue the decision for later
  - Continue operating on tasks within the combined authority of Probabilistic and Deterministic agents
  - Never block the entire system on a single human decision

This maps directly to the existing [Confidence-Based Handoff](../vision/principles.md) principle: the degradation path follows the confidence gradient.

## Mapping to Syntropy OS Components

### Current System Mapping

| System Component | Agent Type | Rationale |
|-----------------|------------|-----------|
| Human user | Organic | Sets goals, resolves ambiguity, trains the system |
| Claude LLM (AI Pipeline) | Probabilistic | Interprets intent, classifies cards, generates suggestions |
| Domain Agents (Email, Finance, Home) | Probabilistic | Specialized LLM prompts for domain interpretation |
| Confidence Scoring | Deterministic | Mathematical threshold comparison |
| Event Sourcing (Firestore) | Deterministic | Append-only log, immutable events, derived state |
| Security Rules (Firestore) | Deterministic | Auth enforcement, data isolation |
| Materialized Views | Deterministic | Computed projections from event log |
| Cloud Function routing | Deterministic | Rule-based event routing, schema validation |
| Queue ordering | Deterministic | Priority algorithm, dependency resolution |
| Learning Loop | Mixed | Probabilistic (pattern detection) + Deterministic (correction storage) |

### Architecture Agent System Mapping

The dev platform's trait-based agent composition (see [DP02](../product/dev-platform/features/dp02-agent-system.md)) maps to this taxonomy:

| Dev Platform Agent | Agent Type | Rationale |
|-------------------|------------|-----------|
| Human contributor | Organic | Executes workflows with judgment and creativity |
| AI model (Opus, Sonnet, Haiku) | Probabilistic | Executes workflows with pattern matching and adaptability |
| Validation engine (future) | Deterministic | Enforces conventions, schema rules, structural integrity |
| Workspace contract validation | Deterministic | Validates `syntropy.toml` against schema |

This taxonomy directly informs the Actor Capability Modeling capability in [DP15 Operational Engineering](../product/dev-platform/features/dp15-operational-engineering.md) — the Decision Profile is the formal basis for understanding how different actors process instructions differently.

## Design Implications

### For Product Design

1. **Every feature involves all three agent types.** A feature like Email Triage has: the human setting preferences (Organic), the LLM classifying emails (Probabilistic), and the routing rules enforcing thresholds (Deterministic). Design for all three, not just the AI.

2. **Confidence thresholds are the trust API.** The confidence system is not just a UX feature — it is the formal mechanism by which the system calibrates the Boundary of Trust between Probabilistic and Organic agents.

3. **Transparency serves the First-Class Citizen principle.** When the system shows confidence scores, audit trails, and AI reasoning, it is enabling Organic Agents to exercise their authority role effectively.

### For Technical Architecture

1. **Events are the universal bus.** Every agent type produces and consumes the same event types. This is non-negotiable — it is what makes heterogeneous collaboration possible.

2. **Deterministic validation wraps Probabilistic output.** Never let a Probabilistic Agent directly mutate system state. Its output is always a *suggestion* that passes through Deterministic validation before becoming truth.

3. **Design for graceful degradation from day one.** Every Probabilistic Agent path must have a Deterministic fallback. Every Deterministic dead-end must have an escalation path.

### For Dev Platform / Process Design

1. **Workflows are agent-agnostic by default.** A well-designed workflow should be executable by any agent type — the Decision Profile determines *how* the agent executes it, not *whether* it can.

2. **Actor-aware design uses Decision Profiles.** When a workflow needs actor-specific adaptation, the Decision Profile (not the agent's identity) determines the adaptation. This prevents coupling processes to specific models or people.

3. **The meta-agent routes by capability, not by type.** Routing decisions should consider what Decision Profile is best suited for the task, not whether the executor is human or AI.

## Relationship to Existing Principles

This architecture formalizes and extends several existing Syntropy OS principles:

| Existing Principle | How This Architecture Extends It |
|-------------------|----------------------------------|
| **Confidence-Based Handoff** (#2) | Formalized as the Boundary of Trust between Probabilistic and Organic agents |
| **Event-Sourced Everything** (#5) | Events become the Universal I/O — the shared language between all agent types |
| **Transparency Over Magic** (#6) | Transparency enables Organic Agents to exercise their authority role in the trust hierarchy |
| **Progressive Autonomy** (#7) | Formalized as the trust calibration between Organic and Probabilistic agents over time |
| **Corrections as Training Data** (#10) | Organic Agent corrections improve Probabilistic Agent Decision Profiles |
| **First-Class Citizen** (#11) | New. All agent types share equal systemic privileges |

## Open Questions

- [ ] How should the system handle hybrid agents that combine Probabilistic and Deterministic logic (e.g., an LLM call with post-processing validation)?
- [ ] Should Decision Profiles be versioned as agent capabilities change (e.g., new model version with different strengths)?
- [ ] How does the Boundary of Trust interact with multi-agent collaboration (e.g., two Probabilistic Agents disagreeing)?
- [ ] What is the formal escalation protocol when Graceful Degradation cascades through all three agent types?
