## Context

See `proposal.md` for the motivation of moving from a simple resume generator to a Kanban Job Tracker. The application uses a SQLite database via Prisma and is built with Next.js and Shadcn/ui.

## Goals / Non-Goals

**Goals:**
- Implement a functional Kanban board using `@dnd-kit/core`.
- Decouple resume generation from a single job, allowing a 1:N relationship via `TailoredResume` and `JobApplication`.
- Ensure a smooth transition by migrating or dropping the legacy `SavedJob` table.

**Non-Goals:**
- Implementing multi-user authentication (remains a personal/local tool).
- Automating job application submissions.

## Decisions

### 1. Drag and Drop Library
**Decision:** Use `@dnd-kit/core`.
**Rationale:** It is modern, lightweight, accessible, and works well with React server/client components compared to older alternatives like `react-beautiful-dnd` (which is unmaintained).
**Alternatives:** `react-beautiful-dnd`, `react-dnd`.

### 2. Database Schema Refactoring
**Decision:** Create new `JobApplication` and `TailoredResume` models and relate them. The old `SavedJob` model will be removed.
**Rationale:** The previous `SavedJob` was monolithic. Separating the resume entity allows users to reuse the same generated resume across multiple applications without duplicating the heavy text block. 
**Alternatives:** Keep `SavedJob` and add a `status` field, but that doesn't solve the resume reuse requirement properly.

### 3. AI Extraction on Job Paste
**Decision:** Skip automatic AI extraction for Title/Company on the new job form.
**Rationale:** The user explicitly requested manual entry for these fields to maintain control and reduce unnecessary AI calls on simple data entry.

## Risks / Trade-offs

- **[Risk] State Management Complexity:** Kanban boards require complex client-side state for optimistic UI updates during drag-and-drop.
  → **Mitigation:** Use local React state backed by a server action (e.g., using `useTransition` or SWR/React Query) for immediate feedback when moving cards.
- **[Risk] Data Migration:** Users might have existing `SavedJob` rows.
  → **Mitigation:** The application is likely still in early development, but a Prisma migration script could map `SavedJob` to `JobApplication` and `TailoredResume`. If not critical, we can just drop `SavedJob`.

## Migration Plan

1. Generate Prisma migrations to add `JobApplication` and `TailoredResume`, dropping `SavedJob`.
2. Install `@dnd-kit/core` and related utilities.
3. Build the Kanban UI and the new Job Application modal.
