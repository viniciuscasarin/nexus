## Why

We need a unified column to move job applications that are no longer being considered. This will keep the main Kanban board clean from inactive applications, whether they were rejected by the company, withdrawn by the candidate, or closed for other reasons.

## What Changes

- Add a new "DROPPED" status to the Kanban columns.
- Update the job application tracker board to render the "DROPPED" column at the end, after "HIRED".

## Capabilities

### New Capabilities

### Modified Capabilities

- `job-application-tracker`: Added "DROPPED" status to track inactive applications.

## Impact

- **Frontend**: The `KanbanBoard` component in `src/components/kanban-board.tsx` will include the "DROPPED" column and allow drag-and-drop into it.
- **Backend/DB**: The Prisma schema already uses a generic `String` for the status, so existing records and the schema itself are largely unaffected. No migration is required.
