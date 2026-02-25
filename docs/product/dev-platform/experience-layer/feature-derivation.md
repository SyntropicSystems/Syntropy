---
id: "el-feature-derivation"
type: module
title: "Experience Layer — Feature Derivation Framework"
status: exploring
owner: pulse-companion-agent
created: 2026-02-24
updated: 2026-02-25
refs:
  depends-on: [dp16, experience-layer]
  related: [dp-product-index, el-phasing, pl-feature-derivation, wf-add-feature, wf-feature-inception]
tags: [experience-layer, feature-derivation, methodology, framework, module]
---

# Feature Derivation Framework

A methodology for extracting concrete product features, experiments, and design tasks from the Experience Layer vision. This framework ensures the Experience Layer isn't just a philosophy document — it's a source of actionable work.

## How to Use This Framework

The Experience Layer is a rich source of product features, but the features aren't always obvious. This framework provides three lenses for extraction:

1. **Module Lens**: Each module contains a "Derivable Features" table. Start there.
2. **Loop Lens**: Walk through the three core loops and ask "what would make this moment better?"
3. **Persona Lens**: Consider different user types and what matters to them.

## The Module Lens

Every module document contains a "Derivable Features" table with columns:

| Column | Purpose |
|--------|---------|
| Feature | What would be built |
| Phase | Which implementation phase it belongs to |
| Complexity | Low / Medium / High — rough sizing |
| Notes | Implementation context |

### Complete Feature Catalog (from all modules)

This is the consolidated list of all derivable features across all modules, organized by phase:

#### Phase 0 Features (Warm Feedback)

| Feature | Source Module | Complexity |
|---------|-------------|-----------|
| Contextual feedback on code actions | Core Loops | Low |
| Contextual "why" in AI code generation | Apprenticeship | Low |
| Pattern recognition in AI responses | Apprenticeship | Low |
| Companion naming and basic customization | Expression | Low |
| Experience layer disable toggle | Anti-Patterns | Low |

#### Phase 1 Features (Session Awareness)

| Feature | Source Module | Complexity |
|---------|-------------|-----------|
| Session start/end with context loading | Core Loops | Medium |
| "Welcome back" with change summary | Core Loops | Medium |
| Session loot capture | Core Loops | Low |
| Connect-to-known references in AI responses | Apprenticeship | Medium |
| Workspace notification preferences | Expression | Low |
| Personal data isolation architecture | Anti-Patterns | Medium |

#### Phase 2 Features (World Map)

| Feature | Source Module | Complexity |
|---------|-------------|-----------|
| Domain familiarity tracking | World Map | Medium |
| Fog of war visualization | World Map | Medium |
| Context loading experience (first visit vs. return) | World Map | Medium |
| Environmental storytelling (commit archaeology) | World Map | Medium |
| Discovery log (personal) | World Map | Low |
| Code archaeology triggers | World Map | Medium |
| Familiarity decay | World Map | Low |
| Lore-enriched documentation | Narrative | Medium |
| Discovery narratives | Narrative | Low |
| Exploration branch experience | Expression | Low |
| Guided vs. expert path toggle per domain | Expression | Medium |
| Rate limiting for discovery/narrative | Anti-Patterns | Low |
| Altitude adjustment based on familiarity | Apprenticeship | Medium |

#### Phase 3 Features (Progression)

| Feature | Source Module | Complexity |
|---------|-------------|-----------|
| Pattern Journal (basic entries from git) | Progression | Medium |
| Achievement recognition (milestone type) | Progression | Low |
| Expert path adaptation | Progression | Medium |
| Anomaly surfacing (discovery engine) | World Map | High |
| Understanding calibration (estimation tracking) | Apprenticeship | Medium |
| Transparency inspection ("why this?") | Anti-Patterns | Medium |

#### Phase 4 Features (Companion Evolution)

| Feature | Source Module | Complexity |
|---------|-------------|-----------|
| Pattern Journal (emerging patterns - ML) | Progression | High |
| Emergent Archetypes | Progression | High |
| Collaboration Manual (system suggestions) | Progression | Medium |
| Achievement recognition (hidden type) | Progression | Medium |
| Monthly growth coaching | Progression | High |
| Communication style learning | Companion | Medium |
| Translation layer (audience adaptation) | Companion | Medium |
| Courage amplification | Companion | Medium |
| Companion evolution stages | Companion | Medium |
| Boundary maintenance | Companion | Low |
| Narrative commentary from companion | Narrative | Medium |
| Crafting tier progression | Expression | Medium |
| Anti-addiction monitoring | Anti-Patterns | Medium |
| Incident-based skill building | Apprenticeship | Medium |
| Gap detection (worked-on vs. can-articulate) | Apprenticeship | High |

#### Phase 5 Features (Social Layer)

| Feature | Source Module | Complexity |
|---------|-------------|-----------|
| Loot recognition (epic-legendary) | Progression | High |
| Social routing ("ask @alex about this") | Companion | Medium |
| Agent-to-agent communication | Companion | High |
| Multi-companion parties | Companion | High |
| Domain guild feeds | Social | Medium |
| Interest guild discovery | Social | Medium |
| Shared discovery feed | Social | Low |
| Quest guild context pre-alignment | Social | High |
| Contribution ripple tracking | Social | High |
| Social style adaptation | Social | Medium |
| Isolation detection | Social | Medium |
| Guild-level pattern surfacing | Social | High |
| War story capture | Narrative | Medium |
| Blueprint creation and sharing | Expression | Medium |
| Creative contribution pipeline | Expression | Medium |
| Social pressure detection | Anti-Patterns | Medium |
| Cross-pollination suggestions | World Map | High |

#### Phase 6 Features (Narrative)

| Feature | Source Module | Complexity |
|---------|-------------|-----------|
| Effort quest structure | Narrative | Medium |
| Quest log visualization | Narrative | Medium |
| Meta-narrative tracking | Narrative | High |
| Effort narrative tracking | Core Loops | High |
| Blueprint marketplace/discovery | Expression | High |
| "What if" analysis | Expression | High |

## The Loop Lens

Walk through a user's day and ask at each loop transition: "What would make this moment better?"

### Moment Loop Questions
- When the user takes an action, what feedback do they get?
- Is the feedback contextual or generic?
- Does the feedback acknowledge the *meaning* of the action, not just the result?
- Does the user feel progress?

### Session Loop Questions
- When the user starts working, do they know where they are and what's next?
- As they work, does the experience build toward something?
- When they finish, do they know what they accomplished?
- Do they take something with them (loot)?

### Adventure Loop Questions
- Over weeks, can the user see their own growth?
- Is new territory opening up as they grow?
- Are the challenges they face getting harder in proportion to their capability?
- Do they have a sense of direction (quest)?

## The Persona Lens

### The New Contributor
**Needs**: Orientation, scaffolding, encouragement, connection to mentors.
**Key features**: Session awareness (Phase 1), domain exploration with fog of war (Phase 2), guided path (Phase 2), social routing to experts (Phase 5).

### The Experienced Builder
**Needs**: Efficiency, reduced friction, recognition of expertise, interesting challenges.
**Key features**: Expert path (Phase 3), pattern journal (Phase 3), loot recognition (Phase 3-5), companion evolution (Phase 4).

### The Technical Leader
**Needs**: Visibility into team capability, knowledge distribution, bottleneck detection.
**Key features**: Social health signals (Phase 5), contribution ripples (Phase 5), guild intelligence (Phase 5), meta-narrative (Phase 6).

### The Solo Contributor
**Needs**: Personal growth tracking, discovery, self-awareness, reduced isolation.
**Key features**: Pattern journal (Phase 3), growth coaching (Phase 4), discovery engine (Phase 2-3), gentle social routing (Phase 5).

### The AI-Skeptic
**Needs**: Control, transparency, the off switch, proof of value.
**Key features**: Experience disable toggle (Phase 0), transparency inspection (Phase 3), anti-addiction monitoring (Phase 4), minimal-intervention mode.

## Experiment Design Template

When extracting a feature from the Experience Layer, use this template to design a safe experiment:

```markdown
## Experiment: [Feature Name]

### Hypothesis
[What we believe will happen if we build this]

### Module Source
[Which Experience Layer module this derives from]

### Phase
[Which implementation phase]

### Minimum Viable Version
[The smallest thing we can build to test the hypothesis]

### Success Signal
[How we'll know it's working — behavioral, not metric]

### Failure Signal
[How we'll know it's NOT working or causing harm]

### Anti-Pattern Check
[Which anti-patterns could this trigger? How do we prevent them?]

### Rollback Plan
[How do we undo this if it fails?]
```

## Methodology Derivation

The Experience Layer also generates methodologies (ways of working), not just features:

### Derivable Methodologies

| Methodology | Source | Application |
|------------|--------|-------------|
| Contextual feedback design | Core Loops (moment loop) | How all AI agents should give feedback |
| Session-aware interaction | Core Loops (session loop) | How companion state should handle sessions |
| Learning residue integration | Apprenticeship | How AI responses should embed understanding |
| Progressive trust building | Apprenticeship (anti-dependency) | How scaffolding should adapt to capability |
| Privacy-first experience design | Anti-Patterns | How all experience features should handle data |
| Social routing protocol | Companion + Social | How AI should facilitate human connection |
| Narrative documentation | Narrative (lore) | How documentation should tell stories |
| Discovery-driven exploration | World Map | How domain onboarding should work |

Each methodology can be documented as a workflow in the System of Work, making it executable by humans and AI agents.

## How to Extend This Framework

When adding a new module to the Experience Layer:

1. Include a "Derivable Features" table in the module
2. Add the features to the consolidated catalog in this document (organized by phase)
3. Consider the feature through all three lenses (module, loop, persona)
4. For non-obvious features, use the experiment design template
5. Check all features against the anti-patterns module

When a feature graduates from the Experience Layer into active development:

1. Create a proper feature spec following `docs/_conventions.md`
2. Reference the Experience Layer module as the source
3. Update the consolidated catalog to mark the feature as "in development"
4. Run the anti-pattern check before shipping
