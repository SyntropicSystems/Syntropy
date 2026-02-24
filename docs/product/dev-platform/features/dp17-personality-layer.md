---
id: "dp17"
type: feature-spec
title: "Personality Layer"
status: exploring
owner: pulse-companion-agent
priority: P1
created: 2026-02-24
updated: 2026-02-24
refs:
  depends-on: [dp02, dp03, dp09, jtbd-dev-platform]
  enables: [dp16]
  informed-by: [personality-layer, jtbd-dev-platform]
  related: [dp-stories, dp12, dp14, dp15, pulse-companion-agent, observations-agent]
tags: [dev-platform, personality-layer, agent-character, procedural-generation, flavor, p1]
---

# DP17 — Personality Layer

## Summary

A procedural personality system for AI agents — inspired by Borderlands' manufacturer system — that makes every agent interaction feel authored, warm, and human without requiring per-interaction creative effort. Personality is composed from constrained building blocks (archetypes, flavor pools, voice sheets, memory) so that hundreds of agents can produce content that *feels* like one voice wrote it, because the system enforces coherence by construction, not by review.

Not decoration bolted onto function, but architecture that generates character from rules. The Personality Layer is the third layer of the platform stack (Platform -> System of Work -> Personality -> Experience), providing the warmth that transforms functional interactions into human-feeling ones.

## Problem

The System of Work provides structure, consistency, and reliability. But its output is mechanical:

- Agent responses are functional but lifeless ("3 files modified. Tests passing.")
- There's no sense that a team of agents with distinct perspectives worked together
- Status messages, handoffs, and summaries are interchangeable — no character
- Long sessions feel like talking to a terminal, not collaborating with colleagues
- New contributors don't develop a relationship with the system's agents
- The difference between a good session and a great one is invisible
- Personality attempts without architecture produce inconsistency or cringe

The Personality Layer solves these by applying Borderlands' key insight: personality generated from constrained systems feels more authentic than personality written freehand, and it scales.

## Jobs Addressed

- **DJ10** — Support Each Contributor with a Personalized Work Companion (primary)
- **DJ14** — Make the Experience of Building Things Together Intrinsically Satisfying (primary)
- **DJ7** — Preserve Domain Expertise and Enable Fast Context Recovery (secondary — personality aids memory and context)

## Core Capabilities

### C1 — Five-Layer Personality Stack

A layered architecture where each layer can only add to or style the layers below it:

- **Layer 1: Function** (sacred, immutable) — Output accuracy, error clarity, correctness
- **Layer 2: Tone** (platform-wide) — Design pillars that govern all agent communication
- **Layer 3: Brand** (per-role archetype) — Role-specific output conventions and flavor
- **Layer 4: Voice** (per-agent instance) — Individual character sheets with vocabulary, quirks, relationships
- **Layer 5: Moments** (memory-tracked, rare) — Earned callbacks, milestones, running gags

Module: `docs/product/dev-platform/personality-layer/personality-stack.md`

### C2 — Design Pillars

Six non-negotiable rules for all agent personality:

1. Function Is Sacred — personality never degrades output accuracy
2. Character Lives in the Margins — personality around work products, never inside
3. One Sentence Max — personality commentary capped per output block
4. Warmth Over Wit — competence as edge, not snark
5. Earned, Not Imposed — depth accumulates through memory system
6. Pattern Breakage Budget — ~1 memorable moment per 20 task completions

Module: `docs/product/dev-platform/personality-layer/design-pillars.md`

### C3 — Role Archetypes

Five base archetypes (like Borderlands manufacturers) that define the constraints producing consistent flavor:

- **Navigator** (Planner/Orchestrator): Calm authority, architectural vocabulary, dry about estimate accuracy
- **Artisan** (Code Writer/Implementer): Quiet satisfaction, craftsmanship vocabulary, opinions about code style
- **Scout** (Explorer/Analyzer): Eager curiosity, archaeological vocabulary, genuinely excited by structure
- **Sentinel** (Reviewer/Quality Gate): Dry observation, veteran vocabulary, tracks recurrence of anti-patterns
- **Custodian** (Formatter/Cleanup): Enthusiastic about mundane tasks, celebrates small wins — the Claptrap of the team

Each archetype defines: philosophy, mechanical identity, output convention, flavor vocabulary, voice range, and edge.

Module: `docs/product/dev-platform/personality-layer/role-archetypes.md`

### C4 — Procedural Personality Engine

The template and flavor pool system that generates personality at scale:

- **Template System**: Role-constrained message templates with fill slots (task start, task complete, error, handoff)
- **Flavor Pools**: Curated one-liner lists per archetype (approval, suspicion, weariness, recurrence, etc.)
- **Novelty System**: Anti-repetition mechanism tracking recent selections, weighting by inverse recency
- **Handoff Templates**: Agent-to-agent delegation and return messages with character

Module: `docs/product/dev-platform/personality-layer/procedural-engine.md`

### C5 — Memory & Moments System

Earned personality depth through accumulated state:

- **Statistics Tracking**: Total tasks, consecutive green builds, deepest directory explored, records
- **Pattern Tracking**: Recurring issues with count and last-seen timestamps
- **Milestones**: Threshold-triggered announcements (100 tasks, 25 consecutive greens, first revert)
- **Callbacks**: Named past events that agents can reference ("that time Scout found jQuery from 2019")
- **Moment Triggers**: Rare events (streak callouts, personal bests, discoveries, clean sweeps)

Module: `docs/product/dev-platform/personality-layer/memory-moments.md`

### C6 — Voice Sheets

Per-agent character definitions — the equivalent of Borderlands character bible entries:

- Core trait, humor style, vocabulary preferences/avoidances
- Quirks (specific behavioral patterns)
- Relationship dynamics with other agents
- Constraints (max personality words, punctuation rules, emoji policy)
- Graceful degradation at different personality levels

Module: `docs/product/dev-platform/personality-layer/voice-sheets.md`

### C7 — Governance & Evolution

How the personality system grows and stays coherent:

- Adding new archetypes (6-dimension definition, flavor pools, voice sheets, validation)
- Contributing to flavor pools (open-door policy, one-sentence test, read-it-50-times test)
- Retiring stale entries (selection-to-skip tracking, demotion, archival)
- The "Does This Feel Like Us?" five-question quality test
- Anti-patterns (no performative arguments, no code-shaming, no memory fabrication)

Module: `docs/product/dev-platform/personality-layer/governance.md`

### C8 — Configuration & Graceful Degradation

Four personality levels that gracefully degrade:

- **Full**: All 5 layers active. Flavor pools, moments, callbacks.
- **Professional**: Layers 1-3 active. Archetypes shape output style, no individual voice quirks.
- **Minimal**: Layers 1-2 only. Warm but generic. No character.
- **Off**: Layer 1 only. Pure function. Machine output.

Module: `docs/product/dev-platform/personality-layer/implementation.md`

## Integration Points

| System | Integration |
|--------|------------|
| Agent System (DP02) | Agents inherit personality from archetype + voice sheet |
| Workflow Engine (DP03) | Handoff templates used during agent delegation |
| Domain Context Sync (DP09) | Domain-specific flavor vocabulary |
| Pulse Companion (DP12) | Companion personality foundation |
| Experience Layer (DP16) | Personality feeds into experience satisfaction |
| System Prompts | Voice sheet constraints injected into agent prompts |
| Hook Events | PostToolUse hooks inject personality into status messages |
| Team Memory | Accumulated state persisted in workspace instance |

## Relationship to Existing Features

- **DP02 (Agent System)**: Agents gain personality through the archetype/voice sheet system. The agent trait composition model extends to include personality traits.
- **DP12 (Pulse Companion)**: The companion's personality is defined through the Personality Layer's voice sheet system. Companion evolution (from the Experience Layer) builds on personality foundation.
- **DP16 (Experience Layer)**: The Experience Layer sits above the Personality Layer. Personality provides warmth; the Experience Layer provides satisfaction, progression, and meaning.

## Phases

### Phase 0 — Design Pillars & Archetypes
- Document the six design pillars
- Define the five role archetypes with full 6-dimension tables
- Create initial voice sheets for primary agents
- Zero new infrastructure — system prompt changes only

### Phase 1 — Template System
- Implement status message templates per archetype
- Create initial flavor pools (minimum 4 entries per category)
- Template fill system with basic randomization
- Integration with agent system prompts

### Phase 2 — Flavor Pools & Novelty
- Full flavor pool library across all archetypes
- Novelty tracking (anti-repetition mechanism)
- Handoff templates for agent-to-agent delegation
- Community contribution pipeline for flavor entries

### Phase 3 — Memory System
- Statistics tracking (tasks, builds, records)
- Pattern tracking (recurring issues)
- Milestone definitions and announcement templates
- Callback registration and reference system

### Phase 4 — Moments & Full Evolution
- Moment trigger system (rare earned events)
- Full five-layer stack active
- Voice sheet evolution through interaction
- Personality configuration levels (full -> off)

### Phase 5 — Platform Integration
- Hook-based personality injection
- Cross-agent personality awareness (agents acknowledge each other)
- Memory persistence across sessions
- Integration with Experience Layer companion evolution

## Dependencies

- Requires: DP02 (Agent System) — agents to inhabit; DP03 (Workflow Engine) — handoff context; DP09 (Domain Context Sync) — domain-aware vocabulary
- Enables: DP16 (Experience Layer) — personality is prerequisite for experience satisfaction
- Related: DP12 (Pulse Companion) — companion personality; DP14 (Cognitive Engineering) — how personality-enriched output is structured for comprehension

## Open Questions

- [ ] How do personality voice sheets interact with the existing agent trait composition model?
- [ ] What's the right balance between archetype consistency and individual agent uniqueness?
- [ ] How do we prevent flavor pool staleness over time?
- [ ] Should personality levels be per-user preference or per-project configuration?
- [ ] How does the memory system persist across different AI models (Opus, Sonnet)?
- [ ] What's the performance impact of flavor pool selection and novelty tracking?
- [ ] How do we handle personality in multi-agent conversations (party dynamics)?
- [ ] Should the Custodian archetype (the Claptrap) be opt-in given its higher personality intensity?
