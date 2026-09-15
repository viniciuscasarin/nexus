## Context

See `proposal.md` for the motivation. This change implements simple UI refinements to standardizes headers, add internal scrolling to the Job Description textarea, and convert single-line inputs into textareas for specific Resume Data fields.

## Goals / Non-Goals

**Goals:**
- Implement consistent typography for headings (`<h1>`, `<h2>`, `<h3>`).
- Enhance `Textarea` in `job-analysis.tsx` by enabling `overflow-y-auto`.
- Replace `<Input />` with `<Textarea />` in `master-form.tsx` for longer fields, making them vertically resizable.

**Non-Goals:**
- Changing overall layouts or implementing a new design system.
- Introducing new UI components.

## Decisions

- **Header Standardization**: We will use consistent Tailwind classes (`text-3xl font-bold tracking-tight` for H1, `text-xl font-bold mb-4` for H2, `font-semibold text-lg` for H3) directly on the existing tags to avoid over-engineering.
- **Scrollable Textarea**: Appending `overflow-y-auto` to the `job-analysis.tsx` textarea is preferred over custom CSS or JS-based auto-resizing, keeping it native and lightweight.
- **Resume Data Fields**: Substituting `<Input />` with `<Textarea className="resize-y" />` is straightforward as both components share the same base props interface, minimizing friction with React Hook Form.

## Risks / Trade-offs

- **Risk:** Existing forms might break visually if the `Textarea` component takes too much space by default.
  **Mitigation:** We will ensure `resize-y` is applied and we will use appropriate `min-h` classes to provide a good initial size.
