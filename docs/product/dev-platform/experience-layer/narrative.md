---
id: "el-narrative"
type: feature-spec
title: "Experience Layer — Narrative Layer"
status: exploring
owner: pulse-companion-agent
created: 2026-02-24
updated: 2026-02-24
refs:
  depends-on: [dp16, experience-layer]
  related: [dp13, el-core-loops, el-progression, el-world-map]
tags: [experience-layer, narrative, quests, lore, storytelling, module]
---

# Narrative Layer

Work already has narrative structure — we just don't acknowledge it. The Narrative Layer makes it visible: efforts become quests, documentation becomes lore, and the platform itself has a meta-narrative.

## Efforts as Quests

Borderlands doesn't have "missions" — it has *stories*. Every project already has a narrative arc: beginning, middle, end. Challenges, setbacks, triumphs. The Narrative Layer makes this visible rather than hiding it behind ticket numbers.

### Quest Structure

```
EFFORT 16: GCP DEPLOYMENT
===========================

Chapter 1: "The Foundations" (Phase 0-1)
  We started with nothing. No infrastructure, no deployment
  pipeline, no production environment. Just a vision and a
  Pulumi config.

Chapter 2: "The Migration" (Phase 2-3)
  Moving from local development to cloud. Every service
  needed to find its new home. The database migration
  was the boss fight — took three attempts.

Chapter 3: "The Addons" (Phase 4)
  The infrastructure is up, but bare. Now we add the things
  that make it livable — monitoring, logging, autoscaling.
  Like furnishing a house.

Chapter 4: "Going Live" (Phase 5)     <- YOU ARE HERE
  Everything works in staging. Production is next.
  The real test isn't whether the code works —
  it's whether it works at scale, under pressure,
  with real users.

QUEST LOG:
  [done] Phase 0: Terraform scaffold
  [done] Phase 1: GKE cluster + basic services
  [done] Phase 2: Database migration
  [done] Phase 3: CI/CD pipeline
  [active] Phase 4: Observability + alerting
  [pending] Phase 5: Production cutover
```

This isn't manufactured drama — it's *acknowledging the narrative that already exists*. Every effort has a story. The Narrative Layer tells it.

### Quest Properties

| Property | Description |
|----------|-------------|
| Chapters | Natural phases of the effort, named with narrative flavor |
| Quest log | Phase tracker showing completed, active, and pending phases |
| Boss fights | The hardest moments — big launches, migrations, incidents |
| Side quests | Tangential work that emerged during the main quest |
| Party members | Humans + companions involved, with their roles |
| Loot | What was gained — patterns, tools, insights, shipped code |
| War stories | Memorable moments that become part of guild lore |

## The Meta-Narrative

Above individual quest lines, there's a meta-narrative — the story of the platform itself, the team, the mission.

```
THE STORY SO FAR
==================

Act I: "The Foundation" (Months 1-3)
  A system of work built from first principles.
  Domains established. Workflows created. The first
  AI companions came online.

Act II: "The Expansion" (Months 4-6)      <- YOU ARE HERE
  The system grows. New domains, new capabilities.
  The platform that builds the platform begins to
  emerge. The team faces its first real scaling
  challenges.

Act III: "The Integration" (Months 7-9)
  Everything connects. The product platform, the
  dev platform, and the company OS become one
  coherent system. External users arrive.

Act IV: "The Evolution" (Months 10+)
  The system begins to evolve faster than any
  individual can track. This is the test — can the
  humans and AI navigate a system that's genuinely
  smarter than any of its parts?
```

The meta-narrative provides context for individual quests. Your effort isn't just "deploy to GCP" — it's part of Act II, where the system is expanding into infrastructure for the first time.

## Lore as Knowledge

In Borderlands, lore isn't separate from gameplay — it enriches gameplay. ECHO logs explain why a bandit camp exists, making the combat more meaningful.

**Lore is knowledge presented as narrative** — documentation you'll actually remember because it's attached to a story.

### Traditional Documentation vs. Lore

**Traditional:**
> "The auth service uses JWT tokens with a 15-minute expiration. Refresh tokens are stored in Redis with a 30-day TTL."

**Lore:**
> "The auth service almost went live with 24-hour token expiration. During the security review, @alex demonstrated a replay attack that could drain an account in under a minute. The team spent three days redesigning the token lifecycle. The 15-minute expiration was the result — short enough to limit replay window, long enough to not drive users crazy. The Redis-backed refresh tokens were @maria's elegant solution to the UX problem this created. ADR-0023 has the full story."

Same information. One is a specification. The other is knowledge you'll actually remember.

### Lore Sources

| Source | Lore Type | Example |
|--------|-----------|---------|
| ADRs / Decision Records | Decision lore | Why we chose event sourcing over CRUD |
| Commit history | Change lore | The 3am Christmas fix that saved the release |
| Incident reports | War story lore | How we discovered the cascading failure |
| Domain context files | Domain lore | What everyone gets wrong about payments |
| Pattern journal entries | Personal lore | My first production Rust code |
| Discovery log entries | Discovery lore | The intern who set the fraud threshold |

### Lore Properties

- **Attached to locations**: Lore appears when you're in the relevant area (environmental storytelling)
- **Tiered depth**: Brief mention in passing -> full story on request (progressive disclosure via DP14)
- **Living**: New lore accumulates as the system evolves
- **Attributed**: The people involved are credited (with consent)
- **Searchable**: Lore can be found through exploration or direct query

## Discovery Narratives

Discoveries (from `world-map.md`) have their own narrative form:

```
DISCOVERY: "The Retry Was Inside You All Along"
================================================

Domain: payments
Discoverer: @christian
Date: 2026-02-23
Tier: Legendary

THE STORY:
  It started with a signal: "Intermittent 504s on payment
  processing." Three engineers had looked at it. All three
  blamed the network.

  @christian noticed a pattern: the 504s always happened
  at minute :00 and :30 of each hour. Not random at all.

  Three days of digging revealed: a cron job was rotating
  TLS certificates every 30 minutes (set by a long-departed
  engineer who was "being extra safe"). Each rotation caused
  a 2-second connection reset. Services with 1-second timeouts
  would fail.

  The fix: increase TLS rotation to every 90 days (the standard)
  and increase timeouts to 5 seconds. 340 lines of retry logic
  removed because the retries were compensating for a problem
  that shouldn't exist.

THE LESSON:
  "When everything has retries, ask what they're retrying."

RIPPLE EFFECTS:
  - 4 services simplified by removing unnecessary retry logic
  - Alert noise reduced 60%
  - Pattern documented in resilience guidelines
  - Cited in 2 subsequent architecture decisions
```

## Narrative Integration Points

The narrative layer connects to other experience modules:

| Module | Connection |
|--------|-----------|
| Core Loops | Session loop's "reflect" step captures narrative beats |
| Progression | Quest completion feeds the pattern journal |
| Companion | Companion provides narrative commentary during work |
| Social | Shared quests create shared stories; war stories become guild lore |
| World Map | Environmental storytelling is the spatial expression of lore |

## Derivable Features

| Feature | Phase | Complexity | Notes |
|---------|-------|------------|-------|
| Effort quest structure | 6 | Medium | Effort phases as chapters |
| Quest log visualization | 6 | Medium | Progress tracker with narrative |
| Meta-narrative tracking | 6 | High | Organization-level story arc |
| Lore-enriched documentation | 2 | Medium | Decision/commit story annotations |
| Discovery narratives | 2 | Low | Structured discovery storytelling |
| War story capture | 5 | Medium | Post-incident narrative generation |
| Narrative commentary from companion | 4 | Medium | Companion awareness of quest state |

## Open Questions

- [ ] How do we auto-generate narrative without it feeling artificial?
- [ ] What's the right granularity for quest chapters? (Per-phase? Per-milestone? Per-week?)
- [ ] How does the meta-narrative work for organizations that don't have a linear story?
- [ ] Should lore be curated (human-reviewed) or emergent (AI-generated from history)?
- [ ] How do we handle narratives for solo contributors vs. teams?
- [ ] How does the narrative layer interact with formal project management tools?
