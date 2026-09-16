## Context

See proposal.md for motivation. The Kanban board displays job applications and allows users to open a modal with details. Currently, if a tailored resume exists, the modal displays a success message but doesn't fetch the resume data.

## Goals / Non-Goals

**Goals:**
- Implement a server action to fetch a `TailoredResume` from the database.
- Parse the JSON string stored in the `content` field.
- Wire this fetching mechanism into `JobApplicationDetails` so the resume is requested and displayed when the user navigates to the "resume" view.

**Non-Goals:**
- Modifying how resumes are generated.
- Modifying the `<TailoredResumeView>` component itself.
- Eagerly loading resumes for all cards (which could bloat the initial page load).

## Decisions

- **Lazy fetching (Server Action)**: We will introduce `getTailoredResume(id: number)` in `src/app/actions/resume.ts` or `generate.ts` rather than eager-loading `tailoredResume` data in the main job applications query. Rationale: Resumes contain a lot of text (the entire generated JSON), and fetching them for all applications on the Kanban board on initial load is unnecessary overhead.
- **Client-side state**: We will add a `useEffect` inside `JobApplicationDetails` that triggers only when `activeView === 'resume'` and `job.tailoredResumeId` exists, fetching the resume and storing it in a local state variable `tailoredResumeContent`.

## Risks / Trade-offs

- **Risk**: Stale data if the resume is regenerated elsewhere while the modal is open.
  - **Mitigation**: Simple refresh behavior is already in place.
