---
id: "pl-implementation"
type: feature-spec
title: "Personality Layer — Implementation"
status: exploring
owner: pulse-companion-agent
created: 2026-02-24
updated: 2026-02-24
refs:
  depends-on: [dp17, personality-layer]
  related: [pl-personality-stack, pl-procedural-engine, pl-voice-sheets, arch-personality-layer]
tags: [personality-layer, implementation, integration, configuration, file-structure, module]
---

# Implementation

Concrete implementation details — file structure, integration points, configuration, and the first-five-minutes experience. This is where design meets code.

## File Structure

The personality system lives in `.claude/personality/` within the workspace:

```
.claude/
  personality/
    PILLARS.md                    # Layer 2: Design pillars (human-readable)
    config.yaml                   # User configuration

    archetypes/                   # Layer 3: Role archetype definitions
      navigator.yaml
      artisan.yaml
      scout.yaml
      sentinel.yaml
      custodian.yaml

    voices/                       # Layer 4: Per-agent voice sheets
      helm.yaml                   # Navigator instance
      forge.yaml                  # Artisan instance
      compass.yaml                # Scout instance
      warden.yaml                 # Sentinel instance
      sweep.yaml                  # Custodian instance

    flavor/                       # Procedural generation resources
      templates.yaml              # Template definitions per archetype per category
      pools/                      # Flavor pools per archetype
        navigator.yaml
        artisan.yaml
        scout.yaml
        sentinel.yaml
        custodian.yaml
      moments.yaml                # Layer 5: Milestone and moment definitions

    memory/                       # Accumulated state
      team-state.yaml             # Statistics, patterns, milestones, callbacks
      novelty-tracker.yaml        # Per-agent selection history
```

### File Conventions

- **YAML for data**: Archetypes, voices, flavor pools, memory, configuration
- **Markdown for rules**: Design pillars stay in markdown for readability
- **Version controlled**: Everything is checked in. Memory state is human-reviewable.
- **No secrets**: No personal data, no credentials, only aggregate team statistics
- **Reset-safe**: Deleting `memory/` starts fresh without breaking anything

## Configuration

### config.yaml

```yaml
# .claude/personality/config.yaml
personality:
  # Overall personality level
  level: full
  # Options: full | professional | minimal | off
  #
  # full:         All 5 layers. Individual voice, moments, callbacks.
  # professional: Layers 1-3. Archetype shapes output, no individual character.
  # minimal:      Layers 1-2. Warm but generic.
  # off:          Layer 1 only. Pure function.

  # Moment frequency override
  moment_frequency: default
  # Options: default | rare | never
  #
  # default: ~1 moment per 20 tasks
  # rare:    ~1 moment per 50 tasks
  # never:   No moments at all

  # Memory callback toggle
  memory_callbacks: true
  # When false: agents don't reference past events

  # Custodian enthusiasm toggle (the Claptrap toggle)
  custodian_enthusiasm: true
  # When false: Custodian behaves like a professional archetype
  # (some teams find the extra energy distracting)

  # Agent naming
  use_agent_names: true
  # When false: agents are referred to by role, not name
  # "The Sentinel" instead of "Warden"
```

### Configuration Behavior Matrix

| Setting | Layer 1 | Layer 2 | Layer 3 | Layer 4 | Layer 5 |
|---------|---------|---------|---------|---------|---------|
| `off` | Active | - | - | - | - |
| `minimal` | Active | Active | - | - | - |
| `professional` | Active | Active | Active | - | - |
| `full` | Active | Active | Active | Active | Active |

At every level, the system produces correct, complete output. Personality is purely additive.

### First-Time Setup

When no `config.yaml` exists, the system:

1. Creates a default config with `level: professional` (safe default)
2. Generates default voice sheets for active agent roles
3. Initializes empty memory state
4. Outputs a one-time setup message:

```
Personality Layer initialized.
Level: professional (archetype-flavored output, no individual character).
Change in .claude/personality/config.yaml.
Available levels: full, professional, minimal, off.
```

## Integration Points

### System Prompt Integration

Voice sheet data is compiled into system prompt instructions at agent initialization:

```
AGENT INIT
  |
  v
Read config.yaml → determine active layers
  |
  v
If layer >= 3: Load archetype YAML
  |
  v
If layer >= 4: Load voice sheet YAML
  |
  v
Compile personality section for system prompt:
  - Role description (from archetype)
  - Voice rules (from voice sheet)
  - Constraint list (max words, punctuation, forbidden vocabulary)
  - Relationship dynamics (from voice sheet)
  |
  v
Inject into agent system prompt
```

### PostToolUse Hook Integration

Status messages are enriched after each tool use:

```
TOOL COMPLETES
  |
  v
PostToolUse hook fires
  |
  v
Read tool result (functional data)
  |
  v
Check config level
  |
  v
If level == off: pass through unchanged
If level == minimal: append tone word if appropriate
If level == professional: run template engine with archetype pools
If level == full: run full procedural engine
  |
  v
Template selection → slot fill → novelty filter → voice filter → moment check
  |
  v
Output enriched message
  |
  v
Update memory state (counters, selections, milestone checks)
```

### Agent Handoff Integration

Delegation messages between agents carry personality:

```
NAVIGATOR DELEGATES TO ARTISAN
  |
  v
Load handoff template (navigator → artisan)
  |
  v
Fill functional slots (task description, scope)
  |
  v
Fill flavor slot from handoff pool
  |
  v
Apply voice sheet filter (Navigator's voice)
  |
  v
Output: "Implementation phase. Forge is on it."
  |
  v
ARTISAN RECEIVES
  |
  v
Load receive template (artisan receiving)
  |
  v
Output: "On it. Straightforward refactor."
```

### Experience Layer Integration

The Personality Layer feeds data upstream to the Experience Layer:

| Personality Output | Experience Layer Input |
|-------------------|----------------------|
| Agent voice identity | Companion personality foundation |
| Memory milestones | Achievement/progression triggers |
| Session moments | Session loot identification |
| Agent relationships | Multi-companion party dynamics |
| Voice evolution log | Companion evolution tracking |

## The First Five Minutes

What a new user experiences when personality is first active:

### Minute 0-1: Setup

```
> Project initialized.
> Personality Layer: professional.
> Agents: Navigator (Helm), Artisan (Forge), Scout (Compass),
>         Sentinel (Warden), Custodian (Sweep).
```

Light touch. Informational. Names are introduced but not emphasized.

### Minute 1-2: First Task

```
User: "Fix the auth bug in session.ts"

Helm: Phase 1 of 1. Session authentication fix. Forge is on it.

Forge: Starting on session.ts. Standard pattern.
       ...
       2 files modified. Tests green. Clean fix.
```

Archetype flavor is visible (phase numbering from Navigator, "clean fix" from Artisan) but not distracting. A new user might not even notice the personality — they just see clear, well-structured output.

### Minute 2-3: Review

```
Warden: 0 issues. Clean pass.
```

Minimal. Sentinel brand (metrics first) but nothing elaborate. Trust is building.

### Minute 3-4: Cleanup

```
Sweep: IMPORTS: organized. 2 unused removed. You're welcome.
```

Custodian's slightly higher energy is the first hint that these agents have different characters. It's noticeable but not jarring.

### Minute 4-5: Reflection

```
Helm: All phases complete. On schedule.
```

Five minutes in, the user has experienced:
- Clear, accurate functional output (Layer 1)
- Warm but not overbearing tone (Layer 2)
- Distinct agent formatting styles (Layer 3)
- Hints of individual character (Layer 4, if level is "full")
- Zero moments (Layer 5 — nothing earned yet)

The personality has made the output more pleasant without slowing anything down or demanding attention.

## Error Handling

### Template Errors

If the template engine fails (missing template, corrupt YAML, etc.):

```
1. Log the error internally
2. Fall back to Layer 1 (pure functional output)
3. Never show the error to the user as personality text
4. Never generate personality from an error state
```

Function is sacred. If personality can't be generated, the system outputs clean functional data.

### Memory Errors

If memory state is corrupted:

```
1. Log the error internally
2. Reset memory to empty state
3. Agents lose accumulated character depth
4. System continues with Layer 1-3 (archetype flavor, no memory references)
5. Memory rebuilds naturally over subsequent sessions
```

### Configuration Errors

If config.yaml is malformed:

```
1. Fall back to default configuration (level: professional)
2. Log warning to user
3. Continue with default behavior
```

## Performance Budget

| Operation | Budget | Typical |
|-----------|--------|---------|
| Template selection | < 1ms | ~0.1ms |
| Flavor pool selection | < 5ms | ~1ms |
| Voice sheet filtering | < 2ms | ~0.5ms |
| Moment check | < 5ms | ~1ms |
| Memory state update | < 10ms | ~3ms |
| **Total per output** | **< 25ms** | **~6ms** |

The personality enrichment is invisible in terms of latency. It happens between tool completion and output rendering — a gap the user never perceives.

## Testing Strategy

### Unit Tests

| Test | Validates |
|------|-----------|
| Template slot fill | Functional slots always accurate |
| Flavor pool selection | Novelty system prevents repeats |
| Voice constraint filter | Output matches voice sheet rules |
| Moment trigger logic | Milestones fire at correct thresholds |
| Memory integrity | Counters match event history |
| Config level behavior | Each level activates correct layers |
| Graceful degradation | Error states fall back cleanly |

### Integration Tests

| Test | Validates |
|------|-----------|
| Full pipeline end-to-end | Tool result → enriched output |
| System prompt compilation | Voice sheet → prompt instructions |
| Handoff message flow | Agent A → Agent B messaging |
| Memory persistence | State survives session restart |
| Config change propagation | Level change affects all agents |

### The Golden Test

For every change to the personality system:

1. Generate 20 sample outputs using the new code
2. Apply the "Does This Feel Like Us?" test to each
3. Verify zero design pillar violations
4. Verify personality is removable (output still complete at `off`)

## Derivable Features

| Feature | Phase | Complexity | Notes |
|---------|-------|------------|-------|
| File structure scaffolding | 0 | Low | Create directory layout |
| config.yaml schema and defaults | 0 | Low | Configuration system |
| System prompt personality injection | 0 | Medium | Agent init integration |
| PostToolUse hook skeleton | 1 | Medium | Hook integration |
| Template engine MVP | 1 | Medium | Category → template → output |
| Flavor pool loader | 1 | Low | YAML parse + selection |
| Memory state management | 2 | Medium | Persist + validate |
| Handoff message system | 2 | Medium | Agent-to-agent awareness |
| Error fallback behavior | 1 | Low | Graceful degradation |
| First-time setup wizard | 2 | Low | Guided initialization |

## Open Questions

- [ ] Should the personality system be a separate process or integrated into the agent runtime?
- [ ] How do we handle upgrades to the personality system without losing existing memory?
- [ ] Should there be a "preview mode" that shows personality output without committing to memory?
- [ ] How do we measure whether personality is actually improving user experience?
- [ ] Should the file structure be auto-generated from a schema or hand-authored?
