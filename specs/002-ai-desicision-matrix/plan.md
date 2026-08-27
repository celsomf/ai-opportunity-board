# Implementation Plan: AI Decision Matrix

**Branch**: `002-ai-decision-matrix` | **Date**: 2026-08-27 | **Spec**: [spec.md](file:///c:/Aula/projeto1/specs/002-ai-desicision-matrix/spec.md)

**Input**: Feature specification from `specs/002-ai-desicision-matrix/spec.md` and PRD `specs/002-ai-desicision-matrix/prd.md`.

## Summary

Adicionar a camada visual e estratégica **AI Decision Matrix** ao projeto AI Opportunity Board. A feature classifica automaticamente qualquer oportunidade em 4 quadrantes estratégicos (`QUICK WIN`, `STRATEGIC`, `OPPORTUNISTIC`, `DEPRIORITIZE`) utilizando a fórmula existente do Opportunity Score (0 a 100) e a Dificuldade de Implementação (1 a 5). Inclui uma função matemática determinística e isolada no módulo calculator, um painel interativo 2x2 no dashboard com filtragem integrada, badges nos cards, contagens globais fixas e suporte completo a dados legados no `localStorage`.

---

## Technical Context

- **Language/Version**: JavaScript (ES6+ ESM modules in browser)
- **Primary Dependencies**: Vite 5.0.0 (bundler/dev server) — *Nenhuma biblioteca externa adicional será introduzida*
- **Storage**: Web `localStorage` (via `src/storage.js`)
- **Testing**: Vitest 1.0.0 (execução via `npm test`)
- **Target Platform**: Modern Web Browsers (Chrome/Firefox/Edge/Safari)
- **Project Type**: Lightweight Vanilla JS Web Application
- **Performance Goals**: Rendimento instantâneo em tempo real (< 16ms render loop, sem reload)
- **Constraints**: Preservação total das funcionalidades existentes (score, prioridades ALTA/MÉDIA/BAIXA), sem refatoração desnecessária de código legado.

---

## Constitution Check

*GATE: Must pass before implementation. Re-check after design.*

1. **Principle I: Simplicity Over Complexity** — PASSED. Utiliza CSS Grid nativo e funções puras JS ESM sem adicionar frameworks ou abstrações desnecessárias.
2. **Principle II & III: Explicit Requirement Driven** — PASSED. Todas as mudanças atendem estritamente às especificações do `spec.md` e `prd.md`.
3. **Principle IV: Input Validation** — PASSED. Dificuldade continua validada na faixa 1-5 e Score 0-100 antes da classificação.
4. **Principle V & VI: Deterministic & Centralized Calculations** — PASSED. `getDecisionQuadrant(score, difficulty)` será isolada em `src/calculator.js` com 100% de cobertura determinística em testes unitários.
5. **Principle VII & VIII & IX: Quality Gates & Verification** — PASSED. Plano inclui testes unitários automatizados com Vitest cobrindo os casos A, B, C, D e limites exatos, além do checklist visual de frontend.
6. **Principle XI: Non-Volatile Persistence** — PASSED. Dados salvos e lidos do `localStorage` calculam o quadrante dinamicamente na inicialização.
7. **Principle XIII: Dependency Minimization** — PASSED. Zero novas dependências adicionadas ao `package.json`.

*Status Final Gate*: **APPROVED** (14 de 14 princípios em total conformidade, 0 violações).

---

## Proposed Changes

### [Core Logic & Calculator]

#### [MODIFY] [calculator.js](file:///c:/Aula/projeto1/src/calculator.js)
- Adicionar e exportar a função pura determinística `getDecisionQuadrant(score, difficulty)`:
  - `score >= 80` e `difficulty <= 2` => `'QUICK WIN'`
  - `score >= 80` e `difficulty >= 3` => `'STRATEGIC'`
  - `score < 80` e `difficulty <= 2` => `'OPPORTUNISTIC'`
  - `score < 80` e `difficulty >= 3` => `'DEPRIORITIZE'`

---

### [State & Data Persistence]

#### [MODIFY] [state.js](file:///c:/Aula/projeto1/src/state.js)
- Importar `getDecisionQuadrant` de `./calculator.js`.
- Em `addOpportunity` e `updateOpportunity`, calcular `quadrant = getDecisionQuadrant(score, difficulty)` e incluir o atributo no objeto gravado.
- Na inicialização (`loadOpportunities()`), garantir que cada item carregado do `localStorage` possua a propriedade `quadrant` calculada.
- Adicionar a propriedade `quadrant: ""` ao objeto `this.filters`.
- Em `getVisibleOpportunities()`, adicionar a condição cumulativa (AND):
  `if (this.filters.quadrant) result = result.filter(item => item.quadrant === this.filters.quadrant);`
- Em `getSummaryMetrics()`, adicionar `quadrantCounts` contendo a contagem global fixa do portfólio completo para cada um dos 4 quadrantes (`quickWin`, `strategic`, `opportunistic`, `deprioritize`).

---

### [Frontend & User Interface]

#### [MODIFY] [index.html](file:///c:/Aula/projeto1/index.html)
- Adicionar o bloco HTML da Matriz Visual 2x2 (`<section class="decision-matrix-section">`) no dashboard principal com os eixos conceituais (Score vertical, Dificuldade horizontal), os 4 blocos de quadrantes com seus nomes, descrições e contadores (`#count-quick-win`, `#count-strategic`, `#count-opportunistic`, `#count-deprioritize`).
- Adicionar a barra de filtros por chips/botões (`TODOS`, `QUICK WIN`, `STRATEGIC`, `OPPORTUNISTIC`, `DEPRIORITIZE`).

#### [MODIFY] [ui.js](file:///c:/Aula/projeto1/src/ui.js)
- Mapear em `elements` as referências para os blocos da matriz 2x2, contadores e botões de filtro.
- Em `initializeUI()`, adicionar event listeners nos blocos da matriz e nos botões de filtro:
  - Clicar em um quadrante alterna o filtro `state.setFilters({ quadrant: selectedQuadrant })` (com comportamento toggle: se já ativo, desativa voltando para `""` / `TODOS`).
- Na função `render()`:
  - Atualizar os contadores numéricos de cada quadrante na Matriz 2x2 com `metrics.quadrantCounts`.
  - Aplicar/remover classes visuais de destaque ativo (`active`) no quadrante e no botão de filtro correspondente.
  - No loop de renderização de cards, incluir o badge visual com a classe `badge-quadrant badge-quadrant-${slug}` e texto legível do quadrante.

#### [MODIFY] [style.css](file:///c:/Aula/projeto1/style.css)
- Adicionar estilos para o grid 2x2 da Matriz de Decisão:
  - Layout CSS Grid 2x2 responsivo.
  - Variáveis de cores para a identidade visual de cada quadrante:
    - Quick Win: Verde (`#10b981`, fundo suave `#ecfdf5`, borda `#a7f3d0`)
    - Strategic: Azul (`#3b82f6`, fundo suave `#eff6ff`, borda `#bfdbfe`)
    - Opportunistic: Amarelo/Âmbar (`#f59e0b`, fundo suave `#fffbeb`, borda `#fde68a`)
    - Deprioritize: Vermelho (`#ef4444`, fundo suave `#fef2f2`, borda `#fecaca`)
  - Estilos de hover, cursor pointer e estado ativo selecionado (`.active` com border mais espessa/shadow).
  - Estilos para a barra de chips de filtro e badges nos cards.

---

### [Automated Tests]

#### [MODIFY] [app.test.js](file:///c:/Aula/projeto1/tests/app.test.js)
- Importar `getDecisionQuadrant` e criar blocos de teste com Vitest:
  - **Reference Cases (PRD)**:
    - Caso A: `score = 100, difficulty = 1` => `'QUICK WIN'`
    - Caso B: `score = 85, difficulty = 4` => `'STRATEGIC'`
    - Caso C: `score = 70, difficulty = 2` => `'OPPORTUNISTIC'`
    - Caso D: `score = 50, difficulty = 5` => `'DEPRIORITIZE'`
  - **Boundary Limits (Spec)**:
    - `score = 80, difficulty = 2` => `'QUICK WIN'`
    - `score = 80, difficulty = 3` => `'STRATEGIC'`
    - `score = 79, difficulty = 2` => `'OPPORTUNISTIC'`
    - `score = 79, difficulty = 3` => `'DEPRIORITIZE'`
  - **State Integration Tests**:
    - Adicionar oportunidade calcula `quadrant`.
    - Editar oportunidade atualiza `quadrant` em tempo real.
    - Filtrar por quadrante filtra lista mantendo contagens globais fixas.

---

## Verification Plan

### Automated Tests
- Executar a suíte de testes unitários automatizados com Vitest:
  ```bash
  npm test
  ```
  *Critério de Aceito*: Todos os testes novos e existentes passam com 100% de sucesso.

### Manual Verification Checklist (Frontend)
- [ ] **Matriz 2x2 Visível**: Seção do dashboard renderiza grid 2x2 com os 2 eixos indicados.
- [ ] **Quatro Quadrantes Identificáveis**: Cores verde, azul, amarelo e vermelho com rótulos visíveis.
- [ ] **Contagens Corretas**: Cada bloco 2x2 exibe a quantidade exata de itens pertencentes ao quadrante.
- [ ] **Badges nos Cards**: Cada card de oportunidade exibe o badge do quadrante.
- [ ] **Clique no Quadrante**: Clicar em um bloco 2x2 filtra a lista apenas para aquele quadrante.
- [ ] **Estado Ativo**: O quadrante filtrado e o chip de filtro exibem destaque visual ativo.
- [ ] **Retorno para TODOS**: Clicar novamente no mesmo quadrante (toggle) ou no chip `TODOS` restaura a lista completa.
- [ ] **Atualização após Edição**: Alterar a Dificuldade de uma oportunidade recalcula o quadrante e o badge imediatamente.
- [ ] **Persistência após Reload**: Atualizar a página (F5) mantém os dados e quadrantes salvos no `localStorage`.
