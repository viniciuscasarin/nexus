# resume-generation Specification

## Purpose
Generates tailored and optimized versions of the resume using AI, targeting specific job descriptions.

## Requirements

### Requirement: Generate tailored resume
The system SHALL generate an optimized resume version by combining the master data and the job description analysis using an AI provider, and MUST link the generated resume to the specific job application while allowing it to be reused independently.

#### Scenario: User generates tailored resume
- **WHEN** the user requests a tailored resume from within a job application modal
- **THEN** the system generates a new resume version, saves it as a reusable entity, and links it to that job application

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
