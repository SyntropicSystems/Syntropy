---
id: "pl-procedural-engine"
type: feature-spec
title: "Personality Layer — Procedural Engine"
status: exploring
owner: pulse-companion-agent
created: 2026-02-24
updated: 2026-02-24
refs:
  depends-on: [dp17, personality-layer]
  related: [pl-personality-stack, pl-role-archetypes, pl-voice-sheets, pl-memory-moments, arch-personality-layer]
tags: [personality-layer, procedural-engine, templates, flavor-pools, novelty, handoff, module]
---

# Procedural Engine

The engine that makes personality scale. Instead of hand-authoring every line, the system combines templates, flavor pools, and novelty tracking to produce output that feels authored but is procedurally assembled — like how Borderlands generates millions of unique guns from a constrained set of parts.

This is what separates "AI with a personality prompt" from "AI with a personality *system*."

## Why Procedural

Hand-authored personality doesn't scale:

| Approach | First week | First month | First year |
|----------|-----------|-------------|------------|
| Hand-authored lines | Fresh, delightful | Starting to repeat | Stale, annoying |
| Random selection | Fresh, inconsistent | Inconsistent, confusing | No character at all |
| Procedural generation | Fresh, consistent | Still fresh, deepening | Character with history |

The procedural engine solves the "personality at scale" problem: consistent character across thousands of interactions without repetition or creative burnout.

## Template System

### Template Categories

Every agent action maps to exactly one template category:

| Category | Trigger | Example Context |
|----------|---------|-----------------|
| `task_start` | Agent begins work | "Starting on auth module. Should be clean." |
| `task_complete` | Agent finishes work | "3 files modified. Tests green." |
| `clean_pass` | Zero issues found | "Clean. No notes." |
| `error` | Something failed | "Build failed at auth.ts:47. Missing semicolon." |
| `handoff_send` | Delegating to another agent | "Sending this to Scout." |
| `handoff_receive` | Receiving delegation | "Got it. Let me take a look." |
| `handoff_return` | Returning results | "Done. Here's what I found." |
| `idle` | Waiting for input | "Standing by." |
| `milestone` | Achievement triggered | "That's 100 tasks completed." |

### Template Structure

Each template has two slot types:

```yaml
template:
  category: task_complete
  archetype: artisan
  pattern: "{files_changed} modified. {test_status}. {craft_note}"
  slots:
    functional:
      - files_changed    # From tool result — always accurate
      - test_status      # From tool result — always accurate
    flavor:
      - craft_note       # From flavor pool — character expression
```

**Functional slots** are filled from actual tool results. They are Layer 1 (Function) and are never modified by personality. **Flavor slots** are filled from flavor pools and carry the personality.

### Template Variants

Each archetype has multiple template variants per category, preventing pattern fatigue:

```yaml
artisan_task_complete:
  variants:
    - "{files_changed} modified. {test_status}. {craft_note}"
    - "{test_status}. {files_changed} touched. {craft_note}"
    - "{craft_note}. {files_changed} modified, {test_status}."
  selection: weighted_random  # Weighted by inverse recency
```

Minimum 3 variants per category per archetype. More is better. The novelty system handles the rest.

## Flavor Pools

### Pool Structure

Each archetype has flavor pools organized by slot name:

```yaml
# artisan flavor pool
craft_note:
  - "Clean work."
  - "The auth module is cleaner than we found it."
  - "Solid. No shortcuts."
  - "Tight code. Good boundaries."
  - "Nothing fancy. Just right."
  - "The kind of code you don't need to comment."
  - "Reads well. Maintains well."

brief_approach:
  - "Straightforward refactor."
  - "Incremental approach. Small changes, each tested."
  - "Going to keep it simple."
  - "Standard pattern. Nothing exotic."

brief_reaction:
  - "Fixable."
  - "Seen this before."
  - "Not ideal, but manageable."
  - "Could be worse. Has been worse."
```

### Pool Design Rules

1. **Minimum pool size**: 4 entries per slot. Fewer creates noticeable repetition.
2. **Maximum pool size**: ~50 entries per slot. More becomes hard to maintain quality.
3. **Tone consistency**: Every entry in a pool must feel like it could come from the same archetype.
4. **Independence**: Entries should work with any functional slot content — no assumptions about what the agent just did.
5. **Length discipline**: Most entries are fragments, not sentences. Personality is a garnish, not the meal.

### Pool Contribution

Flavor pools are the most open contribution point in the personality system. Anyone can propose new entries:

1. Write an entry that fits the archetype voice
2. Test it against the design pillars (especially "Function Is Sacred" and "One Sentence Max")
3. Run the "Does This Feel Like Us?" test from `governance.md`
4. Submit for review

Bad entries get rejected. Good entries get added. The pool grows richer over time.

## Novelty System

The novelty system prevents repetition without requiring massive pools.

### Selection Algorithm

```
1. Load flavor pool for this archetype + slot
2. Filter out entries used in the last 5 selections (per agent instance)
3. Weight remaining entries by inverse recency:
   - Never used this session: weight 1.0
   - Used 6-10 selections ago: weight 0.7
   - Used 11-20 selections ago: weight 0.9
   - Used 20+ selections ago: weight 1.0
4. Select weighted random from filtered pool
5. Record selection index in novelty tracker
```

### Novelty State

```yaml
novelty_tracker:
  agent_id: "artisan-1"
  per_slot:
    craft_note:
      last_5: [3, 7, 1, 12, 5]
      full_history: [3, 7, 1, 12, 5, 0, 9, 2, ...]
    brief_approach:
      last_5: [1, 0, 3, 2, 1]
      full_history: [1, 0, 3, 2, 1, ...]
  session_stats:
    selections_made: 47
    unique_entries_used: 34
    repetition_rate: 0.03    # Target: < 0.05
```

### Novelty Guarantees

- **No immediate repeats**: The last 5 filter guarantees no entry appears twice in quick succession
- **Even distribution**: Inverse recency weighting ensures all entries get used over time
- **Fresh sessions**: Session-scoped tracking means a new session feels fresh
- **Graceful degradation**: If the pool is smaller than 5 entries, the filter window shrinks proportionally

## Handoff Messages

Agent-to-agent handoff is a special personality opportunity — it's where character relationships become visible.

### Handoff Template Structure

```yaml
handoff_templates:
  navigator_to_artisan:
    send:
      - "Implementation phase. {agent_name} is on it."
      - "Handing off to {agent_name}. {time_estimate}."
      - "Code time. {agent_name}, you're up."
    receive:
      - "Got it. {brief_approach}"
      - "On it. {scope_acknowledgment}"

  navigator_to_scout:
    send:
      - "Sending this to {agent_name}. They live for this kind of thing."
      - "Exploration task. {agent_name}'s territory."
    receive:
      - "Heading in. {expectation_or_curiosity}"
      - "Let me see what's in there."

  sentinel_returning:
    return:
      - "Sentinel's verdict: {result_summary}."
      - "Review complete. {issue_count} findings."
      - "{issue_count} issues. {severity_note}."

  custodian_returning:
    return:
      - "DONE. {quantified_improvement}. {celebration}"
      - "All clean. {before_after}. {celebration}"
```

### Handoff Relationship Rules

- **Navigator** delegates with calm authority. Brief, trust-implying.
- **Artisan** acknowledges with quiet competence. No fanfare.
- **Scout** receives with enthusiasm. Exploration is a gift.
- **Sentinel** returns with metrics first. Always.
- **Custodian** returns with enthusiasm. Always celebrates the result.

### Handoff Personality Depth

Handoff messages deepen over time (Layer 5: Moments):

```
Session 1:   "Sending this to Scout."
Session 10:  "Sending this to Scout. They always find something."
Session 50:  "Scout again. Nobody maps this codebase like they do."
Session 100: "Scout. The usual. They'll probably find something in that
              legacy directory — they always do."
```

This progression requires accumulated memory and is gated by the earning curve (Design Pillar 5).

## Template Composition Example

A complete message generation, step by step:

```
ACTION: Artisan completes a code modification task

1. TEMPLATE SELECTION
   Category: task_complete
   Archetype: artisan
   Selected variant: "{files_changed} modified. {test_status}. {craft_note}"

2. FUNCTIONAL SLOT FILL (Layer 1)
   files_changed = "3 files"  (from tool result)
   test_status = "Tests green" (from tool result)

3. FLAVOR SLOT FILL (Layer 3)
   craft_note pool: [0:"Clean work", 1:"Solid...", 2:"Tight code...", ...]
   Last 5 selections: [2, 5, 0, 3, 6]
   Filtered pool: [1, 4, 7, 8, 9, ...]
   Selected: 4 = "Nothing fancy. Just right."

4. VOICE SHEET FILTER (Layer 4)
   Agent "lead-artisan" voice constraints:
   - No exclamation marks: ✓ (none present)
   - Max personality words: 6 → "Nothing fancy. Just right." = 4 words ✓
   - Forbidden vocabulary: none triggered ✓

5. MOMENT CHECK (Layer 5)
   Streak counter: 3 (not at threshold)
   Session moment count: 0 (budget available but not triggered)
   Random moment check: 0.72 > 0.05 (no moment)

6. OUTPUT
   "3 files modified. Tests green. Nothing fancy. Just right."

7. STATE UPDATE
   - Increment task counter
   - Record flavor selection index 4 for craft_note
   - Increment streak counter to 4
```

## Edge Cases

### Small Flavor Pools

When a flavor pool has fewer than 6 entries, the novelty filter window shrinks:

| Pool size | Filter window | Effective variety |
|-----------|--------------|-------------------|
| 4 | 2 | 2 entries always available |
| 5 | 3 | 2 entries always available |
| 6+ | 5 | Standard behavior |

### Empty Functional Slots

If a tool result doesn't provide a value for a functional slot, the template gracefully degrades:

```
Template: "{files_changed} modified. {test_status}. {craft_note}"
Missing: test_status

Output: "3 files modified. {craft_note}"
```

The functional slot is omitted entirely — never filled with a guess.

### Personality Level Override

At lower personality configuration levels, the engine skips higher layers:

| Level | Engine behavior |
|-------|----------------|
| `off` | Functional slots only, no template styling |
| `minimal` | Functional slots + tone words ("Clean.") |
| `professional` | Full template + archetype flavor pools |
| `full` | Full template + flavor + voice filter + moments |

## Derivable Features

| Feature | Phase | Complexity | Notes |
|---------|-------|------------|-------|
| Template selection system | 1 | Medium | Category → archetype → variant |
| Flavor pool loading | 1 | Low | YAML parse + filtering |
| Novelty tracking | 1 | Medium | Per-agent selection history |
| Handoff message generation | 2 | Medium | Requires agent-to-agent awareness |
| Template variant authoring tool | 2 | Low | Guided template creation |
| Flavor pool contribution workflow | 2 | Low | Review + merge process |
| Repetition rate monitoring | 3 | Low | Analytics on selection distribution |
| Adaptive pool weighting | 4 | Medium | ML-assisted pool optimization |

## Open Questions

- [ ] Should template variants be weighted by user feedback (implicit approval via non-disabling)?
- [ ] How large should flavor pools grow before they need pruning?
- [ ] Should the novelty tracker persist across sessions or reset each time?
- [ ] How do we handle flavor pools for new archetypes with minimal initial content?
