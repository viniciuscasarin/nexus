## Context

This project initializes a new web application from scratch. We need to set up the foundation for managing a master resume and generating targeted resumes using AI. See `proposal.md` for the motivation and `specs/**/*.md` for the behavioral requirements. 

## Goals / Non-Goals

**Goals:**
- Establish the Next.js (App Router) architectural foundation.
- Design the SQLite data model for storing the master resume data.
- Define the AI integration strategy.
- Set up the UI framework (shadcn/ui + TailwindCSS) for form management.

**Non-Goals:**
- Deployment to cloud infrastructure (this is a local-first application).
- User authentication and multi-tenant support.
- Complex resume templating engine (we will focus on a single high-fidelity template for now).

## Decisions

### 1. Database and ORM
- **Decision:** SQLite with Prisma.
- **Rationale:** The application is local-first and meant for a single user. SQLite requires no background services, making it perfect for a desktop-like local web app. Prisma provides excellent TypeScript safety and an easy migration path.
- **Alternatives Considered:** JSON files (too brittle for complex relational resume data), PostgreSQL (requires Docker or local server setup, overkill for this use case).

### 2. UI and Form Management
- **Decision:** `shadcn/ui` with `react-hook-form` and `zod`.
- **Rationale:** The master resume form will be highly complex with many nested dynamic fields (e.g., multiple jobs, each with multiple bullet points). `react-hook-form` is performant for large forms, and `zod` ensures data matches the Prisma schema before insertion.
- **Alternatives Considered:** Formik (slower for complex forms), raw HTML forms (too much boilerplate for validation).

### 3. AI Integration
- **Decision:** Modular abstraction layer for AI generation, starting with Gemini (via `@google/genai` or API keys).
- **Rationale:** We need to parse job descriptions and tailor resumes. An abstraction layer allows swapping models later without changing the core application logic.

### 4. PDF Export
- **Decision:** Standard browser print (CSS `@media print`).
- **Rationale:** Keeping it simple initially with CSS print styles reduces dependencies and relies on native browser capabilities for high-fidelity PDF generation.
- **Alternatives Considered:** `pdfkit` (complex layout building), `puppeteer` (heavy dependency for a simple app).

## Risks / Trade-offs

- **[Risk] Complex Form State Management:** A single master form for an entire resume can become sluggish.
  - **Mitigation:** Use `useFieldArray` from `react-hook-form` and split the form into logical tabs or sections (Personal, Experience, Education) to avoid rendering the entire tree constantly.
- **[Risk] AI Hallucinations:** The AI might invent skills or experiences not present in the master resume.
  - **Mitigation:** Strictly prompt the AI to only use the provided master data and output structured JSON, then map that JSON back to the UI for user review before PDF generation.
