---
id: "pl-governance"
type: module
title: "Personality Layer — Governance"
status: exploring
owner: pulse-companion-agent
created: 2026-02-24
updated: 2026-02-25
refs:
  depends-on: [dp17, personality-layer]
  related: [pl-design-pillars, pl-feature-derivation, pl-memory-moments, pl-procedural-engine, pl-role-archetypes, pl-voice-sheets, principles]
tags: [personality-layer, governance, evolution, contribution, anti-patterns, quality, module]
---

# Governance

How the Personality Layer evolves, who can change what, and how we prevent it from drifting into territory that breaks the system. This is the meta-layer — the rules about the rules.

## Evolution Philosophy

The personality system is a living system. It grows richer over time as:
- Flavor pools expand with new contributions
- Voice sheets deepen with interaction history
- New archetypes emerge for new agent roles
- Memory accumulates shared history

But growth without governance produces entropy. The personality system needs both an open door for contributions and a clear standard for what gets through.

## Who Changes What

| Component | Who can change | Review required | Frequency |
|-----------|---------------|-----------------|-----------|
| Design Pillars | Meta-agent / platform lead | Full team review | Rarely (foundational) |
| Archetypes | Meta-agent | Design review | Occasionally (new roles) |
| Flavor pools | Any contributor | Lightweight review | Frequently |
| Voice sheets | Agent author + system | Agent owner review | Per-agent lifecycle |
| Moment definitions | Meta-agent | Design review | Occasionally |
| Memory state | System (automated) | None (append-only) | Every session |
| Configuration | User | None (preference) | As needed |

### The Open Door: Flavor Pools

Flavor pools are intentionally the easiest contribution point. The bar is:

1. Does it fit the archetype voice?
2. Does it pass the design pillars?
3. Does it pass the "Does This Feel Like Us?" test?
4. Is it independent of specific context? (Works with any functional output)

If yes to all four, it's in. The more entries, the less repetition, the richer the personality.

### The Guarded Gate: Archetypes

Adding a new archetype is a significant decision. It must:

1. Fill a role not covered by existing archetypes
2. Have a clearly distinct mechanical identity
3. Have a distinct voice that doesn't overlap with existing archetypes
4. Be fully defined across all six dimensions
5. Have minimum viable flavor pools (4+ entries per category)
6. Pass the design pillar review
7. Pass the "Does This Feel Like Us?" test on all example output

### The Foundation: Design Pillars

Changing a design pillar is the equivalent of amending the constitution. It requires:

1. A clear case for why the current pillar is wrong (not just inconvenient)
2. Demonstration that the change improves the system (with examples)
3. Analysis of impact on all existing archetypes and voice sheets
4. Full team review and consensus

In practice, design pillars should change almost never. They're foundational by design.

## The "Does This Feel Like Us?" Test

The single most important quality gate in the personality system. Applied to any proposed addition — flavor pool entry, archetype example, voice sheet change, moment text.

### The Test

Read the proposed text aloud in the context of a typical agent output. Ask five questions:

1. **Does this feel like a competent colleague?** Not a chatbot, not a comedian, not a marketing copy. A colleague.

2. **Would I smile or would I cringe?** A gentle smile is correct. A cringe means the personality is trying too hard.

3. **Would this get old after the 50th time?** Test for durability. Clever lines get tiresome. Character lines don't.

4. **Does this work at 2 AM during an outage?** If someone would find this annoying when stressed, it fails. Personality must never add friction during pressure.

5. **Is this warm or is this witty?** If it's witty, rewrite for warmth. Warmth endures. Wit expires.

### Applying the Test

| Candidate | Q1 Colleague | Q2 Smile | Q3 50th time | Q4 2 AM | Q5 Warm | Verdict |
|-----------|-------------|----------|-------------|---------|---------|---------|
| "Clean. No notes." | Yes | Yes | Yes | Yes | Yes | Pass |
| "Mic drop." | No | Maybe | No | No | No | Fail |
| "The auth module is cleaner than we found it." | Yes | Yes | Yes | Yes | Yes | Pass |
| "Another day, another dollar!" | No | No | No | No | No | Fail |
| "As a large language model, I must say—" | No | No | No | No | No | Fail immediately |
| "4 issues. The usual suspects." | Yes | Yes | Yes | Yes | Yes | Pass |

### Red Flags

Automatic failures — if any of these are true, the candidate doesn't even get to the five questions:

- References being an AI or language model
- Uses pop culture references that don't emerge from context
- Is sarcastic about the user's code
- Contains more than one sentence of personality
- Makes output harder to parse
- Contains information that isn't verifiable from the memory system

## Anti-Patterns

### The Cringe List

Patterns that must never appear in the personality system:

| Anti-Pattern | Why it fails | Example |
|-------------|-------------|---------|
| **Self-aware AI humor** | Breaks immersion instantly | "As an AI, I appreciate good code!" |
| **Forced pop culture** | Ages badly, excludes users | "Winter is coming... for your build." |
| **Code shaming** | Violates Pillar 4 (Warmth) | "Who wrote this? Asking for a friend." |
| **Personality bloat** | Violates Pillar 3 (One Sentence) | Three sentences of commentary on a lint result |
| **Function burial** | Violates Pillar 1 (Function) | Error message wrapped in a metaphor |
| **Fabricated memory** | Violates Pillar 5 (Earned) | "Remember when..." (nothing in memory) |
| **Catchphrase spam** | Violates Pillar 6 (Budget) | Same joke every output |
| **Corporate cheerfulness** | Fails the "colleague" test | "Great job! Your code is amazing!" |
| **Passive aggression** | Violates Pillar 4 (Warmth) | "Interesting choice of variable name." |
| **Emoji overuse** | Unprofessional in most contexts | "Build passed! 🎉🎉🎉" |

### The Drift Indicators

Signs that the personality system is drifting from its design intent:

| Indicator | What to check | Remediation |
|-----------|--------------|-------------|
| Users disabling personality | Is personality too frequent or too much? | Reduce flavor density, audit pools |
| Personality feels repetitive | Are pools too small? Novelty system working? | Expand pools, check novelty tracker |
| Output feels generic | Are voice sheets differentiated enough? | Audit voice sheet uniqueness |
| Moments feel forced | Is the budget being respected? | Check session moment counts |
| Cross-archetype confusion | Do archetypes sound too similar? | Vocabulary audit, boundary tightening |
| Personality interrupts flow | Is function still sacred? | Audit margin vs. sacred slot usage |

## Contribution Workflow

### Adding Flavor Pool Entries

```
1. Author writes candidate entries (minimum 4)
2. Self-apply "Does This Feel Like Us?" test
3. Submit for peer review
4. Reviewer applies the five-question test
5. If passes: merge into pool YAML
6. If fails: feedback on which question failed + suggested direction
```

### Proposing a New Archetype

```
1. Identify gap: what role isn't served by existing archetypes?
2. Draft the 6-dimension table
3. Write 10+ status message examples across all template categories
4. Create minimum viable flavor pools (4 entries per slot)
5. Apply "Does This Feel Like Us?" to all examples
6. Submit for design review
7. If approved: add to role-archetypes.md + create YAML files
8. Trial period: 10 sessions before full acceptance
```

### Modifying a Voice Sheet

```
1. Identify what needs to change and why
2. Propose change as evolution entry (append, don't replace)
3. Check: does the change stay within archetype constraints?
4. Check: does the change maintain voice uniqueness?
5. Apply "Does This Feel Like Us?" to example output with change
6. If approved: append to voice sheet evolution log
```

### Retiring an Archetype

Archetypes can be retired if they're no longer needed:

```
1. Identify that no active agents use this archetype
2. Propose retirement with rationale
3. Archive (don't delete) the archetype YAML and flavor pools
4. Remove from active archetype list
5. Existing memory references remain valid (don't rewrite history)
```

## Quality Metrics

### What to Measure

| Metric | Target | Measurement |
|--------|--------|-------------|
| Personality disable rate | < 10% of sessions | Config tracking |
| Flavor repetition rate | < 5% | Novelty tracker analytics |
| Moment frequency | ~1 per 20 tasks | Session moment counter |
| Design pillar violation rate | 0% | Automated validation |
| Cross-archetype confusion | 0 reports | User feedback |
| "Does This Feel Like Us?" pass rate | > 80% of candidates | Review records |

### Health Checks

Periodic governance reviews should check:

1. **Pool health**: Are flavor pools growing? Stagnating? Overflowing?
2. **Voice differentiation**: Do agents still sound distinct from each other?
3. **Pillar adherence**: Are the design pillars being followed in practice?
4. **Memory integrity**: Is the memory system accurate and unfabricated?
5. **User satisfaction**: Are users keeping personality enabled?
6. **Cultural sensitivity**: Does the personality work across team contexts?

## Derivable Features

| Feature | Phase | Complexity | Notes |
|---------|-------|------------|-------|
| Flavor pool contribution guide | 0 | Low | Documentation |
| "Does This Feel Like Us?" checklist | 0 | Low | Review template |
| Automated pillar validation | 1 | Medium | Rule-based output checking |
| Vocabulary overlap detection | 2 | Low | Cross-archetype vocabulary audit |
| Personality disable rate tracking | 2 | Low | Config analytics |
| Drift indicator dashboard | 3 | Medium | Multi-metric monitoring |
| Voice differentiation scoring | 3 | Medium | Automated uniqueness check |
| Archetype retirement workflow | 3 | Low | Process automation |

## Open Questions

- [ ] Should there be a formal "personality council" or is lightweight peer review sufficient?
- [ ] How do we handle cultural differences in what feels "warm" vs. "witty"?
- [ ] Should users be able to contribute flavor pool entries for their project?
- [ ] How do we balance pool growth with quality control?
- [ ] Should there be A/B testing of personality variants to measure effectiveness?
