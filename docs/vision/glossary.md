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
| **Trait** | A composable set of context, rules, and workflows that an agent inherits. Agents are composed from base traits + domain-specific traits. |
