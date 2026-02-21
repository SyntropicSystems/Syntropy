# F12 Artifact Intelligence — Context

## Always Load

- `docs/product/features/f12-artifact-intelligence.md`
- `docs/product/ux/artifact-intelligence-flow.md`

## On Demand

- `docs/product/features/f05-quick-capture.md`
- `docs/product/features/f11-domains-spaces.md`
- `docs/product/features/f07-self-learning.md`
- `docs/product/use-cases/u09-photo-to-knowledge.md`
- `docs/product/use-cases/u10-voice-memo-multi-action.md`
- `docs/architecture/ai-pipeline.md`
- `docs/architecture/data-model.md`

## Reference

- `docs/decisions/adr-003-claude-primary-llm.md`

## Domain State

### Current Focus

- F12 spec in `defining` status — extraction pipeline and linking model being specified
- Artifact intelligence UX flow (5 stages) defined
- Photo-to-knowledge (U09) and voice-memo (U10) use cases developed

### Key Decisions in Effect

- ADR-003: Claude as primary LLM (for extraction)
- "Capture once, organize everywhere" pipeline model
- Extraction is always editable — user can modify any output
- Corrections are training signals (logged as events)
- Many-to-many linking between artifacts and entities

### Invariants

- Extraction output is always editable by the user
- Every correction is logged as a training signal event
- Links are bidirectional (artifact ↔ entity)
- Confidence scores are per-extraction and per-link, not just overall
- All input modalities handled: images (OCR), PDFs (parse), voice (STT), documents (text parse)

### Open Threads

- Extraction pipeline stage design (detailed flow TBD)
- Key fact type taxonomy (measurement, cost, timeline, contact, spec, action)
- How corrections feed back into learning (F07 dependency)

### Cross-Domain Dependencies

- F05 (Quick Capture) — capture is the front door to artifact processing
- F11 (Domains/Spaces) — artifacts live in and link to spaces
- F07 (Self-Learning) — corrections feed learning system
- AI pipeline architecture (arch-ai-pipeline) constrains extraction implementation
- Data model (arch-data-model) defines Artifact Firestore structure

### Last Synced

2025-02-09
