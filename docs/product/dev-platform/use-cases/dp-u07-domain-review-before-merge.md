---
id: "dp-u07"
type: use-case
title: "Domain DRI Review Before Merge"
status: defining
owner: meta-agent
created: 2025-02-09
updated: 2026-02-24
refs:
  depends-on: [dp02, dp03, dp09]
  related: [dp-u01, dp-u06, dp-u14, wf-domain-review]
tags: [dev-platform, use-case, review, quality]
---

# DP-U07 — Domain DRI Review Before Merge

## Scenario

An implementer has completed a significant piece of work: a new feature spec (F13) that touches product, architecture, and UX domains. Before merging, they want each affected domain's DRI to verify the changes are coherent and don't violate any domain invariants. The implementer is an expert in product but not in architecture or UX, so they self-review product and delegate the other reviews.

### Steps

1. The implementer identifies affected domains by reviewing all changed files and their owners:
   - Product domain: new feature spec, updated product index, new use case → owned by product-agent
   - Architecture domain: new data model section, updated AI pipeline reference → owned by architecture-agent
   - UX domain: new UX pattern for the feature → owned by ux-agent

2. **Product domain (self-review):**
   - Implementer loads product-agent manifest, reviews Domain State
   - Checks: feature traces to JTBD? Use case is testable? Stories follow format?
   - Checks invariants: all pass
   - Signs off on product domain

3. **Architecture domain (delegated review):**
   - Implementer spins up architecture-agent (or hands off to a colleague with architecture expertise)
   - Architecture reviewer loads manifest + Domain State
   - Checks: data model changes remain storage-agnostic if the backend is deferred (ADR-006)? If a stack choice is introduced, is it captured as an ADR? No duplication?
   - Finds: the new data model section should reference an existing ADR — requests change
   - Implementer fixes, architecture reviewer approves

4. **UX domain (delegated review):**
   - Implementer spins up ux-agent
   - UX reviewer loads manifest + Domain State
   - Checks: pattern references its feature? Platform differences noted? Accessibility considered?
   - All pass — approves

5. Each reviewer updates their Domain State to reflect the incoming changes
6. Reviews are logged in the changelog
7. Changes merge with all domain DRIs having signed off

### Outcome

- Every affected domain has been verified by its DRI (self or delegated)
- No domain invariants were violated
- The architecture issue (missing ADR reference) was caught before merge
- All domain states are current post-merge
- The implementer could focus on their expertise (product) and trust domain experts for the rest

## Features Exercised

- DP09 — Domain Context Sync (DRI review pattern, invariant checking)
- DP02 — Agent System (agents as reviewers with domain expertise)
- DP03 — Workflow Engine (`wf-domain-review` followed)

## Acceptance Criteria

- [ ] All affected domains have been identified
- [ ] Each domain has a reviewer (self or delegated)
- [ ] Each domain's invariants have been checked
- [ ] All reviews are logged in the changelog
- [ ] Domain states are updated to reflect the reviewed changes
- [ ] No invariant violations exist in the merged result
