---
id: "dp-u16"
type: use-case
title: "Designing an Actor-Effective Workflow"
status: defining
owner: operational-engineering-agent
created: 2025-02-13
updated: 2025-02-13
refs:
  depends-on: [dp15, dp03]
  related: [dp-u01, dp02, wf-create-agent]
tags: [dev-platform, operational-engineering, workflow-design, actor-effectiveness]
---

# Use Case: Designing an Actor-Effective Workflow

## Scenario

The meta-agent needs to create a new workflow — say, a process for decomposing a feature spec into implementation tasks. The workflow needs to work for Claude Opus doing autonomous deep work, Claude Sonnet doing quick structured execution, and a human contributor following the steps manually. Each actor has different strengths: Opus can handle ambiguity but may over-elaborate; Sonnet follows explicit structure well but may lose context in long workflows; the human may skip steps they consider obvious.

## Actors

- **Designer**: The agent (typically meta-agent) or human creating the workflow
- **Operational Engineering Agent**: Provides the methodology and design principles
- **Executors**: The different actors who will eventually follow the workflow (Opus, Sonnet, humans, etc.)

## Preconditions

- The designer knows *what* the workflow should accomplish (the goal, inputs, outputs)
- The designer doesn't yet know the *best way to structure it* for different executors

## Flow

1. Designer consults operational-engineering-agent: "I need to create a workflow for decomposing feature specs into implementation tasks"
2. Operational-engineering-agent asks clarifying questions:
   - Who will execute this? (All agents? Specific models? Humans too?)
   - What's the task complexity? (Affects scope calibration)
   - What are the failure modes? (What goes wrong if steps are skipped or misinterpreted?)
3. Operational-engineering-agent provides design guidance:
   - **Step structure**: Use explicit numbered steps with clear inputs/outputs for each; Sonnet follows these well; Opus can handle them without feeling constrained
   - **Checkpoints**: Add validation after step 3 (verify decomposition completeness) and step 5 (verify no orphan tasks) — these are the points where actors typically drift
   - **Context guidance**: The workflow needs to reference the feature spec and the architecture index, but not the full registry — that's noise for this task
   - **Scope**: Keep it to 6-8 steps; longer workflows increase context loss for all actor types
   - **Error recovery**: If the decomposition doesn't pass the completeness check, the workflow should loop back to step 2, not restart
4. Designer creates the workflow using this guidance
5. Workflow is executed by different actors; outcomes are observed
6. Feedback flows back: "Sonnet missed the dependency check in step 4" → operational-engineering-agent analyzes and recommends: "Make step 4 a two-part step: first list dependencies explicitly, then verify no circular references"

## Postconditions

- The workflow is structured for effective execution across target actor types
- Checkpoints catch common failure modes before they compound
- Feedback from execution is captured for methodology improvement

## Key Quality: Actor-Awareness

The workflow designer considers *who* will follow the steps, not just *what* the steps should be. A workflow designed only for the author's mental model will silently fail for actors with different capabilities.
