## Context

As described in the proposal, we are refining the UI. The current `master-form.tsx` renders large forms that can be overwhelming to scroll through. Page titles are not customized per page, defaulting to "Create Next App", and the application lacks a custom favicon.

## Goals / Non-Goals

**Goals:**
- Make sections inside `master-form.tsx` collapsible to improve UX and reduce vertical scrolling.
- Apply consistent and descriptive metadata (page titles) across the application.
- Add a custom favicon.

**Non-Goals:**
- Redesigning the entire application theme or color scheme.
- Refactoring the form validation schema.

## Decisions

- **Collapsible Sections:** We will use standard React `useState` for toggling the `CardContent` within `master-form.tsx`, rather than installing an external accordion component. This keeps dependencies low and works perfectly for our use case. We'll use `ChevronDown` and `ChevronUp` icons from `lucide-react`.
- **Metadata Management:** We will use the Next.js App Router `metadata` object in the root `layout.tsx` with a `template` property. Individual pages will export their own `metadata` objects that plug into this template.

## Risks / Trade-offs

- None identified. The changes are local UI refinements with no breaking changes to data structures.
