## MODIFIED Requirements

### Requirement: Manage master resume data
The system SHALL allow users to input, edit, and view their complete resume information, including personal details, professional experiences, voluntary experiences, and skills.

#### Scenario: User saves master data
- **WHEN** the user submits the master form with valid data
- **THEN** the system persists all data — including voluntary experiences — to the SQLite database

#### Scenario: User views master data
- **WHEN** the user navigates to the master data section
- **THEN** the system retrieves and displays the current data from the database, including the voluntary experiences section
