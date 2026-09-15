## Why

The current UI has some inconsistencies and usability issues:
- Headers across different pages (`job-analysis.tsx`, `tailored-resume.tsx`, `layout.tsx`) use inconsistent styling and sizing.
- The Job Description textarea in the Analysis page pushes content down when large text is pasted, instead of having an internal scroll.
- The "Professional Summary" and "Description" fields in the Master Resume form use single-line `<Input />` components, which makes it hard to type and review long texts.

This change refines these UI elements to improve the overall user experience and visual consistency.

## What Changes

- **Standardize Headers**: Apply consistent typography classes across pages for H1, H2, and H3 elements to maintain visual harmony.
- **Analysis Textarea**: Add `overflow-y-auto` to the Job Description textarea in `job-analysis.tsx` so it scrolls internally rather than expanding infinitely.
- **Resume Data Textareas**: Replace `<Input />` with `<Textarea />` for "Professional Summary" and experience "Description" fields in `master-form.tsx`, adding the `resize-y` class so they can be resized vertically.

## Capabilities

### New Capabilities
None

### Modified Capabilities
None (This change is UI-only and does not modify spec-level behavior).

## Impact

- **Affected Code**: `src/app/(dashboard)/layout.tsx`, `src/components/job-analysis.tsx`, `src/components/tailored-resume.tsx`, `src/components/master-form.tsx`, and potentially `src/components/page-header.tsx`.
- **APIs/Systems**: None. Purely frontend UI refinements.
