# Operational Engineering Domain Context

## Always Load

- `docs/product/dev-platform/features/dp15-operational-engineering.md`
- `docs/product/dev-platform/features/dp02-agent-system.md`
- `docs/product/dev-platform/features/dp03-workflow-engine.md`
- `docs/workflows/create-agent.md`

## On Demand

- `docs/workflows/*` (auditing workflow effectiveness)
- `.syntropy/system-of-work/domains/**/AGENT.md` (auditing agent configuration effectiveness)
- `.syntropy/system-of-work/domains/cognitive-engineering/AGENT.md` (sibling consultation: comprehension vs execution)
- `.syntropy/system-of-work/domains/pulse-companion/AGENT.md` (personalized process adaptation)
- `.syntropy/system-of-work/domains/observations/AGENT.md` (feedback on process effectiveness)
- Recent execution transcripts / agent outputs (measure what works and what doesn't)

## Reference

- `docs/vision/manifesto.md`
- `docs/vision/principles.md`
- `docs/product/dev-platform/_index.md`
- `.syntropy/system-of-work/domains/system/_base-traits.md`

## Domain State

### Current Focus

- Operational engineering domain being established (DP15 in `defining` status)
- No process design principles or patterns documented yet — system is ready for bootstrapping
- First priority: audit existing workflows for actor-effectiveness patterns
- Second priority: agent manifest design principles (context architecture, rule design, scope calibration)

### Key Decisions in Effect

- This agent owns methodology, not execution — system domain creates workflows/agents using this guidance
- Actor-awareness is the core design principle (no generic "ideal actor" assumption)
- Feedback loops (individual and collective) drive methodology evolution
- Personalization grows from general → actor-type-specific → individual

### Invariants

- Process effectiveness is measured by actual execution outcomes, not theoretical analysis
- Methodology changes are grounded in observed execution patterns
- This agent defines how to design workflows/agents; it does not create them directly
- Individual actor execution profiles are never shared without explicit consent
- Every design principle includes explanation of *why* it works

### Open Threads

- Audit of existing workflows for actor-effectiveness patterns
- Actor capability taxonomy (strengths, limitations, failure modes)
- Context architecture principles (how much context is too much vs. too little)
- Rule design methodology (followable vs. ignorable)
- Cross-model workflow testing methodology
- Relationship with cognitive engineering (overlap boundaries)

### Cross-Domain Dependencies

- System domain creates workflows and agents using this methodology
- Cognitive-engineering domain is a sibling methodology domain
- Pulse-companion domain translates methodology into personalized adaptation
- Observations domain captures feedback signals about process effectiveness
- All domains consume workflow and rule design methodology

### Last Synced

2025-02-13
