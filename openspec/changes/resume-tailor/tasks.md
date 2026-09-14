## 1. Project Initialization

- [x] 1.1 Scaffold Next.js application with Tailwind CSS and verify the default homepage loads at `localhost:3000`.
- [x] 1.2 Initialize shadcn/ui and add core components (form, input, button, card) and verify they are available in `components/ui`.
- [x] 1.3 Initialize Prisma with SQLite provider, define the Master Resume schema, and verify `prisma generate` and `prisma db push` succeed.

## 2. Master Data Management (resume-master-data)

- [x] 2.1 Create the Prisma models for PersonalInfo, Experience, Education, and Skills, then verify the local SQLite db has these tables.
- [x] 2.2 Implement the `react-hook-form` Master Form UI with `zod` validation and verify it renders without errors.
- [ ] 2.3 Implement the Next.js server actions or API routes to save and load master data, then verify data persists in SQLite upon form submission.

## 3. Job Analysis (job-analysis)

- [ ] 3.1 Create the UI component for pasting a job description and verify the text state is captured.
- [ ] 3.2 Implement the AI analysis service layer using the Gemini SDK to compare the job against the master data and verify it returns a structured JSON response (missing skills, score).
- [ ] 3.3 Integrate the analysis service with the UI to display the compatibility results and verify the frontend shows the correct score and missing skills.

## 4. Tailored Resume Generation (resume-generation)

- [ ] 4.1 Implement the AI generation service that takes the job description and master data to output a tailored JSON resume and verify it returns valid structured data.
- [ ] 4.2 Create the high-fidelity UI layout for the tailored resume (preview screen) and verify it maps the AI output correctly to the design.
- [ ] 4.3 Add the print/export functionality using CSS `@media print` and verify that triggering print hides the application chrome and only shows the resume pages.
