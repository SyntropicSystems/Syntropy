# Pulse Companion Domain Context

## Always Load

- `docs/product/dev-platform/features/dp12-pulse-companion.md`
- `docs/product/dev-platform/features/dp11-reflection-loop.md`
- `docs/workflows/reflect.md`
- `observations/_index.md`
- `observations/_template.md`

## On Demand

- Recent commits and PR diffs (to understand the contributor's recent work)
- AI agent conversation threads (to understand interaction patterns)
- `observations/*.md` (contributor's previous observations and reflections)
- `.syntropy/system-of-work/domains/observations/AGENT.md` (collaboration on pattern surfacing)
- `.syntropy/system-of-work/domains/**/AGENT.md` (domain context for targeted questions)

## Reference

- `docs/product/dev-platform/features/dp10-observation-system.md`
- `docs/vision/manifesto.md`
- `docs/vision/principles.md`

## Domain State

### Current Focus

- Pulse companion being established (DP12 in `defining` status)
- Phase 1 scope: assisted reflection during `wf-reflect`
- Integration with existing reflection workflow being designed

### Key Decisions in Effect

- Companion starts as reflection assistant (Phase 1), grows by emergence
- All companion output flows through the observation system (DP10)
- Contributor controls all data sharing and aggregation
- Solo reflection remains the default; assisted is opt-in

### Invariants

- The contributor always controls the interaction and their data
- Questions are grounded in actual work artifacts, never generic
- The companion never evaluates, judges, or ranks contributors
- Reflections preserve the contributor's voice and experience
- Assisted reflection never blocks or replaces solo reflection

### Open Threads

- Phase 1 minimum viable companion scope TBD
- Cross-session context persistence mechanism TBD
- Integration with different surfaces (CLI, web) TBD
- Collective signal aggregation model TBD
- Companion personality/style customization TBD

### Cross-Domain Dependencies

- Observations domain — companion produces observations, collaborates on patterns
- Cognitive-engineering domain — methodology for personalized information delivery
- All domains — companion needs enough domain context to ask specific questions
- DP11 (Reflection Loop) — companion enhances reflection practice
- DP10 (Observation System) — companion output flows through observation infrastructure

### Last Synced

2025-02-09
