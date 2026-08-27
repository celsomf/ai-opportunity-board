# Feature Specification: AI Decision Matrix

**Feature Branch**: `002-ai-desicision-matrix`

**Created**: 2026-08-27

**Status**: Draft

**Input**: User description: "Crie uma nova feature para o projeto existente AI Opportunity Board chamada AI Decision Matrix com base no PRD specs/002-ai-desicision-matrix/prd.md. A AI Decision Matrix é uma camada adicional. Crie User Stories independentes com critérios de aceite objetivos, testáveis e verificáveis na lógica de negócio e no frontend, sem escolher stack ou tecnologia."

## Clarifications

### Session 2026-08-27

- Q: O que deve acontecer ao clicar novamente em um quadrante da Matriz 2x2 que já está selecionado? → A: Toggle (clicar no quadrante ativo desativa o filtro e volta a exibir `TODOS` os quadrantes).
- Q: Como o filtro por Quadrante interage com a busca por texto ou filtros de prioridade existentes? → A: Filtro Combinado (AND) — o filtro por quadrante é cumulativo com a busca e outros filtros ativos.
- Q: O que os contadores dos blocos da Matriz 2x2 devem exibir durante uma busca por texto? → A: Contagem Global Fixa — a Matriz 2x2 exibe sempre a distribuição total do portfólio completo.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Automatic Quadrant Classification & Opportunity Card Badges (Priority: P1)

Como gestor de inovação/automação, quero que o sistema classifique automaticamente cada oportunidade em um dos 4 quadrantes estratégicos com base em seu Opportunity Score e nível de Dificuldade, e exiba um badge visível no card da oportunidade, para que eu identifique instantaneamente a prioridade estratégica sem recalcular manualmente.

**Why this priority**: Esta é a regra de negócio fundamental da feature. Sem a classificação automática e a exibição visual nos cards, a camada estratégica não funciona. Esta história forma um MVP viável por si só.

**Independent Test**: Pode ser testada criando ou editando oportunidades com diferentes combinações de Score (0-100) e Dificuldade (1-5), verificando se a lógica atribui o quadrante correto e se o badge correspondente é exibido nos cards da lista.

**Acceptance Scenarios**:

1. **Classificação Quick Win (Business Logic)**
   - **Given** uma oportunidade com Opportunity Score de `80` ou maior E nível de Dificuldade de `2` ou menor (ex: Score = 80, Dificuldade = 2; ou Score = 100, Dificuldade = 1),
   - **When** o sistema calcula a matriz estratégica da oportunidade,
   - **Then** a oportunidade deve ser classificada com o quadrante `QUICK WIN`.

2. **Classificação Strategic (Business Logic)**
   - **Given** uma oportunidade com Opportunity Score de `80` ou maior E nível de Dificuldade de `3` ou maior (ex: Score = 80, Dificuldade = 3; ou Score = 85, Dificuldade = 4),
   - **When** o sistema calcula a matriz estratégica da oportunidade,
   - **Then** a oportunidade deve ser classificada com o quadrante `STRATEGIC`.

3. **Classificação Opportunistic (Business Logic)**
   - **Given** uma oportunidade com Opportunity Score menor que `80` (ex: 79) E nível de Dificuldade de `2` ou menor (ex: Score = 79, Dificuldade = 2; ou Score = 70, Dificuldade = 2),
   - **When** o sistema calcula a matriz estratégica da oportunidade,
   - **Then** a oportunidade deve ser classificada com o quadrante `OPPORTUNISTIC`.

4. **Classificação Deprioritize (Business Logic)**
   - **Given** uma oportunidade com Opportunity Score menor que `80` (ex: 79) E nível de Dificuldade de `3` ou maior (ex: Score = 79, Dificuldade = 3; ou Score = 50, Dificuldade = 5),
   - **When** o sistema calcula a matriz estratégica da oportunidade,
   - **Then** a oportunidade deve ser classificada com o quadrante `DEPRIORITIZE`.

5. **Exibição do Badge de Quadrante no Card (Frontend)**
   - **Given** a lista de oportunidades exibida na interface do usuário,
   - **When** os cards das oportunidades são renderizados,
   - **Then** cada card deve exibir um badge visualmente destacado com o nome legível do seu quadrante atual (`QUICK WIN`, `STRATEGIC`, `OPPORTUNISTIC` ou `DEPRIORITIZE`), utilizando a identidade de cor associada (Verde para Quick Win, Azul para Strategic, Amarelo/Âmbar para Opportunistic, Vermelho para Deprioritize).

6. **Recálculo Automático ao Editar Oportunidade (Business Logic + Frontend)**
   - **Given** uma oportunidade existente classificada como `QUICK WIN` (Score 80, Dificuldade 2),
   - **When** o usuário edita a Dificuldade dessa oportunidade para `3`,
   - **Then** o sistema deve recalcular instantaneamente o quadrante para `STRATEGIC`, e a interface deve atualizar o badge do card em tempo real para `STRATEGIC` sem exigir recarregamento manual da página.

7. **Preservação de Atributos Existentes (Business Logic)**
   - **Given** uma oportunidade existente no sistema,
   - **When** o quadrante é atribuído ou recalculado,
   - **Then** a fórmula do Opportunity Score existente (0-100) e a classificação de prioridade existente (ALTA, MÉDIA, BAIXA) devem permanecer inalteradas e operacionais.

---

### User Story 2 - Interactive Visual 2x2 Decision Matrix Dashboard Block (Priority: P2)

Como gestor visual, quero visualizar no dashboard uma Matriz 2x2 interativa dividida por 2 eixos (Score vertical, Dificuldade horizontal) que resume a distribuição das oportunidades em 4 quadrantes, para entender rapidamente o panorama geral e poder filtrar a lista ao clicar em um quadrante.

**Why this priority**: Fornece a experiência visual central no dashboard solicitada pelo produto. Permite aos usuários analisar graficamente o portfólio de automação e navegar rapidamente entre os quadrantes.

**Independent Test**: Pode ser testada inserindo um conjunto conhecido de oportunidades e verificando se a Matriz 2x2 exibe os contadores exatos em cada quadrante, o layout de eixos correto, os estados vazios quando aplicável, e se o clique em um quadrante aplica o filtro na lista.

**Acceptance Scenarios**:

1. **Layout e Eixos da Matriz 2x2 (Frontend)**
   - **Given** o dashboard principal da aplicação,
   - **When** a seção AI Decision Matrix é exibida,
   - **Then** a matriz deve ser organizada em um grid 2x2 com a seguinte distribuição espacial exata:
     - Quadrante Superior Esquerdo: `QUICK WIN`
     - Quadrante Superior Direito: `STRATEGIC`
     - Quadrante Inferior Esquerdo: `OPPORTUNISTIC`
     - Quadrante Inferior Direito: `DEPRIORITIZE`
   - **And** os eixos conceituais devem estar claramente indicados (Eixo Vertical: Opportunity Score de Baixo para Alto; Eixo Horizontal: Dificuldade de Baixa para Alta).

2. **Conteúdo Visual de Cada Quadrante (Frontend)**
   - **Given** cada um dos 4 blocos/quadrantes da Matriz 2x2 na interface,
   - **When** renderizado na tela,
   - **Then** cada quadrante deve conter obrigatoriamente:
     - O nome do quadrante em destaque textual legível;
     - Uma breve explicação conceitual do seu significado;
     - O contador numérico exato de oportunidades pertencentes àquele quadrante;
     - Uma identidade de cor distinta em conformidade com as diretrizes visuais (Verde, Azul, Amarelo/Âmbar, Vermelho).

3. **Estado Vazio do Quadrante (Frontend)**
   - **Given** um quadrante específico da matriz que possui `0` oportunidades associadas,
   - **When** o bloco do quadrante é exibido,
   - **Then** ele deve exibir um estado vazio visualmente claro (ex: contador em `0` com indicação de que nenhuma oportunidade se enquadra nessa categoria), sem quebrar o layout da matriz 2x2.

4. **Filtragem ao Clicar em um Quadrante da Matriz (Frontend + Interaction)**
   - **Given** a Matriz 2x2 no dashboard com oportunidades cadastradas,
   - **When** o usuário clica sobre o bloco do quadrante `QUICK WIN`,
   - **Then** a lista de oportunidades deve filtrar imediatamente para exibir apenas as oportunidades do quadrante `QUICK WIN`,
   - **And** o bloco do quadrante `QUICK WIN` deve passar a exibir um estado de destaque visual ativo (selecionado).

---

### User Story 3 - Quick Quadrant Filtering & Dashboard Summary (Priority: P3)

Como usuário navegando no dashboard, quero ter controles de filtro dedicados (como chips, tabs ou botões) para alternar facilmente entre visualizar `TODOS` os quadrantes ou quadrantes específicos, e ter uma indicação clara de como remover o filtro ativo.

**Why this priority**: Melhora a acessibilidade e a usabilidade de navegação, oferecendo múltiplos pontos de controle para filtragem e visualização do portfólio.

**Independent Test**: Pode ser testada alternando entre os botões/chips de filtro (`TODOS`, `QUICK WIN`, `STRATEGIC`, `OPPORTUNISTIC`, `DEPRIORITIZE`), validando a contagem de itens exibidos e a possibilidade de resetar o filtro.

**Acceptance Scenarios**:

1. **Exibição dos Controles de Filtro Por Quadrante (Frontend)**
   - **Given** a área de listagem e filtragem de oportunidades no dashboard,
   - **When** o usuário visualiza a barra de filtros,
   - **Then** devem estar disponíveis opções visuais claras e de fácil acesso para selecionar: `TODOS`, `QUICK WIN`, `STRATEGIC`, `OPPORTUNISTIC` e `DEPRIORITIZE`.

2. **Aplicar e Resetar Filtros (Frontend + Logic)**
   - **Given** a lista filtrada pelo quadrante `STRATEGIC` (seja por clique na matriz ou no botão de filtro),
   - **When** o usuário clica na opção `TODOS` ou na ação de limpar filtros,
   - **Then** a lista de oportunidades deve retornar à exibição completa de todas as oportunidades de todos os quadrantes, e nenhum quadrante individual deve permanecer em estado ativo exclusivo.

3. **Métricas de Resumo no Dashboard (Frontend)**
   - **Given** o painel de métricas/indicadores do dashboard,
   - **When** o dashboard é carregado com oportunidades cadastradas,
   - **Then** o resumo executivo deve exibir os totais consolidados por quadrante em tempo real junto aos indicadores existentes do sistema.

---

### Edge Cases

- **Dados Existentes**: Como o sistema trata oportunidades criadas antes da implementação da AI Decision Matrix?
  - *Comportamento esperado*: Ao carregar o repositório/armazenamento existente, o sistema deve calcular dinamicamente e atribuir automaticamente o quadrante para cada oportunidade existente sem perda de dados ou necessidade de migração manual.
- **Valores Limite Exatos (Boundaries)**:
  - `Score = 80, Dificuldade = 2` -> `QUICK WIN`
  - `Score = 80, Dificuldade = 3` -> `STRATEGIC`
  - `Score = 79, Dificuldade = 2` -> `OPPORTUNISTIC`
  - `Score = 79, Dificuldade = 3` -> `DEPRIORITIZE`
  - `Score = 0, Dificuldade = 5` -> `DEPRIORITIZE`
  - `Score = 100, Dificuldade = 1` -> `QUICK WIN`
- **Lista Vazia de Oportunidades**:
  - Quando não há nenhuma oportunidade cadastrada no sistema, a matriz 2x2 deve renderizar todos os 4 quadrantes com a contagem `0` e exibir mensagens adequadas de estado vazio na lista e no dashboard.
- **Navegação com Filtro sem Resultados**:
  - Se o usuário selecionar um filtro de quadrante que possui `0` oportunidades, a lista deve exibir uma mensagem descritiva amigável (ex: "Nenhuma oportunidade encontrada no quadrante [NOME DO QUADRANTE]").

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE calcular automaticamente o quadrante estratégico de cada oportunidade utilizando o Opportunity Score (0 a 100) e o nível de Dificuldade de Implementação (1 a 5).
- **FR-002**: O sistema DEVE classificar como `QUICK WIN` qualquer oportunidade com `Score >= 80` E `Dificuldade <= 2`.
- **FR-003**: O sistema DEVE classificar como `STRATEGIC` qualquer oportunidade com `Score >= 80` E `Dificuldade >= 3`.
- **FR-004**: O sistema DEVE classificar como `OPPORTUNISTIC` qualquer oportunidade com `Score < 80` E `Dificuldade <= 2`.
- **FR-005**: O sistema DEVE classificar como `DEPRIORITIZE` qualquer oportunidade com `Score < 80` E `Dificuldade >= 3`.
- **FR-006**: O sistema DEVE atualizar automaticamente a classificação de quadrante de uma oportunidade imediatamente após a criação ou edição dos seus campos de score ou dificuldade.
- **FR-007**: O sistema DEVE garantir retrocompatibilidade com todas as oportunidades já gravadas no armazenamento da aplicação, calculando seus quadrantes na inicialização.
- **FR-008**: O sistema DEVE preservar a fórmula do Opportunity Score existente, a classificação de prioridade existente (ALTA, MÉDIA, BAIXA) e todas as funcionalidades anteriores do AI Opportunity Board.
- **FR-009**: O frontend DEVE exibir no dashboard uma Matriz Visual 2x2 contendo os 4 quadrantes distribuídos conceitualmente nos eixos de Opportunity Score (vertical: baixo -> alto) e Dificuldade (horizontal: baixa -> alta).
- **FR-010**: Cada quadrante da Matriz 2x2 no frontend DEVE exibir seu nome, uma breve explicação conceitual, a quantidade total de oportunidades pertencentes ao quadrante, uma identidade visual com cor distinta e estado vazio quando contiver 0 itens.
- **FR-011**: O frontend DEVE permitir que cada quadrante da Matriz 2x2 seja clicável para filtrar a lista de oportunidades para o quadrante selecionado, aplicando um indicador visual de estado ativo ao quadrante clicado. Clicar novamente no mesmo quadrante ativo DEVE funcionar como toggle, desativando o filtro e retornando a lista à exibição de `TODOS`.
- **FR-012**: O frontend DEVE fornecer controles visuais acessíveis de filtro (ex: chips, tabs ou botões) para alternar a visualização entre `TODOS`, `QUICK WIN`, `STRATEGIC`, `OPPORTUNISTIC` e `DEPRIORITIZE`.
- **FR-013**: O frontend DEVE fornecer um mecanismo claro para desativar o filtro de quadrante e retornar à visualização de `TODOS`.
- **FR-014**: Cada card de oportunidade na lista DEVE exibir um badge visual destacado identificando o quadrante atual da oportunidade.
- **FR-015**: O badge de quadrante nos cards DEVE garantir alta legibilidade do texto do quadrante, sem depender exclusivamente da cor para acessibilidade.
- **FR-016**: Os filtros por quadrante DEVEM funcionar de forma cumulativa (combinação lógica AND) com os filtros existentes de busca textual e prioridade, exibindo apenas as oportunidades que atendem simultaneamente a todos os critérios ativos.
- **FR-017**: Os contadores numéricos de oportunidades nos 4 blocos da Matriz 2x2 DEVEM refletir a contagem total global do portfólio cadastrado no sistema, mantendo a visão macro fixa independente de termos de busca textual aplicados à lista de oportunidades.

### Key Entities *(mandatory)*

- **Opportunity (Oportunidade - Entidade Existente Estendida)**:
  - *Representação*: Item de automação cadastrado no sistema.
  - *Atributos Relevantes*: ID, Título/Processo, Opportunity Score (0-100), Dificuldade (1-5), Prioridade Existente (ALTA/MÉDIA/BAIXA).
  - *Novo Atributo Calculado*: Quadrante Estratégico (`QUICK WIN` | `STRATEGIC` | `OPPORTUNISTIC` | `DEPRIORITIZE`).

- **Decision Matrix Summary (Resumo da Matriz de Decisão)**:
  - *Representação*: Visão agregada do portfólio de oportunidades distribuídas pelos quadrantes.
  - *Atributos*: Contagem total por quadrante (`quickWinCount`, `strategicCount`, `opportunisticCount`, `deprioritizeCount`), Quadrante atualmente selecionado para filtro (`activeFilter`).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: **100% de Precisão na Classificação**: Todas as oportunidades existentes e novas são classificadas no quadrante exato conforme as regras de negócio definidas (Score e Dificuldade) sem exceções ou erro de arredondamento nos limites (ex: Score 80, Dificuldade 2/3).
- **SC-002**: **Atualização Instantânea na Interface**: Quando uma oportunidade é criada ou editada, o quadrante e a Matriz 2x2 são atualizados na interface sem necessidade de recarregamento manual da página.
- **SC-003**: **Identificação Visual Rápida**: 100% das oportunidades exibidas na lista possuem badges de quadrante visíveis e legíveis à primeira vista sem exigir abertura de modais ou detalhes.
- **SC-004**: **Eficiência de Filtragem**: O usuário consegue filtrar a lista por qualquer quadrante clicando diretamente no quadrante da Matriz 2x2 ou nos botões de filtro com resposta imediata.
- **SC-005**: **Zero Regressão**: 100% das funcionalidades anteriores do AI Opportunity Board (Opportunity Score, prioridades ALTA/MÉDIA/BAIXA e persistência) continuam funcionando perfeitamente sem alterações colaterais.

## Assumptions

- **Regras de Negócio Fixas**: A regra de divisão de Score (ponto de corte em 80) e Dificuldade (ponto de corte em 2 vs 3) é fixa e não configurável pelo usuário nesta versão.
- **Preservação de Dados**: O esquema de dados existente de oportunidades aceita campos calculados em memória/runtime ou a adição da propriedade de quadrante sem corromper os registros salvos.
- **Identidade de Cores**: As cores sugeridas no PRD (Verde = Quick Win, Azul = Strategic, Amarelo/Âmbar = Opportunistic, Vermelho = Deprioritize) devem ter contraste adequado com o texto para atender diretrizes de acessibilidade visual.
- **Escopo Tecnológico Neutro**: A especificação descreve o comportamento funcional e os componentes visuais de interface de forma genérica, sem impor nenhuma biblioteca ou framework específico.
