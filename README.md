# AI Opportunity Board

O **AI Opportunity Board** é uma aplicação web interativa projetada para mapear, avaliar e priorizar iniciativas e casos de uso de Inteligência Artificial em organizações. A ferramenta calcula o **Opportunity Score** de cada projeto com base em métricas de impacto de negócio, viabilidade técnica e prontidão operacional.

---

## 🎯 Objetivo do Projeto

Ajudar times de produto, inovação e tecnologia a identificar quais iniciativas de IA oferecem o maior retorno com o menor risco, fornecendo uma matriz clara de priorização para tomada de decisão estratégica.

---

## ✨ Principais Funcionalidades

- **Cadastro e Edição de Oportunidades**: Registro de ideias de IA com descrição, área responsável e pontuações de critérios.
- **Cálculo Automático de Viabilidade e Score**: Avaliação em tempo real dos critérios fornecidos.
- **Classificação Transparente de Prioridades**: Separação visual das oportunidades em níveis de prioridade (Alta, Média, Baixa).
- **Persistência de Dados**: Salvamento automático no navegador via `localStorage`.
- **Filtros e Ordenação**: Visualização dinâmica por faixa de prioridade ou ordenação por pontuação.

---

## 📊 Fórmula do Opportunity Score e Priorização

O **Opportunity Score** (escala de 0 a 100) é calculado a partir de 6 critérios pontuados de 1 a 5:

1. **Impacto no Negócio** (peso 25%)
2. **Frequência da Tarefa** (peso 15%)
3. **Esforço Manual Atual** (peso 15%)
4. **Repetitividade** (peso 15%)
5. **Prontidão dos Dados** (peso 15%)
6. **Viabilidade Técnica** (peso 15%) — calculada inversamente a partir da Dificuldade (1 a 5):
   $$\text{Viabilidade} = 6 - \text{Dificuldade}$$

### Cálculo do Score:
$$\text{Raw Score} = \frac{(\text{Impacto} \times 25) + (\text{Frequência} \times 15) + (\text{Esforço Manual} \times 15) + (\text{Repetitividade} \times 15) + (\text{Prontidão dos Dados} \times 15) + (\text{Viabilidade} \times 15)}{5}$$

$$\text{Opportunity Score} = \text{Math.round}(\text{Raw Score})$$

### Faixas de Prioridade:
- 🟢 **ALTA**: Score $\ge 80$ (Projetos prioritários com alto retorno e viabilidade)
- 🟡 **MÉDIA**: Score $\ge 60$ e $< 80$ (Oportunidades promissoras para segundo momento)
- 🔴 **BAIXA**: Score $< 60$ (Baixo impacto ou alta complexidade/dificuldade)

---

## 🛠️ Tecnologias Utilizadas

- **Linguagem**: HTML5, CSS3, JavaScript (ES Modules)
- **Bundler & Dev Server**: [Vite](https://vitejs.dev/)
- **Testes Unitários**: [Vitest](https://vitest.dev/)

---

## 🚀 Como Instalar, Executar e Testar

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm (gerenciador de pacotes)

### 1. Instalar dependências
```bash
npm install
```

### 2. Executar em modo de desenvolvimento
```bash
npm run dev
```

### 3. Executar a suíte de testes unitários
```bash
npm run test
```

---

## 📁 Estrutura do Projeto

```text
├── index.html              # Interface principal da aplicação
├── style.css               # Estilização visual e componentes
├── main.js                 # Ponto de entrada JavaScript
├── package.json            # Dependências e scripts npm
├── src/
│   ├── calculator.js       # Regras de negócio e fórmulas de score/prioridade
│   ├── state.js            # Gerenciamento de estado da aplicação
│   ├── storage.js          # Persistência de dados em localStorage
│   ├── ui.js               # Manipulação do DOM e renderização da interface
│   └── validation.js       # Validação de formulários e campos
├── tests/
│   └── app.test.js         # Testes automatizados com Vitest
└── specs/                  # Especificações e artefatos de planejamento (Spec Kit)
    └── 001-ai-opportunity-board/
        ├── spec.md         # Especificação de requisitos
        ├── plan.md         # Plano arquitetural e de implementação
        └── tasks.md        # Lista ordenada de tarefas
```

---

## 🔄 Spec Kit & Loop Engineering

O projeto adota as metodologias de **Spec Kit** e **Loop Engineering**:
- **Spec Kit**: Abordagem baseada em especificações detalhadas (`spec.md`), planos (`plan.md`) e tarefas (`tasks.md`), garantindo clareza técnica e alinhamento de requisitos.
- **Loop Engineering**: Ciclo contínuo de verificação, diagnóstico e refatoração com testes unitários automatizados para assegurar qualidade e prevenir regressões.
