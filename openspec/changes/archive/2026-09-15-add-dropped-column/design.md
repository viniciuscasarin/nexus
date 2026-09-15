## Context

See `proposal.md` for motivation. This is a simple UI state addition, storing the state in an existing database `String` column. No migrations or complex architecture changes are needed.

## Goals / Non-Goals

**Goals:**
- Add a "DROPPED" column to the Kanban board UI to allow users to move job applications out of active consideration.

**Non-Goals:**
- Do not track reasons for being dropped (e.g. "rejected" vs "withdrew").

## Decisions

- **Decision**: Use a single "DROPPED" state for all inactive applications instead of multiple states.
  - **Rationale**: Keeps the UI simple and avoids cluttering the Kanban board with multiple inactive states like "REJECTED" or "WITHDRAWN".

## Risks / Trade-offs

- **Trade-off**: The user will not be able to easily distinguish between jobs they withdrew from vs jobs they were rejected from. This is acceptable for a minimal viable product and can be expanded later if needed.
