# job-application-tracker Specification

## Purpose
Enables users to manage and track job applications across different stages in a Kanban board.

## Requirements

### Requirement: Manage job applications
The system SHALL allow users to create and track job applications, maintaining details such as title, company, link, and description.

#### Scenario: User creates a new job application
- **WHEN** the user inputs job details and saves
- **THEN** a new job application is created in the "INTERESSADO" column of the Kanban board

### Requirement: Track application status
The system SHALL allow users to move job applications between different status columns on the Kanban board using drag-and-drop.

#### Scenario: User moves application to a new stage
- **WHEN** the user drags a job application card from "INTERESSADO" to "CANDIDATADO"
- **THEN** the application status is updated and saved to reflect the new stage

### Requirement: Application comments history
The system SHALL allow users to record and view timestamped comments/notes on a specific job application.

#### Scenario: User adds a new comment
- **WHEN** the user submits a new comment text in the job application modal
- **THEN** the comment is saved with the current timestamp and displayed in the application's comment history

### Requirement: Drop job application
The system SHALL allow users to move job applications that are no longer being considered into a "DROPPED" column.

#### Scenario: User drops an application
- **WHEN** the user drags a job application card into the "DROPPED" column
- **THEN** the application status is updated to "DROPPED" and saved
