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
tags: [architecture, agents, foundational, heterogeneous, ontology]
---

# Heterogeneous Agent Architecture

## Overview

The Heterogeneous Agent Architecture is a foundational specification for Syntropy OS. It establishes that **all participants in the system — humans, AI models, and hardcoded programs — are Agents**, sharing the same systemic privileges and interacting through a universal interface. Agents are not defined by what they are (biological, neural net, or compiled code), but by their **Decision Profile** — how they process logic to arrive at a conclusion.

This architecture provides a **22-Term Agent Ontology** — the complete shared vocabulary for designing, building, debugging, and reasoning about the system. Every term describes **function and purpose**, never plumbing. A junior designer and a senior engineer read the same words and immediately understand why any actor did what it did.

The ontology is organized into five systems, an entity hierarchy, and a complete execution loop that covers everything from the philosophy of the project down to the physics of a single operation.

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

To avoid the ambiguity of the word "Agent," the platform uses the following modifiers to describe the three pillars of the architecture. Every actor in the system is one of these three types.

### Organic Agent

| Property | Description |
|----------|-------------|
| **Logic Engine** | Biological / Intuitive |
| **Key Strength** | High-level strategy, moral judgment, creative leaps, empathy, contextual wisdom |
| **Key Constraint** | Slow latency, highly unpredictable, subject to fatigue, limited working memory |
| **Ideal Use Case** | Setting overarching goals, resolving complex ethical dilemmas, providing the "why" behind actions, final authority on ambiguous situations |

The human. Organic Agents bring irreplaceable capabilities: moral reasoning, creative insight, long-term vision, and the authority to define what "good" means. Their inputs are the highest-authority signals in the system, but they are also the most constrained by bandwidth and cognitive load — which is exactly why Syntropy OS exists.

### Probabilistic Agent

| Property | Description |
|----------|-------------|
| **Logic Engine** | Machine Learning / AI (LLMs, neural networks, statistical models) |
| **Key Strength** | High adaptability, pattern recognition, natural language understanding, dynamic response to novel situations |
| **Key Constraint** | Black-box reasoning, prone to drift or hallucination, requires validation for high-stakes decisions |
| **Ideal Use Case** | Interpreting natural language, adapting to unexpected inputs, managing dynamic classification, generating suggestions, learning from corrections |

The AI. Probabilistic Agents excel at tasks that require flexibility, interpretation, and pattern matching. They handle the vast middle ground between rigid rules and human judgment. Their outputs carry **confidence scores** — the system's mechanism for calibrating how much autonomy to grant them.

### Deterministic Agent

| Property | Description |
|----------|-------------|
| **Logic Engine** | Procedural Code / Rules (functions, scripts, rule engines, state machines) |
| **Key Strength** | 100% reliability, instant execution (zero latency), mathematically provable correctness |
| **Key Constraint** | Extreme rigidity; fails completely if an unprogrammed edge case occurs |
| **Ideal Use Case** | Enforcing business rules, computing derived state, validating data integrity, managing hard boundaries, event sourcing guarantees |

The machine. Deterministic Agents are the bedrock of system reliability. When the answer is knowable and the rules are complete, a Deterministic Agent should handle it — no LLM call needed, no human intervention required. They are the fastest, cheapest, and most reliable agents in the system.

## The Entity Hierarchy

Before defining what agents *think* and *do*, we must define what **exists** in the system. Everything in the universe of Syntropy OS — from a raw data string to a human user — is an Entity. Entities are arranged in a hierarchy of increasing complexity:

### Master Hierarchy

| Level | Name | Role | Status | What It Is |
|-------|------|------|--------|------------|
| 0 | **Entity** | The Root | Exists | Anything that can be assigned a State. The abstract base class of all things. |
| 1 | **Material** | The Substance | Inert | Raw, unshaped physical or digital stuff. Has State (it is somewhere) and Attributes (it has properties — file size, mass, byte count). |
| 2 | **Artifact** | The Form | Potential | Material that has been shaped with an Affordance — a potential use. Still static, but it now contains purpose. |
| 3 | **Instrument** | The Tool | Kinetic | An Artifact that is actively engaged in a process — the moment it is "brought to life" by a Runtime. Provides Skills to the Agent wielding it. |
| 4 | **Actor** | The Agent | Intentional | A complex system of Materials and Artifacts that has developed Internal Context and Intent. The decision-maker. |

### Definitions

**Entity** — The most abstract base class. An Entity is anything that exists in the simulation and can be assigned a State. All Entities have Attributes (size, presence, properties) and are subject to Mechanics (the inviolable rules of the environment). The job of an Entity is simply to *be*.

**Material** — The simplest, unshaped form of an Entity. Raw "stuff" with no design. Every Artifact is made of Material, but not all Material is an Artifact. *Examples:* A raw data string. A pool of unformatted log entries. A sequence of unprocessed bits. A blank sheet of paper. They are "there," they have size and state, but they have no design.

**Artifact** — An Entity that has been shaped or composed with an **Affordance** (a potential use). It is Material + Form. This is the first level of "created" existence — something an agent or process has structured for a purpose. An Artifact is still static: it sits in the world waiting to be used. *Examples:* A code file (bits shaped into logic — affords Execute or Edit). A printed map (paper shaped into information — affords Read). A configuration file (bytes shaped into structure — affords Parse). A rifle (metal shaped into a weapon — affords Fire).

**Instrument** — An Artifact that is currently engaged in an active process. It is Artifact + Runtime. The moment an external force (computation, physics, human effort) activates the Artifact's Affordance, it becomes an Instrument. An Instrument provides Skills to the Agent wielding it — the Agent temporarily "inherits" the tool's capabilities. *Examples:* A script while it is being interpreted. A CLI tool while processing a command. A map while a soldier is navigating by it. A rifle while it is firing.

**Actor** — The highest level of composition. A complex system of Materials and Artifacts that has developed its own internal lifecycle — Internal Context, Intent, Memory, and the ability to make decisions. This is where the three Agent types live: Organic, Probabilistic, and Deterministic. *Examples:* A human user. An LLM agent. An autonomous validation script with its own Mission.

### The Affordance

An **Affordance** is a "verb" that an object offers to the world. It is the bridge between static Material and useful Artifact. A door handle affords pulling. A code file affords executing. A document affords reading. Affordances are what make an Artifact more than just raw Material — they define its *potential*.

When an Agent encounters an Artifact, it perceives its Affordances through the **Instrumental Interface Sequence**:

1. **Discovery** — The Agent perceives the Artifact in its context. Through Memory (training or experience), it recognizes the Artifact's type and what it affords. A `.py` file affords Execute or Edit. A document affords Read. A validation schema affords Validate.
2. **Authorization** — Before the Agent can use the Artifact, the system checks Permissions. The Agent may have the Capability to run a script, but lack the Permission. A Probabilistic Agent may see a `delete` action but lack authority to execute it without Organic approval.
3. **Possession** — The Agent integrates the Artifact into its active State. Digitally: the AI agent loads the code into Internal Context. Physically: the user opens the file. The Agent temporarily inherits the Skills contained within that tool.
4. **Execution** — The Agent initiates a Workflow that calls upon the tool's Skill. This costs Effort and causes an Event.

### The Code & Document Nuance

Code and documents can exist at different Entity levels depending on their State:

- **Code as Material**: A `.py` file sitting on disk. It is inert bits. No agency, no activity.
- **Code as Artifact**: That same file, recognized as having an Affordance (Execute, Edit). It has purpose but is still static.
- **Code as Instrument**: When an Agent "calls" or "runs" that file. It now provides a Skill (e.g., "sort this list," "validate this schema").
- **Code as Actor**: When that code is an autonomous bot or agent script that has its own Mission and Internal Context.

A document is almost always a Static Entity (Artifact). Its job is to hold information that updates an Agent's Memory or Internal Context. The interaction: an Agent uses their Read Skill (Capability) on the Document (Artifact) to create an Observation, which updates the Agent's Internal Context.

> **The summary for any team member:** "An Entity is anything with a State. If it can't think, it's a Static (Material or Artifact). If it's a tool in use, it's an Instrument. If it thinks, it's an Actor. We use Instruments to change the State of Statics to achieve our Mission."

## The 22-Term Agent Ontology

The ontology is organized into five systems that cover everything from the philosophy of the project down to the physics of a single operation. Every term is defined by its **job** — never by how it is implemented.

### Master Reference

| # | System | Term | The Job | One-Line Definition |
|---|--------|------|---------|---------------------|
| 1 | Philosophy & Drive | **First Principles** | The Bedrock | Undeniable foundational realities upon which the system is built |
| 2 | Philosophy & Drive | **Principles** | The Core Values | Fundamental moral or logical propositions that justify the Mission |
| 3 | Philosophy & Drive | **Doctrines** | The Codified Strategy | Formalized, overarching playbook of strategies adopted by the organization |
| 4 | Philosophy & Drive | **Mission** | The Goal | The macro-objective or ultimate victory condition |
| 5 | Philosophy & Drive | **Policies** | The Guidelines | Soft rules or behavioral guidelines used to achieve the Mission |
| 6 | Philosophy & Drive | **Tasks** | The Milestones | Specific, measurable units of work with a definitive success/fail state |
| 7 | Constraints | **Mechanics** | The Physics | Absolute, inviolable, hardcoded reality of the environment |
| 8 | Constraints | **Rules** | The Regulations | Socially or systemically enforced boundaries of behavior |
| 9 | Constraints | **Permissions** | The Authority | Systemic rights or access levels granted based on rank, role, or state |
| 10 | Constraints | **Protocols** | The Shared Scripts | External, established sequences multiple agents follow to resolve a specific Event |
| 11 | Anatomy | **Capabilities** | The Potential | What the actor is fundamentally able to perceive or do |
| 12 | Anatomy | **Attributes** | The Hard Limits | Absolute, measurable numerical limits of an agent's Capabilities |
| 13 | Anatomy | **Traits** | The Disposition | Persistent, inherent biases that flavor decision-making |
| 14 | Anatomy | **Memory** | The History | Dormant storage of past experiences, training, and knowledge |
| 15 | Mind | **Internal Context** | The Active Awareness | The exact slice of reality the agent is actively focused on right now |
| 16 | Mind | **State** | The Snapshot | Sum-total snapshot of the agent at an exact instant — Internal State (mind) + Local Physical State (body/runtime) |
| 17 | Execution Loop | **Workflows** | The Internal Procedure | Step-by-step logical sequence to string Skills together |
| 18 | Execution Loop | **Skills** | The Executable Tools | Specific, actionable techniques the agent has been trained to perform |
| 19 | Execution Loop | **Action** | The Atomic Output | Single, indivisible execution of a Skill |
| 20 | Execution Loop | **Effort** | The Cost | Measurable toll or drain required to execute Actions |
| 21 | Execution Loop | **Event** | The Objective Fact | A verifiable occurrence in the external world — a state change |
| 22 | Execution Loop | **Observation** | The Perception | Successful intake of an Event into the agent's mind |

---

### SYSTEM 1: THE PHILOSOPHY & DRIVE

*Why the system exists and what it is trying to accomplish.*

#### 1. First Principles — The Bedrock

**Definition:** The undeniable, foundational realities upon which the universe and the system are built. First Principles are not chosen; they are facts of existence.

**Relationship & Boundary:** They dictate the Mechanics. First Principles sit beneath everything — they are the "why" beneath the "why." No agent, regardless of authority, can override a First Principle.

**Syntropy OS:** "A human cannot attend to more than one complex decision at a time without degraded quality." "Information decays when stored only in human memory." "An LLM's output is probabilistic, not deterministic." These are the realities that necessitate the entire system.

#### 2. Principles — The Core Values

**Definition:** The fundamental moral or logical propositions that justify the Mission. The philosophical "True North."

**Relationship & Boundary:** Principles generate Policies. They are the "Why" behind the rules. Principles do not change unless First Principles are re-evaluated.

**Syntropy OS:** The [Design Principles](../vision/principles.md): "One Card at a Time," "Confidence-Based Handoff," "Transparency Over Magic," "Event-Sourced Everything," "The First-Class Citizen Principle."

#### 3. Doctrines — The Codified Strategy

**Definition:** A formalized, overarching playbook of strategies and Policies adopted by an entire organization. Sits between Principles and Protocols — it dictates the general approach, but doesn't dictate individual Actions.

**Relationship & Boundary:** Doctrines produce the organization's general posture. They are durable and change slowly. They inform which Protocols are created and how Policies are weighted.

**Syntropy OS:** "Event-Sourced Everything" as an architectural doctrine. "Heterogeneous Agent collaboration" as a process doctrine. "Trait-based agent composition" as a development doctrine. The [Core Philosophy](../vision/manifesto.md) pillars are the system's doctrines.

#### 4. Mission — The Goal

**Definition:** The macro-objective or ultimate victory condition. The highest authority for an active operation.

**Relationship & Boundary:** A Mission necessitates the creation of Tasks. It is the destination, not the journey. Multiple Missions can be active simultaneously (one per Domain/Space).

**Syntropy OS:** At the product level: "Remove mental overhead from the user's life." At the feature level: "Triage all emails in the inbox with >90% accuracy." At the task level: "Classify this specific email."

#### 5. Policies — The Guidelines

**Definition:** Soft rules, behavioral guidelines, or moral alignments used to achieve the Mission. Unlike Rules or Mechanics, a Policy *can* be broken by an agent if their Traits or the Context demands it — though consequences may follow.

**Relationship & Boundary:** Policies guide Workflows. They are the "Rules of Engagement" — they tell the agent *how* to behave, not *what* is physically possible. Policies are scoped to agent type and domain.

**Syntropy OS:**
- *Organic Agent:* "I want to clear my inbox before lunch." "Never auto-reply to my boss."
- *Probabilistic Agent:* "Reduce the user's cognitive load, even if it means doing more work." "When confidence is below 60%, always present options rather than a single suggestion."
- *Deterministic Agent:* N/A — Deterministic Agents have no guidelines to interpret. They only have absolute commands.

#### 6. Tasks — The Milestones

**Definition:** A specific, measurable unit of work with a definitive "success" or "fail" state. Sub-steps of a Mission.

**Relationship & Boundary:** To complete a Task, an agent must execute a Workflow. Tasks decompose Missions into actionable units. In Syntropy OS, a Card is the surface-level representation of a Task.

**Syntropy OS:** "Classify this email." "Generate a summary of this artifact." "Validate this workspace contract." "Review the AI's suggestion for this card."

---

### SYSTEM 2: THE CONSTRAINTS

*The boundaries of reality that no agent can wish away.*

#### 7. Mechanics — The Physics

**Definition:** The absolute, inviolable, hardcoded reality of the environment. Mechanics physically *cannot* be broken. They define the limits of Capabilities.

**Relationship & Boundary:** Mechanics are the enforcement layer of First Principles. They are not chosen, negotiated, or overridden. They are the "Naturgesetz" — the laws of nature for the system.

**Syntropy OS:** "A Firestore document cannot exceed 1MB." "An LLM context window has a token limit." "A network request has non-zero latency." "An event, once appended to the log, is immutable." "A human's working memory holds ~4 chunks simultaneously."

#### 8. Rules — The Regulations

**Definition:** Socially or systemically enforced boundaries of behavior. Rules *can* be broken, but doing so triggers punitive Protocols or system errors.

**Relationship & Boundary:** Rules are distinct from Mechanics (which are impossible to break) and Policies (which are internal guidelines). Rules are external, shared constraints that all agents must respect.

**Syntropy OS:** "Event schemas must be valid according to their version." "Security rules prevent cross-user data access." "Workspace contracts reject unknown keys." "Only the meta-agent can create new agents." The [Convention System](../product/dev-platform/features/dp05-convention-system.md) enforces structural Rules.

#### 9. Permissions — The Authority

**Definition:** Systemic rights or access levels granted based on rank, role, or state. The gatekeeper between Skills and Actions — you might have the Capability to do something, but lack the Permission.

**Relationship & Boundary:** Permissions constrain what an agent can *do* regardless of what it *can* do. They are the formal implementation of the Boundary of Trust.

**Syntropy OS:**
- A Probabilistic Agent has the Capability to classify an email, but only has Permission to *suggest* an action when confidence is below the threshold — it lacks Permission to auto-execute.
- A Deterministic Agent has the Capability to delete data, but only has Permission when the security rules authorize the requesting user.
- An Organic Agent has the Capability to override any AI suggestion, but Deterministic Rules still validate their input against data integrity constraints.

#### 10. Protocols — The Shared Scripts

**Definition:** An external, established sequence of events that multiple agents are expected to follow to resolve a specific Event. Protocols are public, multi-agent scripts.

**Relationship & Boundary:** Protocols dictate what the *team* must do; Workflows dictate how the *individual* agent does it. A Protocol coordinates between agents; a Workflow is internal to one agent.

**Syntropy OS:** The Confidence-Based Handoff is a Protocol: Probabilistic Agent classifies → Deterministic Agent scores confidence → either auto-execute or present to Organic Agent for review. The [Domain DRI Review](../workflows/domain-review.md) is a Protocol. The [Plan/Apply](../architecture/plan-apply-engine.md) pattern is a Protocol (plan → review → apply).

---

### SYSTEM 3: THE ANATOMY

*What the agent is made of — its permanent physical and cognitive structure.*

#### 11. Capabilities — The Potential

**Definition:** The fundamental potential of an agent to perceive or affect the world.

**Relationship & Boundary:** Capabilities dictate which Skills can be learned and which Events can become Observations. Capabilities are bounded by Attributes.

| Actor Type | In Practice |
|------------|------------|
| Organic | Physical ability to see the screen, hear audio, manipulate the input device, reason about ambiguity |
| Probabilistic | Ability to "read" complex situations, recognize patterns, generate organic-feeling responses, process natural language |
| Deterministic | Ability to execute precise, rule-based logic and manipulate system math instantly |

#### 12. Attributes — The Hard Limits

**Definition:** The absolute, measurable numerical limits of an agent's Capabilities. Determines how much Effort an agent can expend and limits the Internal Context.

**Relationship & Boundary:** Attributes are the quantitative boundaries of Capabilities. When Attributes are depleted (e.g., Effort exhausts them), the agent fails or degrades.

| Actor Type | In Practice |
|------------|------------|
| Organic | Reaction time, susceptibility to fatigue, maximum attention span, working memory capacity (~4 chunks) |
| Probabilistic | Context window size (tokens), inference latency, maximum concurrent requests, cost per invocation |
| Deterministic | Execution frequency (updates/second), max value caps, rate limits, timeout thresholds |

#### 13. Traits — The Disposition

**Definition:** Persistent, inherent biases that flavor an agent's decision-making. Traits filter how Policies are interpreted — they do not grant new abilities, they weight the math of a Workflow.

**Relationship & Boundary:** A Trait does not change the Rules. A "cautious" agent and an "aggressive" agent follow the same Rules; they just choose different paths within those Rules.

| Actor Type | In Practice |
|------------|------------|
| Organic | Natural interaction style — inherently cautious, a delegator, a micromanager, a power user |
| Probabilistic | Programmed personality biases — conservative, aggressive, or balanced for a given domain |
| Deterministic | Static baseline numbers — timeout is 5s, retry count is 3, priority weight is 0.8 |

#### 14. Memory — The History

**Definition:** The dormant storage of past experiences, training, and knowledge. Memory sits quietly until recalled into the Internal Context.

**Relationship & Boundary:** Memory is the reservoir; Internal Context is the active working set drawn from it. Memory is bounded by Attributes (how much can be stored/accessed).

| Actor Type | In Practice |
|------------|------------|
| Organic | Lived experiences, domain knowledge, recall of past interactions ("This pattern tricked me last time") |
| Probabilistic | Training data, accumulated event history, learned user preferences, correction logs |
| Deterministic | Event logs, materialized views, configuration files, stored variables |

---

### SYSTEM 4: THE MIND

*How the agent processes reality — the cognitive workspace.*

#### 15. Internal Context — The Active Awareness

**Definition:** The exact slice of reality the agent is actively focused on right now. A volatile combination of immediate Observations and relevant Memory, constrained tightly by Attributes (attention span / context window).

**Relationship & Boundary:** Internal Context is what the agent is *thinking about right now*. It is the RAM, not the hard drive. It is drawn from Memory and fed by Observations.

| Actor Type | In Practice |
|------------|------------|
| Organic | Whatever specific part of the system the human is actively looking at (meaning they may be blind to something right next to them) |
| Probabilistic | The exact data slice successfully processed and used for the very next decision (the prompt + loaded context) |
| Deterministic | The specific set of active variables being evaluated this instant to determine if a rule has been met |

#### 16. State — The Snapshot

**Definition:** The absolute, sum-total snapshot of the agent at an exact instant in time. If you paused the universe, dumped this data, and injected it into a blank entity, you would have a perfect, seamless clone. State is divided into two halves:

- **Internal State** (The Mind's Snapshot): The exact configuration of the cognitive workspace — the currently loaded Internal Context, the specific Task being evaluated, the active Workflow node, and the emotional/computational posture.
- **Local Physical State** (The Body's Snapshot): The mechanical truth of the agent's vessel — its current position in the system, current Attribute values (e.g., remaining budget, session duration), and runtime posture (e.g., active connections, loaded resources).

**Relationship & Boundary:** State is the aggregate reality of the agent at `t = now`. It is heavily influenced by Internal Context but is bound by Mechanics. The Internal and Physical states can become disjointed from the external world (e.g., the Probabilistic Agent's Internal State still references a document that has since been updated).

| Actor Type | Internal State | Local Physical State |
|------------|---------------|---------------------|
| Organic | Emotional/cognitive condition — focused, fatigued, frustrated, in the zone, panicked | Current screen, position in the app, physical environment, time of day |
| Probabilistic | Cognitive processing phase — assessing, formulating, generating, awaiting validation | Loaded context window, model instance, inference session, token usage |
| Deterministic | Programmed condition — processing, waiting, error, complete | Register values, function call stack, variable bindings, connection state |

State is what dictates which Workflows are currently legal to execute. A "suppressed" Organic Agent cannot execute a "deep analysis" Workflow. A Probabilistic Agent in "error" state must execute a Graceful Degradation Workflow.

---

### SYSTEM 5: THE EXECUTION LOOP

*How the agent changes reality — the action cycle.*

#### 17. Workflows — The Internal Procedure

**Definition:** The step-by-step logical sequence an individual agent uses to string Skills together. The internal plan to complete a Task.

**Relationship & Boundary:** A Workflow does nothing until executed as Actions. Workflows are *internal* to one agent; Protocols are *shared* across agents. Workflows are guided by Policies and constrained by State (certain States make certain Workflows illegal).

| Actor Type | In Practice |
|------------|------------|
| Organic | Mental routines and practiced tactics — "Check email, triage cards, review AI suggestions, archive done items" |
| Probabilistic | Logical evaluation → weigh options → generate output → await validation |
| Deterministic | Strict, unchanging "if this happens, then do that" logic |

#### 18. Skills — The Executable Tools

**Definition:** Specific, actionable techniques an agent has been trained to perform. Powered by Capabilities and constrained by Permissions.

**Relationship & Boundary:** Skills are the "verbs" an agent can execute. When an agent wields an Instrument, it temporarily inherits the Instrument's Skills. Skills are invoked within Workflows and consume Effort when executed as Actions.

| Actor Type | In Practice |
|------------|------------|
| Organic | Navigate the interface, make judgment calls, communicate clearly, correct AI suggestions, set priorities |
| Probabilistic | Classify, summarize, suggest, generate, extract intent, identify dependencies, score confidence |
| Deterministic | Validate schemas, compute derived state, enforce security rules, route events, sort queues, append to event log |

#### 19. Action — The Atomic Output

**Definition:** The single, indivisible execution of a Skill. Actions are the smallest unit of interaction with the world.

**Relationship & Boundary:** Actions expend Effort and cause Events. Every Action is the *cause*; every Event is the *effect*. Actions are what Workflows are made of — a Workflow is a sequence of Actions.

**Syntropy OS:** Tapping "approve" on a card. Sending a classification request to the LLM. Appending an event to Firestore. Executing a validation check against a schema. Each is a single, atomic Action.

#### 20. Effort — The Cost

**Definition:** The measurable toll or drain required to execute Actions. Effort depletes Attributes. When Attributes hit zero, the agent fails or degrades.

**Relationship & Boundary:** Effort is the bridge between Actions and Attributes. Every Action has an Effort cost. This is what makes agent routing a real engineering decision — different agent types have different Effort costs for the same Task.

**Syntropy OS:**
- *Organic:* Cognitive load, decision fatigue, time spent reviewing a card.
- *Probabilistic:* API tokens consumed, inference latency, compute cost (~$0.02–0.10 per card).
- *Deterministic:* CPU cycles, Firestore read/write units, Cloud Function execution time.

#### 21. Event — The Objective Fact

**Definition:** A verifiable occurrence in the external world — a state change. Events are governed by Mechanics. They exist independently of the agents — they are the external truth.

**Relationship & Boundary:** Events are what Actions *produce*. An Event is true whether anyone observed it or not. In Syntropy OS, Events are immutable and append-only — they form the canonical history of the system (the event log). Events bridge one agent's output to another agent's input.

**Syntropy OS:** An `EmailClassified` event. A `CardApproved` event. A `ThresholdBreached` event. A `WorkspaceValidated` event. These are objective facts in the event log — the universal truth for all agents.

#### 22. Observation — The Perception

**Definition:** The successful intake of an Event into the agent's mind. The moment an Event passes through a Capability (sensor) and enters the Internal Context, restarting the execution loop.

**Relationship & Boundary:** Not all Events become Observations. An Organic Agent may miss an Event (limited attention). A Probabilistic Agent may not have the Event in its context window. A Deterministic Agent will only observe Events that match its trigger conditions. Observations are the input that drives the entire cycle forward.

**Syntropy OS:** A user seeing the AI's suggestion appear on a card (Organic Observation). The LLM receiving a new email payload in its prompt (Probabilistic Observation). A Cloud Function receiving a Pub/Sub trigger (Deterministic Observation).

---

### The Complete Execution Loop

Here is how all 22 terms flow together in a single Syntropy OS operation:

Driven by the **First Principle** that humans cannot attend to every decision without degraded quality, the system establishes **Principles** of "Confidence-Based Handoff" and "Transparency Over Magic," codified into the **Doctrine** of Heterogeneous Agent collaboration.

The user's **Mission** is to triage their inbox. They set a **Policy** of "auto-archive newsletters, but always ask me about work emails." The system breaks this into **Tasks**: classify each email, determine action, execute or suggest.

The email arrives as an **Event** (objective fact in the event log). The Deterministic Agent's trigger condition **Observes** it (intake into its processing context). Following the Confidence-Based Handoff **Protocol**, it routes to the Probabilistic Agent.

The Probabilistic Agent, whose **Traits** are tuned for email classification, loads relevant **Memory** (past classifications, user correction history) into its **Internal Context** (the active prompt window — bounded by **Attributes**: a 200K token context window). Its **Internal State** shifts to "analyzing." It uses **Mechanics** (the LLM inference engine — the inviolable runtime) to execute its classification **Skill** within its **Workflow** (analyze → score → output). This **Action** costs **Effort** (API tokens).

The classification produces an **Event** (the classification result). The Deterministic Agent **Observes** this event and executes its threshold **Skill** — checking **Permissions** (is auto-execution allowed for this action type?) and applying **Rules** (schema validation, confidence threshold). Its **State** is "processing."

Since this is a newsletter with 95% confidence, the Deterministic Agent has **Permission** to auto-archive. It executes the **Action** (append `EmailAutoArchived` event), which costs **Effort** (Firestore write unit) and produces a new **Event** in the log. The user's **Observation** comes later via the audit trail — they see "AI auto-archived 3 newsletters" in their feed.

The cycle continues with the next email.

---

## Decision Profile

A Decision Profile characterizes how an agent processes logic, not what the agent is made of. It is the meta-layer that sits *above* the ontology terms — it describes the *pattern* by which an agent's anatomy, mind, and execution loop interact. It captures:

- **Logic engine type**: biological, probabilistic, or deterministic
- **Latency characteristics**: how fast can this agent respond? (an Attributes boundary)
- **Reliability envelope**: under what conditions is this agent's output trustworthy? (derived from Capabilities + Skills + Memory)
- **Failure mode**: how does this agent fail? (fatigue = Organic State; hallucination = Probabilistic Memory gap + Traits overreach; edge case crash = Deterministic Capabilities gap)
- **Adaptability**: can this agent handle novel situations outside its training/programming? (a function of Memory depth + Capabilities breadth)
- **Cost**: what resources does this agent consume per invocation? (an Attributes boundary, measured as Effort per Action)

Decision Profiles enable the system to make principled routing decisions: which agent should handle this Task, and what validation should wrap its output?

## Boundaries and Rules of Engagement

Because these agents possess completely different cognitive profiles, they must adhere to specific boundaries to ensure system stability.

### 1. Universal I/O

All agents must speak the same underlying system language. A Deterministic Agent's output must be readable by a Probabilistic Agent, and vice versa. No agent gets a "special" hidden API to interact with the system.

In Syntropy OS, this means:
- **Events** are the universal I/O format — every agent produces and consumes Events (term #21)
- **Event schemas** are typed, validated, and versioned — any agent can process any Event (enforced by Rules, term #8)
- **The event log** is the shared Memory — agents don't communicate through side channels

This directly extends the [Event-Sourced Everything](../vision/principles.md) principle: Events are not just for audit trails, they are the universal language that makes heterogeneous agent collaboration possible.

### 2. The Boundary of Trust

Each agent type has a trust boundary defined by its Decision Profile and enforced by Permissions (term #9):

- **Deterministic Agents** are trusted with **absolute truth**. They have Permission to mutate system state directly. They enforce invariants, compute derived state, validate schemas, and guarantee mathematical correctness.

- **Probabilistic Agents** are trusted with **interpretation**, but never have Permission for absolute state changes without Deterministic validation. Their Actions produce Events that are *suggestions* until Deterministic Workflows validate them. The **confidence threshold** (see [F10](../product/features/f10-confidence-thresholds.md)) is the Permissions mechanism that calibrates this trust boundary.

- **Organic Agents** are trusted with **ultimate authority** — they define goals, resolve ambiguity, and make moral judgments. But their inputs are still validated by Deterministic Rules (term #8) to prevent violations of data integrity Mechanics (term #7).

Trust flows in a specific pattern:
```
Organic Agent (authority) → defines intent via Policies
    ↓
Probabilistic Agent (interpretation) → translates intent via Skills, produces Event
    ↓
Deterministic Agent (execution) → validates via Rules, checks Permissions, executes Action
    ↓
Event Log (universal truth) → immutable record, Observed by all agents
```

### 3. Graceful Degradation

The system must handle agent failure without cascading collapse. Degradation follows the State transitions — when an agent's Internal State shifts to a failure mode, its Workflows hand off via the appropriate Protocol:

- If a **Probabilistic Agent** encounters low confidence or model failure → its State shifts, and the Protocol routes to a Deterministic Agent (fallback) or Organic Agent (escalation).
- If a **Deterministic Agent** encounters an unprogrammed edge case → it rejects with a clear error Event and escalates via Protocol.
- If an **Organic Agent** is unavailable → the system queues the Task and continues operating within the combined Permissions of Probabilistic and Deterministic agents.

## Mapping to Syntropy OS

### Current System Mapping

| System Component | Agent Type | Entity Level | Ontology Terms at Work |
|-----------------|------------|-------------|----------------------|
| Human user | Organic Actor | Actor | Policies (goals), Skills (corrections), Memory (experience), Observations (perceiving suggestions) |
| Claude LLM (AI Pipeline) | Probabilistic Actor | Actor | Skills (classify, summarize), Internal Context (prompt window), Memory (training data), Effort (tokens) |
| Domain Agents (Email, Finance, Home) | Probabilistic Actor | Actor | Traits (domain personality), Policies (domain directives), Skills (domain actions) |
| Confidence Scoring | Deterministic Actor | Actor | Skills (threshold math), Workflows ("if score > X then Y"), Permissions (auto-execute gate) |
| Event Sourcing (Firestore) | Deterministic Actor | Actor | Memory (canonical event log), Skills (append, replay), Mechanics (immutability) |
| Security Rules (Firestore) | Deterministic Actor | Actor | Rules (auth enforcement), Permissions (data isolation) |
| Cloud Function routing | Deterministic Actor | Actor | Observations (trigger), Workflows (routing rules), Protocols (handoff sequences) |
| Code files on disk | — | Artifact | Affordance: Execute, Edit. Becomes Instrument when loaded by a Runtime |
| Event log entries | — | Artifact | Affordance: Read, Query. Static records of Events |
| Configuration files | — | Artifact | Affordance: Parse, Validate. Material (bytes) shaped into structure |
| Raw user input (voice/photo) | — | Material | Unprocessed bits. Becomes Artifact after AI extraction pipeline shapes it |
| Learning Loop | Mixed | — | Organic Skills (corrections) → Deterministic Memory (storage) → Probabilistic Memory (model update) |

### Architecture Agent System Mapping

The dev platform's trait-based agent composition (see [DP02](../product/dev-platform/features/dp02-agent-system.md)) maps to this taxonomy:

| Dev Platform Agent | Agent Type | Entity Level | Rationale |
|-------------------|------------|-------------|-----------|
| Human contributor | Organic | Actor | Executes Workflows with judgment and creativity |
| AI model (Opus, Sonnet, Haiku) | Probabilistic | Actor | Executes Workflows with pattern matching and adaptability |
| Validation engine (future) | Deterministic | Actor | Enforces Rules, validates schemas |
| Workspace contract validation | Deterministic | Actor | Validates `syntropy.toml` against Rules |
| Agent manifest files | — | Artifact | Affordance: Load, Execute. Material (markdown) shaped into agent configuration |
| Workflow documents | — | Artifact | Affordance: Read, Follow. Defines Workflow steps for any Actor |

## Design Implications

### For Product Design

1. **Every feature involves all three agent types and the entity hierarchy.** A feature like Email Triage has: the human setting Policies (Organic), the LLM applying Skills to classify emails (Probabilistic), Deterministic Workflows enforcing threshold Rules, and the email itself progressing from Material (raw payload) → Artifact (parsed message) → Event (classification result).

2. **Confidence thresholds are Permissions.** The confidence system is not just a UX feature — it is the formal Permissions mechanism that calibrates the Boundary of Trust. Deterministic Skills (threshold math) check Permissions before allowing the Probabilistic Agent's suggestion to become an auto-executed Action.

3. **Transparency feeds Organic Observations.** When the system shows confidence scores, audit trails, and AI reasoning, it is creating Observations for the Organic Agent — enabling them to exercise their authority role effectively.

4. **Design features in ontology terms, not implementations.** When specifying a feature, describe the Mission, Tasks, Policies, Skills, Workflows, Events, and Protocols for each agent type — not what database or API powers them.

### For Technical Architecture

1. **Events are the universal bus.** Every agent produces and consumes Events. Events are what Actions produce and Observations intake. This is the bridge between one agent's Execution Loop and another's.

2. **Deterministic validation wraps Probabilistic output.** Never let a Probabilistic Agent's Actions directly mutate system state. Its Skills produce Events that pass through Deterministic Workflows (Rules + Permissions) before becoming system truth.

3. **Entity transitions are explicit.** When raw input (Material) becomes structured data (Artifact), when an Artifact becomes an active tool (Instrument), and when code becomes an autonomous agent (Actor) — each transition should be a documented, observable Event.

### For Dev Platform / Process Design

1. **Workflows are agent-agnostic; Protocols coordinate between agents.** A Workflow should be executable by any agent type. When multiple agents need to coordinate, design a Protocol.

2. **Actor-aware design uses the full ontology.** When a process fails, diagnose by ontology layer: Was it a Capabilities gap? An Attributes overflow? A Memory gap? A Permissions problem? A State issue? A broken Protocol? The 22 terms give you a diagnostic vocabulary.

3. **The meta-agent routes by Decision Profile.** Routing decisions should consider which agent's Capabilities, Skills, Attributes, and Permissions best match the Task requirements.

## Relationship to Existing Principles

| Existing Principle | How This Architecture Extends It | Ontology Terms Involved |
|-------------------|----------------------------------|------------------------|
| **Confidence-Based Handoff** (#2) | Formalized as a Protocol with Permissions gating | Probabilistic Skills → Deterministic Skills (scoring) → Permissions check → Organic Observation |
| **Event-Sourced Everything** (#5) | Events (term #21) are the universal I/O — Actions produce them, Observations consume them | Actions → Events → Observations; all agents' Memory grounded in the event log |
| **Transparency Over Magic** (#6) | Transparency creates Observations for Organic Agents to exercise authority | Events made visible → Organic Observations → informed Policies |
| **Progressive Autonomy** (#7) | Formalized as Permissions calibration over time | Organic Policies shift → Probabilistic Permissions expand → more Actions auto-execute |
| **Corrections as Training Data** (#10) | Organic Actions (corrections) become Events that update Probabilistic Memory | Organic Skills → Actions → Events → Probabilistic Memory evolution |
| **First-Class Citizen** (#11) | All agent types share the same 22-term ontology and entity hierarchy | The ontology itself — one vocabulary for all |

## Open Questions

- [ ] How should the system handle hybrid agents that combine Probabilistic and Deterministic logic (e.g., an LLM call with post-processing validation)? Do they have a composite Decision Profile?
- [ ] Should Decision Profiles be versioned as agent Capabilities and Attributes change (e.g., new model version)?
- [ ] How does the Boundary of Trust interact when two Probabilistic Agents have conflicting Policies?
- [ ] What is the formal escalation Protocol when Graceful Degradation cascades through all three agent types?
- [ ] Should the 22-term ontology be formally schema-defined (e.g., in `syntropy.toml` or a future agent manifest format) so tooling can reason about term gaps?
- [ ] How should the Entity Hierarchy be represented in the data model — should Entities have explicit `entity_level` metadata (Material, Artifact, Instrument, Actor)?
- [ ] Should Protocols be first-class documents in the knowledge graph, distinct from Workflows?
- [ ] How do Entity level transitions (Material → Artifact → Instrument) map to Events in the event log?
