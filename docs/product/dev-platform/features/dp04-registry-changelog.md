---
id: "dp04"
type: feature-spec
title: "Registry & Changelog"
status: defining
owner: meta-agent
priority: P0
created: 2025-02-09
updated: 2026-02-23
refs:
  decided-by: [dr-002, dr-003]
  depends-on: [dp01, dp05]
  enables: [dp-u01, dp-u03, dp-u04, dp-u05, dp-u06, dp-u09, dp09, dp10, dp13]
  informed-by: [jtbd-dev-platform]
  related: [changelog, dp-stories, dp03, registry, surf-dev-platform, wf-sync-domain-context]
tags: [dev-platform, core, traceability, p0]
---

# DP04 — Registry & Changelog

## Summary

Two complementary traceability mechanisms. The registry is a master index mapping every document's stable ID to its file path, status, and owner — the "table of contents" for the entire knowledge graph. The changelog is an append-only log recording every modification to the graph — the "event history" of the development platform itself.

## Jobs Addressed

- DJ3 — Keep Decisions Traceable and Reversible (primary)
- DJ1 — Maintain a Single Source of Truth for All Product Knowledge (secondary)

## How It Works

### Registry (`docs/_registry.md`)

- Single file with tables organized by document type (Vision, Features, Use Cases, etc.)
- Each row maps: ID → Title → Status → Owner → File Path
- **Generated deterministically from YAML frontmatter** via `syntropy gen registry`
- Drift-gated in CI via `syntropy gen registry --check`
- Acts as the "phone book" of the knowledge graph — if you know a concept exists, you can find it here
- Stable IDs in the registry are the canonical way to reference documents

### Changelog (`docs/_changelog.md`)

- Append-only log — entries are never modified or deleted
- Format: `| Date | Action | Document ID | Description | Author |`
- Actions: `created`, `updated`, `extracted`, `archived`, `superseded`, `moved`
- Provides a complete audit trail of how the knowledge graph evolved
- Mirrors the event sourcing principle from the application itself (F06)

### Integrity Properties

- Every document in the graph must have a registry entry
- Every document creation or significant update must have a changelog entry
- The registry reflects current state; the changelog reflects history
- Together they make the graph auditable and navigable
- The docs graph is enforced as a **bidirectional reference graph**:
  - validate with `syntropy docs check`
  - auto-fix missing backrefs with `syntropy docs sync`

## Dependencies

- Requires: DP01 (Knowledge Graph) — the registry indexes graph nodes; DP05 (Convention System) — conventions define registry and changelog formats
- Enables: DP-U04 (Exploring the Knowledge Graph)

## Open Questions

- [ ] At what scale does a single registry file become unwieldy?
- [ ] Should the changelog include diffs or just descriptions?
  - (Out of scope for the current bootstrap slice: changelog automation.)
