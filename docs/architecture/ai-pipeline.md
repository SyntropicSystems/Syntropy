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

In the [Heterogeneous Agent Architecture](agent-architecture.md), the AI pipeline is primarily a **Probabilistic Agent** orchestration system — it coordinates LLM-based interpretation and classification. Its outputs are always validated by **Deterministic Agents** (confidence scoring, schema validation, business rules) before becoming system truth. **Organic Agents** (users) provide corrections that train the Probabilistic Agents over time.

## Orchestrator

Cloud Functions + Pub/Sub. Events trigger pipeline stages:

```
ingest -> analyze -> decide -> execute -> learn
```

Each stage maps to a specific agent type and engages specific [Internal Components](agent-architecture.md#the-9-internal-components):

- **Ingest**: New data enters the system (email received, note captured, artifact uploaded, task created). **(Deterministic Agent)** — its Skills (event routing, schema validation) process the raw input. The event becomes part of system Memory (the event log).
- **Analyze**: LLM processes the content — extracts intent, classifies type, identifies entities, generates structured output. **(Probabilistic Agent)** — its Internal Context is the data slice from Ingest; its Skills (classify, extract, summarize) produce structured output; its Memory (training data + past corrections) informs interpretation.
- **Decide**: Confidence scoring determines the action path: auto-execute (>90%), suggest (60-90%), or present without recommendation (<60%). **(Deterministic Agent)** — its Skills (threshold math) and Workflows ("if score > X then Y") implement the Boundary of Trust. The confidence score is the bridge between the Probabilistic Agent's output and the next step.
- **Execute**: For auto-execute actions, the system takes the action and logs an `AIAutoExecuted` event. For suggestions, the system presents the recommendation to the user. **(Deterministic Skills for execution + Organic Internal Context for review)** — the suggestion enters the Organic Agent's Attention, where their Policies (personal goals) and Internal State (current focus level) determine the response.
- **Learn**: User responses (accept, reject, modify) are logged as training signals. The preference model updates. **(Organic Skills → Deterministic Memory → Probabilistic Memory)** — the Organic Agent's corrections (Skills applied with judgment) are stored by Deterministic Agents and incorporated into the Probabilistic Agent's Memory for future decisions.

## LLM Calls

- Claude API via Cloud Functions (primary LLM).
- OpenAI as fallback.
- **Structured output** (JSON mode) for reliable parsing. Every LLM call returns typed JSON that can be validated and processed programmatically.
- **Prompt templates** per task type. Each card type (email, note, voice capture, artifact) has a specialized prompt template that includes relevant context and instructions.

## Domain Agents

Each domain agent is a Probabilistic Agent with domain-specific [Internal Components](agent-architecture.md#the-9-internal-components). They share the same Capabilities (pattern recognition, language understanding) but differ in their Skills, Memory, Traits, and Policies:

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

The learning loop is where the Internal Components of all three agent types interact most directly. User corrections (Organic Agent Skills applied with judgment) are stored as structured training signals by Deterministic Agents (Memory) and incorporated into Probabilistic Agent Memory:

```
{
  suggested: <what the Probabilistic Agent's Skills proposed>,
  userChose: <what the Organic Agent's Skills + Policies selected>,
  context: <the Internal Context both agents were working from>
}
```

- Per-user preference model adjusts confidence scoring over time. If the Probabilistic Agent's Skills produce 80% confidence but the Organic Agent rejects 50% of the time for a given pattern, the model recalibrates downward — the Probabilistic Agent's Memory evolves.
- BigQuery aggregation for model fine-tuning. Event logs (Deterministic Memory) are exported for batch analysis and aggregate pattern detection.
- Explicit training: Organic Agents can create rules ("Always do X when you see Y") that become part of the Probabilistic Agent's Policies — overriding learned behavior with direct directives.
- Organic Agents can review what the system has learned (inspect Probabilistic Memory through their Internal Context) and delete/modify learned behaviors.

## Cost Control

- **Rate limiting** per user -- prevents runaway LLM costs from pathological usage patterns.
- **Prompt caching** -- repeated or similar prompts use cached results where appropriate.
- **Token usage tracking** -- every LLM call's token count is logged for cost monitoring and budgeting.
- **Per-card cost**: ~$0.02-0.10 in LLM costs for standard card analysis.
- **Artifact processing cost**: Slightly higher (~$0.05-0.15) due to longer content extraction and multi-stage analysis.
