# job-analysis Specification

## Purpose
Analyzes job descriptions provided by the user to evaluate compatibility against the master resume data.

## Requirements

### Requirement: Analyze job description compatibility
The system SHALL evaluate a given job description against the user's master resume data to identify matching skills and gaps, allowing the user to select which LLM model will perform the analysis from the available providers.

#### Scenario: User provides a job description
- **WHEN** the user selects an available LLM model and submits a job description text for analysis
- **THEN** the system uses the selected model to analyze the text, returns a compatibility score, and highlights missing skills
