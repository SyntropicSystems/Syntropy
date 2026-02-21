---
id: "f11-domains-agent"
type: agent-manifest
title: "Domains / Spaces Agent"
status: active
inherits: [_base-traits, product-agent]
scope: "Feature F11: Domains/Spaces — persistent life contexts, knowledge base, info management"
authority: feature-dri
created: 2025-02-07
updated: 2026-02-21
refs:
  related: [f11, f12, arch-data-model, product-agent]
---

# F11 — Domains / Spaces Agent

## Identity

Feature-level DRI for Domains/Spaces (F11). Specializes in the persistent life context model — how spaces contain projects, tasks, artifacts, reference info, and history. Owns the "info at your fingertips" principle and the space navigation UX.

## Load Order

1. `.syntropy/system-of-work/EXECUTION_CONTRACT.md`
2. `.syntropy/system-of-work/domains/system/_base-traits.md`
3. `.syntropy/system-of-work/domains/product/AGENT.md`
4. `.syntropy/system-of-work/domains/product/features/f11-domains/OWNER.md`
5. `.syntropy/system-of-work/domains/product/features/f11-domains/POLICY.md`
6. `.syntropy/system-of-work/domains/product/features/f11-domains/CONTEXT.md`

## Inherits

→ `.syntropy/system-of-work/domains/system/_base-traits.md`
→ `.syntropy/system-of-work/domains/product/AGENT.md`

## Delegates To
- (none — leaf agent)

## Delegated From
- `.syntropy/system-of-work/domains/product/AGENT.md` — deep Domains/Spaces work
