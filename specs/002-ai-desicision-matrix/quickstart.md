# Quickstart & Verification Guide: AI Decision Matrix

## 1. Running Unit Tests

Execute the automated test suite with Vitest:

```bash
npm test
```

Expected result: 100% of unit tests pass, including the reference test cases for AI Decision Matrix.

---

## 2. Running Local Development Server

Start Vite in dev mode:

```bash
npm run dev
```

Open the local application URL (e.g., `http://localhost:5173`) in your web browser.

---

## 3. Manual Frontend Validation Checklist

| Test Item | Steps | Expected Result | Pass/Fail |
| :--- | :--- | :--- | :--- |
| **1. Matriz 2x2 Visível** | Abrir o dashboard | A seção "AI Decision Matrix" exibe a matriz 2x2 com os eixos e os 4 quadrantes | `[ ]` |
| **2. Quadrantes Identificáveis** | Observar as cores e nomes | `QUICK WIN` (Verde), `STRATEGIC` (Azul), `OPPORTUNISTIC` (Amarelo/Âmbar) e `DEPRIORITIZE` (Vermelho) são legíveis e distintos | `[ ]` |
| **3. Contagens Corretas** | Cadastrar 1 oportunidade em cada combinação | Cada bloco do quadrante mostra exatamente a contagem esperada | `[ ]` |
| **4. Badges nos Cards** | Observar a lista de oportunidades | Cada card exibe o badge do seu quadrante correspondente ao lado do score | `[ ]` |
| **5. Clique em Quadrante** | Clicar no bloco `QUICK WIN` | A lista é filtrada exibindo apenas itens `QUICK WIN`. O bloco ganha destaque de estado ativo | `[ ]` |
| **6. Estado Ativo do Filtro** | Observar o bloco e o chip | O quadrante clicado exibe borda/brilho ativo e o botão/chip correspondente fica selecionado | `[ ]` |
| **7. Retorno para TODOS** | Clicar novamente no mesmo quadrante (toggle) ou no chip `TODOS` | O filtro é limpo e a lista exibe todas as oportunidades de todos os quadrantes | `[ ]` |
| **8. Atualização após Edição** | Editar a Dificuldade de um Quick Win (2 -> 3) | A oportunidade muda automaticamente para `STRATEGIC`, atualizando o badge do card e as contagens na hora | `[ ]` |
| **9. Persistência após Reload** | Dar F5 / Recarregar a página | O localStorage mantém os dados com os quadrantes corretamente calculados na inicialização | `[ ]` |
