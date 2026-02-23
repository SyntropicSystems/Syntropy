---
id: "wp04"
type: feature-spec
title: "Plan/Apply Engine"
status: exploring
owner: workspace-contracts-agent
priority: P0
created: 2026-02-21
updated: 2026-02-21
refs:
  architecture: [arch-plan-apply-engine]
  depends-on: [wp01, wp03]
  enables: [wp-u02, wp-u04, wp-u05, wp06]
  informed-by: [jtbd-workspace-platform]
  open-questions: []
  related: [surf-workspace-platform, wp-stories, wp05, wp07]
tags: [workspace-platform, plan-apply, transactions, p0]
---

# WP04 — Plan/Apply Engine

## Summary

The plan/apply engine is the transactional patch system that makes structural workspace changes safe and reviewable. Every mutation goes through `syntropy plan` (preview) then `syntropy apply` (execute). This eliminates "scary refactors" by making every change visible, atomic, and reversible.

## Jobs Addressed

- WJ4 — Apply Structural Changes Transactionally (primary)
- WJ3 — Validate Workspace Coherence Continuously (secondary)

## How It Works

### The Plan/Apply Cycle

1. **Plan**: The user or agent requests a change (e.g., `syntropy add service payments`). The engine computes the full set of file operations needed and outputs a `PatchSet`.
2. **Review**: The operator reviews the patchset — what files will be created, modified, or deleted. Nothing has happened yet.
3. **Validate**: The engine runs validation on the projected post-apply state to ensure the result would be coherent.
4. **Apply**: The patchset is executed atomically. Either all changes succeed or none do.
5. **Rollback** (if needed): Applied patchsets are recorded and can be reversed.

### PatchSet Contract

A PatchSet is a structured representation of all changes:

```json
{
  "schema_version": "v0",
  "operation": "add-service",
  "parameters": { "name": "payments", "type": "rust-service" },
  "changes": [
    { "action": "create", "path": "products/command-center/services/payments/", "type": "directory" },
    { "action": "create", "path": "products/command-center/services/payments/Cargo.toml", "content": "..." },
    { "action": "create", "path": "products/command-center/services/payments/src/main.rs", "content": "..." },
    { "action": "modify", "path": "syntropy.toml", "diff": "..." },
    { "action": "modify", "path": "Cargo.toml", "diff": "..." }
  ],
  "validation_result": { "valid": true, "errors": [], "warnings": [] }
}
```

### Operations That Go Through Plan/Apply

- `syntropy add service <name>` — scaffold a new service
- `syntropy add app <name>` — scaffold a new app
- `syntropy add crate <name>` — scaffold a new platform crate
- `syntropy rename <component>` — rename with all references updated
- `syntropy move <component>` — relocate within the structure
- `syntropy migrate` — contract version migration
- Any structural change an agent proposes

### Human Writes vs Platform Writes

Humans can still edit files directly — this is "manual mode." But:
- CI only trusts "state after validate + apply"
- Validators will catch manual changes that violate conventions
- The plan/apply path is the "paved road" — easy and guaranteed correct

### Agent Integration

AI agents propose changes through plan/apply too:
1. Agent determines what needs to change
2. Agent generates a patchset
3. Human (or automated policy) reviews
4. Apply executes

This gives humans oversight of agent-proposed structural changes.

## Dependencies

- Requires: WP01 (Workspace Contract) — patchsets modify the contract
- Requires: WP03 (Validation Engine) — validates projected post-apply state
- Enables: WP06 (Migrations) — migration uses plan/apply for execution

## Open Questions

- [ ] Should patchsets be persisted for audit trail?
- [ ] How does plan/apply interact with git? Auto-commit after apply?
- [ ] Should there be a `--dry-run` flag separate from `plan`?
- [ ] What's the rollback granularity — full patchset or per-change?
