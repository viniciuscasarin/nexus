## 1. Metadata and Layout

- [x] 1.1 Update `src/app/layout.tsx` to include structured `metadata` with a `template` property (e.g., `title: { template: '%s | Nexus', default: 'Nexus' }`). Verify by checking the root HTML `<title>` tag.
- [x] 1.2 Add a specific `metadata` export to `src/app/(dashboard)/resume/page.tsx`. Verify by navigating to the page and checking the browser tab title.
- [x] 1.3 Add a specific `metadata` export to `src/app/(dashboard)/analysis/page.tsx`. Verify by navigating to the page and checking the browser tab title.
- [x] 1.4 Add a specific `metadata` export to `src/app/(dashboard)/applications/page.tsx`. Verify by navigating to the page and checking the browser tab title.
- [x] 1.5 Add a specific `metadata` export to `src/app/(dashboard)/history/page.tsx`. Verify by navigating to the page and checking the browser tab title.

## 2. Form UI Enhancements

- [x] 2.1 Refactor `src/components/master-form.tsx` to use `useState` for toggling the visibility of the "Personal Information" `CardContent` and add a Chevron icon button to the header. Verify by clicking the chevron and ensuring the content collapses/expands.
- [x] 2.2 Refactor `src/components/master-form.tsx` to apply the same toggle logic and Chevron button to the "Experience" section. Verify the collapse/expand behavior.
- [x] 2.3 Refactor `src/components/master-form.tsx` to apply the same toggle logic and Chevron button to the "Education" section. Verify the collapse/expand behavior.
- [x] 2.4 Refactor `src/components/master-form.tsx` to apply the same toggle logic and Chevron button to the "Skills" section. Verify the collapse/expand behavior.

## 3. Favicon

- [x] 3.1 Use a tool to generate a new logo/icon image and replace `src/app/favicon.ico`. Verify by reloading the page and confirming the new favicon is displayed in the browser tab.
