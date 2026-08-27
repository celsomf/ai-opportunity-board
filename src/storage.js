const STORAGE_KEY = "ai_opportunities_board_data";

/**
 * Salva a lista de oportunidades no localStorage.
 * @param {Array} opportunities - Lista de oportunidades
 */
export function saveOpportunities(opportunities) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(opportunities));
  } catch (error) {
    console.error("Erro ao salvar no localStorage:", error);
  }
}

/**
 * Carrega a lista de oportunidades do localStorage.
 * @returns {Array} Lista de oportunidades cadastradas
 */
export function loadOpportunities() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Erro ao ler do localStorage:", error);
    return [];
  }
}
