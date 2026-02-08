---
id: "f12"
type: feature-spec
title: "Artifact Intelligence (Upload -> Extract -> Link)"
status: defining
owner: product-agent
priority: P1
created: 2025-02-07
updated: 2025-02-07
refs:
  depends-on: [f04, f06, f11]
  enables: [u09, u10]
  related: [f03, f05, f07]
  informed-by: [jtbd, stories]
  decided-by: [adr-003]
  ux-patterns: [ux-artifact-flow]
  architecture: [arch-ai-pipeline, arch-data-model]
tags: [ai, artifacts, capture, p1]
---

# F12 — Artifact Intelligence (Upload -> Extract -> Link)

## Summary
Upload anything — photos, documents, PDFs, voice memos, screenshots, receipts — and AI creates a structured, editable summary with extracted facts, then auto-routes and links it to the right domains, projects, and tasks. Artifacts can be linked to multiple entities (many-to-many).

## Jobs Addressed
- J7 — Capture Once, Organize Everywhere (primary)

## How It Works

**"Capture once, organize everywhere" principle:** The user's job is just to get the thing into the system. AI does the rest — extracts meaning, identifies facts, files it correctly, and suggests follow-up actions. The user reviews, corrects if needed, and confirms.

**1. Upload / Capture**
- Upload from: camera, file picker, voice recorder, share sheet (from other apps), drag-and-drop (web).
- Supported types: images (HEIC, JPEG, PNG), PDFs, documents (Word, Pages), voice recordings, screenshots, plain text/notes.
- Raw file stored immediately in Cloud Storage. Processing starts async.

**2. AI Extraction Pipeline**
- **Content extraction:** OCR for images/photos, speech-to-text for voice, text parsing for documents/PDFs.
- **Structured summary:** AI generates a human-readable summary of what the artifact contains. Editable by user.
- **Key facts extraction:** AI pulls out structured data — measurements, costs, dates, contacts, deadlines, specs — as typed key-value pairs. Each fact is individually accept/reject/editable.
- **Confidence scoring:** Each extraction gets a confidence score. Low-confidence items are flagged for review.

**3. Auto-Routing & Multi-Linking (many-to-many)**
- AI suggests which **domains**, **projects**, and **tasks** this artifact relates to — with confidence scores per link.
- An artifact can be linked to **N domains, N projects, N tasks** simultaneously. E.g., HOA renovation rules PDF links to Condo domain + Kitchen Renovation project + Bathroom Retile project.
- User can accept, reject, or add additional links. Can also link to entities in different domains (cross-domain).
- Links are bidirectional: artifact appears in each linked entity's Artifacts tab, and each entity appears on the artifact's detail view.

**4. Suggested Actions**
- AI proposes follow-up actions based on content: create tasks, save info entries, update project timelines.
- Each action has confidence + reasoning. User can toggle on/off before confirming.
- Actions execute on save: tasks created, info entries added, timeline events logged.

**5. User Review & Correction**
- Everything is editable: title, summary, extracted facts, links, suggested actions.
- User corrections feed the learning engine (F7): AI learns what the user considers relevant, how they name things, which domains they prefer.
- "Save & Execute" commits the artifact, creates accepted links, and runs accepted actions.

**Integration with existing features:**
- **Quick Capture (F5):** Artifact Intelligence is the processing backend for all Quick Capture inputs. Voice -> transcribe + extract. Photo -> OCR + extract. Text -> parse + structure.
- **Domains (F11):** Artifacts appear in linked domains' Artifacts tabs. Extracted info can auto-populate domain reference (Info) sections.
- **Gmail (F3):** Email attachments auto-processed through this pipeline. AI extracts attachment, runs extraction, links to email's domain/project.
- **Event Sourcing (F6):** Every extraction, link, correction, and action is event-logged for full audit trail.
- **AI Agents (F4):** Domain-specific agents add context to extraction (Home Agent knows about measurements, Finance Agent knows about invoices).

## Dependencies
- Requires: AI Action Engine (F4) for confidence scoring and domain-specific agents; Event Sourcing & Audit Trail (F6) for logging every extraction, link, and correction; Domains / Spaces (F11) for auto-routing artifacts to the correct living contexts.
- Enables: Photo to Structured Knowledge (U9) where a single photo becomes structured, linked data; Voice Memo to Multi-Action (U10) where a voice recording becomes transcribed facts, tasks, and contacts.

## Open Questions
- [ ] What is the maximum file size for artifact uploads?
- [ ] How do we handle artifacts that span multiple languages?
- [ ] What is the processing time SLA — how long should users wait for extraction?
- [ ] How do we handle extraction failures gracefully (e.g., blurry photo, inaudible voice)?
- [ ] Should artifacts support versioning (e.g., updated floor plan replaces old one)?
- [ ] What is the cost model for heavy extraction users — is there a processing budget per tier?
- [ ] How do corrections from artifact review feed back into the F7 learning system — in real-time or batched?
