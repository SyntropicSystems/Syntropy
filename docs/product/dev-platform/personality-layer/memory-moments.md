---
id: "pl-memory-moments"
type: module
title: "Personality Layer — Memory & Moments"
status: exploring
owner: pulse-companion-agent
created: 2026-02-24
updated: 2026-02-25
refs:
  depends-on: [dp17, personality-layer]
  related: [arch-personality-layer, el-progression, pl-feature-derivation, pl-governance, pl-personality-stack, pl-procedural-engine]
tags: [personality-layer, memory, moments, milestones, callbacks, statistics, module]
---

# Memory & Moments

Layer 5 of the personality stack — the rarest, most memorable layer. Moments are personality events that emerge from accumulated state: milestones reached, patterns recognized, streaks achieved. They can't be configured. They're earned.

This is the "red flavor text" of the personality system — legendary because it's rare.

## Why Memory Matters

Without memory, personality is a parlor trick. With memory, it becomes character.

| Without memory | With memory |
|----------------|-------------|
| "Clean pass." | "Clean pass. That's 25 in a row." |
| "Found it in the legacy directory." | "Found it in the legacy directory. Same place as last time." |
| "4 issues found." | "4 issues. 3 of them are null checks. That's 14 total this month." |

Memory transforms generic personality into specific, earned character. It's what makes agents feel like teammates who have been working with you, not strangers who reset every session.

## What Gets Tracked

### Statistics

Aggregate counters that accumulate across sessions:

```yaml
statistics:
  tasks:
    total_completed: 847
    by_archetype:
      navigator: 112
      artisan: 389
      scout: 156
      sentinel: 134
      custodian: 56

  quality:
    consecutive_green_builds: 23
    longest_green_streak: 31
    total_clean_passes: 203
    total_issues_found: 1847

  exploration:
    total_files_explored: 4291
    deepest_directory: "src/core/engine/legacy/compat/v1/internal/"
    deepest_depth: 7
    unique_directories_visited: 234

  time:
    longest_single_task_minutes: 42
    shortest_single_task_seconds: 3
    average_task_minutes: 4.7

  code:
    total_files_modified: 2341
    total_lines_changed: 18902
    largest_single_change_lines: 847
```

### Patterns

Recurring observations that agents can reference:

```yaml
patterns:
  recurring_issues:
    - pattern: "unhandled_null_check"
      count: 14
      last_seen: "2026-02-20"
      first_seen: "2026-01-15"
      common_files: ["auth.ts", "user.ts", "session.ts"]
      trend: "decreasing"   # getting better

    - pattern: "unused_import"
      count: 67
      last_seen: "2026-02-23"
      first_seen: "2026-01-10"
      common_files: ["*.ts"]
      trend: "stable"

    - pattern: "missing_return_type"
      count: 23
      last_seen: "2026-02-22"
      trend: "decreasing"

  codebase_observations:
    - "auth.ts is the most frequently modified file"
    - "Legacy directory hasn't been touched in 6 months"
    - "Test coverage has been improving since session 40"
```

### Milestones

Achievement-like events that trigger exactly once:

```yaml
milestones:
  task_counts:
    - id: "10_tasks"
      threshold: 10
      achieved: true
      achieved_date: "2026-01-12"
      announced: true

    - id: "100_tasks"
      threshold: 100
      achieved: true
      achieved_date: "2026-02-01"
      announced: true

    - id: "500_tasks"
      threshold: 500
      achieved: true
      achieved_date: "2026-02-18"
      announced: true

    - id: "1000_tasks"
      threshold: 1000
      achieved: false

  streaks:
    - id: "10_consecutive_green"
      threshold: 10
      achieved: true
      announced: true

    - id: "25_consecutive_green"
      threshold: 25
      achieved: false

    - id: "50_consecutive_green"
      threshold: 50
      achieved: false

  firsts:
    - id: "first_perfect_review"
      condition: "sentinel returns zero issues"
      achieved: true
      achieved_date: "2026-01-20"
      announced: true

    - id: "first_zero_change_format"
      condition: "custodian finds nothing to clean"
      achieved: false

  special:
    - id: "scout_depth_record"
      condition: "scout explores deeper than previous record"
      achieved: true
      current_record: 7
      announced: true
```

### Callbacks

Specific events memorable enough to reference later:

```yaml
callbacks:
  - id: "cb_001"
    event: "Scout found a file from 2019 that imported jQuery"
    session: 23
    date: "2026-02-05"
    referenced_count: 3

  - id: "cb_002"
    event: "The auth.ts refactor that took 3 sessions"
    session: 45
    date: "2026-02-15"
    referenced_count: 1

  - id: "cb_003"
    event: "Custodian's reaction when there were zero unused imports"
    session: 52
    date: "2026-02-19"
    referenced_count: 2

  - id: "cb_004"
    event: "The time Sentinel found 47 issues in a single file"
    session: 31
    date: "2026-02-08"
    referenced_count: 0
```

## Moment Triggers

### Trigger Types

| Type | Condition | Frequency | Example |
|------|-----------|-----------|---------|
| Milestone | Counter hits threshold | Once per milestone | "That's 100 tasks completed." |
| Streak | Consecutive event count | Rare (high thresholds) | "25 green builds in a row." |
| Record | New personal best | Rare (improvements slow over time) | "New depth record: 8 directories deep." |
| Callback | Event echoes a past event | Occasional (requires match) | "Auth.ts again. Some things never change." |
| Discovery | Something genuinely unusual | Rare (hard to trigger) | "This file hasn't been modified since 2019." |
| Celebration | Perfect outcome | Varies (depends on quality) | "Zero issues. Zero changes needed. Perfect." |

### Trigger Evaluation

```
After each agent action:

1. Update statistics (always)
2. Check milestone thresholds (always)
3. If milestone achieved AND not yet announced:
   → Mark as moment candidate
4. Check streak conditions
5. If streak at threshold:
   → Mark as moment candidate
6. Check callback conditions (current event resembles past event)
7. If callback match AND random() < 0.3:
   → Mark as moment candidate

MOMENT BUDGET CHECK:
8. If session_moment_count >= 1:
   → Discard all moment candidates (budget exhausted)
9. If multiple candidates:
   → Select highest-priority (milestones > streaks > callbacks > discovery)
10. If selected:
    → Replace standard flavor with moment text
    → Increment session_moment_count
    → Record in memory
```

### Moment Text Generation

Moments get special treatment in the template system:

```yaml
moment_templates:
  milestone_100_tasks:
    navigator: "Phase {current_phase}. Also: that was task 100. We've been busy."
    artisan: "100 tasks. Not all of them were clean. But we're better than we started."
    scout: "Task 100! I've explored {directories_visited} directories to get here."
    sentinel: "100 tasks reviewed. The patterns I've seen... I should write a book."
    custodian: "ONE HUNDRED TASKS. We should celebrate. I've organized a celebration. It's this message."

  streak_25_green:
    navigator: "25 consecutive green builds. The plan is working."
    artisan: "25 in a row. Clean work, consistently."
    sentinel: "25 clean passes. I'm... proud? Is that the word?"

  callback_auth_again:
    sentinel: "auth.ts. We meet again. That's {auth_count} times now."
    artisan: "Back to auth.ts. It's becoming a friend. A complicated friend."
```

## Memory Integrity

### The Fabrication Rule

**Agents must never reference events that aren't in the memory system.** This is the single most important rule in the memory architecture.

| Situation | Correct behavior | Incorrect behavior |
|-----------|-----------------|-------------------|
| No streak data exists | Don't mention streaks | "I think this is our best streak yet" |
| No past callback matches | Use standard flavor | "This reminds me of that time..." |
| Counter shows 5 tasks | Reference 5 tasks | "After all these tasks we've done..." |

Fabricated memories break trust instantly. If a user notices the system referencing something that didn't happen, the entire personality system loses credibility.

### Integrity Checks

```yaml
memory_integrity:
  rules:
    - "Every callback must link to a specific session ID"
    - "Every statistic must be derivable from event history"
    - "Milestones can only be announced if threshold is actually met"
    - "Streak counts must match actual consecutive events"

  validation:
    frequency: "per session start"
    actions:
      - "Verify counter consistency"
      - "Prune callbacks older than configured retention"
      - "Check milestone achieved flags against current statistics"
```

### Append-Only Design

Statistics only go up (or reset on explicit user action). They never silently decrease:

- Task counter increments, never decrements
- Streak counter increments or resets to zero (never to an arbitrary number)
- Pattern counts accumulate
- Callbacks are append-only (with optional pruning of very old entries)

## Session Scoping

### Per-Session State

```yaml
session_state:
  moment_count: 0          # Resets each session. Max 1.
  moment_fired: null        # Which moment, if any
  tasks_this_session: 0     # Session task counter
  streak_at_session_start: 23  # For "this session" references
```

### Cross-Session State

```yaml
persistent_state:
  last_session_date: "2026-02-23"
  sessions_total: 67
  last_moment_session: 65
  callbacks_total: 4
```

### The Earning Curve

Memory depth gates personality depth (Design Pillar 5: Earned, Not Imposed):

| Session range | Available memory features |
|---------------|--------------------------|
| 1-5 | Statistics only. No callbacks. |
| 6-20 | Statistics + first milestones. |
| 21-50 | Statistics + milestones + callbacks (if any exist). |
| 51+ | Full memory system. Deep callbacks. Running gags if earned. |

A brand-new project doesn't get "remember when" references. That would be fabrication. Memory depth matches actual history.

## Moment Examples

### Milestone Moment (Sentinel)

```
Standard output:
  "4 issues. 2 real, 2 style. No blockers."

With milestone (task 100):
  "4 issues. 2 real, 2 style. No blockers.
   Also — that was review number 100. The patterns I've catalogued...
   I should write a field guide."
```

### Streak Moment (Artisan)

```
Standard output:
  "3 files modified. Tests green. Solid work."

With streak (25 consecutive green):
  "3 files modified. Tests green.
   That's 25 in a row. The code has been clean for a while now.
   Feels earned."
```

### Callback Moment (Scout)

```
Standard output:
  "Found it in src/legacy/auth/v2/. Old code, still running."

With callback (echoing session 23):
  "Found it in src/legacy/auth/v2/. Old code, still running.
   Last time we were in this directory, we found the jQuery import.
   Some archaeological sites keep giving."
```

## Derivable Features

| Feature | Phase | Complexity | Notes |
|---------|-------|------------|-------|
| Statistics tracking | 1 | Low | Counter increments after each action |
| Milestone definitions | 1 | Low | Threshold configuration |
| Milestone announcement | 2 | Medium | Integration with template system |
| Pattern detection | 2 | Medium | Issue categorization and counting |
| Streak tracking | 2 | Low | Consecutive event counting |
| Callback recording | 3 | Medium | Event significance detection |
| Callback matching | 4 | High | Current-to-past event similarity |
| Memory validation | 2 | Low | Integrity checks at session start |
| Earning curve gating | 3 | Medium | Session count → feature availability |
| Memory dashboard | 3 | Low | Human-readable memory state view |

## Open Questions

- [ ] How long should callbacks be retained before pruning?
- [ ] Should users be able to see and edit the memory state directly?
- [ ] How do we detect "significant" events worthy of becoming callbacks?
- [ ] Should memory transfer between projects (team follows their memory) or be project-scoped?
- [ ] How do we handle memory when team composition changes (new members join)?
