## 1. Schema and Setup

- [x] 1.1 Add `@dnd-kit/core` and related packages (`@dnd-kit/utilities`, `@dnd-kit/sortable`) to dependencies and verify installation succeeds
- [x] 1.2 Update Prisma schema to replace `SavedJob` with `JobApplication` and `TailoredResume` models, and run `prisma migrate dev` to verify the DB migration

## 2. API and Backend Updates

- [x] 2.1 Create Server Actions/API routes for manually creating a new `JobApplication` and verify the entry is created correctly in the database
- [x] 2.2 Update the resume generation service to save output as a `TailoredResume` entity, link it to the relevant `JobApplication`, and verify via API tests or local validation
- [x] 2.3 Create Server Actions/API routes to handle Kanban state updates (moving cards between columns) and verify successful DB status updates

## 3. UI Components Implementation

- [x] 3.1 Build the manual "New Application" form/modal and verify the submission creates a new application in the "INTERESSADO" status
- [x] 3.2 Build the Kanban board layout with columns corresponding to the defined statuses and verify they render correctly on the dashboard
- [x] 3.3 Implement the drag-and-drop logic for application cards and verify optimistic visual updates map to DB updates via Server Actions
- [x] 3.4 Build the "Job Application Details" modal/drawer containing the "Generate Tailored Resume" button (or select existing) and verify it displays the correct data for each job
