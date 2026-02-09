---
id: "wf-domain-review"
type: workflow
title: "Domain DRI Review"
status: active
owner: meta-agent
created: 2025-02-09
updated: 2025-02-09
refs:
  related: [dp09, wf-sync-domain-context, base-traits, dp02]
---

# Workflow: Domain DRI Review

## When to Use

- Before merging changes that touch multiple domains
- When an implementer has made changes outside their primary domain expertise
- When the implementer wants domain experts to verify correctness and coherence
- As a quality gate before significant work is considered complete

## Prerequisites

- Changes have been made and are ready for review
- The affected domains can be identified (by looking at which files changed and who owns them)
- The domain agent's manifest is available with current Domain State

## Steps

### Step 1: Identify Affected Domains

Review all changes (files modified, created, or deleted). For each file, check its `owner` field or consult `docs/_registry.md` to determine which agent owns it. Group changes by domain agent.

### Step 2: Determine Review Strategy

For each affected domain, the implementer chooses:

- **Self-review**: The implementer has sufficient expertise in this domain. They load the domain agent's manifest, review against its rules and invariants, and sign off.
- **Delegated review**: The implementer spins up the domain agent (or hands off to a colleague who is the domain expert). The domain agent reviews with full context.

The choice depends on:
- Implementer's familiarity with the domain
- Complexity of the changes in that domain
- Risk level (P0 features, architecture changes → prefer delegated review)

### Step 3: Load Domain Context

The reviewer (self or delegated agent) loads:
1. The domain agent's manifest (context cache + domain state)
2. All "Always" context documents
3. Any "On Demand" documents relevant to the changes being reviewed

### Step 4: Review Against Domain Rules

For each change in the domain, verify:
1. **Rules compliance**: Does the change follow all rules listed in the agent's "Own Rules" section?
2. **Invariant preservation**: Does the change preserve all invariants listed in the Domain State?
3. **Decision coherence**: Is the change consistent with active ADRs and decisions in effect?
4. **No accidental complexity**: Does the change introduce unnecessary abstractions, duplication, or coupling?
5. **Cross-reference integrity**: Are all bidirectional references intact?
6. **Convention compliance**: Does the change follow `docs/_conventions.md`?

### Step 5: Check Cross-Domain Impact

For changes that affect cross-domain dependencies:
1. Identify which other domains are affected
2. Verify the change doesn't break assumptions in other domains
3. If it does, flag for review by the other domain's agent

### Step 6: Produce Review Result

The reviewer produces one of:
- **Approved**: All checks pass. Domain state is coherent. Ready to merge.
- **Changes requested**: Specific issues identified with concrete fixes needed.
- **Escalate**: Changes have implications beyond the reviewer's authority (new P0 features, philosophy changes, etc.) — escalate per the agent's Decision Authority section.

### Step 7: Update Domain State (on approval)

If approved, the domain agent updates its Domain State to reflect the incoming changes:
- Update Current Focus, Key Decisions, Invariants, Open Threads as needed
- Update `last-synced` to today
- This ensures the domain state is current when the changes land

### Step 8: Log the Review

Add an entry to `docs/_changelog.md`:
```
| YYYY-MM-DD | updated | {agent-id} | Domain review: {approved|changes-requested} — {brief summary} | {reviewer-id} |
```

## Validation Checklist

- [ ] All affected domains have been identified
- [ ] Each domain has a reviewer assigned (self or delegated)
- [ ] Each domain's rules and invariants have been checked
- [ ] Cross-domain impacts have been assessed
- [ ] Review results are documented
- [ ] Domain state is updated for approved changes
- [ ] Changelog entries exist for reviews

## Executor Notes

Any agent can execute this workflow as a reviewer for its own domain. The meta-agent can coordinate multi-domain reviews. A human can execute by following the domain agent's manifest as a checklist.

### Recommended Review Pattern for Multi-Domain Changes

1. The implementer identifies all affected domains
2. The implementer self-reviews domains they're expert in
3. The implementer delegates review to domain agents for unfamiliar domains
4. The meta-agent coordinates if domains disagree or if changes span >3 domains
5. All domain states are updated upon final approval

### When to Skip

- Trivial changes within a single domain by the domain's own DRI (they're already the expert)
- Typo fixes, formatting changes, and other non-semantic modifications
- Changes to documents not yet in `specified` or later status (exploratory work is fluid)
