---
id: "wp-stories"
type: user-story
title: "Workspace Platform User Stories"
status: defining
owner: workspace-contracts-agent
created: 2026-02-21
updated: 2026-02-21
refs:
  depends-on: [jtbd-workspace-platform]
  related: [wp01, wp02, wp03, wp04, wp05, wp06, wp07, wp08]
tags: [workspace-platform, stories, requirements]
---

# Workspace Platform User Stories

User stories for the workspace contract and tooling layer. Organized by persona: developers (day-to-day contributors), AI agents (automated consumers), platform engineers (workspace maintainers), and team leads (project customizers).

---

## Developer Stories

### WP-S01 — Zero-Thought Workspace Init
As a developer, I want to run a single command to initialize a new workspace with all the right structure, config, and conventions so I never have to think about where files go.

**Features:** WP01, WP02, WP05
**Jobs:** WJ1, WJ2

### WP-S02 — Scaffold Service Without Guessing
As a developer, I want to add a new service with one command and have it land in the right directory with all boilerplate ready so I follow conventions automatically.

**Features:** WP01, WP04, WP05
**Jobs:** WJ2

### WP-S03 — Rename Without Fear
As a developer, I want to rename or move a service and have all references updated atomically so I never end up with a half-done refactor.

**Features:** WP04, WP03
**Jobs:** WJ4

### WP-S04 — See What Will Change Before It Happens
As a developer, I want every structural change previewed as a plan before it executes so I can review exactly what will happen and cancel if something looks wrong.

**Features:** WP04
**Jobs:** WJ4

### WP-S05 — Immediate Validation Feedback
As a developer, I want to run workspace validation locally and see clear, actionable errors with fix hints so I catch problems before pushing to CI.

**Features:** WP03
**Jobs:** WJ3, WJ9

### WP-S06 — One Config File to Review
As a developer, I want all workspace configuration in a single `syntropy.toml` file so code review of config changes is focused and unambiguous.

**Features:** WP01
**Jobs:** WJ1

### WP-S07 — Clean Git Diffs
As a developer, I want machine-generated state automatically gitignored so my diffs and PRs only contain meaningful human-authored changes.

**Features:** WP01, WP02
**Jobs:** WJ8

### WP-S08 — Safe Schema Upgrades
As a developer, I want to upgrade my workspace contract to a new version with a single command that previews all changes so upgrades don't require manual editing.

**Features:** WP06, WP04
**Jobs:** WJ5

---

## AI Agent Stories

### WP-S09 — Structured Workspace Understanding
As an AI agent, I want to call `syntropy state --json` and get a structured representation of the workspace so I never have to parse files or guess conventions.

**Features:** WP07
**Jobs:** WJ7

### WP-S10 — Agent-Proposed Structural Changes
As an AI agent, I want to propose structural changes through the plan/apply engine so my changes are previewed, validated, and reviewable by humans.

**Features:** WP04, WP07
**Jobs:** WJ4, WJ7

### WP-S11 — Validation Before Agent Action
As an AI agent, I want to check workspace validation state before making changes so I don't compound existing problems.

**Features:** WP03, WP07
**Jobs:** WJ3

### WP-S12 — Schema-Driven Understanding
As an AI agent, I want workspace contracts defined by versioned JSON schemas so I can validate my own outputs against the contract without runtime checks.

**Features:** WP08
**Jobs:** WJ10

---

## Platform Engineer Stories

### WP-S13 — Enforce Dependency Direction
As a platform engineer, I want architectural invariants (platform ↛ products) enforced automatically by validators so integrity doesn't depend on code review diligence.

**Features:** WP03
**Jobs:** WJ9

### WP-S14 — CI Validation Gate
As a platform engineer, I want workspace validation running in CI and blocking merges on failure so structural entropy is caught before it lands.

**Features:** WP03
**Jobs:** WJ3, WJ9

### WP-S15 — Schema Drift Detection
As a platform engineer, I want CI to detect when generated schemas drift from source types so the contract boundary stays honest.

**Features:** WP08
**Jobs:** WJ10

### WP-S16 — Migration Path Authoring
As a platform engineer, I want to define version-to-version migration steps that are testable against fixture workspaces so schema upgrades are safe for all consumers.

**Features:** WP06, WP08
**Jobs:** WJ5

### WP-S17 — Blueprint Maintenance
As a platform engineer, I want to update platform-provided blueprints and have changes available to all `syntropy add` commands so scaffolding stays current.

**Features:** WP05
**Jobs:** WJ2

---

## Team Lead Stories

### WP-S18 — Project-Specific Generators
As a team lead, I want to create custom generators for our team's patterns so everyone scaffolds consistently without tribal knowledge.

**Features:** WP05
**Jobs:** WJ6

### WP-S19 — Convention Overrides
As a team lead, I want to override platform conventions (naming rules, directory structure) at the project level so the workspace fits our team's needs while keeping validation guarantees.

**Features:** WP01, WP03
**Jobs:** WJ1, WJ6

### WP-S20 — Discoverable Generators
As a team lead, I want `syntropy generate --list` to show all available generators (platform + custom) with descriptions so team members know what's available without asking.

**Features:** WP05
**Jobs:** WJ2, WJ6

### WP-S21 — Workspace Audit
As a team lead, I want a summary view of workspace health — what's valid, what's drifted, what needs attention — so I can maintain structural hygiene over time.

**Features:** WP03, WP07
**Jobs:** WJ3

---

## Cross-Cutting Stories

### WP-S22 — Everything Through Plan/Apply
As any workspace user, I want all structural mutations to go through plan/apply so every change is previewed, validated, and reversible — no exceptions.

**Features:** WP04
**Jobs:** WJ4

### WP-S23 — Coherent After Every Operation
As any workspace user, I want `syntropy validate` to pass after every platform operation (init, add, rename, migrate) so the platform never puts the workspace in a broken state.

**Features:** WP03, WP04, WP05, WP06
**Jobs:** WJ3

### WP-S24 — Five-Category Mental Model
As any workspace user, I want every file in the repo to clearly belong to one of five categories (Platform, Products, Tooling, Workspaces, Instance) so the structure is self-documenting.

**Features:** WP01, WP02
**Jobs:** WJ1, WJ8
