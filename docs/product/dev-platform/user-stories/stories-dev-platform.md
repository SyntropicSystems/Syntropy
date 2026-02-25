---
id: "dp-stories"
type: user-story
title: "Dev Platform User Stories"
status: defining
owner: meta-agent
created: 2025-02-09
updated: 2026-02-25
refs:
  depends-on: [jtbd-dev-platform]
  related: [dp01, dp02, dp03, dp04, dp05, dp06, dp07, dp08, dp09, dp10, dp11, dp12, dp13, dp14, dp15, dp16, dp17, dp18, dp19, stories]
tags: [dev-platform, stories, requirements]
---

# Dev Platform User Stories

User stories for the development platform's three consumer types: developers, AI agents, and future tooling.

---

## Developer Stories

### DP-S01 — Add a Feature by Following a Workflow
As a developer, I want to add a feature spec by following a single workflow with clear steps so I don't miss steps or break graph integrity.

**Features:** DP03, DP05
**Jobs:** DJ2, DJ5

### DP-S02 — Navigate from Entry Point to Anything
As a new contributor, I want to start at one entry point and navigate to everything I need so I don't waste time searching or asking for directions.

**Features:** DP08, DP01
**Jobs:** DJ5

### DP-S03 — Understand Why Decisions Were Made
As a developer, I want every design decision logged with context and rationale so I can understand why things are the way they are before changing them.

**Features:** DP04, DP01
**Jobs:** DJ3

### DP-S04 — See All Features and Their Status
As a product owner, I want to see all features, their statuses, priorities, and dependencies in one place so I can prioritize and plan work.

**Features:** DP04, DP01
**Jobs:** DJ1, DJ5

### DP-S05 — Follow Consistent Documentation Standards
As a contributor, I want clear templates and naming conventions so every document I create fits the existing structure without guessing.

**Features:** DP05
**Jobs:** DJ6

### DP-S06 — Trace Changes Over Time
As a developer, I want an append-only changelog of all graph modifications so I can see what changed, when, and by whom.

**Features:** DP04
**Jobs:** DJ3

### DP-S07 — Explore Design Ideas with Prototypes
As a designer, I want to create interactive prototypes that reference specific features and UX patterns so I can validate ideas before committing to implementation.

**Features:** DP07, DP06
**Jobs:** DJ5

### DP-S08 — Find What Already Exists
As a contributor about to create a new document, I want to search the registry to check if the concept already has a canonical file so I don't create duplicates.

**Features:** DP04, DP01
**Jobs:** DJ1

### DP-S16 — Catch Up on a Domain After Being Away
As a developer returning to a domain after working elsewhere, I want to read the domain agent's current state and immediately understand what's active, what decisions are in effect, and what's unresolved so I can resume productive work without re-reading every document.

**Features:** DP09, DP02
**Jobs:** DJ7, DJ5

### DP-S17 — Delegate Work to Domain Experts
As an implementer working across multiple domains, I want to hand off implementation or review to domain-specific agents who maintain their own context and expertise so I can multiply myself without losing quality.

**Features:** DP09, DP02, DP03
**Jobs:** DJ7, DJ2

### DP-S18 — Verify Domain Coherence Before Merging
As a contributor finishing cross-domain work, I want each affected domain's DRI to review my changes against their invariants and rules so nothing slips through that violates domain constraints.

**Features:** DP09, DP02
**Jobs:** DJ7, DJ6

### DP-S22 — Capture a Quick Observation Without Breaking Flow
As a contributor who just noticed a friction, idea, or concern, I want to dump my thought into the system in 2 minutes or less — with as little or as much structure as I feel like providing — so the observation is captured before I forget it and I can return to my original work without losing context.

**Features:** DP10, DP03
**Jobs:** DJ8, DJ5

### DP-S23 — Get Help Articulating an Observation
As a contributor who noticed something but is struggling to express it clearly, I want to talk through it with the observations-agent who will ask me clarifying questions and create a well-structured observation on my behalf, so my insight isn't lost just because I couldn't find the right words in the moment.

**Features:** DP10, DP02
**Jobs:** DJ8

### DP-S24 — Audit Observations in My Domain
As a domain DRI, I want to review all observations tagged to my domain so I can see what contributors are experiencing, identify frictions I might have missed, discover ideas from outside my perspective, and use these signals to continuously evolve my domain.

**Features:** DP10, DP09
**Jobs:** DJ8, DJ7

### DP-S25 — Not Feel Anxious About Unstructured Observations
As a contributor, I want to know that even if I write a vague or poorly structured observation, someone (the observations-agent) will eventually add structure, ask me questions if needed, and make it useful — so I never hold back from capturing something because I'm worried about quality.

**Features:** DP10
**Jobs:** DJ8

### DP-S28 — Reflect After Completing Work
As a contributor who just finished a task, I want a lightweight prompt to pause and genuinely notice my personal experience — what worked, what was hard, how it felt — so I build self-awareness about my own effectiveness and contribute honest signals that help the system improve.

**Features:** DP11, DP10
**Jobs:** DJ9, DJ8

### DP-S29 — Add a Complete Feature Without Missing Layers
As a contributor adding a cross-cutting capability, I want a meta-workflow that tells me every layer I need to touch (JTBD, feature spec, use cases, stories, workflows, agent, glossary, directory, conventions) and the order to create them in, so I don't discover missing documents halfway through or have to reverse-engineer the scope from the changelog.

**Features:** DP03, DP05
**Jobs:** DJ2, DJ5

### DP-S31 — Get Help Reflecting Through Context-Aware Questions
As a contributor who just finished work, I want a companion that has read my commits, files, and AI threads and asks me specific questions about what I experienced — not "how did it go?" but "you rewrote those cross-refs three times, what was tricky?" — so my reflections are richer and more specific than they'd be if I reflected alone.

**Features:** DP12, DP11, DP10
**Jobs:** DJ10, DJ9

### DP-S32 — Develop Self-Awareness Through Guided Reflection
As a contributor over multiple sessions, I want the pulse companion to remember my patterns and notice things about my experience that I might not see myself — like "you capture fewer observations when working on architecture" or "your reflections are shorter after long sessions" — so I develop genuine self-awareness about how I work.

**Features:** DP12, DP11
**Jobs:** DJ10, DJ9

### DP-S33 — Control What My Companion Shares
As a contributor, I want full control over whether my reflections and pulse data are shared (even anonymized) with others, and I want the companion to explain what it noticed and why it's asking before surfacing anything — so I trust it and feel safe being honest.

**Features:** DP12
**Jobs:** DJ10

### DP-S36 — Understand a Code Review Without Reading Every File
As a human orchestrator reviewing AI-produced changes, I want the review structured with progressive disclosure — headline, impact summary, focus areas, walkthrough — so I can quickly understand what matters, know where to dive deep, and verify correctness without wading through every file diff.

**Features:** DP14, DP09
**Jobs:** DJ12, DJ7

### DP-S37 — Know What to Double-Check in a Change
As a reviewer of agent-produced work, I want the review to explicitly highlight what's risky, what assumptions were made, and what I should specifically verify — so I can focus my limited attention on the things that actually need human judgment rather than rubber-stamping everything.

**Features:** DP14
**Jobs:** DJ12

### DP-S38 — Learn a Subsystem Quickly Using a Learning Brief
As a contributor assigned to work in an unfamiliar subsystem, I want a structured learning brief that builds my mental model (context frame, key concepts, critical paths, common misconceptions) — so I can become productive without reverse-engineering the system from raw code and docs.

**Features:** DP14, DP02
**Jobs:** DJ12, DJ7

### DP-S39 — Continuously Improve How I Present Information
As a contributor or agent that produces reviews, reports, or summaries, I want the cognitive-engineering-agent to advise me on how to structure my output for my audience — and to explain *why* that structure works — so I get better at communicating knowledge over time, not just at filling in templates.

**Features:** DP14, DP10
**Jobs:** DJ12, DJ8

### DP-S43 — Get Guidance When Designing a New Workflow
As a contributor creating a new workflow, I want the operational-engineering-agent to advise me on step structure, checkpoint placement, scope calibration, and actor-specific considerations — so the workflow I create is effective for everyone who will execute it, not just my own mental model.

**Features:** DP15, DP03
**Jobs:** DJ13, DJ2

### DP-S44 — Know Why a Workflow Step Keeps Failing
As an orchestrator who notices an agent consistently missing or botching a specific step, I want to consult the operational-engineering-agent for a diagnosis — is the step ambiguous? Too context-dependent? Poorly scoped for this actor type? — so I can fix the process design rather than blaming the actor.

**Features:** DP15, DP10
**Jobs:** DJ13, DJ8

### DP-S45 — Trust That a Workflow Works Across Different Agents
As a contributor delegating work to multiple AI models, I want workflows that have been designed (or verified) for the specific actor types I'm using — so I can delegate with confidence that the process will be followed correctly regardless of which model executes it.

**Features:** DP15, DP02
**Jobs:** DJ13, DJ7

---

## AI Agent Stories

### DP-S09 — Load Context from a Manifest
As an AI agent, I want to load a manifest and know exactly what context files, rules, and workflows apply to my scope so I can operate within my domain without overstepping.

**Features:** DP02, DP08
**Jobs:** DJ2

### DP-S10 — Execute Workflows Deterministically
As an AI agent, I want workflows with explicit steps, inputs, outputs, and validation checklists so I can execute them deterministically and verify my own work.

**Features:** DP03
**Jobs:** DJ2

### DP-S11 — Know When to Escalate
As an AI agent, I want clear decision authority boundaries in my manifest so I know what I can decide autonomously and what requires escalation to another agent or a human.

**Features:** DP02
**Jobs:** DJ2

### DP-S12 — Follow Cross-References to Build Context
As an AI agent working on a feature spec, I want typed cross-references in frontmatter so I can automatically load related documents (dependencies, decisions, open questions) and have full context.

**Features:** DP01
**Jobs:** DJ1, DJ5

### DP-S19 — Spin Up with Full Domain State
As an AI agent being activated in a domain, I want to load the domain's living state (current focus, active decisions, invariants, open threads, dependencies) so I can be immediately productive without scanning the entire knowledge graph.

**Features:** DP09, DP02
**Jobs:** DJ7, DJ2

### DP-S20 — Audit My Domain for Drift
As an AI agent, I want to scan the changelog for changes since my last sync, check my invariants, and update my domain state so I can detect and resolve drift before it compounds.

**Features:** DP09, DP04
**Jobs:** DJ7, DJ6

### DP-S21 — Review Changes as Domain DRI
As an AI agent acting as a domain DRI, I want to review proposed changes against my domain's rules, invariants, and decisions so I can approve or flag issues before they merge.

**Features:** DP09, DP02, DP03
**Jobs:** DJ7, DJ2

### DP-S26 — Structure Raw Observations During Audit
As the observations-agent, I want to periodically process raw observations — adding types, domain tags, context, and formatting — while preserving the observer's voice and intent, so that unstructured signals become useful data without requiring the observer to do the structuring work themselves.

**Features:** DP10, DP03
**Jobs:** DJ8, DJ6

### DP-S27 — Detect Patterns Across Observations
As the observations-agent, I want to scan all observations for recurring themes, clustering signals, and cross-domain correlations so I can surface emergent patterns that no individual contributor could see alone and promote high-signal patterns to formal action items.

**Features:** DP10, DP04
**Jobs:** DJ8, DJ1

### DP-S30 — Reflect on My Own Processing Experience
As an AI agent that just completed a task, I want to genuinely reflect on what happened during my processing — what context was helpful, what was missing, where I had to infer, where I was uncertain — so my reflection is honest signal about how the system serves AI agents, not theoretical observations about ideal systems.

**Features:** DP11, DP10
**Jobs:** DJ9, DJ8

### DP-S34 — Assist Contributors with Context-Grounded Questions
As the pulse companion agent, I want to analyze a contributor's recent work artifacts (commits, file changes, agent threads, captured observations) and generate specific, grounded questions about their experience — so that assisted reflections produce richer signal than solo reflections and the contributor feels genuinely understood.

**Features:** DP12, DP11, DP10
**Jobs:** DJ10, DJ9, DJ8

### DP-S35 — Surface Individual Patterns to Collective Intelligence
As the pulse companion agent, I want to detect recurring themes in a single contributor's reflections and — with their explicit consent — share anonymized patterns with the observations-agent, so that individual friction points that are actually systemic issues get surfaced without compromising anyone's trust or privacy.

**Features:** DP12, DP10
**Jobs:** DJ10, DJ8

### DP-S40 — Consult the Cognitive Engineering Agent for Review Structure
As a domain DRI agent preparing a domain review, I want to consult the cognitive-engineering-agent for the appropriate template and methodology for my specific change type — so the review I produce is structured for the reviewer's actual comprehension needs rather than just listing what changed.

**Features:** DP14, DP09, DP02
**Jobs:** DJ12, DJ7

### DP-S41 — Evolve Methodology Based on Feedback Patterns
As the cognitive-engineering-agent, I want to analyze feedback signals from the observation system about which templates and structures actually helped people understand vs. which created confusion — so I can evolve the methodology based on evidence rather than assumptions about what works.

**Features:** DP14, DP10
**Jobs:** DJ12, DJ8

### DP-S42 — Advise the Pulse Companion on Information Delivery
As the cognitive-engineering-agent, I want the pulse companion to consult me when it needs to present complex information to its contributor — providing the appropriate methodology based on the information type and the contributor's cognitive patterns — so that personalized information delivery is grounded in principled methodology, not ad hoc formatting.

**Features:** DP14, DP12
**Jobs:** DJ12, DJ10

### DP-S46 — Audit Existing Workflows for Actor Effectiveness
As the operational-engineering-agent, I want to systematically analyze execution outcomes across different actor types — identifying which workflows are reliable for all actors, which have actor-specific failure points, and which need redesign — so the system's processes continuously improve based on empirical evidence rather than assumptions.

**Features:** DP15, DP10, DP03
**Jobs:** DJ13, DJ8

### DP-S47 — Advise on Agent Context Architecture
As the operational-engineering-agent, I want to analyze agent manifests and advise on context tier design — what belongs in "always" vs. "on demand" vs. "reference," how much context is optimal for different actor types and task complexities — so agent configurations are principled rather than convention-based.

**Features:** DP15, DP02
**Jobs:** DJ13, DJ7

### DP-S48 — Collaborate with Cognitive Engineering on Actor Support
As the operational-engineering-agent, I want to consult with the cognitive-engineering-agent on areas where comprehension methodology and execution methodology overlap — such as how to present workflow steps clearly (comprehension) AND how to structure them for reliable execution (operational) — so both sides of actor support are coordinated rather than designed in isolation.

**Features:** DP15, DP14
**Jobs:** DJ13, DJ12

### DP-S49 — Advise the Pulse Companion on Process Adaptation
As the operational-engineering-agent, I want the pulse companion to consult me when a contributor's working patterns suggest they need adapted process structures — and to provide the appropriate methodology based on the actor type and their observed execution patterns — so that personalized process adaptation is grounded in principled methodology, not ad hoc adjustments.

**Features:** DP15, DP12
**Jobs:** DJ13, DJ10

---

## Delivery Flow Stories

### DP-S50 — Initiate a Delivery Flow for a New Feature
As a developer, I want to initiate a structured Delivery Flow when starting a significant new feature — beginning with unfiltered discovery of the problem space — so that I capture the full scope of what needs to be solved before jumping to solutions, and no important constraints or perspectives are missed.

**Features:** DP19, DP10
**Jobs:** DJ22

### DP-S51 — Distill Raw Discovery into a Solution-Agnostic Effort Document
As a developer, I want to transform raw discovery notes into a structured effort document that describes the problem, constraints, jobs-to-be-done, and open questions without implying any particular solution — so that the effort document serves as unbiased shared context for all downstream phases and any contributor can understand what we're building and why.

**Features:** DP19, DP01
**Jobs:** DJ22, DJ24

### DP-S52 — Challenge an Effort Document with External Perspectives
As a developer, I want to deliberately expose my effort document to external perspectives (other AI agents, domain experts, competitive analysis) and evaluate each finding rigorously — so that the document improves through genuine challenge rather than confirmation bias, and the most valuable input (often the thing I didn't think to include) gets incorporated.

**Features:** DP19, DP14
**Jobs:** DJ22, DJ23

### DP-S53 — Decompose Research into Bounded Briefs with Cross-Pollination
As a developer, I want to decompose the research needs of an effort into independent, bounded briefs — each with cross-pollination directions (look beyond the immediate domain) and anti-pattern investigation — so that research goes deep rather than shallow, and architectural decisions are informed by what exists and what fails in adjacent domains, not just what I already know.

**Features:** DP19
**Jobs:** DJ23

### DP-S54 — Route New Learnings Backward to Earlier Phase Artifacts
As a developer implementing a feature, I want a clear mechanism for routing new information back to earlier phase artifacts — updating the effort document when the problem understanding changes, revising ADRs when assumptions are invalidated, adjusting the plan when sequencing needs to change — so that the effort's artifacts always reflect current understanding rather than becoming frozen and increasingly inaccurate.

**Features:** DP19, DP01, DP13
**Jobs:** DJ24, DJ22

### DP-S55 — Verify Phase Exit Criteria Before Proceeding
As a developer, I want explicit exit criteria at each phase boundary — substantive quality checks, not bureaucratic gates — so that I don't skip phases under pressure and catch problems at the phase boundary rather than discovering them during implementation.

**Features:** DP19, DP03
**Jobs:** DJ22

### DP-S56 — Reflect After Completing a Delivery Phase
As a developer, I want a lightweight reflection practice after completing each delivery phase (or the full effort) — reviewing what happened vs. what was planned, identifying surprises, and capturing process improvements — so that every effort produces both working software and compound learnings that improve future efforts.

**Features:** DP19, DP11
**Jobs:** DJ22, DJ9

### DP-S57 — Follow the Delivery Flow as an AI Agent
As an AI agent executing a significant effort autonomously, I want the Delivery Flow phases to be structured as executable steps with clear inputs, outputs, and verification criteria at each boundary — so that I can follow the same structured process as a human contributor, produce the same quality of artifacts, and route new information backward when it surfaces during later phases.

**Features:** DP19, DP03, DP15
**Jobs:** DJ22, DJ2, DJ13

### DP-S58 — Evolve the Delivery Flow Based on Observed Patterns
As a contributor who has completed a significant effort through the Delivery Flow, I want Phase 9 (Reflection) to produce atomic updates to the flow itself when patterns have been observed across multiple efforts — adding watch-for items, removing ones that never proved relevant, and tightening phase criteria where failure modes are severe — so that the Delivery Flow improves through its own principles rather than through speculative process design.

**Features:** DP19, DP11, DP10
**Jobs:** DJ21, DJ22

---

## Future Tooling Stories

### DP-S13 — Parse the Graph Programmatically
As a tooling developer, I want structured YAML frontmatter on every document so I can parse the entire knowledge graph into a data structure for visualization, validation, or automation.

**Features:** DP01, DP05
**Jobs:** DJ4

### DP-S14 — Validate Graph Integrity
As a CI system, I want to check that all cross-references are bidirectional, all IDs are unique, and all required frontmatter fields are present so I can catch graph inconsistencies before they merge.

**Features:** DP01, DP04, DP05
**Jobs:** DJ6

### DP-S15 — Generate Reports from the Graph
As a project manager, I want to generate status reports from the registry (features by status, decisions by date, open questions by domain) so I can track progress without manual aggregation.

**Features:** DP04, DP01
**Jobs:** DJ1, DJ5
