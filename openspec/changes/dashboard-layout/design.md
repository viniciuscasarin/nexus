## Context

The Nexus app is adopting a dashboard-style layout to handle multiple pages effectively (see proposal.md). Currently, Next.js routing is flat on the `/` page, and the Prisma schema lacks a model for saving job descriptions.

## Goals / Non-Goals

**Goals:**
- Set up Next.js App Router for a layout with a sidebar navigation.
- Add `SavedJob` to Prisma schema and perform a migration.
- Add server actions for saving and retrieving `SavedJob` data.
- Refactor existing components to fit into the dashboard structure.

**Non-Goals:**
- Implementing user authentication (this remains a local tool).
- Updating the AI analysis prompt itself (we only save its output).

## Decisions

**1. Dashboard Layout Structure**
- We will use Next.js route groups `app/(dashboard)/` to share the `layout.tsx` across the new pages (`/resume`, `/analysis`, `/history`). The root `/` route will redirect to `/resume`.
- *Rationale*: Keeps the file structure clean and allows sharing the Sidebar and top navigation context.

**2. Sidebar Implementation**
- We will build a custom Sidebar component using `lucide-react` icons, styled with standard Tailwind CSS to match the existing shadcn look and feel.
- *Rationale*: Re-using the current setup is faster than installing a heavy external dashboard template.

**3. Database Model (`SavedJob`)**
- The new Prisma model will have:
  - `id` (Int, autoincrement)
  - `title` (String)
  - `company` (String)
  - `description` (String)
  - `analysisResult` (String) - Storing the JSON or markdown result from the AI.
  - `createdAt` (DateTime) - Defaulting to now.
- *Rationale*: Keeps the data flat and easy to retrieve for the History view.

## Risks / Trade-offs

- **Risk**: Routing changes might break current forms.
  - *Mitigation*: We will move the forms carefully to the new route segments and ensure Server Actions still point correctly to them.
- **Risk**: AI output might be large.
  - *Mitigation*: SQLite string column is essentially unlimited, so storing the AI result directly in `analysisResult` is safe.
