## 1. Backend Server Action Update

- [x] 1.1 Update `generateTailoredResume` signature in `src/app/actions/generate.ts` to accept `{ jobApplicationId?: number, jobDescription?: string, modelId: string, language?: string }` instead of positional arguments, and verify TypeScript compiles without errors.
- [x] 1.2 Update the implementation of `generateTailoredResume` to support ad-hoc generation (when `jobApplicationId` is missing), skipping the DB query and `jobApplication` update, and verify ad-hoc resumes return correctly without throwing "Job application not found".
- [x] 1.3 Inject the `language` parameter into the system prompt in `generateTailoredResume`, instructing the LLM to write the response in that language while keeping JSON keys intact, and verify via a mock test or manual run that output language changes.
- [x] 1.4 Refactor `src/components/job-application-details.tsx` to match the new signature of `generateTailoredResume`, and verify it compiles without errors.

## 2. UI Component Update

- [x] 2.1 Add new state variables (`isGenerationModalOpen`, `generationLanguage`, `generationMode`) in `src/components/job-analysis.tsx` to manage the modal state, and verify they initialize correctly.
- [x] 2.2 Create the new generation modal UI in `src/components/job-analysis.tsx` that replaces the previous "Save to History" and "Generate" flows. It should include `Job Title`, `Company`, and `Language` selection, and two action buttons. Verify the modal opens and closes correctly.
- [x] 2.3 Implement the `Generate without saving` logic in the modal to call `generateTailoredResume` using only `jobDescription`, `modelId`, and `language`, and verify it successfully displays the resume without creating DB records.
- [x] 2.4 Implement the `Generate and save` logic in the modal. It should first call a real server action (e.g., `createJobApplication`) to save the job in the database, then call `generateTailoredResume` with the returned `jobApplicationId`, and verify both the DB record and resume are created and linked successfully.
