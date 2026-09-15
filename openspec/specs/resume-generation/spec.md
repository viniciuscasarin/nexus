# resume-generation Specification

## Purpose
Generates tailored and optimized versions of the resume using AI, targeting specific job descriptions.

## Requirements

### Requirement: Generate tailored resume
The system SHALL generate an optimized resume version by combining the master data and the job description analysis using an AI provider. The system MUST allow generating an ad-hoc resume without linking it to a job application, or MUST save the job application and link the generated resume. The system MUST allow the user to select the output language of the generated resume.

#### Scenario: User generates tailored resume and saves
- **WHEN** the user requests a tailored resume and chooses to save the job application with a selected language
- **THEN** the system generates a new resume version in the chosen language, saves it as a reusable entity, creates the job application record, and links it

#### Scenario: User generates ad-hoc resume without saving
- **WHEN** the user requests a tailored resume and chooses to generate without saving, selecting a language
- **THEN** the system generates a new resume version in the chosen language and displays it, but does not create a job application record

### Requirement: Export tailored resume
The system SHALL allow the user to export the generated resume to a high-fidelity PDF format.

#### Scenario: User exports to PDF
- **WHEN** the user clicks the export button on a tailored resume
- **THEN** the system generates and downloads a visually formatted PDF version

### Requirement: Reuse tailored resume
The system SHALL allow users to select a previously generated tailored resume and link it to a different job application instead of generating a new one.

#### Scenario: User selects an existing resume
- **WHEN** the user chooses an existing generated resume for a new job application
- **THEN** the job job application is linked to that existing resume without triggering a new AI generation
