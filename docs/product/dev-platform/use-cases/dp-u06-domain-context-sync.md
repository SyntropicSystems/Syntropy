---
id: "dp-u06"
type: use-case
title: "Syncing Domain Context After Changes"
status: defining
owner: meta-agent
created: 2025-02-09
updated: 2025-02-09
refs:
  depends-on: [dp09, dp02, dp04]
  related: [wf-sync-domain-context, dp-u07, dp-u02]
tags: [dev-platform, use-case, sync, context]
---

# DP-U06 — Syncing Domain Context After Changes

## Scenario

A contributor has been working across multiple domains — adding a new feature spec, updating architecture docs, and refining UX patterns. Several domain agents' working memory (Domain State) is now potentially stale. Before starting new work in the architecture domain, the contributor (or an AI agent acting as the architecture-agent) runs the sync workflow to catch up.

### Steps

1. The contributor activates the architecture-agent (loads its manifest)
2. Checks the `last-synced` date in the agent's Domain State — it's from 3 days ago
3. Runs `wf-sync-domain-context`:
   a. Scans `docs/_changelog.md` for entries since `last-synced`
   b. Finds: a new ADR was accepted, a feature spec was updated with architecture implications, and a new open question was created
   c. Reads each changed document
   d. Checks all invariants — finds one new dependency not reflected in Domain State
   e. Updates Domain State: adds the new ADR to "Key Decisions in Effect", adds the new open question to "Open Threads", updates "Cross-Domain Dependencies"
   f. Sets `last-synced` to today
   g. Logs the sync in the changelog
4. The contributor now has current context and can begin architecture work with confidence

### Outcome

- Architecture agent's Domain State accurately reflects all recent changes
- No stale understanding — the contributor knows about the new ADR, the feature change, and the new open question
- The sync is logged, creating an audit trail of when domains were last verified
- Total catch-up time: reading the sync output instead of re-reading all architecture documents

## Features Exercised

- DP09 — Domain Context Sync (core feature)
- DP02 — Agent System (agent manifest with Domain State)
- DP04 — Registry & Changelog (changelog scanning for drift detection)

## Acceptance Criteria

- [ ] Agent's Domain State is updated to reflect all changes since last sync
- [ ] All invariants have been verified (passing or flagged)
- [ ] `last-synced` timestamp is current
- [ ] Changelog has a sync entry
- [ ] No unresolved drift issues remain (or they're captured as open threads)
