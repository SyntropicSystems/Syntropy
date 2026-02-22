---
id: "glossary"
type: vision
title: "Glossary"
status: active
owner: meta-agent
created: 2025-02-07
updated: 2026-02-22
refs:
  related: [manifesto, principles, arch-agent-architecture]
tags: [vision, language, reference]
---

# Glossary

Canonical term definitions for Syntropy OS. This is the shared language — use these terms consistently across all documents. Terms are organized by category for navigation; the [Heterogeneous Agent Architecture](../architecture/agent-architecture.md) provides the complete 22-term ontology with full definitions, relationships, and per-actor-type breakdowns.

---

## Entity Hierarchy

The universal composition model — everything in the system, from a raw data string to a human user, is an Entity at some level.

| Term | Definition |
|------|-----------|
| **Entity** | The most abstract base class. Anything that exists in the system and can be assigned a State. All Entities have Attributes and are subject to Mechanics. The job of an Entity is simply to *be*. |
| **Material** | The simplest, unshaped form of an Entity. Raw, unshaped physical or digital "stuff" with no design — it has State (it is somewhere) and Attributes (it has properties like file size or byte count), but no purpose. *Examples:* a raw data string, a pool of unformatted log entries, unprocessed bits. Every Artifact is made of Material, but not all Material is an Artifact. |
| **Artifact** | Material that has been shaped with an Affordance — a potential use. Material + Form. Still static, but it now contains purpose and sits in the world waiting to be used. *Examples:* a code file (bits shaped into logic — affords Execute or Edit), a printed map (paper shaped into information — affords Read), a configuration file (bytes shaped into structure — affords Parse), an uploaded photo (pixels shaped into visual information — affords Analyze). Note: in the product layer, "Artifact" is also used specifically to mean any uploaded/captured file processed by the AI extraction pipeline — this is an Entity-level Artifact that has been linked to domains/projects/tasks. |
| **Instrument** | An Artifact that is currently engaged in an active process — Artifact + Runtime. The moment an external force (computation, physics, human effort) activates the Artifact's Affordance, it becomes an Instrument. An Instrument provides Skills to the Agent wielding it — the Agent temporarily "inherits" the tool's capabilities. *Examples:* a script while being interpreted, a CLI tool while processing a command, a map while a navigator is using it. |
| **Actor** | The highest level of Entity composition. A complex system that has developed Internal Context, Intent, Memory, and decision-making ability. This is where the three Agent types live: Organic, Probabilistic, and Deterministic. Actors drive the system toward a Mission. *Examples:* a human user, an LLM agent, an autonomous validation script. |
| **Affordance** | A "verb" that an object offers to the world — the bridge between static Material and useful Artifact. A door handle affords pulling; a code file affords executing; a document affords reading. Affordances define an Artifact's *potential*. When an Agent encounters an Artifact, it perceives Affordances through Discovery → Authorization (Permissions check) → Possession (load into State) → Execution (Action). |

---

## Agent Ontology — System 1: Philosophy & Drive

The terms that describe *why* the system exists and what it is trying to accomplish.

| Term | Definition |
|------|-----------|
| **First Principles** | The undeniable, foundational realities upon which the system is built. Not chosen — they are facts of existence. They dictate Mechanics. *Examples:* "A human cannot attend to more than one complex decision at a time without degraded quality." "An LLM's output is probabilistic, not deterministic." |
| **Principles** | Fundamental moral or logical propositions that justify the Mission — the philosophical "True North." Principles generate Policies. They are the "Why" behind the rules. In Syntropy OS, these are the [Design Principles](principles.md): "One Card at a Time," "Confidence-Based Handoff," "Transparency Over Magic," etc. |
| **Doctrines** | Formalized, overarching playbooks of strategies and Policies adopted by the organization. Sit between Principles and Protocols — they dictate the general approach but don't dictate individual Actions. *Examples:* "Event-Sourced Everything" (architectural doctrine), "Heterogeneous Agent collaboration" (process doctrine), "Trait-based agent composition" (development doctrine). |
| **Mission** | The macro-objective or ultimate victory condition. The highest authority for an active operation. Missions necessitate Tasks. *Product level:* "Remove mental overhead from the user's life." *Feature level:* "Triage all emails with >90% accuracy." *Task level:* "Classify this email." |
| **Policies** | Soft rules, behavioral guidelines, or moral alignments used to achieve the Mission. Unlike Rules (which trigger penalties when broken) or Mechanics (which cannot be broken), a Policy *can* be broken if Traits or Context demand it. Policies guide Workflows. *Organic:* "Never auto-reply to my boss." *Probabilistic:* "Reduce cognitive load, even if it means doing more work." *Deterministic:* N/A — Deterministic Agents have no guidelines to interpret, only absolute commands. |
| **Tasks** | Specific, measurable units of work with a definitive success/fail state. Sub-steps of a Mission. To complete a Task, an agent must execute a Workflow. In the product layer, a Card is the surface-level representation of a Task. |

---

## Agent Ontology — System 2: Constraints

The boundaries of reality that no agent can wish away.

| Term | Definition |
|------|-----------|
| **Mechanics** | The absolute, inviolable, hardcoded reality of the environment — the "Naturgesetz" (laws of nature). Mechanics physically *cannot* be broken. They define the limits of Capabilities. *Examples:* "A Firestore document cannot exceed 1MB." "An LLM context window has a token limit." "An event, once appended to the log, is immutable." |
| **Rules** | Socially or systemically enforced boundaries of behavior. Rules *can* be broken, but doing so triggers punitive Protocols or system errors. Distinct from Mechanics (impossible to break) and Policies (internal guidelines). *Examples:* event schema validation, security rules preventing cross-user data access, workspace contracts rejecting unknown keys, convention system enforcement. |
| **Permissions** | Systemic rights or access levels granted based on rank, role, or state. The gatekeeper between Skills and Actions — an agent might have the Capability to do something but lack the Permission. Permissions are the formal implementation of the Boundary of Trust. *Example:* a Probabilistic Agent can classify an email (Capability) but only has Permission to *suggest* when below the confidence threshold — it cannot auto-execute. |
| **Protocols** | External, established sequences of events that multiple agents are expected to follow to resolve a specific Event. Protocols are public, multi-agent scripts — they dictate what the *team* must do, while Workflows dictate how the *individual* agent does it. *Examples:* the Confidence-Based Handoff sequence (Probabilistic classifies → Deterministic scores → either auto-execute or present to Organic), the Plan/Apply pattern, the Domain DRI Review workflow. |

---

## Agent Ontology — System 3: Anatomy

What the agent is made of — its permanent physical and cognitive structure.

| Term | Definition |
|------|-----------|
| **Capabilities** | The Potential — what an actor is fundamentally able to perceive or do. Capabilities dictate which Skills can be learned and which Events can become Observations. *Organic:* see, hear, reason about ambiguity. *Probabilistic:* recognize patterns, process natural language, generate responses. *Deterministic:* execute rule-based logic instantly. |
| **Attributes** | The Hard Limits — the absolute, measurable numerical limits of an agent's Capabilities. Determines how much Effort an agent can expend and limits Internal Context. When Attributes are depleted, the agent fails or degrades. *Organic:* attention span, fatigue threshold. *Probabilistic:* context window (tokens), inference latency, cost per call. *Deterministic:* execution frequency, max value caps, rate limits. |
| **Traits** | The Disposition — persistent, inherent biases that flavor decision-making without changing the actual Rules. Traits filter how Policies are interpreted. A "cautious" agent and an "aggressive" agent follow the same Rules but choose different paths. *Organic:* natural interaction style (cautious, delegator, power user). *Probabilistic:* programmed personality (conservative, balanced, domain-tuned). *Deterministic:* static baselines (timeout=5s, retry=3, priority=0.8). |
| **Memory** | The History — dormant storage of past experiences, training, and knowledge. Memory sits quietly until recalled into Internal Context. Memory is the reservoir; Internal Context is the working set drawn from it. *Organic:* lived experiences, domain knowledge. *Probabilistic:* training data, correction logs, learned preferences. *Deterministic:* event logs, materialized views, configuration. |

---

## Agent Ontology — System 4: Mind

How the agent processes reality — the cognitive workspace.

| Term | Definition |
|------|-----------|
| **Internal Context** | The Active Awareness — the exact slice of reality the agent is actively focused on right now. A volatile combination of immediate Observations and relevant Memory, constrained by Attributes (attention span / context window). Internal Context is the RAM, not the hard drive. *Organic:* what they are looking at right now (may be blind to adjacent information). *Probabilistic:* the data slice in the current prompt + loaded context. *Deterministic:* the active variables being evaluated this instant. |
| **State** | The Snapshot — the sum-total snapshot of the agent at an exact instant. Divided into **Internal State** (the mind's configuration: loaded Internal Context, active Task, current Workflow node, emotional/computational posture) and **Local Physical State** (the body's/runtime's truth: position in system, current Attribute values, active connections). State dictates which Workflows are currently legal to execute. If you paused the system and cloned this data into a blank entity, you would have a seamless duplicate. |

---

## Agent Ontology — System 5: Execution Loop

How the agent changes reality — the action cycle.

| Term | Definition |
|------|-----------|
| **Workflows** | The Procedure — step-by-step logical sequence an individual agent uses to string Skills together. The internal plan to complete a Task. Workflows are *internal* to one agent; Protocols are *shared* across agents. *Organic:* mental routines ("check email, triage, review suggestions, archive"). *Probabilistic:* evaluate → weigh options → generate → await validation. *Deterministic:* strict "if this, then that" logic. |
| **Skills** | The Executable Tools — specific, actionable techniques the agent has been trained to perform. Powered by Capabilities, constrained by Permissions. When an agent wields an Instrument, it temporarily inherits the Instrument's Skills. *Organic:* navigate UI, make judgment calls, correct AI. *Probabilistic:* classify, summarize, suggest, extract intent. *Deterministic:* validate, compute, enforce, route, append. |
| **Action** | The Atomic Output — a single, indivisible execution of a Skill. The smallest unit of interaction with the world. Actions expend Effort and cause Events. Every Action is the *cause*; every Event is the *effect*. *Examples:* tapping "approve," sending a classification request, appending an event to Firestore. |
| **Effort** | The Cost — the measurable toll or drain required to execute Actions. Effort depletes Attributes. When Attributes hit zero, the agent fails or degrades. *Organic:* cognitive load, decision fatigue, time. *Probabilistic:* API tokens, inference latency, compute cost. *Deterministic:* CPU cycles, read/write units, execution time. |
| **Event** | The Objective Fact — a verifiable occurrence in the external world, a state change. Events are governed by Mechanics and exist independently of agents (they are true whether anyone observed them or not). In Syntropy OS, Events are immutable and append-only — the canonical history of the system. Events bridge one agent's output to another agent's input. *Examples:* `EmailClassified`, `CardApproved`, `ThresholdBreached`, `WorkspaceValidated`. |
| **Observation** | The Perception — the successful intake of an Event into the agent's mind. The moment an Event passes through a Capability (sensor) and enters Internal Context, restarting the execution loop. Not all Events become Observations — an Organic Agent may miss an Event (limited attention), a Probabilistic Agent may not have it in context, a Deterministic Agent only observes Events matching its triggers. |

---

## Agent Architecture Terms

Terms that describe the architectural framework itself.

| Term | Definition |
|------|-----------|
| **Heterogeneous Agent Architecture** | The foundational architecture treating all system participants — humans (Organic Agents), AI models (Probabilistic Agents), and hardcoded programs (Deterministic Agents) — as first-class Agents sharing equal systemic privileges. Defined by a 22-Term Agent Ontology organized in 5 systems (Philosophy & Drive, Constraints, Anatomy, Mind, Execution Loop) and an Entity Hierarchy (Entity → Material → Artifact → Instrument → Actor). See [arch-agent-architecture](../architecture/agent-architecture.md). |
| **Organic Agent** | An Agent whose logic engine is biological/intuitive (a human). Job: to provide creative, intuitive, and high-level strategic direction. Trusted with ultimate authority. Key strengths: moral judgment, creative leaps, contextual wisdom. Key constraints: slow latency, fatigue, limited attention. Policies are personal motivations; Memory is lived experience; State includes emotional/physiological condition. |
| **Probabilistic Agent** | An Agent whose logic engine is machine learning/AI (LLMs, neural networks). Job: to dynamically interpret the world, adapt to unpredictable behavior, and make context-aware decisions. Trusted with interpretation, never absolute state changes without Deterministic validation. Key strengths: pattern recognition, adaptability, natural language. Key constraints: hallucination, black-box reasoning. Policies are core directives; Memory is training data + corrections; Traits are programmed personality biases. |
| **Deterministic Agent** | An Agent whose logic engine is procedural code/rules (functions, scripts, state machines). Job: to flawlessly enforce Rules, manage the math, and execute commands without deviation. Trusted with absolute truth. Key strengths: 100% reliability, instant execution. Key constraints: extreme rigidity, fails on unprogrammed edge cases. Policies: N/A — no goals or motivations, only absolute commands. |
| **Decision Profile** | A characterization of how an agent processes logic — the meta-layer above the ontology, summarizing the pattern by which an agent's anatomy, mind, and execution loop interact. Captures: logic engine type, latency (Attributes), reliability envelope (Capabilities + Skills + Memory), failure mode (State), adaptability (Memory + Capabilities), and cost (Effort per Action). Enables principled routing: which agent should handle this Task? |
| **Boundary of Trust** | The formal boundaries defining what each agent type has Permission to do: Deterministic Agents have Permission for absolute truth (direct state mutation), Probabilistic Agents have Permission for interpretation (validated before state changes), Organic Agents have Permission for ultimate authority (inputs still validated against Rules). Calibrated by confidence thresholds, which are the Permissions mechanism. |
| **Graceful Degradation** | The Protocol by which agents hand off control when they cannot process a scenario. Triggered by State transitions (e.g., Probabilistic Agent shifting to "low confidence"). Probabilistic Agents fall back to Deterministic Agents or escalate to Organic Agents; Deterministic Agents reject with clear error Events and escalate; Organic unavailability triggers queuing without blocking. |

---

## Dev Platform & Process Terms

| Term | Definition |
|------|-----------|
| **Agent** | In the broadest sense: any Actor in the system (Organic, Probabilistic, or Deterministic). In the product layer: "Domain Agents" (Email Agent, Finance Agent, Home Agent) are Probabilistic Agents with specialized Skills, Traits, Memory, and Policies for their domain. In the dev platform: agent manifests define scope, authority, Memory, Policies, Workflows, and Skills for contributors executing work. |
| **Trait** (agent system) | A composable set of context, rules, and workflows that an agent inherits in the dev platform agent system. Agents are composed from base traits + domain-specific traits. Distinct from "Traits" (ontology term #13) — Trait (agent system) defines *what* an agent owns in the dev platform; Traits (ontology) describes *innate biases* in how any agent decides. |
| **Actor** (dev platform) | Any entity that executes work processes — a human contributor (Organic Agent), a specific AI model (Probabilistic Agent), or a configured validation system (Deterministic Agent). Actors are Agents viewed through the lens of process execution. Their Capabilities, Attributes, Skills, and Memory determine how effectively they can execute a given Workflow. Operational engineering designs processes that account for these differences. |
| **DRI** | Directly Responsible Individual — the Agent (human or AI) that owns a domain and is accountable for its correctness. |
| **Operational Engineering** | The discipline of designing work processes (Workflows, Rules, Skills, context configurations, agent manifests) so that different Actors can execute them effectively. Parallel to Cognitive Engineering: OE owns how processes are structured for execution (input side); CE owns how information is structured for comprehension (output side). |
| **Cognitive Engineering** | The discipline of structuring information for actual human and agent comprehension. Encompasses review templates, learning briefs, knowledge compression, progressive disclosure, and cognitive adaptation. |
| **Upleveling** | The principle that every interaction should help contributors become more effective over time — without creating dependency or learned helplessness. |

---

## Product Terms

| Term | Definition |
|------|-----------|
| **Card** | The atomic unit of the product's user interface. The surface-level representation of a Task — any actionable item presented in the queue. |
| **Queue** | The ordered list of Cards the user works through. Can be filtered by domain or project. The Queue is how Tasks are presented to the Organic Agent. |
| **Domain / Space** | A permanent, persistent container for an entire life area (My Condo, Career, Finances). Contains projects, tasks, reference info, artifacts, and full event history. Domains outlive any individual project. |
| **Project** | A time-bound effort within a Domain. Has tasks, a budget, a deadline, and completes when all tasks are done. |
| **Dependency** | A relationship where Task B cannot be actioned until Task A is complete. Dependencies are explicit in the data model — the system understands sequencing. |
| **Confidence** | A Probabilistic Agent's self-assessed probability that its suggested Action is correct (0–100%). Produced by the agent's Skills, validated by a Deterministic Agent's Rules, and presented to the Organic Agent as an Observation. The Permissions mechanism for the Boundary of Trust. |
| **Threshold** | User-configurable confidence level above which AI auto-executes without asking. The Organic Agent's Policy that calibrates Permissions for the Probabilistic Agent. |
| **Audit Trail** | The browsable, filterable log of all Events. Makes the event log accessible as Observations for the Organic Agent. |
| **Quick Capture** | The multimodal input system (voice, text, photo) for rapid task creation. Converts raw Material (unstructured input) into Artifacts (structured cards). |
| **Surface** | A platform or interface through which users interact with the system (mobile app, web app, development platform). Each Surface adapts the experience but shares core logic. |
| **Observation** (product) | A raw signal captured by any contributor — a friction, bug, idea, question, pattern, or thought worth recording. Observations are the atomic unit of emergent intelligence. Note: this product concept maps directly to ontology term #22 (Observation as perception) — a contributor's Observation of a friction *is* the successful intake of an external Event (the friction) into their Internal Context. |
| **Reflection** | A special type of Observation captured after completing work — a genuine, personal account of what the contributor experienced. Not a retrospective about others, but honest self-noticing that feeds the observation system. |
| **Pulse Companion** | A personalized work companion agent (Probabilistic) that grows alongside each contributor. Starts as a reflection assistant and evolves into a full work ally that understands behavior patterns and supports effectiveness. |
| **Progressive Disclosure** | An information architecture Principle where content is layered (headline → summary → detail → deep dive) so a reader can stop at any layer with coherent understanding. |

---

## Technical Terms

| Term | Definition |
|------|-----------|
| **Event** (Firestore) | The concrete implementation of ontology term #21 (Event as objective fact). An immutable record in the Firestore event log. Append-only. Every Action by any agent produces at least one Event. State is derived from Events, never stored directly. |
| **Materialized View** | A precomputed Artifact (e.g., queue order, project stats) derived from the event log by Deterministic Agents (Cloud Functions). The event log is the canonical Memory; materialized views are derived Artifacts with Affordance: Read/Query. |
| **Decision Record** | A structured Artifact that captures any decision — the problem, options, what was decided, success criteria, and revisit triggers. Forms a reasoning graph. Classified as Type 1 (hard to reverse) or Type 2 (easily reversible). ADRs (Architecture Decision Records) are a subtype. |
| **Reasoning Graph** | The interconnected graph of Decision Records explaining why everything is the way it is. Traversable by hierarchy, domain, and relationships. |
| **Revisit Trigger** | A condition defined in a Decision Record that, when met, signals the decision should be reconsidered. Prevents decisions from becoming dogma. |

---

## Workspace Platform Terms

| Term | Definition |
|------|-----------|
| **Workspace Contract** | The single configuration file (`syntropy.toml`) that defines a workspace's structure, services, conventions, and behavior. An Artifact (bytes shaped into structure — affords Parse, Validate). Schema-validated by Deterministic Agents; unknown keys are Rules violations. |
| **Workspace Instance** | The `.syntropy/` directory containing human-facing Artifacts (tasks, system-of-work docs, signals) and machine-generated state (indexes, caches). |
| **Workspace State** | The structured, machine-readable output of `syntropy state --json` — a hydration contract providing agents with complete workspace understanding without parsing files. A derived Artifact. |
| **PatchSet** | A transactional set of file changes produced by the plan/apply engine. Previewed before application, applied atomically, and reversible. The unit of workspace mutation — each PatchSet is a set of Actions that produce Events. |
| **Plan/Apply** | A Protocol (multi-agent sequence) where structural changes are first previewed as a PatchSet (plan), reviewed by the Organic Agent, and then executed atomically (apply). All platform mutations use this Protocol. |
| **Blueprint** | An Artifact (template files shaped with Affordance: Scaffold) that defines structure, files, and configuration for a new workspace component. |
| **Validation Report** | A derived Artifact — the output of `syntropy validate --json` — enumerating all Rules violations in a workspace. Produced by a Deterministic Agent's Skills. |
| **North Star Layout** | The canonical repository structure the platform targets. An architectural Doctrine: everything is Platform, Products, Tooling, Workspaces, or Instance. |
