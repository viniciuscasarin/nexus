## 1. Backend Error Propagation

- [x] 1.1 Update `generateTailoredResume` in `src/app/actions/generate.ts` to detect 503 errors and throw `"AI_MODEL_OVERLOADED"`. Verify by checking that other errors still throw the generic message.
- [x] 1.2 Update `analyzeJob` in `src/app/actions/analyze.ts` to detect 503 errors and throw `"AI_MODEL_OVERLOADED"`. Verify by ensuring the function successfully catches and re-throws the specific string.

## 2. Frontend UX Handling

- [x] 2.1 Update `src/components/job-analysis.tsx` to intercept `"AI_MODEL_OVERLOADED"` in `handleGenerateAdhoc` and `handleGenerateAndSave`. Trigger a `toast.error` with a Retry action pointing back to the respective function. Verify by triggering a manual throw in the action and seeing the toast with the retry button.
- [x] 2.2 Update `src/components/job-analysis.tsx` to intercept `"AI_MODEL_OVERLOADED"` in the `analyzeJob` catch block (if applicable). Verify the toast is shown.
- [x] 2.3 Update `src/components/job-application-details.tsx` to intercept `"AI_MODEL_OVERLOADED"` in `handleGenerate`. Trigger a `toast.error` (adding `sonner` if not imported) with a Retry action. Verify by manually throwing the error and checking the toast appearance.
