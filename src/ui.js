import { state } from "./state.js";

// DOM References Cache
let elements = {};

export function initializeUI() {
  elements = {
    form: document.getElementById("opportunity-form"),
    formTitle: document.getElementById("form-title"),
    fieldId: document.getElementById("field-id"),
    fieldName: document.getElementById("field-name"),
    fieldArea: document.getElementById("field-area"),
    fieldDescription: document.getElementById("field-description"),
    fieldImpact: document.getElementById("field-impact"),
    fieldFrequency: document.getElementById("field-frequency"),
    fieldManualEffort: document.getElementById("field-manual-effort"),
    fieldRepetitivity: document.getElementById("field-repetitivity"),
    fieldDataReadiness: document.getElementById("field-data-readiness"),
    fieldDifficulty: document.getElementById("field-difficulty"),
    formErrors: document.getElementById("form-errors"),
    btnSave: document.getElementById("btn-save"),
    btnCancel: document.getElementById("btn-cancel"),
    filterArea: document.getElementById("filter-area"),
    filterPriority: document.getElementById("filter-priority"),
    metricTotal: document.getElementById("metric-total"),
    metricHighPriority: document.getElementById("metric-high-priority"),
    metricAverageScore: document.getElementById("metric-average-score"),
    opportunitiesList: document.getElementById("opportunities-list")
  };

  // Event Listeners setup
  elements.form.addEventListener("submit", handleFormSubmit);
  elements.btnCancel.addEventListener("click", resetForm);
  elements.filterArea.addEventListener("change", handleFiltersChange);
  elements.filterPriority.addEventListener("change", handleFiltersChange);

  // Subscribe UI render to State changes
  state.subscribe(render);
}

function handleFormSubmit(e) {
  e.preventDefault();

  const id = elements.fieldId.value;
  const data = {
    name: elements.fieldName.value,
    area: elements.fieldArea.value,
    description: elements.fieldDescription.value,
    impact: Number(elements.fieldImpact.value),
    frequency: Number(elements.fieldFrequency.value),
    manualEffort: Number(elements.fieldManualEffort.value),
    repetitivity: Number(elements.fieldRepetitivity.value),
    dataReadiness: Number(elements.fieldDataReadiness.value),
    difficulty: Number(elements.fieldDifficulty.value)
  };

  try {
    if (id) {
      state.updateOpportunity(id, data);
    } else {
      state.addOpportunity(data);
    }
    resetForm();
  } catch (error) {
    showErrors(error.message.split("\n"));
  }
}

function handleFiltersChange() {
  state.setFilters({
    area: elements.filterArea.value,
    priority: elements.filterPriority.value
  });
}

function startEdit(item) {
  elements.formTitle.textContent = "Editar Oportunidade";
  elements.fieldId.value = item.id;
  elements.fieldName.value = item.name;
  elements.fieldArea.value = item.area;
  elements.fieldDescription.value = item.description;
  elements.fieldImpact.value = item.impact;
  elements.fieldFrequency.value = item.frequency;
  elements.fieldManualEffort.value = item.manualEffort;
  elements.fieldRepetitivity.value = item.repetitivity;
  elements.fieldDataReadiness.value = item.dataReadiness;
  elements.fieldDifficulty.value = item.difficulty;

  elements.btnSave.textContent = "Salvar Alterações";
  elements.btnCancel.classList.remove("hidden");
  hideErrors();

  // Rolar até o formulário
  elements.form.scrollIntoView({ behavior: "smooth" });
}

function resetForm() {
  elements.formTitle.textContent = "Cadastrar Oportunidade";
  elements.fieldId.value = "";
  elements.form.reset();
  elements.btnSave.textContent = "Salvar Oportunidade";
  elements.btnCancel.classList.add("hidden");
  hideErrors();
}

function showErrors(errors) {
  elements.formErrors.innerHTML = errors.map(err => `<p>• ${err}</p>`).join("");
  elements.formErrors.classList.remove("hidden");
}

function hideErrors() {
  elements.formErrors.innerHTML = "";
  elements.formErrors.classList.add("hidden");
}

function render(visibleOpportunities, metrics) {
  // Update Dashboard cards
  elements.metricTotal.textContent = metrics.total;
  elements.metricHighPriority.textContent = metrics.highPriorityCount;
  elements.metricAverageScore.textContent = metrics.averageScore;

  // Render Opportunities list
  elements.opportunitiesList.innerHTML = "";

  if (visibleOpportunities.length === 0) {
    elements.opportunitiesList.innerHTML = `
      <div class="empty-state">
        Nenhuma oportunidade encontrada com os filtros selecionados.
      </div>
    `;
    return;
  }

  visibleOpportunities.forEach(item => {
    const card = document.createElement("div");
    card.className = "opportunity-card";

    card.innerHTML = `
      <div class="card-header">
        <span class="card-title">${escapeHTML(item.name)}</span>
        <div class="card-meta">
          <span class="badge badge-area">${escapeHTML(item.area)}</span>
          <span class="badge badge-priority-${item.priority.toLowerCase()}">
            ${item.priority}
          </span>
        </div>
      </div>

      ${item.description ? `<p class="card-desc">${escapeHTML(item.description)}</p>` : ""}

      <div class="card-criteria-summary">
        <span>Imp: ${item.impact}</span>
        <span>Freq: ${item.frequency}</span>
        <span>Esf Man: ${item.manualEffort}</span>
        <span>Rep: ${item.repetitivity}</span>
        <span>Dados: ${item.dataReadiness}</span>
        <span>Dif: ${item.difficulty}</span>

        <div class="score-badge-container" style="margin-left: auto;">
          <span>Score:</span>
          <span class="score-value">${item.score}</span>
        </div>
      </div>

      <div class="card-actions">
        <button class="btn btn-secondary btn-edit">Editar</button>
        <button class="btn btn-danger btn-delete">Excluir</button>
      </div>
    `;

    // Action buttons listeners
    card.querySelector(".btn-edit").addEventListener("click", () => startEdit(item));
    card.querySelector(".btn-delete").addEventListener("click", () => {
      if (confirm(`Deseja realmente excluir a oportunidade "${item.name}"?`)) {
        state.deleteOpportunity(item.id);
        // Se a oportunidade que estava sendo editada foi excluída, reseta o form
        if (elements.fieldId.value === item.id) {
          resetForm();
        }
      }
    });

    elements.opportunitiesList.appendChild(card);
  });
}

function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
