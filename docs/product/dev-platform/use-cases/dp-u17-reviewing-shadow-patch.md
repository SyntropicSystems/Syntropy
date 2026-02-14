---
id: "dp-u17"
type: use-case
title: "Reviewing and Applying a Shadow Patch"
status: exploring
owner: meta-agent
created: 2026-02-14
updated: 2026-02-14
refs:
  depends-on: [dp15, dp01]
  related: [dp-u16, dp-u18, dp-u20]
tags: [dev-platform, shadow-navigator, patches, review]
---

# DP-U17 — Reviewing and Applying a Shadow Patch

## Scenario

A developer has been building for a while. The HUD has been yellow — one or two small drifts detected, patches ready. The developer hits a natural pause point (finished a function, waiting for a build, taking a break) and decides to quickly review what the system found.

### Steps

1. Developer sees the HUD: yellow, "2 patches ready."
2. They open the Command Center (second window / panel) and navigate to the Inbox.
3. The Inbox shows two items:
   - **Patch 1** (low risk, high confidence): "Update API spec to include new `cache_ttl` field." One-sentence rationale. Affected artifacts listed. Confidence: 95%.
   - **Patch 2** (low risk, medium confidence): "Add validation rule for cache TTL range (1–3600s) based on DR-104." Confidence: 78%.
4. Developer reviews Patch 1. It looks correct — the spec was simply missing the new field they added. They click **Apply**.
5. The patch is applied to their working files. The spec now includes the field. HUD item count decreases.
6. Developer reviews Patch 2. The validation range seems too restrictive for their use case. They click **Edit**, adjust the range to 1–86400s, and apply the modified patch.
7. HUD turns green. All reconciled.
8. Total time spent: under 90 seconds.

### Outcome

The developer resolved two governance drifts in seconds. They didn't have to read any decision records, hunt for specs, or figure out what needed updating. The patches told them exactly what to change and why. They retained full control — applying one as-is and modifying the other.

## Features Exercised

- DP15 — Shadow Navigator (primary — patch generation, Inbox, apply/edit/reject workflow)
- DP01 — Knowledge Graph (artifact cross-references in patches)
- DP13 — Decision Records (the governing decisions patches trace back to)
- DP05 — Convention System (patch format follows conventions)

## Acceptance Criteria

- [ ] Patches are atomic and understandable without reading large documents
- [ ] Each patch includes: one-sentence rationale, affected artifacts, confidence level
- [ ] Apply, Edit, and Reject actions are available for every patch
- [ ] Applying a patch updates the working files immediately
- [ ] Editing a patch allows modification before apply
- [ ] Rejecting a patch requires a reason tag (false positive, policy outdated, later, not desired)
- [ ] Patch review for a typical drift takes under 60 seconds
- [ ] HUD updates immediately after patch actions
