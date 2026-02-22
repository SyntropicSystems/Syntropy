---
id: "dp02"
type: feature-spec
title: "Agent System"
status: defining
owner: meta-agent
priority: P0
created: 2025-02-09
updated: 2026-02-22
refs:
  depends-on: [dp01, dp05]
  enables: [dp03, dp09, dp-u01, dp-u02, dp-u03, dp-u06, dp-u07]
  related: [dp08, dp09, base-traits, meta-agent, arch-agent-architecture]
  informed-by: [jtbd-dev-platform]
tags: [dev-platform, core, agents, p0]
---

# DP02 — Agent System

## Summary

A trait-based composition system where specialized agents own different domains of the product. Every agent inherits shared base traits (context, rules, workflows) and composes its own domain-specific capabilities. Agents can be humans or AI — the manifests define scope, authority, and process regardless of executor.

This system operates within the [Heterogeneous Agent Architecture](../../architecture/agent-architecture.md): human contributors are Organic Actors, AI models are Probabilistic Actors, and validation/enforcement code is Deterministic Actors. Every agent — regardless of type — is described by the same [22-Term Agent Ontology](../../architecture/agent-architecture.md#the-22-term-agent-ontology) and exists within the Entity Hierarchy (Entity → Material → Artifact → Instrument → Actor). The trait-based composition defines *what* an agent owns; the Decision Profile summarizes *how* its ontology terms interact; agent manifests are Artifacts that, when loaded by an Actor, become the Instrument through which work is executed.

## Jobs Addressed

- DJ2 — Enable Humans and AI Agents to Execute the Same Processes (primary)
- DJ4 — Scale Development Complexity Without Restructuring (secondary)

## How It Works

### Trait Inheritance

- `_base-traits.md` defines context, rules, and workflows inherited by every agent
- Domain agents (product, architecture, UX, integration) inherit base traits and add their own
- Feature agents inherit from both base traits and a parent domain agent, adding deep specialization
- Inheritance is declared explicitly in each agent's manifest — no implicit behavior

### Agent Manifest Structure

Each agent manifest is an Artifact (shaped markdown with Affordance: Load, Execute) that defines the agent's [ontology terms](../../architecture/agent-architecture.md#the-22-term-agent-ontology) in dev-platform terms:

- **Identity**: name, scope, what it's the DRI for — defines the agent's **Mission** scope
- **Inherited context**: files loaded before doing anything → populates **Memory** (background knowledge)
- **Own context**: additional domain-specific files → extends **Memory** with specialized knowledge
- **Own rules**: domain-specific constraints → defines **Policies** (behavioral guidelines) and **Rules** (enforceable constraints)
- **Own workflows**: processes this agent can execute → defines **Workflows** (procedures) and **Skills** (executable Actions)
- **Decision authority**: what it can decide autonomously vs. escalate → maps to **Permissions** (the Boundary of Trust)
- **Delegates to / Delegated from**: how work flows between agents → defines the **Protocol** for inter-agent coordination
- **Domain State**: living snapshot of domain understanding (see DP09) → the agent's active **State** (Internal State + local knowledge)

### Routing

- The meta-agent acts as orchestrator — it knows all agents and routes work to the right one
- Work enters through CLAUDE.md → meta-agent → domain agent → (optionally) feature agent
- Agents escalate across domain boundaries; they don't reach into other agents' scope

### Current Agents

| Agent | Scope |
|-------|-------|
| meta-agent | Orchestration, routing, graph infrastructure |
| product-agent | Features, use cases, stories, JTBD |
| architecture-agent | Stack, data model, event sourcing, AI pipeline |
| ux-agent | UX patterns, design, prototypes |
| integration-agent | External integrations (Gmail, Calendar, etc.) |
| f04-ai-engine-agent | AI Action Engine deep work |
| f11-domains-agent | Domains/Spaces deep work |
| f12-artifact-agent | Artifact Intelligence deep work |

## Dependencies

- Requires: DP01 (Knowledge Graph) — agents navigate and modify the graph; DP05 (Convention System) — agent manifests follow conventions
- Enables: DP03 (Workflow Engine) — agents execute workflows; DP09 (Domain Context Sync) — agents maintain living domain state

## Open Questions

- [ ] When should a feature get its own feature agent vs. staying under a domain agent?
- [x] Should agents have explicit "handoff protocols" for cross-domain work? → Yes, addressed by DP09 Domain Context Sync: `wf-domain-review` for pre-merge handoff, `wf-sync-domain-context` for catch-up handoff
- [ ] How do we handle conflicting agent decisions (e.g., product-agent vs. architecture-agent)?
