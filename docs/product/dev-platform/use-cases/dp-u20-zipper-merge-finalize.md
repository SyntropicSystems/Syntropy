---
id: "dp-u20"
type: use-case
title: "Finalizing Work with Zipper Merge"
status: exploring
owner: meta-agent
created: 2026-02-14
updated: 2026-02-14
refs:
  depends-on: [dp15, dp04, dp09]
  related: [dp-u17, dp-u07, dp-u19]
tags: [dev-platform, shadow-navigator, finalize, merge, zipper]
---

# DP-U20 — Finalizing Work with Zipper Merge

## Scenario

A developer has finished building a feature. Throughout their work, the Shadow Navigator has been running in the background — detecting drifts, generating patches, and keeping governance updates current. Some patches were applied along the way; a few remain. Now the developer wants to finalize everything before opening a PR.

### Steps

1. Developer opens the Command Center and navigates to the Finalize tab.
2. The Finalize view presents a clear summary:
   - **Compliant**: 12 artifacts verified, no issues.
   - **Patches ready**: 2 remaining (both low-risk, auto-generated).
     - "Update changelog with new API field"
     - "Add cross-reference from caching spec to new decision record"
   - **Prompts**: 0 — all decisions resolved.
   - **Overall status**: Ready to finalize.
3. Developer reviews the two remaining patches in a unified diff view.
4. Both look correct. Developer clicks "Apply All."
5. The system applies the patches, updates the affected files, and recalculates compliance.
6. Finalize view now shows: "All governance updates applied. Bundle ready."
7. Developer clicks "Sync & Finalize."
8. The system produces a clean commit (or set of commits) containing:
   - All governance updates (spec changes, changelog entries, cross-reference updates)
   - A summary of what was reconciled and why
9. Developer's PR now includes both their feature work and the governance updates — clearly separated and easy for reviewers to understand.
10. If a red-state violation had remained unresolved, the Finalize view would have blocked with a clear single reason and fix path — but because of continuous reconciliation, this doesn't happen.

### Outcome

The developer merged with confidence. Governance updates were not a last-minute scramble — they'd been prepared throughout the session. The PR includes compliant specs, updated cross-references, and a changelog entry. Reviewers can see exactly what governance changes were made and why. No surprises.

## Features Exercised

- DP15 — Shadow Navigator (primary — Finalize tab, Zipper merge, patch bundling, merge gating)
- DP04 — Registry & Changelog (changelog and registry updates bundled)
- DP09 — Domain Context Sync (domain-level compliance verification)
- DP13 — Decision Records (verified compliance against governing decisions)
- DP01 — Knowledge Graph (cross-reference integrity verification)

## Acceptance Criteria

- [ ] Finalize view clearly shows: what's compliant, what patches remain, what prompts are unresolved
- [ ] Developer can apply remaining patches individually or as a bundle
- [ ] "Sync & Finalize" produces a clean commit with governance updates clearly separated from feature work
- [ ] The bundled commit includes a human-readable summary of what was reconciled
- [ ] Merge gating blocks only for genuine red-state violations, not advisory warnings
- [ ] The merge gate message includes a clear single reason and fix path (not a wall of errors)
- [ ] Developers are not surprised at merge time — the Finalize state is predictable from the session's HUD history
