---
id: "dp06"
type: feature-spec
title: "Surface Definitions"
status: defining
owner: meta-agent
priority: P1
created: 2025-02-09
updated: 2025-02-09
refs:
  depends-on: [dp01, dp05]
  enables: [dp07]
  related: [surf-mobile, surf-web, surf-dev-platform]
  informed-by: [jtbd-dev-platform]
tags: [dev-platform, surfaces, p1]
---

# DP06 — Surface Definitions

## Summary

Formal specifications for each delivery surface (platform) of Syntropy OS. Each surface document defines the platform's constraints, capabilities, UX considerations, and which features it exposes. Surfaces bridge the gap between abstract product specs and platform-specific implementation.

## Jobs Addressed

- DJ5 — Reduce Friction When Adding, Finding, or Changing Product Specs (primary)
- DJ1 — Maintain a Single Source of Truth for All Product Knowledge (secondary)

## How It Works

### What a Surface Is

A surface is a specific platform or interface through which users interact with Syntropy OS. Each surface has:
- **Platform constraints** — screen size, input methods, OS capabilities
- **Feature scope** — which product features are exposed on this surface
- **UX adaptations** — how shared UX patterns adapt to platform specifics
- **Technical stack** — framework, runtime, deployment target

### Current Surfaces

| Surface | Target | Stack |
|---------|--------|-------|
| Mobile (`surf-mobile`) | iOS/Android | React Native |
| Web (`surf-web`) | Desktop browsers | React |
| Dev Platform (`surf-dev-platform`) | Developers & AI | Markdown + Git |

### Surface as Product Lens

Surface definitions let contributors ask: "How does feature X work on surface Y?" Each surface references the features it supports and any platform-specific behavior or constraints.

## Dependencies

- Requires: DP01 (Knowledge Graph) — surfaces are graph nodes; DP05 (Convention System) — surface docs follow conventions
- Enables: DP07 (Prototype System) — prototypes target specific surfaces

## Open Questions

- [ ] Should surfaces define API contracts between the product layer and the platform layer?
- [ ] How do we track feature parity across surfaces?
