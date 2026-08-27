AI Decision Matrix
 
CONTEXTO
 
O sistema atualmente permite cadastrar oportunidades de automacao com IA e calcula um Opportunity Score entre 0 e 100.
 
Tambem classifica cada oportunidade em:
 
ALTA
MEDIA
BAIXA
 
Essas funcionalidades existentes devem ser preservadas.
 
OBJETIVO DA NOVA FEATURE
 
Adicionar uma camada visual e estrategica de priorizacao chamada AI Decision Matrix.
 
A nova feature deve classificar automaticamente cada oportunidade em um quadrante estrategico utilizando:
 
- Opportunity Score existente;
- dificuldade de implementacao existente.
 
A classificacao deve ser muito visivel no frontend e permitir que o usuario entenda rapidamente a distribuicao das oportunidades.
 
REGRAS DOS QUADRANTES
 
QUICK WIN
 
score >= 80
e
dificuldade <= 2
 
STRATEGIC
 
score >= 80
e
dificuldade >= 3
 
OPPORTUNISTIC
 
score < 80
e
dificuldade <= 2
 
DEPRIORITIZE
 
score < 80
e
dificuldade >= 3
 
COMPORTAMENTO FUNCIONAL
 
O sistema deve:
 
1. calcular automaticamente o quadrante de cada oportunidade;
 
2. atualizar o quadrante automaticamente quando uma oportunidade for editada;
 
3. funcionar com oportunidades ja existentes no localStorage;
 
4. permitir filtrar as oportunidades pelo quadrante;
 
5. manter o Opportunity Score e a classificacao ALTA/MEDIA/BAIXA existentes.
 
REQUISITOS VISUAIS DO FRONTEND
 
A AI Decision Matrix deve ser uma area visual importante do dashboard e nao apenas um campo textual na lista.
 
Crie no dashboard uma MATRIZ VISUAL 2x2 contendo os quatro quadrantes.
 
A matriz deve comunicar conceitualmente dois eixos:
 
Eixo vertical:
Opportunity Score
baixo -> alto
 
Eixo horizontal:
Dificuldade
baixa -> alta
 
Distribuicao visual esperada:
 
QUICK WIN | STRATEGIC
---------------------
OPPORTUNISTIC | DEPRIORITIZE
 
Cada quadrante da matriz deve exibir:
 
- nome do quadrante;
- breve explicacao;
- quantidade de oportunidades;
- identidade visual propria;
- estado vazio quando nao houver oportunidades.
 
IDENTIDADE VISUAL SUGERIDA
 
QUICK WIN:
destaque positivo, ganho rapido, visual verde.
 
STRATEGIC:
destaque estrategico, investimento importante, visual azul.
 
OPPORTUNISTIC:
oportunidade secundaria ou exploratoria, visual amarelo/ambar.
 
DEPRIORITIZE:
baixa prioridade ou adiar, visual vermelho.
 
A cor deve ser apoio visual, mas o nome do quadrante precisa permanecer legivel mesmo sem depender exclusivamente da cor.
 
INTERACAO DA MATRIZ
 
Cada quadrante deve ser clicavel.
 
Ao clicar em um quadrante:
 
- a lista de oportunidades deve ser filtrada para aquele quadrante;
- o quadrante selecionado deve possuir um estado visual ativo;
- deve existir uma forma clara de voltar para TODAS as oportunidades.
 
FILTROS
 
Alem da matriz, os filtros por quadrante devem ser claros e faceis de encontrar, preferencialmente como chips, tabs ou botoes visuais.
 
O usuario deve conseguir visualizar:
 
TODOS
QUICK WIN
STRATEGIC
OPPORTUNISTIC
DEPRIORITIZE
 
CARDS / LISTA DE OPORTUNIDADES
 
Cada oportunidade exibida na lista deve possuir um badge visual destacado com seu quadrante atual.
 
Exemplo conceitual:
 
Processo: Triagem de e-mails
Score: 80
Prioridade: ALTA
Quadrante: QUICK WIN
 
O quadrante deve ser facilmente identificavel sem abrir a edicao da oportunidade.
 
DASHBOARD
 
O dashboard deve continuar mostrando os indicadores existentes e adicionar um resumo da AI Decision Matrix.
 
Deve ser possivel visualizar rapidamente quantas oportunidades existem em cada quadrante.
 
CASOS DE REFERENCIA
 
CASO A
 
score = 100
dificuldade = 1
 
resultado esperado:
QUICK WIN
 
CASO B
 
score = 85
dificuldade = 4
 
resultado esperado:
STRATEGIC
 
CASO C
 
score = 70
dificuldade = 2
 
resultado esperado:
OPPORTUNISTIC
 
CASO D
 
score = 50
dificuldade = 5
 
resultado esperado:
DEPRIORITIZE
 
BOUNDARIES IMPORTANTES
 
score = 80 + dificuldade = 2
=> QUICK WIN
 
score = 80 + dificuldade = 3
=> STRATEGIC
 
score = 79 + dificuldade = 2
=> OPPORTUNISTIC
 
score = 79 + dificuldade = 3
=> DEPRIORITIZE
 
CONSTRAINTS
 
Nao alterar:
 
- formula atual do Opportunity Score;
- classificacao ALTA, MEDIA e BAIXA;
- funcionalidades anteriores;
- persistencia atual sem necessidade.