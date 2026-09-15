## MODIFIED Requirements

### Requirement: Generate tailored resume
The system SHALL generate an optimized resume version by combining the master data and the job description analysis using an AI provider, and MUST link the generated resume to the specific job application while allowing it to be reused independently.

#### Scenario: User generates tailored resume
- **WHEN** the user requests a tailored resume from within a job application modal
- **THEN** the system generates a new resume version, saves it as a reusable entity, and links it to that job application

## ADDED Requirements

### Requirement: Reuse tailored resume
The system SHALL allow users to select a previously generated tailored resume and link it to a different job application instead of generating a new one.

#### Scenario: User selects an existing resume
- **WHEN** the user chooses an existing generated resume for a new job application
- **THEN** the job application is linked to that existing resume without triggering a new AI generation
