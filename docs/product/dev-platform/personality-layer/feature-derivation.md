---
id: "pl-feature-derivation"
type: feature-spec
title: "Personality Layer — Feature Derivation"
status: exploring
owner: pulse-companion-agent
created: 2026-02-24
updated: 2026-02-24
refs:
  depends-on: [dp17, personality-layer]
  related: [pl-personality-stack, pl-design-pillars, pl-role-archetypes, pl-procedural-engine, pl-memory-moments, pl-voice-sheets, pl-governance, pl-implementation, el-feature-derivation]
tags: [personality-layer, feature-derivation, features, extraction, methodology, module]
---

# Feature Derivation

A systematic framework for extracting concrete, implementable product features from the Personality Layer specification. This document serves as both a catalog of derivable features and a methodology for discovering new ones.

## Extraction Methodology

### Three Lenses

Every module in the Personality Layer can be examined through three lenses to extract features:

**1. The Layer Lens**: What features emerge from each stack layer?

| Layer | Extraction Question | Example Feature |
|-------|-------------------|-----------------|
| L1 Function | "What ensures functional output is always correct?" | Output correctness validation |
| L2 Tone | "What enforces platform-wide tone rules?" | One-sentence personality cap |
| L3 Brand | "What makes archetypes consistent?" | Archetype output formatting engine |
| L4 Voice | "What makes individual agents recognizable?" | Voice sheet system prompt compiler |
| L5 Moments | "What makes rare events memorable?" | Milestone trigger and announcement system |

**2. The Module Lens**: What features emerge from each module's design?

| Module | Extraction Question |
|--------|-------------------|
| Personality Stack | "What features enforce the layer hierarchy?" |
| Design Pillars | "What features validate pillar compliance?" |
| Role Archetypes | "What features make archetypes scalable?" |
| Voice Sheets | "What features make individual agents distinct?" |
| Procedural Engine | "What features generate variety without repetition?" |
| Memory & Moments | "What features track and surface meaningful history?" |
| Governance | "What features maintain quality as the system grows?" |
| Implementation | "What features integrate personality into the platform?" |

**3. The Persona Lens**: What features does each user type need?

| Persona | Question | Example Feature |
|---------|----------|-----------------|
| Developer (user) | "How do I control personality?" | Personality level configuration |
| Agent author | "How do I create an agent character?" | Voice sheet creation wizard |
| Contributor | "How do I add flavor?" | Flavor pool contribution workflow |
| Team lead | "How do I ensure quality?" | Governance dashboard |
| Platform architect | "How do I extend the system?" | Archetype creation framework |

## Complete Feature Catalog

### Phase 0: Foundation (No Code Required)

Features achievable through documentation, prompts, and configuration alone.

| ID | Feature | Source Module | Complexity | Description |
|----|---------|--------------|------------|-------------|
| PL-001 | Design pillar documentation in system prompts | Design Pillars | Low | Inject pillar rules into every agent context |
| PL-002 | Archetype descriptions in system prompts | Role Archetypes | Low | Include archetype identity in agent prompts |
| PL-003 | Voice sheet personality injection | Voice Sheets | Low | Add voice constraints to agent prompts |
| PL-004 | Flavor pool contribution guide | Governance | Low | Document how to add flavor entries |
| PL-005 | "Does This Feel Like Us?" checklist | Governance | Low | Review template for personality contributions |
| PL-006 | Personality level configuration | Implementation | Low | config.yaml with level selection |
| PL-007 | File structure scaffolding | Implementation | Low | Create directory layout and starter files |

### Phase 1: Template Engine (Core Machinery)

The procedural engine that generates personality at scale.

| ID | Feature | Source Module | Complexity | Description |
|----|---------|--------------|------------|-------------|
| PL-008 | Template selection system | Procedural Engine | Medium | Category → archetype → variant selection |
| PL-009 | Functional slot filling | Procedural Engine | Low | Tool results → template variables |
| PL-010 | Flavor pool loading and selection | Procedural Engine | Low | YAML parse + weighted random |
| PL-011 | Novelty tracking | Procedural Engine | Medium | Per-agent selection history prevents repeats |
| PL-012 | Voice constraint filtering | Voice Sheets | Medium | Post-processing: word count, punctuation, vocabulary |
| PL-013 | One-sentence validation | Design Pillars | Low | Automated personality sentence count check |
| PL-014 | Margin slot identification | Design Pillars | Low | Label output sections as "sacred" or "margin" |
| PL-015 | Statistics tracking | Memory & Moments | Low | Counter increments after each action |
| PL-016 | PostToolUse hook skeleton | Implementation | Medium | Hook integration for personality injection |
| PL-017 | Error fallback to Layer 1 | Implementation | Low | Graceful degradation on template errors |

### Phase 2: Character System (Individual Identity)

Features that give agents individual character and team dynamics.

| ID | Feature | Source Module | Complexity | Description |
|----|---------|--------------|------------|-------------|
| PL-018 | Voice sheet YAML schema | Voice Sheets | Low | Definition format and validation |
| PL-019 | System prompt compilation | Voice Sheets | Medium | Voice sheet → prompt instruction generation |
| PL-020 | Handoff message generation | Procedural Engine | Medium | Agent-to-agent delegation messages |
| PL-021 | Relationship mapping | Voice Sheets | Medium | Multi-agent relationship awareness |
| PL-022 | Milestone definitions | Memory & Moments | Low | Threshold configuration for achievements |
| PL-023 | Milestone announcement | Memory & Moments | Medium | Template integration for milestone moments |
| PL-024 | Pattern detection | Memory & Moments | Medium | Issue categorization and counting |
| PL-025 | Streak tracking | Memory & Moments | Low | Consecutive clean pass counting |
| PL-026 | Memory state management | Implementation | Medium | Persist + validate team state |
| PL-027 | Warmth calibration | Design Pillars | Medium | Tone analysis on personality output |
| PL-028 | Template variant authoring tool | Procedural Engine | Low | Guided template creation |
| PL-029 | Flavor pool contribution workflow | Procedural Engine | Low | Review + merge process |
| PL-030 | Cross-voice uniqueness check | Voice Sheets | Low | Ensure no signature vocabulary overlap |
| PL-031 | Vocabulary overlap detection | Governance | Low | Cross-archetype vocabulary audit |
| PL-032 | Personality disable rate tracking | Governance | Low | Config analytics |
| PL-033 | Layer interaction validation | Personality Stack | Low | "Can Layer N contradict Layer N-1?" test |
| PL-034 | Cross-archetype vocabulary validation | Role Archetypes | Low | Automated vocabulary boundary check |

### Phase 3: Memory Depth (Earned Character)

Features that make personality deepen over time through accumulated state.

| ID | Feature | Source Module | Complexity | Description |
|----|---------|--------------|------------|-------------|
| PL-035 | Callback recording | Memory & Moments | Medium | Detecting and storing significant events |
| PL-036 | Moment budget tracking | Design Pillars | Low | Session-scoped moment counter |
| PL-037 | Earned-depth gating | Design Pillars | Medium | Memory-based personality depth adaptation |
| PL-038 | Voice evolution tracking | Voice Sheets | Medium | Append-only voice change log |
| PL-039 | Voice consistency validation | Voice Sheets | Low | Automated drift detection |
| PL-040 | Repetition rate monitoring | Procedural Engine | Low | Analytics on flavor selection distribution |
| PL-041 | Memory validation | Memory & Moments | Low | Integrity checks at session start |
| PL-042 | Memory dashboard | Memory & Moments | Low | Human-readable memory state view |
| PL-043 | Earning curve implementation | Memory & Moments | Medium | Session count → feature availability |
| PL-044 | Drift indicator dashboard | Governance | Medium | Multi-metric personality health monitoring |
| PL-045 | Voice differentiation scoring | Governance | Medium | Automated uniqueness scoring |

### Phase 4: Intelligence (Adaptive Personality)

Features that use accumulated data to make personality smarter.

| ID | Feature | Source Module | Complexity | Description |
|----|---------|--------------|------------|-------------|
| PL-046 | Callback matching | Memory & Moments | High | Current-to-past event similarity detection |
| PL-047 | Adaptive pool weighting | Procedural Engine | Medium | ML-assisted flavor pool optimization |
| PL-048 | New archetype creation workflow | Role Archetypes | Medium | Guided archetype definition |
| PL-049 | Archetype retirement workflow | Governance | Low | Process for deactivating unused archetypes |
| PL-050 | Moment trigger system | Personality Stack | Medium | Memory + condition checking for Layer 5 |

## Feature Dependencies

```
Phase 0: PL-001 through PL-007 (independent, documentation-only)
  |
  v
Phase 1: PL-008 → PL-009 → PL-010 → PL-011
         PL-012 (depends on PL-008)
         PL-015 (independent)
         PL-016 (depends on PL-008)
  |
  v
Phase 2: PL-018 → PL-019 → PL-021
         PL-020 (depends on PL-008, PL-018)
         PL-022 → PL-023 (depends on PL-015)
         PL-024 → PL-025 (depends on PL-015)
  |
  v
Phase 3: PL-035 (depends on PL-024)
         PL-037 (depends on PL-015, PL-043)
         PL-038 (depends on PL-018)
  |
  v
Phase 4: PL-046 (depends on PL-035)
         PL-047 (depends on PL-010, PL-040)
         PL-050 (depends on PL-022, PL-035, PL-036)
```

## Derivable Methodologies

Beyond product features, the Personality Layer design yields reusable methodologies:

| Methodology | Application | Source |
|-------------|-------------|--------|
| Procedural content generation | Any system needing variety without repetition | Procedural Engine |
| Five-question quality test | Any creative contribution review process | Governance |
| Layered personality architecture | Any AI system needing configurable character | Personality Stack |
| Archetype-based character scaling | Any multi-agent system needing consistent roles | Role Archetypes |
| Memory-gated depth | Any system where character should deepen over time | Memory & Moments |
| Anti-pattern catalogs | Any design system needing clear "don't do this" lists | Governance |

## Experiment Design Template

For validating personality features before full implementation:

```yaml
experiment:
  name: "{feature_name} validation"
  hypothesis: "Adding {feature} will {expected_outcome}"
  metric: "{what_to_measure}"
  method:
    1. "Implement minimal version of {feature}"
    2. "Run with {n} users for {duration}"
    3. "Measure {metric} vs. baseline"
    4. "Apply 'Does This Feel Like Us?' test to outputs"
  success_criteria:
    - "{metric} improves by {threshold}"
    - "Personality disable rate does not increase"
    - "Zero design pillar violations"
  failure_criteria:
    - "Personality disable rate increases by > 5%"
    - "Users report annoyance or confusion"
    - "Output accuracy decreases"
```

### Example Experiment

```yaml
experiment:
  name: "Handoff message personality"
  hypothesis: "Adding personality to agent handoff messages will
               make multi-agent workflows feel more cohesive"
  metric: "User perception of agent collaboration (survey)"
  method:
    1. "Implement handoff templates for Navigator → Artisan"
    2. "Run with 10 projects for 2 weeks"
    3. "Survey users on agent collaboration perception"
    4. "Compare personality-enabled vs. personality-disabled groups"
  success_criteria:
    - "Collaboration perception improves by 20%"
    - "No increase in personality disable rate"
    - "Zero reports of confusing handoff messages"
```

## Extension Guide

To derive new features from the Personality Layer:

1. **Pick a lens**: Layer, module, or persona
2. **Ask the extraction question** for that lens
3. **Identify the gap**: What's not yet covered in the feature catalog?
4. **Define the feature**: Name, source module, complexity, description
5. **Map dependencies**: What must exist before this feature?
6. **Assign a phase**: Based on dependencies and complexity
7. **Design an experiment**: How will you validate this feature works?
8. **Add to this catalog**: Keep the catalog growing

The Personality Layer specification is designed to be generative — every re-reading through a different lens should surface features not yet cataloged.

## Open Questions

- [ ] Should features be prioritized by user impact or by technical dependency?
- [ ] How do we measure the ROI of personality features vs. functional features?
- [ ] Should there be a separate backlog for personality features or integrated into the main backlog?
- [ ] At what point does the feature catalog need pruning vs. continuous growth?
