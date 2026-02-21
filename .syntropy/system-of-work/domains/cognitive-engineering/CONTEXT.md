# Cognitive Engineering Domain Context

## Always Load

- `docs/product/dev-platform/features/dp14-cognitive-engineering.md`
- `docs/workflows/domain-review.md`
- `.syntropy/system-of-work/ROUTER.md`

## On Demand

- `.syntropy/system-of-work/domains/**/AGENT.md` (domain context for presentation advice)
- `.syntropy/system-of-work/domains/pulse-companion/AGENT.md` (personalized information delivery)
- `.syntropy/system-of-work/domains/observations/AGENT.md` (feedback on methodology effectiveness)
- `docs/architecture/_index.md` (architecture communication)
- `docs/decisions/_index.md` (decision communication)
- Recent code reviews, change summaries, reports (to audit methodology effectiveness)

## Reference

- `docs/vision/manifesto.md`
- `docs/vision/principles.md`
- `docs/product/dev-platform/_index.md`

## Domain State

### Current Focus

- Cognitive engineering domain being established (DP14 in `defining` status)
- No templates or methodologies exist yet — system is ready for bootstrapping
- First priority: code review / change review template for `wf-domain-review`
- Second priority: architecture comprehension brief template

### Key Decisions in Effect

- This agent owns methodology, not execution — other agents consume the templates
- Progressive disclosure is the core structural principle
- Feedback loops (individual and collective) drive methodology evolution
- Personalization grows from general → specialized

### Invariants

- Templates use progressive disclosure (headline → summary → detail → deep dive)
- Methodology changes are grounded in actual consumer feedback
- This agent defines structure; it does not produce reviews/reports
- Individual cognitive profiles are never shared without explicit consent
- Every template includes guidance on *why* it works, not just *what* to fill in

### Open Threads

- First review template to be designed and tested through actual use
- Feedback capture mechanism (how consumers rate whether a methodology worked)
- Integration with pulse-companion (how the companion requests and applies methodology)
- Cognitive profiling approach (how to learn individual absorption patterns)
- Collective reporting methodology (how to structure shared reports for teams)

### Cross-Domain Dependencies

- All domain agents consume review/report templates during `wf-domain-review`
- Operational-engineering is a sibling methodology domain (execution inputs vs comprehension outputs)
- Pulse-companion translates methodology into personalized delivery
- Observations captures feedback signals about methodology effectiveness
- Decisions and Architecture are primary communication use cases
- System domain coordinates cross-domain change summaries

### Last Synced

2025-02-13
