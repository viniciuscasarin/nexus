## Context

See proposal.md - Why.
The job application details modal currently displays the job description and the tailored resume, but has no capacity to store process history notes.

## Goals / Non-Goals

**Goals:**
- Provide a persistent, scrollable UI within the job details modal to view and add notes.
- Support adding multiple notes per job application, recorded with creation timestamps.

**Non-Goals:**
- We are not adding editing or deletion of comments in this iteration.
- We are not notifying users or external systems when a comment is added.

## Decisions

- **Data Model**: We will create a new `Comment` model linked to `JobApplication`. This is chosen over a single `notes` string field to allow a timestamped history of discrete updates without requiring users to edit a large text block.
- **UI Placement**: The comment section will be added inside the modal, featuring a `max-h-48 overflow-y-auto` container to ensure the modal height doesn't grow unbounded.

## Risks / Trade-offs

- **Risk**: Increased modal height might overflow smaller screens.
  - **Mitigation**: The comment list uses a constrained max-height and scrolls. The entire modal already uses `max-h-[85vh]` and `overflow-y-auto`.
