## Purpose

Provides a history of job descriptions the user has analyzed and chosen to save for future reference, preventing the need to re-analyze identical jobs.

## ADDED Requirements

### Requirement: Save job analysis
The system SHALL allow users to explicitly save the result of a job analysis along with the job details (title, company).

#### Scenario: User saves an analyzed job
- **WHEN** the user opts to save a completed job analysis providing a title and company
- **THEN** the system persists the job description, title, company, and analysis results to the database

### Requirement: List saved job analyses
The system SHALL display a list of all previously saved job analyses.

#### Scenario: User views their history
- **WHEN** the user navigates to the history view
- **THEN** the system displays a list of saved jobs, showing the title, company, date, and compatibility score
