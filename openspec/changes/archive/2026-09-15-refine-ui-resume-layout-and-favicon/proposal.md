## Why

The current UI lacks polish in a few key areas: the page titles simply default to "Create Next App", the resume section forms occupy too much vertical space without being collapsible, and the app lacks a custom favicon. Addressing these will significantly improve the perceived quality, usability, and branding of the application.

## What Changes

- Update `src/app/layout.tsx` to configure structured Next.js metadata (template-based page titles).
- Add specific `metadata` exports to each dashboard page (`resume`, `analysis`, `applications`, `history`).
- Refactor `src/components/master-form.tsx` to make the "Personal Information", "Experience", "Education", and "Skills" card sections collapsible (using React `useState` and Lucide icons).
- Replace the default Next.js `favicon.ico` with a custom-generated one to improve branding.

## Capabilities

### New Capabilities
None.

### Modified Capabilities
None. This is a pure UI refinement. The `.openspec.yaml` must be updated with `skip_specs: true`.

## Impact

- `src/app/layout.tsx` (Metadata setup)
- Dashboard page components (Metadata overrides)
- `src/components/master-form.tsx` (State management for collapsible UI)
- `src/app/favicon.ico` (Asset replacement)
