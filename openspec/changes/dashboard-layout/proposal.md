## Why

The current layout stacks the Master Data form and Job Analysis components vertically, which limits scalability and makes navigation cumbersome as the application grows. Introducing a professional dashboard layout with a sidebar will provide a clean, organized, and scalable user interface. Additionally, users currently cannot save their analyzed jobs, meaning analysis results are lost when the page is refreshed. Adding a Job History feature solves this problem and allows for future reference without spending AI tokens again.

## What Changes

- Introduce a Sidebar navigation component (admin dashboard style).
- Create dedicated routes for:
  - `/` (Redirects to `/resume`)
  - `/resume` (Principal / Master Data)
  - `/analysis` (Job Analysis)
  - `/history` (Histórico)
- Add a new database model (`SavedJob`) to persist analyzed job descriptions.
- Add a "Save" button to the Job Analysis flow that explicitly saves the job title, company, description, and AI results.
- Create a History page that lists all saved jobs.

## Capabilities

### New Capabilities
- `job-history`: Covers the ability to save analyzed job descriptions and list them for future reference.

### Modified Capabilities
- `job-analysis`: We are adding the ability to explicitly save the analysis result from this flow.

## Impact

- **UI/UX**: Complete overhaul of the main page layout to use a sidebar and routing. Next.js App Router will be used to create the new pages (`app/(dashboard)/...`).
- **Database**: Prisma schema will be updated with a new `SavedJob` model.
- **Backend/Actions**: New server actions will be needed to save and fetch job histories.
