## MODIFIED Requirements

### Requirement: Manage master resume data
The system SHALL allow users to input, edit, and view their complete resume information, including personal details, experiences, and skills. Skills MUST require a description instead of a level.

#### Scenario: User saves master data
- **WHEN** the user submits the master form with valid data, including skill descriptions
- **THEN** the system persists the data to the SQLite database

#### Scenario: User views master data
- **WHEN** the user navigates to the master data section
- **THEN** the system retrieves and displays the current data from the database, including skill descriptions
