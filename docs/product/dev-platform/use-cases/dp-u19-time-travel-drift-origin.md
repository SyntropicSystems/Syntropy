---
id: "dp-u19"
type: use-case
title: "Time-Traveling to Understand Drift Origin"
status: exploring
owner: meta-agent
created: 2026-02-14
updated: 2026-02-14
refs:
  depends-on: [dp15, dp04]
  related: [dp-u16, dp-u13, dp-u20]
tags: [dev-platform, shadow-navigator, timeline, debugging, drift]
---

# DP-U19 — Time-Traveling to Understand Drift Origin

## Scenario

A developer has been coding for a while, ignoring yellow warnings. Now they've hit a red state — the Shadow Navigator is telling them that fixing the accumulated drift will be significantly more expensive than it would have been earlier. The developer wants to understand where things went wrong and what the cheapest path to resolution is.

### Steps

1. HUD is red: "High complexity risk. Current drift will cost ~4h to fix. Review suggested."
2. Developer opens the Command Center and navigates to the Timeline.
3. The Timeline shows a commit-by-commit history with reconciliation states:
   - **Commit 1**: Green — compliant.
   - **Commit 2**: Yellow — "API schema mismatch introduced." Patch was suggested. Developer ignored it.
   - **Commit 3**: Yellow — "Additional endpoint built on top of mismatched schema." Debt growing.
   - **Commit 4**: Red — "Frontend client code now depends on the mismatched schema. Fixing requires changes across 3 layers."
4. Developer clicks on Commit 2 in the Timeline.
5. The system shows: "This is where the schema diverged from the spec. Here is the patch that was suggested then. Here is how much work it would have saved."
6. Developer sees the original patch is still applicable (with adjustments for Commits 3–4).
7. They click "Apply fix from this point" — the system generates a combined patch that resolves the original drift plus the downstream consequences.
8. Developer reviews the combined patch, adjusts one section, and applies it.
9. HUD returns to green.

### Outcome

Instead of debugging a complex, multi-layer issue from the endpoint backward, the developer traced it to the root cause in 60 seconds using the Timeline. The system showed them exactly when things went wrong, what was recommended, and how to fix it from the current state. The "4-hour fix" became a 10-minute review.

## Features Exercised

- DP15 — Shadow Navigator (primary — Timeline, drift history, combined patch generation)
- DP04 — Registry & Changelog (commit-by-commit compliance history)
- DP01 — Knowledge Graph (tracing drift through artifact dependencies)
- DP13 — Decision Records (the governing decisions that define "correct")

## Acceptance Criteria

- [ ] Timeline shows commit-by-commit compliance states (green/yellow/red)
- [ ] Developer can click any point in the Timeline to see what drifted and what was recommended
- [ ] The system can generate a combined patch that resolves accumulated drift from the current state
- [ ] Causality is clear: developer understands "this drift caused that pain" in under 60 seconds
- [ ] The debt score shows how cost increased over time (visible trajectory)
- [ ] Late-applied fixes account for all subsequent changes (no naive patch-from-the-past that conflicts with current code)
