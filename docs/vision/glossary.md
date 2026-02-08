---
id: "glossary"
type: vision
title: "Glossary"
status: active
owner: meta-agent
created: 2025-02-07
updated: 2025-02-07
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
| **DRI** | Directly Responsible Individual — the agent (human or AI) that owns a domain and is accountable for its correctness. |
| **Trait** | A composable set of context, rules, and workflows that an agent inherits. Agents are composed from base traits + domain-specific traits. |
