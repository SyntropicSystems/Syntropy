---
id: "dp-u02"
type: use-case
title: "New Contributor Onboarding"
status: defining
owner: meta-agent
created: 2025-02-09
updated: 2026-02-21
refs:
  depends-on: [dp01, dp08]
  related: [dp02, dp-u04]
tags: [dev-platform, use-case, onboarding]
---

# DP-U02 — New Contributor Onboarding

## Scenario

A new contributor (human developer or AI agent) joins the project for the first time. They need to understand the product vision, find out what's been built, learn how work is organized, and start contributing — all without asking anyone for help. The development platform should make this possible through self-service navigation.

### Steps

1. Contributor opens `AGENTS.md` — the root entry point
2. Reads the project summary, principles, and repository structure
3. Follows the link to `.syntropy/system-of-work/ROUTER.md` to understand how work is routed
4. Identifies which domain is relevant to their task (product, architecture, UX, integration)
5. Loads the relevant domain brain (`CONTEXT.md`, `POLICY.md`, `OWNER.md`) and agent spec (`AGENT.md`)
6. Navigates to `docs/_registry.md` to see all existing documents and their status
7. Reads the relevant `_index.md` files (product, architecture) to understand what's been specified
8. Checks `docs/_changelog.md` to see recent activity and understand the project's momentum
9. Reads `docs/_conventions.md` to learn the documentation standards before contributing

### Outcome

- The contributor understands the product vision and current state within 20 minutes of reading
- They know which agent owns their area of work
- They know the conventions for contributing
- They can find any existing document by following links from entry points
- They're ready to execute a workflow (add feature, make decision, etc.)

## Features Exercised

- DP01 — Knowledge Graph (navigating the graph)
- DP08 — Entry Point Routing (AGENTS.md → router → domain)
- DP02 — Agent System (understanding agent scopes and ownership)
- DP04 — Registry & Changelog (finding documents and recent activity)

## Acceptance Criteria

- [ ] A contributor can navigate from AGENTS.md to any document in 3 or fewer hops
- [ ] Every domain has a clear entry point (index file or agent manifest)
- [ ] The registry lists all documents with status and owner
- [ ] Conventions are documented clearly enough to follow without additional guidance
- [ ] No circular navigation paths or dead ends
