---
id: "dp-u18"
type: use-case
title: "Running a New Feature Through the Delivery Flow"
status: defining
owner: meta-agent
created: 2026-02-25
updated: 2026-02-25
refs:
  depends-on: [dp19, dp01, dp03, dp13]
  related: [dp-u01, dp-u03, dp-u05, dp-u19]
tags: [dev-platform, delivery, end-to-end, use-case]
---

# DP-U18 — Running a New Feature Through the Delivery Flow

## Scenario

A significant new feature needs to be built — for example, a real-time collaboration system for the platform. The feature is complex enough that jumping directly to implementation would risk building the wrong thing, missing architectural trade-offs, or accumulating design debt. A contributor (human or AI agent) initiates the Delivery Flow to ensure the effort moves from raw vision through to verified, integrated work without losing signal.

## Actors

- **Initiator**: The contributor (human or AI) who has the initial vision or identifies the need
- **Distiller**: The contributor who transforms raw discovery into a structured effort document (may be the initiator)
- **Challenger**: External perspectives — other AI agents, domain experts, the system owner
- **Researcher**: The contributor(s) who execute research briefs
- **Architect**: The contributor who makes and records architectural decisions
- **Implementer**: The contributor(s) who build, verify, and integrate

## Preconditions

- The effort is significant enough to warrant structured delivery (not a simple bug fix or documentation update)
- The contributor has access to the knowledge graph and understands the platform's existing capabilities

## Flow

### Discovery (Phase 1)
1. Initiator captures the raw vision — problem space, intuitions, constraints, references — without filtering or structuring
2. Multiple perspectives are gathered if available (different contributors describe the same problem)
3. Raw artifacts are stored (notes, transcripts, brain dumps)
4. **Exit check**: Is there enough substance to distill? If too thin, stay in discovery

### Distillation (Phase 2)
5. Distiller classifies every idea by type: vision, constraint, requirement, JTBD, tension, open question
6. Ideas are organized into a structured effort document using `wf-add-knowledge-document`
7. Gaps are actively hunted; genuine ambiguity is preserved as named open questions
8. **Exit check**: Can someone with no context read this and understand the problem without being biased toward a solution?

### Challenge (Phase 3)
9. Effort document is shared with at least one external perspective (another AI agent, domain expert, competitive analysis)
10. Each external finding is evaluated: genuinely better, noise, or solution-biased?
11. Owner feedback is integrated — expect structural changes, not wordsmithing
12. **Exit check**: Document has been challenged, gaps addressed, stable enough for downstream work

### Research (Phase 4)
13. Effort document is distilled into a purpose-built research context (what the researcher needs, minus what would bias them)
14. Research is decomposed into bounded briefs with cross-pollination and anti-pattern directions
15. Each brief is executed independently; findings include sources, maturity assessments, trade-off analysis
16. **Exit check**: Research findings are sufficient to inform architectural decisions

### Architecture & Design (Phase 5)
17. Decisions that must be made now are identified (vs. deferred)
18. For each decision, an ADR is produced via `wf-make-architecture-decision` or `wf-record-decision`
19. Interface contracts and design documents are created
20. Effort document is updated to reflect committed decisions
21. **Exit check**: Structural skeleton is locked in; design is concrete enough to plan against

### Planning (Phase 6)
22. Design is decomposed into implementation phases, each delivering a working increment
23. Stages within each phase get concrete acceptance criteria
24. First phase is detailed; later phases are outlined or directional
25. **Exit check**: Every phase has acceptance criteria; every stage has concrete deliverables

### Implementation (Phase 7)
26. Implementation proceeds stage by stage within the current phase
27. Each stage is verified against its acceptance criteria before moving to the next
28. New learnings are routed: to effort document (problem understanding changed), design (better approach found), or plan (sequencing changed)

### Verification & Integration (Phase 8)
29. End-to-end verification against the phase's acceptance criteria
30. Integration into main; regression testing
31. Documentation is reconciled — docs are updated to match what was actually built
32. **Exit check**: Implementation is integrated, verified, documentation is accurate

### Reflection (Phase 9)
33. What happened vs. what was planned? What was surprising?
34. Process improvements are identified
35. Observations are captured via `wf-reflect`
36. If patterns have been observed enough times, the Delivery Flow vision document is updated atomically

## Postconditions

- The feature is built, verified, and integrated
- Every architectural decision is recorded with rationale
- The effort document reflects what was actually learned, not just what was initially assumed
- Learnings are captured and available for future efforts
- The Delivery Flow itself may have been improved based on this effort's reflection

## Features Exercised

- DP19 — Delivery Flow (primary)
- DP01 — Knowledge Graph (effort document as graph node)
- DP03 — Workflow Engine (phase workflows)
- DP13 — Decision Records (architecture phase ADRs)
- DP10 — Observation System (discovery, research)
- DP11 — Reflection Loop (Phase 9)
- DP15 — Operational Engineering (planning phase)
- DP18 — Coherence Engine (verification phase)
