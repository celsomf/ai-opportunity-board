---
name: loop-engineering
description: >-
  Skill para executar ciclos controlados de observação, comparação, diagnóstico, correção e verificação de software contra specifications e critérios de aceite com proteção do estado Git. Suporta os modos SPEC_COMPLIANCE, REGRESSION, QUALITY_GATE e GENERAL.
---

# Loop Engineering v2

## Objetivo

Executar ciclos controlados de observação, comparação, diagnóstico, correção e verificação, com proteção do estado Git.

## Modos de Operação

A skill suporta os seguintes modos:

1. **SPEC_COMPLIANCE**: Comparar implementação contra os critérios de aceite da specification.
2. **REGRESSION**: Identificar comportamentos que funcionavam antes da mudança e deixaram de funcionar.
3. **QUALITY_GATE**: Validar a saúde técnica da mudança.
4. **GENERAL** *(padrão)*: Investigar um problema verificável quando ele não se encaixar claramente nos demais modos.

> [!NOTE]
> Se nenhum modo for informado, utilizar **GENERAL**.

---

## Modos em Detalhes

### MODE: SPEC_COMPLIANCE
- **Objetivo**: Comparar implementação contra os critérios de aceite da specification.
- Para cada critério, classificar como:
  - `PASS`
  - `FAIL`
  - `NOT VERIFIED`
- Priorizar `FAIL`.

### MODE: REGRESSION
- **Objetivo**: Identificar comportamentos que funcionavam antes da mudança e deixaram de funcionar.
- Comparar quando possível:
  - Testes;
  - Specification;
  - Código alterado;
  - `git diff`.
- Corrigir apenas regressões verificáveis.

### MODE: QUALITY_GATE
- **Objetivo**: Validar a saúde técnica da mudança.
- Verificar:
  - Testes;
  - Build;
  - Lint, se existir;
  - `git diff --check`;
  - Warnings relevantes;
  - Duplicação óbvia introduzida pela feature;
  - Código morto diretamente relacionado à mudança.
- **Atenção**: Não realizar refatorações cosméticas.

### MODE: GENERAL
- **Objetivo**: Investigar um problema verificável quando ele não se encaixar claramente nos demais modos.
- Sempre declarar `EXPECTED` e `OBSERVED` antes de corrigir.

---

## Git Safety

Antes de qualquer alteração:

1. Execute:
   ```bash
   git status --short
   ```
2. Identifique a branch atual:
   ```bash
   git branch --show-current
   ```
3. Se a Skill `speckit-git-validate` estiver disponível, utilize-a para validar o estado da branch.
4. Verifique se existem alterações anteriores não relacionadas ao problema atual.
5. **Nunca descarte alterações do usuário.**

> [!CAUTION]
> **PROIBIDO executar automaticamente:**
> - `git reset --hard`
> - `git clean -fd`
> - `git checkout .`
> - `git restore .`
> - `git push --force`
> - `git rebase`
> - `git commit --amend`

6. Nunca sobrescrever histórico Git.
7. Se existirem mudanças não relacionadas que impossibilitem uma correção segura, interromper com:
   `BLOCKED_BY_UNCOMMITTED_CHANGES`

---

## Ciclo de Execução

Cada iteração deve executar rigorosamente estes passos:

1. **OBSERVE**
   Leia os artefatos relevantes:
   - constitution;
   - specification;
   - plan;
   - tasks;
   - código;
   - testes.

2. **DEFINE EXPECTED STATE**
   Declare explicitamente o comportamento esperado.

3. **VERIFY**
   Execute os mecanismos disponíveis:
   - testes;
   - build;
   - lint, quando existir;
   - validações funcionais relevantes.

4. **COMPARE**
   Compare:
   `EXPECTED` versus `OBSERVED`

5. **DIAGNOSE**
   Identifique:
   - gap;
   - causa raiz;
   - evidências.
   *Não faça alterações ainda.*

6. **PRIORITIZE**
   Escolha apenas **UMA** causa raiz principal por ciclo.

7. **GIT BEFORE**
   Execute:
   ```bash
   git diff
   git status --short
   ```

8. **FIX**
   Faça a menor alteração necessária para corrigir a causa raiz.

9. **GIT AFTER**
   Execute:
   ```bash
   git diff
   git diff --check
   ```

10. **VERIFY AGAIN**
    Execute novamente os testes e verificações relevantes.

11. **RECORD**
    Registre:
    - **ITERATION**:
    - **MODE**:
    - **EXPECTED**:
    - **OBSERVED**:
    - **GAP**:
    - **ROOT CAUSE**:
    - **FILES CHANGED**:
    - **CHANGE**:
    - **TEST RESULT**:
    - **BUILD RESULT**:
    - **GIT DIFF CHECK**:
    - **RESULT**:

12. **REPEAT**
    Repetir somente se ainda existir um gap verificável.
    **Máximo**: 3 iterações.

---

## Stop Conditions

Parar a execução quando:
- Todos os critérios relevantes estiverem atendidos;
- Testes passarem;
- Build passar;
- Atingir 3 iterações;
- Requisito estiver ambíguo;
- Correção exigir mudança de requisito;
- Houver risco de sobrescrever trabalho existente;
- Não houver evidência suficiente.

---

## Regras de Conduta

> [!IMPORTANT]
> **Proibições Incondicionais:**
> - Nunca inventar requisitos;
> - Nunca alterar specification para esconder um bug;
> - Nunca remover um teste apenas para fazê-lo passar;
> - Nunca ignorar testes quebrados;
> - Nunca alterar valores esperados apenas para concordarem com a implementação;
> - Nunca fazer grandes refatorações sem necessidade;
> - Nunca corrigir vários problemas não relacionados no mesmo ciclo.

---

## Git Final

Quando atingir `CONVERGED`:

1. Execute:
   ```bash
   git status --short
   git diff
   git diff --check
   ```
2. Se a Skill `speckit-git-validate` estiver disponível, utilize-a.
3. **Não execute commit automaticamente.**
4. **Não execute push automaticamente.**
5. Forneça apenas uma sugestão de Conventional Commit.

---

## Final Report

Ao finalizar, gere o relatório no seguinte formato:

```text
LOOP ENGINEERING REPORT

MODE:
ITERATIONS:
TESTS:
BUILD:
ACCEPTANCE CRITERIA:
GIT BRANCH:
FILES CHANGED:
DIFF SUMMARY:
REMAINING GAPS:
SUGGESTED COMMIT:

STATUS: [CONVERGED / NOT CONVERGED]
```
