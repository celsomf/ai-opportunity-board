# Research: AI Opportunity Board Technical Setup

We need to design a lightweight, educational, single-page application using modern tooling (Vite, Vitest, Vanilla JS, HTML, CSS).

## Decision: Frontend Build System
- **Selected**: Vite
- **Rationale**: Vite provides an extremely fast dev server and a simple bundling process. It works out of the box with vanilla JS, HTML, and CSS. It has a zero-config setup that is perfect for a classroom environment.
- **Alternatives Considered**:
  - Parcel (Good, but Vite has better ecosystem and speed for simple vanilla templates).
  - Webpack (Too complex for a classroom lab).

## Decision: Testing Framework
- **Selected**: Vitest
- **Rationale**: Vitest runs incredibly fast, has a Jest-compatible API, and integrates natively with Vite configurations. It allows writing tests in ES6 without compiling steps.
- **Alternatives Considered**:
  - Jest (Requires Babel/ESM configuration which is complex/error-prone in vanilla projects).

## Decision: Architecture and Module Structure
To separate concerns while keeping the project modular and clean:
1. `src/state.js`: Global state management. Keeps a list of opportunities, active filters, and methods to update them. Emits events or notifies UI on changes.
2. `src/calculator.js`: Pure functions for calculating the score and priority. Easily testable.
3. `src/storage.js`: LocalStorage serialization and retrieval.
4. `src/validation.js`: Form input validation logic.
5. `src/ui.js`: DOM manipulation, rendering lists, updating summary cards, displaying validation errors.
6. `main.js`: Main entry point initializing state, storage, and registering DOM event listeners.

## Decision: CSS Style
- **Selected**: Single Tailwind CSS file via CDN or standard custom CSS.
- **Rationale**: To avoid extra npm package downloads during class, we will use a clean custom CSS file (`style.css`) or simple Tailwind CSS via CDN link in `index.html`. We will use standard custom CSS to keep external dependencies strictly at zero.
