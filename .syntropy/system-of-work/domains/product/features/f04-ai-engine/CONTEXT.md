# F04 AI Engine — Context

## Always Load

- `docs/product/features/f04-ai-action-engine.md`
- `docs/product/features/f10-confidence-thresholds.md`
- `docs/architecture/ai-pipeline.md`

## On Demand

- `docs/product/features/f07-self-learning.md`
- `docs/product/use-cases/u03-ai-auto-inbox.md`
- `docs/product/use-cases/u05-end-of-day-review.md`
- `docs/product/use-cases/u08-onboarding-trust.md`
- `docs/product/ux/ai-suggestion-display.md`

## Reference

- `docs/decisions/adr-003-claude-primary-llm.md`
- `docs/open-questions/oq-privacy-model.md`

## Domain State

### Current Focus

- F04 spec in `exploring` status — needs deeper specification
- Confidence scoring model and domain agent architecture being designed
- Tightly coupled with F10 (confidence thresholds) and F07 (self-learning)

### Key Decisions in Effect

- ADR-003: Claude as primary LLM
- Domain agents are prompt + context strategies, not separate AI models
- Confidence scores are always visible to users
- Auto-execution requires both confidence threshold AND action type allowance

### Invariants

- Confidence is never hidden from the user
- Every AI action (auto or suggested) must be logged as an event (F06)
- User corrections always take precedence over AI suggestions

### Open Threads

- F04 still in `exploring` — core architecture of confidence scoring TBD
- Privacy model for AI reading external data (affects AI analysis scope)
- How domain agents specialize (prompt engineering strategies)
- Learning signal feedback loop design (F07 dependency)

### Cross-Domain Dependencies

- F10 (confidence thresholds) defines trust controls — tightly coupled
- F07 (self-learning) feeds confidence calibration
- AI pipeline architecture (arch-ai-pipeline) constrains implementation
- Privacy model (oq-privacy-model) constrains what AI can analyze
- F06 (event sourcing) provides the audit trail for all AI actions

### Last Synced

2025-02-09
