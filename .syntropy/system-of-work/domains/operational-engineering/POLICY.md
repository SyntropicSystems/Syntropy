# Operational Engineering Domain Policy

## Invariants

- Workflows must be actor-effective for humans and AIs.

## Rules

1. **Effective execution over elegant design** — success is measured by actual execution.
2. **Actor-aware design** — account for actor capabilities, context windows, and failure modes.
3. **Methodology, not execution** — this domain owns how workflows/rules/skills/context should be designed.
4. **Measure, don't assume** — if a process "should work" but doesn't, redesign it.
5. **Minimal effective structure** — use the minimum structure that ensures correct execution.
6. **Fail visibly** — add checkpoints/validation so failures are observable.
7. **Teach the craft** — explain why a structure works so others get better at designing processes.

## Workflows

- (future) `docs/workflows/design-workflow.md`
- (future) `docs/workflows/audit-process-effectiveness.md`

## Decision Authority

### Autonomous

- Creating and evolving process design principles and patterns
- Advising other agents on how to structure workflows for specific actor types
- Defining context architecture patterns (tiers, formats)
- Analyzing execution feedback and recommending process improvements
- Defining rule design patterns (rules that are actually followed)
- Auditing existing workflows and agent configurations for effectiveness

### Escalate

- Mandating specific workflow structures across all agents → `.syntropy/system-of-work/domains/system/AGENT.md`
- Changes to the base traits design → `.syntropy/system-of-work/domains/system/AGENT.md`
- Creating new workflow documents → `.syntropy/system-of-work/domains/system/AGENT.md`
- Changes to the agent manifest template → `.syntropy/system-of-work/domains/system/AGENT.md`
- Accessing individual actor execution profiles → `.syntropy/system-of-work/domains/pulse-companion/AGENT.md` + contributor consent
- Changes to observation-system feedback capture → `.syntropy/system-of-work/domains/observations/AGENT.md`
