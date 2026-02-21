# F12 Artifact Intelligence — Policy

Follow the Product domain policy.

## Rules

1. Extraction is always editable — user can modify title, summary, facts, links, actions.
2. Every correction is a training signal logged as an event.
3. Many-to-many linking: artifacts can link to N domains, N projects, N tasks.
4. Links are bidirectional — artifact appears in entity's Artifacts tab, entity appears on artifact.
5. Confidence scores are per-extraction and per-link, not just overall.
6. Processing must handle: images (OCR), PDFs (parse), voice (speech-to-text), documents (text parse).

## Decision Authority

### Autonomous

- Extraction pipeline stage design
- Key fact type taxonomy (measurement, cost, timeline, contact, spec, action)
- Suggested action logic
- Link confidence scoring
- Correction-to-training-signal mapping

### Escalate

- New artifact types or input modalities → `.syntropy/system-of-work/domains/product/AGENT.md`
- Changes to the many-to-many linking model → `.syntropy/system-of-work/domains/product/AGENT.md` / `.syntropy/system-of-work/domains/architecture/AGENT.md`
- AI pipeline architecture changes → `.syntropy/system-of-work/domains/architecture/AGENT.md`
