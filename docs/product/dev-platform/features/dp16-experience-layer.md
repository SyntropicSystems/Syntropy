---
id: "dp16"
type: feature-spec
title: "Experience Layer"
status: exploring
owner: pulse-companion-agent
priority: P1
created: 2026-02-24
updated: 2026-02-24
refs:
  depends-on: [dp02, dp03, dp09, dp10, dp11, dp12, dp14, dp15, jtbd-dev-platform]
  enables: []
  informed-by: [experience-layer, jtbd-dev-platform]
  related: [dp-stories, dp01, dp13, dp17, cognitive-engineering-agent, operational-engineering-agent, pulse-companion-agent, observations-agent]
tags: [dev-platform, experience-layer, game-design, satisfaction-architecture, progression, companion, social, p1]
---

# DP16 — Experience Layer

## Summary

A satisfaction architecture that makes every interaction between humans and AI intrinsically rewarding — through genuine agency, mastery, discovery, expression, belonging, and purposeful progress. Not gamification (badges on work), but experience design: the substrate that makes building things together feel like an adventure worth having.

The Experience Layer is the fourth layer of the platform stack (Platform -> System of Work -> Personality -> Experience). It transforms the System of Work's structured collaboration into a lived experience with progression, narrative, social connection, and discovery. Each capability can be adopted independently, and the full system creates emergent satisfaction that no single capability provides alone.

## Problem

The System of Work provides structure, consistency, and reliability. The Personality Layer provides warmth and character. But neither addresses the fundamental problem of *motivation and meaning*:

- Work loops (commit-push-CI-merge) are designed for throughput, not experience
- Growth is invisible — contributors don't see their own trajectory
- Expertise is siloed — what you know doesn't naturally become visible to others who need it
- Social connection is friction-heavy — finding the right person to collaborate with requires effort
- Discovery is accidental — insights about the codebase, the domain, and the system are found or lost randomly
- Contribution is invisible — the ripple effects of good work aren't traced or acknowledged
- Context is lost — returning to a domain means rebuilding understanding from scratch

The Experience Layer solves these by applying game design principles — not game mechanics, but the *experience architecture* that makes games intrinsically satisfying.

## Jobs Addressed

- **DJ9** — Enable Continuous Self-Improvement Through Honest Reflection (primary)
- **DJ10** — Support Each Contributor with a Personalized Work Companion (primary)
- **DJ7** — Preserve Domain Expertise and Enable Fast Context Recovery (secondary)
- **DJ8** — Capture and Surface Emergent Signals from All Contributors (secondary)
- **DJ14** — Make the Experience of Building Things Together Intrinsically Satisfying (proposed new job)

## Core Capabilities

### C1 — Core Loops

Three nested feedback loops that provide satisfaction at every timescale:

- **Moment Loop** (seconds-minutes): Act -> See Result -> Feel Progress -> Act Again. Every interaction has immediate, contextual feedback within 2 seconds.
- **Session Loop** (hours-days): Engage -> Build -> Verify -> Ship -> Reflect. Work sessions have clear entry, mounting tension, satisfying resolution, meaningful reflection, and "loot" (something you take with you).
- **Adventure Loop** (weeks-months): Quest -> Discovery -> Growth -> New Territory -> Harder Quest. Over time, your capabilities grow, new territory opens up, and the problems you face are harder but you're more capable.

The magic is in the transitions between loops: satisfying moments create satisfying sessions; sessions produce artifacts that accumulate into adventure-level progress; growing capability changes how moments feel.

Module: `docs/product/dev-platform/experience-layer/core-loops.md`

### C2 — Apprenticeship System

Every AI interaction leaves **learning residue** — understanding that accumulates imperceptibly until one day you realize you know things you never explicitly studied:

- Show the why alongside the what (not lectures, but context)
- Surface the pattern, not just the instance
- Connect new to known (link concepts to your existing understanding)
- Increase altitude over time (less foundation, more nuance as you grow)
- Never quiz, never lecture, never condescend

The system tracks this through the North Star Test: can the human explain their domain, even if they didn't write the code? The anti-dependency architecture ensures the AI builds understanding, not dependency.

Module: `docs/product/dev-platform/experience-layer/apprenticeship.md`

### C3 — Progression System

Growth is reflected, not scored. The system observes and mirrors — it doesn't rank:

- **Pattern Journal**: A timestamped record of work, growth, and observations — the story of who you're becoming. Not a scorecard, but a mirror.
- **Emergent Archetypes**: Your working style emerges from your actions (The Foundry, The Archaeologist, The Cartographer). Not assigned labels — recognized patterns.
- **Collaboration Manual**: A "how to play co-op with me" profile — strengths, learning edges, working style, communication preferences. Opt-in and self-controlled.
- **Loot System**: Every engagement produces something that persists and compounds — from common (task completed) through legendary (paradigm shift that improves the system for everyone).
- **Achievements**: Pattern recognition applied to work history — milestone, mastery, social, discovery, and hidden achievements.
- **Growth Coaching**: The system as personal coach, not judge — monthly reflections on trajectory, patterns, and growth direction.

Module: `docs/product/dev-platform/experience-layer/progression.md`

### C4 — Companion System

The AI companion is a **translation layer between you and the world**, not a relationship endpoint. Think dog park, not Her — the companion helps you connect with other humans:

- **Translation Layer**: Helps you understand others and be understood by others (communication style mapping, context bridging)
- **Social Router**: Knows who can help and gently pushes you toward them
- **Context Bridge**: Translates between different people's mental models and knowledge levels
- **Courage Amplifier**: Notices when you're hesitant and nudges you toward connection
- **Companion Evolution**: Interface -> Translator -> Navigator -> Spirit Animal (measured by how effectively it connects you to the world)
- **Agent-to-Agent Communication**: Companions negotiate collaboration setup, translation needs, and timing between humans

Module: `docs/product/dev-platform/experience-layer/companion.md`

### C5 — Social Layer

The companion system creates dyadic connections; the social layer scales to communities:

- **Domain Guilds**: Everyone who works in a domain, with companions sharing context
- **Interest Guilds**: Cross-cutting communities of practice
- **Quest Guilds**: Temporary groups formed for specific missions
- **Contribution Economy**: Visible impact, not leaderboards — ripple effects of contributions traced through the system
- **Introvert Support**: Different social styles (deep-diver, async communicator, observer, connector) explicitly supported

Module: `docs/product/dev-platform/experience-layer/social.md`

### C6 — World Map & Exploration

The codebase, knowledge graph, and organization are treated as **explorable spaces**:

- **Fog of War**: Parts of the system you haven't touched are visible in outline but reveal detail as you engage
- **Familiarity Tracking**: Genuine understanding that increases through engagement and decays with absence
- **Environmental Storytelling**: Ambient context — the commit history, ADRs, module age — surfaced as stories encountered while working
- **Fast Travel**: Context loading as first-class experience, with warm welcomes on return
- **Discovery Engine**: Active conditions for serendipitous insight (code archaeology, pattern recognition, hidden dependencies, anomaly surfacing)

Module: `docs/product/dev-platform/experience-layer/world-map.md`

### C7 — Narrative Layer

Work already has narrative structure — the Experience Layer makes it visible:

- **Efforts as Quests**: Each effort has chapters, a quest log, and narrative arc
- **Meta-Narrative**: The story of the platform itself, the team, the mission
- **Lore as Knowledge**: Documentation presented as narrative is documentation you remember
- **Discovery Log**: Personal and shared log of interesting findings with tier classification

Module: `docs/product/dev-platform/experience-layer/narrative.md`

### C8 — Expression & Crafting

Expression means your space, your companion, your workflows are *yours*:

- **Companion Customization**: Archetype, voice, name, earned personality quirks
- **Workspace Customization**: Status messages, dashboard layout, notification preferences, tool loadout
- **Workflow Style**: Guided vs. expert path, session rhythm, review style, communication style
- **Crafting System**: Assembling custom tools, workflows, and environments from composable parts (apprentice -> expert -> master -> architect tiers)
- **Blueprints**: Documented recipes for combining components, shareable and forkable
- **Experimentation Sandbox**: Exploration branches, prototype mode, "what if" analysis

Module: `docs/product/dev-platform/experience-layer/expression-crafting.md`

### C9 — Anti-Dependency Architecture

Structural safeguards against AI dependency:

- **Transparency, not magic**: Every AI action is visible, every reasoning available
- **Progressive delegation**: AI starts by doing things *with* you, showing its work. You delegate from knowledge, not ignorance.
- **Understanding checks**: The system observes whether you can reason about the code, not whether you can write it
- **Graceful skill building**: Incidents build understanding through post-incident reflection
- **The off switch**: Any layer can be disabled. The platform functions at every level.

Module: `docs/product/dev-platform/experience-layer/apprenticeship.md` (section)

### C10 — Designed Serendipity

The discovery engine actively creates conditions for insight:

- **"Did you know?" ambient context**: Relevant observations surfaced during work (one per session max)
- **Cross-pollination**: Patterns in one domain suggested for another
- **Anomaly surfacing**: Things that don't match expected patterns flagged conversationally
- **Discovery sharing**: Personal discoveries optionally shared to guild feeds

Module: `docs/product/dev-platform/experience-layer/world-map.md` (section)

## Integration Points

| Existing System | Experience Layer Integration |
|----------------|------------------------------|
| Git commits | Contribution tracking, pattern journal updates, discovery triggers |
| PR reviews | Social achievements, quality feedback, influence tracking |
| CI/CD | Moment loop feedback, deployment achievements |
| Domain contexts | Fog of war, familiarity tracking, lore sourcing |
| Workflows | Quest structure, progression gating, crafting recipes |
| Signals | Discovery engine input, anomaly detection, narrative events |
| Agent configs | Companion personality, memory, evolution |
| Observation system | Pattern journal input, discovery log, collective intelligence |
| Pulse companion | Foundation for companion evolution, reflection integration |
| Cognitive engineering | How progression and discovery information is presented |
| Operational engineering | How experience workflows are designed for different actors |

## Relationship to Existing Features

- **DP12 (Pulse Companion)**: The Experience Layer extends the companion concept with evolution stages, agent-to-agent communication, and the translation layer model. DP12's reflection assistant becomes the entry point for C3 (Progression) and C4 (Companion).
- **DP14 (Cognitive Engineering)**: Provides the methodology for how experience-layer information (pattern journals, discovery logs, narrative) is structured for comprehension.
- **DP15 (Operational Engineering)**: Provides the methodology for how experience-layer workflows (crafting, exploration, reflection) are designed for different actors.
- **DP10 (Observation System)**: Experience layer events (discoveries, achievements, progression milestones) flow into the observation system as signals.
- **DP11 (Reflection Loop)**: The session loop's "reflect" step is the reflection loop, enriched with experience context.

## Phases

### Phase 0 — Warm Feedback (Foundation)
- AI companions have personality (Personality Layer prerequisite)
- Feedback on actions is contextual and warm
- Zero new infrastructure — system prompt engineering only

### Phase 1 — Session Awareness
- Session start/end recognition with context loading/unloading
- "Welcome back" experience with change summaries
- Session summaries with loot recognition

### Phase 2 — World Map
- Domains as explorable spaces with fog of war
- Familiarity tracking (per-user domain understanding)
- Fast travel (quick context loading) for known areas

### Phase 3 — Progression
- Pattern Journal derived from actual work history
- Achievement recognition for meaningful patterns
- Expert Path unlocking based on demonstrated capability

### Phase 4 — Companion Evolution
- Evolution stages based on interaction depth
- Companion memory and callbacks
- Personality evolution through shared experience

### Phase 5 — Social Layer
- Guild mechanics for teams and interest groups
- Shared discovery feed
- Contribution economy visibility

### Phase 6 — Narrative
- Efforts as quests with narrative structure
- Meta-narrative for the platform/organization
- Lore integration with knowledge management

Each phase delivers value independently. Each phase makes the next phase better.

## Dependencies

- Requires: DP12 (Pulse Companion) — companion foundation; DP10 (Observation System) — signal capture; DP11 (Reflection Loop) — session reflection; DP02 (Agent System) — companion is an agent; DP03 (Workflow Engine) — experience workflows; DP09 (Domain Context Sync) — domain state for world map; DP14 (Cognitive Engineering) — information presentation; DP15 (Operational Engineering) — process design
- Related: DP01 (Knowledge Graph) — world map data source; DP13 (Decision Records) — lore sourcing

## Open Questions

- [ ] How does the Pattern Journal persist? (File-based in `.syntropy/`? Event-sourced?)
- [ ] What's the minimum viable experience for Phase 0? (Just warm feedback in system prompts?)
- [ ] How do we measure "genuine satisfaction" vs. superficial engagement?
- [ ] What's the privacy model for guild-level data sharing?
- [ ] How do companion evolution stages interact with the existing agent trait system?
- [ ] Should the world map be visual (UI) or textual (CLI) first?
- [ ] How do we handle the loot tier system without it feeling gamified?
- [ ] What's the right frequency for discovery engine suggestions? (1/session? 1/day?)
- [ ] How does the narrative layer work for solo contributors vs. teams?
- [ ] Where does the Experience Layer state live in the workspace instance? (`.syntropy/experience/`?)
