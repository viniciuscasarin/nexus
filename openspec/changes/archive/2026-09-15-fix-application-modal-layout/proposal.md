## Why

The Job Application Details modal currently suffers from excessive horizontal and vertical scrolling. Long, unbroken texts (like URLs in the job description) stretch the modal width, causing horizontal scroll. Meanwhile, the long text content makes vertical navigation cumbersome. This change improves the UX by ensuring content fits the viewport width and adopting a "drill-down" navigation approach for long text sections, keeping the initial modal view clean.

## What Changes

- Add `break-words` and `overflow-x-hidden` to the modal content container to prevent horizontal stretching.
- Transform the "Job Description" and "Tailored Resume" sections in the initial modal view into outlined buttons.
- Implement a drill-down state (view-swapping) in the modal: clicking these buttons replaces the modal's content with the selected text (description or resume) and displays a "Back" button to return to the main details view.

## Capabilities

### New Capabilities
None.

### Modified Capabilities
None. (This is a pure UI layout enhancement and does not change behavioral requirements. Marked with `skip_specs: true`).

## Impact

- `src/components/job-application-details.tsx`
