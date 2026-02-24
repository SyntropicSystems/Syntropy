---
id: "el-world-map"
type: feature-spec
title: "Experience Layer — World Map & Exploration"
status: exploring
owner: pulse-companion-agent
created: 2026-02-24
updated: 2026-02-24
refs:
  depends-on: [dp16, experience-layer, dp09]
  related: [dp01, dp10, el-core-loops, el-progression, el-narrative]
tags: [experience-layer, world-map, exploration, fog-of-war, discovery, environmental-storytelling, module]
---

# World Map & Exploration

The codebase, knowledge graph, and organization are treated as **explorable spaces** — not filing cabinets where you find what you need and close the drawer, but worlds with secrets, hidden areas, and environmental storytelling.

## The Platform as Explorable Space

In Borderlands, Pandora isn't just a backdrop — it's a space you *explore*. Every zone has secrets, hidden areas, environmental storytelling. The map itself is a source of satisfaction.

A codebase, a knowledge graph, an organization — these are also spaces. The Experience Layer treats them that way.

### The World Map

```
                    +-------------+
                    |  NORTH STAR |  <- Vision, mission, why we exist
                    |   (30,000m) |
                    +------+------+
                           |
              +------------+------------+
              |            |            |
        +-----+-----+ +---+---+ +-----+-----+
        | PRODUCT   | |  DEV  | |  COMPANY  |  <- Major continents
        | CONTINENT | | CONT. | |   CONT.   |
        +-----+-----+ +---+---+ +-----+-----+
              |            |            |
        +-----+-----+     |      +-----+-----+
        |  Domains  |     |      |  Domains  |  <- Zones within continents
        |  (zones)  |     |      |  (zones)  |
        +-----+-----+     |      +-----+-----+
              |            |            |
        +-----+-----+ +---+---+ +-----+-----+
        | Features  | |Modules| |  Processes |  <- Locations within zones
        |  (locs)   | |(locs) | |   (locs)  |
        +-----------+ +-------+ +-----------+
```

### Zone Properties

Every domain/area in the world has properties that map from game concepts to platform realities:

| Property | Game Equivalent | Platform Equivalent |
|----------|----------------|---------------------|
| Level range | "Level 15-20 zone" | Complexity/skill requirement |
| Fog of war | Unexplored areas on map | Parts of the system you haven't touched |
| Environmental hazards | Toxic waste, lava | Technical debt, flaky tests, legacy code |
| Hidden areas | Secret rooms, hidden chests | Undocumented features, buried insights |
| Fast travel | Teleportation stations | Bookmarks, context quick-load, deep links |
| Zone boss | End-of-zone boss fight | The hardest problem in this domain |
| Lore | Environmental storytelling | ADRs, commit history, "why it's like this" |
| NPCs | Characters with dialog | Domain agents, domain experts (human or AI) |
| Resources | Ammo, health, money | Compute, tokens, CI minutes, review bandwidth |

## Fog of War and Discovery

One of the most satisfying game mechanics: the fog of war lifting as you explore. You can see the outline of what exists, but the details only reveal as you engage.

### Before Exploring a Domain

```
+-----------------------------------+
| PAYMENTS DOMAIN                   |
| ################################  |
| Owner: @sarah                     |
| Health: ########-- 80%            |
| Your familiarity: ##---- 20%     |
| 14 modules . 3 open issues       |
| "Handles all payment flows"       |
|                                   |
| [Explore] [Ask Domain Agent]      |
+-----------------------------------+
```

### After Spending Time There

```
+-----------------------------------+
| PAYMENTS DOMAIN                   |
| Owner: @sarah                     |
| Health: ########-- 80%            |
| Your familiarity: ######- 65%    |
|                                   |
| Known modules:                    |
|  * stripe-adapter (you built)     |
|  * payment-router (reviewed 3x)   |
|  o refund-engine (explored)       |
|  o fraud-detector (glanced)       |
|  . subscription-mgr (unexplored)  |
|  . invoice-gen (unexplored)       |
|                                   |
| Discoveries:                      |
|  Found retry logic that prevents  |
|  double-charges                   |
|  The fraud threshold was set by   |
|  an intern in 2022 and never      |
|  revisited                        |
|                                   |
| [Deep Dive] [View History]        |
| [Ask Domain Agent]                |
+-----------------------------------+
```

### Familiarity Tracking

**Familiarity** isn't a game number — it's genuine understanding. It increases when you:

- Read and comprehend code in the domain
- Review PRs that touch the domain
- Fix bugs in the domain
- Have conversations with the domain agent
- Build features that interact with the domain

It decreases over time if you don't engage (realistic knowledge decay). The decay rate is slow — genuine understanding persists, but edge-case details fade.

## Environmental Storytelling

In Borderlands, you learn about the world through environment. In a platform, the equivalent is *ambient context*:

The commit that fixed a critical bug at 3am on Christmas (visible in history, acknowledged by the system):
> "This module was originally written by @maria in a 36-hour hackathon. It's been refactored twice since then, but the core algorithm is still hers. It handles 40% of our traffic."

The pattern of modifications that reveals a systemic problem:
> "Fun fact: this is the 100th PR to touch the auth service. The first one was 18 months ago. It's been through three major rewrites."

The file with a reputation:
> "You're about to modify the most-reverted file in the codebase. Last 5 changes to this file: 3 were reverted. Tread carefully — or better yet, ask me why."

Environmental stories are surfaced naturally — not as reports or dashboards, but as *things you encounter while working.* They make the codebase come alive.

## Fast Travel and Context Loading

In MMORPGs, fast travel is essential — the world is too big to walk everywhere every time. But the first time through a zone, you walk. You discover the travel points. Then you can teleport.

**Platform equivalent**: Context loading as a first-class experience.

First time entering a domain:
```
Loading Payments Domain...
---
Welcome to Payments. This is your first visit.

Here's the lay of the land:
  6 modules, 2 external integrations (Stripe, PayPal)
  Core pattern: event-sourced state machine
  The thing everyone gets wrong: refunds aren't the reverse
  of charges — they have their own state machine
  @sarah is the domain expert. She's usually responsive
  in #payments-eng.

Where would you like to start?
  [Overview] [Architecture] [Common Tasks] [Recent Changes]
```

Return visit:
```
Welcome back to Payments.
---
Since your last visit (3 days ago):
  2 PRs merged (one touches the module you reviewed)
  1 new signal: "Stripe webhook reliability degraded"
  Your open task: refund-flow-v2 is unblocked

Picking up where you left off?
  [Resume refund-flow-v2] [See changes] [Something else]
```

The system remembers where you were, what you were doing, and what changed while you were gone.

## The Discovery Engine

The discovery engine doesn't just passively record discoveries — it actively creates conditions for serendipitous insight.

### Discovery Types

**Code Archaeology** — Finding the story behind code.
> "This function has a comment that says `// TODO: fix this properly` from 2021. The function works perfectly. The 'fix' was the original code. The TODO is the artifact."

**Pattern Recognition** — Seeing connections across domains.
> "This retry logic in the payments service and the retry logic in the notification service have the same bug. They were probably copy-pasted from the same Stack Overflow answer."

**Hidden Dependencies** — Understanding why things are the way they are.
> "The reason the deploy takes 12 minutes is a Dockerfile layer ordering issue that nobody has looked at because 'deploys have always been slow.'"

**Emergent Insights** — Things the AI notices that no human has.
> "You've created 4 signals about test flakiness in the past month. They're all in modules that use the same database fixture. The fixture, not the tests, is the problem."

### The Discovery Log

Every discovery is captured in a personal (and optionally shared) discovery log:

```
DISCOVERY LOG: @christian
============================================

2026-02-23: "The Validator That Grew"
   The System of Work validator went from 161 checks to 881 checks
   in 24 days. That's 30 new checks per day.
   Domain: system | Tier: Rare

2026-02-20: "The Accidental Pattern"
   Three different efforts independently invented the same
   domain-context-loading pattern. Extracted and standardized.
   Domain: cross-cutting | Tier: Epic

2026-02-15: "The Ghost Container"
   Found a devcontainer configuration that references a registry
   image that doesn't exist yet. Nobody noticed because nobody
   builds from scratch.
   Domain: devex | Tier: Uncommon
```

### Designed Serendipity

Active mechanisms for creating discovery conditions:

**"Did you know?" ambient context**: While working, the AI occasionally surfaces relevant context that might lead to a discovery.
> "While modifying this file, I noticed it imports a module that was deprecated 6 months ago. The deprecated module still works, but there's a faster replacement. Want to investigate?"

**Cross-pollination**: Patterns in one domain suggested for another.
> "The caching strategy you just implemented in the auth service is similar to a problem the payments team was discussing last week."

**Anomaly surfacing**: Things that don't match expected patterns.
> "This module has 98% test coverage except for one function. That function handles the most critical path. Interesting."

These are **conversational observations** — rate is low (one per session at most), quality is high, ignoring them has no consequence.

## Derivable Features

| Feature | Phase | Complexity | Notes |
|---------|-------|------------|-------|
| Domain familiarity tracking | 2 | Medium | Engagement analysis per domain |
| Fog of war visualization | 2 | Medium | Per-user domain state rendering |
| Context loading experience | 1 | Medium | Session-aware domain entry |
| "Welcome back" with changes | 1 | Medium | Diff since last visit |
| Environmental storytelling | 2 | Medium | Commit/PR archaeology |
| Discovery log (personal) | 2 | Low | Observation variant |
| Discovery log (shared) | 5 | Low | Opt-in discovery sharing |
| Code archaeology triggers | 2 | Medium | Historical analysis |
| Cross-pollination suggestions | 5 | High | Cross-domain pattern matching |
| Anomaly surfacing | 3 | High | Statistical anomaly detection |
| Familiarity decay | 2 | Low | Time-based decay function |

## Open Questions

- [ ] How does the world map work visually? Is it a literal map, a tree, a graph?
- [ ] What's the right decay rate for familiarity? Days? Weeks? Months?
- [ ] How do we handle environmental storytelling for very large codebases?
- [ ] Should discoveries have a "verify" step before being logged?
- [ ] How does the discovery engine avoid surfacing noise (uninteresting anomalies)?
- [ ] How does fog of war interact with permissions (some zones may be access-restricted)?
