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
- `docs/product/dev-platform/features/dp16-experience-layer.md` (experience architecture)
- `docs/product/dev-platform/features/dp17-personality-layer.md` (agent personality)
- `docs/product/dev-platform/experience-layer/*` (experience layer modules)
- `docs/product/dev-platform/personality-layer/*` (personality layer modules)
- `docs/vision/experience-layer.md` (experience layer philosophy)
- `docs/vision/personality-layer.md` (personality layer philosophy)

## Reference

- `docs/product/dev-platform/features/dp10-observation-system.md`
- `docs/vision/manifesto.md`
- `docs/vision/principles.md`
- `docs/architecture/experience-layer.md`
- `docs/architecture/personality-layer.md`

## Domain State

### Current Focus

- Pulse companion being established (DP12 in `defining` status)
- Phase 1 scope: assisted reflection during `wf-reflect`
- Integration with existing reflection workflow being designed
- DP16 (Experience Layer) fully documented — 11 module deep-dives covering core loops, apprenticeship, progression, companion, social, world map, narrative, expression/crafting, anti-patterns, phasing, and feature derivation
- DP17 (Personality Layer) fully documented — 9 module deep-dives covering personality stack, design pillars, role archetypes, voice sheets, procedural engine, memory/moments, governance, implementation, and feature derivation
- Companion system design (DP16 el-companion module) informs pulse companion evolution

### Key Decisions in Effect

- Companion starts as reflection assistant (Phase 1), grows by emergence
- All companion output flows through the observation system (DP10)
- Contributor controls all data sharing and aggregation
- Solo reflection remains the default; assisted is opt-in
- Personality Layer provides the character system for companion personality (DP17 → DP12)
- Experience Layer provides the interaction framework (DP16 → DP12)

### Invariants

- The contributor always controls the interaction and their data
- Questions are grounded in actual work artifacts, never generic
- The companion never evaluates, judges, or ranks contributors
- Reflections preserve the contributor's voice and experience
- Assisted reflection never blocks or replaces solo reflection
- Personality is additive — removing it never breaks function (Design Pillar 1: Function Is Sacred)

### Open Threads

- Phase 1 minimum viable companion scope TBD
- Cross-session context persistence mechanism TBD
- Integration with different surfaces (CLI, web) TBD
- Collective signal aggregation model TBD
- Companion personality/style customization → now informed by DP17 (Personality Layer)
- Companion evolution stages (Interface → Translator → Navigator → Spirit Animal) → defined in el-companion module
- How companion system integrates with personality layer's voice sheets and archetypes

### Cross-Domain Dependencies

- Observations domain — companion produces observations, collaborates on patterns
- Cognitive-engineering domain — methodology for personalized information delivery
- All domains — companion needs enough domain context to ask specific questions
- DP11 (Reflection Loop) — companion enhances reflection practice
- DP10 (Observation System) — companion output flows through observation infrastructure
- DP16 (Experience Layer) — companion is a core subsystem of the experience architecture
- DP17 (Personality Layer) — provides procedural character system for companion voice

### Last Synced

2026-02-24
