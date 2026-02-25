---
id: "dp02"
type: feature-spec
title: "Agent System"
status: defining
owner: meta-agent
priority: P0
created: 2025-02-09
updated: 2026-02-25
refs:
  depends-on: [dp01, dp05]
  enables: [dp-u01, dp-u02, dp-u03, dp-u06, dp-u07, dp-u09, dp03, dp09, dp10, dp11, dp12, dp14, dp15, dp16, dp18]
  informed-by: [jtbd-dev-platform]
  related: [arch-personality-layer, base-traits, dp-stories, dp-u14, dp-u15, dp-u16, dp-u17, dp08, dp09, dp13, dp17, el-companion, meta-agent, operational-engineering-agent, personality-layer, personality-layer-index, pl-role-archetypes, surf-dev-platform, wf-domain-review, wf-sync-domain-context]
tags: [dev-platform, core, agents, p0]
---

# DP02 — Agent System

## Summary

A trait-based composition system where specialized agents own different domains of work. Canonical agent specs live in the System of Work under `.syntropy/system-of-work/domains/**`, and tool-specific adapters (Claude/Codex) are generated from that single source of truth.

## Jobs Addressed

- DJ2 — Enable Humans and AI Agents to Execute the Same Processes (primary)
- DJ4 — Scale Development Complexity Without Restructuring (secondary)

## How It Works

### Trait Inheritance

- `.syntropy/system-of-work/domains/system/_base-traits.md` defines context, rules, and workflows inherited by every agent
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
- **Domain State**: living snapshot of the domain’s current understanding (lives in the domain `CONTEXT.md`; see DP09)

### Canonical vs Generated

- **Canonical source of truth**: `.syntropy/system-of-work/domains/**`
- **Generated adapters (checked in)**:
  - `.claude/agents/**` and `.claude/commands/**`
  - `.codex/**`
- Regenerate and drift-check:
  - `cargo run -p syntropy -- gen agents`
  - `cargo run -p syntropy -- gen agents --check`

### Routing

- The meta-agent acts as orchestrator — it knows all agents and routes work to the right one
- Work enters through AGENTS.md → `.syntropy/system-of-work/ROUTER.md` → domain agent → (optionally) feature agent
- Agents escalate across domain boundaries; they don't reach into other agents' scope

### Current Agents

| Agent | Scope |
|-------|-------|
| meta-agent | Orchestration, routing, SoW integrity |
| bazel-agent | Build graph + Bazel/module hygiene |
| devex-agent | Bootstrap + developer experience |
| tasks-agent | Planning + verification discipline |
| product-agent | Features, use cases, stories, JTBD |
| architecture-agent | Stack, data model, event sourcing, AI pipeline |
| ux-agent | UX patterns, design, prototypes |
| integration-agent | External integrations (Gmail, Calendar, etc.) |
| workspace-contracts-agent | Workspace contracts, validation, scaffolding, repo structure |
| observations-agent | Observation capture, structuring, pattern detection |
| decisions-agent | Decision records, reasoning graph integrity |
| cognitive-engineering-agent | Information architecture for comprehension |
| operational-engineering-agent | Workflow/rule/context design methodology |
| pulse-companion-agent | Assisted reflection, continuous pulse loop |
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
