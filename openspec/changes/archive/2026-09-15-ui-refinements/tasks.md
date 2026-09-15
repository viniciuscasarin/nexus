## 1. UI Refinements

- [x] 1.1 Update Headers: Apply standard typography classes to H1, H2, and H3 tags across `src/app/(dashboard)/layout.tsx`, `src/components/tailored-resume.tsx`, and `src/components/job-analysis.tsx`. Verify visually by rendering these pages and checking header consistency.
- [x] 1.2 Update Analysis Textarea: Add `overflow-y-auto` to the `Textarea` component in `src/components/job-analysis.tsx`. Verify by pasting a very long text into the textarea and confirming it scrolls internally instead of expanding the page height.
- [x] 1.3 Update Resume Data Textareas: Import `Textarea` and replace `<Input />` with `<Textarea className="resize-y" />` for the "Professional Summary" and experience "Description" fields in `src/components/master-form.tsx`. Verify by checking if the fields are vertically resizable text areas.
