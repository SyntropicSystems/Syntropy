---
id: "arch-agent-architecture"
type: architecture
title: "Heterogeneous Agent Architecture"
status: defining
owner: architecture-agent
created: 2026-02-22
updated: 2026-02-22
refs:
  related: [arch-ai-pipeline, f04, f10, dp02, dp15, principles, manifesto, wf-create-agent]
  decided-by: []
tags: [architecture, agents, foundational, heterogeneous, internal-components]
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

To avoid the ambiguity of the word "Agent," the platform uses the following modifiers to describe the three pillars of the architecture. Every actor in the system is one of these three types. Each type shares the same [9 Internal Components](#the-9-internal-components) but fills them differently based on its nature.

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

## The 9 Internal Components

Every agent — regardless of type — is composed of nine internal components. These components are defined by their **job**, not by how they are implemented. A junior designer and a senior engineer can both look at this list and immediately understand why an actor did what it did.

### Universal Job Descriptions

Before splitting by actor type, here is what each component means at a conceptual level for **any** entity in the system:

| Component | The Job | One-Line Role |
|-----------|---------|---------------|
| **Capabilities** | The Potential | What the actor is fundamentally able to perceive or do |
| **Attributes** | The Boundaries | The absolute, measurable limits of those capabilities — how fast, how far, how much |
| **Skills** | The Tools | Specific, actionable tasks the actor knows how to execute to affect the world |
| **Memory** | The History | The storage of past experiences, knowledge, and rules used to inform future choices |
| **Internal Context** | The Attention | The immediate, active awareness of the present situation — what the actor is focused on right now |
| **Internal State** | The Mindset / Posture | The actor's current operating mode or condition, which dictates how it reacts to the context |
| **Traits** | The Disposition | Innate, persistent biases that flavor decision-making without changing the actual rules |
| **Policies** | The Mission | The overarching goals or behavioral guidelines the actor is trying to achieve |
| **Workflows** | The Procedure | The step-by-step logical process used to apply skills to solve a problem |

These nine components are intentionally free of implementation jargon. They describe **function and purpose**, never plumbing. A "Memory" is not a "RAG pipeline" or a "vector database" — it is the history the actor draws on to make decisions. A "Skill" is not an "API endpoint" — it is a task the actor knows how to do. This vocabulary is designed so that every contributor — product, design, engineering, QA — shares one language when reasoning about any actor in the system.

### Components by Actor Type

#### Organic Agent (The Human)

**Job:** To provide creative, intuitive, and high-level strategic direction, driven by human motivation.

| Component | In Practice |
|-----------|------------|
| **Capabilities** | The physical ability to see the screen, hear the audio, and manipulate the input device |
| **Attributes** | Human physical and mental limits — actual reaction time, susceptibility to fatigue, maximum attention span |
| **Skills** | Acquired player/user mechanics — the ability to navigate the interface quickly, communicate clearly, make judgment calls |
| **Memory** | Lived experiences, domain knowledge, recall of past interactions ("This pattern tricked me last time") |
| **Internal Context** | Whatever specific part of the system the human is actively looking at or focusing on in this exact moment (meaning they might be blind to something right next to them) |
| **Internal State** | Physiological and emotional condition — panicked, fully focused/in the zone, exhausted, frustrated, calm |
| **Traits** | Natural interaction style or personality — inherently cautious, a delegator, a micromanager, a power user |
| **Policies** | Personal motivations for using the system right now — "I want to clear my inbox," "I just want to check one thing," "I'm training the AI" |
| **Workflows** | Mental routines and practiced tactics — "Check email, triage cards, review AI suggestions, archive done items" |

#### Probabilistic Agent (The AI)

**Job:** To dynamically interpret the world, adapt to unpredictable human behavior, and make logical, context-aware decisions.

| Component | In Practice |
|-----------|------------|
| **Capabilities** | The ability to "read" complex situations, recognize patterns, and generate organic-feeling responses |
| **Attributes** | The strict limits on how much information it can juggle at one time, and how long it takes to "think" before acting |
| **Skills** | The specific in-system actions it has been trained to perform — classifying an email, suggesting a priority, generating a summary, identifying a dependency |
| **Memory** | The accumulated database of past events and training history it references to understand what is happening |
| **Internal Context** | The exact slice of current situational data it has successfully processed and is using to make its very next decision |
| **Internal State** | Its current phase of cognitive processing — assessing a situation, formulating a plan, generating output, awaiting validation |
| **Traits** | Its programmed personality biases — designed to act conservatively, aggressively, or balanced for a given domain |
| **Policies** | The core directives it is instructed to prioritize above all else — "Reduce the user's cognitive load, even if it means doing more work yourself" |
| **Workflows** | The logical sequence it follows to evaluate a problem, weigh the options, and decide on an outcome |

#### Deterministic Agent (The Machine)

**Job:** To flawlessly and instantly enforce the rules of the world, manage the math, and execute absolute commands without deviation.

| Component | In Practice |
|-----------|------------|
| **Capabilities** | The ability to execute precise, rule-based logic and manipulate system math instantly |
| **Attributes** | The hard limits of the system — how many times per second it updates, max value caps, rate limits |
| **Skills** | The literal, unbending functions it runs to keep the system working — spawning an event, computing a score, validating a schema, enforcing a security rule |
| **Memory** | The stored data and variables it references to maintain the system's continuity — event logs, materialized views, configuration |
| **Internal Context** | The specific set of active variables it is evaluating in this exact millisecond to determine if a rule has been met |
| **Internal State** | Its literal, programmed condition at any given moment — "Processing," "Waiting," "Error," "Complete" |
| **Traits** | The static baseline numbers assigned to it — its timeout is 5s, its retry count is 3, its priority weight is 0.8 |
| **Policies** | N/A — a Deterministic Agent has no goals, motivations, or guidelines to interpret. It only has absolute commands it must blindly follow |
| **Workflows** | The strict, unchanging sequence of "if this happens, then do that" logic |

### Why This Matters

By framing every actor through the same nine components, the system achieves three things:

1. **Shared vocabulary across disciplines.** A product designer, a backend engineer, and a QA tester all use the same words to describe why an actor behaved the way it did. No one needs to translate between "technical" and "non-technical" language.

2. **Composable reasoning about any interaction.** When two agents collaborate (e.g., a Probabilistic Agent suggests an action and a Deterministic Agent validates it), you can trace the interaction component by component: the Probabilistic Agent's Internal Context informed its Skills, which produced output that became the Deterministic Agent's Internal Context for its Workflows.

3. **Systematic debugging.** When something goes wrong, you can ask: Was it a Capabilities problem (the actor couldn't perceive the input)? A Memory problem (it lacked the history to make a good call)? An Internal State problem (it was in the wrong mode)? A Policies problem (it was optimizing for the wrong goal)? This framework turns vague "the AI got it wrong" into precise "the Probabilistic Agent's Internal Context lacked the thread history (Memory gap), so its Skills produced a low-confidence classification."

## Decision Profile

A Decision Profile characterizes how an agent processes logic, not what the agent is made of. It is the meta-layer that sits *above* the 9 Internal Components — it describes the *pattern* by which those components interact. It captures:

- **Logic engine type**: biological, probabilistic, or deterministic
- **Latency characteristics**: how fast can this agent respond? (an Attribute boundary)
- **Reliability envelope**: under what conditions is this agent's output trustworthy? (derived from Capabilities + Skills + Memory)
- **Failure mode**: how does this agent fail? (fatigue = Organic Internal State; hallucination = Probabilistic Traits; edge case crash = Deterministic Capabilities gap)
- **Adaptability**: can this agent handle novel situations outside its training/programming? (a function of Memory depth + Capabilities breadth)
- **Cost**: what resources does this agent consume per invocation? (an Attribute boundary)

Decision Profiles enable the system to make principled routing decisions: which agent should handle this task, and what validation should wrap its output? The 9 Internal Components provide the *detail* of what an agent is; the Decision Profile provides the *summary* of how it behaves.

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

| System Component | Agent Type | Primary Components at Work | Rationale |
|-----------------|------------|---------------------------|-----------|
| Human user | Organic | Policies (goals), Skills (corrections), Memory (past experience) | Sets goals, resolves ambiguity, trains the system |
| Claude LLM (AI Pipeline) | Probabilistic | Skills (classify, summarize), Internal Context (prompt window), Memory (training data) | Interprets intent, classifies cards, generates suggestions |
| Domain Agents (Email, Finance, Home) | Probabilistic | Traits (domain personality), Policies (domain directives), Skills (domain-specific actions) | Specialized LLM prompts for domain interpretation |
| Confidence Scoring | Deterministic | Skills (threshold math), Workflows (if score > X then Y) | Mathematical threshold comparison |
| Event Sourcing (Firestore) | Deterministic | Memory (the canonical event log), Skills (append, replay) | Append-only log, immutable events, derived state |
| Security Rules (Firestore) | Deterministic | Workflows (rule enforcement), Attributes (auth boundaries) | Auth enforcement, data isolation |
| Materialized Views | Deterministic | Skills (projection computation), Memory (derived state cache) | Computed projections from event log |
| Cloud Function routing | Deterministic | Internal Context (event payload), Workflows (routing rules) | Rule-based event routing, schema validation |
| Queue ordering | Deterministic | Skills (sort algorithm), Attributes (max queue depth) | Priority algorithm, dependency resolution |
| Learning Loop | Mixed | Organic Memory (corrections) → Deterministic Skills (storage) → Probabilistic Memory (model update) | Pattern detection + correction storage |

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

1. **Every feature involves all three agent types.** A feature like Email Triage has: the human setting Policies (Organic), the LLM applying Skills to classify emails (Probabilistic), and the routing Workflows enforcing thresholds (Deterministic). Design for all three, not just the AI.

2. **Confidence thresholds are the trust API.** The confidence system is not just a UX feature — it is the formal mechanism by which the system calibrates the Boundary of Trust between Probabilistic and Organic agents. In component terms: the Deterministic Agent's Skills (threshold math) gate the Probabilistic Agent's output before it reaches the Organic Agent's Internal Context.

3. **Transparency serves the First-Class Citizen principle.** When the system shows confidence scores, audit trails, and AI reasoning, it is feeding the Organic Agent's Internal Context — enabling them to exercise their authority role effectively.

4. **Design features in terms of components, not implementations.** When specifying a feature, describe what Memory, Skills, Policies, and Workflows each agent type uses — not what database or API powers them. This keeps specs accessible to every discipline.

### For Technical Architecture

1. **Events are the universal bus.** Every agent type produces and consumes the same event types. This is non-negotiable — it is what makes heterogeneous collaboration possible. Events are the bridge between one agent's Skills output and another agent's Internal Context input.

2. **Deterministic validation wraps Probabilistic output.** Never let a Probabilistic Agent directly mutate system state. Its Skills produce output that passes through Deterministic Workflows (validation) before becoming system Memory (truth).

3. **Design for graceful degradation from day one.** Every Probabilistic Agent path must have a Deterministic fallback. Every Deterministic dead-end must have an escalation path. Degradation follows the Internal State transitions: when a Probabilistic Agent's Internal State shifts to "low confidence," its Workflows hand off to the next agent in the chain.

### For Dev Platform / Process Design

1. **Workflows are agent-agnostic by default.** A well-designed workflow should be executable by any agent type — the Decision Profile determines *how* the agent applies its Skills to the workflow steps, not *whether* it can.

2. **Actor-aware design uses the 9 components.** When a workflow needs actor-specific adaptation, reason about *which component* differs between actors. Does the Organic Agent have different Attributes (attention span)? Does the Probabilistic Agent have different Memory (context window)? Does the Deterministic Agent have different Capabilities (can it parse this input type)? The components tell you where to adapt.

3. **The meta-agent routes by capability, not by type.** Routing decisions should consider what Decision Profile is best suited for the task — specifically, which agent's Capabilities, Skills, and Attributes best match the task requirements.

## Relationship to Existing Principles

This architecture formalizes and extends several existing Syntropy OS principles:

| Existing Principle | How This Architecture Extends It | Components Involved |
|-------------------|----------------------------------|---------------------|
| **Confidence-Based Handoff** (#2) | Formalized as the Boundary of Trust between Probabilistic and Organic agents | Probabilistic Skills → Deterministic Skills (scoring) → Organic Internal Context |
| **Event-Sourced Everything** (#5) | Events become the Universal I/O — the shared language between all agent types | All agents' Memory is grounded in the same event log |
| **Transparency Over Magic** (#6) | Transparency enables Organic Agents to exercise their authority role in the trust hierarchy | Feeds the Organic Agent's Internal Context with AI reasoning |
| **Progressive Autonomy** (#7) | Formalized as the trust calibration between Organic and Probabilistic agents over time | Organic Policies shift as Probabilistic Memory improves |
| **Corrections as Training Data** (#10) | Organic Agent corrections improve Probabilistic Agent Decision Profiles | Organic Skills (corrections) → Probabilistic Memory (learning) |
| **First-Class Citizen** (#11) | All agent types share equal systemic privileges and the same 9 Internal Components | The component framework itself — one vocabulary for all |

## Open Questions

- [ ] How should the system handle hybrid agents that combine Probabilistic and Deterministic logic (e.g., an LLM call with post-processing validation)? Which set of 9 components applies — or do they compose?
- [ ] Should Decision Profiles be versioned as agent capabilities change (e.g., new model version with different Attributes and Skills)?
- [ ] How does the Boundary of Trust interact with multi-agent collaboration (e.g., two Probabilistic Agents with conflicting Policies)?
- [ ] What is the formal escalation protocol when Graceful Degradation cascades through all three agent types?
- [ ] Should the 9 Internal Components be formally schema-defined (e.g., in `syntropy.toml` or a future agent manifest format) so that tooling can reason about component gaps and mismatches?
- [ ] How should Deterministic Agent "Policies: N/A" be handled in tooling — should it be explicitly absent, or should Deterministic Agents have a degenerate Policies component that is always "execute commands"?
