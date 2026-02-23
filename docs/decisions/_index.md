---
id: "decisions-index"
type: reference
title: "Decision Log"
status: active
owner: decisions-agent
created: 2025-02-07
updated: 2026-02-23
refs:
  related: [dp13, decisions-agent, wf-record-decision, wf-make-decision]
---

# Decision Log

Decision records for Syntropy OS. All decisions — architecture, product, process, methodology, convention — are logged here, not buried in conversation.

The decision log is the entry point to the **reasoning graph**: the interconnected set of decisions that explains why everything in the system is the way it is. For the feature spec, see DP13. For the capture workflow, see `wf-record-decision`.

## Architecture Decision Records (ADRs)

| ID | Title | Status | Type | Date |
|----|-------|--------|------|------|
| ADR-001 | Firebase as Backend Platform | accepted | Type 1 | 2025-02-07 |
| ADR-002 | Event Sourcing on Firestore | accepted | Type 1 | 2025-02-07 |
| ADR-003 | Claude as Primary LLM | accepted | Type 1 | 2025-02-07 |
| ADR-004 | Hybrid Domain-Package Monorepo Architecture | accepted | Type 1 | 2025-02-09 |
| ADR-005 | Dev Container and Build Container Strategy | accepted | Type 1 | 2025-02-09 |

## General Decision Records (DRs)

| ID | Title | Status | Type | Domain | Date |
|----|-------|--------|------|--------|------|
| DR-001 | Repo Structure Contract + Folder Contracts | accepted | Type 1 | workspace-contracts | 2026-02-23 |
| DR-002 | Verb-First CLI Command Grammar | accepted | Type 2 | workspace-contracts | 2026-02-23 |

Use `wf-record-decision` to capture additional decisions.
