---
id: "rp07"
type: feature-spec
title: "Infrastructure as Code"
status: exploring
owner: architecture-agent
priority: P1
created: 2025-02-09
updated: 2026-02-24
refs:
  depends-on: [rp01, rp02]
  enables: [rp-u04]
  related: [adr-006, adr-001, adr-004, arch-stack, rp-stories, surf-repo-platform]
  informed-by: [jtbd-repo-platform]
tags: [repo-platform, iac, p1]
---

# RP07 — Infrastructure as Code

## Summary

Manages cloud infrastructure as reviewable, declarative code. This capability is **deferred** while the backend/app stack is intentionally undecided (ADR-006).

## Jobs Addressed

- RJ4 — Declarative Infrastructure Management (primary)

## How It Works

### Deferred Until Stack Decision

Infrastructure depends on the chosen backend/app stack (storage, auth, compute, hosting). Until that decision is made, we avoid committing to:
- a specific cloud provider,
- a specific IaC tool,
- a specific repo layout for infrastructure code.

### Candidate Approaches (Not Decided)

- **Pulumi** — TypeScript-first IaC (historical candidate)
- **Terraform/OpenTofu** — declarative HCL-based IaC
- **Cloud-native templates** — provider-specific (least portable)

## Dependencies

- Requires: RP01 (Toolchain Version Management)
- Requires: RP02 (Workspace & Module Management)

## Open Questions

- [ ] Where should infrastructure live once chosen: this repo (`tools/`), a dedicated `workspaces/` fixture, or a separate repo?
- [ ] What are the required deployment targets (hosting, serverless, workers) for the first shippable surface?
