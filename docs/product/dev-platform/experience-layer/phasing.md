---
id: "el-phasing"
type: module
title: "Experience Layer — Implementation Phasing"
status: exploring
owner: pulse-companion-agent
created: 2026-02-24
updated: 2026-02-25
refs:
  depends-on: [dp16, experience-layer]
  related: [el-companion, el-core-loops, el-expression-crafting, el-feature-derivation, el-narrative, el-progression, el-social, el-world-map]
tags: [experience-layer, phasing, implementation, roadmap, module]
---

# Implementation Phasing

The Experience Layer is built in phases, each delivering value independently. You don't build the full stack on day one. You build it in layers, and each layer makes the next layer better.

## Phase Overview

| Phase | Name | Timeframe | Key Capability | New Infrastructure |
|-------|------|-----------|----------------|-------------------|
| 0 | Warm Feedback | Week 1 | Contextual AI feedback | None (system prompts) |
| 1 | Session Awareness | Week 2-4 | Context load/unload experience | Session state tracking |
| 2 | World Map | Month 2 | Domain exploration with fog of war | Per-user familiarity state |
| 3 | Progression | Month 3 | Pattern Journal, achievements | Contribution tracking, pattern recognition |
| 4 | Companion Evolution | Month 4 | Evolution stages, memory, coaching | Per-user companion state |
| 5 | Social Layer | Month 5 | Guilds, shared discoveries, economy | Social graph, cross-user state |
| 6 | Narrative | Month 6+ | Quests, meta-narrative, lore | Narrative engine, event history |

## Phase 0: Warm Feedback

**What changes**: AI companions have personality and contextual awareness. Feedback on actions is warm, specific, and informative.

**Example before**:
> "Tests passed."

**Example after**:
> "Tests green. That auth refactor cleaned up 3 unused imports along the way."

**What's needed**:
- Personality Layer system prompt engineering
- Contextual awareness in companion responses
- Zero new infrastructure

**Value delivered**: Every interaction feels authored rather than mechanical. The platform immediately feels different from a bare IDE.

**Modules activated**: Core Loops (moment loop only), Apprenticeship (learning residue in prompts)

## Phase 1: Session Awareness

**What changes**: The system knows when you start and end a work session. Context loading and unloading becomes a first-class experience. You get "welcome back" summaries.

**What's needed**:
- Session start/end detection (explicit or heuristic)
- Per-session state (what was worked on, what changed)
- Change detection since last session
- Session summary generation

**Value delivered**: Every session has a clear beginning ("here's where we are") and end ("here's what we accomplished"). Returning to work is frictionless.

**Modules activated**: Core Loops (session loop), World Map (fast travel basics)

### Minimum Viable Session Experience

```
SESSION START
---
Good morning. Since your last session (yesterday, 11pm):
  2 PRs merged by others (one touches auth — your area)
  CI is green on main
  Your open branch has no conflicts

Where you left off: refactoring the token refresh logic
  Status: tests passing, PR draft open

[Resume] [Something else]
```

```
SESSION END (triggered by inactivity or explicit)
---
Session summary:
  Duration: 2h 45m
  Completed: Token refresh refactor
  Shipped: PR #312 merged
  Loot: Extracted a reusable token-rotation utility

See you next time.
```

## Phase 2: World Map

**What changes**: Domains are explorable spaces with fog of war. Your familiarity with each area is tracked. Environmental storytelling surfaces while you work.

**What's needed**:
- Per-user domain familiarity scores
- Familiarity update triggers (code read, PR review, bug fix, etc.)
- Familiarity decay over time
- Environmental story extraction (commit archaeology)
- Domain entry experience (first visit vs. return)

**Value delivered**: The codebase transforms from a filing cabinet into an explorable world. You know what you know and what you don't. Returning to a familiar area feels like coming home.

**Modules activated**: World Map (full), Discovery Engine (basic), Core Loops (adventure loop basics)

## Phase 3: Progression

**What changes**: Your work generates a Pattern Journal. Achievements recognize meaningful patterns. The system adapts its scaffolding based on your demonstrated capability.

**What's needed**:
- Contribution analysis (git history, PR reviews, observations)
- Pattern recognition engine (recurring behaviors, growth trajectory)
- Achievement event matching
- Expert path adaptation (familiarity-gated scaffolding)

**Value delivered**: Growth becomes visible. You can see your own trajectory. The system meets you where you are — more scaffolding where you're new, more freedom where you're expert.

**Modules activated**: Progression (full), Apprenticeship (altitude adjustment), Expression (expert path toggle)

## Phase 4: Companion Evolution

**What changes**: Your AI companion evolves through stages (Interface -> Translator -> Navigator -> Spirit Animal). It develops memory, callbacks, personality quirks, and provides growth coaching.

**What's needed**:
- Per-user companion state (evolution stage, interaction history)
- Translation model (communication style learning)
- Memory system (significant moments, callbacks)
- Growth coaching generation (monthly reflection synthesis)

**Value delivered**: The companion becomes genuinely useful as a personal collaborator. It knows your patterns, remembers your history, and adapts to your style.

**Modules activated**: Companion (full), Progression (growth coaching), Apprenticeship (understanding calibration)

## Phase 5: Social Layer

**What changes**: Guild mechanics for teams and interest groups. Shared discovery feed. Contribution economy with visible impact ripples. Agent-to-agent communication.

**What's needed**:
- Social graph (who collaborates with whom)
- Guild infrastructure (domain, interest, quest guilds)
- Cross-user state with consent management
- Agent-to-agent communication protocol
- Contribution ripple tracking

**Value delivered**: The platform becomes social. Finding the right person to collaborate with is easy. Your contributions visibly impact others. Isolation is gently addressed.

**Modules activated**: Social (full), Companion (social routing, agent-to-agent), Expression (guild participation)

## Phase 6: Narrative

**What changes**: Efforts become quests with narrative structure. The platform has a meta-narrative. Documentation becomes lore. The full discovery engine is active.

**What's needed**:
- Narrative engine (effort -> quest mapping, chapter detection)
- Meta-narrative tracking (organization story arc)
- Lore generation and attachment
- Full discovery engine (cross-pollination, anomaly surfacing)

**Value delivered**: Work has story. Efforts feel like adventures, not tickets. The platform's history is alive and meaningful. Discovery is a constant source of delight.

**Modules activated**: Narrative (full), World Map (environmental storytelling), Discovery Engine (full)

## Phase Dependencies

```
Phase 0 (Warm Feedback)
  |
  v
Phase 1 (Session Awareness)
  |
  +-----> Phase 2 (World Map)
  |         |
  |         +-----> Phase 3 (Progression)
  |                   |
  |                   +-----> Phase 4 (Companion Evolution)
  |                             |
  |                             +-----> Phase 5 (Social Layer)
  |                                       |
  |                                       +-----> Phase 6 (Narrative)
  |
  (Each phase can be shipped independently.
   Later phases are better with earlier phases but don't strictly require them.)
```

## What Each Phase Teaches Us

Each phase generates learning that informs the next:

| Phase | What We Learn | How It Informs Next Phase |
|-------|--------------|--------------------------|
| 0 | What contextual feedback people actually value | Shapes session summary content |
| 1 | Session rhythms and patterns | Defines familiarity tracking triggers |
| 2 | How people explore and what "understanding" means | Calibrates progression recognition |
| 3 | What patterns emerge from real work history | Shapes companion evolution triggers |
| 4 | How companion relationships develop | Defines social routing algorithms |
| 5 | How social dynamics work in the platform | Shapes narrative beats and story recognition |

## First Day Experience (Phase 1+)

What day one feels like with at least Phase 1 active:

```
Good morning, Christian.

This is your workspace. Let me show you around.

You have 3 active quests:
  Effort 16: GCP Deployment — Phase 4 of 5
  Effort 17: Fireweed CLI — Phase 6 (just completed!)
  Effort 20: Verification System — Done

Since yesterday:
  The Rust validator shipped. 881 checks, 0 errors.
  2 new signals in the system domain (devcontainer-related)
  @sarah ran into a similar devcontainer issue last week.
  Want me to connect you?

Your session options:
  [Continue Effort 16] [Review signals] [Explore something new]

Your companion says:
  "Phase 4 is infrastructure addons. The monitoring
  setup is the interesting part — it'll be the first time
  this codebase can see itself running."
```

## Stopping Points

You can stop at any phase and have a better platform than you started with:

- **Stop at Phase 0**: A warmer, more contextual AI experience
- **Stop at Phase 1**: Session-aware collaboration with context continuity
- **Stop at Phase 2**: An explorable world with discovery
- **Stop at Phase 3**: Visible growth with adaptive scaffolding
- **Stop at Phase 4**: A genuine AI collaborator that knows you
- **Stop at Phase 5**: A social platform where contribution is visible
- **Stop at Phase 6**: A living world with narrative and meaning

Each stopping point is valid. The Experience Layer is not all-or-nothing.

## Open Questions

- [ ] How do we validate each phase before moving to the next?
- [ ] What's the rollback plan if a phase creates negative effects?
- [ ] Can phases be deployed to different user groups at different times?
- [ ] How do we handle users who are at different phases on the same platform?
- [ ] What metrics determine whether a phase is "ready" for the next?
