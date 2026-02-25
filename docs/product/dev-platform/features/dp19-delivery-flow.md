---
id: "dp19"
type: feature-spec
title: "Delivery Flow"
status: defining
owner: meta-agent
priority: P0
created: 2026-02-25
updated: 2026-02-25
refs:
  depends-on: [dp01, dp03, dp13, dp15, jtbd-dev-platform]
  enables: [dp-u18, dp-u19]
  informed-by: [jtbd-dev-platform]
  related: [delivery-flow, dp-stories, dp04, dp05, dp09, dp10, dp11, dp14, dp18, operational-engineering-agent]
tags: [dev-platform, delivery, methodology, process, p0]
---

# DP19 — Delivery Flow

## Summary

A nine-phase structured process for taking any significant effort from initial vision through to delivered, verified, integrated work. The Delivery Flow sequences existing platform capabilities (knowledge graph, workflows, decision records, observations, reflections, coherence engine) into a coherent end-to-end process with clear phase boundaries, entry/exit criteria, living documents that evolve across phases, and explicit mechanisms for later phases to feed information backward. It is the backbone process that prevents signal loss, unchallenged assumptions, and implementation drift.

## Problem

The dev platform has mature capabilities for individual activities — capturing observations (DP10), making decisions (DP13), executing workflows (DP03), maintaining coherence (DP18), reflecting on work (DP11). But there is no structured process that connects these capabilities into an end-to-end flow for significant efforts. Today:

- An effort may jump from "we have a vision" directly to "let's implement it," skipping the phases where assumptions would be challenged, research would inform decisions, and plans would be verified
- The problem space may be understood only through the lens of the solution the designer already has in mind, creating solution-bias that persists through architecture and implementation
- Architectural decisions may be made based on what the designer already knows rather than systematic investigation of what exists, what works, and what adjacent domains have solved
- Implementation may drift from intent because the effort document is frozen at distillation time rather than updated as new information surfaces
- Learnings from implementation may not flow back to update the effort document, design, or plan — creating a growing gap between "what we decided" and "what we know now"
- Reflection may be skipped because there's no phase boundary that makes it explicit

## Core Capabilities

### C1 — Phase-Based Structure

Nine sequential phases with clear purpose, entry/exit criteria, and outputs:

1. **Discovery** — Get everything on the table (raw input, no filtering)
2. **Distillation** — Transform raw input into structured, solution-agnostic effort document
3. **Challenge** — Expose effort document to external perspectives and owner feedback
4. **Research** — Gather information for informed decisions (bounded briefs, cross-pollination)
5. **Architecture & Design** — Make concrete decisions via ADRs, interface contracts, design docs
6. **Planning** — Create phased implementation plans with atomic stages and acceptance criteria
7. **Implementation** — Build phase by phase, stage by stage, with verification
8. **Verification & Integration** — End-to-end verification, integration, documentation reconciliation
9. **Reflection & Learning** — Close the loop, capture learnings, evolve the process

### C2 — Living Documents

Effort documents are updated at every phase, not frozen. When implementation surfaces information that changes the problem understanding, the effort document is updated. When research contradicts assumptions, the effort document is updated. The gap between "what we decided" and "what we know now" is continuously closed.

### C3 — Backward Information Flow

Later phases regularly surface information that sends work back to earlier phases. This is expected and supported:

- Implementation reveals the design missed a case → update the design, possibly the architecture
- Research contradicts an assumption in the effort document → update the effort document
- Verification finds documentation drift → update the docs to match reality
- Reflection identifies a process improvement → update this flow document atomically

### C4 — Phase Gate Discipline

Each phase has explicit entry and exit criteria that prevent skipping under pressure. The exit criteria are not bureaucratic gates but substantive quality checks:

- Can someone with no context read the effort document and understand the problem without being biased toward a solution? (Phase 2 exit)
- Has the effort document been challenged by at least one external perspective? (Phase 3 exit)
- Are architectural decisions informed by actual research findings? (Phase 5 entry)
- Does every implementation phase deliver a working, verifiable increment? (Phase 6 exit)

### C5 — Watch-For Pattern Library

Each phase carries a curated set of failure modes observed in practice. These are lightweight alerts, not rigid procedures — "be alert for this" rather than "always do this." The library grows atomically through Phase 9 reflection: a pattern observed once is an anecdote; observed three times, it becomes a candidate for a watch-for item.

### C6 — Integration with Existing Platform

The Delivery Flow doesn't create new infrastructure — it sequences existing capabilities:

| Phase | Primary Platform Features |
|-------|--------------------------|
| Discovery | DP10 (Observation System), `wf-capture-observation` |
| Distillation | DP01 (Knowledge Graph), `wf-add-knowledge-document` |
| Challenge | DP14 (Cognitive Engineering), external review |
| Research | Cross-pollination from adjacent domains |
| Architecture & Design | DP13 (Decision Records), `wf-make-architecture-decision`, `wf-record-decision` |
| Planning | DP15 (Operational Engineering), `wf-decompose-spec` |
| Implementation | DP03 (Workflow Engine), `wf-add-feature` |
| Verification & Integration | DP18 (Coherence Engine), `wf-validate-knowledge-graph` |
| Reflection | DP11 (Reflection Loop), `wf-reflect` |

## How It Works

1. A significant effort is identified — a new feature, platform capability, or cross-cutting change
2. The effort enters **Discovery**: raw input is captured without filtering or structuring
3. The effort moves to **Distillation**: raw input becomes a structured, solution-agnostic effort document
4. The effort document is **Challenged**: external perspectives and owner feedback improve it
5. **Research** is decomposed into bounded briefs; each brief goes deep and produces findings
6. **Architecture & Design** locks in decisions via ADRs informed by research; interface contracts are produced
7. **Planning** decomposes the design into phased implementation with atomic stages and acceptance criteria
8. **Implementation** proceeds phase by phase, with each stage verified before the next
9. **Verification & Integration** confirms the implementation matches intent; documentation is reconciled
10. **Reflection** captures learnings and evolves the process; then the next phase of implementation (if any) begins at step 7

At any point, information from a later phase can trigger a return to an earlier phase. This is healthy — the flow supports it through living documents that get updated, not frozen artifacts.

## Dependencies

- Requires: DP01 (Knowledge Graph) — effort documents live as graph nodes; DP03 (Workflow Engine) — phases reference workflows; DP13 (Decision Records) — architecture phase produces ADRs; DP15 (Operational Engineering) — planning phase uses actor-effective process design
- Enables: All significant efforts follow a structured path from vision to delivery

## Jobs Addressed

- **DJ22** — Follow a Structured Path from Vision to Verified Delivery (primary)
- **DJ23** — Ensure Solution Design Is Informed by Research, Not Assumptions (primary)
- **DJ24** — Maintain Living Context Across All Phases of an Effort (primary)
- **DJ2** — Enable Humans and AI Agents to Execute the Same Processes (secondary)
- **DJ3** — Keep Decisions Traceable and Reversible (secondary)
- **DJ9** — Enable Continuous Self-Improvement Through Honest Reflection (secondary)

## Phases

### Phase 1 — Document the Flow
- Capture the Delivery Flow as a vision document (`docs/vision/delivery-flow.md`)
- Define JTBD entries (DJ22–DJ24) tracing to the methodology
- Create feature spec (this document), use cases, and user stories
- Add glossary terms for new concepts
- Integrate cross-references across the knowledge graph

### Phase 2 — Workflow Templates
- Create workflow templates for each phase boundary (entry/exit criteria checklists)
- Create an effort document template that supports living updates across phases
- Create a research brief template with cross-pollination and anti-pattern sections
- Integrate with `wf-feature-inception` as the primary entry point

### Phase 3 — Tooling Support
- Add effort tracking to workspace state (`syntropy state`)
- Surface effort phase and status in domain context
- Integration with Coherence Engine for cross-phase consistency checking

## Open Questions

- [ ] Should each phase have its own workflow document, or should phases be sections within a single delivery flow workflow?
- [ ] How should the Delivery Flow interact with `wf-feature-inception`? Is inception a specific instantiation of Phases 1–3, or a separate preparatory process?
- [ ] What's the minimum effort size that warrants the full flow vs. a lightweight variant? Not every change needs nine phases.
- [ ] Should research briefs be first-class knowledge graph nodes (with their own type and ID prefix), or ephemeral artifacts?
