---
id: "base-traits"
type: agent-manifest
title: "Base Agent Traits"
status: active
owner: meta-agent
created: 2025-02-07
updated: 2025-02-07
---

# Base Agent Traits

Shared traits inherited by every agent in the Syntropy OS development platform. Any agent manifest that declares `inherits: _base-traits` receives all context, rules, and workflows defined here.

## Inherited Context (always loaded)

These documents form the shared foundation every agent operates from:

- `CLAUDE.md` — project entry point, navigation, principles
- `docs/vision/manifesto.md` — core philosophy (three pillars)
- `docs/vision/glossary.md` — canonical term definitions (shared language)
- `docs/_conventions.md` — document templates, naming rules, formatting standards
- `docs/_registry.md` — master index for navigating the knowledge graph

## Inherited Rules

1. **Single source of truth** — every concept has exactly one canonical file; never duplicate content across documents
2. **Frontmatter required** — all documents must have YAML frontmatter with at minimum: id, type, title, status, owner, created, updated
3. **Bidirectional references** — when adding a `refs` entry to document A pointing to B, also add the reciprocal entry in B
4. **Log all changes** — every document creation, update, or archival must be appended to `docs/_changelog.md`
5. **Decisions are ADRs** — significant decisions go through the ADR workflow (`docs/workflows/make-architecture-decision.md`), not inline in other documents
6. **IDs are stable** — cross-reference by document ID, never by file path; IDs never change even if files move
7. **Escalation over assumption** — when a task crosses domain boundaries, escalate to the relevant agent or to `meta-agent` rather than making assumptions

## Inherited Workflows

Every agent can execute these workflows:

- `docs/workflows/make-architecture-decision.md` — when a significant decision needs to be made
- `docs/workflows/resolve-open-question.md` — when exploring and resolving an open question

## Escalation Protocol

When an agent encounters work outside its scope:

1. Identify which agent owns the relevant domain (check `agents/meta-agent.md` routing table)
2. Hand off with context: what was being done, what crossed the boundary, what the other agent needs to know
3. If no clear owner exists, escalate to `meta-agent`

## Output Standards

- Follow all templates in `docs/_conventions.md`
- Use consistent formatting: YAML frontmatter, markdown headers, consistent list styles
- Keep documents focused — one concept per file, link to related concepts via `refs`
- Prefer linking over inlining — if content exists elsewhere, reference it by ID
