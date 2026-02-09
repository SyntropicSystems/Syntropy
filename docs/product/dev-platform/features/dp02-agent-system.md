---
id: "dp02"
type: feature-spec
title: "Agent System"
status: defining
owner: meta-agent
priority: P0
created: 2025-02-09
updated: 2025-02-09
refs:
  depends-on: [dp01, dp05]
  enables: [dp03, dp-u01, dp-u02, dp-u03]
  related: [dp08, base-traits, meta-agent]
  informed-by: [jtbd-dev-platform]
tags: [dev-platform, core, agents, p0]
---

# DP02 — Agent System

## Summary

A trait-based composition system where specialized agents own different domains of the product. Every agent inherits shared base traits (context, rules, workflows) and composes its own domain-specific capabilities. Agents can be humans or AI — the manifests define scope, authority, and process regardless of executor.

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

Each agent manifest defines:
- **Identity**: name, scope, what it's the DRI (Directly Responsible Individual) for
- **Inherited context**: which files to load before doing anything
- **Own context**: additional files specific to this agent's domain
- **Own rules**: domain-specific constraints and practices
- **Own workflows**: processes this agent can execute
- **Decision authority**: what it can decide autonomously vs. what requires escalation
- **Delegates to / Delegated from**: how work flows between agents

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
- Enables: DP03 (Workflow Engine) — agents execute workflows

## Open Questions

- [ ] When should a feature get its own feature agent vs. staying under a domain agent?
- [ ] Should agents have explicit "handoff protocols" for cross-domain work?
- [ ] How do we handle conflicting agent decisions (e.g., product-agent vs. architecture-agent)?
