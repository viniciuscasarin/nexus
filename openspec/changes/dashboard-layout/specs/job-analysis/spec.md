## MODIFIED Requirements

### Requirement: Analyze job description compatibility
The system SHALL evaluate a given job description against the user's master resume data to identify matching skills and gaps, and provide the option to save the analysis.

#### Scenario: User provides a job description
- **WHEN** the user submits a job description text for analysis
- **THEN** the system returns a compatibility score and highlights missing skills
- **THEN** the system presents an option to save the analysis to the job history
