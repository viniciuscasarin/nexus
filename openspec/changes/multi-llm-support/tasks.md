## 1. Setup

- [x] 1.1 Install Vercel AI SDK dependencies (`ai`, `@ai-sdk/google`, `@ai-sdk/openai`, `@ai-sdk/anthropic`) and verify installation succeeds in package.json.
- [ ] 1.2 Add the shadcn/ui Select component via CLI (`npx shadcn@latest add select`) and verify the files are generated in `src/components/ui`.
- [ ] 1.3 Setup testing framework (install Jest/Vitest and React Testing Library if not already present) and verify the test script runs successfully.

## 2. Core Implementation

- [ ] 2.1 Create the `getAvailableModels` server action (in a new file or existing action file) that checks `.env` variables and returns a list of active models. Verify by calling it locally with different env variables.
- [ ] 2.2 Write unit tests for `getAvailableModels` mocking `process.env` to ensure it returns the correct list when all, some, or no keys are present. Verify tests pass.

## 3. UI Update

- [ ] 3.1 Update the `JobAnalysis` component to fetch `getAvailableModels` on mount and populate the new `Select` dropdown. Verify the dropdown renders correctly in the browser.
- [ ] 3.2 Update `JobAnalysis` state to hold the selected `modelId` and ensure it's required before allowing analysis or generation. Verify the button is disabled when no model is selected.

## 4. AI Integration Refactor

- [ ] 4.1 Refactor `analyzeJob` action to accept `modelId` as a parameter and use `generateObject` from the `ai` package instead of `@google/genai`. Verify it works with a valid model id.
- [ ] 4.2 Refactor `generateTailoredResume` action to accept `modelId` as a parameter and use `generateObject`. Verify the generation output matches the previous schema structure.
- [ ] 4.3 Remove the now unused `@google/genai` dependency and clean up any leftover code. Verify the app builds without errors.
