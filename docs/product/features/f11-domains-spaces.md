---
id: "f11"
type: feature-spec
title: "Domains / Spaces (Persistent Living Contexts)"
status: defining
owner: product-agent
priority: P0
created: 2025-02-07
updated: 2025-02-07
refs:
  depends-on: [f01, f02, f06]
  enables: [u06, u07, u09]
  related: [f03, f04, f05, f12]
  informed-by: [jtbd, stories]
  ux-patterns: [ux-spaces-nav]
  architecture: [arch-data-model]
  open-questions: [oq-multi-user]
tags: [core, mvp, domains, spaces, p0]
---

# F11 — Domains / Spaces (Persistent Living Contexts)

## Summary
A Domain is a persistent, long-lived container for an entire area of a user's life. It's bigger than a project — it's the living context where projects, tasks, artifacts, reference info, and history all coexist. A Domain persists indefinitely, even when all its projects are complete. The name is flexible (Domain, Space, Area, Context — whatever feels right; the mechanism is the same).

## Jobs Addressed
- J5 — Build a Personal Knowledge & Action System (primary)
- J6 — Have Everything About a Life Domain at My Fingertips (primary)

## How It Works

**The key insight:** An epic/project is time-bound (it has a goal and ends). A Domain is permanent — "My Condo" doesn't end when the kitchen renovation is done. It's the place where everything related to the condo lives forever: measurements, contacts, documents, maintenance history, and whatever project comes next.

**The "info at your fingertips" principle:** Domains aren't just task managers — they're personal knowledge bases. When you're at Home Depot and need your kitchen counter measurement, you open your Condo domain, search "counter," and get "96" x 25.5"" instantly. When you need to call the plumber, you search "plumber" and get the number. The system becomes your external brain for each life domain.

**What a Space contains:**

- **Info (Knowledge Base):** Structured key-value information organized by category. For a condo: property details, measurements, utility accounts, contacts (contractor, plumber, property manager). Searchable, always at your fingertips. Think: "What's my kitchen counter measurement?" -> instant answer.
- **Projects:** Time-bound efforts with tasks, dependencies, budgets, deadlines. A Space can have multiple active projects and completed ones. E.g., "Kitchen Renovation" (active, 35% done) + "Move-in Setup" (completed Nov 2024).
- **Tasks / Active Cards:** Current actionable items that belong to this Space, whether part of a project or standalone. These feed into the main card queue and can be opened in Card Queue view filtered to this Space.
- **Artifacts:** Documents, photos, PDFs, notes, voice memos — anything saved. Auto-collected from emails (AI extracts attachments), manually uploaded, or captured. Tagged and searchable. E.g., floor plan PDF, cabinet mockup image, HOA approval letter.
- **History (Timeline):** The complete event-sourced history of everything that's happened in this Space. Every email, task, action, AI decision, info update — all in chronological order with actor attribution (you vs AI). Filterable by type (email, task, artifact, project, info, finance).

**How it works — UX:**

- **Spaces List:** The top-level navigation. Shows all Spaces as cards with: icon, name, description, active project count, total items, last activity time.
- **Space Detail View:** Tabbed interface within a Space:
  - **Overview** (default): Dashboard showing active cards, active projects with progress, quick info preview, and recent activity. The "at a glance" view.
  - **Info:** Full searchable knowledge base. Organized by category. User searches "counter" -> instantly finds "Kitchen counter: 96" x 25.5"". Users can add/edit info entries.
  - **Projects:** All projects (active + completed) with progress bars, task counts, budgets, deadlines. Click a project to enter the Card Queue filtered to that project's tasks.
  - **Artifacts:** Grid of all documents, photos, files. Searchable and tagged. Shows source (email, upload, photo capture, voice note) and date.
  - **History:** Full timeline of every event. Filterable by type. Shows actor (You vs AI), action, detail, and timestamp.

**Relationship to other features:**
- Spaces contain Projects/Epics (F2). A Project always belongs to a Space (or is Space-less for standalone tasks).
- Cards in the Queue (F1) can show their Space badge, just like they show Epic badges.
- Clicking "Open in Card Queue ->" from a Space filters the queue to that Space's cards.
- Gmail integration (F3): Emails can be auto-routed to a Space based on sender, subject, or AI classification. E.g., emails from the contractor auto-file into "My Condo."
- Quick Capture (F5): When capturing a note, user can assign it to a Space. AI can suggest the Space based on content.
- AI agents (F4) can be Space-aware: the "condo agent" knows about measurements, contacts, and project context when making suggestions.
- Event sourcing (F6): Space-level history is a filtered view of the global event log — events tagged with a Space ID.

**AI-powered Space features:**
- **Auto-routing:** AI classifies incoming items (emails, notes) into the correct Space.
- **Info extraction:** AI reads emails and auto-extracts info (e.g., contractor sends measurements -> AI saves to Info tab).
- **Artifact filing:** AI extracts email attachments and files them as artifacts in the right Space with auto-generated tags.
- **Cross-Space awareness:** AI can surface connections between Spaces (e.g., "Your condo insurance renewal is coming up — this affects your Finances space too").

**Naming hierarchy:**
1. **Space** — permanent life domain (My Condo, Career, Finances, Health)
2. **Project** — time-bound effort within a Space (Kitchen Renovation, Q1 Launch)
3. **Task/Card** — atomic actionable item within a Project or standalone in a Space

## Dependencies
- Requires: Task Card System (F1) for the card queue that Spaces filter into; Recursive Task Hierarchy (F2) for projects and task structure within Spaces; Event Sourcing & Audit Trail (F6) for the Space-level history timeline.
- Enables: Space as Living Reference (U6) where the Info tab and searchable knowledge base power instant lookups; AI Auto-Filing into Spaces (U7) where auto-routing and info extraction file incoming items into the right Space.

## Open Questions
- [ ] What is the maximum number of Spaces a user should have before the UX becomes unwieldy?
- [ ] Should there be a default set of suggested Spaces for new users (e.g., Home, Work, Finances, Health)?
- [ ] How do cross-Space items work — can a task or project belong to multiple Spaces?
- [ ] What is the data model for the Info knowledge base — free-form or strictly typed key-value pairs?
- [ ] How do we handle Space archiving — can a Space be archived and later restored?
- [ ] Should Spaces have shared/collaborative modes for household members or teams?
