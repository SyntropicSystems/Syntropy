---
id: "personality-layer-index"
type: reference
title: "Personality Layer Module Index"
status: active
owner: pulse-companion-agent
created: 2026-02-24
updated: 2026-02-24
refs:
  depends-on: [dp17, personality-layer]
  related: [dp-product-index, dp02, dp12, dp16, experience-layer-index]
tags: [dev-platform, personality-layer, index]
---

# Personality Layer — Module Index

The Personality Layer is documented as a modular system. Each module is a self-contained deep-dive that can be explored, extended, and evolved independently.

## Navigation

- **Vision & Philosophy**: `docs/vision/personality-layer.md` — Why the personality layer exists, the Borderlands insight
- **Feature Spec**: `docs/product/dev-platform/features/dp17-personality-layer.md` — Capabilities, phases, integration
- **Architecture**: `docs/architecture/personality-layer.md` — File structure, generation pipeline, memory persistence
- **This Index**: You are here — module navigation

## Modules

### Foundation

| Module | File | Summary |
|--------|------|---------|
| Personality Stack | `personality-stack.md` | The five layers (Function, Tone, Brand, Voice, Moments) and their hierarchy |
| Design Pillars | `design-pillars.md` | The six non-negotiable rules governing all agent personality |

### Character System

| Module | File | Summary |
|--------|------|---------|
| Role Archetypes | `role-archetypes.md` | The five base archetypes: Navigator, Artisan, Scout, Sentinel, Custodian |
| Voice Sheets | `voice-sheets.md` | Per-agent character definitions, vocabulary, quirks, relationships |

### Generation Engine

| Module | File | Summary |
|--------|------|---------|
| Procedural Engine | `procedural-engine.md` | Templates, flavor pools, novelty system, handoff messages |
| Memory & Moments | `memory-moments.md` | Milestones, callbacks, rare earned events, statistics tracking |

### Operations

| Module | File | Summary |
|--------|------|---------|
| Governance | `governance.md` | Evolution, contribution, anti-patterns, the "Does This Feel Like Us?" test |
| Implementation | `implementation.md` | File structure, integration points, configuration levels, first five minutes |

### Meta

| Module | File | Summary |
|--------|------|---------|
| Feature Derivation | `feature-derivation.md` | Framework for extracting concrete product features from the Personality Layer |

## How to Extend

To add a new module:

1. Create a markdown file in this directory: `kebab-case-name.md`
2. Add standard frontmatter with `type: module` referencing `dp17` and `personality-layer`
3. Add a row to the appropriate table in this index
4. Update `docs/vision/personality-layer.md` module table
5. If introducing new concepts, update `docs/vision/glossary.md`

To add a new archetype:

1. Follow the process in `governance.md`
2. Define the 6-dimension table in `role-archetypes.md`
3. Create a new archetype YAML in `archetypes/` (see `implementation.md`)
4. Create flavor pools in `flavor/pools/`
5. Validate against design pillars

## Relationship to Experience Layer

The Personality Layer is *prerequisite* to the Experience Layer:

```
Experience Layer (satisfaction, progression, narrative)
       |
       | builds on
       v
Personality Layer (character, warmth, memory)    <- THIS
       |
       | enriches
       v
System of Work (structure, workflows, domains)
```

The Experience Layer modules reference personality concepts:
- Companion evolution builds on voice sheet foundations
- Achievement moments build on the memory/milestone system
- Session feedback builds on template/flavor pool system
