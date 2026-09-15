## Why

The Gemini API occasionally returns a 503 (Service Unavailable) error when the model is experiencing high demand. Currently, the server actions catch this and throw a generic "Failed to generate tailored resume" error, hiding the true cause from the user. We need to intercept this specific overload error and show the user a friendly toast with a "Try again" action, improving the UX and transparency when AI services are temporarily unavailable.

## What Changes

- Catch the 503 Overloaded error in the backend server actions (`generateTailoredResume` and `analyzeJob`).
- Throw a recognizable error code/message (e.g., `AI_MODEL_OVERLOADED`) instead of a generic one.
- In the frontend components (`job-analysis.tsx` and `job-application-details.tsx`), intercept this specific error message.
- Display a Sonner toast notifying the user of the temporary overload.
- Include an action button in the toast to quickly retry the failed operation.

## Capabilities

### New Capabilities
None

### Modified Capabilities
None

## Impact

- `src/app/actions/generate.ts`
- `src/app/actions/analyze.ts`
- `src/components/job-analysis.tsx`
- `src/components/job-application-details.tsx`
