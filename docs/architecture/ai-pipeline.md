---
id: "arch-ai-pipeline"
type: architecture
title: "AI Pipeline"
status: exploring
owner: architecture-agent
created: 2025-02-07
updated: 2026-02-22
refs:
  related: [f04, f07, f12, arch-stack, arch-agent-architecture]
  decided-by: [adr-003]
tags: [architecture, ai, pipeline]
---

# AI Pipeline

## Overview

The AI pipeline is the intelligence layer of Syntropy OS. It analyzes every card, generates suggestions, auto-executes high-confidence actions, processes artifacts, and continuously learns from user corrections.

In the [Heterogeneous Agent Architecture](agent-architecture.md), the AI pipeline is primarily a **Probabilistic Agent** orchestration system — it coordinates LLM-based interpretation and classification. Its outputs are always validated by **Deterministic Agents** (confidence scoring, schema validation, Rules enforcement) before becoming system truth via Events. **Organic Agents** (users) provide corrections (Actions) that train the Probabilistic Agents over time. The pipeline stages form a **Protocol** — a multi-agent sequence that all three agent types follow to resolve incoming data.

## Orchestrator

Cloud Functions + Pub/Sub. Events trigger pipeline stages:

```
ingest -> analyze -> decide -> execute -> learn
```

Each stage maps to a specific agent type and uses specific [ontology terms](agent-architecture.md#the-22-term-agent-ontology):

- **Ingest**: New data enters the system (email received, note captured, artifact uploaded, task created). **(Deterministic Agent)** — its Skills (event routing, schema validation) process the raw input against Rules. The raw input is Material that becomes an Artifact (structured data). The ingest produces an Event in the event log (Memory).
- **Analyze**: LLM processes the content — extracts intent, classifies type, identifies entities, generates structured output. **(Probabilistic Agent)** — the Artifact from Ingest enters its Internal Context (bounded by Attributes: context window); its Skills (classify, extract, summarize) execute Actions that cost Effort (API tokens); its Memory (training data + past corrections) informs interpretation.
- **Decide**: Confidence scoring determines the action path: auto-execute (>90%), suggest (60-90%), or present without recommendation (<60%). **(Deterministic Agent)** — its Skills (threshold math) and Workflows ("if score > X then Y") check Permissions (the Boundary of Trust). This is where Mechanics (hard system limits) and Rules (configurable thresholds) determine whether the Probabilistic Agent's output can proceed without Organic authorization.
- **Execute**: For auto-execute, the system takes the Action and logs an Event (`AIAutoExecuted`). For suggestions, the system presents the recommendation to the user as an Observation — the suggestion enters the Organic Agent's Internal Context, where their Policies (personal goals) and State (current focus level) determine the response. Each Action costs Effort.
- **Learn**: User responses (accept, reject, modify) are Actions that produce Events (training signals). **(Organic Skills → Deterministic Memory → Probabilistic Memory)** — the Organic Agent's corrections are stored by Deterministic Agents as Events and incorporated into the Probabilistic Agent's Memory for future decisions. This is the loop that implements Progressive Autonomy — Permissions expand as the Probabilistic Agent's accuracy improves.

## LLM Calls

- Claude API via Cloud Functions (primary LLM).
- OpenAI as fallback.
- **Structured output** (JSON mode) for reliable parsing. Every LLM call returns typed JSON that can be validated and processed programmatically.
- **Prompt templates** per task type. Each card type (email, note, voice capture, artifact) has a specialized prompt template that includes relevant context and instructions.

## Domain Agents

Each domain agent is a Probabilistic Actor with domain-specific [ontology](agent-architecture.md#the-22-term-agent-ontology) configuration. They share the same Capabilities (pattern recognition, language understanding) but differ in their Skills, Memory, Traits, and Policies:

- **Email Agent**: Memory includes email conventions, thread context, sender relationships. Skills: classify, suggest reply, archive, create project from thread. Traits tuned for communication patterns.
- **Finance Agent**: Memory includes invoice patterns, billing cycles, subscription models. Skills: categorize expenses, detect bills, track subscriptions, generate payment reminders. Traits tuned for financial precision.
- **Home Agent**: Memory includes measurements, contractor relationships, maintenance schedules. Skills: extract measurements from photos, file contractor communications, track renovation timelines. Traits tuned for physical-world context.
- **Calendar Agent**: Memory includes scheduling patterns, availability history. Skills: schedule-aware prioritization, meeting prep card generation, deadline tracking. Traits tuned for time sensitivity.
- **Meta Agent**: The router. Its Skills determine which domain agent's Capabilities and Memory best match an incoming item. Routes to the appropriate specialist based on content classification — a routing decision informed by each domain agent's Decision Profile.

## Artifact Intelligence Pipeline

Upload triggers a multi-stage Cloud Function pipeline:

1. **Content extraction**: OCR for images/photos, speech-to-text for voice recordings, text parsing for documents/PDFs. Raw content is extracted from the uploaded file.
2. **LLM analysis**: The extracted content is sent to the LLM for: summary generation, key facts extraction (measurements, costs, dates, contacts, deadlines, specs as typed key-value pairs), type classification, and confidence scoring per extraction.
3. **Auto-routing**: AI suggests which domains, projects, and tasks this artifact relates to -- using embedding similarity + rule matching. Each suggested link has a confidence score.
4. **User review**: The extraction results, suggested links, and proposed follow-up actions are presented to the user for review. The user can accept, reject, or modify any element.
5. **Corrections feed learning**: Every user edit (title change, summary rewrite, fact rejection, link modification) is logged as a correction event for the learning engine.

## Learning Loop

The learning loop is where the Execution Loop of all three agent types connects. Organic Agent corrections are Actions that produce Events, which Deterministic Agents store in Memory, and Probabilistic Agents incorporate into their own Memory:

```
{
  suggested: <what the Probabilistic Agent's Skills proposed (Action)>,
  userChose: <what the Organic Agent's Skills + Policies selected (Action)>,
  context: <the Internal Context both agents were working from>,
  effort: <the Effort cost of the original classification>
}
```

- Per-user preference model adjusts confidence scoring over time. If the Probabilistic Agent's Skills produce 80% confidence but the Organic Agent rejects 50% of the time for a given pattern, the model recalibrates downward — the Probabilistic Agent's Memory evolves, and with it, the Permissions boundary shifts.
- BigQuery aggregation for model fine-tuning. Events in the event log (Deterministic Memory) are exported for batch analysis and aggregate pattern detection.
- Explicit training: Organic Agents can create Rules ("Always do X when you see Y") that become part of the Probabilistic Agent's Policies — overriding learned behavior with direct directives. These are effectively new Rules that constrain Probabilistic behavior.
- Organic Agents can review what the system has learned (Observe the Probabilistic Memory through their Internal Context) and delete/modify learned behaviors.

## Cost Control

- **Rate limiting** per user -- prevents runaway LLM costs from pathological usage patterns.
- **Prompt caching** -- repeated or similar prompts use cached results where appropriate.
- **Token usage tracking** -- every LLM call's token count is logged for cost monitoring and budgeting.
- **Per-card cost**: ~$0.02-0.10 in LLM costs for standard card analysis.
- **Artifact processing cost**: Slightly higher (~$0.05-0.15) due to longer content extraction and multi-stage analysis.
