---
id: "rp-u04"
type: use-case
title: "Deploying Infrastructure Changes"
status: defining
owner: architecture-agent
created: 2025-02-09
updated: 2026-02-24
refs:
  depends-on: [rp07]
  related: [adr-001, adr-006, rp-u05]
tags: [repo-platform, use-case, infrastructure]
---

# RP-U04 — Deploying Infrastructure Changes

## Scenario

A developer needs to deploy infrastructure changes. This use case is **deferred** until the backend/app stack and IaC tool are decided (ADR-006).

### Steps

1. Choose backend/app stack + IaC tool (new ADR)
2. Define or modify infrastructure in the chosen IaC codebase
3. Preview changes (diff of planned resources)
4. Apply changes to the target environment/stack
5. Verify provisioned resources and access controls

### Outcome

- Infrastructure changes are expressed as reviewable code
- Preview mode shows exact changes before applying
- State tracks all provisioned resources
- Changes are reversible via tool-supported rollback or code revert

## Features Exercised

- RP07 — Infrastructure as Code (deferred)

## Acceptance Criteria

- [ ] A stack + IaC tool choice is captured as an ADR before implementation
- [ ] Preview shows an accurate diff of changes
- [ ] Apply successfully provisions/modifies resources
- [ ] Infrastructure changes are reviewable in pull requests like any other code
