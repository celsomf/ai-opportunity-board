# Feature Specification: AI Opportunity Board

**Feature Branch**: `001-ai-opportunity-board`

**Created**: 2026-08-18

**Status**: Draft

**Input**: User description of the AI Opportunity Board application

## Clarifications

### Session 2026-08-18
- - Q: Should opportunity names be unique? → A: No uniqueness constraint. Multiple opportunities can share the same name.
- - Q: How should opportunities with the same score be ordered? → A: Sorted by creation date/time (most recently created first).
- - Q: Should Area and Priority filters be cumulative? → A: Yes, cumulative filtering (AND logic) where both filters apply simultaneously.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Create and View AI Opportunities (Priority: P1)

As a manager or consultant, I want to record new processes and view them in a list so that I have a central registry of all potential AI opportunities.

**Why this priority**: It is the foundation of the application. Without the ability to register and view opportunities, no other feature can function.

**Independent Test**: The user registers a new process named "Customer Ticket Routing" with Area "Atendimento" and all criteria scores. The process appears in the list with all its entered data.

**Acceptance Scenarios**:

1. **Given** the opportunity registration form is open, **When** I enter valid details:
   - Name: "Customer Ticket Routing"
   - Area: "Atendimento"
   - Description: "Automate triage of support tickets using NLP"
   - Criteria (Impact: 5, Frequency: 4, Manual Effort: 5, Repetitivity: 5, Data Readiness: 3, Implementation Difficulty: 2)
   And click "Save", **Then** the opportunity is saved and appears in the opportunities list.
2. **Given** the opportunity registration form is open, **When** I try to save with an empty name or a name containing only spaces, **Then** the system prevents saving and displays a validation error message.

---

### User Story 2 - Automatic Prioritization and Score (Priority: P1)

As a manager or consultant, I want to see an automatically calculated score and priority for each opportunity so that I know which processes are the best candidates for AI automation.

**Why this priority**: The score and priority rating are critical for evaluating and comparing opportunities, which is the primary objective of this board.

**Independent Test**: The user views a registered opportunity with specific criteria values and verifies that the score matches the reference calculations and the priority rating is assigned correctly.

**Acceptance Scenarios**:

1. **Given** an opportunity with:
   - Impact: 5, Frequency: 5, Manual Effort: 5, Repetitivity: 5, Data Readiness: 5, Difficulty: 1
   **When** it is saved, **Then** its Opportunity Score is displayed as `100` and its Priority is displayed as `ALTA`.
2. **Given** an opportunity with:
   - Impact: 3, Frequency: 3, Manual Effort: 3, Repetitivity: 3, Data Readiness: 3, Difficulty: 3
   **When** it is saved, **Then** its Opportunity Score is displayed as `60` and its Priority is displayed as `MÉDIA`.
3. **Given** an opportunity with:
   - Impact: 1, Frequency: 1, Manual Effort: 1, Repetitivity: 1, Data Readiness: 1, Difficulty: 5
   **When** it is saved, **Then** its Opportunity Score is displayed as `20` and its Priority is displayed as `BAIXA`.

---

### User Story 3 - Edit and Delete Opportunities (Priority: P1)

As a manager or consultant, I want to edit details or delete an opportunity so that my registry remains accurate and up-to-date.

**Why this priority**: Critical CRUD capability to ensure the data is manageable and incorrect entries can be corrected or removed.

**Independent Test**: The user modifies an opportunity's criteria, verifies the score recalculates, and then deletes the opportunity, verifying it disappears from the list.

**Acceptance Scenarios**:

1. **Given** a saved opportunity "Invoicing Pipeline", **When** I click edit and change its Impact from 3 to 5 and save, **Then** the opportunity details are updated in the list and its score/priority are recalculated.
2. **Given** a saved opportunity "HR Onboarding Chatbot", **When** I click delete and confirm, **Then** the opportunity is permanently removed from the list.

---

### User Story 4 - Sort, Filter, and Summary Dashboard (Priority: P2)

As a manager or consultant, I want the opportunity list sorted by score and filterable by area and priority, along with a summary of key metrics, so that I can easily analyze and focus on the highest-priority opportunities.

**Why this priority**: Improves usability and enables rapid comparison of many opportunities, but relies on the existence of CRUD and scores (US1-US3).

**Independent Test**: The user registers multiple opportunities, checks that they are ordered by score descending, applies a filter, and verifies the summary metrics update correctly.

**Acceptance Scenarios**:

1. **Given** multiple opportunities with scores 45, 85, and 60, **When** viewing the list, **Then** they are displayed in the order: score 85 (first), score 60 (second), score 45 (third).
2. **Given** the list has opportunities in areas "Financeiro" and "Marketing", **When** I select filter by Area "Financeiro", **Then** only opportunities in "Financeiro" are displayed.
3. **Given** 3 opportunities (Score 80/Priority ALTA, Score 60/Priority MÉDIA, Score 40/Priority BAIXA), **When** viewing the dashboard, **Then** the summary displays:
   - Total opportunities: 3
   - High Priority opportunities: 1
   - Average Score: 60

---

### User Story 5 - Persistence (Priority: P1)

As a manager or consultant, I want my data to persist when I close or reload the application so that I do not lose my registered opportunities.

**Why this priority**: Crucial for usability. Without persistence, the application is not practical for real use.

**Independent Test**: The user registers an opportunity, reloads the page/application, and checks that the opportunity is still present.

**Acceptance Scenarios**:

1. **Given** I have registered 2 opportunities, **When** I reload the application, **Then** the list still displays the 2 opportunities with all their details, scores, and priorities intact.

---

### Edge Cases

- **Special Characters and Spaces in Name**: User enters leading/trailing spaces. The system MUST trim these spaces before validation and save.
- **Dificuldade vs Viabilidade**: The score calculation uses `viabilidade = 6 - dificuldade`. If the user inputs a difficulty of 5 (very difficult), viability becomes 1. If difficulty is 1, viability becomes 5.
- **Score Rounding**: A score division resulting in a decimal value MUST be rounded to the nearest integer.
- **Filters returning no results**: If a filter combination has no matching opportunities, the system MUST show a friendly "No opportunities found" message and keep the summary metrics updated based on the filtered results.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST allow the user to input the following fields for an opportunity:
  - Process Name (Required, max 80 chars, non-empty)
  - Area (Required, must choose exactly one from: Comercial, Marketing, Atendimento, Financeiro, RH, Operações, TI, Outros)
  - Description (Optional, max 300 chars)
  - Impact on Business (Required, integer 1 to 5)
  - Frequency (Required, integer 1 to 5)
  - Manual Effort (Required, integer 1 to 5)
  - Repetitivity (Required, integer 1 to 5)
  - Data Readiness (Required, integer 1 to 5)
  - Implementation Difficulty (Required, integer 1 to 5)
- **FR-002**: The system MUST validate all fields before saving and display specific validation error messages.
- **FR-003**: The system MUST calculate the Opportunity Score using the exact centralized formula:
  - `viabilidade = 6 - dificuldade`
  - `score = (impacto * 25 + frequencia * 15 + esforcoManual * 15 + repetitividade * 15 + prontidaoDados * 15 + viabilidade * 15) / 5`
  - The result MUST be rounded to the nearest integer.
- **FR-004**: The system MUST assign a priority level based on the score:
  - `ALTA` for scores 80 to 100
  - `MÉDIA` for scores 60 to 79
  - `BAIXA` for scores 0 to 59
- **FR-005**: The system MUST display the opportunities list ordered by Opportunity Score from highest to lowest. In case of a tie, opportunities MUST be ordered by creation date/time (most recently created first).
- **FR-006**: The system MUST support filtering the list by Area.
- **FR-007**: The system MUST support filtering the list by Priority level.
- **FR-007b**: Filters MUST be cumulative (AND logic). When both filters are active, only opportunities matching both criteria are displayed.
- **FR-008**: The system MUST display a summary dashboard containing:
  - Total count of registered opportunities
  - Count of opportunities with priority `ALTA`
  - Average Opportunity Score (rounded to 1 decimal place or nearest integer)
- **FR-009**: The system MUST persist all opportunities to local browser storage so that data survives application reload.

### Key Entities

- **Opportunity**: Represents a business process candidate for AI automation.
  - Attributes:
    - `id` (unique identifier)
    - `name` (string, 1-80 chars)
    - `area` (enum: Comercial, Marketing, Atendimento, Financeiro, RH, Operações, TI, Outros)
    - `description` (string, 0-300 chars)
    - `impact` (integer, 1-5)
    - `frequency` (integer, 1-5)
    - `manualEffort` (integer, 1-5)
    - `repetitivity` (integer, 1-5)
    - `dataReadiness` (integer, 1-5)
    - `difficulty` (integer, 1-5)
    - `score` (integer, 0-100)
    - `priority` (enum: ALTA, MÉDIA, BAIXA)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A user can register a new opportunity in under 30 seconds.
- **SC-002**: The Opportunity Score and Priority update instantly (less than 100ms) upon saving or editing an opportunity.
- **SC-003**: 100% of calculations match the reference cases defined in the score rules.
- **SC-004**: 100% of saved data is successfully loaded and displayed after a browser reload.

## Assumptions

- The application is a client-side application running in a modern web browser.
- Browser `localStorage` is available and has sufficient space (the small size of this project ensures space is not an issue).
- No backend database or user login authentication is required for this version.
