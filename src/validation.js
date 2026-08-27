export const VALID_AREAS = [
  "Comercial",
  "Marketing",
  "Atendimento",
  "Financeiro",
  "RH",
  "Operações",
  "TI",
  "Outros"
];

/**
 * Valida os dados de uma oportunidade.
 * @param {object} data - Dados da oportunidade
 * @returns {object} { isValid: boolean, errors: string[] }
 */
export function validateOpportunity(data) {
  const errors = [];

  // Nome do processo
  if (!data.name) {
    errors.push("O nome do processo é obrigatório.");
  } else {
    const trimmedName = data.name.trim();
    if (trimmedName.length === 0) {
      errors.push("O nome do processo não pode conter apenas espaços.");
    } else if (trimmedName.length > 80) {
      errors.push("O nome do processo deve ter no máximo 80 caracteres.");
    }
  }

  // Descrição (opcional)
  if (data.description && data.description.trim().length > 300) {
    errors.push("A descrição deve ter no máximo 300 caracteres.");
  }

  // Área
  if (!data.area) {
    errors.push("A área é obrigatória.");
  } else if (!VALID_AREAS.includes(data.area)) {
    errors.push(`A área selecionada é inválida. Opções permitidas: ${VALID_AREAS.join(", ")}.`);
  }

  // Critérios Numéricos
  const numericalCriteria = [
    { key: "impact", label: "Impacto no Negócio" },
    { key: "frequency", label: "Frequência" },
    { key: "manualEffort", label: "Esforço Manual" },
    { key: "repetitivity", label: "Repetitividade" },
    { key: "dataReadiness", label: "Prontidão dos Dados" },
    { key: "difficulty", label: "Dificuldade de Implementação" }
  ];

  numericalCriteria.forEach(({ key, label }) => {
    const val = data[key];
    const num = Number(val);
    if (val === undefined || val === null || val === "" || isNaN(num)) {
      errors.push(`O critério '${label}' é obrigatório e deve ser um número.`);
    } else if (!Number.isInteger(num)) {
      errors.push(`O critério '${label}' deve ser um número inteiro.`);
    } else if (num < 1 || num > 5) {
      errors.push(`O critério '${label}' deve estar entre 1 e 5.`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
}
