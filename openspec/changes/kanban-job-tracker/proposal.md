## Why

The application currently acts as a one-off resume generator, where a job description is pasted, analyzed, and a resume is generated. By introducing a Kanban-based Job Application Tracker (ATS), we shift the focus to managing job applications over time, making resume generation a valuable step within a broader workflow. This allows users to track their progress across different stages (Interested, Applied, Screening, Interview, Final Stage, Offer, Hired) and reuse generated resumes across multiple job applications.

## What Changes

- Add a Kanban board UI to manage job applications using drag-and-drop (`@dnd-kit/core`).
- Introduce a `JobApplication` entity to store job details (title, company, link, description) and its current stage (status).
- Introduce a `TailoredResume` entity to store the generated resume content independently, allowing a 1:N relationship (one resume can be reused across multiple job applications).
- Update the job creation flow to accept manual entry of Company, Link, and Description (without forced AI extraction).
- Move the "Generate Tailored Resume" action inside the Job Application modal/drawer.

## Capabilities

### New Capabilities
- `job-application-tracker`: Ability to create, update, and track job applications across different stages in a Kanban board.

### Modified Capabilities
- `resume-generation`: Updating the generation flow to link a generated resume to a specific job application and allowing the reuse of existing generated resumes.

## Impact

- **Database (Prisma):** New models `JobApplication` and `TailoredResume` will be introduced. The existing `SavedJob` model will be migrated or replaced.
- **UI:** The main dashboard will be replaced by the Kanban board.
- **Dependencies:** Addition of `@dnd-kit/core` for drag-and-drop functionality.
