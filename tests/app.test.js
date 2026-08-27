import { describe, it, expect } from "vitest";
import { calculateOpportunityScore, getPriorityLevel, getDecisionQuadrant } from "../src/calculator.js";
import { validateOpportunity } from "../src/validation.js";

describe("Opportunity Score Calculations", () => {
  it("Case 1: maximum scores and minimum difficulty should result in 100 score and ALTA priority", () => {
    const criteria = {
      impact: 5,
      frequency: 5,
      manualEffort: 5,
      repetitivity: 5,
      dataReadiness: 5,
      difficulty: 1
    };
    const score = calculateOpportunityScore(criteria);
    expect(score).toBe(100);
    expect(getPriorityLevel(score)).toBe("ALTA");
  });

  it("Case 2: average scores should result in 60 score and MÉDIA priority", () => {
    const criteria = {
      impact: 3,
      frequency: 3,
      manualEffort: 3,
      repetitivity: 3,
      dataReadiness: 3,
      difficulty: 3
    };
    const score = calculateOpportunityScore(criteria);
    expect(score).toBe(60);
    expect(getPriorityLevel(score)).toBe("MÉDIA");
  });

  it("Case 3: minimum scores and maximum difficulty should result in 20 score and BAIXA priority", () => {
    const criteria = {
      impact: 1,
      frequency: 1,
      manualEffort: 1,
      repetitivity: 1,
      dataReadiness: 1,
      difficulty: 5
    };
    const score = calculateOpportunityScore(criteria);
    expect(score).toBe(20);
    expect(getPriorityLevel(score)).toBe("BAIXA");
  });
});

describe("Priority Level Boundaries", () => {
  it("should classify score >= 80 as ALTA", () => {
    expect(getPriorityLevel(80)).toBe("ALTA");
    expect(getPriorityLevel(100)).toBe("ALTA");
  });

  it("should classify score between 60 and 79 as MÉDIA", () => {
    expect(getPriorityLevel(60)).toBe("MÉDIA");
    expect(getPriorityLevel(79)).toBe("MÉDIA");
  });

  it("should classify score <= 59 as BAIXA", () => {
    expect(getPriorityLevel(0)).toBe("BAIXA");
    expect(getPriorityLevel(59)).toBe("BAIXA");
  });
});

describe("Form Validation Rules", () => {
  const baseValidData = {
    name: "Valid Process Name",
    area: "Marketing",
    description: "Valid description",
    impact: 3,
    frequency: 3,
    manualEffort: 3,
    repetitivity: 3,
    dataReadiness: 3,
    difficulty: 3
  };

  it("should pass validation with valid data", () => {
    const validation = validateOpportunity(baseValidData);
    expect(validation.isValid).toBe(true);
    expect(validation.errors).toHaveLength(0);
  });

  it("should fail if name is empty or only spaces", () => {
    const emptyVal = validateOpportunity({ ...baseValidData, name: "" });
    expect(emptyVal.isValid).toBe(false);
    expect(emptyVal.errors).toContain("O nome do processo é obrigatório.");

    const spacesVal = validateOpportunity({ ...baseValidData, name: "    " });
    expect(spacesVal.isValid).toBe(false);
    expect(spacesVal.errors).toContain("O nome do processo não pode conter apenas espaços.");
  });

  it("should fail if name exceeds 80 characters", () => {
    const longName = "A".repeat(81);
    const validation = validateOpportunity({ ...baseValidData, name: longName });
    expect(validation.isValid).toBe(false);
    expect(validation.errors).toContain("O nome do processo deve ter no máximo 80 caracteres.");
  });

  it("should fail if description exceeds 300 characters", () => {
    const longDesc = "A".repeat(301);
    const validation = validateOpportunity({ ...baseValidData, description: longDesc });
    expect(validation.isValid).toBe(false);
    expect(validation.errors).toContain("A descrição deve ter no máximo 300 caracteres.");
  });

  it("should fail if area is invalid", () => {
    const validation = validateOpportunity({ ...baseValidData, area: "Invalid Area" });
    expect(validation.isValid).toBe(false);
    expect(validation.errors[0]).toContain("A área selecionada é inválida.");
  });

  it("should fail if numeric criteria is out of 1-5 range", () => {
    const validationLow = validateOpportunity({ ...baseValidData, impact: 0 });
    expect(validationLow.isValid).toBe(false);
    expect(validationLow.errors[0]).toContain("deve estar entre 1 e 5");

    const validationHigh = validateOpportunity({ ...baseValidData, difficulty: 6 });
    expect(validationHigh.isValid).toBe(false);
    expect(validationHigh.errors[0]).toContain("deve estar entre 1 e 5");
  });
});

describe("AI Decision Matrix Quadrant Classification", () => {
  it("PRD Case A: score = 100, difficulty = 1 should classify as QUICK WIN", () => {
    expect(getDecisionQuadrant(100, 1)).toBe("QUICK WIN");
  });

  it("PRD Case B: score = 85, difficulty = 4 should classify as STRATEGIC", () => {
    expect(getDecisionQuadrant(85, 4)).toBe("STRATEGIC");
  });

  it("PRD Case C: score = 70, difficulty = 2 should classify as OPPORTUNISTIC", () => {
    expect(getDecisionQuadrant(70, 2)).toBe("OPPORTUNISTIC");
  });

  it("PRD Case D: score = 50, difficulty = 5 should classify as DEPRIORITIZE", () => {
    expect(getDecisionQuadrant(50, 5)).toBe("DEPRIORITIZE");
  });

  describe("Exact Boundary Rules (80 score threshold & 2/3 difficulty threshold)", () => {
    it("score = 80, difficulty = 2 => QUICK WIN", () => {
      expect(getDecisionQuadrant(80, 2)).toBe("QUICK WIN");
    });

    it("score = 80, difficulty = 3 => STRATEGIC", () => {
      expect(getDecisionQuadrant(80, 3)).toBe("STRATEGIC");
    });

    it("score = 79, difficulty = 2 => OPPORTUNISTIC", () => {
      expect(getDecisionQuadrant(79, 2)).toBe("OPPORTUNISTIC");
    });

    it("score = 79, difficulty = 3 => DEPRIORITIZE", () => {
      expect(getDecisionQuadrant(79, 3)).toBe("DEPRIORITIZE");
    });
  });
});

describe("State Manager Quadrant Integration", () => {
  it("should calculate quadrant when adding an opportunity", async () => {
    const { state } = await import("../src/state.js");
    const item = state.addOpportunity({
      name: "Triagem de emails",
      area: "Atendimento",
      description: "Automação",
      impact: 5,
      frequency: 5,
      manualEffort: 5,
      repetitivity: 5,
      dataReadiness: 5,
      difficulty: 1
    });
    expect(item.score).toBe(100);
    expect(item.quadrant).toBe("QUICK WIN");
  });

  it("should recalculate quadrant when updating difficulty", async () => {
    const { state } = await import("../src/state.js");
    const item = state.addOpportunity({
      name: "Processamento de Pedidos",
      area: "Comercial",
      impact: 5,
      frequency: 5,
      manualEffort: 5,
      repetitivity: 5,
      dataReadiness: 5,
      difficulty: 2
    });
    expect(item.quadrant).toBe("QUICK WIN");

    const updated = state.updateOpportunity(item.id, {
      name: "Processamento de Pedidos",
      area: "Comercial",
      impact: 5,
      frequency: 5,
      manualEffort: 5,
      repetitivity: 5,
      dataReadiness: 5,
      difficulty: 4
    });
    expect(updated.quadrant).toBe("STRATEGIC");
  });

  it("should filter opportunities by quadrant and calculate global macro counts", async () => {
    const { state } = await import("../src/state.js");
    
    // Set filters to empty
    state.setFilters({ area: "", priority: "", quadrant: "" });

    const visibleAll = state.getVisibleOpportunities();
    const metricsAll = state.getSummaryMetrics();
    expect(metricsAll.quadrantCounts.quickWin).toBeGreaterThanOrEqual(1);

    // Filter by QUICK WIN
    state.setFilters({ quadrant: "QUICK WIN" });
    const visibleQuickWin = state.getVisibleOpportunities();
    expect(visibleQuickWin.every(item => item.quadrant === "QUICK WIN")).toBe(true);

    // Global counts must remain macro (fixed for all items)
    const metricsFiltered = state.getSummaryMetrics();
    expect(metricsFiltered.quadrantCounts.quickWin).toBe(metricsAll.quadrantCounts.quickWin);

    // Reset filter
    state.setFilters({ quadrant: "" });
    expect(state.getVisibleOpportunities().length).toBe(visibleAll.length);
  });
});


