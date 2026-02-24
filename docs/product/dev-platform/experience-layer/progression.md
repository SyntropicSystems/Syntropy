---
id: "el-progression"
type: feature-spec
title: "Experience Layer — Progression System"
status: exploring
owner: pulse-companion-agent
created: 2026-02-24
updated: 2026-02-24
refs:
  depends-on: [dp16, experience-layer]
  related: [dp10, dp11, dp12, el-core-loops, el-apprenticeship, el-companion, el-narrative]
tags: [experience-layer, progression, pattern-journal, archetypes, loot, achievements, module]
---

# Progression System

Growth is reflected, not scored. The system observes and mirrors — it doesn't rank. The Progression System is a collection of mechanics that make personal and professional growth visible, meaningful, and intrinsically motivating.

## The Pattern Journal (Not a Skill Tree)

Skill trees are a game mechanic that doesn't translate. They imply a finite set of paths, a ceiling to hit, and they inherently invite comparison. Human growth doesn't look like that. It's messy, non-linear, surprising, deeply personal.

**The Pattern Journal is a mirror, not a scale.** The system doesn't score you — it *observes* you. It compiles what you've done (discoveries, shipped code, helped peers, tackled hard problems) and reflects back the narrative of your growth.

### Example Pattern Journal

```
PATTERN JOURNAL: @christian
============================================

RECENT ENTRIES
--------------------------------------------

Feb 23: Built Rust CLI that replaced Python validation suite.
        881 checks now run in <2s. Your 4th language migration
        this year — you keep reaching for systems languages
        when performance matters.

Feb 21: Designed verification workflow that 3 domain agents
        now use. You've done this before: build a pattern,
        make it composable, let others adopt it. It's your
        signature move.

Feb 19: Spent 6 hours normalizing workflow verification
        sections across 14 workflows. Tedious work that
        nobody asked for. The validator caught 0 new errors
        afterward — because you fixed them all by hand first.
        You care about consistency even when no one's watching.

Feb 15: Created DevEx domain from scratch. Third new domain
        you've bootstrapped. Each one took less time than
        the last (system: 3 days, bazel: 1 day, devex: 4 hours).
        You're not just building domains — you're building
        the muscle for building domains.

EMERGING PATTERNS
--------------------------------------------

The system notices:

  You gravitate toward "the system that builds the system."
  7 of your last 10 efforts improved the platform itself,
  not the product on top of it.

  You do your deepest work in evening sessions (9pm-midnight).
  Morning sessions are broader — planning, reviewing, exploring.

  When you encounter friction, you fix the system rather than
  work around it.

  You underestimate integration complexity by ~40% consistently.
  Not a flaw to fix — a pattern to account for.
```

### Journal Entry Sources

| Source | What It Captures | Automation Level |
|--------|-----------------|------------------|
| Git commits/PRs | Code contributions, review patterns | Automatic |
| Session reflections | Personal experience, effort, learning | Human-initiated |
| Domain exploration | Familiarity changes, new territory | Automatic |
| Observations | Frictions noticed, ideas captured | Human-initiated |
| Companion interactions | Questions asked, patterns discussed | Automatic |
| Signal creation | System improvements proposed | Human-initiated |

### Journal Properties

- **Personal-first**: The journal is private by default. Never shared without explicit action.
- **Evidence-based**: Every entry links to concrete work artifacts (commits, PRs, observations).
- **Narrative**: Entries tell a story, not list metrics. Written in second person to reflect back.
- **Pattern-aware**: The system identifies emerging patterns across entries.
- **Time-decaying**: Older entries remain but the "emerging patterns" section reflects recent trajectory.

## Emergent Archetypes

Instead of picking a class at character creation, your archetype **emerges from your actions.** You aren't assigned "Senior Developer." The system recognizes your pattern and names it.

### Example Archetypes

```
Primary: THE FOUNDRY
  "You build the tools that build the things."
  Evidence:
  - 70% of efforts improve platform infrastructure
  - Created 3 new domains, 14 workflows, 2 CLI tools
  - Your patterns get adopted by others at 3x the team average

Secondary: THE ARCHAEOLOGIST
  "You dig until you find the real reason."
  Evidence:
  - Average debugging session is 2.3x longer than team avg
  - Fix-to-revert ratio is 98% (team avg: 84%)
  - 8 discoveries were "root cause behind root cause"

Tertiary: THE CARTOGRAPHER
  "You make the territory legible for others."
  Evidence:
  - Written 340% more documentation than team average
  - Domain contexts loaded 4x more than anyone else's
  - You create maps before you explore
```

### Archetype Properties

- **Emergent**: Derived from observed behavior, not self-selected
- **Multi-dimensional**: Primary, secondary, tertiary — people aren't one thing
- **Evolving**: As your work changes, the archetype shifts
- **Non-hierarchical**: No archetype is "better" than another
- **Named with personality**: Each archetype has a memorable name and tagline
- **Evidence-backed**: Every archetype claim links to concrete evidence

### Potential Archetype Gallery

| Archetype | Tagline | Typical Evidence |
|-----------|---------|-----------------|
| The Foundry | "Builds the tools that build the things" | Platform improvements, adopted patterns, meta-work |
| The Archaeologist | "Digs until finding the real reason" | Deep debugging, root cause analysis, historical research |
| The Cartographer | "Makes the territory legible for others" | Documentation, domain contexts, architectural maps |
| The Alchemist | "Turns messy problems into clean patterns" | Refactoring, pattern extraction, complexity reduction |
| The Diplomat | "Bridges domains and perspectives" | Cross-domain work, conflict resolution, integration |
| The Scout | "Finds what nobody knew to look for" | Discovery log entries, exploration, anomaly detection |
| The Sentinel | "Keeps the system honest and safe" | Testing, validation, security review, quality gates |
| The Mentor | "Makes others better at what they do" | Code reviews, onboarding, knowledge sharing |

The archetype gallery grows as more patterns are observed. New archetypes emerge from the data — they aren't pre-designed.

## Collaboration Manual

The Pattern Journal becomes *socially useful* through the Collaboration Manual — a "how to play co-op with me" profile.

```
COLLABORATION MANUAL: @christian
============================================

WHAT I'M STRONG AT (come to me for):
  Platform architecture and "system of systems" design
  Bootstrapping new domains from zero
  Finding root causes in complex systems
  Making implicit knowledge explicit

WHAT I'M LEARNING (I'd love support with):
  Rust idioms (still thinking in C++ patterns)
  GCP-specific infrastructure (coming from AWS background)
  Letting go of perfection on first pass

MY WORKING STYLE:
  I think in diagrams before code
  I prefer depth-first exploration — I'll go deep before
  going wide, and I need to be reminded to surface
  I do my best focused work in evening sessions
  I tend to over-scope — a "is this still the mission?"
  check helps
  I respond well to direct feedback, poorly to hinting

BEST WAY TO COLLABORATE:
  Share context async first, then sync for decisions
  If you need something quick, say so — I'll scope down
  Challenge my architecture early; it saves us both time
  I'll probably want to fix the system instead of the symptom.
  Sometimes the symptom is what actually needs fixing. Tell me.
```

### Manual Properties

- **Opt-in and self-controlled**: You choose what to share. The system suggests; you curate.
- **Living document**: Updates as the Pattern Journal updates, with your approval.
- **Not a performance review**: This is collaboration optimization, not evaluation.
- **Bidirectional**: Others can see what you share; you can see what they share.

## Loot System

In Borderlands, loot is the reward for every engagement. Not just "you won" — "you won *and here's something useful*."

### Loot Tiers

| Tier | Game Equivalent | Platform Equivalent | Example |
|------|----------------|---------------------|---------|
| Common (white) | Basic ammo/health | Task completed, code shipped | "Merged PR #847" |
| Uncommon (green) | Decent gun upgrade | Reusable pattern discovered | "Extracted a retry-with-backoff utility" |
| Rare (blue) | Noticeably better gear | Insight that changes approach | "Realized all our timeout bugs share a root cause" |
| Epic (purple) | Build-defining item | Breakthrough that opens new territory | "Built a generic adapter that replaces 4 custom integrations" |
| Legendary (orange) | Game-changing unique | Paradigm shift for everyone | "Designed the domain agent pattern that became a platform standard" |

### Legendary Loot Has "Red Text"

Just like Borderlands' rarest items, the most impactful discoveries get a memorable tagline:

> **"The retry was inside you all along"**
> *Discovered that 80% of "network failures" were timeout misconfigurations. Fixed root cause; removed 340 lines of retry logic.*

> **"Never trust a service that describes itself as 'simple'"**
> *Three-week investigation revealed the "simple auth proxy" handled 14 edge cases, none documented.*

### Loot Recognition

Loot isn't assigned by a manager. It's *recognized by the system* based on what actually happened:
- What persisted (reusable pattern still in use)
- What got reused (utility adopted by other teams)
- What prevented future problems (fix that reduced incident rate)
- What others referenced (insight cited in decisions)

## Achievements

Pattern recognition applied to work history. Not arbitrary badges — genuine recognition of meaningful patterns.

### Milestone Achievements
- "First Blood" — First PR merged in a new domain
- "Dual Wield" — Contributed to two domains in the same session
- "Cartographer" — Explored every module in a domain
- "The Floor Is Lava" — 10 consecutive deploys with zero rollback

### Mastery Achievements
- "Pattern Hunter" — Identified a recurring anti-pattern across three modules
- "The Whisperer" — Code review comment cited in an ADR
- "One With The Machine" — AI companion anticipated your next three actions correctly

### Social Achievements
- "Trailblazer" — Created a workflow/pattern that three others adopted
- "Sherpa" — Successfully onboarded someone into a domain
- "Raid Boss" — Coordinated a multi-person effort that shipped on time

### Discovery Achievements
- "Spelunker" — Found and documented an undocumented behavior
- "Archaeologist" — Unearthed a commit older than 2 years that explains a current mystery
- "Rosetta Stone" — Connected insights from two unrelated domains

### Hidden Achievements
Not listed anywhere. You discover them by doing something the system recognizes as noteworthy. These reward curiosity and unusual behavior.

## Growth Coaching

The system as personal coach, not judge. Monthly reflections on trajectory, patterns, and growth direction.

```
GROWTH REFLECTION (monthly)
============================================

This month you:
  * Shipped the Rust validator (your first production Rust)
  * Created 2 new workflows adopted by the team
  * Reduced validation cycle from 3 minutes to <2 seconds
  * Mentored @sarah through her first domain bootstrap

Patterns I notice:
  You're shifting from "build it all yourself" toward
  "build the thing that lets others build." The mentor
  session with Sarah is a milestone in that shift.

  Your Rust is improving fast. You're still writing
  "C++ with Rust syntax" sometimes, but the last PR
  had idiomatic error handling throughout.

Things to consider:
  You haven't explored outside your comfort zone in
  3 weeks. Your best discoveries came from adjacent
  domains. Maybe it's time to wander?

  You fixed 4 things this month that weren't broken
  but weren't ideal. That's your perfectionism talking.
  2 of the 4 were worth it. 2 were not.
```

### Coaching Properties

- **Private**: Never shared. This is personal reflection.
- **Evidence-based**: Claims link to concrete work artifacts.
- **Non-prescriptive**: Notices patterns and raises possibilities. Never tells you what to do.
- **Honest**: Acknowledges both strengths and blind spots without sugar-coating.
- **Growth-oriented**: Focused on trajectory and direction, not scores or rankings.

## Expert Path as Earned Trust

The System of Work already has Guided Path vs. Expert Path. In the Experience Layer, this maps to **earned trust** — continuous adaptation based on demonstrated capability:

- As you demonstrate understanding, the system offers less scaffolding
- As you make good decisions, the system defers more to your judgment
- As you contribute patterns that work, the system routes others to learn from you
- As you improve the system itself, the system treats you as a co-designer

This differs per domain. Heavy scaffolding in a new domain, complete deference in your home territory.

## Derivable Features

| Feature | Phase | Complexity | Notes |
|---------|-------|------------|-------|
| Pattern Journal (basic entries from git) | 3 | Medium | Commit/PR analysis |
| Pattern Journal (emerging patterns) | 4 | High | ML/pattern recognition |
| Emergent Archetypes | 4 | High | Cross-journal analysis |
| Collaboration Manual (system suggestions) | 4 | Medium | Journal -> suggestion pipeline |
| Loot recognition (common-rare) | 3 | Medium | Contribution impact analysis |
| Loot recognition (epic-legendary) | 5 | High | Cross-system impact tracking |
| Achievements (milestone) | 3 | Low | Event pattern matching |
| Achievements (hidden) | 4 | Medium | Unusual pattern detection |
| Monthly growth coaching | 4 | High | Pattern synthesis + natural language |
| Expert path adaptation | 2 | Medium | Familiarity-gated scaffolding |

## Open Questions

- [ ] How do we generate Pattern Journal entries that feel authored rather than generated?
- [ ] What's the right frequency for growth coaching? Monthly? After milestones?
- [ ] How do we prevent archetype labels from becoming limiting ("I'm a Foundry, so I shouldn't do X")?
- [ ] Should loot tiers be visible to others or only to the contributor?
- [ ] How do we handle achievement envy or comparison in team settings?
- [ ] What happens when someone's archetype shifts significantly — is that celebrated or just noted?
