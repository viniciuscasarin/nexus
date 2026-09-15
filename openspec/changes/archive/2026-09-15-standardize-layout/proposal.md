## Why

Currently, the pages in the application have inconsistent layouts, max widths, and header styles. The Applications Kanban board feels constrained, while the Job Analysis page combines too much vertical content (job description and resume output), forcing users to scroll excessively. Standardizing the layout wrappers, headers, and structural grid will create a more cohesive, professional, and usable application.

## What Changes

- **Page Container Standardization**: Introduce reusable layout wrappers (e.g., `<PageContainer>`) to standardize max widths, padding, and alignments across all pages.
- **Header Standardization**: Introduce a reusable `<PageHeader>` component for titles, descriptions, and primary actions to ensure a consistent look and feel on all screens.
- **Applications Board Expansion**: Remove the artificial `1400px` width limit on the Applications page, allowing it to take up the full screen width (`w-full`) so the Kanban columns have more room to breathe.
- **Job Analysis Page Redesign**: 
  - Change the layout to a wider 2-column grid.
  - The left column will contain the Job Description form with a fixed-height textarea that fills the screen without causing the main page to scroll.
  - The right column will contain the compatibility analysis results.
  - The generated Tailored Resume will be moved behind a clickable banner/button that opens it in a Modal, mimicking the UX found in the Applications board details modal.

## Capabilities

### New Capabilities
None.

### Modified Capabilities
None. This change focuses entirely on UI layout and structure standardization. No core requirements or system capabilities are modified.

## Impact

- **Affected Code**: Page components (`src/app/(dashboard)/**/page.tsx`), the `JobAnalysis` component (`src/components/job-analysis.tsx`), and potentially shared layout UI components.
- **User Experience**: Improved consistency, less scrolling on the Job Analysis page, and better utilization of screen space on the Applications board.
