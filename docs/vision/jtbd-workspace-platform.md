---
id: "jtbd-workspace-platform"
type: vision
title: "Workspace Platform — Jobs to Be Done"
status: active
owner: workspace-contracts-agent
created: 2026-02-21
updated: 2026-02-21
refs:
  depends-on: [manifesto]
  enables: [wp01, wp02, wp03, wp04, wp05, wp06, wp07, wp08]
  related: [jtbd, jtbd-dev-platform, jtbd-repo-platform, principles, surf-workspace-platform]
tags: [vision, motivation, jtbd, workspace-platform, meta]
---

# Workspace Platform — Jobs to Be Done

The Workspace Platform is the contract and tooling layer that makes any repository structurally coherent, safely evolvable, and zero-mental-overhead to work in. These are the jobs it must fulfill — expressed tool-agnostically so the underlying implementation can change while the jobs remain stable.

The core promise: if the platform always provides the "easy right path," then folder structure stops being a brittle religion and becomes a mostly cosmetic map.

## WJ1 — Define Workspace Structure Through a Single Reviewed Contract

**When** I start or configure a project workspace, **I want** a single configuration file (`syntropy.toml`) with a strict, schema-validated structure that defines everything about how the workspace behaves — its services, apps, conventions, and boundaries — **so that** there's exactly one place to review, one place to change, and no ambiguity about what the workspace is.

## WJ2 — Scaffold Projects and Services Without Guessing Conventions

**When** I need to add a new service, app, library, or workspace to the project, **I want** a CLI command that generates the correct structure from a blueprint with all the right boilerplate, naming, and configuration already in place — **so that** I follow conventions automatically and never spend time figuring out where files go or what they should look like.

## WJ3 — Validate Workspace Coherence Continuously

**When** changes are made to the workspace — files added, config modified, dependencies changed — **I want** a validation engine that deterministically checks structural integrity, dependency direction, naming conventions, and contract compliance, producing a machine-readable report — **so that** entropy is caught immediately rather than accumulating silently.

## WJ4 — Apply Structural Changes Transactionally

**When** I need to make structural changes to the workspace (rename a service, reorganize directories, update config), **I want** a plan/apply engine that previews every change as a patchset, lets me review it, and applies it atomically — **so that** I can see exactly what will change before it happens and roll back if something goes wrong.

## WJ5 — Migrate Workspace Contracts Safely Across Versions

**When** the workspace contract schema evolves (new fields, changed semantics, structural changes), **I want** an automated migration path that transforms existing configurations to the new version without data loss — **so that** upgrades are safe, reversible, and don't require manual editing.

## WJ6 — Extend With Custom Generators and Templates

**When** a project has its own conventions beyond the platform defaults (custom service templates, domain-specific generators, team-specific blueprints), **I want** to define these as project-level extensions that plug into the same scaffolding system — **so that** every project can customize its workflow while keeping the platform's guarantees.

## WJ7 — Hydrate Agents and Tools With Structured Workspace State

**When** an AI agent, tool, or automation needs to understand the current workspace — what services exist, what their dependencies are, what state things are in — **I want** a structured, machine-readable workspace state output (`syntropy state --json`) — **so that** no tool ever has to parse markdown or infer meaning from file paths.

## WJ8 — Separate Human Artifacts From Machine State

**When** the workspace contains both human-facing artifacts (tasks, SOW docs, signals) and machine-generated state (indexes, caches, run databases), **I want** a clear separation between what's checked in and what's ignored — **so that** git diffs stay meaningful, code review isn't polluted by generated files, and machine state can be rebuilt from scratch.

## WJ9 — Enforce Architectural Invariants Automatically

**When** code or configuration violates architectural boundaries (platform importing products, circular dependencies, forbidden import paths), **I want** this caught automatically by validators with clear error messages — **so that** architectural integrity doesn't depend on code review diligence alone.

## WJ10 — Keep Contracts Versioned, Machine-Checkable, and Cross-Language

**When** the workspace contract schema, workspace state format, or validation report structure changes, **I want** these contracts versioned with explicit schema definitions that can be consumed by any language — **so that** breaking changes are caught at compile time and the contract boundary remains stable as implementations evolve.
