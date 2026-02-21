---
id: "wp06"
type: feature-spec
title: "Migrations"
status: exploring
owner: workspace-contracts-agent
priority: P1
created: 2026-02-21
updated: 2026-02-21
refs:
  depends-on: [wp01, wp04, wp08]
  enables: [wp-u05]
  related: [wp03, wp05]
  informed-by: [jtbd-workspace-platform]
  architecture: [arch-workspace-contracts]
  open-questions: []
tags: [workspace-platform, migrations, versioning, p1]
---

# WP06 — Migrations

## Summary

The migration system safely transforms workspace configurations and structures when the contract schema evolves. It reads the current contract version, determines the target version, computes the transformation, and executes it through plan/apply — making schema upgrades as safe as any other structural change.

## Jobs Addressed

- WJ5 — Migrate Workspace Contracts Safely Across Versions (primary)
- WJ4 — Apply Structural Changes Transactionally (secondary)

## How It Works

### Version Detection

Every workspace contract declares its schema version:

```toml
[workspace]
schema = "v0"
```

The migration system reads this version and knows:
- What the current schema expects
- What migration paths exist from this version to the target
- What changes are needed

### Migration Execution

`syntropy migrate` follows this flow:

1. **Detect**: Read current schema version from `syntropy.toml`
2. **Resolve**: Determine the target version (latest, or specified via `--to v2`)
3. **Plan**: Compute the full migration patchset (may chain multiple version steps: v0 → v1 → v2)
4. **Preview**: Show the user exactly what will change
5. **Apply**: Execute through the plan/apply engine
6. **Validate**: Run full validation on the migrated workspace

### Migration Types

- **Config migration**: Changes to `syntropy.toml` structure (renamed keys, new required fields, changed semantics)
- **Structure migration**: Changes to directory layout (moved directories, renamed conventions)
- **Combined migration**: Both config and structure changes together

### Migration Safety

Migrations inherit all plan/apply guarantees:
- Full preview before execution
- Atomic application (all or nothing)
- Rollback capability
- Post-migration validation

### Version Chaining

Migrations are defined as version-to-version steps, not version-to-latest jumps. This means:
- Each step is small and testable
- Skipping versions chains through intermediates automatically
- Each migration step can be reviewed independently

## Dependencies

- Requires: WP01 (Workspace Contract) — migrations transform the contract
- Requires: WP04 (Plan/Apply Engine) — migrations execute through plan/apply
- Requires: WP08 (Contract Schema System) — migrations are defined between schema versions

## Open Questions

- [ ] Should migrations be reversible (down migrations)?
- [ ] How to handle migrations that require human decisions (ambiguous transformations)?
- [ ] Should migration history be stored (which migrations have been applied)?
- [ ] How to test migrations — fixture workspaces at each version?
