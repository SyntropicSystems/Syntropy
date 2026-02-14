---
id: "dp15"
type: feature-spec
title: "Shadow Navigator"
status: exploring
owner: meta-agent
priority: P0
created: 2026-02-14
updated: 2026-02-14
refs:
  depends-on: [dp01, dp03, dp04, dp05, dp09, dp13]
  enables: [dp-u16, dp-u17, dp-u18, dp-u19, dp-u20]
  related: [dp02, dp08, dp10, dp14]
  informed-by: [jtbd-dev-platform]
tags: [dev-platform, core, governance, reconciliation, shadow, compliance, p0]
---

# DP15 — Shadow Navigator

## Summary

A non-blocking, always-on system that continuously reconciles code, specs, rules, and workflows into a coherent, compliant state — without disrupting developer flow. The Shadow Navigator turns governance from passive documentation into an executable reconciliation engine: it detects drift in the background, proposes fixes as small reviewable patches, escalates only when risk is meaningful, and lets the developer choose when to engage.

The core insight is that governance today is either passive (documents nobody reads until something breaks) or blocking (CI/CD gates that interrupt flow and deliver bad news too late). The Shadow Navigator occupies the middle ground: it operates like a rally car navigator — it doesn't grab the steering wheel, it updates the map and calls out turns. The developer stays in flow. The system keeps the governance layer in sync.

This feature encompasses three interlocking concepts:

1. **The Constitutional Stack** — A separation of concerns for governance artifacts: Principles (the constitution), Decision Records (the statutes), and Derived Artifacts (the actionable specs, rules, workflows, code). Each layer has a clear boundary and purpose. Documents don't try to do everything at once.

2. **The Executable Governance Graph** — Artifacts are typed nodes with explicit edges, triggers, and deterministic workflows. When any node changes, the graph identifies affected downstream nodes and triggers reconciliation. Compliance propagation is automatic and auditable.

3. **The Shadow Workspace** — A continuous background process that reconciles governance against active work, produces patches and prompts, and surfaces them through a progressive-disclosure UX that respects the developer's attention.

## Jobs Addressed

- DJ13 — Keep All Artifacts in Continuous Compliance Without Disrupting Developer Flow (primary)
- DJ14 — Enable Deterministic Graph-Based Artifact Execution (primary)
- DJ3 — Keep Decisions Traceable and Reversible (secondary)
- DJ6 — Ensure Consistency Across All Documentation (secondary)
- DJ7 — Preserve Domain Expertise and Enable Fast Context Recovery (secondary)
- DJ11 — Build a Reasoning Graph That Makes Every Decision Reproducible and Traceable (secondary)

## How It Works

### The Constitutional Stack

Current ADRs conflate three distinct concerns: the argument (why), the law (what was decided), and the enforcement (how it's applied). The Shadow Navigator separates governance into distinct layers with clear inheritance:

**Principles (The Constitution)** — The immutable "Why." Root nodes of the governance graph. Example: "User privacy > Data monetization." These rarely change and serve as the ultimate alignment check.

**Support Artifacts (The Legislative History)** — The context behind decisions. Problem stack, data gathered, options explored, success metrics considered. These are transient or archival — once a decision is made, the support artifact becomes reference material. It answers "Why did we do this?" but is not required for "How do I do this?"

**Decision Records (The Statutes)** — Clean, crisp governing statements. Atomic. High-level. They contain the decision and pointer to derived artifacts — not the implementation details. Example: "All public APIs use GraphQL, not REST." This is the layer that ties everything together: every derived artifact traces back to a decision record, and every decision record traces up to principles.

**Derived Artifacts (The Regulations)** — The actionable layer. Specs, lint rules, workflow definitions, policy-as-code, API schemas, code templates. These are the strict source-of-truth instructions that developers and AI agents actually follow day-to-day. They are where "the law" becomes concrete. A developer reads the spec, not the decision record — unless the spec isn't clear enough and they need more context.

### The Executable Governance Graph

Every artifact in the system is a typed node with metadata and explicit edges. This is not a wiki — it's a dependency graph (a DAG) where changes propagate deterministically.

**Node Properties:**
- Type (decision-record, spec, rule, workflow, code-example, principle)
- State (active, draft, under-review, archived)
- Upstream dependencies (what this derives from)
- Downstream triggers (what must be checked/updated when this changes)
- Owner (the DRI responsible for this artifact)
- Domain scope (where this applies)

**Edge Types:**
- **Dependency Edge** — If a parent node (e.g., a decision record) is modified, all downstream nodes (specs, rules, workflows) are marked "dirty/unverified" and a reconciliation workflow is triggered.
- **Compliance Edge** — Code (implementation) is linked to its governing spec. If code deviates from spec, the system detects it and surfaces the drift.
- **Exception Edge** — Explicit, first-class exceptions. "We decided X globally, but in domain Y we do Z because [reason]." Exceptions are nodes, not comments.

**Deterministic Execution:**
When files change, the graph identifies which nodes are affected, which downstream nodes need verification, and which workflows to run. At the end of each workflow, the system determines if further workflows must run based on the resulting changes. This is graph computing applied to governance — not a monolithic CI pipeline, but atomic micro-workflows triggered by specific edges.

### The Shadow Workspace

The Shadow Navigator operates on a conceptual "shadow" layer alongside the developer's active work. It does not block. It does not merge-conflict. It reconciles.

**How it runs:**
1. Developer edits code, specs, plans — normal work.
2. The system detects changes (file saves, commits).
3. Instead of blocking, it runs reconciliation on a shadow thread — checking affected governance nodes.
4. Results are patches (proposed changes) and prompts (questions requiring human input).
5. Patches are kept current as the developer continues working (semantic rebasing).

**Race condition handling (the "new commit" problem):**
When the developer commits while the shadow system is still processing a previous change:
- The system checks whether the new commit invalidates the pending result.
- If the patch still applies: keep it, update to latest.
- If the patch is superseded: discard silently.
- If there's a logical conflict: surface a prompt.
- Old results collapse into "superseded," "still applies," or "needs re-check" — the developer never sees 12 stale reports.

**The "Feed the Agent" principle:**
The Shadow Navigator does not try to write the developer's code. It prepares context for the developer's coding agent. It updates state files, constraints, and next-step summaries. When the developer next prompts their AI assistant, that assistant "knows" what the governance graph figured out — without the developer having to relay it.

### The Complexity Thermometer (Debt Score)

The system continuously calculates a "debt score" — the predicted future cost if current drift remains unresolved. This is what drives the progressive escalation:

- **Low debt**: Green state. Fix is trivial. System holds the patch silently.
- **Growing debt**: Yellow state. Fix is still manageable, but compounding. System nudges.
- **High debt**: Red state. Fixing later will require significant rework. System escalates with a clear cost estimate.

The debt score is not a count of lint errors. It's a measure of *compounding complexity* — how much harder the fix gets with each subsequent commit that builds on top of the drift.

### Product Surfaces

**Surface A: Status HUD (Glanceable)**

A persistent indicator in the editor status bar, terminal prompt, or CLI:

- Green — In Sync. All checks reconciled. No action needed.
- Yellow — Drift. X small drifts detected. Auto-fix patches ready. Shows approximate debt ("solving later adds ~10 min work").
- Red — High Risk. Cliff risk detected. Shows predicted cost ("~4h if delayed"). Stronger nudges, but not a hard stop until merge gating.

The HUD always answers three questions: What state am I in? How many items need attention? Is anything urgent?

**Surface B: Command Center (Second Window)**

A dedicated, fast interface that developers can zip into and out of. Not a report — a cockpit.

- **Inbox**: Patch queue (ready / needs review / blocked on prompt) + Prompts queue (one at a time, prioritized).
- **Timeline**: Time-travel view — what changed, when drift started, what the system recommended at each point.
- **Map**: High-level view of impacted domains and areas (auth, API, storage).
- **Finalize**: Zipper merge preview — bundle of governance updates ready to integrate with developer's work.
- **Settings**: Notification thresholds, quiet hours, aggressive vs. chill mode.

**Surface C: Inline Nudges (In-Editor)**

When drift relates to a specific file/function, lightweight annotations appear:
- "Spec drift: click to view patch"
- "Decision mismatch: needs prompt"

Inline nudges are rarer than HUD changes — used only when context is precise.

**Surface D: Notifications (Right-Sized)**

Three levels:
- Silent (updates HUD only)
- Nudge (toast/notification: "Patch ready")
- Escalation (red-state: "High risk — review suggested")

### Core Product Flows

**Flow 1: Everyday Building (Stay in Flow)**
Developer edits. Shadow Navigator detects changes. Reconciliation runs in background. HUD updates if drift found. Developer ignores and keeps working. System keeps patches current. Zero interruption unless the developer chooses to engage.

**Flow 2: Quick Review + Apply (Micro-Intervention)**
HUD shows yellow. Developer opens Inbox. Sees one patch: "Update spec for new field." Three actions: Apply, Edit, Reject. Whole interaction is seconds. Developer returns to flow.

**Flow 3: Prompt Resolution (Focused Decision)**
System can't safely auto-decide something. Surfaces one crisp prompt: "Is this API change breaking or non-breaking?" with choices and short consequences. Developer answers. System generates follow-up patches. No document reading required.

**Flow 4: Time Travel (Where Did I Go Wrong?)**
Developer hits a wall. Opens Timeline. Sees commit-by-commit drift history. Identifies the commit where drift started. Sees what the system recommended then. Can cherry-pick the fix now, with the system resolving conflicts against current state. Causality is clear in under 60 seconds.

**Flow 5: Finalize (Zipper Merge)**
Developer is done building. Opens Finalize tab. System presents: what's compliant, what remains (patches/prompts), what gets bundled into the PR. Developer clicks "Sync & Finalize." System produces a clean set of governance updates + fixes as a preview diff. Merge gate: if red-state violations remain unresolved, merge is blocked with a clear single reason and fix path. But because of continuous warnings, this is rarely a surprise.

### Trust, Control, and Safety

- The system **never silently changes core code** without an explicit "apply."
- Every patch includes: a one-sentence rationale, impacted artifacts, confidence level, and rollback clarity.
- Rejection is allowed and respected — but the system learns from rejection tags ("false positive," "policy outdated," "later").
- Red state means "real risk," not "annoying lint." The system is conservative with escalation.
- The developer has full autonomy over when to engage — except at merge gates for high-risk violations.

### Handling Agent Collision

When the developer's coding AI agent and the Shadow Navigator could conflict:
- The Shadow Navigator does not try to rewrite files the developer (or their agent) is actively editing.
- Instead, it updates context files — constraints, working state, next steps.
- The developer's AI agent reads these context files on its next prompt, absorbing the governance findings naturally.
- Result: the coding agent "catches up" to the graph's findings without fighting it.

## Dependencies

- Requires: DP01 (Knowledge Graph) — artifacts are graph nodes with typed edges; DP03 (Workflow Engine) — reconciliation workflows; DP04 (Registry & Changelog) — drift detection via changelog scanning; DP05 (Convention System) — artifact structure and templates; DP09 (Domain Context Sync) — domain-scoped drift detection and DRI review; DP13 (Decision Records) — the governance layer that the Shadow Navigator enforces
- Enables: DP-U16 (Everyday Building with Shadow Reconciliation), DP-U17 (Reviewing and Applying a Shadow Patch), DP-U18 (Resolving a Governance Prompt), DP-U19 (Time-Traveling to Understand Drift Origin), DP-U20 (Finalizing Work with Zipper Merge)
- Related: DP02 (Agent System) — shadow navigator is an agent-like background process; DP08 (Entry Point Routing) — the Command Center is a new entry surface; DP10 (Observation System) — drift patterns feed observations; DP14 (Cognitive Engineering) — patches and prompts follow progressive disclosure principles

## Success Metrics

**Developer experience:**
- Time-to-first-usable-feedback after a change (goal: seconds, not minutes)
- % of work sessions with zero disruptive interruptions
- "Surprise at merge time" rate (goal: near zero)
- Developer satisfaction: "This saved me time" vs. "This nagged me"

**Quality / governance:**
- Drift caught pre-PR vs. caught in CI vs. caught in production
- Mean time to reconcile governance after code changes
- Reduction in "missing spec/rules updates" comments in PRs

**Operational:**
- Prompt rate per developer-day (should be low — system resolves most drift automatically)
- Patch apply rate (high is good if patches are high-quality)
- Rejection rate (monitor for noise — high rejection means patches are off-target)

## Explicit Non-Goals

- Not replacing engineers' judgment — the system navigates, the developer drives.
- Not forcing a single workflow style — it adapts to how the developer works.
- Not turning development into form-filling — patches and prompts, not paperwork.
- Not making everything append-only — version history is in git; active view stays clean.
- Not building a CI/CD replacement — the shadow system complements CI/CD, not competes with it.

## Open Questions

- [ ] What is the default threshold for yellow vs. red state?
- [ ] Which artifact categories are merge-gating vs. advisory-only?
- [ ] How do we represent ownership and required sign-offs without making it bureaucratic?
- [ ] How do we teach users the mental model quickly (onboarding)?
- [ ] What's the minimal "Map" view that is actually useful (not a toy graph)?
- [ ] How does the shadow system interact with multiple developers working on the same branch?
- [ ] What's the right granularity for "micro-workflows" — per-file, per-function, per-artifact-type?
- [ ] How does the debt score account for different artifact types (a spec drift vs. a security policy drift)?
- [ ] Should the shadow system run locally, in the cloud, or hybrid — and how does this affect the product experience?
- [ ] How do we prevent the patch queue from becoming its own source of noise and overwhelm?
