---
id: "adr-003"
type: adr
title: "Claude as Primary LLM"
status: accepted
owner: architecture-agent
created: 2025-02-07
updated: 2025-02-07
refs:
  affects: [f04, f07, f12, arch-ai-pipeline, arch-stack]
---

# ADR-003: Claude as Primary LLM

## Context

Syntropy OS requires LLM capabilities for: action analysis (determining what to do with each card), content extraction (OCR results, email parsing, voice transcription analysis), structured output generation (JSON responses for reliable programmatic processing), confidence scoring (self-assessed probability of correctness), domain-specific reasoning (finance, home, calendar contexts), and multi-step artifact intelligence (summary generation, key facts extraction, auto-routing suggestions).

The AI pipeline is orchestrated via Cloud Functions + Pub/Sub, with LLM calls made server-side. The system needs reliable structured output (JSON mode) for every call, as responses are parsed and processed programmatically. Cost per card must be manageable (~$0.02-0.10) since every card in the queue triggers an LLM analysis.

## Decision

Use Claude API as the primary LLM, with OpenAI as a fallback. LLM calls are made via Cloud Functions with structured output (JSON mode) and prompt templates per task type.

## Rationale

- **Structured output reliability.** Claude's JSON mode produces well-structured, reliable output that can be validated and parsed programmatically. This is critical for the pipeline -- every LLM response must be a valid JSON object matching the expected schema.
- **Reasoning quality.** Claude excels at the kinds of reasoning Syntropy OS requires: understanding email context, extracting structured data from unstructured content, generating confidence scores with calibrated explanations, and multi-step analysis (the artifact intelligence pipeline).
- **Long context window.** Email threads, documents, and voice transcriptions can be lengthy. Claude's large context window allows processing entire email threads or multi-page documents in a single call without chunking.
- **Cost-effective for the use case.** At ~$0.02-0.10 per card for standard analysis and ~$0.05-0.15 for artifact processing, the per-user cost is manageable for a subscription product. Prompt caching and token usage tracking provide cost control levers.
- **OpenAI fallback.** If Claude API is unavailable (outage, rate limit), the system falls back to OpenAI. Prompt templates are designed to work with both APIs, with minor adaptations. This prevents single-provider dependency for availability.

## Alternatives Considered

- **OpenAI only (GPT-4 / GPT-4o).** Strong structured output support, well-established API, function calling capabilities. However, reasoning quality for nuanced analysis (email intent, confidence calibration) is comparable but not superior. Cost structure is similar. Using OpenAI as the sole provider creates the same single-provider risk. Keeping OpenAI as fallback provides the best of both.

- **Open-source models (Llama, Mistral, local deployment).** Eliminates API dependency and per-call costs. Data stays on our infrastructure (privacy benefit). However, requires GPU infrastructure (cost and operational complexity), model quality is below Claude/GPT-4 for structured output and nuanced reasoning, and inference latency on self-hosted hardware is typically higher. Not viable for a small team without dedicated ML infrastructure. Could be revisited as open-source models improve.

- **Multi-model orchestration (different models for different tasks).** Use the best model for each task type: e.g., a fast/cheap model for email classification, a powerful model for artifact analysis, a specialized model for OCR. Optimizes cost and quality per task. However, significantly increases pipeline complexity, requires maintaining multiple API integrations and prompt templates, and makes debugging harder. The marginal cost savings don't justify the complexity at this stage. Can be revisited at scale.

## Consequences

- **API dependency.** The AI pipeline depends on Claude API availability. Mitigated by OpenAI fallback and graceful degradation (cached suggestions shown when API is unavailable, new analysis deferred).
- **Cost per card (~$0.02-0.10).** Every card in the queue triggers an LLM analysis. For an active user processing 50-100 cards/day, daily LLM cost is ~$1-10. This must be factored into the subscription pricing model. Mitigated by prompt caching, rate limiting, and token usage tracking.
- **Artifact processing cost (~$0.05-0.15).** Artifact intelligence requires longer content extraction and multi-stage analysis, making it slightly more expensive per item. Users uploading many artifacts will incur higher costs.
- **Need structured output.** Every LLM call must return valid JSON matching the expected schema. Prompt templates must be carefully designed and tested. Schema validation on the Cloud Function side catches malformed responses and retries.
- **Prompt template maintenance.** Each card type (email, note, voice, artifact) and each domain agent (Email, Finance, Home, Calendar, Meta) has its own prompt template. These templates must be maintained, versioned, and tested as the product evolves.
