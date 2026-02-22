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

Each stage maps to a specific agent type in the Heterogeneous Agent Architecture:

- **Ingest**: New data enters the system (email received, note captured, artifact uploaded, task created). **(Deterministic — event routing, schema validation)**
- **Analyze**: LLM processes the content -- extracts intent, classifies type, identifies entities, generates structured output. **(Probabilistic — LLM interpretation)**
- **Decide**: Confidence scoring determines the action path: auto-execute (>90%), suggest (60-90%), or present without recommendation (<60%). **(Deterministic — threshold math, the Boundary of Trust)**
- **Execute**: For auto-execute actions, the system takes the action and logs an `AIAutoExecuted` event. For suggestions, the system presents the recommendation to the user (Organic Agent). **(Deterministic execution + Organic review)**
- **Learn**: User responses (accept, reject, modify) are logged as training signals. The preference model updates. **(Organic → Deterministic storage → Probabilistic model improvement)**

## LLM Calls

- Claude API via Cloud Functions (primary LLM).
- OpenAI as fallback.
- **Structured output** (JSON mode) for reliable parsing. Every LLM call returns typed JSON that can be validated and processed programmatically.
- **Prompt templates** per task type. Each card type (email, note, voice capture, artifact) has a specialized prompt template that includes relevant context and instructions.

## Domain Agents

Specialized prompt + context strategies per domain. Each agent has domain-specific knowledge and instructions:

- **Email Agent**: Understands email conventions, thread context, sender relationships, reply patterns. Handles: classify, suggest reply, archive, create project from thread.
- **Finance Agent**: Understands invoices, bills, subscriptions, payment patterns. Handles: categorize expenses, detect bills, track subscriptions, payment reminders.
- **Home Agent**: Understands measurements, contractors, maintenance, home improvement. Handles: extract measurements from photos, file contractor communications, track renovation timelines.
- **Calendar Agent**: Understands scheduling, availability, meeting prep. Handles: schedule-aware prioritization, meeting prep cards, deadline tracking.
- **Meta Agent**: The router. Determines which domain agent should handle an incoming item based on content classification. Routes to the appropriate specialist.

## Artifact Intelligence Pipeline

Upload triggers a multi-stage Cloud Function pipeline:

1. **Content extraction**: OCR for images/photos, speech-to-text for voice recordings, text parsing for documents/PDFs. Raw content is extracted from the uploaded file.
2. **LLM analysis**: The extracted content is sent to the LLM for: summary generation, key facts extraction (measurements, costs, dates, contacts, deadlines, specs as typed key-value pairs), type classification, and confidence scoring per extraction.
3. **Auto-routing**: AI suggests which domains, projects, and tasks this artifact relates to -- using embedding similarity + rule matching. Each suggested link has a confidence score.
4. **User review**: The extraction results, suggested links, and proposed follow-up actions are presented to the user for review. The user can accept, reject, or modify any element.
5. **Corrections feed learning**: Every user edit (title change, summary rewrite, fact rejection, link modification) is logged as a correction event for the learning engine.

## Learning Loop

User corrections are stored as structured training signals:

```
{
  suggested: <what AI proposed>,
  userChose: <what user actually did>,
  context: <surrounding context at time of decision>
}
```

- Per-user preference model adjusts confidence scoring over time. If the AI is 80% confident but the user rejects 50% of the time for a given pattern, the model recalibrates downward.
- BigQuery aggregation for model fine-tuning. Event logs are exported to BigQuery for batch analysis and aggregate pattern detection.
- Explicit training: Users can create rules ("Always do X when you see Y") that override learned behavior.
- Users can review what the system has learned and delete/modify learned behaviors.

## Cost Control

- **Rate limiting** per user -- prevents runaway LLM costs from pathological usage patterns.
- **Prompt caching** -- repeated or similar prompts use cached results where appropriate.
- **Token usage tracking** -- every LLM call's token count is logged for cost monitoring and budgeting.
- **Per-card cost**: ~$0.02-0.10 in LLM costs for standard card analysis.
- **Artifact processing cost**: Slightly higher (~$0.05-0.15) due to longer content extraction and multi-stage analysis.
