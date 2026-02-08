# TaskCard — Product Specification

> **Vision:** A self-learning, human-AI collaborative system that removes mental overhead from life by automating personal and professional task management through intelligent agents, event sourcing, and continuous personalization.

> **Platforms:** React Native (iOS/Android) + Web (React)

---

## 1. Core Philosophy

TaskCard is built on three pillars:

**Human-AI Collaboration** — AI acts as a personal assistant, project manager, and domain-specific agent. Where confidence is high, it acts autonomously. Where confidence is low, it hands off to the human for confirmation or input. The human can always override, correct, and train the system.

**Event Sourcing & Transparency** — Every action (human or AI) is event-sourced with a full audit trail. This creates a complete ledger that enables learning, accountability, and trust. Nothing is a black box.

**Continuous Evolution** — The system learns from every interaction, refines its models, adapts to user patterns, and evolves over time. It is trainable, correctable, and personalizable.

---

## 2. Jobs to Be Done (JTBD)

### J1 — Remove Mental Overhead from Daily Life
**When** I'm overwhelmed by tasks, emails, and commitments scattered across tools, **I want** a single system that captures, organizes, and manages everything **so I can** focus on what actually requires my attention and free up cognitive space.

### J2 — Never Lose Track of Commitments
**When** someone emails me, I have an idea, or a task is mentioned in conversation, **I want** it automatically captured and tracked in a structured system **so that** nothing falls through the cracks regardless of how it originated.

### J3 — Automate Myself Where Possible
**When** there are repetitive, predictable, or low-judgment tasks (unsubscribing, filing, routine replies), **I want** an AI to learn my patterns and handle them autonomously **so that** I only spend time on things that genuinely need my attention.

### J4 — Maintain Control While Delegating to AI
**When** AI acts on my behalf, **I want** full transparency, adjustable confidence thresholds, and the ability to course-correct **so that** I trust the system and remain in control of important decisions.

### J5 — Build a Personal Knowledge & Action System
**When** I accumulate context across emails, notes, tasks, and projects, **I want** a system that connects all of it into a coherent whole **so that** I have a living map of my responsibilities, commitments, and progress.

### J6 — Have Everything About a Life Domain at My Fingertips
**When** I need to reference information about my home, my career, my finances, or any other life domain (measurements, contacts, documents, history), **I want** a single persistent place where it all lives, organized and searchable, **so that** I never have to dig through emails, files, or memory to find what I need.

### J7 — Capture Once, Organize Everywhere
**When** I take a photo, receive a document, or record a voice note, **I want** to just get it into the system and have AI extract the important information, summarize it, and file it in the right places, **so that** I spend zero time on manual data entry, transcription, or filing.

---

## 3. Features

### F1 — Task Card System (Core)
**Priority:** P0 · **Status:** Defining

The primary interface paradigm. Every actionable item is a "card" presented one at a time. Users work through cards sequentially, taking actions on each before moving to the next.

**How it works:**
- Cards are the atomic unit of the system. Everything becomes a card: emails, notes, AI-generated tasks, manual tasks, follow-ups.
- Each card shows: title, source, context/snippet, available actions, AI suggestion (with confidence), epic/project link, dependency status.
- Cards can be swiped or actioned via buttons (Reply, Archive, Approve, Delegate, Snooze, Create Project, etc.).
- Actions are contextual — different card sources surface different action sets.
- After completing a card's action, the system auto-advances to the next card.

**Card-by-Card Queue UX:**
- The main view shows one active card prominently in the center of the screen.
- A horizontal scrollable queue appears at the bottom of the screen showing all cards as compact chips.
- The currently active card is always centered/highlighted in the bottom queue.
- Completed cards remain in the queue (visually marked as done with checkmark, muted styling, strikethrough) so the user can review what they've processed.
- Tapping any card in the queue navigates to it (unless it's already completed — then it shows a read-only summary or allows re-opening).
- When a card is completed, the view animates (card slides out) and the next uncompleted card slides in.
- The queue scrolls to keep the active card centered.

**Queue Navigation:**
- Users can freely jump between cards by tapping the queue chips.
- A progress indicator (X/Y completed + progress ring) is always visible in the top bar.
- Blocked cards (those with unresolved dependencies) show a "blocked" indicator and cannot have their primary action taken until dependencies clear.

### F2 — Recursive Task Hierarchy (Epics / Projects / Sub-tasks)
**Priority:** P0 · **Status:** Defining

Any task can become a parent to other tasks, creating a recursive tree/graph structure. The naming is flexible (epic, project, parent task — it's all the same mechanism).

**How it works:**
- Any card can be promoted to a parent/epic by adding sub-tasks to it.
- Sub-tasks can have their own sub-tasks (recursive depth is unlimited).
- Tasks can also have dependency relationships (task B depends on task A completing).
- This forms a directed acyclic graph (DAG) of tasks, not just a flat list.
- An epic/project can be created from an email, a note, or manually.

**Epic Queue Drill-Down:**
- Each card can display its parent epic as a clickable badge.
- Clicking the epic badge switches the queue to "Epic View" — only cards belonging to that epic are shown in the bottom queue.
- In Epic View, cards are sorted by dependency order: unblocked first, blocked later.
- An Epic Header bar appears at the top showing: epic name, icon, progress (X/Y done), and count of blocked tasks.
- A "← Back to Queue" button exits Epic View and returns to the full priority queue, remembering where the user left off.
- The dependency graph is visible: cards show if they are blocked (with indicator showing blocker count) or if completing them unlocks follow-up tasks.

### F3 — Gmail / Google Workspace Integration
**Priority:** P0 · **Status:** Defining

The first and primary integration. Connect Gmail so every email becomes a task card with intelligent action suggestions.

**How it works:**
- OAuth connection to Gmail/Google Workspace.
- Each email becomes a task card with metadata: sender, subject, snippet, thread context, attachments.
- Standard actions are always available: Reply, Archive, Snooze, Delete, Mark Read, Unsubscribe.
- AI generates additional contextual actions based on email content (e.g., "Create project from this thread," "Schedule meeting with sender," "Forward to [person]").
- Email threads are linked — replying to one card in a thread can update related cards.
- Cards derived from email preserve the source reference and can link back to the original in Gmail.

**Email-to-Project Workflow:**
- From any email card, the user can create a project/epic.
- The email becomes the root context for the project.
- AI can suggest sub-tasks based on the email content.
- Future emails in the same thread auto-link to the project.
- Actions taken on the project propagate context back to email (e.g., "Draft reply with project status update").

### F4 — AI Action Engine
**Priority:** P0 · **Status:** Exploring

The intelligence layer that analyzes every card and either suggests or auto-executes actions based on confidence scoring.

**How it works:**
- Every card is analyzed by the AI engine which determines: likely intent, best action, confidence level.
- **High confidence (>90%):** AI auto-executes the action (e.g., auto-archive a known newsletter). User is notified post-facto via the audit trail.
- **Medium confidence (60-90%):** AI suggests the action prominently on the card with a "⚡ AI Suggestion" badge and confidence meter. User confirms with one tap.
- **Low confidence (<60%):** Card is presented without a strong suggestion. AI may offer multiple options ranked by likelihood.
- Users can adjust confidence thresholds globally and per-action-type.

**AI Roles/Agents:**
- **Personal Assistant:** Scheduling, reminders, follow-ups, routine email management.
- **Project Manager:** Task prioritization, dependency tracking, deadline management, status rollups.
- **Domain Agents:** Specialized agents for specific contexts (e.g., financial emails get a "finance agent" that understands invoices, bills, subscriptions).

**Confidence-Based Handoff:**
- The confidence meter is always visible on cards with AI suggestions.
- Users can see *why* the AI chose an action (explainability).
- Every AI action (auto or suggested) is logged in the audit trail.
- User corrections feed back into the learning system to improve future confidence calibration.

### F5 — Quick Capture (Notes → Tasks)
**Priority:** P1 · **Status:** Defining

Rapidly create notes from any input modality that can be converted to structured tasks.

**How it works:**
- **Voice:** Tap-to-record voice memo. AI transcribes and extracts action items.
- **Voice Memo:** Longer-form audio recording. AI summarizes and creates structured tasks from the content.
- **Text:** Quick text input. AI can parse natural language into structured task fields.
- **Photo:** Capture a whiteboard, document, or receipt. AI extracts text (OCR) and creates tasks.
- **Multimodal:** Combine any of the above. E.g., take a photo of a whiteboard and add a voice annotation.
- Notes are first-class objects that exist independently but can be converted to tasks.
- Conversion can be: one note → one task, one note → multiple tasks, or note → project with sub-tasks.
- AI suggests how to structure the note into tasks but the user has final say.

### F12 — Artifact Intelligence (Upload → Extract → Link)
**Priority:** P1 · **Status:** Defining

Upload anything — photos, documents, PDFs, voice memos, screenshots, receipts — and AI creates a structured, editable summary with extracted facts, then auto-routes and links it to the right domains, projects, and tasks. Artifacts can be linked to **multiple** entities (many-to-many).

**"Capture once, organize everywhere" principle:** The user's job is just to get the thing into the system. AI does the rest — extracts meaning, identifies facts, files it correctly, and suggests follow-up actions. The user reviews, corrects if needed, and confirms.

**How it works:**

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
- **Quick Capture (F5):** Artifact Intelligence is the processing backend for all Quick Capture inputs. Voice → transcribe + extract. Photo → OCR + extract. Text → parse + structure.
- **Domains (F11):** Artifacts appear in linked domains' Artifacts tabs. Extracted info can auto-populate domain reference (Info) sections.
- **Gmail (F3):** Email attachments auto-processed through this pipeline. AI extracts attachment, runs extraction, links to email's domain/project.
- **Event Sourcing (F6):** Every extraction, link, correction, and action is event-logged for full audit trail.
- **AI Agents (F4):** Domain-specific agents add context to extraction (Home Agent knows about measurements, Finance Agent knows about invoices).

### F6 — Event Sourcing & Audit Trail
**Priority:** P0 · **Status:** Defining

Every single event in the system is recorded immutably, creating a complete history.

**How it works:**
- Every action is an event: task created, task completed, AI suggested action, AI auto-executed, user overrode AI, email archived, project created, etc.
- Events are immutable — nothing is deleted, only appended.
- The audit trail is browsable: filter by date, by task, by epic, by action type, by actor (human vs AI).
- Events are the foundation for the learning system — patterns are extracted from the event log.
- Events are the foundation for accountability — any AI action can be traced, reviewed, and used as training signal.
- The ledger can be exported for analysis.

### F7 — Self-Learning System
**Priority:** P1 · **Status:** Exploring

The system continuously learns from user behavior, corrections, and preferences to improve over time.

**How it works:**
- Every user correction (accepting, rejecting, or modifying an AI suggestion) is a training signal.
- Patterns are identified: "User always archives emails from this sender," "User always creates projects from emails with attachments over 5 participants."
- Confidence calibration improves: if the AI is 80% confident but the user rejects 50% of the time, the model recalibrates.
- User can explicitly train: "Always do X when you see Y" rules.
- User can review what the system has learned and delete/modify learned behaviors.
- Personalization profiles evolve: communication style, priority weightings, scheduling preferences, project management style.

### F8 — Cross-Platform (React Native + Web)
**Priority:** P0 · **Status:** Defining

Mobile-first design with a full web experience.

**How it works:**
- React Native for iOS and Android — optimized for card-swiping, voice capture, and quick actions.
- React web app for desktop — optimized for longer project review, queue management, and bulk actions.
- Shared core logic (state management, API layer, AI interaction) across platforms.
- Platform-specific UX adaptations: swipe gestures on mobile, keyboard shortcuts on web, responsive queue layout.
- Offline-first: cards and actions queue locally and sync when connectivity returns.

### F9 — Follow-Up Task Creation & Dependency Resolution
**Priority:** P1 · **Status:** Defining

When a task is completed, the system can automatically create or surface follow-up tasks based on the dependency graph.

**How it works:**
- Tasks can declare what follow-up tasks they "create" when completed (defined in the dependency graph).
- When a task is completed, any dependent tasks that are now unblocked are surfaced in the queue.
- AI can also suggest follow-up tasks based on the context of what was just completed (e.g., after replying to an email, suggest "Follow up in 3 days if no response").
- If a task is completed and there are no remaining follow-up tasks in the queue, the user is prompted: "Create a follow-up?" with a quick-add form.
- In Epic View, when all tasks are done, the user sees a completion screen with options to add follow-ups or return to the main queue.

### F10 — Confidence Thresholds & Trust Controls
**Priority:** P0 · **Status:** Defining

User-configurable controls for how much autonomy the AI has.

**How it works:**
- Global confidence threshold: "Auto-act above X% confidence."
- Per-action thresholds: "Auto-archive above 95%, but never auto-reply above 0% (always ask me)."
- Per-source thresholds: "Auto-manage newsletters at 80%, but require confirmation for emails from contacts."
- The user can ratchet autonomy up or down over time as trust builds.
- A "training mode" where the AI suggests but never auto-acts, useful for onboarding.
- An "audit mode" where the user reviews all AI actions from the past day/week.

### F11 — Domains / Spaces (Persistent Living Contexts)
**Priority:** P0 · **Status:** Defining

A Domain is a persistent, long-lived container for an entire area of a user's life. It's bigger than a project — it's the living context where projects, tasks, artifacts, reference info, and history all coexist. A Domain persists indefinitely, even when all its projects are complete. The name is flexible (Domain, Space, Area, Context — whatever feels right; the mechanism is the same).

**The key insight:** An epic/project is time-bound (it has a goal and ends). A Domain is permanent — "My Condo" doesn't end when the kitchen renovation is done. It's the place where everything related to the condo lives forever: measurements, contacts, documents, maintenance history, and whatever project comes next.

**The "info at your fingertips" principle:** Domains aren't just task managers — they're personal knowledge bases. When you're at Home Depot and need your kitchen counter measurement, you open your Condo domain, search "counter," and get "96\" × 25.5\"" instantly. When you need to call the plumber, you search "plumber" and get the number. The system becomes your external brain for each life domain.

**What a Space contains:**

- **Info (Knowledge Base):** Structured key-value information organized by category. For a condo: property details, measurements, utility accounts, contacts (contractor, plumber, property manager). Searchable, always at your fingertips. Think: "What's my kitchen counter measurement?" → instant answer.
- **Projects:** Time-bound efforts with tasks, dependencies, budgets, deadlines. A Space can have multiple active projects and completed ones. E.g., "Kitchen Renovation" (active, 35% done) + "Move-in Setup" (completed Nov 2024).
- **Tasks / Active Cards:** Current actionable items that belong to this Space, whether part of a project or standalone. These feed into the main card queue and can be opened in Card Queue view filtered to this Space.
- **Artifacts:** Documents, photos, PDFs, notes, voice memos — anything saved. Auto-collected from emails (AI extracts attachments), manually uploaded, or captured. Tagged and searchable. E.g., floor plan PDF, cabinet mockup image, HOA approval letter.
- **History (Timeline):** The complete event-sourced history of everything that's happened in this Space. Every email, task, action, AI decision, info update — all in chronological order with actor attribution (you vs AI). Filterable by type (email, task, artifact, project, info, finance).

**How it works — UX:**

- **Spaces List:** The top-level navigation. Shows all Spaces as cards with: icon, name, description, active project count, total items, last activity time.
- **Space Detail View:** Tabbed interface within a Space:
  - **Overview** (default): Dashboard showing active cards, active projects with progress, quick info preview, and recent activity. The "at a glance" view.
  - **Info:** Full searchable knowledge base. Organized by category. User searches "counter" → instantly finds "Kitchen counter: 96\" × 25.5\"". Users can add/edit info entries.
  - **Projects:** All projects (active + completed) with progress bars, task counts, budgets, deadlines. Click a project to enter the Card Queue filtered to that project's tasks.
  - **Artifacts:** Grid of all documents, photos, files. Searchable and tagged. Shows source (email, upload, photo capture, voice note) and date.
  - **History:** Full timeline of every event. Filterable by type. Shows actor (You vs AI), action, detail, and timestamp.

**Relationship to other features:**
- Spaces contain Projects/Epics (F2). A Project always belongs to a Space (or is Space-less for standalone tasks).
- Cards in the Queue (F1) can show their Space badge, just like they show Epic badges.
- Clicking "Open in Card Queue →" from a Space filters the queue to that Space's cards.
- Gmail integration (F3): Emails can be auto-routed to a Space based on sender, subject, or AI classification. E.g., emails from the contractor auto-file into "My Condo."
- Quick Capture (F5): When capturing a note, user can assign it to a Space. AI can suggest the Space based on content.
- AI agents (F4) can be Space-aware: the "condo agent" knows about measurements, contacts, and project context when making suggestions.
- Event sourcing (F6): Space-level history is a filtered view of the global event log — events tagged with a Space ID.

**AI-powered Space features:**
- **Auto-routing:** AI classifies incoming items (emails, notes) into the correct Space.
- **Info extraction:** AI reads emails and auto-extracts info (e.g., contractor sends measurements → AI saves to Info tab).
- **Artifact filing:** AI extracts email attachments and files them as artifacts in the right Space with auto-generated tags.
- **Cross-Space awareness:** AI can surface connections between Spaces (e.g., "Your condo insurance renewal is coming up — this affects your Finances space too").

**Naming hierarchy:**
1. **Space** — permanent life domain (My Condo, Career, Finances, Health)
2. **Project** — time-bound effort within a Space (Kitchen Renovation, Q1 Launch)
3. **Task/Card** — atomic actionable item within a Project or standalone in a Space

---

## 4. Use Cases

### U1 — Email Triage (Daily Driver)
User opens TaskCard in the morning. Their inbox has been pre-processed: newsletters auto-archived, routine emails auto-categorized, important emails surfaced as cards. They swipe through 15 cards in 5 minutes: approve a design, reply to a proposal, snooze a bill until payday, create a project from a complex thread. AI handled 30 other emails silently overnight.

### U2 — Voice Capture on the Go
User is walking and has an idea. They tap the capture button, record: "Need to compare the walnut vs white oak cabinets Mike sent. Budget around 8k. Also remind me to call the plumber about the leak." AI transcribes, creates two tasks: "Compare cabinet options" (linked to Home Renovation epic) and "Call plumber about leak" (standalone, high priority).

### U3 — AI Auto-Managing Inbox
Over time, the AI learns: this sender is always archived, these emails always become tasks, this type of newsletter is read on Sundays. It begins auto-executing: archiving, categorizing, drafting replies for routine patterns. The user's morning triage goes from 50 cards to 8 — only the ones that genuinely need human judgment.

### U4 — Project Overview & Epic Drill-Down
User clicks an epic badge on a card: "Q1 Product Launch." The queue switches to show only launch tasks: 4 completed, 2 in progress, 3 blocked. They can see the dependency chain: design approval → staging deploy → launch announcement. They approve the design, which unblocks staging, which the AI auto-assigns to the dev lead.

### U5 — End-of-Day Review
User opens the audit trail. Sees: AI auto-archived 12 newsletters, auto-replied to 3 routine requests, created 2 follow-up tasks, escalated 1 email for human review. User notices one auto-reply was slightly off — they correct it, and the AI learns for next time.

### U6 — Space as Living Reference
User is at Home Depot buying bathroom tile. Needs to know the exact vanity dimensions. Opens TaskCard → Spaces → My Condo → Info tab → searches "vanity" → finds "36\" wide, 21\" deep" instantly. Also checks the Artifacts tab for the bathroom floor plan photo they saved last month. Buys the right tile, no guesswork.

### U7 — AI Auto-Filing into Spaces
User receives an email from their contractor Mike about cabinet delivery dates. AI recognizes: sender is in "My Condo" contacts, subject mentions kitchen → auto-routes the email card into the Condo space, links it to the Kitchen Renovation project, and extracts the delivery date into a new task: "Receive kitchen cabinets — March 12."

### U8 — Onboarding & Trust Building
New user connects Gmail. System starts in "training mode" — AI suggests but never auto-acts. Over the first week, user accepts/rejects suggestions. By week 2, the AI's suggestions are 85% aligned. User enables auto-archive for newsletters. By month 2, user enables auto-reply for routine patterns. Trust ratchets up organically.

### U9 — Photo to Structured Knowledge
User at a tile showroom takes a photo of 4 tile samples with price tags. Opens TaskCard → Add Artifact → snaps photo. AI processes: extracts each tile name, price per sq ft, and material. Presents structured summary: "Bathroom Tile Samples — 4 options from TileBar SF." Key facts: "Arctic Matte $4.50/sqft, Fog $5.20/sqft, ..." User accepts, AI auto-links to Condo domain + Bathroom Retile project + suggests creating task "Decide on bathroom tile color." All from one photo.

### U10 — Voice Memo to Multi-Action
User finishes a phone call with contractor. Records 47-second voice memo summarizing the call. AI transcribes, extracts: 3 dates (cabinet delivery, demolition start, plumbing rough-in), a deadline (choose hardware by Friday), and a phone number. Creates structured note with 5 key facts, suggests 2 tasks and a contact save. User corrects one date, accepts everything else, taps "Save & Execute 3 Actions." Done in 30 seconds.

---

## 5. User Stories

### S1 — Email → Task Cards
As a busy professional, I want my emails automatically categorized into actionable task cards so I spend less time triaging my inbox and more time on meaningful work.

### S2 — Voice → Structured Tasks
As a user on the go, I want to capture thoughts via voice and have them become structured, properly categorized tasks without manual effort.

### S3 — AI Suggestions per Card
As a user, I want to see AI-suggested actions on each task card with a confidence indicator so I can make decisions faster with less cognitive load.

### S4 — Trust the AI to Auto-Act
As a user, I want to trust the AI to handle routine tasks autonomously while escalating important or uncertain decisions to me, with full transparency.

### S5 — Audit Trail for Accountability
As a user, I want a complete audit trail of all actions (mine and AI's) so I can review behavior, correct mistakes, and build trust over time.

### S6 — Card-by-Card Queue
As a user, I want to work through tasks one card at a time with a visible queue so I maintain focus on the current task while seeing what's ahead.

### S7 — Epic Context Switching
As a user, I want to drill down into an epic from any card and see only that project's tasks in dependency order so I can focus on project-specific work.

### S8 — Follow-Up Task Creation
As a user, I want the system to automatically surface or create follow-up tasks when I complete something so nothing falls through the cracks.

### S9 — Cross-Platform Continuity
As a user, I want to start triaging on mobile and continue on desktop (or vice versa) with the same queue state, so my workflow isn't platform-dependent.

### S10 — Teach the System
As a user, I want to explicitly correct and train the AI so it gets better at predicting my actions and preferences over time.

### S11 — Space as Living Context
As a homeowner, I want a single place where all condo-related info, projects, documents, contacts, and history lives so I can find anything about my home instantly without searching across emails and files.

### S12 — Quick Info Lookup
As a user at a hardware store, I want to search my condo's measurements and specs from my phone so I can make purchasing decisions without going home to check.

### S13 — Auto-Routing to Spaces
As a user, I want emails and notes automatically filed into the right Space so I don't have to manually organize everything — the system knows that an email from my contractor belongs in "My Condo."

### S14 — Space History
As a user, I want a complete timeline of everything that's happened in a Space (emails, tasks, AI actions, info updates) so I have a full record and can trace back any decision or event.

### S15 — Upload & Auto-Extract
As a user, I want to upload any file (photo, PDF, voice memo) and have AI automatically generate a structured summary with extracted facts (measurements, costs, dates, contacts) that I can review, correct, and save — so I never have to manually transcribe information.

### S16 — Artifact Multi-Linking
As a user, I want a single artifact to be linked to multiple domains, projects, and tasks simultaneously (e.g., HOA rules PDF linked to both Kitchen Renovation and Bathroom Retile) so information lives wherever it's relevant, not just in one place.

---

## 6. UX Patterns & Design Decisions

### Card Queue Layout
- **Main area:** Single active card displayed prominently, vertically centered.
- **Bottom queue:** Horizontal scrollable strip of card chips. Active card is visually highlighted (gold border) and auto-centered.
- **Done cards:** Remain in queue with muted styling (darker, strikethrough, checkmark). Tapping a done card shows a read-only summary.
- **Progress:** Top-right progress ring (completed/total) with fraction text.

### Epic Drill-Down Flow
1. User sees epic badge on a card (e.g., "🚀 Q1 Product Launch").
2. Taps badge → queue transitions to Epic View.
3. Epic Header appears below top bar: icon, title, progress, blocked count.
4. Bottom queue shows only epic's cards, sorted by dependency order.
5. Cards show dependency status (blocked indicator with blocker count).
6. "← Back to Queue" button in header returns to full priority queue.

### AI Suggestion Display
- Yellow-accented card section below the task description.
- Shows: "AI Suggestion" label, recommended action text, confidence meter (bar + percentage).
- Confidence color coding: green (>80%), yellow (60-80%), orange (<60%).
- High confidence actions (>90%) show "would auto-execute" label.
- The suggested action is visually emphasized in the action button row (highlighted border, ⚡ icon).

### Follow-Up Task Flow
- When all epic tasks are done → completion screen with "Add Follow-Up" button.
- Inline "Create follow-up task" button below the active card.
- Quick-add form: title input, auto-inherits epic context, minimal friction.
- AI-created follow-ups show source: "⚡ AI Created" with explanation.

### Dependency Visualization
- Blocked cards show orange "Blocked by X tasks" banner.
- Completing a card that unblocks others shows a brief notification: "Unlocked 2 tasks."
- Follow-up tasks created by dependency resolution animate into the queue.

### Spaces Navigation
- **Spaces List:** Top-level screen. Cards with icon, name, description, active project count, last activity. Staggered entrance animation.
- **Space Detail:** Tabbed view (Overview, Info, Projects, Artifacts, History). Back button returns to list.
- **Overview Tab:** Dashboard layout — active cards section (with "Open in Card Queue →"), active projects with progress bars, quick info preview (first 2 categories, 3 items each), recent activity (last 4 events).
- **Info Tab:** Searchable knowledge base. Categories as section headers. Key-value pairs in alternating row styling. Matching results highlighted with gold border when searching. Add entry button at bottom.
- **Projects Tab:** Active projects first, completed below (dimmed). Each shows: icon, title, budget, deadline, progress bar, task counts, blocked count.
- **Artifacts Tab:** 2-column grid of artifact chips. Each shows: type icon, title, source icon, date, tags. Shows link count badge (e.g., "linked to 2 projects"). Searchable.
- **History Tab:** Vertical timeline with dot indicators. Each event shows: actor (You in white, AI in gold), action, detail, timestamp, type badge (color-coded). Filterable by type.
- **Navigation Flow:** Spaces → Space Detail → Project → Card Queue (filtered). Breadcrumb trail maintained.

### Artifact Intelligence Flow
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

---

## 7. Architecture — Firebase

### Stack
- **Client:** React Native (Expo) for iOS/Android + React (Vite) for Web. Shared TypeScript business logic package.
- **Backend:** Firebase — Cloud Firestore (database), Cloud Functions (serverless logic), Cloud Storage (files), Firebase Auth, FCM (push notifications).
- **AI:** Claude API (primary LLM), with OpenAI fallback. Orchestrated via Cloud Functions + Pub/Sub.
- **Search:** Algolia or Typesense (full-text search across domains, tasks, artifacts).
- **Analytics/Training:** Firestore → BigQuery export for AI training data and usage analytics.

### Why Firebase
Firebase gives us: real-time sync across devices (Firestore listeners), built-in offline persistence (critical for mobile), serverless backend (Cloud Functions — no servers to manage), integrated auth with Google OAuth (needed for Gmail), and a generous free tier for development. The document model maps naturally to our Domain → Project → Task hierarchy.

### Event Sourcing on Firestore
- All state is derived from an append-only event log stored in `users/{uid}/events/`.
- **Security Rules enforce immutability** — events can be created but never updated or deleted, even by the user.
- Events: `TaskCreated`, `TaskCompleted`, `ActionTaken`, `AISuggested`, `AIAutoExecuted`, `UserOverrode`, `DomainCreated`, `InfoUpdated`, `DependencyAdded`, `ConfidenceUpdated`, `UserCorrected`, etc.
- **Materialized views** (queue order, project progress, domain stats) are separate documents updated by Cloud Function triggers on event writes.
- Historical state can be reconstructed at any point by replaying the event log.

### Firestore Collection Structure
```
users/{uid}                              → profile, preferences, AI thresholds
users/{uid}/domains/{domainId}           → Domain/Space (name, icon, stats)
users/{uid}/domains/{domainId}/info/{id} → Reference info categories + key-value items
users/{uid}/projects/{projectId}         → Projects (domainId?, status, budget, taskOrder[])
users/{uid}/tasks/{taskId}               → Tasks/Cards (domainId?, projectId?, status, aiSuggestion)
users/{uid}/artifacts/{artifactId}       → File metadata (domainIds[], projectIds[], taskIds[], aiExtraction, storagePath)
users/{uid}/events/{eventId}             → Append-only event log (immutable)
users/{uid}/queue                        → Materialized queue state (orderedTaskIds[], activeIndex)
users/{uid}/integrations/{integrationId} → OAuth tokens (encrypted), sync state
```

**Key design decisions:**
- Tasks are flat (not nested under projects). `domainId` and `projectId` are fields. Enables cross-domain queries.
- Queue is a single materialized document. Clients read one doc instead of querying + sorting.
- Artifacts metadata in Firestore, actual files in Cloud Storage. Keeps reads cheap.
- Integration OAuth tokens stored encrypted, decrypted only by Cloud Functions at execution time.

### AI Pipeline
- **Orchestrator:** Cloud Functions + Pub/Sub. Events trigger pipeline stages (ingest → analyze → decide → execute → learn).
- **LLM calls:** Claude API via Cloud Functions. Structured output (JSON mode) for reliable parsing. Prompt templates per task type.
- **Domain Agents:** Specialized prompt + context strategies per domain (Email Agent, Finance Agent, Home Agent, Calendar Agent, Meta Agent for routing).
- **Artifact Intelligence pipeline:** Upload triggers Cloud Function → content extraction (OCR / speech-to-text / text parse) → LLM analysis (summary, key facts, type classification, confidence scoring) → auto-routing (suggest domains, projects, tasks via embedding similarity + rule matching) → present for user review. Corrections feed learning.
- **Learning loop:** User corrections stored as `{ suggested, userChose, context }`. Per-user preference model adjusts confidence scoring over time. BigQuery aggregation for model fine-tuning.
- **Cost control:** Rate limiting per user, prompt caching, token usage tracking. ~$0.02–0.10 per card in LLM costs. Artifact processing slightly higher (~$0.05–0.15) due to longer content extraction.

### Offline Strategy
- Firestore's built-in offline persistence caches all read data locally.
- Write actions queue locally, sync when connectivity returns.
- Optimistic UI: act immediately, sync in background.
- AI features degrade gracefully: cached suggestions shown offline, new ones deferred.
- Conflict resolution: last-write-wins for simple fields, merge for arrays.

### Data Model (Conceptual)
```
Space {
  id, name, icon, color, description
  info: InfoCategory[]      // structured knowledge base
  projects: ProjectId[]     // time-bound efforts
  artifacts: ArtifactId[]   // documents, photos, files
  events: Event[]           // filtered view of global log
}

InfoCategory {
  id, category: string      // "Measurements", "Contacts", etc.
  items: { label, value }[] // key-value pairs
}

Artifact {
  id, title, type: pdf | image | note | voice | doc | screenshot
  source: upload | email | photo | capture | share_sheet
  date, tags: string[]

  // Many-to-many links (artifact → N entities)
  domainIds: DomainId[]        // linked to multiple domains
  projectIds: ProjectId[]      // linked to multiple projects
  taskIds: TaskId[]            // linked to multiple tasks

  // AI extraction
  aiExtraction?: {
    summary: string            // AI-generated description (editable)
    keyFacts: [{               // structured data extracted
      label, value, type: measurement | cost | timeline | contact | spec | action
      accepted: boolean        // user confirmed or rejected
    }]
    confidence: number         // overall extraction confidence
    suggestedActions: [{       // follow-up actions AI proposes
      action: string, confidence: number, executed: boolean
    }]
  }
  userEdits?: {                // tracks user corrections for learning
    titleEdited, summaryEdited, factsModified: number
  }

  // Storage
  storagePath: string          // Cloud Storage path to raw file
  downloadURL: string
  thumbnailURL?: string
  sourceRef?                   // link to original email/capture
}

Project {                   // formerly "Epic"
  id, title, icon, color
  spaceId?                  // belongs to a Space (or standalone)
  status: active | completed | paused
  budget?, deadline?
  tasks: TaskId[]           // ordered by dependency
}

Task {
  id, title, description, source, sourceRef
  status: pending | in_progress | done | snoozed | archived
  priority, projectId?, spaceId?
  actions: Action[]
  aiSuggestion?: { action, confidence, reasoning }
  dependsOn: TaskId[]
  creates: TaskId[]         // follow-up tasks unlocked on completion
  events: Event[]           // full history
}

Event {
  id, timestamp, actor: "user" | "ai:agent_name"
  type, taskId?, spaceId?, projectId?
  payload, confidence?, reasoning?
}
```

---

## 8. Integration Roadmap

| Phase | Integration | What It Enables |
|-------|------------|----------------|
| **Phase 1** | Gmail / Google Workspace | Email → cards, reply, archive, project creation |
| **Phase 2** | Google Calendar | Schedule-aware prioritization, meeting prep cards |
| **Phase 3** | Slack / Teams | Messages → cards, channel monitoring, auto-responses |
| **Phase 4** | GitHub / Linear | Issues → cards, PR reviews, deployment tasks |
| **Phase 5** | Financial (Plaid, etc.) | Bills → cards, budget tracking, payment reminders |
| **Phase 6** | Home / IoT | Maintenance reminders, smart home actions |

---

## 9. Open Questions

- **Privacy:** How do we handle AI reading email content? On-device processing vs. cloud? User data ownership model?
- **Conflict resolution:** What happens when AI auto-acts but the user would have chosen differently? Undo mechanisms?
- **Multi-user:** Is this always single-user, or could teams share epics/projects?
- **Monetization:** Subscription model? Tiered by AI capabilities? Free tier with manual-only?
- **AI model:** Proprietary fine-tuned model, or orchestration of existing LLMs (GPT, Claude) with custom logic?
- **Offline behavior:** How much AI capability works offline? Queue-and-sync model for actions?
- **Notification strategy:** How does the system alert the user to things that need attention without creating more noise?

---

## 10. Glossary

| Term | Definition |
|------|-----------|
| **Card** | The atomic unit of the system. Any actionable item presented as a card in the queue. |
| **Queue** | The ordered list of cards the user works through. Can be filtered by domain or project. |
| **Domain / Space** | A permanent, persistent container for an entire life area (My Condo, Career, Finances). Contains projects, tasks, reference info, artifacts, and a full event history. |
| **Project** | A time-bound effort within a Domain. Has tasks, a budget, a deadline, and completes when all tasks are done. Replaces "Epic" in earlier terminology. |
| **Dependency** | A relationship where Task B cannot be actioned until Task A is complete. |
| **Confidence** | AI's self-assessed probability that its suggested action is correct (0-100%). |
| **Threshold** | User-configurable confidence level above which AI auto-executes without asking. |
| **Event** | An immutable record of any action taken in the system. Append-only in Firestore. |
| **Audit Trail** | The browsable, filterable log of all events. |
| **Agent** | A specialized AI prompt + context strategy for a specific domain (Email Agent, Finance Agent, Home Agent). |
| **Quick Capture** | The multimodal input system (voice, text, photo) for rapid task creation. |
| **Materialized View** | A precomputed document (e.g., queue order, project stats) derived from the event log by Cloud Functions. |

---

*Last updated: February 7, 2025*
*Status: Active specification — continuously evolving*
