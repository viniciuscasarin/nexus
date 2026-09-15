## Why

During the job application process, users need a way to keep track of interactions, next steps, and useful notes for each application. Currently, the application provides no space to record these details, forcing users to rely on external tools. Adding a comment history directly to the application modal solves this issue.

## What Changes

- Add a new `Comment` model to the Prisma schema, establishing a one-to-many relationship with `JobApplication`.
- Update the job application details modal to include a scrollable area displaying the history of comments, ordered by date.
- Add an input area and a "Save" button to submit new comments for a specific job application.
- Implement a server action to handle the creation of comments.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `job-application-tracker`: Adding a requirement to support recording and displaying timestamped comments/notes for each tracked job application.

## Impact

- **Database**: `schema.prisma` will require a migration to include the `Comment` model.
- **Backend API**: New server actions will be needed to fetch and create comments.
- **UI Components**: `job-application-details.tsx` will be modified to accommodate the new comments section layout.
