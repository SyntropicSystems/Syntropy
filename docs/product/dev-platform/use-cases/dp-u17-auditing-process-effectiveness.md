---
id: "dp-u17"
type: use-case
title: "Auditing Process Effectiveness Across Actor Types"
status: defining
owner: operational-engineering-agent
created: 2025-02-13
updated: 2025-02-13
refs:
  depends-on: [dp15, dp10]
  related: [dp-u09, dp03, dp02]
tags: [dev-platform, operational-engineering, process-audit, actor-effectiveness]
---

# Use Case: Auditing Process Effectiveness Across Actor Types

## Scenario

Several workflows and agent configurations have been in use for weeks. The operational-engineering-agent needs to assess whether they're working effectively across different actor types — identifying which processes are reliable, which have systematic failure points, and which need redesign.

## Actors

- **Operational Engineering Agent**: Conducts the audit and produces findings
- **Observations Agent**: Provides the feedback data (observations tagged with process friction)
- **Meta-Agent**: Acts on findings by improving workflows and agent configurations
- **All domain agents and contributors**: Sources of execution outcome data

## Preconditions

- Workflows and agent configurations have been in active use
- Observations have been captured (including process friction signals, execution difficulties, missed steps)
- Changelog provides a record of workflow executions and their outcomes

## Flow

1. Operational-engineering-agent initiates a process audit
2. Gathers data from multiple sources:
   - **Observations** tagged with process-related friction (from observations-agent)
   - **Execution outcomes**: Did workflows complete correctly? Where did actors struggle?
   - **Actor-type analysis**: Do certain actor types consistently fail at specific workflows?
   - **Agent effectiveness**: Are agent manifests loading the right context? Are rules being followed?
3. Analyzes patterns:
   - "The `wf-add-feature` workflow has a 90% completion rate for Opus but only 60% for Sonnet — step 7 (cross-reference update) is where Sonnet loses track"
   - "Three domain agents have context caches that load 15+ documents in 'always' — this may be degrading their performance"
   - "Rule 3 of the architecture-agent is consistently not followed — the rule may be too abstract to be actionable"
4. Produces findings with recommendations:
   - **Process redesign**: Split step 7 of `wf-add-feature` into two explicit sub-steps with a checkpoint
   - **Context architecture**: Move 5 documents from 'always' to 'on-demand' in these agent manifests
   - **Rule rewrite**: Replace abstract rule with specific, observable behavior description
5. Findings are shared with meta-agent and relevant domain agents
6. Methodology is updated based on what the audit revealed about effective process design

## Postconditions

- Systematic process effectiveness data is available (not just anecdotal)
- Specific improvement recommendations are actionable
- Methodology evolves based on empirical evidence about what works
- Actor-specific failure patterns are documented and inform future process design

## Key Quality: Empirical, Not Theoretical

The audit measures what actually happens when actors execute processes — not what should theoretically happen. A process that "should work" but doesn't is a design problem, not an actor problem.
