---
id: "experience-layer-index"
type: reference
title: "Experience Layer Module Index"
status: active
owner: pulse-companion-agent
created: 2026-02-24
updated: 2026-02-25
refs:
  depends-on: [dp16, experience-layer]
  related: [dp-product-index, dp12, dp14, dp15, personality-layer-index]
tags: [dev-platform, experience-layer, index]
---

# Experience Layer — Module Index

The Experience Layer is documented as a modular system. Each module is a self-contained deep-dive that can be explored, extended, and evolved independently. New modules can be added as the system grows.

## Navigation

- **Vision & Philosophy**: `docs/vision/experience-layer.md` — Why the experience layer exists
- **Feature Spec**: `docs/product/dev-platform/features/dp16-experience-layer.md` — Capabilities, phases, integration
- **Architecture**: `docs/architecture/experience-layer.md` — Data model, state, technical design
- **This Index**: You are here — module navigation

## Modules

### Foundation

| Module | File | Summary |
|--------|------|---------|
| Core Loops | `core-loops.md` | The three nested feedback loops (Moment, Session, Adventure) that provide satisfaction at every timescale |
| Apprenticeship | `apprenticeship.md` | Learning residue, anti-dependency architecture, craft dimensions, the unconscious curriculum |
| Anti-Patterns | `anti-patterns.md` | What the Experience Layer is NOT, failure modes to avoid, the hard rules |

### Systems

| Module | File | Summary |
|--------|------|---------|
| Progression | `progression.md` | Pattern Journal, Emergent Archetypes, Collaboration Manual, Loot, Achievements, Growth Coaching |
| Companion | `companion.md` | AI as translation layer, companion evolution stages, agent-to-agent communication, boundary ethics |
| Social | `social.md` | Guilds (domain, interest, quest), contribution economy, introvert support, shared adventures |

### World

| Module | File | Summary |
|--------|------|---------|
| World Map | `world-map.md` | Exploration, fog of war, familiarity tracking, environmental storytelling, fast travel, discovery engine |
| Narrative | `narrative.md` | Efforts as quests, meta-narrative, lore as knowledge, discovery logs |
| Expression & Crafting | `expression-crafting.md` | Customization, crafting tiers, blueprints, experimentation sandbox |

### Meta

| Module | File | Summary |
|--------|------|---------|
| Phasing | `phasing.md` | Implementation roadmap from Phase 0 (warm feedback) to Phase 6 (narrative), minimum viable experience |
| Feature Derivation | `feature-derivation.md` | Framework for extracting concrete product features, methodologies, and experiments from the Experience Layer |

## How to Extend

To add a new module:

1. Create a new markdown file in this directory following the naming convention: `kebab-case-name.md`
2. Add standard frontmatter with `type: module`
3. Reference `dp16` and `experience-layer` in the `refs` block
4. Add a row to the appropriate table in this index
5. Update `docs/vision/experience-layer.md` module table
6. If the module introduces new concepts, update `docs/vision/glossary.md`

## Related Features

The Experience Layer builds on and extends these existing features:

- **DP12 — Pulse Companion**: The companion that the Experience Layer evolves into a full translation/social layer
- **DP14 — Cognitive Engineering**: How experience information is structured for comprehension
- **DP15 — Operational Engineering**: How experience workflows are designed for different actors
- **DP10 — Observation System**: Signal capture that feeds the discovery engine and pattern journal
- **DP11 — Reflection Loop**: The session loop's reflection step, enriched with experience context
