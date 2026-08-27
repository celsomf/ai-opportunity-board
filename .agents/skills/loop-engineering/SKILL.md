---
name: loop-engineering
description: >-
  Skill para executar ciclos sistemáticos de verificação, diagnóstico, correção e nova validação de software contra specifications e critérios de aceite. Use quando for necessário encontrar gaps entre a implementação atual e o comportamento esperado.
---

# Loop Engineering

## Overview

Fazer uma implementação convergir para sua specification através de ciclos objetivos de observação, teste, diagnóstico e correção.

## Workflow

### 1. Observe
Leia:
- constitution;
- spec.md;
- plan.md;
- tasks.md;
- código atual.

Identifique o comportamento esperado.

### 2. Verify
Execute todos os mecanismos de validação disponíveis, incluindo quando existirem:
- testes automatizados;
- build;
- lint;
- validações funcionais.

### 3. Compare
Compare explicitamente o comportamento atual com:
- critérios de aceite;
- regras de negócio;
- casos de referência;
- constraints da specification.

### 4. Diagnose
Liste os gaps encontrados.
**Não corrija ainda.**

### 5. Prioritize
Escolha apenas o problema verificável de maior impacto para o ciclo atual.

### 6. Fix
Faça a menor mudança possível capaz de corrigir a causa raiz.

### 7. Verify Again
Execute novamente as verificações relevantes.

### 8. Record
Registre:
- **Iteration**:
- **Expected**:
- **Observed**:
- **Gap**:
- **Root cause**:
- **Change**:
- **Verification**:
- **Result**:

### 9. Repeat
Inicie outro ciclo somente se ainda existir um gap verificável.

## Stop Conditions

Interrompa quando ocorrer qualquer uma destas condições:
- Todos os critérios de aceite estiverem atendidos;
- Build e testes passarem;
- Atingir 3 ciclos;
- Specification estiver ambígua;
- O problema exigir alteração de requisito;
- Não existir evidência suficiente para realizar a correção.

## Rules

> [!IMPORTANT]
> **Nunca:**
> - Inventar requisitos;
> - Alterar specification para esconder um bug;
> - Remover um teste apenas para fazê-lo passar;
> - Ignorar testes quebrados;
> - Alterar valores esperados apenas para concordarem com a implementação;
> - Fazer grandes refatorações sem necessidade;
> - Corrigir vários problemas não relacionados no mesmo ciclo.

> [!NOTE]
> **Especialmente para regras matemáticas:**
> Compare o resultado da implementação com os casos de referência existentes na specification.

## Final Report

Ao terminar, retornar:

```text
LOOP ENGINEERING REPORT
Iterations:
Tests:
Build:
Acceptance criteria:
Remaining gaps:
STATUS: [CONVERGED / NOT CONVERGED]
```
