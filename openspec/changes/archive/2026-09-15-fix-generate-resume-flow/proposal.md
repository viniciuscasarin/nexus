## Why

Currently, generating a tailored resume from the Job Analysis screen fails because it assumes the job application has already been saved to the database. Additionally, users lack the ability to select the language of the generated resume, and they are forced to either save the job or face an error. This change fixes the user experience by unifying the intent into a single generation flow that supports both ad-hoc generation (without saving) and generation linked to a new saved job application, complete with language selection.

## What Changes

- Introduces a new configuration modal when clicking "Generate Tailored Resume".
- Adds language selection for the generated resume (e.g., English, Portuguese, Spanish).
- Adds an option to "Generate without saving", allowing users to test generation without creating a job application record.
- Adds an option to "Generate and save", which requires Job Title and Company, creates the job application record, and links the generated resume to it.
- Updates the `generateTailoredResume` server action to support receiving a `jobDescription` and `language` directly without requiring an existing `jobApplicationId`.

## Capabilities

### New Capabilities

### Modified Capabilities
- `resume-generation`: The system SHALL allow generating an optimized resume version either ad-hoc using a provided job description, or by linking it to a saved job application, and MUST allow the user to select the output language.

## Impact

- `src/components/job-analysis.tsx`: Will be updated to replace the direct generation call with a unified modal for configuration and saving.
- `src/app/actions/generate.ts`: `generateTailoredResume` will be refactored to handle ad-hoc generation and language injection in the prompt.
- `src/components/job-application-details.tsx`: Will need to adapt if the signature of `generateTailoredResume` changes.
