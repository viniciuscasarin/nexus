## Why

The current `Skill` schema captures a "level" (e.g., beginner, advanced), which is often vague and subjective. Replacing `level` with a mandatory `description` provides a richer context—detailing how and where a skill was used, years of experience, and specific applications. This rich context enables the AI to generate much better, more tailored resumes.

## What Changes

- **BREAKING**: Remove `level` from the `Skill` model and Zod validations, replacing it with a required `description` field.
- Update the Master Resume form UI to replace the `level` text input with a `description` textarea.
- Adjust the AI prompt in `generateTailoredResume` to consume the skill's description as context for generating the tailored resume.
- Update the tailored resume schema and `tailored-resume.tsx` to include and render the skill description in the final resume output when applicable.

## Capabilities

### New Capabilities

### Modified Capabilities
- `resume-master-data`: Updating the skill schema to require a description instead of a level.
- `resume-generation`: Updating the generation logic to use the new skill descriptions as context and include them in the generated resume.

## Impact

- `prisma/schema.prisma`: Schema change, requires a database migration.
- `src/lib/schema.ts` & `src/lib/validations/resume.ts`: Validation schema updates.
- `src/components/master-form.tsx`: UI change for the skill inputs.
- `src/app/actions/resume.ts`: Server action for saving master data.
- `src/app/actions/generate.ts`: AI generation prompt and schema updates.
- `src/components/tailored-resume.tsx`: Render logic for the new tailored resume schema.
