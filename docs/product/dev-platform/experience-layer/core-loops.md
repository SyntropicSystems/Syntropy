---
id: "el-core-loops"
type: feature-spec
title: "Experience Layer — Core Loops"
status: exploring
owner: pulse-companion-agent
created: 2026-02-24
updated: 2026-02-24
refs:
  depends-on: [dp16, experience-layer]
  related: [dp11, dp12, el-apprenticeship, el-progression, el-narrative]
tags: [experience-layer, core-loops, feedback, satisfaction, module]
---

# Core Loops

The three nested feedback loops that provide satisfaction at every timescale. Like Borderlands' core/meta/social loops, the Experience Layer has three loops that nest inside each other, each feeding the next.

## What Makes a Loop

A game loop is: **Action -> Feedback -> Reward -> Motivation -> Action.** The magic is in the *feeling* at each transition, not the mechanics.

Work already has loops. The problem isn't that work loops don't exist — it's that they're designed for *throughput*, not *experience*. The commit-push-CI-merge loop is perfectly functional. It's also perfectly joyless. Nothing in it acknowledges that you just solved a problem, learned something, or made the system better.

## The Three Nested Loops

```
+------------------------------------------------------------------+
|                                                                    |
|   ADVENTURE LOOP (weeks-months)                                    |
|   Quest -> Discovery -> Growth -> New Territory -> Harder Quest    |
|                                                                    |
|   +--------------------------------------------------------------+ |
|   |                                                              | |
|   |   SESSION LOOP (hours-days)                                  | |
|   |   Engage -> Build -> Verify -> Ship -> Reflect               | |
|   |                                                              | |
|   |   +----------------------------------------------------------+ |
|   |   |                                                          | |
|   |   |   MOMENT LOOP (seconds-minutes)                          | |
|   |   |   Act -> See Result -> Feel Progress -> Act Again        | |
|   |   |                                                          | |
|   |   +----------------------------------------------------------+ |
|   |                                                              | |
|   +--------------------------------------------------------------+ |
|                                                                    |
+------------------------------------------------------------------+
```

## The Moment Loop

**Game equivalent**: Shoot -> Loot -> Equip (Borderlands)

Every interaction has immediate, satisfying feedback. You write a function, tests go green, the AI companion says something that acknowledges what just happened. Not a badge. Not points. A *moment* — the equivalent of the satisfying "cha-ching" of picking up loot.

### Design Principles

1. **Feedback within 2 seconds of any action.** This is a hard UX requirement. If the system can't respond in 2 seconds, it must acknowledge receipt and provide feedback when ready.

2. **Feedback is contextual, not generic.** Not "Good job!" but "Tests green. That auth refactor cleaned up 3 unused imports along the way." The feedback relates to what actually happened.

3. **Progress is visible.** The diff shrinks, the coverage number ticks up, the build gets faster. Concrete, observable change.

4. **Micro-discoveries happen naturally.** The AI notices something interesting while working: "Huh — this module was last touched 14 months ago. Still works perfectly." These are conversational observations, not notifications.

### Moment Types

| Moment | Trigger | Feedback Pattern |
|--------|---------|-----------------|
| Code completion | Tests pass | Contextual acknowledgment of what was achieved |
| Bug fix | Issue resolved | Connection to impact ("This was affecting 3 downstream tests") |
| Review | PR approved | Appreciation of specific contribution |
| Discovery | Anomaly found | Curious observation with exploration invitation |
| Build | CI green | Progress toward session goal |
| Deploy | Service live | Milestone acknowledgment with context |

### Anti-Patterns

- Generic praise ("Great work!") — provides no information
- Interruptions for minor events — breaks flow state
- Forced celebration — feels manufactured
- Metrics-focused feedback ("You're 15% faster today") — feels like surveillance

## The Session Loop

**Game equivalent**: Complete a mission (Borderlands)

A work session has a beginning, middle, and end. Not mandated — felt. You engage with a task, build something, verify it works, ship it, and reflect on what happened. The reflect step is where the session loop feeds the adventure loop.

### Design Principles

1. **Clear entry.** "Loading context... Here's where we are. Here's what's next." The system acknowledges the start of engagement and provides orientation.

2. **Mounting tension.** The problem gets harder, then clicks into place. The system doesn't manufacture tension — it acknowledges the natural arc of problem-solving.

3. **Satisfying resolution.** The PR merges, the deployment succeeds, the test suite goes green. The system marks the moment.

4. **Meaningful reflection.** Not a form — a moment: "That took 3 hours. You estimated 2. The auth integration was the surprise. Want me to update the pattern for next time?" This integrates with the Reflection Loop (DP11) and Pulse Companion (DP12).

5. **Loot drop.** Something you take with you: a new pattern, a reusable component, an insight, a tool. Every session should produce something that persists beyond the session itself.

### Session Phases

```
ENGAGE          BUILD           VERIFY          SHIP            REFLECT
-------         ------          -------         -----           --------
Context load    Problem-solving Testing         Deployment      What happened
Orientation     Iteration       Validation      Integration     What I learned
Goal setting    Discovery       Confidence      Completion      What persists
                                                                Loot capture
```

### Entry Experience (First Visit vs. Return)

**First time entering a domain:**
```
Loading Payments Domain...
---
Welcome to Payments. This is your first visit.

Here's the lay of the land:
  6 modules, 2 external integrations (Stripe, PayPal)
  Core pattern: event-sourced state machine
  The thing everyone gets wrong: refunds aren't the reverse
  of charges — they have their own state machine
  @sarah is the domain expert.

Where would you like to start?
  [Overview] [Architecture] [Common Tasks] [Recent Changes]
```

**Return visit:**
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

## The Adventure Loop

**Game equivalent**: Complete a quest chain, unlock a new area (Borderlands)

Over weeks and months, you're on an adventure. You're building something. Your capabilities are growing. New territory is opening up. The problems you face are harder than the ones you faced before — but you're more capable too.

### Design Principles

1. **Visible growth trajectory.** Not a level number — a capability map. The Pattern Journal (see `progression.md`) reflects your growth in a way that's meaningful to you.

2. **New territory unlocks naturally.** "You've been working with the payment system for three weeks. You now understand it well enough to own it. The deployment domain is adjacent — want to explore?"

3. **Quest chains that build on each other.** Efforts build on prior efforts. The system acknowledges the continuity.

4. **Boss fights that require everything you've learned.** Big launches, architecture migrations, production incidents. The system recognizes when you're facing something that draws on all your accumulated capability.

5. **The "new game plus" effect.** Revisiting old territory with new capability — refactoring code you wrote months ago and seeing how much better you've gotten.

## Loop Transitions

The magic is in how loops nest and transition:

**Moment -> Session**: A series of satisfying moments creates a satisfying session. If individual interactions feel good, the session feels good without any additional mechanics.

**Session -> Adventure**: Each session produces *artifacts* — not just deliverables, but captured learning, improved tools, expanded capability. These artifacts accumulate into adventure-level progress.

**Adventure -> Moment**: Your growing capability changes how moments feel. The same action (deploying to production) feels different when you're new (terrifying) vs. experienced (routine) vs. expert (satisfying). The system acknowledges this evolution.

## Derivable Features

| Feature | Loop | Phase | Complexity |
|---------|------|-------|------------|
| Contextual feedback on code actions | Moment | 0 | Low — system prompt engineering |
| Session start/end with context loading | Session | 1 | Medium — session state tracking |
| "Welcome back" with change summary | Session | 1 | Medium — diff computation |
| Session loot capture | Session | 1 | Low — observation integration |
| Effort narrative tracking | Adventure | 6 | High — narrative engine |
| New territory suggestion | Adventure | 3 | Medium — familiarity analysis |
| "New game plus" recognition | Adventure | 3 | Medium — historical comparison |

## Open Questions

- [ ] How does the Moment Loop interact with different surfaces (CLI vs. web vs. mobile)?
- [ ] What's the right feedback density? Too much feels noisy, too little feels dead.
- [ ] How does the Session Loop handle interrupted sessions (context switch, emergency)?
- [ ] Should the Adventure Loop have explicit "chapter" boundaries or purely emergent ones?
- [ ] How do we measure session satisfaction without adding friction (surveys, etc.)?
