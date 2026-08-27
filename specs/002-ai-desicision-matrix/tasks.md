# Tasks: AI Decision Matrix

**Input**: Design documents from `/specs/002-ai-desicision-matrix/`

**Prerequisites**: [plan.md](file:///c:/Aula/projeto1/specs/002-ai-desicision-matrix/plan.md), [spec.md](file:///c:/Aula/projeto1/specs/002-ai-desicision-matrix/spec.md), [data-model.md](file:///c:/Aula/projeto1/specs/002-ai-desicision-matrix/data-model.md), [contracts/ui-and-decision-matrix.md](file:///c:/Aula/projeto1/specs/002-ai-desicision-matrix/contracts/ui-and-decision-matrix.md), [quickstart.md](file:///c:/Aula/projeto1/specs/002-ai-desicision-matrix/quickstart.md)

**Tests**: Unit tests included per PRD reference cases and boundary rules.

**Organization**: Tasks are grouped by User Story to enable independent implementation and testing of each increment.

---

## Format: `- [ ] [ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: User story mapping (`[US1]`, `[US2]`, `[US3]`)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project readiness and test environment verification

- [ ] T001 Verify project structure and test runner environment via `package.json`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core calculation logic that MUST be complete before UI components consume it

**⚠️ CRITICAL**: Blocked until T002 and T003 are complete and passing tests

- [ ] T002 Implement pure deterministic decision quadrant classification function `getDecisionQuadrant(score, difficulty)` in [src/calculator.js](file:///c:/Aula/projeto1/src/calculator.js)
- [ ] T003 Add unit test suite for `getDecisionQuadrant` covering PRD reference cases (A, B, C, D) and exact boundary cases (80/2, 80/3, 79/2, 79/3) in [tests/app.test.js](file:///c:/Aula/projeto1/tests/app.test.js)

**Checkpoint**: Foundation ready — deterministic calculator is tested and ready for state integration.

---

## Phase 3: User Story 1 - Automatic Quadrant Classification & Opportunity Card Badges (Priority: P1) 🎯 MVP

**Goal**: Classify every opportunity into a strategic quadrant automatically during creation, edit, or storage load, and display a prominent badge on each card.

**Independent Test**: Create and edit opportunities with varying scores/difficulties; verify quadrant auto-calculation and badge rendering on cards.

### Implementation for User Story 1

- [ ] T004 [US1] Extend `addOpportunity`, `updateOpportunity`, and `loadOpportunities` to compute and attach `quadrant` to opportunity objects in [src/state.js](file:///c:/Aula/projeto1/src/state.js)
- [ ] T005 [P] [US1] Add unit tests for opportunity state model quadrant calculation and persistence in [tests/app.test.js](file:///c:/Aula/projeto1/tests/app.test.js)
- [ ] T006 [P] [US1] Add CSS styles for quadrant badges (`.badge-quadrant`, `.badge-quadrant-quick-win`, etc.) in [style.css](file:///c:/Aula/projeto1/style.css)
- [ ] T007 [US1] Render legible quadrant badge on each opportunity card in [src/ui.js](file:///c:/Aula/projeto1/src/ui.js)

**Checkpoint**: At this point, User Story 1 is fully functional and testable independently (MVP).

---

## Phase 4: User Story 2 - Interactive Visual 2x2 Decision Matrix Dashboard Block (Priority: P2)

**Goal**: Provide a visual 2x2 grid in the dashboard with vertical/horizontal axis labels, counts, empty states, and click-to-filter interactivity.

**Independent Test**: Verify 2x2 matrix renders in dashboard with 4 distinct quadrants, accurate counts, and clicking a quadrant filters the opportunity list.

### Implementation for User Story 2

- [ ] T008 [P] [US2] Add HTML structure for 2x2 AI Decision Matrix section and axis labels in [index.html](file:///c:/Aula/projeto1/index.html)
- [ ] T009 [P] [US2] Add CSS Grid layout, 4 quadrant theme variables (Green, Blue, Amber, Red), and active hover/selection styles in [style.css](file:///c:/Aula/projeto1/style.css)
- [ ] T010 [US2] Extend `getSummaryMetrics` in [src/state.js](file:///c:/Aula/projeto1/src/state.js) to calculate macro global portfolio counts for all 4 quadrants
- [ ] T011 [US2] Bind click event listeners to 2x2 matrix quadrant cards with toggle filter behavior in [src/ui.js](file:///c:/Aula/projeto1/src/ui.js)
- [ ] T012 [US2] Render global quadrant counts, active visual states, and empty states in [src/ui.js](file:///c:/Aula/projeto1/src/ui.js)

**Checkpoint**: User Stories 1 AND 2 are both functional and testable independently.

---

## Phase 5: User Story 3 - Quick Quadrant Filtering & Dashboard Summary (Priority: P3)

**Goal**: Provide dedicated filter buttons/chips (`TODOS`, `QUICK WIN`, `STRATEGIC`, `OPPORTUNISTIC`, `DEPRIORITIZE`) and ensure combined (AND) filtering.

**Independent Test**: Toggle between filter chips; verify list updates with combined criteria while matrix macro counts stay fixed.

### Implementation for User Story 3

- [ ] T013 [P] [US3] Add quadrant filter chip buttons in [index.html](file:///c:/Aula/projeto1/index.html)
- [ ] T014 [P] [US3] Add CSS styling for quadrant filter chip buttons and active states in [style.css](file:///c:/Aula/projeto1/style.css)
- [ ] T015 [US3] Extend `getVisibleOpportunities` in [src/state.js](file:///c:/Aula/projeto1/src/state.js) to support AND-combined filtering by `quadrant`
- [ ] T016 [US3] Bind filter chip event listeners and render active filter chip states in [src/ui.js](file:///c:/Aula/projeto1/src/ui.js)
- [ ] T017 [US3] Add unit tests for combined quadrant filtering in [tests/app.test.js](file:///c:/Aula/projeto1/tests/app.test.js)

**Checkpoint**: All user stories are independently functional and integrated.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Validation and test suite verification

- [ ] T018 Run automated Vitest test suite (`npm test`) to confirm 100% test pass rate in [tests/app.test.js](file:///c:/Aula/projeto1/tests/app.test.js)
- [ ] T019 Perform manual frontend validation checklist per [quickstart.md](file:///c:/Aula/projeto1/specs/002-ai-desicision-matrix/quickstart.md)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion. BLOCKS all user stories.
- **User Story 1 (Phase 3)**: Depends on Foundational phase.
- **User Story 2 (Phase 4)**: Depends on Foundational phase and US1 state model.
- **User Story 3 (Phase 5)**: Depends on US1/US2 state and filter structure.
- **Polish (Phase 6)**: Depends on all user stories being complete.

### Parallel Opportunities

- T005 [P] [US1] and T006 [P] [US1] can run in parallel with T004.
- T008 [P] [US2] and T009 [P] [US2] can run in parallel.
- T013 [P] [US3] and T014 [P] [US3] can run in parallel.

---

## Implementation Strategy

### MVP First (User Story 1)
1. Complete Setup (T001) and Foundational (T002, T003).
2. Complete User Story 1 (T004 - T007).
3. Validate US1: verify badges appear on cards and scores map to quadrants.

### Full Incremental Delivery
1. Complete US2 (T008 - T012) -> Validate 2x2 Matrix UI.
2. Complete US3 (T013 - T017) -> Validate Chip Filters.
3. Run Polish & Validation (T018, T019).
