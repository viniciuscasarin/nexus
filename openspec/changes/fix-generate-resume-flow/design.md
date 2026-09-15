## Context
The application needs to combine job analysis with an AI-generated tailored resume. See `proposal.md` for motivation.

## Goals / Non-Goals

**Goals:**
- Unify the UX by placing language selection, job saving, and resume generation within a single modal.
- Allow generating a tailored resume with or without saving the job application to the database.
- Support selecting the target language for the tailored resume.

**Non-Goals:**
- Completely overhauling the database schema.
- Changing the Kanban column structure.

## Decisions

### 1. Refactor `generateTailoredResume` signature
**Decision:** The Server Action `generateTailoredResume` will be updated to accept a structured object containing optional `jobApplicationId` and `jobDescription`, along with the `modelId` and `language`.
**Rationale:** This avoids creating separate functions for ad-hoc generation vs. generation linked to a saved job. 
**Alternatives Considered:** Creating a separate `generateAdhocTailoredResume` function. Decided against it to keep the generation logic centralized, since both use the same AI pipeline and schema.

### 2. Language Injection in Prompt
**Decision:** We will inject the `language` string directly into the system prompt for the `generateObject` call, e.g., "The output MUST be written entirely in ${language}."
**Rationale:** Modern LLMs handle language translations very well if specified clearly in the prompt.
**Alternatives Considered:** Updating the Zod schema keys to match the language. This would break the front-end components that expect specific keys (e.g., `personalInfo`, `experience`). We'll keep the JSON structure keys in English and just translate the values.

### 3. Unified Generation Modal Component
**Decision:** We will introduce a new state in `JobAnalysis` to open a configuration modal when "Generate Tailored Resume" is clicked.
**Rationale:** The modal provides a clean way to ask for `Language`, `Job Title`, and `Company` simultaneously. Two buttons ("Generate without saving", "Generate and save") explicitly capture the user's intent.

## Risks / Trade-offs

- **Risk:** AI might translate the JSON keys instead of just the values, breaking the `TailoredResumeSchema`.
  - **Mitigation:** The prompt must explicitly state: "Keep all JSON keys exactly as defined in the schema, but translate the string values into the specified language."
