## Why

The Job Application Details modal currently indicates when a tailored resume has been successfully generated but fails to display the actual resume. This happens because the modal checks for the presence of a `tailoredResumeId` in the job application object and shows a success banner, but lacks the logic to fetch the resume content from the database. We need to implement this fetching so users can actually view their generated tailored resumes from the Kanban board.

## What Changes

- Add a new server action to fetch a `TailoredResume` by ID.
- Update `JobApplicationDetails` component to fetch the resume when the "resume" view is active and a `tailoredResumeId` is present.
- Replace the success banner with the actual `<TailoredResumeView>` component, parsing the stored JSON content into the expected object format.

## Capabilities

### New Capabilities

- None

### Modified Capabilities

- None (This is an implementation fix; spec requirements for viewing/generating resumes are already implicitly covered and this resolves a broken implementation.)

## Impact

- `src/app/actions/resume.ts` or `src/app/actions/generate.ts`: New server action for data fetching.
- `src/components/job-application-details.tsx`: UI component state and effect update to trigger the fetch and render the resume view.
