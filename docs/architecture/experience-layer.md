---
id: "arch-experience-layer"
type: architecture
title: "Experience Layer Architecture"
status: exploring
owner: architecture-agent
created: 2026-02-24
updated: 2026-02-24
refs:
  depends-on: [dp16, experience-layer]
  related: [arch-data-model, arch-event-sourcing, dp12, dp14, dp15]
tags: [architecture, experience-layer, data-model, integration]
---

# Experience Layer Architecture

Technical architecture for the Experience Layer — data model, state management, integration points, and the layer stack.

## Layer Stack

The Experience Layer sits atop the existing platform stack. Each layer can function independently; combined they create emergent satisfaction.

```
+--------------------------------------------------------------+
|                    EXPERIENCE LAYER                           |
|                                                               |
|  Core Loops · Progression · Companion · Social · World Map    |
|  Narrative · Expression · Discovery · Apprenticeship          |
|  The felt experience of building things together              |
|                                                               |
+--------------------------------------------------------------+
|                   PERSONALITY LAYER                           |
|                                                               |
|  Agent Archetypes · Voice · Flavor · Memory · Moments         |
|  How AI agents express character                              |
|                                                               |
+--------------------------------------------------------------+
|                  SYSTEM OF WORK LAYER                         |
|                                                               |
|  Domains · Workflows · Signals · Verification · Context       |
|  How work actually gets done                                  |
|                                                               |
+--------------------------------------------------------------+
|                    PLATFORM LAYER                             |
|                                                               |
|  Code · Infrastructure · CI/CD · APIs · Data                  |
|  The things being built                                       |
|                                                               |
+--------------------------------------------------------------+
```

**Data flow direction**: Platform events flow up through the stack. Each layer enriches the event with its own context before passing it to the layer above. The Experience Layer consumes enriched events and produces experience state.

## Data Model

### Per-User State

```
experience/
  pattern-journal/          # Timestamped entries of work, growth, observations
    entries/                # Individual journal entries (event-sourced)
    derived/                # Computed patterns, archetypes, growth trajectory

  familiarity-map/          # Which zones explored, how deeply
    domains/                # Per-domain familiarity score + history
    modules/                # Per-module engagement record

  discovery-log/            # Timestamped discoveries with tier
    entries/                # Individual discoveries
    shared/                 # Discoveries opted-in for sharing

  collaboration-manual/     # Strengths, learning edges, working style
    profile.md              # Curated self-description
    system-suggestions/     # AI-observed patterns (pending curation)

  companion-state/          # Per-user companion evolution
    evolution-stage          # Interface -> Translator -> Navigator -> Spirit Animal
    translation-model/      # How this human communicates, thinks, prefers
    social-routing-map/     # Who this human should connect with and why
    personality-quirks/     # Quirks earned through interaction
    memory/                 # Significant shared moments

  session-history/          # Start, end, what happened, loot
    sessions/               # Individual session records

  achievements/             # Earned achievements
    milestone/
    mastery/
    social/
    discovery/
    hidden/
```

### Per-Team/Guild State

```
guild/
  collective-patterns/      # What members have learned (anonymizable)
  shared-discoveries/       # Discovery feed from opted-in members
  lore/                     # Stories, war stories, memorable moments
  active-quests/            # Efforts with narrative structure
  companion-mesh/           # How guild companions communicate and route
```

### Per-Domain State

```
domain-experience/
  exploration-state/        # Fog of war per user
  environmental-stories/    # Significant events, ADRs as lore, commit archaeology
  discovery-potential/      # Known unknowns, anomalies worth investigating
  complexity-profile/       # Derived from incident rate, patterns, historical data
```

### Per-Companion (AI) State

```
companion/
  archetype                 # Navigator, Artisan, Scout, Sentinel, Custodian
  voice-config              # Tone, style, communication preferences
  evolution-stage           # Per human partner
  agent-relationships/      # Other companions it coordinates with
  personality-evolution/    # Quirks earned through interaction (not configurable)
```

### System-Wide State

```
system-experience/
  meta-narrative/           # What act are we in? Story progression
  contribution-ripples/     # Who built what, where it spread, what it prevented
  pattern-library/          # Community-created blueprints and recipes
  discovery-conditions/     # What interesting things are possible in each domain
  social-health/            # Are connections forming? Are people isolated?
```

## Event Model

The Experience Layer is event-sourced, consistent with the platform's core architecture (ADR-002 lineage). Experience events extend the base event model:

### Event Categories

| Category | Examples | Source |
|----------|----------|--------|
| `work.*` | `work.commit`, `work.pr-merged`, `work.deploy`, `work.review` | Platform Layer |
| `session.*` | `session.start`, `session.end`, `session.context-loaded` | System of Work |
| `discovery.*` | `discovery.found`, `discovery.shared`, `discovery.acknowledged` | Experience Layer |
| `progression.*` | `progression.pattern-recorded`, `progression.archetype-shift`, `progression.achievement-earned` | Experience Layer |
| `companion.*` | `companion.evolution-stage`, `companion.translation`, `companion.social-route` | Experience Layer |
| `social.*` | `social.guild-join`, `social.connection-made`, `social.contribution-ripple` | Experience Layer |
| `narrative.*` | `narrative.quest-advance`, `narrative.chapter-complete`, `narrative.lore-discovered` | Experience Layer |

### Event Processing Pipeline

```
Platform Event (git commit, PR merge, deploy, etc.)
  |
  v
System of Work Enrichment (domain, workflow, signal context)
  |
  v
Personality Enrichment (companion voice, flavor, moment detection)
  |
  v
Experience Processing
  |
  +-- Pattern Recognition -> Pattern Journal update
  +-- Familiarity Update -> World Map state change
  +-- Discovery Check -> Discovery Engine evaluation
  +-- Narrative Check -> Quest/Story progression
  +-- Achievement Check -> Achievement evaluation
  +-- Social Signal -> Companion routing / guild feed
  |
  v
Experience State (persistent, per-user, per-guild, per-domain)
```

## Integration Points

### Existing System Integrations

| System | Direction | What Flows |
|--------|-----------|------------|
| Git (commits, PRs) | Platform -> Experience | Contribution events, code archaeology triggers |
| CI/CD | Platform -> Experience | Moment loop feedback (build results, deploy status) |
| Domain Contexts | SoW -> Experience | Fog of war state, familiarity data, lore sources |
| Workflows | SoW -> Experience | Quest structure, progression markers, crafting recipes |
| Signals/Observations | SoW <-> Experience | Discovery input (in), experience observations (out) |
| Agent System | Personality <-> Experience | Companion state, agent-to-agent protocol, voice config |
| Pulse Companion | Experience <-> Companion | Reflection data, evolution triggers, growth coaching |
| Cognitive Engineering | Experience -> Presentation | How experience data is structured for comprehension |
| Operational Engineering | Experience -> Process | How experience workflows are designed for actors |

### State Storage

Experience state follows the workspace instance pattern:

- **Checked-in**: Pattern journal entries, collaboration manuals, shared discoveries, lore — human-reviewable artifacts in `.syntropy/experience/`
- **Ignored/derived**: Familiarity scores, achievement state, companion evolution metrics, social graph — computed from events, regenerable

### Privacy Architecture

The data model enforces privacy structurally:

```
Personal-only (never shared without explicit copy-out):
  - Pattern Journal
  - Growth Coaching
  - Archetype Reflections
  - Companion Memory
  - Session History

Opt-in sharing (contributor controls):
  - Collaboration Manual
  - Shared Discoveries
  - Guild Participation
  - Achievement Visibility

System-derived (anonymizable):
  - Collective Patterns
  - Social Health Metrics
  - Discovery Conditions
```

## The Self-Building Property

Like the System of Work, the Experience Layer improves through use:

```
Use the platform
  -> Generate experience events
    -> Discover patterns
      -> Improve the experience
        -> Better use of the platform
          -> (cycle)
```

The companion gets better at being your companion. The discovery engine gets better at finding interesting things. The narrative system gets better at recognizing story beats. The progression system gets better at reflecting genuine capability.

## Technical Considerations

### Performance
- Moment Loop feedback must be < 2 seconds (critical UX requirement)
- Pattern recognition can be async (batch processing on session end)
- Familiarity decay can be computed lazily (on domain re-entry)

### Scalability
- Per-user state is independent (no cross-user queries for personal features)
- Guild state requires cross-user aggregation (consent-gated)
- Discovery engine requires codebase-level analysis (batch, not real-time)

### Migration Path
- Phase 0 requires zero new state (system prompt changes only)
- Phase 1 adds session state (lightweight, file-based)
- Phase 2+ adds persistent experience state (follows workspace instance conventions)
- Each phase is backward-compatible — no migrations required between phases
