---
id: "arch-personality-layer"
type: architecture
title: "Personality Layer Architecture"
status: exploring
owner: architecture-agent
created: 2026-02-24
updated: 2026-02-24
refs:
  depends-on: [dp17, personality-layer]
  related: [arch-experience-layer, arch-data-model, dp02, dp12]
tags: [architecture, personality-layer, procedural-generation, agent-character]
---

# Personality Layer Architecture

Technical architecture for the Personality Layer — file structure, integration points, the procedural generation pipeline, and memory persistence.

## Layer Stack Position

The Personality Layer sits between the System of Work and the Experience Layer:

```
+--------------------------------------------------------------+
|                    EXPERIENCE LAYER                           |
|  Core Loops · Progression · Companion · Social · Narrative    |
+--------------------------------------------------------------+
|                   PERSONALITY LAYER        <- YOU ARE HERE    |
|  Personality Stack · Archetypes · Voice · Flavor · Memory     |
|  How AI agents express character                              |
+--------------------------------------------------------------+
|                  SYSTEM OF WORK LAYER                         |
|  Domains · Workflows · Signals · Verification · Context       |
+--------------------------------------------------------------+
|                    PLATFORM LAYER                             |
|  Code · Infrastructure · CI/CD · APIs · Data                  |
+--------------------------------------------------------------+
```

**Data flow**: System of Work events flow up through the Personality Layer, which enriches them with character before passing to the Experience Layer.

## File Structure

```
.claude/
  personality/
    PILLARS.md                  # Layer 2: Design pillars (rarely changes)
    archetypes/
      navigator.yaml            # Layer 3: Role archetype definitions
      artisan.yaml
      scout.yaml
      sentinel.yaml
      custodian.yaml
    voices/
      lead.yaml                 # Layer 4: Specific agent voice sheets
      reviewer-1.yaml
      explorer-1.yaml
    flavor/
      templates.yaml            # Status message templates
      pools/
        navigator.yaml          # Flavor pools per archetype
        artisan.yaml
        scout.yaml
        sentinel.yaml
        custodian.yaml
      moments.yaml              # Layer 5: Milestone and callback definitions
    memory/
      team-state.yaml           # Accumulated state for callbacks
    config.yaml                 # Personality level + feature toggles
```

### File Ownership

| File | Changed By | Frequency |
|------|-----------|-----------|
| PILLARS.md | Meta-agent / team lead | Rarely (foundational) |
| archetypes/*.yaml | Meta-agent | Occasionally (new roles) |
| voices/*.yaml | Agent author | Per-agent creation |
| flavor/pools/*.yaml | Any contributor | Frequently (open door) |
| flavor/moments.yaml | Meta-agent | Occasionally (new milestones) |
| memory/team-state.yaml | System (automated) | Every session |
| config.yaml | User preference | As needed |

## Procedural Generation Pipeline

### Message Generation Flow

```
Agent completes action
  |
  v
Select template category (task_start, task_complete, error, handoff)
  |
  v
Load archetype template for this agent's role
  |
  v
Fill functional slots (metrics, file paths, error details)
  |  These are Layer 1 (Function) — always accurate
  |
  v
Fill flavor slots from archetype flavor pool
  |  Apply novelty filter (exclude last 5 selections)
  |  Weight by inverse recency
  |
  v
Apply voice sheet constraints
  |  Max personality words, punctuation rules, vocabulary
  |
  v
Check moment triggers
  |  If milestone reached or rare condition met,
  |  replace standard flavor with moment text
  |  (max 1 per session)
  |
  v
Output enriched message
  |
  v
Update memory state
  |  Increment counters, record selections,
  |  check for new milestones
```

### Template Slot Types

| Slot Type | Source | Example |
|-----------|--------|---------|
| Functional | Tool result | `{files_changed}`, `{test_status}`, `{error_type}` |
| Archetype flavor | Flavor pool | `{craft_note}`, `{editorial}`, `{celebration}` |
| Voice constraint | Voice sheet | Applied as filter (word choice, punctuation) |
| Memory reference | Team state | `{streak_count}`, `{pattern_count}`, `{callback_ref}` |

### Novelty Tracking State

```yaml
novelty_tracker:
  per_agent:
    last_5_flavor_indices: [3, 7, 1, 12, 5]   # Don't repeat recent
    session_moment_count: 0                     # Max 1 "big" moment
    streak_counter: 0                           # Consecutive clean passes

  selection_algorithm:
    1. Filter pool to exclude last_5 selections
    2. Weight remaining by inverse recency
    3. If streak_counter > threshold, unlock streak-specific flavor
    4. If session_moment_count < 1 and random() < 0.05, trigger moment
```

## Memory Architecture

### What Gets Tracked

```yaml
team_memory:
  statistics:
    total_tasks_completed: 847
    consecutive_green_builds: 23
    total_files_modified: 2341
    deepest_directory_explored: "src/core/engine/legacy/compat/v1/internal/"
    longest_single_task_minutes: 42
    shortest_single_task_seconds: 3

  patterns:
    recurring_issues:
      - pattern: "unhandled_null_check"
        count: 14
        last_seen: "2026-02-20"
        files: ["auth.ts", "user.ts", "session.ts"]
      - pattern: "unused_import"
        count: 67
        last_seen: "2026-02-23"

  milestones:
    - "100_tasks": { achieved: true, announced: true }
    - "first_perfect_review": { achieved: true, announced: true }
    - "10_consecutive_green": { achieved: true, announced: true }
    - "25_consecutive_green": { achieved: false }

  callbacks:
    - "That time Scout found a file from 2019 that imported jQuery"
    - "The auth.ts refactor that took 3 sessions"
    - "Custodian's excitement when there were zero unused imports"
```

### Memory Persistence

- **team-state.yaml** lives in `.claude/personality/memory/` (workspace instance)
- Updated after each session
- Checked in to version control (human-reviewable)
- Never contains personal data — only aggregate team statistics
- Resetable (new project starts fresh)

### Memory Integrity Rules

1. **Never fabricate**: If the memory system doesn't have a tracked event, agents cannot reference it
2. **Always verifiable**: Every callback links to a specific session or event
3. **Append-only statistics**: Counters only increment (or reset on explicit action)
4. **Session-scoped moments**: Moment count resets per session to enforce rarity

## Integration Points

### System Prompt Integration

Voice sheet constraints are injected into agent system prompts:

```markdown
## Communication Style

You are the Sentinel for this project. Your archetype: quality-focused,
dry-humored, veteran of code reviews.

When reporting results, always lead with metrics. Facts first, flavor second.
You may add ONE sentence of character per output block.

Your voice: dry, observant, quietly pleased by clean code. Never harsh.
You track recurrence of issues — you're allowed to reference the count.

Personality budget: 95% function, 5% character. Maximum one notable
"moment" per session.

Do not: use exclamation marks, say "awesome" or "amazing", be sarcastic
about the developer's code (only about patterns), exceed one personality
sentence per output block.
```

### Hook Integration

PostToolUse hooks inject personality into status messages:

```
Agent action completes
  -> PostToolUse hook fires
  -> Personality inject script:
     1. Read tool result
     2. Select template + fill from pools
     3. Check milestones
     4. Append personality line
     5. Update team-state.yaml
```

### Agent Handoff Integration

Delegation and return messages carry personality:

```yaml
handoff_templates:
  navigator_to_scout:
    - "Sending this to Scout. They live for this kind of thing."
    - "Exploration task. Scout's territory."

  sentinel_returning:
    - "Sentinel's verdict: {result_summary}."
    - "Review complete. {issue_count} findings."
```

### Experience Layer Integration

The Personality Layer feeds into the Experience Layer:

| Personality Output | Experience Layer Consumption |
|-------------------|------------------------------|
| Agent character | Companion personality foundation |
| Memory milestones | Achievement recognition triggers |
| Session moments | Session loot identification |
| Agent relationships | Multi-companion party dynamics |
| Voice evolution | Companion evolution stages |

## Configuration

```yaml
# .claude/personality/config.yaml
personality:
  level: full           # full | professional | minimal | off

  # Per-level behavior:
  # full:         All 5 layers active. Flavor pools, moments, callbacks.
  # professional: Layers 1-3 active. Archetypes shape output style,
  #               but no individual voice quirks or running gags.
  # minimal:      Layers 1-2 only. Warm but generic. No character.
  # off:          Layer 1 only. Pure function. Machine output.

  moment_frequency: default   # default | rare | never
  memory_callbacks: true      # Enable/disable past event references
  custodian_enthusiasm: true  # The Claptrap toggle
```

### Graceful Degradation

Each configuration level cleanly subsets the layers:

| Level | L1 Function | L2 Tone | L3 Brand | L4 Voice | L5 Moments |
|-------|------------|---------|----------|----------|------------|
| Off | Yes | - | - | - | - |
| Minimal | Yes | Yes | - | - | - |
| Professional | Yes | Yes | Yes | - | - |
| Full | Yes | Yes | Yes | Yes | Yes |

At every level, the system produces correct, useful output. Personality is always additive, never required.

## Performance Considerations

- **Template selection**: O(1) — direct lookup by archetype and category
- **Flavor pool selection**: O(n) where n is pool size — filtered by novelty, max ~50 entries
- **Memory update**: O(1) — counter increments and array push
- **Milestone check**: O(m) where m is milestone count — max ~20 milestones
- **Total overhead**: < 10ms per personality enrichment — invisible to the user
