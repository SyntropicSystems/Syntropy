/*
---
id: "proto-architecture-explorer"
type: prototype
title: "Architecture Explorer"
status: active
owner: ux-agent
created: 2025-02-07
updated: 2026-02-23
refs:
  related: [dp07]
tags: [prototype]
---
*/

import { useState } from "react";

// ─── Architecture Data ───────────────────────────────────────────────────────

const LAYERS = [
  {
    id: "client",
    label: "Client Layer",
    color: "#5BBD72",
    desc: "React Native (iOS/Android) + React Web — shared business logic",
    blocks: [
      {
        id: "rn-app",
        name: "React Native App",
        tech: "Expo + React Native",
        desc: "iOS & Android. Shared codebase with platform-specific UI where needed. Expo for build pipeline, OTA updates, push notification handling.",
        details: [
          "Expo Router for navigation (file-based routing)",
          "React Native Reanimated for card animations & gestures",
          "Expo Speech / expo-av for voice capture",
          "Expo Camera for photo capture → task creation",
          "Expo SecureStore for auth tokens",
          "React Native Firebase SDK for Firestore, Auth, Storage, Messaging",
        ],
      },
      {
        id: "web-app",
        name: "Web App",
        tech: "React + Vite",
        desc: "Full web experience. Same component logic, web-optimized UI. PWA-capable for installable desktop experience.",
        details: [
          "Vite for fast dev/build",
          "React Router for navigation",
          "Framer Motion for animations",
          "Firebase JS SDK (modular v9+ for tree-shaking)",
          "Web Speech API for voice capture",
          "Service Worker for offline + PWA install",
        ],
      },
      {
        id: "shared-logic",
        name: "Shared Business Logic",
        tech: "TypeScript package",
        desc: "Core logic shared between mobile and web: state management, event sourcing projections, queue ordering, AI confidence evaluation, domain/project/task models.",
        details: [
          "Zustand for state management (lightweight, works in RN + web)",
          "Shared TypeScript types for Domain, Project, Task, Event, Artifact",
          "Queue ordering algorithm (priority × urgency × dependency resolution)",
          "Confidence threshold evaluation logic",
          "Event → materialized state projection functions",
          "Offline action queue (pending actions synced when online)",
        ],
      },
      {
        id: "offline",
        name: "Offline Engine",
        tech: "Firestore persistence + local queue",
        desc: "Firestore's built-in offline persistence caches all read data locally. Write actions queue locally and sync when connectivity returns. AI features degrade gracefully — cached suggestions shown, new ones deferred.",
        details: [
          "Firestore enablePersistence() — automatic offline cache",
          "Local action queue for writes (task complete, status change, info edit)",
          "Optimistic UI updates — act immediately, sync in background",
          "Conflict resolution: last-write-wins for simple fields, merge for arrays",
          "AI suggestions cached per task — shown offline, refreshed online",
          "Offline indicator in UI — subtle, non-blocking",
        ],
      },
    ],
  },
  {
    id: "firebase",
    label: "Firebase Platform",
    color: "#E8B931",
    desc: "Core backend infrastructure — auth, database, storage, functions, messaging",
    blocks: [
      {
        id: "auth",
        name: "Firebase Auth",
        tech: "Authentication",
        desc: "Google OAuth (required for Gmail integration), Apple Sign-In (required for iOS App Store). Email/password as fallback. Auth state drives all security rules.",
        details: [
          "Google OAuth → gives us Gmail API scopes in the same flow",
          "Apple Sign-In → required for iOS App Store submission",
          "Auth tokens used in Security Rules for per-user data isolation",
          "Custom claims for feature flags (e.g., AI tier, beta features)",
          "Session management across devices (web + mobile)",
        ],
      },
      {
        id: "firestore",
        name: "Cloud Firestore",
        tech: "Primary Database",
        desc: "Document database for all user data. Hierarchical collection structure maps naturally to our Domain → Project → Task model. Real-time listeners power live UI updates.",
        details: [
          "Real-time listeners for live queue updates across devices",
          "Subcollection model: users/{uid}/domains/{id}/...",
          "Composite indexes for queue ordering queries",
          "Security Rules enforce per-user isolation + event immutability",
          "Batch writes for atomic multi-document operations",
          "TTL policies for expired snooze/archive cleanup",
        ],
      },
      {
        id: "storage",
        name: "Cloud Storage",
        tech: "File Storage",
        desc: "Binary storage for all artifacts: PDFs, images, voice memos, documents. Organized by user/domain/artifact path. Integrated with Firestore metadata docs.",
        details: [
          "Path structure: users/{uid}/artifacts/{artifactId}/{filename}",
          "Upload from: camera capture, file picker, email attachment extraction",
          "Thumbnail generation via Cloud Function on upload",
          "Download URLs stored in Firestore artifact metadata",
          "Security Rules: users can only access their own files",
          "Lifecycle policies: compress old files, warn on storage limits",
        ],
      },
      {
        id: "functions",
        name: "Cloud Functions",
        tech: "Serverless Backend (Node.js / TypeScript)",
        desc: "The brain of the system. Firestore triggers, scheduled jobs, HTTP endpoints for integrations, and the AI orchestration pipeline. All backend logic lives here.",
        details: [
          "Firestore triggers: onWrite to events → update materialized views",
          "Firestore triggers: onWrite to tasks → run AI suggestion pipeline",
          "HTTP functions: Gmail webhook receiver, OAuth callback handlers",
          "Scheduled: daily digest, recurring task generation, stale task cleanup",
          "Pub/Sub consumers: async AI processing queue",
          "Callable functions: explicit user actions (bulk operations, exports)",
        ],
      },
      {
        id: "fcm",
        name: "Cloud Messaging (FCM)",
        tech: "Push Notifications",
        desc: "Smart notifications — not just alerts, but AI-prioritized nudges. 'You have 3 high-priority cards' not '47 new items.' Respects focus modes and quiet hours.",
        details: [
          "Topic-based: subscribe to domain-specific notifications",
          "Data messages for silent background sync triggers",
          "Notification channels (Android) / categories (iOS) for priority levels",
          "AI-driven batching: group low-priority into daily digest",
          "User preferences: per-domain notification settings, quiet hours",
          "Scheduled via Cloud Functions (morning briefing, end-of-day summary)",
        ],
      },
      {
        id: "extensions",
        name: "Firebase Extensions",
        tech: "Managed Add-ons",
        desc: "Pre-built extensions for common needs. Full-text search (Algolia/Typesense), image resizing, email sending. Reduces custom code.",
        details: [
          "Algolia or Typesense for full-text search across domains, tasks, artifacts",
          "Resize Images extension for artifact thumbnails",
          "Firestore → BigQuery export for analytics and AI training data",
          "Potential: Stripe extension for subscription billing",
        ],
      },
    ],
  },
  {
    id: "ai",
    label: "AI Layer",
    color: "#7A5AF5",
    desc: "Intelligence pipeline — ingestion, analysis, decision, execution, learning",
    blocks: [
      {
        id: "ai-orchestrator",
        name: "AI Orchestrator",
        tech: "Cloud Functions + Pub/Sub",
        desc: "Central coordinator for AI pipeline. Receives events (new email, new task, user action), routes to appropriate AI agent, manages async processing queue.",
        details: [
          "Pub/Sub topic per pipeline stage (ingest, analyze, decide, execute)",
          "Dead letter queue for failed AI calls (retry with backoff)",
          "Rate limiting per user to control API costs",
          "Pipeline state tracked in Firestore (processing → complete → delivered)",
          "Parallel processing: multiple tasks can be analyzed simultaneously",
          "Circuit breaker: falls back gracefully if AI API is down",
        ],
      },
      {
        id: "llm-integration",
        name: "LLM Integration",
        tech: "Claude API / OpenAI API",
        desc: "Primary intelligence engine. Structured prompts for: email classification, action suggestion, confidence scoring, follow-up generation, info extraction, domain routing.",
        details: [
          "Claude API (primary) — strong at structured reasoning, tool use",
          "Fallback to OpenAI GPT-4o if Claude is unavailable",
          "Prompt templates per task type (email triage, task suggestion, info extraction)",
          "Structured output (JSON mode) for reliable parsing",
          "Context window management: include relevant domain info, user history",
          "Token usage tracking per user for cost management",
        ],
      },
      {
        id: "ai-agents",
        name: "Domain Agents",
        tech: "Specialized AI Roles",
        desc: "Each AI 'agent' is a prompt template + context strategy specialized for a domain. Email Agent knows email conventions. Finance Agent knows invoices. Home Agent knows maintenance patterns.",
        details: [
          "Email Agent: classify, suggest reply/archive/forward, extract tasks",
          "Finance Agent: detect bills, parse amounts, suggest payments",
          "Home Agent: maintenance schedules, contractor communication",
          "Calendar Agent: scheduling conflicts, meeting prep, time blocking",
          "Meta Agent: route incoming items to the right domain + agent",
          "User can create custom agents with their own instructions",
        ],
      },
      {
        id: "learning",
        name: "Learning Engine",
        tech: "Firestore + BigQuery + Fine-tuning",
        desc: "Continuous improvement loop. Every user correction (override, undo, explicit feedback) becomes a training signal. System adapts confidence scoring and action suggestions over time.",
        details: [
          "Correction events stored: { suggested, userChose, context }",
          "Per-user preference model: tracks patterns in user decisions",
          "Confidence calibration: adjusts scoring based on historical accuracy",
          "BigQuery pipeline: aggregate correction data for model fine-tuning",
          "A/B testing framework: compare suggestion strategies",
          "Privacy-preserving: learning data anonymized before any aggregation",
        ],
      },
    ],
  },
  {
    id: "integrations",
    label: "Integration Layer",
    color: "#4A9BD9",
    desc: "External service connections — Gmail, Calendar, future integrations",
    blocks: [
      {
        id: "gmail",
        name: "Gmail Integration",
        tech: "Gmail API + Pub/Sub Push",
        desc: "Core integration. OAuth grants read/send scopes. Gmail push notifications (via Cloud Pub/Sub) deliver new emails in real-time. Cloud Functions process them into cards.",
        details: [
          "OAuth 2.0 scopes: gmail.readonly, gmail.send, gmail.modify",
          "Gmail watch() + Cloud Pub/Sub for real-time push (no polling)",
          "History ID tracking for incremental sync (only new messages)",
          "Email → Card pipeline: parse, classify, extract actions, suggest response",
          "Thread tracking: link cards to email threads for context",
          "Action execution: send reply, archive, label — via Gmail API from Cloud Functions",
        ],
      },
      {
        id: "calendar",
        name: "Google Calendar",
        tech: "Calendar API (Phase 2)",
        desc: "Schedule-aware prioritization. Cards know about your calendar — 'You have a meeting in 30 min, here's the prep card.' Time blocking for deep work on project tasks.",
        details: [
          "Calendar API for read/write access to events",
          "Push notifications for event changes",
          "Meeting prep card generation (attendees, agenda, action items)",
          "Time-aware queue ordering: urgent cards surface before meetings",
          "Time blocking: schedule focus time for project work",
          "Conflict detection: warn when task deadlines overlap commitments",
        ],
      },
      {
        id: "future-integrations",
        name: "Future Integrations",
        tech: "Slack, GitHub, Plaid, IoT",
        desc: "Integration framework designed to be extensible. Each integration follows the same pattern: authenticate → watch for events → ingest → create cards → execute actions.",
        details: [
          "Slack: messages → cards, channel monitoring, auto-responses",
          "GitHub/Linear: issues → cards, PR reviews, deploy notifications",
          "Plaid: bank transactions → bill cards, budget tracking",
          "Smart Home: maintenance reminders, sensor-triggered tasks",
          "Generic webhook: user-defined integrations via IFTTT/Zapier pattern",
          "Each integration is a Cloud Function module (plug-in architecture)",
        ],
      },
    ],
  },
];

const FIRESTORE_SCHEMA = [
  {
    path: "users/{uid}",
    desc: "User profile, preferences, AI thresholds",
    fields: "displayName, email, photoURL, preferences: { globalThreshold, quietHours, notificationSettings }, createdAt, lastActiveAt",
  },
  {
    path: "users/{uid}/domains/{domainId}",
    desc: "Domain / Space — persistent life context",
    fields: "name, icon, color, description, createdAt, updatedAt, stats: { activeProjects, openTasks, totalArtifacts }",
  },
  {
    path: "users/{uid}/domains/{domainId}/info/{categoryId}",
    desc: "Reference info categories (Measurements, Contacts, etc.)",
    fields: "category, sortOrder, items: [{ label, value, updatedAt }]",
  },
  {
    path: "users/{uid}/projects/{projectId}",
    desc: "Time-bound project within a domain",
    fields: "title, icon, color, domainId?, status, budget?, deadline?, taskOrder: [], createdAt, updatedAt",
  },
  {
    path: "users/{uid}/tasks/{taskId}",
    desc: "Individual task / card — the atomic unit",
    fields: "title, description, source, sourceRef, status, priority, domainId?, projectId?, dependsOn: [], creates: [], aiSuggestion?: { action, confidence, reasoning, agentId }, createdAt, updatedAt",
  },
  {
    path: "users/{uid}/artifacts/{artifactId}",
    desc: "File metadata + AI extraction. Many-to-many links to domains, projects, tasks.",
    fields: "title, type, source, domainIds: [], projectIds: [], taskIds: [], tags: [], storagePath, downloadURL, thumbnailURL?, aiExtraction?: { summary, keyFacts: [{ label, value, type, accepted }], confidence, suggestedActions: [{ action, confidence, executed }] }, userEdits?: { titleEdited, summaryEdited, factsModified }, createdAt",
  },
  {
    path: "users/{uid}/events/{eventId}",
    desc: "Append-only event log (immutable via Security Rules)",
    fields: "timestamp, actor, type, domainId?, projectId?, taskId?, payload: {}, confidence?, reasoning?",
  },
  {
    path: "users/{uid}/queue",
    desc: "Materialized queue state (single doc, updated by Cloud Function)",
    fields: "orderedTaskIds: [], lastComputed, activeCardIndex, filters: { domainId?, projectId? }",
  },
  {
    path: "users/{uid}/integrations/{integrationId}",
    desc: "OAuth tokens & sync state for connected services",
    fields: "provider, accessToken (encrypted), refreshToken (encrypted), scopes: [], lastSyncAt, historyId? (Gmail), watchExpiry?",
  },
];

const DATA_FLOWS = [
  {
    id: "email-to-card",
    name: "Email → Card",
    color: "#4A9BD9",
    steps: [
      { label: "Gmail Push", detail: "New email arrives → Gmail Pub/Sub → Cloud Function triggered" },
      { label: "Ingest", detail: "Cloud Function fetches email via Gmail API, extracts: subject, sender, body, attachments" },
      { label: "AI Classify", detail: "LLM analyzes email → determines: domain, urgency, suggested action, confidence score" },
      { label: "Create Card", detail: "Write Task doc to Firestore with AI suggestion. Extract attachments → Cloud Storage → Artifact docs" },
      { label: "Route", detail: "Assign to Domain (auto or AI-suggested). Link to Project if context matches. Update queue materialization" },
      { label: "Notify", detail: "If high priority: push notification. Otherwise: appears in queue on next open" },
    ],
  },
  {
    id: "voice-to-task",
    name: "Voice → Task",
    color: "#5BBD72",
    steps: [
      { label: "Capture", detail: "User taps mic → records audio → Expo Speech / Web Speech API → raw audio + transcript" },
      { label: "Upload", detail: "Audio file → Cloud Storage. Transcript → Cloud Function" },
      { label: "AI Parse", detail: "LLM extracts: task title, context, urgency, domain hint, any measurements or info to save" },
      { label: "Create", detail: "Task doc created in Firestore. If info detected (measurement, contact), also write to Domain info subcollection" },
      { label: "Confirm", detail: "Card appears in queue. User can edit/correct. Corrections feed learning engine" },
    ],
  },
  {
    id: "event-sourcing",
    name: "Event → State",
    color: "#E8B931",
    steps: [
      { label: "Action", detail: "User or AI performs action (complete task, archive email, update info, create project)" },
      { label: "Write Event", detail: "Append Event doc to events subcollection (immutable — security rules block update/delete)" },
      { label: "Trigger", detail: "Firestore onWrite trigger fires Cloud Function" },
      { label: "Project", detail: "Cloud Function reads event → updates materialized views (task status, project progress, domain stats, queue order)" },
      { label: "Sync", detail: "Firestore real-time listeners push updated state to all connected clients instantly" },
    ],
  },
  {
    id: "ai-auto-act",
    name: "AI Auto-Execute",
    color: "#7A5AF5",
    steps: [
      { label: "Evaluate", detail: "AI suggestion confidence exceeds user's threshold (e.g., 92% > 90% threshold)" },
      { label: "Execute", detail: "Cloud Function performs action: send email reply, archive, create follow-up, update info" },
      { label: "Log", detail: "Event written: { type: 'AIAutoExecuted', actor: 'ai:email-agent', confidence: 0.92, reasoning: '...' }" },
      { label: "Notify", detail: "User sees 'AI handled this' badge on card. Can undo within grace period (30s for emails, 5min for others)" },
      { label: "Learn", detail: "If user undoes → correction event logged → confidence recalibrated for similar future actions" },
    ],
  },
  {
    id: "artifact-intelligence",
    name: "Artifact → Knowledge",
    color: "#D94A6B",
    steps: [
      { label: "Upload", detail: "User captures (camera, voice, file picker, share sheet) → raw file uploads to Cloud Storage immediately" },
      { label: "Extract Content", detail: "Cloud Function triggered → OCR for images, speech-to-text for voice, text parsing for PDFs/docs" },
      { label: "AI Analyze", detail: "LLM processes extracted content → generates: title, structured summary, key facts (typed: measurement, cost, date, contact, spec), confidence scores" },
      { label: "Auto-Route", detail: "AI suggests many-to-many links: which domains, projects, and tasks this relates to — using content similarity + user's existing domain structure" },
      { label: "Suggest Actions", detail: "AI proposes follow-ups: create tasks, save info entries to domain reference, update project timelines. Each with confidence score" },
      { label: "User Review", detail: "User sees full extraction review: edit title/summary, accept/reject individual facts, toggle links, toggle actions. Every correction is a learning signal" },
      { label: "Save & Execute", detail: "Artifact doc created with links. Accepted actions fire: tasks created, info entries saved, events logged. Links are bidirectional — artifact appears in all linked entities" },
    ],
  },
];

const SECURITY_RULES = `rules_version = '2';
service cloud.firestore {
  match /databases/{db}/documents {

    // Users can only access their own data
    match /users/{uid}/{document=**} {
      allow read, write: if request.auth != null
                         && request.auth.uid == uid;
    }

    // Events are APPEND-ONLY (no update, no delete)
    match /users/{uid}/events/{eventId} {
      allow create: if request.auth.uid == uid;
      allow read: if request.auth.uid == uid;
      allow update, delete: if false;
    }
  }
}`;

const COST_ESTIMATES = [
  { service: "Firestore", free: "50K reads, 20K writes/day", paid: "~$0.036/100K reads", note: "Majority of cost. Optimize with listener management & caching" },
  { service: "Cloud Functions", free: "2M invocations/month", paid: "~$0.40/million", note: "AI pipeline is the main consumer. Batch where possible" },
  { service: "Cloud Storage", free: "5 GB", paid: "$0.026/GB/month", note: "Artifact storage. Most users <1GB" },
  { service: "Firebase Auth", free: "Unlimited (email/Google)", paid: "Free for basic providers", note: "No cost concern" },
  { service: "Claude API", free: "—", paid: "~$3/1M input tokens", note: "Primary cost driver. Cache prompts, minimize context. ~$0.02-0.10/card" },
  { service: "Algolia Search", free: "10K records", paid: "$1/1K records/month", note: "Full-text search across domains. Alternative: Typesense (self-hosted, cheaper)" },
];

// ─── Components ──────────────────────────────────────────────────────────────

function TabBar({ tabs, active, onChange, accentColor }) {
  return (
    <div style={{ display: "flex", gap: 2, borderBottom: "1px solid #1E2128", padding: "0 20px", overflowX: "auto", scrollbarWidth: "none" }}>
      {tabs.map(tab => (
        <button key={tab.id} onClick={() => onChange(tab.id)} style={{
          background: "transparent", border: "none",
          borderBottom: `2px solid ${tab.id === active ? accentColor : "transparent"}`,
          padding: "10px 16px", cursor: "pointer", fontFamily: "inherit",
          color: tab.id === active ? accentColor : "#5A6A7A",
          fontSize: 12, fontWeight: tab.id === active ? 600 : 400,
          transition: "all 0.2s", whiteSpace: "nowrap",
        }}>
          {tab.label}
        </button>
      ))}
    </div>
  );
}

function BlockCard({ block, color, isOpen, onToggle }) {
  return (
    <div style={{
      background: "#1A1D23", borderRadius: 12, border: `1px solid ${isOpen ? color + "44" : "#22252B"}`,
      overflow: "hidden", transition: "all 0.2s",
    }}>
      <button onClick={onToggle} style={{
        width: "100%", background: "transparent", border: "none",
        padding: "14px 18px", cursor: "pointer", fontFamily: "inherit",
        textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "flex-start",
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0 }} />
            <span style={{ fontSize: 14, fontWeight: 600, color: "#E8E6E1" }}>{block.name}</span>
          </div>
          <div style={{ fontSize: 11, color, fontFamily: "'JetBrains Mono', monospace", marginBottom: 4, marginLeft: 16 }}>{block.tech}</div>
          <div style={{ fontSize: 12, color: "#6A7A8A", lineHeight: 1.5, marginLeft: 16 }}>{block.desc}</div>
        </div>
        <span style={{ color: "#3A4A5A", fontSize: 11, flexShrink: 0, marginLeft: 12, transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
      </button>
      {isOpen && (
        <div style={{ padding: "0 18px 16px 34px", borderTop: "1px solid #1E2128" }}>
          <div style={{ paddingTop: 12 }}>
            {block.details.map((d, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" }}>
                <span style={{ color: color + "88", fontSize: 8, marginTop: 5, flexShrink: 0 }}>●</span>
                <span style={{ fontSize: 12, color: "#9AA0A8", lineHeight: 1.5 }}>{d}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function LayerSection({ layer, openBlocks, toggleBlock }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        <div style={{ width: 3, height: 20, borderRadius: 2, background: layer.color }} />
        <h2 style={{ fontSize: 16, fontWeight: 700, color: layer.color, margin: 0, letterSpacing: "-0.01em" }}>{layer.label}</h2>
      </div>
      <p style={{ fontSize: 12, color: "#5A6A7A", margin: "0 0 12px 13px", lineHeight: 1.5 }}>{layer.desc}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {layer.blocks.map(block => (
          <BlockCard key={block.id} block={block} color={layer.color} isOpen={openBlocks.has(block.id)} onToggle={() => toggleBlock(block.id)} />
        ))}
      </div>
    </div>
  );
}

function FlowDiagram({ flow }) {
  return (
    <div style={{ background: "#1A1D23", borderRadius: 12, border: "1px solid #22252B", padding: "18px 20px", marginBottom: 10 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: flow.color }} />
        <span style={{ fontSize: 14, fontWeight: 600, color: "#E8E6E1" }}>{flow.name}</span>
      </div>
      <div style={{ position: "relative", paddingLeft: 16 }}>
        <div style={{ position: "absolute", left: 5, top: 4, bottom: 4, width: 1.5, background: `${flow.color}33` }} />
        {flow.steps.map((step, i) => (
          <div key={i} style={{ display: "flex", gap: 14, marginBottom: i < flow.steps.length - 1 ? 14 : 0, position: "relative" }}>
            <div style={{
              width: 11, height: 11, borderRadius: "50%", flexShrink: 0,
              background: "#12141A", border: `2px solid ${flow.color}`,
              marginTop: 2, position: "relative", zIndex: 1,
            }} />
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: flow.color, marginBottom: 2 }}>
                {i + 1}. {step.label}
              </div>
              <div style={{ fontSize: 12, color: "#7A8A9A", lineHeight: 1.5 }}>{step.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SchemaRow({ item, isOpen, onToggle }) {
  return (
    <div style={{ background: "#1A1D23", borderRadius: 10, border: "1px solid #22252B", overflow: "hidden", marginBottom: 6 }}>
      <button onClick={onToggle} style={{
        width: "100%", background: "transparent", border: "none", padding: "12px 16px",
        cursor: "pointer", fontFamily: "inherit", textAlign: "left",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div>
          <code style={{ fontSize: 13, color: "#E8B931", fontFamily: "'JetBrains Mono', monospace" }}>{item.path}</code>
          <div style={{ fontSize: 11, color: "#5A6A7A", marginTop: 3 }}>{item.desc}</div>
        </div>
        <span style={{ color: "#3A4A5A", fontSize: 10, transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
      </button>
      {isOpen && (
        <div style={{ padding: "0 16px 14px", borderTop: "1px solid #1E2128" }}>
          <code style={{ fontSize: 11, color: "#7A8A9A", fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.8, display: "block", paddingTop: 10, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {item.fields}
          </code>
        </div>
      )}
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────

const TABS = [
  { id: "overview", label: "Building Blocks" },
  { id: "firestore", label: "Firestore Schema" },
  { id: "flows", label: "Data Flows" },
  { id: "security", label: "Security Rules" },
  { id: "costs", label: "Cost Model" },
];

export default function ArchitectureExplorer() {
  const [activeTab, setActiveTab] = useState("overview");
  const [openBlocks, setOpenBlocks] = useState(new Set(["firestore", "functions", "ai-orchestrator"]));
  const [openSchemas, setOpenSchemas] = useState(new Set(["users/{uid}/tasks/{taskId}", "users/{uid}/events/{eventId}"]));

  const toggleBlock = (id) => {
    setOpenBlocks(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };
  const toggleSchema = (path) => {
    setOpenSchemas(prev => { const n = new Set(prev); n.has(path) ? n.delete(path) : n.add(path); return n; });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#12141A", fontFamily: "'DM Sans', sans-serif", color: "#E8E6E1" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ padding: "20px 20px 0" }}>
        <div style={{ fontSize: 10, color: "#4A5A6A", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, marginBottom: 4 }}>TaskCard</div>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 4px", letterSpacing: "-0.02em" }}>System Architecture</h1>
        <p style={{ fontSize: 13, color: "#5A6A7A", margin: 0, lineHeight: 1.5 }}>Firebase-based architecture — all building blocks, data flows, and infrastructure</p>

        {/* Stack summary */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 14, marginBottom: 4 }}>
          {[
            { label: "React Native + Expo", color: "#5BBD72" },
            { label: "React + Vite", color: "#5BBD72" },
            { label: "Cloud Firestore", color: "#E8B931" },
            { label: "Cloud Functions", color: "#E8B931" },
            { label: "Claude API", color: "#7A5AF5" },
            { label: "Gmail API", color: "#4A9BD9" },
          ].map(t => (
            <span key={t.label} style={{
              fontSize: 10, color: t.color, background: `${t.color}12`,
              padding: "4px 10px", borderRadius: 6, fontWeight: 500,
              border: `1px solid ${t.color}22`,
            }}>{t.label}</span>
          ))}
        </div>
      </div>

      <TabBar tabs={TABS} active={activeTab} onChange={setActiveTab} accentColor="#E8B931" />

      <div style={{ padding: "20px 20px 40px", maxWidth: 720, margin: "0 auto" }}>
        {/* Building Blocks */}
        {activeTab === "overview" && (
          <div>
            {/* Visual stack diagram */}
            <div style={{ marginBottom: 28, padding: "20px 16px", background: "#1A1D23", borderRadius: 14, border: "1px solid #22252B" }}>
              <div style={{ fontSize: 11, color: "#4A5A6A", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14, textAlign: "center" }}>Stack Overview</div>
              {LAYERS.map((layer, i) => (
                <div key={layer.id}>
                  <div style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "10px 14px", background: `${layer.color}08`,
                    border: `1px solid ${layer.color}22`, borderRadius: 8,
                  }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: layer.color, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: layer.color }}>{layer.label}</span>
                      <span style={{ fontSize: 11, color: "#4A5A6A", marginLeft: 10 }}>
                        {layer.blocks.map(b => b.name).join(" · ")}
                      </span>
                    </div>
                  </div>
                  {i < LAYERS.length - 1 && (
                    <div style={{ textAlign: "center", padding: "3px 0", color: "#2A2D35", fontSize: 10 }}>↕</div>
                  )}
                </div>
              ))}
            </div>

            {/* Expandable blocks per layer */}
            {LAYERS.map(layer => (
              <LayerSection key={layer.id} layer={layer} openBlocks={openBlocks} toggleBlock={toggleBlock} />
            ))}
          </div>
        )}

        {/* Firestore Schema */}
        {activeTab === "firestore" && (
          <div>
            <div style={{ fontSize: 12, color: "#6A7A8A", lineHeight: 1.6, marginBottom: 20 }}>
              All user data lives under <code style={{ color: "#E8B931", fontFamily: "'JetBrains Mono', monospace" }}>users/{"{uid}"}</code>. 
              Subcollections for domains, projects, tasks, artifacts, and events. The event log is append-only — security rules block updates and deletes. 
              Materialized views (queue, stats) are computed by Cloud Functions on event writes.
            </div>
            {FIRESTORE_SCHEMA.map(item => (
              <SchemaRow key={item.path} item={item} isOpen={openSchemas.has(item.path)} onToggle={() => toggleSchema(item.path)} />
            ))}

            {/* Key design decisions */}
            <div style={{ marginTop: 24, padding: "16px 18px", background: "#1A1D23", borderRadius: 12, border: "1px solid #22252B" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#E8E6E1", marginBottom: 10 }}>Key Design Decisions</div>
              {[
                ["Flat tasks collection", "Tasks live at users/{uid}/tasks, NOT nested under projects. domainId and projectId are fields. This allows cross-domain queries and avoids collection group complexity."],
                ["Events are immutable", "Security rules enforce append-only. No update, no delete. This is the core of event sourcing — the audit trail is tamper-proof."],
                ["Materialized queue", "The queue is a single document with an ordered array of task IDs. Recomputed by Cloud Functions whenever events change task state. Clients read one doc instead of querying+sorting."],
                ["Artifacts metadata in Firestore", "Actual files live in Cloud Storage. Firestore holds metadata (title, tags, downloadURL). This keeps Firestore reads cheap and enables full-text search via Algolia."],
                ["Integration tokens encrypted", "OAuth tokens stored encrypted at rest. Cloud Functions decrypt on use. Refresh tokens rotated proactively."],
              ].map(([title, desc], i) => (
                <div key={i} style={{ marginBottom: i < 4 ? 12 : 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#E8B931", marginBottom: 2 }}>{title}</div>
                  <div style={{ fontSize: 12, color: "#6A7A8A", lineHeight: 1.5 }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Data Flows */}
        {activeTab === "flows" && (
          <div>
            <div style={{ fontSize: 12, color: "#6A7A8A", lineHeight: 1.6, marginBottom: 20 }}>
              Core data flows showing how information moves through the system — from external events to user-facing cards.
            </div>
            {DATA_FLOWS.map(flow => (
              <FlowDiagram key={flow.id} flow={flow} />
            ))}
          </div>
        )}

        {/* Security Rules */}
        {activeTab === "security" && (
          <div>
            <div style={{ fontSize: 12, color: "#6A7A8A", lineHeight: 1.6, marginBottom: 20 }}>
              Firestore Security Rules enforce two critical invariants: per-user data isolation (users can only access their own data) and event immutability (events cannot be updated or deleted).
            </div>
            <div style={{
              background: "#1A1D23", borderRadius: 12, border: "1px solid #22252B",
              padding: "18px 20px", overflow: "auto",
            }}>
              <pre style={{
                fontSize: 12, color: "#B8C8D8", fontFamily: "'JetBrains Mono', monospace",
                lineHeight: 1.7, margin: 0, whiteSpace: "pre-wrap",
              }}>
                {SECURITY_RULES}
              </pre>
            </div>

            <div style={{ marginTop: 24, padding: "16px 18px", background: "#1A1D23", borderRadius: 12, border: "1px solid #22252B" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#E8E6E1", marginBottom: 10 }}>Security Principles</div>
              {[
                ["Per-user isolation", "Every document lives under users/{uid}. Security rules guarantee a user can never read or write another user's data. No shared collections."],
                ["Event immutability", "The events subcollection is append-only. Once written, events cannot be modified or deleted — even by the user. This preserves the audit trail and enables reliable state reconstruction."],
                ["Cloud Functions as trusted backend", "Cloud Functions run with admin credentials and bypass security rules. All AI actions, integration syncs, and materialized view updates happen server-side with full access."],
                ["OAuth token handling", "Integration tokens (Gmail, Calendar) are stored encrypted and only decrypted by Cloud Functions at execution time. Never sent to the client."],
                ["Rate limiting", "Cloud Functions enforce per-user rate limits on AI pipeline calls to prevent abuse and control costs."],
              ].map(([title, desc], i) => (
                <div key={i} style={{ marginBottom: i < 4 ? 12 : 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#D94A6B", marginBottom: 2 }}>{title}</div>
                  <div style={{ fontSize: 12, color: "#6A7A8A", lineHeight: 1.5 }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cost Model */}
        {activeTab === "costs" && (
          <div>
            <div style={{ fontSize: 12, color: "#6A7A8A", lineHeight: 1.6, marginBottom: 20 }}>
              Estimated costs per active user per month. Firebase's free tier (Spark plan) covers development and early users. Blaze (pay-as-you-go) for production. The primary cost driver is LLM API usage.
            </div>
            {COST_ESTIMATES.map((item, i) => (
              <div key={i} style={{
                background: "#1A1D23", borderRadius: 10, border: "1px solid #22252B",
                padding: "14px 18px", marginBottom: 6,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#E8E6E1" }}>{item.service}</span>
                  <span style={{ fontSize: 11, color: "#5BBD72", fontFamily: "'JetBrains Mono', monospace" }}>{item.free === "—" ? "" : `Free: ${item.free}`}</span>
                </div>
                <div style={{ fontSize: 12, color: "#E8B931", fontFamily: "'JetBrains Mono', monospace", marginBottom: 4 }}>{item.paid}</div>
                <div style={{ fontSize: 11, color: "#5A6A7A", lineHeight: 1.5 }}>{item.note}</div>
              </div>
            ))}

            <div style={{ marginTop: 20, padding: "16px 18px", background: "#E8B93108", borderRadius: 12, border: "1px solid #E8B93122" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#E8B931", marginBottom: 8 }}>Rough Estimate: Active User</div>
              <div style={{ fontSize: 12, color: "#8A9AAA", lineHeight: 1.6 }}>
                A moderately active user (50 cards/day, 3 domains, 10 AI calls/day) would cost roughly <span style={{ color: "#E8E6E1", fontWeight: 600 }}>$0.50 – $1.50/month</span> in infrastructure, 
                with ~70% of that being LLM API costs. Firebase infrastructure alone is ~$0.10–0.30/user/month at scale.
                This supports a <span style={{ color: "#5BBD72" }}>$5–10/month subscription</span> with healthy margins.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
