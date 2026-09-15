## Context

See proposal.md - Why. Currently, the server actions catch API errors and throw generic messages like `"Failed to generate tailored resume."`. This prevents the frontend from displaying specific, actionable error messages, particularly when the AI model is temporarily overloaded (HTTP 503).

## Goals / Non-Goals

**Goals:**
- Identify HTTP 503 overload errors from the AI provider in server actions.
- Propagate a specific error code/message to the React frontend.
- Display a user-friendly Sonner toast with a "Retry" action when this specific error occurs.

**Non-Goals:**
- Implementing a full-blown retry mechanism inside the server actions (we want to let the user control the retry via the UI).
- Handling every possible AI error specifically (focusing only on the overload scenario for now).

## Decisions

### 1. Error Propagation Strategy
**Decision:** We will throw a specific Error message string (`"AI_MODEL_OVERLOADED"`) from the server action when a 503 is detected.
**Rationale:** Next.js Server Actions can strip complex Error objects in production, but standard thrown Error messages (or specific known strings) can usually be matched on the client side. Alternatively, we could change the server action return signature to `{ success: false, error: "..." }`, but that would require refactoring all consumers of `generateTailoredResume` and `analyzeJob`. Throwing a specific string is the most localized change.
**Alternative Considered:** Changing the return type to an `ActionState` object. Rejected because it requires broader refactoring of the calling components and type definitions.

### 2. Frontend UX (Toast with Retry)
**Decision:** In the catch blocks of `job-analysis.tsx` and `job-application-details.tsx`, we will check if `err.message` includes `"AI_MODEL_OVERLOADED"` (or `"503"` from the original error if it leaks). If matched, we trigger `toast.error` with a localized message and an `action` config pointing to the respective retry function (e.g., `handleGenerateAdhoc`).
**Rationale:** Provides an immediate, frictionless way for the user to try again without having to close the modal or find the button again.

## Risks / Trade-offs

- **Risk:** Next.js might mask the thrown error message in production (returning a generic "An error occurred in the Server Components render" or digest).
- **Mitigation:** If this occurs, we might need to fallback to returning the error as a value (e.g., `{ error: "AI_MODEL_OVERLOADED" }`) instead of throwing it. We will try throwing first as it requires less refactoring.
