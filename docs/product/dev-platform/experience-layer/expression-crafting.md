---
id: "el-expression-crafting"
type: module
title: "Experience Layer — Expression & Crafting"
status: exploring
owner: pulse-companion-agent
created: 2026-02-24
updated: 2026-02-25
refs:
  depends-on: [dp16, experience-layer]
  related: [dp03, dp12, el-companion, el-phasing, el-progression, el-world-map]
tags: [experience-layer, expression, crafting, customization, blueprints, module]
---

# Expression & Crafting

In Borderlands, your character build is yours. In MMORPGs, your appearance, housing, and playstyle express who you are. In the platform, expression means your space, your companion, your workflows are *yours* — and crafting means building custom tools from composable parts.

## Your Space, Your Way

### AI Companion Customization

- Choose from role archetypes (Navigator, Artisan, Scout, Sentinel, Custodian)
- Customize voice and tone within archetype constraints
- Name your companion
- Companion develops personality quirks through shared experience (earned, not configured)

### Workspace Customization

- Custom status messages and availability signals
- Personal dashboard layout (what you see when you "log in")
- Notification preferences (what interrupts you, what waits)
- Context loading preferences (deep dive vs. executive summary by default)
- Your "loadout" — the tools, shortcuts, and workflows you've assembled

### Workflow Style

- Guided path vs. expert path, per domain
- Session rhythm preferences (Pomodoro, flow blocks, unstructured)
- Review style (line-by-line, big picture, adversarial)
- Communication style (verbose, terse, visual, verbal)

### Visible Contributions

- A profile that shows your pattern journal, emergent archetype, and collaboration manual
- Not a resume — a living mirror of who you're becoming and how to work with you
- Opt-in: share as much or as little as you want
- The system suggests entries; you curate what's public

## Creative Contribution

Borderlands' open-door joke policy — where anyone in any discipline can pitch content — maps to platform contribution:

| Contribution Type | What It Is | Quality Gate |
|------------------|-----------|-------------|
| Flavor pool | One-liners for agent personalities | Personality Layer quality checks |
| Workflow | New process documents | System of Work validation |
| Tool | A utility, script, or visualization | Standard code review |
| Pattern | A better way to do something | Adoption by others |
| Lore | War story, insight, discovery narrative | Discovery log standards |

The key insight from Borderlands: **the system must make contributing easy and rewarding.** If contributing requires a committee review and a three-page proposal, nobody will do it. If it requires a PR to a flavor pool with a one-line quality check, everyone will.

## The Crafting System

Crafting means **assembling custom tools, workflows, and environments from composable parts.**

### What You Can Craft

| Craftable | Components | Value |
|-----------|-----------|-------|
| Custom workflow | Steps + verifications + triggers | Automates a personal or team process |
| Domain context | Knowledge + ADRs + patterns + lore | Creates shared understanding |
| Agent configuration | Archetype + voice + memory + tools | Customizes your AI companion |
| Dashboard view | Widgets + data sources + filters | Personal command center |
| Pattern library | Code patterns + documentation + tests | Reusable building blocks |
| Automation recipe | Triggers + actions + conditions | Eliminates toil |

### Crafting Tiers

**Apprentice crafting**: Customize existing templates and configurations. Use building blocks as-is.

**Expert crafting**: Combine building blocks in new ways. Create original workflows, build custom tools.

**Master crafting**: Build new building blocks. Create components that others use in their crafting.

**Architect crafting**: Design new crafting systems. Build the tools that build the tools.

### Recipes and Blueprints

Blueprints are documented recipes for combining components — the crafting system's equivalent of game crafting recipes:

```yaml
# Blueprint: Domain Onboarding Kit
# Tier: Expert
# Author: @christian
# Used by: 8 teams

name: domain-onboarding-kit
description: Everything a new person needs to contribute
             to a domain in < 1 day

components:
  - type: context
    source: domain/CONTEXT.md
    purpose: "Lay of the land"

  - type: workflow
    source: workflows/onboard.md
    purpose: "Guided first contribution"

  - type: agent-config
    source: agents/{domain}.md
    purpose: "AI companion pre-loaded with domain expertise"

  - type: challenge
    source: templates/first-contribution.md
    purpose: "A real task scoped for learning"

  - type: lore
    source: discovery-log/?domain={domain}&tier=rare+
    purpose: "Interesting stories that make the domain alive"

crafting_time: ~2 hours
prerequisites: [domain-expert-access, write-permissions]
```

Blueprints can be shared, forked, and evolved — creating a marketplace of organizational knowledge.

## The Experimentation Sandbox

Every good crafting system has a place where you can experiment without consequences.

### Exploration Branches

Try things without affecting the main path. Already exists in git, but elevated to a first-class experience:

> "Starting exploration: 'What if we replaced the entire auth module with this new library?' This is a safe space — nothing ships until you decide."

### Prototype Mode

Build quick proofs of concept with AI assistance, share them for feedback, and promote the ones that work. This connects to the existing Prototype System (DP07).

### "What If" Analysis

Ask the AI to simulate the consequences of a change before making it:

> "What if we migrated from REST to gRPC for internal services? Show me the blast radius."

## Relationship to Existing Systems

| System | Integration |
|--------|------------|
| Workflow Engine (DP03) | Crafted workflows use the same engine as standard workflows |
| Prototype System (DP07) | Experimentation sandbox leverages existing prototyping |
| Personality Layer | Companion customization extends personality archetypes |
| Domain Context Sync (DP09) | Crafted domain contexts follow sync conventions |
| Convention System (DP05) | Crafted artifacts follow platform conventions |

## Derivable Features

| Feature | Phase | Complexity | Notes |
|---------|-------|------------|-------|
| Companion naming and basic customization | 0 | Low | Configuration file |
| Workspace notification preferences | 1 | Low | User preferences store |
| Guided vs. expert path toggle per domain | 2 | Medium | Familiarity-gated |
| Blueprint creation and sharing | 5 | Medium | Template system |
| Blueprint marketplace/discovery | 6 | High | Cross-user blueprint search |
| Exploration branch experience | 2 | Low | Git workflow enhancement |
| "What if" analysis | 6 | High | Impact simulation engine |
| Crafting tier progression | 4 | Medium | Contribution analysis |
| Creative contribution pipeline | 5 | Medium | Submission + review workflow |

## Open Questions

- [ ] How do we balance customization freedom with platform coherence?
- [ ] What's the quality gate for community-contributed blueprints?
- [ ] How does the crafting system interact with workspace contracts?
- [ ] Should crafting tiers be visible or purely functional?
- [ ] How do we prevent "config hell" — too many customization options overwhelming users?
- [ ] What's the right default experience for someone who doesn't want to customize anything?
