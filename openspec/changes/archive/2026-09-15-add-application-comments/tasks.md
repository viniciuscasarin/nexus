## 1. Database & Schema

- [x] 1.1 Update `schema.prisma` to add the `Comment` model and its relation to `JobApplication`, and verify by running `npx prisma format` without errors.
- [x] 1.2 Push the database schema changes, and verify the `Comment` table is created by running `npx prisma db push`.

## 2. Server Actions

- [x] 2.1 Implement `addComment` server action in `src/app/actions/job-application.ts` to accept job application ID and content, and verify it executes without errors.
- [x] 2.2 Ensure the fetch method providing data to `JobApplicationDetails` includes the `comments` relation, and verify the data includes comments.

## 3. User Interface

- [x] 3.1 Update `JobApplicationDetails` component to display the comment history with a `max-h-48 overflow-y-auto` container, and verify it renders existing comments.
- [x] 3.2 Add a text area and submit button to `JobApplicationDetails` for adding new comments, and verify that submitting a comment updates the UI successfully.
