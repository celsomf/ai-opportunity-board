# Research: AI Decision Matrix Technical Choices

## Technical Context & Decisions

### Decision 1: Classification Function Design & Placement
- **Choice**: Add `getDecisionQuadrant(score, difficulty)` as a pure, exported function in `src/calculator.js`.
- **Rationale**: `src/calculator.js` already houses `calculateOpportunityScore` and `getPriorityLevel`. Placing `getDecisionQuadrant` alongside them follows Principle V (Deterministic & Testable Calculations) and Principle VI (Centralized Logic) of the Constitution.
- **Alternatives Considered**:
  - *Creating `src/matrix.js`*: Rejected as unnecessary extra file/module for a 15-line pure function (violates Principle I: Simplicity).
  - *Embedding logic in `src/state.js`*: Rejected because UI/State logic should consume deterministic calculator functions, keeping calculations 100% testable in unit tests without state side-effects.

### Decision 2: State Model & Filter Management
- **Choice**: Extend `state.filters` in `src/state.js` with `quadrant: ""` (values: `""` [TODOS], `"QUICK WIN"`, `"STRATEGIC"`, `"OPPORTUNISTIC"`, `"DEPRIORITIZE"`). Extend `Opportunity` object with calculated `quadrant` property during creation, edit, and load.
- **Rationale**: `AppStateManager` in `src/state.js` already handles cumulative filtering (`area`, `priority`) and notifying subscribers (`render`). Adding `quadrant` seamlessly integrates into `getVisibleOpportunities()` via AND-filtering (`item.quadrant === this.filters.quadrant`), while `getSummaryMetrics()` calculates global macro totals across all opportunities regardless of text search (per Clarification Q3).
- **Alternatives Considered**:
  - *Storing quadrant as a separate manual form input*: Rejected because quadrant MUST be automatically calculated from score and difficulty.
  - *Filtering only on frontend DOM nodes*: Rejected because state subscription guarantees single-source-of-truth reactivity.

### Decision 3: UI Component Architecture & Matrix Interactions
- **Choice**: Add a 2x2 HTML grid container (`<section class="decision-matrix-section">`) in `index.html` above the list section, populated and updated dynamically via `src/ui.js`. Use CSS CSS Grid in `style.css` for visual layout.
- **Rationale**: Fits standard HTML5 + CSS Grid structure without adding frontend frameworks like React or Vue (Principle XIII: Dependency Minimization).
- **Alternatives Considered**:
  - *Third-party charting/dashboard library (e.g. Chart.js)*: Rejected because a CSS 2x2 grid is pure, lightweight, fast, and dependency-free.

### Decision 4: LocalStorage & Data Migration Strategy
- **Choice**: Calculate `quadrant` dynamically inside `addOpportunity`, `updateOpportunity`, and on `loadOpportunities()` when initializing `AppStateManager`.
- **Rationale**: Ensures complete backward compatibility with existing items stored in `localStorage` without requiring a data migration script (Principle XI: Non-Volatile Persistence).
