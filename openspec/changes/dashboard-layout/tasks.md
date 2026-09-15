## 1. Database & Backend

- [x] 1.1 Add `SavedJob` model to `schema.prisma` and run `npx prisma db push`, verifying the database reflects the new table.
- [x] 1.2 Create server actions in `src/app/actions/job-history.ts` for saving a job and fetching all saved jobs, verifying they compile without type errors.

## 2. Layout & Routing

- [x] 2.1 Set up `src/app/(dashboard)/layout.tsx` with a basic Sidebar structure, move current `page.tsx` content to `src/app/(dashboard)/resume/page.tsx`, and verify the route loads.
- [x] 2.2 Create `src/app/(dashboard)/analysis/page.tsx` moving the Job Analysis component, and update the root `src/app/page.tsx` to redirect to `/resume`, verifying navigation works.
- [x] 2.3 Create `src/app/(dashboard)/history/page.tsx` for the Job History view, verifying the route loads an empty state.

## 3. UI Components

- [x] 3.1 Implement the Sidebar navigation component using `lucide-react` icons and active route highlighting, verifying it renders on all dashboard pages.
- [ ] 3.2 Add a "Save to History" dialog/button in the Job Analysis component that triggers the save server action, verifying a mock job saves to the DB.
- [ ] 3.3 Implement the History list view in `/history` that fetches from the database, verifying saved jobs are displayed correctly.
