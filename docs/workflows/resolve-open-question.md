---
id: "wf-resolve-question"
type: workflow
title: "Resolve an Open Question"
status: active
owner: meta-agent
created: 2025-02-07
updated: 2025-02-07
refs:
  related: [wf-make-decision, wf-integrate-knowledge]
---

# Workflow: Resolve an Open Question

## When to Use

An open question (`oq-*`) has been explored enough to either resolve into a decision (ADR) or be answered and closed.

## Prerequisites

- The open question file exists in `docs/open-questions/`
- Exploration has been done (the "Exploration" section has content)
- A direction has emerged (the "Current Thinking" section has a recommendation)

## Steps

### Step 1: Review Resolution Criteria

- Open the question file and check the "Resolution Criteria" section
- Have all criteria been met? If not, continue exploring — don't force a resolution

### Step 2: Determine Resolution Type

- **Decision needed**: The resolution requires a significant technical or product decision → create an ADR via `docs/workflows/make-architecture-decision.md`
- **Answer found**: The question has a clear answer that doesn't need a formal ADR → document inline

### Step 3a: If ADR Needed

1. Execute `docs/workflows/make-architecture-decision.md` to create the ADR
2. Update the question file: set status to `resolved`, add `resolves-to: [adr-NNN]`
3. Link the ADR back to the question

### Step 3b: If Answer Found

1. Update the question file: fill in "Current Thinking" with the answer
2. Set status to `resolved`
3. Update affected documents with the resolved information

### Step 4: Update References

- Documents that referenced this question as blocking can now proceed
- Update their status or remove "blocked by oq-*" notes

### Step 5: Log the Change

- Add an entry to `docs/_changelog.md`

## Validation Checklist

- [ ] Resolution criteria were met
- [ ] Question status is `resolved`
- [ ] If ADR: `resolves-to` points to the ADR, ADR exists
- [ ] If answer: "Current Thinking" has the definitive answer
- [ ] Affected documents are updated
- [ ] Changelog entry exists

## Executor Notes

This workflow can be executed by: the owning agent (check `owner` in the question's frontmatter), `meta-agent`, or any human team member.
