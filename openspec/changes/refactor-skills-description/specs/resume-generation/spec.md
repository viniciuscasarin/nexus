## MODIFIED Requirements

### Requirement: Generate tailored resume
The system SHALL generate an optimized resume version by combining the master data and the job description analysis using an AI provider. The generation MUST utilize the skill descriptions from the master data as context to produce a highly tailored resume, and MUST include the skill descriptions in the generated output. The system MUST allow generating an ad-hoc resume without linking it to a job application, or MUST save the job application and link the generated resume. The system MUST allow the user to select the output language of the generated resume.

#### Scenario: User generates tailored resume and saves
- **WHEN** the user requests a tailored resume and chooses to save the job application with a selected language
- **THEN** the system generates a new resume version in the chosen language (including tailored skill descriptions), saves it as a reusable entity, creates the job application record, and links it

#### Scenario: User generates ad-hoc resume without saving
- **WHEN** the user requests a tailored resume and chooses to generate without saving, selecting a language
- **THEN** the system generates a new resume version in the chosen language (including tailored skill descriptions) and displays it, but does not create a job application record
