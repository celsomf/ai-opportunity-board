# Tasks: AI Opportunity Board

**Input**: Design documents from `/specs/001-ai-opportunity-board/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/storage-and-ui.md

**Tests**: Automated Vitest tests are included in the task list to satisfy TDD and quality gate requirements.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US5, US4)
- Include exact file paths in descriptions

## Path Conventions

- Paths assume a single vanilla project structure as defined in plan.md:
  - Repository root: `index.html`, `package.json`, `style.css`, `main.js`
  - Modules: `src/`
  - Tests: `tests/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Initialize npm configuration and project manifest in package.json
- [x] T002 [P] Configure Vite dev server and build scripts in package.json
- [x] T003 [P] Configure Vitest testing configuration and test runner scripts in package.json
- [x] T004 Create basic page skeleton and form container in index.html and style.css

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core modules that must exist before user story implementation begins

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 Create the core application state manager in src/state.js
- [x] T006 [P] Create the localStorage utility wrapper in src/storage.js
- [x] T007 [P] Create form validators in src/validation.js
- [x] T008 [P] Create empty score utility functions in src/calculator.js

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Create and View AI Opportunities (Priority: P1) 🎯 MVP

**Goal**: Create processes with basic fields and display them in a list

**Independent Test**: The user registers a process named "Customer Ticket Routing", which appears in the list with all its entered data.

### Tests for User Story 1
- [x] T009 [P] [US1] Create testing structure and write validator tests in tests/app.test.js

### Implementation for User Story 1
- [x] T010 [US1] Implement input fields validation for Name and Description in src/validation.js
- [x] T011 [P] [US1] Create form layout and fields (name, area, description, criteria) in index.html
- [x] T012 [US1] Implement opportunity creation in src/state.js and render logic in src/ui.js

**Checkpoint**: User Story 1 is fully functional and testable independently.

---

## Phase 4: User Story 2 - Automatic Prioritization and Score (Priority: P1)

**Goal**: Automatically compute the Opportunity Score and Priority level

**Independent Test**: Save opportunities with specific criteria and verify that Case 1 scores 100 (ALTA), Case 2 scores 60 (MÉDIA), and Case 3 scores 20 (BAIXA).

### Tests for User Story 2
- [x] T013 [P] [US2] Write unit tests for score formulas and priority thresholds in tests/app.test.js

### Implementation for User Story 2
- [x] T014 [US2] Implement formulas and threshold logic in src/calculator.js
- [x] T015 [US2] Integrate score calculation into form saving and list item template in src/state.js and src/ui.js

**Checkpoint**: Opportunities are now automatically scored and prioritized in the UI.

---

## Phase 5: User Story 3 - Edit and Delete Opportunities (Priority: P1)

**Goal**: Enable editing details or deleting opportunities

**Independent Test**: Edit a registered opportunity to update its criteria, observe its score recalculate, and then delete it to confirm it is removed from the UI.

### Implementation for User Story 3
- [x] T016 [US3] Implement CRUD edit and delete methods in src/state.js
- [x] T017 [US3] Add edit/delete buttons, populate form values on edit, and update the UI in src/ui.js

**Checkpoint**: Full CRUD capability is functional.

---

## Phase 6: User Story 5 - Persistence (Priority: P1)

**Goal**: Persist opportunity data in the browser

**Independent Test**: Register an opportunity, refresh the browser page, and confirm it remains in the list.

### Implementation for User Story 5
- [x] T018 [US5] Implement localStorage save and load routines in src/storage.js
- [x] T019 [US5] Hook persistence to state initialization and state modification in src/state.js

**Checkpoint**: Data survives page reloads.

---

## Phase 7: User Story 4 - Sort, Filter, and Summary Dashboard (Priority: P2)

**Goal**: Sort by score, filter by area/priority, and view a summary cards bar

**Independent Test**: Add multiple opportunities, confirm they sort by score descending (tie-broken by creation date), filter the list, and verify metrics card numbers update.

### Implementation for User Story 4
- [x] T020 [US4] Implement cumulative (AND) filtering logic by Area and Priority in src/state.js
- [x] T021 [P] [US4] Implement score-descending sorting with a creation epoch tie-breaker in src/state.js
- [x] T022 [US4] Implement summary metrics (totals, high count, average score) and list filter updates in src/ui.js and index.html

**Checkpoint**: Sorting, filters, and dashboard metrics are fully functional.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Refinement, linting, styling, and final quality check

- [x] T023 [P] Add clean, custom CSS styling for forms, lists, priority badges, and dashboard cards in style.css
- [x] T024 Connect all modules together in main.js
- [x] T025 Run final production build using npm run build and verify all tests pass using npm test

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Requires Setup completion. Blocks all user stories.
- **User Stories (Phases 3-7)**: All depend on Foundational completion.
  - Recommended order: US1 → US2 → US3 → US5 → US4 (sequential priority order).
- **Polish (Phase 8)**: Depends on all user stories completion.

### Parallel Opportunities

- T002, T003 can run in parallel during Setup.
- T006, T007, T008 can run in parallel during Foundational.
- Test writing tasks (T009, T013) can run in parallel before implementation.
- Filter (T020) and Sort (T021) tasks can run in parallel.

---

## Implementation Strategy

### MVP First (User Stories 1 & 2 Only)

1. Setup build and test environments.
2. Complete Foundational scripts.
3. Implement US1 (basic form and list rendering) and US2 (score logic and priority rating).
4. Run tests and manually verify reference cases.

### Incremental Delivery

1. Verify MVP works correctly.
2. Add US3 (Edit & Delete functionality).
3. Add US5 (localStorage persistence).
4. Add US4 (Sorting, cumulative filtering, and metrics dashboard).
5. Apply final stylesheet polish and run build pipelines.
