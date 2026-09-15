## 1. Core Layout Components

- [x] 1.1 Create `PageContainer` component in `src/components/page-container.tsx` and verify it renders children with `variant="default"` (max-w-4xl) and `variant="full"` (w-full px-6).
- [x] 1.2 Create `PageHeader` component in `src/components/page-header.tsx` with title, description, and optional action slots. Verify it renders correctly.

## 2. Refactoring Existing Pages

- [x] 2.1 Refactor Applications Page (`src/app/(dashboard)/applications/page.tsx`) to use `<PageContainer variant="full">` and `<PageHeader>`, removing the hardcoded `max-w-[1400px]`. Verify the kanban board occupies the full width of the screen.
- [ ] 2.2 Refactor Resume Page (`src/app/(dashboard)/resume/page.tsx`) to use `<PageContainer variant="default">` and `<PageHeader>`. Verify the Master Resume page maintains its 4xl constrained width.
- [ ] 2.3 Refactor Job Analysis Page (`src/app/(dashboard)/analysis/page.tsx`) to use a wider `<PageContainer>` variant or custom max-w (e.g. `max-w-7xl`) and `<PageHeader>`. Verify it renders correctly.

## 3. Job Analysis Page Grid & Modal

- [ ] 3.1 Update `JobAnalysis` component (`src/components/job-analysis.tsx`) to use a 2-column grid layout for medium/large screens. Verify the layout splits side-by-side.
- [ ] 3.2 Update the `Textarea` inside `JobAnalysis` to use a viewport-relative fixed height (e.g., `h-[calc(100vh-300px)]` on `md:` breakpoints) and ensure overflow scrolling is internal. Verify the main page does not scroll unnecessarily on large screens.
- [ ] 3.3 Create a `TailoredResumeModal` or inline the Dialog wrapper for the `TailoredResumeView` inside the Analysis component. Add a UI trigger (button/banner) that indicates a resume was generated and opens the modal upon click. Verify the modal opens and displays the resume properly.
