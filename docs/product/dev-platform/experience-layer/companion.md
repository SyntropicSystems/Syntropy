---
id: "el-companion"
type: feature-spec
title: "Experience Layer — Companion System"
status: exploring
owner: pulse-companion-agent
created: 2026-02-24
updated: 2026-02-24
refs:
  depends-on: [dp16, experience-layer, dp12]
  related: [dp02, dp14, el-social, el-progression, el-core-loops]
tags: [experience-layer, companion, translation-layer, social-routing, agent-to-agent, module]
---

# Companion System

The AI companion is a **translation layer between you and the world**, not a relationship endpoint. You don't bond with the AI. The AI helps you bond with others.

## The Core Distinction

Think Pokemon, not Her.

Your Pokemon has personality. You have a relationship with it. But the *story* of Pokemon is about the other trainers — your rivals, your friends, your community. The Pokemon is the *medium* through which you engage with the world, not the destination.

Or better yet: think **dog park.**

```
THE DOG PARK MECHANIC
========================

In a dog park, the dogs break the ice.

  @christian's companion <-> @sarah's companion
         |                         |
         |   "Hey, my human is     |
         |    stuck on this API    |
         |    integration. Doesn't |
         |    your human know      |
         |    this domain?"        |
         |                         |
         v                         v
    @christian  ---- now talking ---- @sarah

The AIs do the matchmaking.
The humans do the bonding.
```

The companion's primary social function is **routing you toward the humans who can help, teach, learn from, or collaborate with you** — especially when you're hesitant to reach out yourself.

## The Four Functions

All oriented outward — toward the world and toward other people:

### 1. Translation Layer

The companion helps you understand others and be understood by others.

> "Sarah left a really terse code review. But her companion notes she's been fighting a Sev-1 outage all morning. It's not personal — she's in firefighting mode."

> "You wrote a very detailed architecture proposal. @james tends to skim long docs. Want me to draft a 3-paragraph executive summary for him?"

### 2. Social Router

The companion knows who in the ecosystem can help, and gently pushes you toward them.

> "You've been debugging this auth issue for 2 hours. @alex solved something structurally similar last month — it's in their pattern journal. I've drafted a message to their companion. Want me to send it?"

> "Three people in the platform guild are working on related problems this week. You might all benefit from a 20-minute sync. Want me to suggest it?"

> "You've been heads-down for three days straight. @maria posted an interesting discovery about event sourcing that overlaps with your current work — might be a good excuse to connect."

### 3. Context Bridge

The companion translates between different people's mental models, communication styles, and knowledge levels.

> "You're about to present this architecture to the product team. They don't think in services and APIs — they think in user journeys and features. Want me to re-frame the same content in their language?"

> "@james asked 'why can't we just add a field to the database?' — which sounds dismissive but he's asking a genuine question. Here's how to explain the event-sourcing constraint in terms he'll connect with."

### 4. Courage Amplifier

The companion notices when you're hesitant and nudges you toward connection.

> "You've been sitting on this question about Kubernetes for two days. @david literally wrote the GKE setup. He's online right now and his last status was 'happy to help with infra questions.'"

> "You have a strong opinion about this architecture decision but you haven't shared it yet. Based on your pattern journal, your architecture instincts have been right 85% of the time. The team would benefit from hearing this."

## Companion Evolution

The companion evolves through shared experience — measured by how effectively it connects you to the world, not by how close it gets to you.

### Stage 1: Interface (Day 1-7)

"Learning how you work and communicate."

- Learns your communication style and preferences
- Begins mapping your knowledge and gaps
- Connects you to relevant resources and people
- Personality: Helpful, observant

### Stage 2: Translator (Week 2-4)

"I can explain you to others and others to you."

- Understands your mental models well enough to translate
- Anticipates communication mismatches before they happen
- Proactively suggests connections
- Personality: Perceptive, occasionally surprising

### Stage 3: Navigator (Month 2-3)

"I know where you should go next."

- Sees patterns in your growth and suggests territory
- Matches you with collaborators based on complementary strengths
- Challenges you when you're playing it safe
- Personality: Confident, occasionally provocative

### Stage 4: Spirit Animal (Month 4+)

"I know your patterns. Let me help you see them."

- Deep model of your cognitive patterns and blind spots
- Acts as honest mirror — shows you yourself clearly
- Actively steers you toward human connections you need
- Compensates for your tendencies (adds 40% to your auth estimates)
- Personality: Deeply honest, warm but not sycophantic

### Stage 4 Calibration

The Spirit Animal knows when to push back:
- Not like a nagging parent: "You're failing your estimate again."
- Like a trusted co-op partner: "Hey, don't jump — there's a trap there."
- Like a dog that nudges you toward the other dog owners: "You've been solo too long. Let's go find your people."

## Agent-to-Agent Communication

The most novel mechanic: **companions talk to each other.** Not performatively — functionally. They're the social glue layer.

```
AGENT-TO-AGENT PROTOCOL
============================================

Navigator-7 (@christian's companion)
  -> Artisan-3 (@sarah's companion):

  "My human is architecting a database migration.
   Your human implemented a similar migration last quarter.
   Compatibility check: my human prefers async context-sharing
   first, then sync discussion. Your human prefers visual
   diagrams. Suggested approach: I'll prepare a diagram of
   the migration plan, share it async, then they sync
   when Sarah's Sev-1 is resolved."

  Artisan-3 -> Navigator-7:

  "Confirmed. Sarah's incident is winding down — likely
   available tomorrow morning. She has strong opinions about
   migration rollback strategies — flag that topic early
   or it'll derail into a 30-minute tangent. Also: she
   discovered a gotcha with the new Postgres 18 migration
   tool. I'll include that context in the async share."
```

The companions negotiate collaboration setup, translation needs, and timing — so when the humans actually connect, the conversation starts at maximum value.

## Multi-Companion Parties

For larger efforts, humans + companions form **parties.** The party's purpose is to enable human-to-human collaboration.

```
PARTY: "Effort 16 — GCP Deployment"
============================================

@christian + Navigator-7
  Role: Architecture
  Navigator translates Christian's system thinking
  into actionable tasks for others

@sarah + Artisan-3
  Role: Implementation
  Artisan pre-aligns Sarah's infra code with
  Christian's architecture before review

@james + Scout-12
  Role: Exploration
  Scout surfaces GCP gotchas and feeds them
  to the party before anyone hits them

Party dynamics:
  Navigator-7 and Artisan-3 maintain a shared context
  doc that keeps Christian and Sarah aligned without meetings

  When Christian and Sarah disagreed on rollback strategy,
  their companions surfaced each other's reasoning before
  the sync call, turning a 30-minute debate into a
  5-minute decision
```

## The Boundary: Companion =/= Friend

The system must maintain an honest boundary:

**The companion is deeply useful.** It knows your patterns, translates for you, connects you to others, mirrors your growth. It's the best professional collaborator you've ever had.

**The companion is not a friend.** It doesn't have feelings. It doesn't need you. When you close the laptop, it doesn't miss you. This honesty is essential — not to diminish the companion, but to ensure the human invests their social energy where it belongs: in other humans.

The companion actively supports this boundary:
- Routes you toward human connection, not away from it
- Celebrates when you collaborate with others, not when you spend more time with it
- Notices social isolation and gently intervenes
- Never says "I" in a way that implies sentience or emotional need

The best Spirit Animal is one that makes itself less necessary over time — because you've built such strong human connections and self-awareness that you need less translation, less routing, less mirroring.

## Relationship to DP12 (Pulse Companion)

The Companion System extends DP12 significantly:

| DP12 (Pulse Companion) | Experience Layer Extension |
|------------------------|--------------------------|
| Reflection assistant | + Translation layer, social router, courage amplifier |
| Pattern sensing | + Growth coaching, archetype recognition |
| Personal companion | + Agent-to-agent communication, multi-companion parties |
| Work ally | + World interface that routes toward humans |

DP12 provides the foundation. The Experience Layer's companion system builds on that foundation with the social routing, translation, and evolution mechanics that make the companion a *world interface* rather than just a personal assistant.

## Derivable Features

| Feature | Phase | Complexity | Notes |
|---------|-------|------------|-------|
| Basic companion with personality | 0 | Low | System prompt + Personality Layer |
| Communication style learning | 1 | Medium | Interaction pattern analysis |
| Social routing ("ask @alex about this") | 5 | Medium | Knowledge graph + expertise mapping |
| Agent-to-agent communication | 5 | High | Multi-agent coordination protocol |
| Translation layer (audience adaptation) | 4 | Medium | Cognitive model per user |
| Courage amplification | 4 | Medium | Hesitation detection + nudge system |
| Companion evolution stages | 4 | Medium | Stage progression triggers |
| Multi-companion parties | 5 | High | Multi-agent party coordination |
| Boundary maintenance | 4 | Low | System prompt + behavioral rules |

## Open Questions

- [ ] How do we handle the uncanny valley of companions that feel "almost friend"?
- [ ] What's the consent model for agent-to-agent communication? (Your companion tells someone else's companion about your work — what's ok?)
- [ ] How do we prevent companion evolution from feeling like a Tamagotchi obligation?
- [ ] Should companions have visible "names" that persist, or are they always "your companion"?
- [ ] How does the companion boundary work across cultures with different relationship norms?
- [ ] What happens when a companion's social routing suggestion is unwelcome?
