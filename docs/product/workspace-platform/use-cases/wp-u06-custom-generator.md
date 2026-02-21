---
id: "wp-u06"
type: use-case
title: "Creating a Custom Generator"
status: defining
owner: workspace-contracts-agent
created: 2026-02-21
updated: 2026-02-21
refs:
  depends-on: [wp01, wp05]
  related: [wp-u02]
tags: [workspace-platform, use-case, generators, custom]
---

# WP-U06 — Creating a Custom Generator

## Scenario

A team has project-specific patterns that go beyond the platform's built-in blueprints — for example, a microservice template that includes their standard middleware stack, observability setup, and domain-specific configuration. They create a custom generator so team members (and agents) can scaffold these patterns consistently.

### Steps

1. Developer creates a generator directory in `.syntropy/system-of-work/generators/domain-service/`
2. Adds a `generator.toml` manifest:
   ```toml
   [generator]
   name = "domain-service"
   description = "Domain service with middleware stack and observability"

   [parameters]
   name = { type = "string", required = true, description = "Service name" }
   domain = { type = "string", required = true, description = "Business domain" }

   [output]
   base_path = "products/command-center/services/{{name}}"
   ```
3. Adds template files alongside the manifest:
   ```
   generators/domain-service/
     generator.toml
     templates/
       Cargo.toml.tmpl
       src/main.rs.tmpl
       src/middleware.rs.tmpl
       src/observability.rs.tmpl
       BUILD.bazel.tmpl
   ```
4. Templates use variable interpolation (e.g., `{{name}}`, `{{domain}}`)
5. Developer runs `syntropy generate domain-service --name payments --domain billing`
6. The generator produces a patchset through plan/apply
7. The team reviews and applies

### Outcome

- Custom patterns are codified, not tribal knowledge
- Team members scaffold consistently using `syntropy generate <name>`
- Custom generators get the same plan/apply safety as platform commands
- Generators are version-controlled in `.syntropy/system-of-work/generators/`
- New team members discover available generators via `syntropy generate --list`

## Features Exercised

- WP01 — Workspace Contract (contract updated if generator adds components)
- WP05 — Scaffolding & Generators (custom generator system)

## Acceptance Criteria

- [ ] Custom generators are discovered from `.syntropy/system-of-work/generators/`
- [ ] `syntropy generate --list` shows available generators with descriptions
- [ ] Template interpolation works for all declared parameters
- [ ] Missing required parameters produce clear error messages
- [ ] Generated output goes through plan/apply (preview before apply)
- [ ] `syntropy validate` passes after running a custom generator
