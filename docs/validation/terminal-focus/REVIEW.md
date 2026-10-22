# Foco e histórico do terminal

Correção local em 22/10/2026, na branch evolution/01-commercial-clarity.

## Causa reproduzida

Em 1348×591, o campo passava de 44 para 48 px ao receber foco, pois uma regra
input:focus mais específica reintroduzia padding de 12 px. O terminal passava
de 179 para 183 px e subia 2 px. A sombra também ganhava um contorno extra.
O teste de reprodução falhou com essas diferenças antes da correção.

## Implementação

- Normalizados os estilos de input no macos-terminal.css: foco não redefine métricas.
- Foco continua indicado pela borda, mantendo a sombra e as dimensões constantes.
- Barra do histórico oculta por scrollbar-width e pseudo-elemento WebKit, mantendo
  overflow automático. Não foi bloqueada a rolagem.
- Área de histórico exibe linhas inteiras: uma em telas compactas, duas em desktops
  com altura disponível. Textos e comandos anteriores permanecem no histórico.
- Histórico entra na sequência de Tab quando tem conteúdo, com foco visível.
  Após clear, sai da sequência para evitar uma parada vazia.

## Verificação

- scripts/verify-terminal-focus.cjs: aprovado em 1348×591, 1440×900, 768×1024,
  320×480 e 568×320, nos temas claro e escuro.
- Comparação exata de posição, largura, altura, sombra, fonte e padding antes/depois
  do foco, com e sem histórico. Barra visual oculta nos estilos computados.
- Rolagem por Home/End aprovada; limpeza e remoção do foco de histórico vazio aprovadas.
- Verificação adicional com mouse.wheel percorreu início e fim do histórico sem barra.
- Matriz compacta de 78 cenários passou após a normalização do foco e ocultação da barra;
  depois, a altura do histórico foi alinhada a linhas completas e o teste focado reexecutado.
- npm run check e npm run build aprovados; git diff --check limpo.
- Capturas de notebook claro/escuro inspecionadas. Navegador de validação: Google Chrome.

Sem commit, merge, push ou deploy. Alterações anteriores preservadas.
