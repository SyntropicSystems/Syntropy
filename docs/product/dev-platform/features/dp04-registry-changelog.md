---
id: "dp04"
type: feature-spec
title: "Registry & Changelog"
status: defining
owner: meta-agent
priority: P0
created: 2025-02-09
updated: 2025-02-09
refs:
  depends-on: [dp01, dp05]
  enables: [dp-u04]
  related: [dp03, registry, changelog]
  informed-by: [jtbd-dev-platform]
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
- Updated whenever a document is created, moved, or changes status
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

## Dependencies

- Requires: DP01 (Knowledge Graph) — the registry indexes graph nodes; DP05 (Convention System) — conventions define registry and changelog formats
- Enables: DP-U04 (Exploring the Knowledge Graph)

## Open Questions

- [ ] Should the registry be auto-generated from frontmatter, or remain manually maintained?
- [ ] At what scale does a single registry file become unwieldy?
- [ ] Should the changelog include diffs or just descriptions?
