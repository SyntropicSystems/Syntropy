---
id: "wp05"
type: feature-spec
title: "Scaffolding & Generators"
status: exploring
owner: workspace-contracts-agent
priority: P0
created: 2026-02-21
updated: 2026-02-21
refs:
  depends-on: [wp01, wp04]
  enables: [wp-u01, wp-u02, wp-u06]
  related: [wp07, rp-u02]
  informed-by: [jtbd-workspace-platform]
  architecture: [arch-workspace-contracts]
  open-questions: []
tags: [workspace-platform, scaffolding, generators, blueprints, p0]
---

# WP05 — Scaffolding & Generators

## Summary

The scaffolding system generates new workspace components (services, apps, crates, libraries) from blueprints — platform-provided templates that produce correct, convention-following code and configuration in the right place. Projects can extend with custom generators for their own patterns.

## Jobs Addressed

- WJ2 — Scaffold Projects and Services Without Guessing Conventions (primary)
- WJ6 — Extend With Custom Generators and Templates (secondary)

## How It Works

### The CLI as Paved Road

The CLI commands are the default path for all structural additions:

- `syntropy init` — initialize a new workspace (creates `syntropy.toml` + `.syntropy/`)
- `syntropy add service <name>` — scaffold a new service in the right place
- `syntropy add app <name>` — scaffold a new application shell
- `syntropy add crate <name>` — scaffold a new platform crate
- `syntropy add adapter <name>` — scaffold a new platform adapter

Each command:
1. Reads the workspace contract to understand the current structure
2. Selects the appropriate blueprint
3. Generates a patchset via the plan/apply engine
4. Presents the plan for review
5. Applies on confirmation

### Blueprint System

Blueprints are structured templates that define:
- What files to create and their content (with variable interpolation)
- What existing files to modify (e.g., adding to `syntropy.toml`, updating workspace config)
- What validation rules apply to the result
- What post-scaffold steps are recommended

**Platform-provided blueprints** live in the platform and cover standard patterns:
- Rust service blueprint
- Rust crate blueprint
- Web app blueprint
- CLI app blueprint
- Adapter blueprint

**Project-specific blueprints** live in `.syntropy/system-of-work/templates/` and override or extend platform defaults.

### Custom Generators

Projects can create their own generators in `.syntropy/system-of-work/generators/`. A generator is:
- A template directory with interpolation markers
- A manifest that declares parameters, validation rules, and output paths
- Optionally, a script for complex generation logic

Generators plug into the same CLI: `syntropy generate <generator-name> <args>`.

### The North Star Mental Rule

After scaffolding, the result is always in the right place according to the north star layout:
- **Rust libs** → `platform/crates/`
- **Adapters** → `platform/adapters/`
- **Services** → `products/<product>/services/`
- **Apps** → `products/<product>/apps/`
- **Tools** → `tools/`

The mental rule is dead simple. No second-guessing.

## Dependencies

- Requires: WP01 (Workspace Contract) — scaffolding reads the contract to know where things go
- Requires: WP04 (Plan/Apply Engine) — scaffolding goes through plan/apply
- Enables: All use cases that create new components

## Open Questions

- [ ] Blueprint format — TOML manifest + file templates? Or a dedicated templating engine?
- [ ] Should generators be sandboxed (can't modify files outside their declared scope)?
- [ ] How do project-specific blueprints compose with platform defaults — override or layer?
- [ ] Should there be a `syntropy eject <blueprint>` to get a local copy of a platform blueprint?
