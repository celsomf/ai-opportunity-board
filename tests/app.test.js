import { describe, it, expect } from "vitest";
import { calculateOpportunityScore, getPriorityLevel } from "../src/calculator.js";
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
