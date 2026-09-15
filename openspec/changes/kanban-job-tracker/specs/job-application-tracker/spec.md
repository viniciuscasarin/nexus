## Purpose

Enables users to manage and track job applications across different stages in a Kanban board.

## ADDED Requirements

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
