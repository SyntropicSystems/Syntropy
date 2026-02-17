<p><a target="_blank" href="https://app.eraser.io/workspace/ccxcpaHhRcmYhmAMWpQT" id="edit-in-eraser-github-link"><img alt="Edit in Eraser" src="https://firebasestorage.googleapis.com/v0/b/second-petal-295822.appspot.com/o/images%2Fgithub%2FOpen%20in%20Eraser.svg?alt=media&amp;token=968381c8-a7e7-472a-8ed6-4a6626da5501"></a></p>

---

## id: "arch-data-model"
type: architecture
title: "Data Model"
status: defining
owner: architecture-agent
created: 2025-02-07
updated: 2025-02-07
refs:
 related: [arch-event-sourcing, f01, f02, f11, f12, arch-offline, arch-security, arch-stack]
 decided-by: [adr-001, adr-002]
tags: [architecture, data-model, firestore]
# Data Model
## Firestore Collection Structure
```
users/{uid}                              -> profile, preferences, AI thresholds
users/{uid}/domains/{domainId}           -> Domain/Space (name, icon, stats)
users/{uid}/domains/{domainId}/info/{id} -> Reference info categories + key-value items
users/{uid}/projects/{projectId}         -> Projects (domainId?, status, budget, taskOrder[])
users/{uid}/tasks/{taskId}               -> Tasks/Cards (domainId?, projectId?, status, aiSuggestion)
users/{uid}/artifacts/{artifactId}       -> File metadata (domainIds[], projectIds[], taskIds[], aiExtraction, storagePath)
users/{uid}/events/{eventId}             -> Append-only event log (immutable)
users/{uid}/queue                        -> Materialized queue state (orderedTaskIds[], activeIndex)
users/{uid}/integrations/{integrationId} -> OAuth tokens (encrypted), sync state
```
### Key Design Decisions
- **Tasks are flat (not nested under projects).** `domainId`  and `projectId`  are fields on the task document. This enables cross-domain queries without collection group queries.
- **Queue is a single materialized document.** Clients read one doc instead of querying + sorting. The queue document contains `orderedTaskIds[]`  and `activeIndex` , updated by Cloud Function triggers on event writes.
- **Artifacts metadata in Firestore, actual files in Cloud Storage.** Keeps Firestore reads cheap. The `storagePath`  field links to the raw file in Cloud Storage.
- **Integration OAuth tokens stored encrypted**, decrypted only by Cloud Functions at execution time. Never exposed to client code.
## Data Model (Conceptual)
### Space
```
Space {
  id, name, icon, color, description
  info: InfoCategory[]      // structured knowledge base
  projects: ProjectId[]     // time-bound efforts
  artifacts: ArtifactId[]   // documents, photos, files
  events: Event[]           // filtered view of global log
}
```
A Space (also called Domain) is a permanent, long-lived container for an entire area of a user's life. It persists indefinitely, even when all its projects are complete. Spaces contain structured reference information, projects, artifacts, and a filtered event history.

### InfoCategory
```
InfoCategory {
  id, category: string      // "Measurements", "Contacts", etc.
  items: { label, value }[] // key-value pairs
}
```
Structured knowledge within a Space. Organized by category (e.g., "Measurements", "Contacts", "Utility Accounts"). Each category contains key-value pairs that are searchable and always accessible.

### Artifact
```
Artifact {
  id, title, type: pdf | image | note | voice | doc | screenshot
  source: upload | email | photo | capture | share_sheet
  date, tags: string[]

  // Many-to-many links (artifact -> N entities)
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
```
Artifacts support many-to-many linking: a single artifact can be linked to N domains, N projects, and N tasks simultaneously. For example, an HOA renovation rules PDF can link to the Condo domain + Kitchen Renovation project + Bathroom Retile project. Links are bidirectional -- the artifact appears in each linked entity's Artifacts tab, and each entity appears on the artifact's detail view.

### Project
```
Project {                   // formerly "Epic"
  id, title, icon, color
  spaceId?                  // belongs to a Space (or standalone)
  status: active | completed | paused
  budget?, deadline?
  tasks: TaskId[]           // ordered by dependency
}
```
A Project is a time-bound effort within a Space. It has tasks, an optional budget, an optional deadline, and completes when all tasks are done. Projects can also be standalone (no Space). The `tasks` array is ordered by dependency for display in Epic View.

### Task
```
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
```
Tasks are the atomic unit of the system. Every actionable item is a Task/Card. Tasks can belong to a Project and/or a Space, or be standalone. The `dependsOn` array creates a directed acyclic graph (DAG) of dependencies. The `creates` array defines follow-up tasks that are unlocked when this task completes.

### Event
```
Event {
  id, timestamp, actor: "user" | "ai:agent_name"
  type, taskId?, spaceId?, projectId?
  payload, confidence?, reasoning?
}
```
Events are the immutable backbone of the system. Every action is recorded as an event: `TaskCreated`, `TaskCompleted`, `ActionTaken`, `AISuggested`, `AIAutoExecuted`, `UserOverrode`, `DomainCreated`, `InfoUpdated`, `DependencyAdded`, `ConfidenceUpdated`, `UserCorrected`, etc. Events are append-only -- nothing is deleted, only appended.


<!-- eraser-additional-content -->
## Diagrams
<!-- eraser-additional-files -->
<a href="/docs/architecture/data-model-Personal Productivity System Data Model-1.eraserdiagram" data-element-id="V1h46ebj4KagY0qyMnG-4"><img src="/.eraser/ccxcpaHhRcmYhmAMWpQT___VzfZtTJ0HEPpAegCfcONCaSHI892___---diagram----f7e35851b16667b343528b78d5f279a0-Personal-Productivity-System-Data-Model.png" alt="" data-element-id="V1h46ebj4KagY0qyMnG-4" /></a>
<!-- end-eraser-additional-files -->
<!-- end-eraser-additional-content -->
<!--- Eraser file: https://app.eraser.io/workspace/ccxcpaHhRcmYhmAMWpQT --->