---
id: "dp-u09"
type: use-case
title: "Auditing Observations for Patterns and Priorities"
status: defining
owner: observations-agent
created: 2025-02-09
updated: 2025-02-09
refs:
  depends-on: [dp10, dp02, dp04]
  related: [wf-audit-observations, dp-u08, dp-u06]
tags: [dev-platform, use-case, observations, audit, patterns]
---

# DP-U09 — Auditing Observations for Patterns and Priorities

## Scenario

It's been a week since the last observation audit. The observations-agent (or a human acting in that role) runs the audit workflow to process accumulated observations and surface actionable intelligence.

### Steps

1. The observations-agent loads its manifest and the observation index
2. Runs `wf-audit-observations`:
   a. **Scan**: Finds 8 observations in `raw` status since the last audit
   b. **Structure**: Reviews each one:
      - Observation A: well-structured, type and domains already set → mark `structured`
      - Observation B: just a sentence, no type → agent infers type `friction`, adds domain tag `architecture`, expands context from what's known, marks `structured`
      - Observation C: unclear what the observer meant → agent leaves a note asking for clarification, keeps `raw`
   c. **Pattern Detection**: Notices 3 of the 8 observations mention friction with cross-referencing:
      - "cross refs are annoying"
      - "I forgot to update the reciprocal ref again"
      - "bidirectional refs should be validated automatically"
      → Creates a `pattern` observation linking all three, noting this is a recurring signal
   d. **Triage**: The cross-referencing pattern has enough signal to warrant action → marks the pattern observation as `triaged` with a note recommending promotion to a feature request or open question
   e. **Promote**: Creates a new open question `oq-automated-cross-ref-validation` and links it to the pattern observation. Updates the 3 source observations to `promoted` status
   f. **Uplevel**: Notices that the contributor who wrote "cross refs are annoying" has improved — their latest observation was well-structured with context and suggested next steps. The agent acknowledges this growth in audit notes
3. Updates the observation index with audit summary
4. Logs the audit in the changelog

### Outcome

- All `raw` observations processed: structured, clarified, or flagged for follow-up
- A recurring friction pattern surfaced from individual observations
- The pattern was promoted to a formal open question for the meta-agent to address
- Contributors are gradually learning to write better observations
- Domain agents can now see tagged observations relevant to their scope

## Features Exercised

- DP10 — Observation System (core feature)
- DP02 — Agent System (observations-agent running audit)
- DP04 — Registry & Changelog (audit logging)
- DP09 — Domain Context Sync (domain agents consuming observation signals)

## Acceptance Criteria

- [ ] All `raw` observations reviewed and either structured, flagged for clarification, or escalated
- [ ] Patterns identified across related observations
- [ ] High-signal patterns promoted to formal items (open questions, feature requests, etc.)
- [ ] Audit logged in changelog
- [ ] Domain-tagged observations visible to domain DRIs
