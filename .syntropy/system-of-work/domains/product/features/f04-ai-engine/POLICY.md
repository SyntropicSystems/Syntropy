# F04 AI Engine — Policy

Follow the Product domain policy and the Architecture domain constraints.

## Rules

1. Confidence scores must always be visible to the user — never hide AI uncertainty.
2. Auto-execution requires: confidence above threshold AND action type allows auto-execution.
3. Every AI action (auto or suggested) must be logged as an event (F06).
4. Domain agents are specialized prompt + context strategies, not separate AI models.
5. User corrections always take precedence over AI suggestions.

## Decision Authority

### Autonomous

- AI behavior specification within confidence framework
- Domain agent prompt strategy design
- Suggestion display and ranking logic
- Learning signal definitions

### Escalate

- Changes to the confidence model fundamentals → `.syntropy/system-of-work/domains/product/AGENT.md` / human
- New domain agent creation → `.syntropy/system-of-work/domains/product/AGENT.md`
- Privacy-impacting AI behaviors → `.syntropy/system-of-work/domains/architecture/AGENT.md` (via `oq-privacy-model`)
