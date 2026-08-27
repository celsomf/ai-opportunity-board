# Interface Contract & UI Specification: AI Decision Matrix

## 1. Public Logic Contract (`src/calculator.js`)

### Function: `getDecisionQuadrant(score, difficulty)`

Calcula deterministicamente o quadrante estratégico da oportunidade com base nos valores de score e dificuldade.

#### Input Parameters
- `score` (`number`): Opportunity Score (número inteiro de 0 a 100).
- `difficulty` (`number`): Nível de dificuldade de implementação (número inteiro de 1 a 5).

#### Return Value
- `string`: Um dos quatro identificadores exatos:
  - `"QUICK WIN"`
  - `"STRATEGIC"`
  - `"OPPORTUNISTIC"`
  - `"DEPRIORITIZE"`

#### Throws / Validations
- Se `score` não for um número finito ou `difficulty` for inválido (fora do intervalo 1-5), lança um `TypeError` / `RangeError`.

---

## 2. Dashboard UI Contract & DOM Elements (`index.html` & `src/ui.js`)

### Matrix Section Container: `#decision-matrix`

Grid 2x2 posicionado estrategicamente no Dashboard.

```html
<section class="decision-matrix-section">
  <div class="matrix-header">
    <h2>AI Decision Matrix</h2>
    <span class="matrix-subtitle">Priorização visual por Eixo de Impacto (Score) e Dificuldade</span>
  </div>

  <div class="matrix-grid-container">
    <!-- Eixo Vertical (Opportunity Score: Baixo -> Alto) -->
    <div class="axis-label vertical-axis">Opportunity Score (Baixo → Alto)</div>
    
    <div class="matrix-grid">
      <!-- Quadrante Superior Esquerdo: QUICK WIN -->
      <div class="matrix-card quadrant-quick-win" data-quadrant="QUICK WIN" role="button" tabindex="0">
        <div class="quadrant-header">
          <span class="quadrant-title">QUICK WIN</span>
          <span class="quadrant-count" id="count-quick-win">0</span>
        </div>
        <p class="quadrant-desc">Alto Impacto / Score ≥ 80 e Baixa Dificuldade (≤ 2)</p>
      </div>

      <!-- Quadrante Superior Direito: STRATEGIC -->
      <div class="matrix-card quadrant-strategic" data-quadrant="STRATEGIC" role="button" tabindex="0">
        <div class="quadrant-header">
          <span class="quadrant-title">STRATEGIC</span>
          <span class="quadrant-count" id="count-strategic">0</span>
        </div>
        <p class="quadrant-desc">Alto Impacto / Score ≥ 80 e Alta Dificuldade (≥ 3)</p>
      </div>

      <!-- Quadrante Inferior Esquerdo: OPPORTUNISTIC -->
      <div class="matrix-card quadrant-opportunistic" data-quadrant="OPPORTUNISTIC" role="button" tabindex="0">
        <div class="quadrant-header">
          <span class="quadrant-title">OPPORTUNISTIC</span>
          <span class="quadrant-count" id="count-opportunistic">0</span>
        </div>
        <p class="quadrant-desc">Menor Score (&lt; 80) e Baixa Dificuldade (≤ 2)</p>
      </div>

      <!-- Quadrante Inferior Direito: DEPRIORITIZE -->
      <div class="matrix-card quadrant-deprioritize" data-quadrant="DEPRIORITIZE" role="button" tabindex="0">
        <div class="quadrant-header">
          <span class="quadrant-title">DEPRIORITIZE</span>
          <span class="quadrant-count" id="count-deprioritize">0</span>
        </div>
        <p class="quadrant-desc">Menor Score (&lt; 80) e Alta Dificuldade (≥ 3)</p>
      </div>
    </div>

    <!-- Eixo Horizontal (Dificuldade: Baixa -> Alta) -->
    <div class="axis-label horizontal-axis">Dificuldade de Implementação (Baixa → Alta)</div>
  </div>

  <!-- Quick Filter Chips / Tabs -->
  <div class="quadrant-filter-bar">
    <span class="filter-label">Filtrar por Quadrante:</span>
    <button class="chip-filter active" data-quadrant-filter="">TODOS</button>
    <button class="chip-filter chip-quick-win" data-quadrant-filter="QUICK WIN">QUICK WIN</button>
    <button class="chip-filter chip-strategic" data-quadrant-filter="STRATEGIC">STRATEGIC</button>
    <button class="chip-filter chip-opportunistic" data-quadrant-filter="OPPORTUNISTIC">OPPORTUNISTIC</button>
    <button class="chip-filter chip-deprioritize" data-quadrant-filter="DEPRIORITIZE">DEPRIORITIZE</button>
  </div>
</section>
```

---

## 3. Card Badge Contract (`src/ui.js`)

Cada card de oportunidade renderizado em `.opportunities-list` inclui um badge com classe CSS variante por quadrante:

```html
<span class="badge badge-quadrant badge-quadrant-${quadrantSlug}">
  ${item.quadrant}
</span>
```
- Quick Win slug: `quick-win`
- Strategic slug: `strategic`
- Opportunistic slug: `opportunistic`
- Deprioritize slug: `deprioritize`
