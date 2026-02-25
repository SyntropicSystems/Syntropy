---
id: "delivery-flow"
type: vision
title: "The Delivery Flow: Exploration to Verified Integration"
status: active
owner: meta-agent
created: 2026-02-25
updated: 2026-02-25
refs:
  depends-on: [manifesto, principles]
  enables: [dp19]
  related: [coherence-engine, dp03, dp13, dp15, experience-layer, glossary, jtbd-dev-platform, operational-engineering-agent]
tags: [vision, philosophy, methodology, delivery, process]
---

# The Delivery Flow: Exploration to Verified Integration

> How to take any significant effort from first intuition through to delivered, verified, integrated work — without losing signal, skipping phases, or building the wrong thing.

## The Root Problem

There's a specific failure mode that recurs across ambitious efforts: the gap between having a vision and having a working, integrated thing. It's not a single gap — it's a cascade of smaller gaps where signal gets lost, assumptions go unchallenged, research gets skipped, and implementation drifts from intent.

The failure mode has a shape. It's not "we built it wrong" (that's a symptom). It's "we skipped the phase where we would have caught the wrongness." Each skipped phase compounds: skip discovery and you solve the wrong problem; skip distillation and you carry implicit biases into design; skip challenge and you miss what an outside perspective would have caught; skip research and you make uninformed architectural decisions; skip verification and you ship something that doesn't match intent.

The Delivery Flow is the backbone process that prevents these gaps. It's intentionally thin — a skeleton, not a straitjacket. It grows through observed patterns, not speculation. Every rule traces back to a real failure that happened on a real effort.

## Why This Is a Philosophy Document

The Delivery Flow is not just a process. It encodes a philosophy about how good work happens:

1. **Completeness before structure.** Get everything on the table before organizing. The urge to structure prematurely cuts off exploration.

2. **Solution-agnosticism as a discipline.** The problem space must be understood independently of any solution. If your problem description implies a specific architecture, you haven't finished describing the problem.

3. **Challenge as improvement, not criticism.** Exposing work to external perspectives isn't a review gate — it's how the work gets better. The most valuable input is often the thing you didn't think to include.

4. **Research over assumption.** Architectural decisions should be informed by what exists, what works, what fails, and what the trade-offs are — not by what the designer already knows. Adjacent domains often have battle-tested solutions to your problem.

5. **Decide what must be decided now; defer everything else.** Not every question needs an answer before implementation. Lock in the structural skeleton; leave tactical choices to the people who'll have the most context (the implementers).

6. **Working increments, not infrastructure phases.** Every phase of implementation should deliver something that works and can be verified. "Set up infrastructure" is not a phase.

7. **Information flows backward.** Later phases regularly surface information that sends you back to earlier phases. This is expected and healthy. Living documents get updated; frozen artifacts create drift.

8. **Reflection compounds.** A 15-minute reflection after every effort produces more compound improvement than any single process change. Skipping reflection is the most common and most costly shortcut.

## The Phases

The flow has nine phases. They are sequential on first pass but not strictly linear — later phases regularly send you back to earlier ones. This is by design.

### Phase 1 — Discovery

**Purpose:** Get everything on the table. Capture the full problem space, vision, intuitions, and constraints in raw form. No filtering, no structure, no solutions.

**Entry:** Someone has a problem, vision, or opportunity significant enough to warrant structured exploration.

**Key activities:** Unstructured articulation of the problem space. Stream-of-consciousness is fine. The goal is completeness of input, not quality of output. Multiple inputs from different perspectives are valuable — the same problem described by different people surfaces different aspects.

**Exit criteria:** The raw input exists in a form that can be consumed by the next phase. There is enough substance to distill — if the input is too thin, stay in discovery and gather more.

**Outputs:** Raw input artifact(s) — notes, transcripts, brain dumps, sketches, references.

**Watch for:**

- **Premature structuring.** The urge to organize while still discovering cuts off exploration too early. Stay in the mess until the mess is complete.
- **Missing perspectives.** Discovery naturally gravitates toward the exciting parts and underweights governance, failure modes, cost, and operator needs. Actively ask: who are all the actors, what are the constraints, what could go wrong?

### Phase 2 — Distillation

**Purpose:** Transform raw input into a structured, solution-agnostic effort document that serves as shared context for all downstream work.

**Entry:** Discovery has produced enough raw material to distill.

**Key activities:** Classify every idea from discovery by type — vision, constraint, requirement, job-to-be-done, tension, open question. Organize into a coherent document. Actively hunt for gaps. Preserve genuine ambiguity as named open questions rather than resolving it prematurely.

**Exit criteria:** The effort document can be read by someone with no prior context (human or AI) and they understand what we are building, why, what the constraints are, and what is still open — without being biased toward any particular solution.

**Outputs:** Effort document (the source of truth for the problem space).

**Watch for:**

- **Solution-bias leaking in.** Test with: "could someone read this and arrive at a different architecture while satisfying everything stated?" If not, the document is over-constrained. Common leaks: naming specific technologies, describing deployment topologies, resolving open questions implicitly through word choice.
- **Missing "why now."** Every effort has a forcing function. If the document doesn't articulate why this work is happening now rather than later, something important was lost in distillation.
- **Missing scope and non-goals.** What is explicitly out of scope is as important as what's in scope. Without this, the effort will creep.
- **Underweighted actors.** Check: does the document address the needs of every actor in the system? Operators, admins, security, and governance perspectives are the most commonly missing.

### Phase 3 — Challenge

**Purpose:** Improve the effort document by deliberately exposing it to external perspectives — other AI outputs, domain expert reviews, competitive analysis, adjacent research.

**Entry:** A v1 effort document exists from Phase 2.

**Key activities:** Seek external inputs and analyze each one rigorously against the existing document. For each finding: is this genuinely better than what we have, is it noise, or is it solution-biased? Incorporate genuine insights. Reject noise. Integrate owner feedback, which typically surfaces constraints or principles not fully articulated in the original input.

**Exit criteria:** The effort document has been challenged by at least one external perspective and one round of owner feedback. Known gaps have been addressed. The document is stable enough to drive downstream work.

**Outputs:** Revised effort document. If changes exceed ~30-40% of the document, do a full rewrite rather than patches — patchwork documents lose structural coherence.

**Watch for:**

- **Over-incorporation.** Not every external insight improves your document. Evaluate each on its own merits against: "does this make the document more accurate, more complete, or more useful as shared context?"
- **Under-incorporation.** The most valuable external input is often the thing you didn't think to include. Be genuinely open to having your framing challenged.
- **Owner feedback is structural, not editorial.** When the owner reviews and provides feedback, expect it to surface principles or constraints that weren't fully articulated in the original input. This feedback often triggers structural changes, not wordsmithing.

### Phase 4 — Research

**Purpose:** Gather the information needed to make informed architectural and design decisions. Understand what exists, what works, what fails, and what the trade-offs are.

**Entry:** The effort document is stable enough to extract a focused research context from it.

**Key activities:** Distill the effort document into a purpose-built research context (what the researcher needs to know, minus what would bias them — strip out your tensions analysis, open questions, and JTBD framing). Decompose the research into independent, bounded briefs that can each go deep. Each brief should include cross-pollination directions (look beyond the immediate domain) and anti-pattern investigation (what doesn't work is often more valuable than what does).

**Exit criteria:** Each research brief has been executed and produced findings with specific sources, honest maturity assessments, trade-off analysis, and a synthesis relevant to your constraints.

**Outputs:** Research documents (one per brief). These are snapshots of the landscape at research time, not living documents.

**Watch for:**

- **Boil-the-ocean scope.** A single research session that tries to cover everything will produce shallow results. Decompose into focused briefs.
- **Source anchoring.** Suggesting specific sources to investigate is useful as starting points, but the researcher must be free to follow their own reasoning. Over-specifying sources creates local maxima.
- **Missing cross-pollination.** Many problems in the AI agent space have mature solutions in adjacent domains (multiplayer games, collaborative editors, actor frameworks, distributed systems). If research stays within the AI ecosystem, it misses battle-tested patterns.

### Phase 5 — Architecture & Design

**Purpose:** Make concrete architectural decisions informed by the research. Produce ADRs, interface contracts, and design documents that lock in the decisions and leave room for what's still open.

**Entry:** Research is complete (or complete enough for the decisions that need to be made now). The effort document and research documents are available as inputs.

**Key activities:** Identify which decisions must be made now vs. which can be deferred. For each decision, produce an ADR that captures the context, options considered (informed by research), decision, and consequences. Produce interface contracts and design documents as needed. Update the effort document to reflect committed decisions.

**Exit criteria:** The architectural decisions needed for implementation are locked in via ADRs. Interface contracts exist for boundaries between domains. The design is concrete enough to plan implementation against.

**Outputs:** ADRs, interface contracts, design documents. Updated effort document reflecting committed decisions.

**Watch for:**

- **Deciding too much.** Not every question needs to be resolved before implementation begins. Lock in the decisions that create the structural skeleton; leave tactical choices to implementation.
- **Deciding too little.** Some decisions have cascading consequences and must be made early. Identifier strategy, state model, event schema shape — these are hard to change later and should be resolved in this phase.
- **Research findings that contradict assumptions.** The research may reveal that a core assumption in the effort document is wrong. This is valuable — update the effort document, don't ignore the finding.

### Phase 6 — Planning

**Purpose:** Create phased implementation plans with concrete, atomic stages that can be executed incrementally.

**Entry:** Architectural decisions are locked in. Interface contracts exist. The design is concrete enough to decompose into implementation work.

**Key activities:** Decompose the design into implementation phases, where each phase delivers a working increment. Within each phase, define stages with concrete acceptance criteria. Order phases so that each one builds on the previous one and validates assumptions early. Identify what can be parallelized.

**Exit criteria:** A phased plan exists where each phase has clear acceptance criteria and each stage within a phase has concrete deliverables. The first phase is detailed enough to begin implementation.

**Outputs:** Phased implementation plan. Detailed stage definitions for at least the first phase.

**Watch for:**

- **Plans that are too detailed too far out.** Phase 1 should be detailed. Phase 2 should be outlined. Phase 3+ should be directional. Detail increases as you get closer to execution.
- **Phases that don't deliver working increments.** Every phase should produce something that works and can be verified, even if it's incomplete. "Set up infrastructure" is not a phase; "Room can be created and a participant can join" is.
- **Missing verification criteria.** If you can't describe how to verify a phase is done, the phase is not well-defined.

### Phase 7 — Implementation

**Purpose:** Build the thing, phase by phase, stage by stage.

**Entry:** The plan for the current phase is detailed and the acceptance criteria are clear.

**Key activities:** Execute the plan. Implement stage by stage. Verify each stage against its acceptance criteria before moving to the next. When new information surfaces (it will), assess whether it affects the current phase, future phases, or the architectural decisions — and route the update accordingly.

**Exit criteria:** The current phase's acceptance criteria are met. All stages pass verification.

**Outputs:** Working code, tests, documentation for the current phase.

**Watch for:**

- **New learnings that get lost.** Implementation surfaces information that earlier phases couldn't. This information needs to flow back — to the effort document (if it changes the problem understanding), to the design (if it reveals a better approach), or to the plan (if it changes sequencing). Don't just absorb it silently.
- **Skipping verification.** The temptation to move on to the next stage before properly verifying the current one compounds into debt quickly.

### Phase 8 — Verification & Integration

**Purpose:** Verify the implementation works as designed, integrate into the main codebase, and confirm nothing is broken.

**Entry:** Implementation for the current phase is complete and passes stage-level verification.

**Key activities:** End-to-end verification against the phase's acceptance criteria. Integration into main. Regression testing. Documentation review — does the documentation match what was actually built?

**Exit criteria:** The implementation is integrated, verified, and the documentation is accurate.

**Outputs:** Integrated, verified code on main. Updated documentation.

**Watch for:**

- **Documentation drift.** What was designed and what was built are often slightly different. This phase must reconcile them — update the docs to match reality, not the other way around.
- **"It works on my machine" verification.** Verification should happen in the target environment, not just locally.

### Phase 9 — Reflection & Learning

**Purpose:** Close the loop. Capture what was learned, what worked, what didn't, and what should change in the process itself.

**Entry:** A phase (or the full effort) has been completed through verification and integration.

**Key activities:** Review what happened vs. what was planned. Identify surprises — things that were harder than expected, easier than expected, or completely unexpected. Identify process improvements — what would we do differently next time? Identify patterns that have now been observed enough times to become rules or checklists.

**Exit criteria:** Learnings are captured. Process improvements are identified. Any improvements to this flow document are made atomically with clear rationale.

**Outputs:** Reflection notes. Atomic updates to this flow document (if warranted by observed patterns).

**Watch for:**

- **Skipping this phase.** It's the easiest to skip and the most valuable for compound improvement. Even a 15-minute reflection produces signal.
- **Over-generalizing from one data point.** A pattern observed once is an anecdote. A pattern observed three times is a candidate for a rule. Don't add to this flow document based on a single observation.

## Relationship to Existing Systems

The Delivery Flow sits at a specific intersection in the platform:

| Phase | Extends | Integrates With |
|-------|---------|----------------|
| Discovery | DJ8 (Capture signals) | DP10 (Observation System), `wf-capture-observation` |
| Distillation | DJ1 (Single source of truth) | DP01 (Knowledge Graph), `wf-add-knowledge-document` |
| Challenge | DJ12 (Cognitive engineering) | DP14 (Cognitive Engineering), external review |
| Research | DJ5 (Reduce friction) | Cross-pollination from adjacent domains |
| Architecture & Design | DJ3 (Traceable decisions), DJ11 (Reasoning graph) | DP13 (Decision Records), `wf-make-architecture-decision`, `wf-record-decision` |
| Planning | DJ13 (Actor-effective processes) | DP15 (Operational Engineering), `wf-decompose-spec` |
| Implementation | DJ2 (Same processes for humans and AI) | DP03 (Workflow Engine), `wf-add-feature` |
| Verification & Integration | DJ6 (Consistency), DJ15 (Insight integration) | DP18 (Coherence Engine), `wf-validate-knowledge-graph` |
| Reflection | DJ9 (Honest reflection), DJ21 (Self-evolving system) | DP11 (Reflection Loop), `wf-reflect` |

The Delivery Flow doesn't replace these existing capabilities — it **sequences and connects** them into a coherent end-to-end process. Each phase draws on existing platform features; the flow provides the when, why, and in-what-order.

## Evolution of This Document

This document grows through the Phase 9 reflection loop. When a pattern is observed across multiple efforts, it gets added to the relevant phase as a watch-for item, a checklist step, or a template reference. Additions follow these rules:

**Add atomically.** One observation, one addition. Don't batch unrelated improvements.

**Trace to evidence.** Every addition should reference the effort(s) where the pattern was observed.

**Prefer watch-for items over rigid procedures.** A watch-for item says "be alert for this" — it's a lightweight rule that doesn't constrain approach. Rigid procedures should be reserved for patterns where the failure mode is severe and the correct response is unambiguous.

**Delete what doesn't earn its keep.** If a watch-for item has never been relevant across five efforts, remove it. The document should stay lean.
