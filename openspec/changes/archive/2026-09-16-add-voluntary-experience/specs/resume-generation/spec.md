## MODIFIED Requirements

### Requirement: Generate tailored resume
The system SHALL generate an optimized resume version by combining the master data — including voluntary experiences — and the job description analysis using an AI provider. The system MUST allow generating an ad-hoc resume without linking it to a job application, or MUST save the job application and link the generated resume. The system MUST allow the user to select the output language of the generated resume. When voluntary experiences exist in the master data, the system SHALL include a dedicated "Voluntary Experience" section in the generated resume.

#### Scenario: User generates tailored resume and saves
- **WHEN** the user requests a tailored resume and chooses to save the job application with a selected language
- **THEN** the system generates a new resume version in the chosen language, saves it as a reusable entity, creates the job application record, and links it

#### Scenario: User generates ad-hoc resume without saving
- **WHEN** the user requests a tailored resume and chooses to generate without saving, selecting a language
- **THEN** the system generates a new resume version in the chosen language and displays it, but does not create a job application record

#### Scenario: Voluntary experiences appear in tailored resume
- **WHEN** the master resume contains voluntary experiences and the user generates a tailored resume
- **THEN** the generated resume includes a dedicated "Voluntary Experience" section with only the voluntary experiences relevant to the job description

#### Scenario: No voluntary experience section when empty
- **WHEN** the master resume contains no voluntary experiences and the user generates a tailored resume
- **THEN** the generated resume does not include a "Voluntary Experience" section
