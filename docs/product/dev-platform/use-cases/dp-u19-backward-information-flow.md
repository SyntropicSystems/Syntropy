---
id: "dp-u19"
type: use-case
title: "Returning to an Earlier Phase When New Information Surfaces"
status: defining
owner: meta-agent
created: 2026-02-25
updated: 2026-02-25
refs:
  depends-on: [dp19, dp01]
  related: [dp-u18, dp13, dp18]
tags: [dev-platform, delivery, backward-flow, living-documents, use-case]
---

# DP-U19 — Returning to an Earlier Phase When New Information Surfaces

## Scenario

An effort is in Phase 7 (Implementation) when the implementer discovers that a core assumption from the effort document is wrong — for example, the effort assumed a synchronous request-response model, but implementation reveals that the actual use pattern requires asynchronous event-driven communication. This isn't a bug or a design oversight — it's genuinely new information that only surfaced through the act of building.

The Delivery Flow's backward information flow mechanism ensures this learning is routed to the right artifacts and the right phases, rather than being silently absorbed or hacked around.

## Actors

- **Implementer**: The contributor who discovered the new information
- **Architect/Designer**: The contributor responsible for the architecture and design phase
- **Effort owner**: The contributor responsible for the effort document

## Preconditions

- An effort is actively in a later phase (Phase 5+)
- New information has surfaced that contradicts, extends, or invalidates earlier phase artifacts

## Flow

1. **Implementer identifies the new information** during Phase 7 work: "The synchronous model assumed in the effort document doesn't match what we're seeing in practice"

2. **Implementer assesses impact scope** — does this affect:
   - The effort document (problem understanding changed)? → Route to Phase 2 artifacts
   - The architecture/design (better approach needed)? → Route to Phase 5 artifacts
   - The plan (sequencing or scope changed)? → Route to Phase 6 artifacts
   - Multiple of the above? → Route to each

3. **Effort document is updated** (if affected):
   - The assumption is corrected: "communication pattern is event-driven, not request-response"
   - The update is logged as a living document change, not a retroactive rewrite
   - Downstream artifacts that depend on this assumption are identified

4. **Architecture decisions are revisited** (if affected):
   - The relevant ADR is checked: does the decision still hold given the new information?
   - If not, a new ADR is created documenting the revised decision with updated context
   - The original ADR is not deleted — it's updated with a note pointing to the revision

5. **Plan is adjusted** (if affected):
   - Remaining phases are re-evaluated against the new understanding
   - Acceptance criteria are updated if they referenced the invalidated assumption
   - New stages may be added; existing stages may be reordered

6. **Implementation continues** with updated context
   - The implementer is now working from accurate artifacts, not hacking around a known-wrong assumption

## Postconditions

- The effort's artifacts accurately reflect current understanding
- No frozen artifacts contain invalidated assumptions
- Architectural decisions are revised where necessary, with traceability
- The plan reflects what's actually true, not what was originally assumed
- The implementation proceeds on solid ground

## Key Quality: Living Documents Over Frozen Artifacts

The critical difference between the Delivery Flow and traditional phase-gate processes is that artifacts evolve. A traditional process freezes the effort document at Phase 2 and the design at Phase 5. The Delivery Flow keeps them alive — when reality changes, the artifacts change. The cost of updating is always lower than the cost of building on known-wrong assumptions.

## Features Exercised

- DP19 — Delivery Flow (backward information flow mechanism)
- DP01 — Knowledge Graph (effort document updates)
- DP13 — Decision Records (ADR revision)
- DP18 — Coherence Engine (cross-phase consistency checking)
