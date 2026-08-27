<!--
Sync Impact Report:
- Version change: null -> 1.0.0
- List of modified principles: Initial Ratification of 14 Principles
- Added sections: Core Principles, Tech Stack & Limits, Quality Gates, Governance
- Removed sections: None
- Templates requiring updates:
  - .specify/templates/plan-template.md (✅ aligned)
  - .specify/templates/spec-template.md (✅ aligned)
  - .specify/templates/tasks-template.md (✅ aligned)
- Follow-up TODOs: None
-->

# AI Opportunity Board Constitution

## Core Principles

### I. Simplicity Over Complexity
The system design MUST prioritize the simplest possible solution for any given problem. Avoid over-engineering, extra layers of abstraction, or speculative design.

### II. Explicit Requirement Driven
Every feature and code path MUST exist solely to satisfy an explicit requirement from the specification. Unrequested or speculative code is strictly prohibited.

### III. Specification Adherence
No feature, behavior, or change can be implemented unless it is explicitly described and authorized in the specification.

### IV. Input Validation
All user-provided inputs MUST be rigorously validated at the system boundaries before being processed, logic-executed, or persisted.

### V. Deterministic & Testable Calculations
All business rules and logic calculations MUST be deterministic (yielding the same output for a given input) and covered by automated tests.

### VI. Centralized Opportunity Score Logic
The Opportunity Score MUST have a single, centralized calculation rule and implementation. Duplicate score logic across modules is forbidden.

### VII. Verifiable Acceptance Criteria
All acceptance criteria MUST be objectively verifiable via automated tests or explicit, reproducible manual validation steps.

### VIII. Code Generation is Not Completion
No feature is considered complete merely because code has been generated. The feature is only complete after successful verification.

### IX. Standard Quality Gates
Before any feature or task is declared complete, the application MUST undergo a successful build, pass all available tests, and undergo functional validation.

### X. Root Cause Bug Fixing
Bugs MUST be resolved by identifying and fixing their root cause. Hiding bugs by removing validation checks or disabling tests is strictly prohibited.

### XI. Non-Volatile Persistence
Persisted data MUST survive application reloads, restarts, or crashes. Memory-only volatile storage for persistent state is not permitted.

### XII. Educational Code Quality
Source code MUST be written with high readability, modularity, and clarity, ensuring it serves as an excellent didactic resource for Spec-Driven Development and Loop Engineering.

### XIII. Dependency Minimization
External library dependencies MUST be kept to a minimum. Do not introduce dependencies unless they are absolutely necessary and cannot be replaced by a simple, maintainable internal implementation.

### XIV. Classroom Practicality
The project scope and codebase size MUST remain small enough to allow a full build, test suite execution, and functional validation within the timeframe of a single practical classroom session.

## Tech Stack & Limits

The project is designed to demonstrate Spec-Driven Development and Loop Engineering. All structural decisions, frameworks, and architecture choices must align with the goal of being accessible, fast to run, and lightweight.

## Quality Gates

1. **Pre-Implementation**: The specification must be fully Clarified and planned.
2. **Implementation**: Code changes must follow the approved plan and tasks.
3. **Post-Implementation**: Run linting, formatting, project build, and all unit/integration tests to ensure no regressions are introduced.

## Governance

This Constitution serves as the ultimate source of truth for the 'AI Opportunity Board' project constraints. Any change to these principles requires a documentation update, version increment, and explicit approval.

**Version**: 1.0.0 | **Ratified**: 2026-08-18 | **Last Amended**: 2026-08-18
