---
id: "ux-artifact-flow"
type: ux-pattern
title: "Artifact Intelligence Flow"
status: defining
owner: ux-agent
created: 2025-02-07
updated: 2025-02-07
refs:
  depends-on: [f12]
  related: [ux-spaces-nav]
tags: [ux, artifacts, upload, extraction, intelligence]
---

# Artifact Intelligence Flow

- **Stage 1 — Upload:** Drop zone with camera, voice, and file picker buttons. Supported formats shown. File uploads immediately to Cloud Storage; processing starts async.
- **Stage 2 — Processing:** Animated brain icon with step indicators (extracting content → identifying facts → finding connections → generating summary). ~2-5 seconds for most artifacts.
- **Stage 3 — Review:** Full-screen review UI with sections:
  - **File preview strip:** Filename, type badge, file size, overall AI confidence score.
  - **Title:** AI-generated, editable inline. Tap "Edit" to modify.
  - **Summary:** AI-generated paragraph description. Editable via textarea. User corrections tracked for learning.
  - **Extracted Facts:** List of key-value pairs, each with type badge (measurement, cost, timeline, contact, spec, action) and individual accept/reject toggle. Facts highlighted by type color.
  - **Linked To (many-to-many):** Three sections — Domains, Projects, Tasks. Each shows AI-suggested links with confidence scores as toggle chips. "+ Add" button opens picker for additional manual links. Links are bidirectional.
  - **Suggested Actions:** AI-proposed follow-ups (create task, save info entry, update timeline). Each toggleable on/off. Shows confidence per action.
  - **Save button:** "Save & Execute N Actions" commits everything. Creates artifact doc, writes links, runs accepted actions, logs events.
- **Corrections as training signal:** Every edit (title change, summary rewrite, fact rejection, link modification) is logged as a correction event for the learning engine.
