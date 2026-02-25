---
id: "el-social"
type: module
title: "Experience Layer — Social Layer"
status: exploring
owner: pulse-companion-agent
created: 2026-02-24
updated: 2026-02-25
refs:
  depends-on: [dp16, el-companion, experience-layer]
  related: [dp10, dp12, el-anti-patterns, el-narrative, el-phasing, el-progression, el-world-map]
tags: [experience-layer, social, guilds, contribution-economy, community, module]
---

# Social Layer

The companion system creates dyadic connections (your AI helps you connect with one other person). The social layer scales this to **communities where AI companions are the social infrastructure.**

## The Dog Park at Scale

In a dog park, the dogs create a *commons* — a shared space where strangers become acquaintances, acquaintances become friends, and friends deepen their bonds. The dogs aren't the point. The commons is the point.

The social layer applies this at organizational scale through three types of guilds, a contribution economy, and explicit support for different social styles.

## Guild Types

### Domain Guilds

Everyone who works in a domain (e.g., Payments), regardless of team structure. Companions share context with each other, surface relevant discoveries, and connect people who should be talking.

**What flows through domain guilds:**
- Discoveries related to the domain
- Pattern changes that affect domain understanding
- New contributors entering the domain (introductions)
- Domain health signals (test reliability, incident frequency)

### Interest Guilds

Cross-cutting communities of practice (e.g., Rust enthusiasts, observability practitioners, AI agent designers). Companions notice overlap: "Hey, your human and their human are working on similar problems in different domains."

**What flows through interest guilds:**
- Shared learning and resources
- Cross-domain pattern recognition
- Experimental findings and tool discoveries
- Mentorship opportunities

### Quest Guilds

Temporary groups formed for specific missions (an effort, a launch, an incident response). Companions pre-align context before humans meet, reducing "where are we?" setup to zero.

**What flows through quest guilds:**
- Real-time progress updates
- Blocker notifications and help requests
- Context alignment between participants
- Post-quest retrospective material

## Emergent Guild Intelligence

The guild's AI presence isn't a single bot — it's the **emergent behavior of all the companions in the guild talking to each other.** The guild AI:

- Notices patterns across members
- Surfaces collective insights
- Creates conditions for serendipitous human connection

> "Three guild members ran into the same Postgres migration issue this week. None of them know about each other's experience yet. Surfacing to the guild."

> "@alex just made a discovery about rate limiting that directly relates to what @maria has been struggling with. Their companions are coordinating an intro."

## Shared Adventures (Not Shared Metrics)

The best game memories are shared. "Remember when we..." stories bind groups together.

The experience layer creates conditions for shared stories — but critically, **the bonding happens between humans, mediated by AI:**

**Multi-human collaboration** on complex efforts creates genuine shared experience. Companions handle context alignment, translation, and logistics — humans focus on the creative, decision-making, and social parts.

**Incidents** (the platform equivalent of raid bosses) require coordination and produce war stories. Companions coordinate the technical response while humans make the hard calls together.

**Discoveries** shared with others spread through the social graph — creating moments of "oh, you found that too? Let me tell you what I found..."

**Loot** that benefits others creates natural gratitude and reciprocity. When your utility saves someone two hours, their companion tells yours, and the connection strengthens.

## The Contribution Economy

In healthy MMORPGs, players contribute to an economy where everyone benefits. The platform contribution economy works the same way — but **visibility is opt-in and personal-first.**

| Contribution | Value Created | How Others See It |
|-------------|---------------|-------------------|
| Build a reusable pattern | Others move faster | Their companion says "there's a pattern for this" |
| Write a domain context | Others understand faster | Shown during domain exploration |
| Review thoughtfully | Others ship better code | The insight lives in the domain's lore |
| Capture a signal | System improves | "This improvement came from a signal by..." |
| Mentor someone | Someone else grows | Visible in mentee's pattern journal if they choose |
| Discover a root cause | Prevents future incidents | Becomes part of domain's environmental storytelling |

This isn't a leaderboard. It's **visible impact** — you can see the ripple effects of your contributions in the world, not on a scoreboard.

## Contribution Ripples

The system traces how contributions propagate:

```
@christian creates a retry-with-backoff utility
  |
  +-> @sarah uses it in the payments service
  |     +-> Prevents 3 timeout incidents in Q1
  |
  +-> @james adapts it for the notification service
  |     +-> Reduces alert noise by 40%
  |
  +-> @alex references it in an ADR about resilience patterns
        +-> Becomes the standard approach for new services
```

Ripple tracking is:
- **Automatic** (the system notices when your code/patterns are referenced)
- **Non-competitive** (there's no "most ripples" ranking)
- **Visible to the contributor** (you can see the impact of your work)
- **Anonymizable** (opt-in for others to see the attribution)

## The Introvert's Guild

Not everyone is social in the same way. The experience layer explicitly supports different social styles:

### The Deep-Diver
Prefers one or two close collaborators. Their companion routes them to specific individuals rather than guild-wide channels.

### The Async Communicator
Contributes through artifacts rather than conversations. Their pattern journal and domain contexts *are* their social contribution — no synchronous interaction required.

### The Observer
Learns by watching. They can follow guild activity, read discovery logs, and absorb lore without ever speaking up — and that's valid.

### The Connector
Thrives on broad social interaction. Their companion helps them find the right conversations across many guilds.

### Key Principle

The system never forces social interaction. It makes it *easier* — removing the friction of "who should I ask?" and "how do I explain my context?" — but the human always decides whether and how to engage.

## Social Health Signals

The system monitors social health at the collective level (never individual surveillance):

| Signal | What It Indicates | Response |
|--------|------------------|----------|
| Connection formation rate | Are new connections being made? | If declining, create more guild overlap events |
| Isolation detection | Is anyone disconnected from the social graph? | Companion gently creates pathways to connection |
| Knowledge silos | Is expertise concentrated in too few people? | Suggest cross-training, pair work, knowledge sharing |
| Collaboration quality | Are shared efforts producing good outcomes? | Improve companion context alignment |

Social health signals are aggregated and anonymized. They inform system-level improvements, not individual evaluations.

## Derivable Features

| Feature | Phase | Complexity | Notes |
|---------|-------|------------|-------|
| Domain guild feeds | 5 | Medium | Per-domain activity/discovery streams |
| Interest guild discovery | 5 | Medium | Cross-domain interest matching |
| Quest guild context pre-alignment | 5 | High | Multi-companion coordination |
| Contribution ripple tracking | 5 | High | Cross-system impact tracing |
| Social style adaptation | 5 | Medium | Interaction style detection |
| Isolation detection | 5 | Medium | Social graph analysis |
| Shared discovery feed | 5 | Low | Opt-in discovery sharing |
| Guild-level pattern surfacing | 5 | High | Cross-member pattern analysis |

## Open Questions

- [ ] How do guilds interact with formal team structures? (Complement? Replace? Parallel?)
- [ ] What's the right guild size for effective companion-mediated interaction?
- [ ] How do we prevent guild fatigue (too many guilds, too much activity)?
- [ ] How do contribution ripples work in a solo/small-team context?
- [ ] What's the consent model for appearing in someone else's discovery feed?
- [ ] How do we ensure social health signals don't become surveillance?
