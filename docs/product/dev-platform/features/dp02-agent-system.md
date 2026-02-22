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

This system operates within the [Heterogeneous Agent Architecture](../../architecture/agent-architecture.md): human contributors are Organic Agents, AI models are Probabilistic Agents, and validation/enforcement code is Deterministic Agents. Every agent — regardless of type — is composed of the same [9 Internal Components](../../architecture/agent-architecture.md#the-9-internal-components) (Capabilities, Attributes, Skills, Memory, Internal Context, Internal State, Traits, Policies, Workflows). The trait-based composition defines *what* an agent owns; the Decision Profile summarizes *how* its components interact; the 9 Internal Components provide the *detail* of what fills each slot for that specific agent.

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

Each agent manifest defines the agent's [Internal Components](../../architecture/agent-architecture.md#the-9-internal-components) in dev-platform terms:

- **Identity**: name, scope, what it's the DRI (Directly Responsible Individual) for
- **Inherited context**: files loaded before doing anything → populates the agent's **Memory** (background knowledge)
- **Own context**: additional domain-specific files → extends **Memory** with specialized knowledge
- **Own rules**: domain-specific constraints and practices → defines the agent's **Policies** (behavioral guidelines)
- **Own workflows**: processes this agent can execute → defines the agent's **Workflows** (procedures) and **Skills** (executable actions)
- **Decision authority**: what it can decide autonomously vs. what requires escalation → maps to the agent's **Boundary of Trust** and **Capabilities** boundary
- **Delegates to / Delegated from**: how work flows between agents → interaction between agents' **Skills** and **Internal Context**
- **Domain State**: living snapshot of the domain's current understanding (see DP09) → the agent's active **Internal Context** and **Internal State**

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
