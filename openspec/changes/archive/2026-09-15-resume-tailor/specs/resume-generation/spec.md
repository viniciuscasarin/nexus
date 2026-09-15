## Purpose
Generates tailored and optimized versions of the resume using AI, targeting specific job descriptions.

## ADDED Requirements

### Requirement: Generate tailored resume
The system SHALL generate an optimized resume version by combining the master data and the job description analysis using an AI provider.

#### Scenario: User generates tailored resume
- **WHEN** the user requests a tailored resume for an analyzed job
- **THEN** the system generates a new resume version highlighting the relevant experiences

### Requirement: Export tailored resume
The system SHALL allow the user to export the generated resume to a high-fidelity PDF format.

#### Scenario: User exports to PDF
- **WHEN** the user clicks the export button on a tailored resume
- **THEN** the system generates and downloads a visually formatted PDF version
