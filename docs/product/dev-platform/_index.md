---
id: "dp-product-index"
type: reference
title: "Dev Platform Product Domain"
status: active
owner: meta-agent
created: 2025-02-09
updated: 2026-02-25
refs:
  related: [el-feature-derivation, experience-layer, experience-layer-index, jtbd-dev-platform, personality-layer-index, product-index, surf-dev-platform]
tags: [dev-platform, product, index]
---

# Dev Platform Product Domain

Overview of the development platform as a product. This domain covers what the dev platform does — its features, use cases, user stories, and how it serves its consumers (developers, AI agents, and future tooling).

The dev platform is the knowledge graph and agent system used to build Syntropy OS. It is documented here with the same rigor as the application itself.

## Jobs to Be Done

14 core jobs → `docs/vision/jtbd-dev-platform.md`

## Feature Map

### P0 — Critical (Foundation)
- **DP01** — Knowledge Graph: Markdown files with frontmatter, stable IDs, bidirectional refs → `features/dp01-knowledge-graph.md`
- **DP02** — Agent System: Trait-based composition, domain and feature agents → `features/dp02-agent-system.md`
- **DP03** — Workflow Engine: Executable process documents for humans and AI → `features/dp03-workflow-engine.md`
- **DP04** — Registry & Changelog: Master index and append-only change log → `features/dp04-registry-changelog.md`
- **DP05** — Convention System: Templates, naming rules, frontmatter standards → `features/dp05-convention-system.md`
- **DP08** — Entry Point Routing: AGENTS.md → router → domain graph navigation → `features/dp08-entry-point-routing.md`
- **DP09** — Domain Context Sync: Living domain state, drift detection, DRI review → `features/dp09-domain-context-sync.md`
- **DP10** — Observation System: Zero-barrier signal capture, audit, pattern detection, upleveling → `features/dp10-observation-system.md`
- **DP11** — Reflection Loop: Post-work personal reflection feeding the observation system → `features/dp11-reflection-loop.md`
- **DP13** — Decision Records: Reasoning graph for all decisions, hierarchy, domain scoping, revisit triggers → `features/dp13-decision-records.md`

### P1 — High Priority
- **DP06** — Surface Definitions: Platform delivery specs for each surface → `features/dp06-surface-definitions.md`
- **DP07** — Prototype System: Interactive React JSX for design exploration → `features/dp07-prototype-system.md`
- **DP12** — Pulse Companion: Personalized work companion, assisted reflection, continuous pulse → `features/dp12-pulse-companion.md`
- **DP14** — Cognitive Engineering: Review templates, learning methodologies, knowledge compression, cognitive adaptation → `features/dp14-cognitive-engineering.md`
- **DP15** — Operational Engineering: Workflow design, rule design, context architecture, actor effectiveness methodology → `features/dp15-operational-engineering.md`
- **DP16** — Experience Layer: Satisfaction architecture — core loops, progression, companion evolution, social layer, world map, narrative, expression → `features/dp16-experience-layer.md`
  - Module deep-dives → `experience-layer/` (11 modules with derivable features framework)
  - Vision & Philosophy → `docs/vision/experience-layer.md`
  - Architecture → `docs/architecture/experience-layer.md`
- **DP17** — Personality Layer: Procedural agent character — personality stack, role archetypes, voice sheets, flavor pools, memory/moments → `features/dp17-personality-layer.md`
  - Module deep-dives → `personality-layer/` (9 modules with derivable features framework)
  - Vision & Philosophy → `docs/vision/personality-layer.md`
  - Architecture → `docs/architecture/personality-layer.md`

## Use Cases

17 concrete usage scenarios → `use-cases/`

## User Stories

Dev platform user stories → `user-stories/stories-dev-platform.md`
