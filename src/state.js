import { calculateOpportunityScore, getPriorityLevel, getDecisionQuadrant } from "./calculator.js";
import { saveOpportunities, loadOpportunities } from "./storage.js";
import { validateOpportunity } from "./validation.js";

class AppStateManager {
  constructor() {
    this.opportunities = loadOpportunities().map(item => ({
      ...item,
      quadrant: getDecisionQuadrant(item.score, item.difficulty)
    }));
    this.filters = {
      area: "",
      priority: "",
      quadrant: ""
    };
    this.listeners = [];
  }

  // Registra callback para mudanças de estado (ex: re-renderizar a UI)
  subscribe(listener) {
    this.listeners.push(listener);
    // Executa imediatamente para renderizar o estado inicial
    listener(this.getVisibleOpportunities(), this.getSummaryMetrics());
  }

  notify() {
    const visible = this.getVisibleOpportunities();
    const metrics = this.getSummaryMetrics();
    this.listeners.forEach(listener => listener(visible, metrics));
  }

  getOpportunities() {
    return this.opportunities;
  }

  addOpportunity(data) {
    const validation = validateOpportunity(data);
    if (!validation.isValid) {
      throw new Error(validation.errors.join("\n"));
    }

    const score = calculateOpportunityScore(data);
    const priority = getPriorityLevel(score);
    const quadrant = getDecisionQuadrant(score, Number(data.difficulty));

    const newOpportunity = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15),
      name: data.name.trim(),
      area: data.area,
      description: data.description ? data.description.trim() : "",
      impact: Number(data.impact),
      frequency: Number(data.frequency),
      manualEffort: Number(data.manualEffort),
      repetitivity: Number(data.repetitivity),
      dataReadiness: Number(data.dataReadiness),
      difficulty: Number(data.difficulty),
      score,
      priority,
      quadrant,
      createdAt: Date.now()
    };

    this.opportunities.push(newOpportunity);
    saveOpportunities(this.opportunities);
    this.notify();
    return newOpportunity;
  }

  updateOpportunity(id, data) {
    const index = this.opportunities.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error("Oportunidade não encontrada.");
    }

    const validation = validateOpportunity(data);
    if (!validation.isValid) {
      throw new Error(validation.errors.join("\n"));
    }

    const score = calculateOpportunityScore(data);
    const priority = getPriorityLevel(score);
    const quadrant = getDecisionQuadrant(score, Number(data.difficulty));

    this.opportunities[index] = {
      ...this.opportunities[index],
      name: data.name.trim(),
      area: data.area,
      description: data.description ? data.description.trim() : "",
      impact: Number(data.impact),
      frequency: Number(data.frequency),
      manualEffort: Number(data.manualEffort),
      repetitivity: Number(data.repetitivity),
      dataReadiness: Number(data.dataReadiness),
      difficulty: Number(data.difficulty),
      score,
      priority,
      quadrant
    };

    saveOpportunities(this.opportunities);
    this.notify();
    return this.opportunities[index];
  }

  deleteOpportunity(id) {
    this.opportunities = this.opportunities.filter(item => item.id !== id);
    saveOpportunities(this.opportunities);
    this.notify();
  }

  setFilters(filters) {
    this.filters = {
      ...this.filters,
      ...filters
    };
    this.notify();
  }

  getVisibleOpportunities() {
    let result = [...this.opportunities];

    // Filtros cumulativos (AND)
    if (this.filters.area) {
      result = result.filter(item => item.area === this.filters.area);
    }
    if (this.filters.priority) {
      result = result.filter(item => item.priority === this.filters.priority);
    }
    if (this.filters.quadrant) {
      result = result.filter(item => item.quadrant === this.filters.quadrant);
    }

    // Ordenação: Maior score para menor. Tie-breaker: Data de criação mais recente primeiro
    result.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return b.createdAt - a.createdAt;
    });

    return result;
  }

  getSummaryMetrics() {
    const visible = this.getVisibleOpportunities();
    const total = visible.length;
    const highPriorityCount = visible.filter(item => item.priority === "ALTA").length;

    let averageScore = 0;
    if (total > 0) {
      const sum = visible.reduce((acc, item) => acc + item.score, 0);
      // Arredondar média para 1 casa decimal
      averageScore = Math.round((sum / total) * 10) / 10;
    }

    // Contagem macro global de todo o portfólio (visão panorâmica fixa)
    const all = this.opportunities;
    const quadrantCounts = {
      quickWin: all.filter(item => item.quadrant === "QUICK WIN").length,
      strategic: all.filter(item => item.quadrant === "STRATEGIC").length,
      opportunistic: all.filter(item => item.quadrant === "OPPORTUNISTIC").length,
      deprioritize: all.filter(item => item.quadrant === "DEPRIORITIZE").length
    };

    return {
      total,
      highPriorityCount,
      averageScore,
      quadrantCounts,
      activeQuadrantFilter: this.filters.quadrant
    };
  }
}

export const state = new AppStateManager();
