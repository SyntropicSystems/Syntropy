---
id: "pl-personality-stack"
type: module
title: "Personality Layer — The Five-Layer Stack"
status: exploring
owner: pulse-companion-agent
created: 2026-02-24
updated: 2026-02-25
refs:
  depends-on: [dp17, personality-layer]
  related: [pl-design-pillars, pl-feature-derivation, pl-implementation, pl-memory-moments, pl-procedural-engine, pl-role-archetypes, pl-voice-sheets]
tags: [personality-layer, personality-stack, layers, hierarchy, module]
---

# The Five-Layer Personality Stack

The personality stack defines five distinct layers, each with different ownership, rates of change, and creative constraints. The critical rule: **each layer can only add to or style the layers below it.** Layer 5 can never contradict Layer 1.

## The Stack

```
+------------------------------------------------------+
|  Layer 5: MOMENTS  (hand-authored, rare)             |
|  Memory-tracked milestones, running gags, callbacks   |
|  Rate of change: per session (accumulated)            |
|  Owned by: system (earned through interaction)        |
+------------------------------------------------------+
|  Layer 4: VOICE  (per-agent instance)                |
|  Character sheets, vocabulary, quirks, relationships  |
|  Rate of change: per agent creation/evolution          |
|  Owned by: agent author + evolution system             |
+------------------------------------------------------+
|  Layer 3: BRAND  (per-role archetype)                |
|  Output conventions, flavor pools, mechanical identity |
|  Rate of change: occasionally (new roles)              |
|  Owned by: meta-agent / platform team                  |
+------------------------------------------------------+
|  Layer 2: TONE  (platform-wide)                      |
|  Design pillars governing all communication            |
|  Rate of change: rarely (foundational)                 |
|  Owned by: meta-agent / platform team                  |
+------------------------------------------------------+
|  Layer 1: FUNCTION  (sacred, immutable)              |
|  Accuracy, correctness, clarity of functional output   |
|  Rate of change: never (unless improving accuracy)     |
|  Owned by: everyone (non-negotiable)                   |
+------------------------------------------------------+
```

## Layer 1: Function (Sacred, Immutable)

**Borderlands equivalent**: Gun stats are always accurate. Damage numbers don't lie. Gameplay is never compromised.

**Agent equivalent**: Test results are always accurate. File paths are always correct. Error messages are always clear. Code suggestions compile. Build output is parseable.

### Rules

- No personality element may make output harder to parse
- No personality element may reduce accuracy
- No personality element may slow action
- Functional output must be complete and correct *before* any personality is added
- At personality level "off," only this layer is active

### Examples

```
FUNCTIONAL OUTPUT (Layer 1 only):
  3 files modified: auth.ts, session.ts, middleware.ts
  Tests: 47 passed, 0 failed
  Build: success (23s)
```

This output is always present, always accurate, regardless of personality settings.

## Layer 2: Tone (Platform-Wide)

**Borderlands equivalent**: "Funny but with a hard edge." Sidequests can be silly, main plot is comparatively straight-faced. Characters > plot.

**Agent equivalent**: The six design pillars (see `design-pillars.md`) that govern all agent communication. Competent first, character second. Warmth over wit. Function is sacred.

### Rules

- Applies universally to all agents
- Changes rarely (foundational decisions)
- Defines what's *not allowed* more than what's required
- At personality level "minimal," Layers 1-2 are active

### Effect

Tone makes output warm without being characterized:

```
WITH TONE (Layers 1-2):
  3 files modified: auth.ts, session.ts, middleware.ts
  Tests: 47 passed, 0 failed. Clean.
  Build: success (23s)
```

The word "Clean." adds warmth. It doesn't identify an archetype. It's platform-wide tone.

## Layer 3: Brand (Per-Role Archetype)

**Borderlands equivalent**: Jakobs = wood & revolvers & Western. Torgue = EXPLOSIONS. Maliwan = sleek & elemental. The manufacturer identity that makes items from the same brand feel related.

**Agent equivalent**: Role archetypes (Navigator, Artisan, Scout, Sentinel, Custodian) that define output conventions, flavor vocabulary, and mechanical identity. See `role-archetypes.md` for full definitions.

### Rules

- Consistent across all agents of the same archetype
- Defines output *format*, not individual personality
- Flavor pools draw from archetype-specific vocabulary
- At personality level "professional," Layers 1-3 are active

### Effect

Brand shapes how output is structured:

```
SENTINEL (Layers 1-3):
  4 issues found. 2 real, 2 style.
  auth.ts:47 — unused import (leftover from refactor)
  session.ts:12 — missing return type annotation
  No blockers. Solid refactor.
```

The structure (metrics first, breakdown second, verdict last) is Sentinel brand. Any Sentinel would format this way.

## Layer 4: Voice (Per-Agent Instance)

**Borderlands equivalent**: Claptrap says "minion," Torgue YELLS, Lilith is terse. Character-specific vocabulary, speech patterns, catchphrases within the manufacturer/role framework.

**Agent equivalent**: Individual voice sheets that give each agent instance a specific character — vocabulary preferences, quirks, relationship dynamics with other agents. See `voice-sheets.md`.

### Rules

- Adds specificity within archetype constraints
- Defines what this *particular* agent says, not what all agents of this type say
- Must stay within archetype vocabulary and tone bounds
- Full personality level activates this layer

### Effect

Voice makes the agent recognizable as an individual:

```
SENTINEL "Warden" (Layers 1-4):
  4 issues. 2 are real, 2 are style. The real ones are
  in auth.ts, naturally.
  auth.ts:47 — unused import
  session.ts:12 — missing return type
  No blockers. Solid refactor.
```

"The real ones are in auth.ts, naturally." is this specific Sentinel's voice — dry, knowing, familiar with the codebase's patterns.

## Layer 5: Moments (Memory-Tracked, Earned)

**Borderlands equivalent**: Red flavor text on legendary items. The Bane screaming when you fire it. One-offs that become legendary because they're rare and memorable.

**Agent equivalent**: Milestones, callbacks, and rare events that emerge from accumulated state. Running gags that develop over time. These can't be configured — they're earned.

### Rules

- Maximum 1 notable moment per session
- Must reference actually-tracked state (never fabricated)
- Triggered by specific conditions (see `memory-moments.md`)
- Most outputs have zero Layer 5 content — moments are rare by design

### Effect

Moments create memorable landmarks:

```
SENTINEL "Warden" — MOMENT (all layers):
  Clean pass. Zero issues.
  That's 25 consecutive green builds. We're in uncharted
  territory. I'm... proud? Is that the word?
```

This only fires when the streak counter actually hits 25. It fires once. It becomes a callback for future reference.

## Layer Interaction Rules

1. **Higher layers never contradict lower layers.** A moment can't make a test result incorrect. A voice quirk can't violate tone pillars.

2. **Higher layers are optional.** Each configuration level activates more layers, but removing upper layers never breaks lower ones.

3. **Higher layers have lower density.** Layer 1 is 100% of output. Layer 2 adds occasional warmth. Layer 3 shapes structure. Layer 4 adds 1 sentence per block. Layer 5 fires maybe once per session.

4. **Layers compose, not override.** Each layer adds to the output; none replaces what came before.

## The Borderlands Mapping

| Borderlands Layer | Personality Layer | Rate of Change |
|------------------|------------------|----------------|
| Gun stats | Layer 1: Function | Never |
| Universe tone | Layer 2: Tone | Rarely |
| Manufacturer identity | Layer 3: Brand | Occasionally |
| Character voice | Layer 4: Voice | Per-agent |
| Red flavor text | Layer 5: Moments | Per-session (earned) |

## Derivable Features

| Feature | Phase | Complexity | Notes |
|---------|-------|------------|-------|
| Layer 1 correctness validation | 0 | Low | Ensure personality never degrades output |
| Layer 2 tone in system prompts | 0 | Low | Design pillar injection |
| Layer 3 archetype output formatting | 1 | Medium | Template system |
| Layer 4 voice sheet integration | 2 | Medium | Per-agent prompt customization |
| Layer 5 moment trigger system | 4 | Medium | Memory + condition checking |
| Layer interaction validation | 2 | Low | Automated test: "can Layer N contradict Layer N-1?" |

## Open Questions

- [ ] How do we validate that Layer 5 never contradicts Layer 1 at runtime?
- [ ] Should layers be independently toggleable or only as a stack (1 -> 1-2 -> 1-3 -> etc.)?
- [ ] How does the stack interact with different AI models that have different personality capabilities?
