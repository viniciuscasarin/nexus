## 1. Database and Schemas

- [x] 1.1 Update `Skill` model in `prisma/schema.prisma` to replace `level` with `description` (String) and verify by running `npx prisma db push` successfully.
- [x] 1.2 Update `skillSchema` in `src/lib/schema.ts` and `src/lib/validations/resume.ts` to replace `level` with `description` and verify by checking for no TS errors in those files.
- [x] 1.3 Update the tailored resume schema in `src/app/actions/generate.ts` to expect `description` in the skills array instead of `category` (or alongside it) and verify compilation.

## 2. Master Form UI Updates

- [x] 2.1 Update `src/components/master-form.tsx` to replace the "Skill Name" and "Level" inputs with "Skill" (input) and "Description" (textarea) and verify the form renders correctly.
- [x] 2.2 Update `src/app/actions/resume.ts` to properly map and save the `description` field when persisting master data and verify by saving a test skill in the UI.

## 3. AI Generation Updates

- [x] 3.1 Update the system prompt in `src/app/actions/generate.ts` to instruct the AI to consume skill descriptions as context and to include synthesized skill descriptions in the output. Verify by generating a tailored resume and observing the description in the console or response payload.
- [x] 3.2 Update `src/components/tailored-resume.tsx` to render the skill description under each skill (if present) and verify visually in the browser.
