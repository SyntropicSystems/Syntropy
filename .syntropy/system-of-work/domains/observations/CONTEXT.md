# Observations Domain Context

## Always Load

- `observations/_index.md`
- `observations/_template.md`
- `docs/product/dev-platform/features/dp10-observation-system.md`
- `docs/product/dev-platform/features/dp11-reflection-loop.md`
- `docs/workflows/capture-observation.md`
- `docs/workflows/audit-observations.md`
- `docs/workflows/reflect.md`

## On Demand

- `observations/*.md` (individual observations; load during audit)
- `.syntropy/system-of-work/ROUTER.md` (routing table for domain tagging)
- `.syntropy/system-of-work/domains/**/AGENT.md` (domain mapping)
- `docs/open-questions/*.md` (when promoting observations)

## Reference

- `docs/vision/manifesto.md`
- `docs/vision/principles.md`
- `docs/product/dev-platform/_index.md`

## Domain State

### Current Focus

- Observation system being established (DP10 in `defining` status)
- Reflection loop being established (DP11 in `defining` status)
- Capture and audit workflows created
- Observation directory and templates set up

### Key Decisions in Effect

- Observations live in `observations/` at repository root
- Observation lifecycle: `raw` → `structured` → `triaged` → `promoted` | `archived`
- Type system is open and evolving (initial types)
- Zero-barrier capture: no structure required, agent will add it
- Audit cadence: at least weekly

### Invariants

- Every observation has YAML frontmatter with at minimum: id, type, title, status, created
- The capture bar is always zero — never reject an observation for being too unstructured
- Observer's voice and intent are preserved during structuring
- Promoted observations link back to source observations via refs
- Pattern observations link to the individual observations that constitute the pattern

### Open Threads

- Audit cadence to be determined by actual usage volume
- Attachment support for screenshots/logs TBD
- Upleveling metrics TBD
- Pulse companion (DP12) collaboration model — companion produces reflections, observations-agent audits them

### Cross-Domain Dependencies

- All domain agents consume observation signals tagged to their domain
- Meta-agent receives promoted observations for routing
- Cognitive-engineering-agent consumes feedback signals about methodology effectiveness
- DP09 (Domain Context Sync) — domain agents should check observations during sync

### Last Synced

2025-02-09
