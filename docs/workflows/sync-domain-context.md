---
id: "wf-sync-domain-context"
type: workflow
title: "Sync Domain Context"
status: active
owner: meta-agent
created: 2025-02-09
updated: 2025-02-09
refs:
  related: [base-traits, dp-u06, dp02, dp04, dp09, wf-audit-observations, wf-domain-review, wf-update-document, wf-validate-knowledge-graph]
---

# Workflow: Sync Domain Context

## When to Use

- A domain agent is being activated after a period of inactivity and needs to catch up
- The implementer suspects domain state may have drifted from the actual knowledge graph
- Periodically (e.g., before starting significant new work in a domain)
- After a batch of changes from another contributor has landed
- As part of onboarding — spinning up a fresh agent instance in a domain

## Prerequisites

- The agent manifest exists with an "Own Context" section and a "Domain State" section
- The changelog (`docs/_changelog.md`) is up to date
- The agent has access to all documents in its context cache

## Steps

### Step 1: Load Current Domain State

Read the agent's manifest. Note the `last-synced` timestamp from the Domain State section. If no Domain State section exists yet, this is an initial sync — proceed to Step 3.

### Step 2: Scan Changelog for Relevant Changes

Read `docs/_changelog.md`. Identify all entries since `last-synced` that affect documents within this agent's scope. Scope is defined by:
- Documents listed in the agent's context cache (Always, On Demand, Reference)
- Documents owned by this agent (check `owner` field in registry)
- Documents that reference documents owned by this agent (check cross-refs)

If no relevant changes are found, update `last-synced` to today and stop — the domain is current.

### Step 3: Review Changed Documents

For each changed document identified in Step 2:
1. Read the current version of the document
2. Compare against what the domain state says about it (if anything)
3. Note any discrepancies: new decisions, changed statuses, new dependencies, altered behavior

### Step 4: Check Invariants

For each invariant listed in the agent's Domain State:
1. Verify the invariant still holds by checking the relevant documents
2. If an invariant is violated, flag it as a **drift issue** requiring resolution
3. If an invariant is no longer relevant (e.g., the feature it governed was removed), mark it for removal

### Step 5: Check Cross-Domain Dependencies

For each cross-domain dependency listed in the agent's Domain State:
1. Verify the dependency still exists and is current
2. Check if the other domain's agent has made changes that affect this domain
3. If the dependency has changed, note what needs to update

### Step 6: Update Domain State

Update the agent manifest's Domain State section:
- **Current Focus**: Reflect any new active work or recently changed areas
- **Key Decisions in Effect**: Add new ADRs, remove superseded ones
- **Invariants**: Add new invariants from decisions, remove stale ones, flag violations
- **Open Threads**: Update with new open questions, close resolved ones
- **Cross-Domain Dependencies**: Update coupling points
- **Last Synced**: Set to today's date

### Step 7: Log the Sync

Add an entry to `docs/_changelog.md`:
```
| YYYY-MM-DD | updated | {agent-id} | Domain context sync: {brief summary of changes found} | {agent-id} |
```

## Validation Checklist

- [ ] All changelog entries since last sync have been reviewed
- [ ] All invariants have been checked (pass or flagged)
- [ ] Cross-domain dependencies are current
- [ ] Domain State section in manifest is updated
- [ ] `last-synced` timestamp is set to today
- [ ] Changelog entry for the sync exists
- [ ] No unresolved drift issues remain (or they're captured as open threads)

## Executor Notes

Any agent can execute this workflow for its own domain. The meta-agent can trigger it for any agent. A human contributor can also run this workflow by reading the agent's manifest and following the steps — the process is the same regardless of executor.

This workflow is particularly valuable when:
- **Spinning up a sub-agent**: Run sync first so the agent starts with current state
- **Returning to a domain after a break**: Catch up without re-reading everything
- **Before starting cross-domain work**: Ensure your understanding of the other domain is current
