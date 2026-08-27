# AI Decision Matrix Requirements Quality Checklist

**Purpose**: Validate requirement completeness, clarity, coverage, and consistency for the AI Decision Matrix feature specification.
**Created**: 2026-08-27
**Feature**: [spec.md](file:///c:/Aula/projeto1/specs/002-ai-desicision-matrix/spec.md)

## Quadrant Classification Rules & Boundary Conditions

- [ ] CHK001 - Are the exact score and difficulty mathematical thresholds documented for all 4 quadrants (`QUICK WIN`, `STRATEGIC`, `OPPORTUNISTIC`, `DEPRIORITIZE`) without overlap or gaps? [Clarity, Spec §FR-001 to FR-005]
- [ ] CHK002 - Are the exact boundary behaviors specified for edge cases `score = 80` vs `score = 79`? [Edge Case, Spec §FR-002, FR-004]
- [ ] CHK003 - Are the exact boundary behaviors specified for edge cases `difficulty = 2` vs `difficulty = 3`? [Edge Case, Spec §FR-002, FR-003]
- [ ] CHK004 - Are deterministic classifications specified for extreme min/max boundary combinations (`score=100/diff=1`, `score=0/diff=5`)? [Coverage, Spec §User Story 1]

## Visual 2x2 Matrix & UI Dashboard Layout

- [ ] CHK005 - Are the visual layout, 2D axis orientations (vertical: Score, horizontal: Difficulty), and spatial quadrant placement (top-left: Quick Win, top-right: Strategic, bottom-left: Opportunistic, bottom-right: Deprioritize) explicitly defined? [Completeness, Spec §FR-009]
- [ ] CHK006 - Are visual identity and accessibility rules (distinct colors + mandatory legibility without depending solely on color) specified for each quadrant? [Clarity, Spec §FR-010, FR-015]
- [ ] CHK007 - Are dashboard macro counter requirements specified to reflect the total global portfolio distribution, remaining fixed during text searches? [Consistency, Spec §FR-017, Clarification Q3]
- [ ] CHK008 - Is the empty state visual behavior defined for quadrants containing zero opportunities? [Coverage, Spec §FR-010]

## Matrix Interactivity, Filtering & Navigation

- [ ] CHK009 - Are click interaction requirements defined for matrix quadrant cards to filter the list of opportunities? [Completeness, Spec §FR-011]
- [ ] CHK010 - Is the toggle behavior (clicking an active quadrant card resets the filter back to `TODOS`) explicitly specified? [Clarity, Spec §FR-011, Clarification Q1]
- [ ] CHK011 - Are active visual highlight states defined for both selected matrix quadrant cards and filter chips? [Completeness, Spec §FR-011, FR-012]
- [ ] CHK012 - Are cumulative logic requirements (AND filtering) specified for combining quadrant filters with text search or area/priority filters? [Consistency, Spec §FR-016, Clarification Q2]
- [ ] CHK013 - Is an accessible, clear mechanism to return to `TODOS` (viewing all opportunities) documented? [Completeness, Spec §FR-013]

## Opportunity Cards, Real-Time Updates & Persistence

- [ ] CHK014 - Are quadrant badge display requirements specified for every opportunity card in the list view? [Completeness, Spec §FR-014]
- [ ] CHK015 - Are instant real-time update requirements defined for recalculating quadrant classification upon editing opportunity difficulty or criteria? [Completeness, Spec §FR-006]
- [ ] CHK016 - Are backward compatibility requirements specified for existing opportunities loaded from `localStorage` without data corruption or manual migration? [Coverage, Spec §FR-007]
- [ ] CHK017 - Are persistence requirements defined to ensure calculated quadrant states survive page reloads/restarts? [Non-Functional, Spec §Assumptions]
- [ ] CHK018 - Are non-regression requirements documented to preserve existing Opportunity Score calculations, ALTA/MÉDIA/BAIXA priority classifications, and existing CRUD operations? [Consistency, Spec §FR-008]
