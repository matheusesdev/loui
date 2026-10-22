# Etapa 3 — revisão de usabilidade

Implementada localmente em `evolution/03-usability`, sobre a main publicada no merge
`bc9aea5` (etapa 2: `335c19a`). Esta etapa ainda não foi commitada ou publicada.

O contato apresenta erros junto aos campos após uma tentativa de continuar, orienta
o preenchimento e foca o primeiro campo inválido. Corrigir o conteúdo remove o erro.
Enter no nome segue a mesma validação; no texto, insere uma nova linha. O conteúdo
permanece disponível ao alternar contexto ou minimizar. Fechar uma janela restaura
o foco ao controle que a abriu, quando disponível.

## Verificação

- `npm run check`: zero erros e avisos; `npm run build`: aprovado.
- `scripts/verify-contact-usability.cjs`: 24 cenários em quatro tamanhos, dois temas
  e três idiomas; erros, espaços em branco, correção, atributos acessíveis, foco,
  teclado, texto com caracteres especiais, preservação e ausência de overflow horizontal.
- `scripts/verify-commercial-clarity.cjs`: regressão aprovada para quatro serviços,
  contextos, histórico, idiomas, temas, movimento normal e preservação dos editores.
- `scripts/verify-compact-workspace.cjs`: 78 combinações aprovadas, mais resize,
  paisagem, rádio e movimento normal. Capturas anteriores dessa suíte preservadas.
- Capturas de erro e continuação inspecionadas em notebook e celular, claro e escuro.

Navegação ao WhatsApp interceptada pelo teste; nenhuma mensagem real enviada.
Os testes usam Chrome automatizado. Não houve validação com leitor de tela ou
dispositivos físicos. Abertura de uma conversa não comprova entrega de mensagem.

Resultados estruturados em `results.json`; regressão contextual em `context-regression`.
