## Context

See proposal.md - Why.
The layout logic is currently fragmented across individual pages, resulting in a lack of cohesion.
The `JobAnalysis` component (`src/components/job-analysis.tsx`) renders everything synchronously in a single column, which forces long scrolling.
The `TailoredResumeView` exists, but is currently appended to the bottom of the page.

## Goals / Non-Goals

**Goals:**
- Provide a standardized structural wrapper `<PageContainer>` for all dashboard pages.
- Standardize the page headers `<PageHeader>`.
- Convert the Job Analysis layout to a 2-column grid to display the job description on the left and the analysis results on the right.
- Move the generated tailored resume in the Job Analysis flow into a Modal, replicating the UI of the Kanban board details modal.

**Non-Goals:**
- Changing the underlying AI integration, analysis scoring algorithm, or resume generation logic.
- Redesigning components outside of the dashboard layouts (e.g. landing pages).
- Altering the Job Application Kanban board behavior (only its max width is changing).

## Decisions

- **Page Container Component (`<PageContainer>`)**: We will create a `PageContainer` with variants (e.g., `default` for max-w-4xl/7xl, `full` for w-full) to make it easy to drop into new pages.
- **Header Component (`<PageHeader>`)**: A new `PageHeader` component will accept `title`, `description`, and `actions` (React nodes for buttons like "New Application").
- **Job Analysis 2-Column Layout**: We will use CSS Grid or Flexbox in the `JobAnalysis` component wrapper to create a left and right column. The left column's `Textarea` will have a fixed height (using `h-[calc(100vh-250px)]` or similar viewport calculations) so it fills the screen without causing the main document body to scroll. 
- **Tailored Resume Modal**: We will wrap the existing `<TailoredResumeView>` inside a `Dialog` component from `shadcn/ui` (which is already used in `job-application-details.tsx`). A new banner/button component will be placed in the Analysis results column to trigger this Modal.

## Risks / Trade-offs

- **Viewport Height Calculation** → Depending on the screen size, `h-[calc(100vh-...)]` might behave inconsistently on mobile or very small screens. 
  *Mitigation*: We will add responsive classes (e.g., fallback to auto height on small screens, and apply the fixed height on `md:` or `lg:` breakpoints).
