---
id: "glossary"
type: vision
title: "Glossary"
status: active
owner: meta-agent
created: 2025-02-07
updated: 2025-02-09
refs:
  related: [manifesto, principles]
tags: [vision, language, reference]
---

# Glossary

Canonical term definitions for Syntropy OS. This is the shared language — use these terms consistently across all documents.

| Term | Definition |
|------|-----------|
| **Card** | The atomic unit of the system. Any actionable item presented as a card in the queue. |
| **Queue** | The ordered list of cards the user works through. Can be filtered by domain or project. |
| **Domain / Space** | A permanent, persistent container for an entire life area (My Condo, Career, Finances). Contains projects, tasks, reference info, artifacts, and a full event history. |
| **Project** | A time-bound effort within a Domain. Has tasks, a budget, a deadline, and completes when all tasks are done. Replaces "Epic" in earlier terminology. |
| **Dependency** | A relationship where Task B cannot be actioned until Task A is complete. |
| **Confidence** | AI's self-assessed probability that its suggested action is correct (0–100%). |
| **Threshold** | User-configurable confidence level above which AI auto-executes without asking. |
| **Event** | An immutable record of any action taken in the system. Append-only in Firestore. |
| **Audit Trail** | The browsable, filterable log of all events. |
| **Agent** | A specialized AI prompt + context strategy for a specific domain (Email Agent, Finance Agent, Home Agent). |
| **Quick Capture** | The multimodal input system (voice, text, photo) for rapid task creation. |
| **Materialized View** | A precomputed document (e.g., queue order, project stats) derived from the event log by Cloud Functions. |
| **Artifact** | Any uploaded or captured file (photo, PDF, voice memo, document) that has been processed by the AI extraction pipeline and linked to domains/projects/tasks. |
| **Surface** | A platform or interface through which users interact with the system (mobile app, web app, development platform). |
| **Decision Record** | A structured capture of any decision — the problem it solves, the options explored, what was decided, how to know it's working, and when to revisit. Decision records form a reasoning graph: they have hierarchy (parent/child), domain scope, and relationships to other decisions. Generalizes the ADR (Architecture Decision Record) pattern to all decision types: product, process, methodology, convention, principle. Classified as Type 1 (hard to reverse) or Type 2 (easily reversible). |
| **DRI** | Directly Responsible Individual — the agent (human or AI) that owns a domain and is accountable for its correctness. |
| **Observation** | A raw signal captured by any contributor — a friction, bug, idea, question, anxiety, pattern, need, praise, or any thought worth recording. Observations are the atomic unit of emergent intelligence: they accumulate, get structured retroactively, and are audited for patterns that inform system evolution. |
| **Upleveling** | The principle that every interaction and feedback loop should help contributors become more effective over time — better at expressing ideas, capturing observations, structuring thoughts, and contributing to the system — without creating dependency or learned helplessness. |
| **Reflection** | A special type of observation captured after completing work — a genuine, personal account of what the contributor experienced: what worked, what was hard, how it felt, what they'd need next time. Not a system design exercise or retrospective about others, but honest self-noticing that feeds the observation system as signal. |
| **Pulse Companion** | A personalized work companion agent that grows alongside each contributor — starting as a reflection assistant (helping articulate experience through context-aware questions) and evolving by emergence into a full work ally that understands behavior patterns, supports effectiveness, and collaborates across contributors to surface collective signals for system evolution. |
| **Reasoning Graph** | The interconnected graph of decision records that explains why everything in the system is the way it is. Traversable by hierarchy (problem stack), domain, and relationships. The reasoning graph is what would allow rebuilding the system from scratch — not identical, but with the same informed choices. |
| **Revisit Trigger** | A condition defined in a decision record that, when met, signals the decision should be reconsidered. Prevents decisions from becoming dogma by making expiration explicit and graceful. |
| **Actor** (dev platform) | Any entity that executes work processes — a human contributor, a specific AI model (Opus, Sonnet, Haiku, etc.), or a configured agent. Different actors have different capabilities, context handling, reasoning styles, and failure modes. Operational engineering designs processes that account for these differences. |
| **Operational Engineering** | The discipline of designing work processes (workflows, rules, skills, context configurations, agent manifests) so that different actors can execute them effectively. The operational-engineering-agent is the DRI — it owns the methodology for how processes should be designed, not the processes themselves. Parallel to cognitive engineering: CE owns how information is structured for comprehension (output side); OE owns how processes are structured for effective execution (input side). |
| **Cognitive Engineering** | The discipline of structuring information for actual human and agent comprehension. Encompasses review templates, learning briefs, knowledge compression methodologies, progressive disclosure patterns, and cognitive adaptation strategies. The cognitive-engineering-agent is the DRI for this domain — it owns the methodology for how information should be presented, not the information itself. The system evolves through individual and collective feedback loops and progressively personalizes delivery based on how different contributors absorb information. |
| **Progressive Disclosure** | An information architecture principle where content is layered (headline → summary → detail → deep dive) so that a reader can stop at any layer and have a coherent understanding appropriate to that depth. The core structural pattern used in all cognitive engineering templates. |
| **Workspace Contract** | The single configuration file (`syntropy.toml`) that defines a workspace's structure, services, conventions, and behavior. Schema-validated, versioned, and the only config file humans review. Unknown keys are errors. |
| **Workspace Instance** | The `.syntropy/` directory that contains both human-facing artifacts (tasks, system-of-work docs, signals) and machine-generated state (indexes, caches). Follows explicit checked-in vs ignored conventions. |
| **Workspace State** | The structured, machine-readable output of `syntropy state --json` — a hydration contract that provides agents and tools with a complete understanding of the workspace without parsing files or inferring meaning. |
| **PatchSet** | A transactional set of file changes produced by the plan/apply engine. Previewed before application, applied atomically, and reversible. The unit of workspace mutation. |
| **Plan/Apply** | The transactional pattern where structural changes to a workspace are first previewed as a patchset (plan), reviewed by the operator, and then executed atomically (apply). All platform mutations use this pattern. |
| **Blueprint** | A reusable template that defines the structure, files, and configuration for a new workspace component (service, app, crate). Platform-provided blueprints cover standard patterns; projects can define custom blueprints in `.syntropy/system-of-work/templates/`. |
| **Validation Report** | The deterministic, machine-readable output of `syntropy validate --json` — a contract that enumerates all structural violations, dependency issues, and convention drift in a workspace. Each violation has an error code, location, and fix hint. |
| **North Star Layout** | The canonical repository structure that the Syntropy platform targets. Everything in the repo is one of five categories: Platform (reusable foundation), Products (shipped surfaces), Tooling (build/CI/devex), Workspaces (fixtures/templates), and Instance (`.syntropy/`). |
| **Trait** | A composable set of context, rules, and workflows that an agent inherits. Agents are composed from base traits + domain-specific traits. |
