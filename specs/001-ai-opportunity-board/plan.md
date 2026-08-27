# Implementation Plan: AI Opportunity Board

**Branch**: `001-ai-opportunity-board` | **Date**: 2026-08-18 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/001-ai-opportunity-board/spec.md`

## Summary
The goal is to build the "AI Opportunity Board", a single-page web application to record, evaluate, and prioritize processes for AI automation based on a weighted Opportunity Score. The application is client-side only (HTML/CSS/JS) with localStorage persistence, built with Vite and tested via Vitest.

## Technical Context

**Language/Version**: JavaScript (ES6+), HTML5, CSS3

**Primary Dependencies**: `vite` (devDependency), `vitest` (devDependency)

**Storage**: Browser `localStorage`

**Testing**: `vitest`

**Target Platform**: Modern Web Browser

**Project Type**: single-page web app (no framework, no UI library)

**Performance Goals**: Instant UI rendering (<50ms list sorting and filtering)

**Constraints**: Local-only, didactic, lightweight, classroom-practical.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Principle I (Simplicity over Complexity)**: ✅ Aligned. Using pure vanilla JS modules, minimal dependencies, and custom CSS.
- **Principle II & III (Explicit Requirements / Spec Adherence)**: ✅ Aligned. Only specified fields, score logic, sorting, filters, and persistence are implemented.
- **Principle IV (Input Validation)**: ✅ Aligned. Validating process names (trimmed, required, max 80) and other fields strictly.
- **Principle V & VI (Deterministic Calculations / Centralized Score)**: ✅ Aligned. Centralized calculator script containing pure functions for score logic with standard rounding and tie-breakers. Tested via automated unit tests.
- **Principle VIII & IX (Quality Gates / Definition of Done)**: ✅ Aligned. Build process, vitest execution, and manual validation must pass before completion.
- **Principle XI (Non-volatile Persistence)**: ✅ Aligned. Persistence implemented using browser localStorage.
- **Principle XIV (Classroom Practicality)**: ✅ Aligned. The architecture requires only 6 modules and 1 test file, buildable in less than 30 minutes.

## Project Structure

### Documentation (this feature)

```text
specs/001-ai-opportunity-board/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/
│   └── storage-and-ui.md# Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
index.html               # Main page layout
package.json             # NPM setup, scripts, dependencies
style.css                # Base custom styling
main.js                  # App initialization and DOM listeners
src/
├── state.js             # State manager (store, filters, CRUD trigger)
├── calculator.js        # Core score and priority formulas (pure functions)
├── storage.js           # LocalStorage wrapper
├── validation.js        # Input field validation logic
└── ui.js                # DOM rendering, cards, list creation, form updates
tests/
└── app.test.js          # Unit tests for calculator, priority, validation
```

**Structure Decision**: Single vanilla frontend project with a centralized `src/` modular directory and a `tests/` directory at the project root.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |

## Verification Plan

### Automated Tests
- `npm test` - Executes Vitest suite verifying:
  - `calculateOpportunityScore` outputs for Case 1 (100), Case 2 (60), and Case 3 (20).
  - Priority boundaries (`ALTA`, `MÉDIA`, `BAIXA`).
  - Validation rules (empty name, max length of name and description).

### Manual Verification
- Deploy locally using `npm run dev`, insert reference cases manually, verify sorting order, try selecting filters, reload the page, and check if opportunities persist in the UI list.
