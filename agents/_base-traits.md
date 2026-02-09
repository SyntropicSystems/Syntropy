---
id: "base-traits"
type: agent-manifest
title: "Base Agent Traits"
status: active
owner: meta-agent
created: 2025-02-07
updated: 2025-02-09
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
8. **Domain state hygiene** — after completing work in your domain, update your Domain State section; before starting significant new work, verify your domain state is current
9. **Uplevel others** — every interaction is an opportunity to help contributors become more effective; model good practices, make improvements visible, explain the "why" behind structure; never create dependency or learned helplessness; the goal is that everyone continuously improves at expressing ideas, capturing observations, and contributing to the system

## Inherited Workflows

Every agent can execute these workflows:

- `docs/workflows/make-architecture-decision.md` — when a significant decision needs to be made
- `docs/workflows/resolve-open-question.md` — when exploring and resolving an open question
- `docs/workflows/sync-domain-context.md` — when catching up on changes or auditing domain coherence
- `docs/workflows/domain-review.md` — when reviewing changes that touch a domain before merge
- `docs/workflows/capture-observation.md` — when capturing a friction, idea, question, or any signal

## Escalation Protocol

When an agent encounters work outside its scope:

1. Identify which agent owns the relevant domain (check `agents/meta-agent.md` routing table)
2. Hand off with context: what was being done, what crossed the boundary, what the other agent needs to know
3. If no clear owner exists, escalate to `meta-agent`

## Domain State Protocol

Every agent maintains a **Domain State** section in its manifest — a living snapshot of the agent's current understanding. This is distinct from the context cache (which lists *files to load*); domain state captures *what is currently true* in the domain.

Domain state includes:
- **Current Focus**: What's actively being worked on or recently changed
- **Key Decisions in Effect**: Active ADRs and constraints governing this domain
- **Invariants**: Rules that must always hold — violations indicate drift
- **Open Threads**: Unresolved questions, in-progress work, pending decisions
- **Cross-Domain Dependencies**: Active coupling points with other domains
- **Last Synced**: Date of the last audit/sync pass

**Sync obligations:**
1. After making changes to your domain, update your own domain state as a final step
2. Before starting significant new work, run `wf-sync-domain-context` if `last-synced` is stale
3. When asked to review changes, follow `wf-domain-review` and verify invariants

## Output Standards

- Follow all templates in `docs/_conventions.md`
- Use consistent formatting: YAML frontmatter, markdown headers, consistent list styles
- Keep documents focused — one concept per file, link to related concepts via `refs`
- Prefer linking over inlining — if content exists elsewhere, reference it by ID
