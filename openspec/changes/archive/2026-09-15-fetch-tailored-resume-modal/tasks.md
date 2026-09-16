## 1. Backend

- [x] 1.1 Add `getTailoredResume` server action in `src/app/actions/resume.ts` (or `generate.ts`) and verify it queries the DB for `TailoredResume` by ID and returns the parsed JSON object or null.

## 2. Frontend

- [x] 2.1 Update `src/components/job-application-details.tsx` to add a local state for `tailoredResumeContent`.
- [x] 2.2 Add a `useEffect` inside `JobApplicationDetails` to call `getTailoredResume(job.tailoredResumeId)` when `activeView === 'resume'` and verify state updates successfully.
- [x] 2.3 Update the JSX inside `JobApplicationDetails` to conditionally render `<TailoredResumeView resume={tailoredResumeContent} />` instead of just a success banner, and verify the UI correctly displays the resume text.
