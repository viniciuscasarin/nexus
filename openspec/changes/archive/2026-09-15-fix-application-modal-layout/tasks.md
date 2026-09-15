## 1. Modal Layout and State Updates

- [x] 1.1 Add `activeView` state (`'main' | 'description' | 'resume'`) to `JobApplicationDetails` and verify state updates without errors.
- [x] 1.2 Add `break-words` and `overflow-x-hidden` classes to the `DialogContent` container and verify that long strings no longer cause horizontal scrolling.

## 2. Drill-down Navigation

- [x] 2.1 Replace the inline "Job Description" content with an outlined button (`<Button variant="outline">`) in the main view and verify the button appears.
- [x] 2.2 Replace the inline "Tailored Resume" success message with an outlined button in the main view and verify the button appears.
- [x] 2.3 Implement the drill-down conditional rendering: when `activeView` is `'description'`, show only the description text with a "Back" button; when `'resume'`, show the `TailoredResumeView` (or the resume content) with a "Back" button. Verify that clicking the buttons navigates between views correctly.
