/**
 * Calcula a viabilidade técnica baseada na dificuldade.
 * Dificuldade escala: 1 = muito fácil, 5 = muito difícil.
 * @param {number} difficulty - Dificuldade de 1 a 5
 * @returns {number} Viabilidade de 1 a 5
 */
export function calculateViability(difficulty) {
  return 6 - difficulty;
}

/**
 * Calcula o Opportunity Score com base nos critérios numéricos (1 a 5).
 * @param {object} criteria - Objeto contendo os critérios
 * @param {number} criteria.impact - Impacto no negócio (1 a 5)
 * @param {number} criteria.frequency - Frequência (1 a 5)
 * @param {number} criteria.manualEffort - Esforço manual (1 a 5)
 * @param {number} criteria.repetitivity - Repetitividade (1 a 5)
 * @param {number} criteria.dataReadiness - Prontidão dos dados (1 a 5)
 * @param {number} criteria.difficulty - Dificuldade (1 a 5)
 * @returns {number} Opportunity Score entre 0 e 100
 */
export function calculateOpportunityScore({
  impact,
  frequency,
  manualEffort,
  repetitivity,
  dataReadiness,
  difficulty
}) {
  const viability = calculateViability(difficulty);

  const rawScore = (
    impact * 25 +
    frequency * 15 +
    manualEffort * 15 +
    repetitivity * 15 +
    dataReadiness * 15 +
    viability * 15
  ) / 5;

  return Math.round(rawScore);
}

/**
 * Classifica a prioridade com base no Opportunity Score.
 * @param {number} score - Opportunity Score (0 a 100)
 * @returns {string} 'ALTA', 'MÉDIA' ou 'BAIXA'
 */
export function getPriorityLevel(score) {
  if (score >= 80) {
    return 'ALTA';
  } else if (score >= 60) {
    return 'MÉDIA';
  } else {
    return 'BAIXA';
  }
}

/**
 * Classifica a oportunidade em um quadrante estratégico (AI Decision Matrix).
 * @param {number} score - Opportunity Score (0 a 100)
 * @param {number} difficulty - Dificuldade de implementação (1 a 5)
 * @returns {string} 'QUICK WIN' | 'STRATEGIC' | 'OPPORTUNISTIC' | 'DEPRIORITIZE'
 */
export function getDecisionQuadrant(score, difficulty) {
  if (score >= 80) {
    return difficulty <= 2 ? 'QUICK WIN' : 'STRATEGIC';
  } else {
    return difficulty <= 2 ? 'OPPORTUNISTIC' : 'DEPRIORITIZE';
  }
}

